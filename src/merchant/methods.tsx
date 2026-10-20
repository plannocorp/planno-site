import { useEffect, useState } from 'react'
import type { ApiCall, MethodInput, MethodType, ShippingMethod } from './types'
import { Alert, Icon, Loading, Modal } from './ui'
const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
const methodNames: Record<MethodType, string> = { FIXED: 'Entrega personalizada', PICKUP: 'Retirada na loja', MELHOR_ENVIO: 'Melhor Envio', CORREIOS: 'Correios com contrato' }
const descriptions: Record<MethodType, string> = {
  FIXED: 'Seu preço, seu prazo. Para entrega própria ou transportadora contratada.', PICKUP: 'Seu cliente compra online e retira no endereço que você escolher.',
  MELHOR_ENVIO: 'Preço e prazo calculados pela sua conta do Melhor Envio.', CORREIOS: 'Use as condições e os serviços do seu contrato com os Correios.',
}
function payload(method: ShippingMethod): MethodInput { return { name: method.name, type: method.type, price: method.price, estimatedDays: method.estimatedDays, active: method.active, options: method.options } }
export function Methods({ call }: { call: ApiCall }) {
  const [methods, setMethods] = useState<ShippingMethod[] | null>(null)
  const [error, setError] = useState(''), [success, setSuccess] = useState(''), [pending, setPending] = useState('')
  const [editor, setEditor] = useState<{ type: MethodType; method?: ShippingMethod } | null>(null)
  const [remove, setRemove] = useState<ShippingMethod | null>(null)
  const [retry, setRetry] = useState(0)
  useEffect(() => { const controller = new AbortController(); call<ShippingMethod[]>('/admin/shipping/methods', { signal: controller.signal }).then(setMethods).catch(e => { if (e.name !== 'AbortError') setError(e.message) }); return () => controller.abort() }, [call, retry])
  async function toggle(method: ShippingMethod) {
    setPending(method.id); setError(''); setSuccess('')
    try { const updated = await call<ShippingMethod>(`/admin/shipping/methods/${method.id}`, { method: 'PUT', body: { ...payload(method), active: !method.active } }); setMethods(current => current?.map(item => item.id === updated.id ? updated : item) || []); setSuccess(updated.active ? 'Forma de entrega ativada.' : 'Forma de entrega desativada.') }
    catch (e) { setError((e as Error).message) } finally { setPending('') }
  }
  async function deleteMethod() {
    if (!remove) return; setPending(remove.id); setError('')
    try { await call(`/admin/shipping/methods/${remove.id}`, { method: 'DELETE' }); setMethods(current => current?.filter(item => item.id !== remove.id) || []); setRemove(null); setSuccess('Forma de entrega removida.') }
    catch (e) { setError((e as Error).message); setRemove(null) } finally { setPending('') }
  }
  return <>
    <div className="page-heading"><div><p className="eyebrow">LOGÍSTICA DO SEU JEITO</p><h1>Cada pedido, um caminho.</h1><p>Combine as formas de entrega que fazem sentido para sua loja.</p></div><a className="text-link" href="#integracoes">Configurar contas de frete <Icon name="arrow"/></a></div>
    <section className="mode-grid" aria-label="Adicionar forma de entrega">{(Object.keys(methodNames) as MethodType[]).map(type => <button className="mode-card" key={type} onClick={() => setEditor({ type })}><span className={`mode-icon ${type.toLowerCase()}`}><Icon name={type === 'PICKUP' ? 'store' : type === 'FIXED' ? 'truck' : 'box'} size={25}/></span><span className="card-topline">{type === 'PICKUP' ? 'Perto do cliente' : type === 'FIXED' ? 'Você define' : 'Cotação automática'}</span><strong>{methodNames[type]}</strong><span className="mode-description">{descriptions[type]}</span><span className="card-action">Adicionar modalidade <Icon name="plus" size={17}/></span></button>)}</section>
    <Alert>{error}</Alert><Alert success>{success}</Alert>
    {error && !methods && <button className="secondary" onClick={() => { setError(''); setRetry(n => n + 1) }}>Tentar novamente</button>}
    {!methods && !error ? <Loading/> : methods && <section className="panel"><div className="panel-heading"><div><h2>Suas formas de entrega <span className="count">{methods.length}</span></h2><p>{methods.filter(method => method.active).length} ativas · Você pode pausar uma opção a qualquer momento.</p></div><span className="subtle-icon"><Icon name="truck"/></span></div>
      {methods.length === 0 ? <div className="empty"><Icon name="box" size={38}/><h3>O primeiro caminho começa aqui</h3><p>Escolha uma modalidade acima para configurar suas entregas.</p></div> : <div className="method-list">{methods.map(method => <article className="method-row" key={method.id}><span className="row-icon"><Icon name={method.type === 'PICKUP' ? 'store' : 'truck'}/></span><div className="method-info"><h3>{method.name}</h3><p>{methodNames[method.type]} · {method.type === 'PICKUP' ? method.options?.pickupAddress : method.options?.postalCodeFrom ? `CEP ${method.options.postalCodeFrom} a ${method.options.postalCodeTo}` : method.type === 'FIXED' ? 'Todo o Brasil' : `Serviço ${method.options?.serviceCode}`}</p></div><div className="method-price"><strong>{method.type === 'FIXED' ? money(method.price) : method.type === 'PICKUP' ? 'Grátis' : 'Calculado'}</strong><span>{method.estimatedDays} {method.estimatedDays === 1 ? 'dia' : 'dias'}{method.type === 'CORREIOS' || method.type === 'MELHOR_ENVIO' ? ' de preparo' : method.type === 'PICKUP' ? ' para preparar' : ' de prazo'}</span></div><button className={`switch ${method.active ? 'on' : ''}`} role="switch" aria-checked={method.active} aria-label={`${method.active ? 'Desativar' : 'Ativar'} ${method.name}`} disabled={!!pending} onClick={() => toggle(method)}><span/></button><button className="icon-button" aria-label={`Editar ${method.name}`} onClick={() => setEditor({ type: method.type, method })}><Icon name="edit"/></button><button className="remove-link" onClick={() => setRemove(method)} disabled={!!pending} aria-label={`Remover ${method.name}`}>Remover</button></article>)}</div>}
    </section>}
    <div className="help-strip"><Icon name="shield"/><p><strong>O valor certo, antes do pagamento.</strong> Fretes automáticos dependem da conta configurada e das medidas dos produtos. Uma indisponibilidade não vira frete grátis.</p><a href="#embalagens">Revisar embalagens <Icon name="arrow" size={16}/></a></div>
    {editor && <MethodEditor call={call} {...editor} close={() => setEditor(null)} saved={method => { setMethods(current => current?.some(item => item.id === method.id) ? current.map(item => item.id === method.id ? method : item) : [...(current || []), method]); setEditor(null); setSuccess('Forma de entrega salva.'); setError('') }}/>} 
    {remove && <Modal title="Remover forma de entrega?" close={() => setRemove(null)} busy={!!pending}><p className="modal-copy">“{remove.name}” deixará de aparecer nas opções da loja. Você também pode apenas desativá-la para usar depois.</p><div className="form-actions"><button className="secondary" disabled={!!pending} onClick={() => setRemove(null)}>Voltar</button><button className="danger" disabled={!!pending} onClick={deleteMethod}>{pending ? 'Removendo…' : 'Remover forma de entrega'}</button></div></Modal>}
  </>
}
function MethodEditor({ type, method, call, close, saved }: { type: MethodType; method?: ShippingMethod; call: ApiCall; close: () => void; saved: (method: ShippingMethod) => void }) {
  const [busy, setBusy] = useState(false), [error, setError] = useState('')
  const [regional, setRegional] = useState(!!method?.options?.postalCodeFrom)
  const carrier = type === 'MELHOR_ENVIO' || type === 'CORREIOS'
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); const text = (name: string) => String(form.get(name) || '').trim() || null
    const from = regional ? text('postalCodeFrom') : null, to = regional ? text('postalCodeTo') : null
    if (from && to && from > to) { setError('O CEP inicial precisa ser menor ou igual ao CEP final.'); return }
    const body: MethodInput = { name: text('name')!, type, price: type === 'FIXED' ? Number(form.get('price')) : 0, estimatedDays: Number(form.get('estimatedDays')), active: form.has('active'), options: { postalCodeFrom: from, postalCodeTo: to, pickupAddress: text('pickupAddress'), pickupHours: text('pickupHours'), instructions: text('instructions'), serviceCode: text('serviceCode'), declaredValueServiceCode: text('declaredValueServiceCode') } }
    setBusy(true); setError('')
    try { saved(await call<ShippingMethod>(`/admin/shipping/methods${method ? `/${method.id}` : ''}`, { method: method ? 'PUT' : 'POST', body })) }
    catch (e) { setError((e as Error).message); setBusy(false) }
  }
  return <Modal title={`${method ? 'Editar' : 'Adicionar'} ${methodNames[type].toLowerCase()}`} subtitle={descriptions[type]} close={close} busy={busy}><form onSubmit={submit}><fieldset disabled={busy}><Alert>{error}</Alert>
    {carrier && <div className="info-box">Antes de ativar, configure sua conta em <strong>Contas de frete</strong> e cadastre as embalagens. O preço será consultado no checkout.</div>}
    <label>Nome que o cliente verá<input name="name" defaultValue={method?.name || ''} placeholder={type === 'PICKUP' ? 'Retirada na loja Centro' : 'Ex.: Entrega padrão'} required maxLength={120}/></label>
    <div className="form-grid">{type === 'FIXED' && <label>Valor do frete (R$)<input type="number" name="price" min="0" max="99999.99" step="0.01" required defaultValue={method?.price ?? ''} placeholder="18,50"/></label>}<label>{carrier || type === 'PICKUP' ? 'Prazo de preparação (dias)' : 'Prazo de entrega (dias)'}<input name="estimatedDays" type="number" min="0" max="365" step="1" defaultValue={method?.estimatedDays ?? (type === 'PICKUP' ? 0 : 1)} required/></label>{carrier && <label>Código do serviço<input name="serviceCode" required pattern="[0-9]{1,10}" inputMode="numeric" maxLength={10} defaultValue={method?.options?.serviceCode || ''}/><small>Use o código habilitado na sua conta ou contrato.</small></label>}</div>
    {type === 'CORREIOS' && <><label>Código do serviço de valor declarado<input name="declaredValueServiceCode" required pattern="[0-9]{3}" inputMode="numeric" maxLength={3} defaultValue={method?.options?.declaredValueServiceCode || ''}/><small>Confirme o código compatível com este serviço no contrato.</small></label><div className="info-box">Cada unidade do produto será cotada como um pacote separado. Use as medidas da unidade já embalada.</div></>}
    {type === 'PICKUP' ? <><label>Endereço da retirada<textarea name="pickupAddress" required maxLength={500} rows={2} defaultValue={method?.options?.pickupAddress || ''} placeholder="Rua, número, bairro, cidade e estado"/></label><label>Dias e horários<input name="pickupHours" required maxLength={500} defaultValue={method?.options?.pickupHours || ''} placeholder="Segunda a sexta, das 9h às 18h"/></label><p className="field-help">A retirada é gratuita. O cliente não precisa informar endereço de entrega.</p></> : <><label className="check-label"><input type="checkbox" checked={regional} onChange={event => setRegional(event.target.checked)}/>Limitar a uma faixa de CEP</label>{regional ? <div className="form-grid"><label>CEP inicial<input name="postalCodeFrom" required pattern="[0-9]{8}" inputMode="numeric" maxLength={8} placeholder="01000000" defaultValue={method?.options?.postalCodeFrom || ''}/></label><label>CEP final<input name="postalCodeTo" required pattern="[0-9]{8}" inputMode="numeric" maxLength={8} placeholder="05999999" defaultValue={method?.options?.postalCodeTo || ''}/></label></div> : <p className="field-help">{carrier ? 'A disponibilidade será consultada para o CEP do cliente.' : 'Sem limite de CEP, este valor será oferecido para todo o Brasil.'}</p>}</>}
    <label>Instruções para o cliente <span className="optional">opcional</span><textarea name="instructions" maxLength={1000} rows={2} defaultValue={method?.options?.instructions || ''} placeholder="Informações úteis sobre esta modalidade"/></label>
    <label className="check-label"><input name="active" type="checkbox" defaultChecked={method?.active ?? false}/>Ativar esta forma de entrega</label>
    <div className="form-actions"><button className="secondary" type="button" onClick={close}>Cancelar</button><button className="primary" type="submit">{busy ? 'Salvando…' : 'Salvar forma de entrega'}</button></div></fieldset></form></Modal>
}
