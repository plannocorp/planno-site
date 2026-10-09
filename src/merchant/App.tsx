import { useCallback, useEffect, useState } from 'react'
import { API_BASE, accessError, ApiError, request, saveToken, storedToken } from './api'
import type { ApiCall, Auth, Store, User } from './types'
import { Alert, Brand, Icon, Loading } from './ui'
import { Methods } from './methods'
import { Integrations } from './integrations'
import { Products } from './products'
import './styles.css'
export default function App() {
  const [token, setToken] = useState<string | null>(() => API_BASE ? storedToken() : null)
  const [session, setSession] = useState<{ user: User; store: Store | null } | null>(null)
  const [notice, setNotice] = useState('')
  const logout = useCallback((message = '') => { saveToken(null); setToken(null); setSession(null); setNotice(message) }, [])
  const call: ApiCall = useCallback(async <T,>(path: string, options?: { method?: string; body?: unknown; signal?: AbortSignal }) => {
    try { return await request<T>(path, token, options) } catch (error) { if (error instanceof ApiError && error.status === 401) logout(error.message); throw error }
  }, [token, logout])
  useEffect(() => {
    if (!token) return
    const controller = new AbortController()
    async function checkSession() {
      try {
        const user = await request<User>('/auth/me', token, { signal: controller.signal })
        const invalid = accessError(user); if (invalid) throw new Error(invalid)
        const store = user.mustChangePassword ? null : await request<Store>('/admin/store/current', token, { signal: controller.signal })
        if (store && store.id !== user.storeIds[0]) throw new Error('Não foi possível confirmar sua loja. Entre em contato com a Planno.')
        setSession({ user, store })
      } catch (e) { if ((e as Error).name !== 'AbortError') logout((e as Error).message) }
    }
    void checkSession(); return () => controller.abort()
  }, [token, logout])
  if (token && !session) return <main className="checking"><Brand/><Loading/></main>
  if (!token || !session) return <Login notice={notice} loggedIn={auth => { saveToken(auth.accessToken); setNotice(''); setToken(auth.accessToken) }}/>
  if (session.user.mustChangePassword) return <ChangePassword call={call} logout={logout}/>
  return <Dashboard user={session.user} store={session.store!} call={call} logout={logout}/>
}
function Login({ notice, loggedIn }: { notice: string; loggedIn: (auth: Auth) => void }) {
  const [busy, setBusy] = useState(false), [error, setError] = useState('')
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!API_BASE) return
    const form = new FormData(event.currentTarget); setBusy(true); setError('')
    try { const auth = await request<Auth>('/auth/login', null, { method: 'POST', body: { email: String(form.get('email')).trim(), password: form.get('password') } }); const invalid = accessError(auth); if (invalid) throw new Error(invalid); loggedIn(auth) }
    catch (e) { setError((e as Error).message) } finally { setBusy(false) }
  }
  return <main className="login-layout"><section className="login-story"><Brand/><div><p className="eyebrow">ÁREA DO LOJISTA</p><h1>Sua loja.<br/>Seu jeito de<br/><em>ir mais longe.</em></h1><p>Organize suas entregas, conecte suas contas de frete e prepare cada produto para chegar ao cliente.</p><div className="journey" aria-hidden="true"><span><Icon name="store" size={27}/></span><i/><span><Icon name="box" size={27}/></span><i/><span><Icon name="truck" size={27}/></span></div></div><small>Seu negócio em movimento, com a Planno.</small></section><section className="login-side"><form className="login-form" onSubmit={submit}><p className="eyebrow">BEM-VINDO DE VOLTA</p><h2>Entre na sua loja</h2><p>Use a conta de administrador da sua loja.</p><Alert>{error || notice}</Alert>{!API_BASE && <div className="info-box"><strong>Acesso em preparação</strong><p>O login será liberado quando o servidor da loja estiver conectado. Não é necessário preencher seus dados agora.</p></div>}<fieldset disabled={busy || !API_BASE}><label>E-mail<input type="email" name="email" required maxLength={255} autoComplete="username" placeholder="voce@sualoja.com.br"/></label><label>Senha<input type="password" name="password" required maxLength={120} autoComplete="current-password" placeholder="Sua senha de acesso"/></label><button className="primary full" type="submit">{!API_BASE ? 'Aguardando conexão' : busy ? 'Entrando…' : 'Entrar na minha loja'}<Icon name="arrow" size={18}/></button></fieldset><p className="login-foot">Precisa de acesso? <a href="/#contato">Fale com a Planno</a></p><a className="back-link" href="/">← Voltar ao site</a></form></section></main>
}
function ChangePassword({ call, logout }: { call: ApiCall; logout: (message?: string) => void }) {
  const [error, setError] = useState(''), [busy, setBusy] = useState(false)
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget)
    if (form.get('newPassword') !== form.get('confirm')) { setError('As novas senhas precisam ser iguais.'); return }
    setBusy(true); setError('')
    try { await call('/auth/change-password', { method: 'POST', body: { currentPassword: form.get('currentPassword'), newPassword: form.get('newPassword') } }); logout('Senha atualizada. Entre com sua nova senha.') }
    catch (e) { setError((e as Error).message); setBusy(false) }
  }
  return <main className="checking"><form className="password-form" onSubmit={submit}><Brand/><h1>Crie sua nova senha</h1><p>Atualize a senha inicial antes de acessar sua loja.</p><Alert>{error}</Alert><fieldset disabled={busy}>{[['currentPassword', 'Senha atual'], ['newPassword', 'Nova senha'], ['confirm', 'Confirme a nova senha']].map(([name, label]) => <label key={name}>{label}<input name={name} type="password" required minLength={8} maxLength={120} autoComplete={name === 'currentPassword' ? 'current-password' : 'new-password'}/></label>)}<button className="primary full">{busy ? 'Salvando…' : 'Salvar nova senha'}</button><button type="button" className="text-link" onClick={() => logout()}>Voltar ao login</button></fieldset></form></main>
}
const tabs = [{ id: 'entregas', title: 'Formas de entrega', icon: 'truck' }, { id: 'integracoes', title: 'Contas de frete', icon: 'link' }, { id: 'embalagens', title: 'Embalagens', icon: 'box' }]
function currentTab() { const hash = window.location.hash.slice(1); return tabs.some(tab => tab.id === hash) ? hash : 'entregas' }
function Dashboard({ user, store, call, logout }: { user: User; store: Store; call: ApiCall; logout: () => void }) {
  const [tab, setTab] = useState(currentTab)
  useEffect(() => { const change = () => setTab(currentTab()); window.addEventListener('hashchange', change); return () => window.removeEventListener('hashchange', change) }, [])
  return <div className="app-shell"><a className="skip-link" href="#main-content">Pular para o conteúdo</a><aside className="sidebar"><Brand/><div className="store-card"><span><Icon name="store"/></span><div><strong>{store.name}</strong><small>Sua loja na Planno</small></div></div><p className="nav-label">GESTÃO DE ENTREGAS</p><nav aria-label="Área do lojista">{tabs.map(item => <a href={`#${item.id}`} className={tab === item.id ? 'active' : ''} aria-current={tab === item.id ? 'page' : undefined} key={item.id}><Icon name={item.icon}/>{item.title}<span aria-hidden="true">›</span></a>)}</nav><div className="sidebar-note"><span className="mini-icon"><Icon name="shield"/></span><strong>Uma loja. Muitas possibilidades.</strong><p>Escolha como seus produtos chegam até seus clientes.</p></div><div className="account"><span className="avatar">{(user.firstName || user.email).slice(0, 1).toUpperCase()}</span><div><strong>{user.firstName || 'Administrador'}</strong><small>Administrador da loja</small></div><button className="icon-button" aria-label="Sair da conta" onClick={() => logout()}><Icon name="logout" size={18}/></button></div></aside><div className="workspace"><header className="topbar"><span>Minha loja <span className="crumb">/</span> <strong>{tabs.find(item => item.id === tab)?.title}</strong></span><span className="store-label"><i/>{store.name}</span></header><main id="main-content" tabIndex={-1} className="main-content">{tab === 'entregas' ? <Methods call={call}/> : tab === 'integracoes' ? <Integrations call={call}/> : <Products call={call}/>}<footer>Feito para o próximo passo da sua loja.<span>planno.</span></footer></main></div></div>
}
