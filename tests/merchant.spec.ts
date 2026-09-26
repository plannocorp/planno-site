import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
const user = { userId: 'admin-a', email: 'admin@example.com', firstName: 'Marina', roles: ['ROLE_ADMIN'], storeIds: ['store-a'], mustChangePassword: false }
const emptyOptions = { postalCodeFrom: null, postalCodeTo: null, pickupAddress: null, pickupHours: null, instructions: null, serviceCode: null, declaredValueServiceCode: null }
const seed = [
  { id: 'm1', name: 'Retirada na loja Centro', type: 'PICKUP', price: 0, estimatedDays: 1, active: true, options: { ...emptyOptions, pickupAddress: 'Rua das Flores, 120 · São Paulo', pickupHours: 'Segunda a sexta, 9h às 18h' } },
  { id: 'm2', name: 'Entrega por motoboy', type: 'FIXED', price: 18.5, estimatedDays: 2, active: true, options: { ...emptyOptions, postalCodeFrom: '01000000', postalCodeTo: '05999999' } },
  { id: 'm3', name: 'Entrega nacional · PAC', type: 'MELHOR_ENVIO', price: 0, estimatedDays: 1, active: false, options: { ...emptyOptions, serviceCode: '1' } },
]
type RecordData = Record<string, unknown>
async function setup(page: Page, overrides: Partial<typeof user> = {}) {
  const calls: { path: string; method: string; body: RecordData | null; headers: Record<string, string> }[] = []
  let methods = structuredClone(seed)
  let saveFailure = false
  const providers: Record<string, RecordData> = {
    MELHOR_ENVIO: { provider: 'MELHOR_ENVIO', originPostalCode: '01001000', sandbox: true, enabled: true, credentialsConfigured: true, contractCode: null, postingCard: null, contractRegional: null },
    CORREIOS: { provider: 'CORREIOS', originPostalCode: null, sandbox: true, enabled: false, credentialsConfigured: false, contractCode: null, postingCard: null, contractRegional: null },
  }
  await page.route('**/api/v1/**', async route => {
    const req = route.request(), path = new URL(req.url()).pathname.replace('/api/v1', ''), method = req.method(), body = req.postDataJSON()
    calls.push({ path, method, body, headers: req.headers() })
    const reply = (data: unknown, status = 200) => route.fulfill({ status, json: data })
    if (saveFailure && method === 'PUT') return reply({ message: 'synthetic failure' }, 500)
    if (path === '/auth/login') return reply({ ...user, ...overrides, accessToken: 'synthetic-session' })
    if (path === '/auth/me') return reply({ ...user, ...overrides })
    if (path === '/auth/change-password') return route.fulfill({ status: 204 })
    if (path === '/admin/store/current') return reply({ id: 'store-a', name: 'Ateliê Aurora', slug: 'aurora' })
    if (path === '/admin/shipping/methods' && method === 'GET') return reply(methods)
    if (path === '/admin/shipping/methods' && method === 'POST') { const item = { ...body, id: `new-${methods.length}` }; methods.push(item); return reply(item, 201) }
    if (path.startsWith('/admin/shipping/methods/')) {
      const id = path.split('/').at(-1)
      if (method === 'DELETE') { methods = methods.filter(item => item.id !== id); return route.fulfill({ status: 204 }) }
      const item = { ...body, id }; methods = methods.map(previous => previous.id === id ? item : previous); return reply(item)
    }
    if (path.startsWith('/admin/shipping/providers/')) {
      const provider = path.split('/').at(-1)!
      if (method === 'PUT') { const { accessToken, username, accessCode, ...settings } = body; providers[provider] = { ...providers[provider], ...settings, credentialsConfigured: !!(accessToken || (username && accessCode) || providers[provider].credentialsConfigured) } }
      return reply(providers[provider])
    }
    if (path === '/admin/products') return reply([{ id: 'p1', name: 'Vaso de cerâmica artesanal', sku: 'VASO-01', status: 'ACTIVE', shippingPackage: null }, { id: 'p2', name: 'Kit de velas naturais', sku: 'VELA-02', status: 'ACTIVE', shippingPackage: { weightKg: 0.6, widthCm: 15, heightCm: 12, lengthCm: 20 } }])
    if (path.endsWith('/shipping-package') && method === 'PUT') return reply(body)
    return reply({ message: 'Unmocked endpoint' }, 500)
  })
  return { calls, failSaves: () => { saveFailure = true } }
}
async function login(page: Page) {
  await page.goto('/lojista/')
  await page.getByLabel('E-mail', { exact: true }).fill('admin@example.com')
  await page.getByLabel('Senha', { exact: true }).fill('synthetic-password')
  await page.getByRole('button', { name: 'Entrar na minha loja' }).click()
}

test('pickup, region, edit, pause and remove use the backend contracts', async ({ page }) => {
  const { calls } = await setup(page); await login(page)
  await expect(page.getByRole('heading', { name: 'Cada pedido, um caminho.' })).toBeVisible()
  await page.getByRole('button', { name: /Perto do cliente/ }).click()
  const dialog = page.getByRole('dialog')
  await dialog.getByLabel('Nome que o cliente verá').fill('Retirada no galpão')
  await dialog.getByLabel('Endereço da retirada').fill('Rua Exemplo, 30, São Paulo')
  await dialog.getByLabel('Dias e horários').fill('Segunda a sexta, 9h às 17h')
  await dialog.getByLabel('Ativar esta forma de entrega').check()
  await dialog.getByRole('button', { name: 'Salvar forma de entrega' }).click()
  await expect(page.getByRole('heading', { name: 'Retirada no galpão', exact: true })).toBeVisible()
  const created = calls.find(call => call.method === 'POST' && call.path.endsWith('/methods'))!.body!
  expect(created).toMatchObject({ type: 'PICKUP', price: 0, active: true, options: { pickupAddress: 'Rua Exemplo, 30, São Paulo' } })
  expect(created).not.toHaveProperty('storeId')
  await page.getByRole('switch', { name: 'Desativar Retirada no galpão' }).click()
  await expect(page.getByRole('switch', { name: 'Ativar Retirada no galpão' })).toHaveAttribute('aria-checked', 'false')
  await page.getByRole('button', { name: 'Editar Retirada no galpão' }).click()
  await page.getByLabel('Nome que o cliente verá').fill('Retirada no galpão principal')
  await page.getByRole('button', { name: 'Salvar forma de entrega' }).click()
  await expect(page.getByRole('heading', { name: 'Retirada no galpão principal' })).toBeVisible()
  await page.getByRole('button', { name: 'Remover Retirada no galpão principal', exact: true }).click()
  await page.getByRole('button', { name: 'Remover forma de entrega', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Retirada no galpão principal' })).toHaveCount(0)
  await page.getByRole('button', { name: /Você define/ }).click()
  await page.getByLabel('Nome que o cliente verá').fill('Entrega RJ')
  await page.getByLabel('Valor do frete (R$)').fill('20.50')
  await page.getByLabel('Limitar a uma faixa de CEP').check()
  await page.getByLabel('CEP inicial').fill('29999999'); await page.getByLabel('CEP final').fill('20000000')
  await page.getByRole('button', { name: 'Salvar forma de entrega' }).click()
  await expect(page.getByRole('alert')).toContainText('CEP inicial')
  await page.getByLabel('CEP inicial').fill('20000000'); await page.getByLabel('CEP final').fill('29999999')
  await page.getByRole('button', { name: 'Salvar forma de entrega' }).click()
  await expect(page.getByRole('heading', { name: 'Entrega RJ', exact: true })).toBeVisible()
  expect(calls.every(call => !call.headers['x-store-slug'])).toBe(true)
})

test('saved credentials are preserved and environment changes require replacement', async ({ page }) => {
  const { calls } = await setup(page); await login(page)
  await page.getByRole('link', { name: 'Contas de frete', exact: true }).click()
  await page.getByRole('button', { name: 'Editar configuração', exact: true }).click()
  await expect(page.getByLabel('Token de acesso do Melhor Envio')).toHaveCount(0)
  await page.getByLabel('CEP de origem').fill('01310000')
  await page.getByRole('button', { name: 'Salvar configuração' }).click()
  await expect(page.getByRole('status')).toContainText('Configuração salva')
  const preserved = calls.find(call => call.method === 'PUT')!.body!
  expect(preserved).not.toHaveProperty('accessToken'); expect(preserved).not.toHaveProperty('username')
  await page.getByRole('button', { name: 'Editar configuração', exact: true }).click()
  await page.getByLabel('Ambiente', { exact: true }).selectOption('production')
  await expect(page.getByLabel('Token de acesso do Melhor Envio')).toHaveAttribute('required', '')
  await page.getByLabel('Token de acesso do Melhor Envio').fill('synthetic-provider-secret')
  await page.getByRole('button', { name: 'Salvar configuração' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  expect(calls.filter(call => call.method === 'PUT').at(-1)!.body).toMatchObject({ sandbox: false, accessToken: 'synthetic-provider-secret' })
  const storage = await page.evaluate(() => JSON.stringify([localStorage, sessionStorage]))
  expect(storage).not.toContain('synthetic-provider-secret')
  await page.getByRole('button', { name: 'Editar configuração', exact: true }).click()
  await page.getByLabel('Substituir as credenciais cadastradas').check()
  await expect(page.getByLabel('Token de acesso do Melhor Envio')).toHaveValue('')
})

test('Correios contract and packaging forms submit the required values', async ({ page }) => {
  const { calls } = await setup(page); await login(page)
  await page.getByRole('link', { name: 'Contas de frete', exact: true }).click()
  await page.getByRole('button', { name: 'Configurar conta', exact: true }).click()
  for (const [label, value] of [['CEP de origem', '01001000'], ['Número do contrato', '12345'], ['Cartão de postagem', '56789'], ['Regional do contrato (DR)', '72'], ['Usuário Meu Correios', 'synthetic-merchant'], ['Código de acesso à API CWS', 'synthetic-code']]) await page.getByLabel(label).fill(value)
  await page.getByLabel('Habilitar esta conta para cotação').check()
  await page.getByRole('button', { name: 'Salvar configuração' }).click()
  await expect(page.getByRole('status')).toContainText('Configuração salva')
  expect(calls.find(call => call.method === 'PUT')!.body).toMatchObject({ contractRegional: 72, contractCode: '12345', postingCard: '56789', username: 'synthetic-merchant', accessCode: 'synthetic-code', enabled: true })
  await page.getByRole('link', { name: 'Embalagens', exact: true }).click()
  await page.getByRole('button', { name: 'Configurar embalagem de Vaso de cerâmica artesanal' }).click()
  for (const [label, value] of [['Peso (kg)', '0.5'], ['Largura (cm)', '15'], ['Altura (cm)', '10'], ['Comprimento (cm)', '20']]) await page.getByLabel(label).fill(value)
  await page.getByRole('button', { name: 'Salvar embalagem' }).click()
  await expect(page.getByRole('status')).toContainText('Embalagem atualizada')
  expect(calls.find(call => call.path.endsWith('/shipping-package'))!.body).toEqual({ weightKg: 0.5, widthCm: 15, heightCm: 10, lengthCm: 20 })
})

test('platform-only and multi-store accounts cannot access store APIs', async ({ page }) => {
  const fixture = await setup(page, { roles: ['ROLE_PLATFORM_ADMIN'], storeIds: [] }); await login(page)
  await expect(page.getByRole('alert')).toContainText('administrador da loja')
  expect(fixture.calls.filter(call => call.path.startsWith('/admin/'))).toHaveLength(0)
  await page.unroute('**/api/v1/**')
  const multi = await setup(page, { storeIds: ['store-a', 'store-b'] }); await login(page)
  await expect(page.getByRole('alert')).toContainText('única loja')
  expect(multi.calls.filter(call => call.path.startsWith('/admin/'))).toHaveLength(0)
})

test('password change precedes store access and expired sessions are cleared', async ({ page }) => {
  const fixture = await setup(page, { mustChangePassword: true }); await login(page)
  await expect(page.getByRole('heading', { name: 'Crie sua nova senha' })).toBeVisible()
  expect(fixture.calls.filter(call => call.path.startsWith('/admin/'))).toHaveLength(0)
  await page.getByLabel('Senha atual', { exact: true }).fill('old-password')
  await page.getByLabel('Nova senha', { exact: true }).fill('new-password')
  await page.getByLabel('Confirme a nova senha').fill('new-password')
  await page.getByRole('button', { name: 'Salvar nova senha' }).click()
  await expect(page.getByRole('heading', { name: 'Entre na sua loja' })).toBeVisible()
  expect(await page.evaluate(() => sessionStorage.getItem('planno.merchant.token'))).toBeNull()
  await page.unroute('**/api/v1/**'); await setup(page)
  await page.route('**/api/v1/admin/shipping/methods', route => route.fulfill({ status: 401, json: {} }))
  await login(page)
  await expect(page.getByRole('alert')).toContainText('sessão expirou')
  expect(await page.evaluate(() => sessionStorage.getItem('planno.merchant.token'))).toBeNull()
})

test('save errors keep the form open without displaying success', async ({ page }) => {
  const fixture = await setup(page); await login(page); fixture.failSaves()
  await page.getByRole('button', { name: 'Editar Entrega por motoboy' }).click()
  await page.getByLabel('Nome que o cliente verá').fill('Nome ainda não salvo')
  await page.getByRole('button', { name: 'Salvar forma de entrega' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('alert')).toContainText('Não foi possível concluir')
  await expect(page.getByLabel('Nome que o cliente verá')).toHaveValue('Nome ainda não salvo')
  await expect(page.getByText('Forma de entrega salva.', { exact: true })).toHaveCount(0)
})

test('desktop and mobile layouts support direct hash reload and keyboard dismissal', async ({ page }) => {
  await setup(page); await login(page)
  await expect(page.getByRole('heading', { name: 'Cada pedido, um caminho.' })).toBeVisible()
  await page.screenshot({ path: 'test-results/merchant-desktop.png', fullPage: true })
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('link', { name: 'Contas de frete', exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.getByRole('button', { name: /Perto do cliente/ }).click()
  await expect(page.getByRole('dialog')).toBeVisible(); await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await page.screenshot({ path: 'test-results/merchant-mobile.png', fullPage: true })
  await page.getByRole('link', { name: 'Contas de frete', exact: true }).click(); await page.reload()
  await expect(page.getByRole('heading', { name: 'Contas de frete.', exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.getByRole('button', { name: 'Sair da conta' }).click()
  await expect(page.getByRole('heading', { name: 'Entre na sua loja' })).toBeVisible()
})

test('empty list and unavailable endpoint are explicit, and wrong-store responses are blocked', async ({ page }) => {
  await setup(page)
  await page.route('**/api/v1/admin/shipping/methods', route => route.fulfill({ json: [] }))
  await login(page)
  await expect(page.getByRole('heading', { name: 'O primeiro caminho começa aqui' })).toBeVisible()
  await page.route('**/api/v1/admin/shipping/providers/*', route => route.fulfill({ status: 404, json: {} }))
  await page.getByRole('link', { name: 'Contas de frete', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText('atualização de frete')
  await expect(page.getByRole('button', { name: 'Tentar novamente' })).toBeVisible()
  await page.getByRole('button', { name: 'Sair da conta' }).click()
  await page.route('**/api/v1/admin/store/current', route => route.fulfill({ json: { id: 'store-b', name: 'Wrong store', slug: 'wrong' } }))
  await login(page)
  await expect(page.getByRole('alert')).toContainText('confirmar sua loja')
  await expect(page.getByText('Wrong store')).toHaveCount(0)
})
