import { test, expect } from '@playwright/test'
test('production entries load directly and never submit credentials without an API', async ({ page }) => {
  const apiRequests: string[] = []
  page.on('request', request => { if (request.url().includes('/auth/')) apiRequests.push(request.url()) })
  const response = await page.goto('http://127.0.0.1:4322/lojista/')
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { name: 'Entre na sua loja' })).toBeVisible()
  await expect(page.getByText('Acesso em preparação', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Aguardando conexão', exact: true })).toBeDisabled()
  await expect(page.getByLabel('E-mail', { exact: true })).toBeDisabled()
  await page.goto('http://127.0.0.1:4322/lojista/#embalagens'); await page.reload()
  await expect(page.getByRole('heading', { name: 'Entre na sua loja' })).toBeVisible()
  await page.goto('http://127.0.0.1:4322/superadmin/')
  await expect(page.getByRole('heading', { name: 'Acesse sua plataforma' })).toBeVisible()
  expect(apiRequests).toHaveLength(0)
  await page.goto('http://127.0.0.1:4322/')
  await expect(page.getByRole('link', { name: 'Área do lojista', exact: true })).toHaveAttribute('href', '/lojista/')
})
