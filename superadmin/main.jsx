import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { isPlatformAdmin, periodQuery, request } from './api';
import './styles.css';
import './brand.css';
const BASE = import.meta.env.VITE_PLATFORM_API_BASE_URL || (import.meta.env.DEV ? '/api/v1' : '');
const KEY = 'planno.platform.token';
const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value || 0));
const integer = value => new Intl.NumberFormat('pt-BR').format(value || 0);
const date = value => new Intl.DateTimeFormat('pt-BR').format(new Date(`${value}T12:00:00`));
function Brand() { return <div className="brand"><span className="brand-symbol"><img src="/planno-logo.png" alt=""/></span><span>planno<span className="brand-dot">.</span></span></div>; }
function Alert({ children }) { return children ? <div className="alert" role="alert">{children}</div> : null; }
function App() {
  const [token, setToken] = useState(() => BASE ? sessionStorage.getItem(KEY) : null);
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(!!token);
  const [notice, setNotice] = useState('');
  function logout(message = '') { sessionStorage.removeItem(KEY); setToken(null); setUser(null); setNotice(message); setChecking(false); }
  const call = (path, options = {}) => request(path, { base: BASE, token, ...options });
  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    setChecking(true);
    request('/auth/me', { base: BASE, token, signal: controller.signal }).then(me => {
      if (!isPlatformAdmin(me)) throw new Error('Esta conta não é administradora da plataforma.');
      setUser(me); setChecking(false);
    }).catch(error => { if (error.name !== 'AbortError') logout(error.message); });
    return () => controller.abort();
  }, [token]);
  function onLogin(auth) { sessionStorage.setItem(KEY, auth.accessToken); setNotice(''); setToken(auth.accessToken); }
  if (checking) return <div className="center-screen"><Brand/><p role="status">Verificando seu acesso…</p></div>;
  if (!user) return <Login onLogin={onLogin} notice={notice}/>;
  if (user.mustChangePassword) return <ChangePassword call={call} logout={logout}/>;
  return <Dashboard user={user} call={call} logout={logout}/>;
}
function Login({ onLogin, notice }) {
  const [busy, setBusy] = useState(false), [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault(); if (!BASE) return; setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    try {
      const auth = await request('/auth/login', { base: BASE, body: { email: form.get('email').trim(), password: form.get('password') } });
      if (!isPlatformAdmin(auth)) throw new Error('Use uma conta de administrador da plataforma Planno.');
      onLogin(auth);
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }
  return <main className="login-layout"><section className="login-story"><Brand/><div><span className="eyebrow">PLATAFORMA PLANNO</span><h1>Todas as lojas.<br/>Uma visão do negócio.</h1><p>Acompanhe as vendas da plataforma e as comissões da Planno em um só lugar.</p><div className="story-lines" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div><small>Painel exclusivo da administração Planno</small></section><section className="login-side"><form className="login-form" onSubmit={submit}><span className="eyebrow">BEM-VINDO DE VOLTA</span><h2>Acesse sua plataforma</h2><p>Entre com sua conta de administrador.</p><Alert>{error || notice}</Alert>{!BASE && <div className="setup-notice" role="status"><strong>Acesso em preparação</strong><p>O painel já está neste endereço. O login será liberado assim que o servidor da plataforma estiver conectado.</p></div>}<label>E-mail<input name="email" disabled={!BASE} type="email" autoComplete="username" required placeholder="voce@planno.com.br" maxLength={254}/></label><label>Senha<input name="password" disabled={!BASE} type="password" autoComplete="current-password" required maxLength={120} placeholder="Sua senha"/></label><button className="primary" disabled={busy || !BASE}>{!BASE ? 'Aguardando conexão da plataforma' : busy ? 'Entrando…' : 'Entrar na plataforma'} <span aria-hidden="true">→</span></button><p className="login-foot">Acesso restrito a administradores da plataforma.</p></form></section></main>;
}
function ChangePassword({ call, logout }) {
  const [error, setError] = useState(''), [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault(); const form = new FormData(e.currentTarget);
    if (form.get('newPassword') !== form.get('confirm')) return setError('As novas senhas precisam ser iguais.');
    setBusy(true); setError('');
    try { await call('/auth/change-password', { body: { currentPassword: form.get('currentPassword'), newPassword: form.get('newPassword') } }); logout('Senha atualizada. Entre com sua nova senha.'); }
    catch (e) { if (e.status === 401 || e.status === 403) logout(e.message); else setError(e.message); } finally { setBusy(false); }
  }
  return <main className="center-screen"><form className="password-form" onSubmit={submit}><Brand/><h1>Crie sua nova senha</h1><p>Atualize a senha inicial para acessar a plataforma.</p><Alert>{error}</Alert>{[['currentPassword','Senha atual'],['newPassword','Nova senha'],['confirm','Confirme a nova senha']].map(([name, label]) => <label key={name}>{label}<input type="password" name={name} minLength={8} maxLength={120} required autoComplete={name === 'currentPassword' ? 'current-password' : 'new-password'}/></label>)}<button className="primary" disabled={busy}>{busy ? 'Salvando…' : 'Salvar nova senha'}</button><button type="button" className="text-button" onClick={() => logout()}>Voltar ao login</button></form></main>;
}
function Dashboard({ user, call, logout }) {
  const [data, setData] = useState(null), [error, setError] = useState(''), [busy, setBusy] = useState(true);
  const [period, setPeriod] = useState('LAST30DAYS'), [from, setFrom] = useState(''), [to, setTo] = useState('');
  const [query, setQuery] = useState('preset=LAST30DAYS'), [refresh, setRefresh] = useState(0), [updated, setUpdated] = useState(null);
  const currentCall = useRef(call); currentCall.current = call;
  useEffect(() => {
    const controller = new AbortController(); setBusy(true); setError(''); setData(null);
    currentCall.current(`/platform/dashboard/summary?${query}`, { signal: controller.signal }).then(result => { setData(result); setUpdated(new Date()); }).catch(e => {
      if (e.name === 'AbortError') return;
      if (e.status === 401 || e.status === 403) logout(e.message); else setError(e.message);
    }).finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => controller.abort();
  }, [query, refresh]);
  function apply(e) { e.preventDefault(); try { setQuery(periodQuery(period, from, to)); setRefresh(v => v + 1); } catch (e) { setError(e.message); } }
  return <div className="app-shell"><aside className="sidebar"><Brand/><div className="workspace-label">ADMINISTRAÇÃO</div><a className="nav-active" href="#overview"><span aria-hidden="true">▦</span> Visão geral <span className="nav-dot"/></a><a href="#stores"><span aria-hidden="true">▤</span> Comissões por loja</a><div className="sidebar-bottom"><div className="platform-badge">P</div><div><strong>Planno Store</strong><small>Conta da plataforma</small></div></div></aside><div className="main-shell"><header className="topbar"><span>Plataforma <span className="slash">/</span> <strong>Dashboard</strong></span><div className="account"><span className="avatar">{(user.firstName || user.email).slice(0,1).toUpperCase()}</span><span className="account-email">{user.email}</span><button className="text-button" onClick={() => logout()}>Sair</button></div></header><main className="dashboard" id="overview"><div className="heading"><div><span className="eyebrow">SEU NEGÓCIO, EM PERSPECTIVA</span><h1>Visão geral</h1><p>Vendas das lojas e comissões da plataforma.</p></div><span className="live-tag"><i/> {busy ? 'Atualizando' : error ? 'Conexão pendente' : 'Conectado à plataforma'}</span></div><form className="toolbar" onSubmit={apply}><div className="filters"><label>Período<select value={period} onChange={e => setPeriod(e.target.value)}><option value="TODAY">Hoje</option><option value="LAST7DAYS">Últimos 7 dias</option><option value="LAST30DAYS">Últimos 30 dias</option><option value="MONTH">Este mês</option><option value="CUSTOM">Personalizado</option></select></label>{period === 'CUSTOM' && <><label>De<input aria-label="Data inicial" type="date" value={from} onChange={e => setFrom(e.target.value)} required/></label><label>Até<input aria-label="Data final" type="date" value={to} min={from} onChange={e => setTo(e.target.value)} required/></label></>}<button className="secondary" disabled={busy}>Aplicar</button></div><button className="refresh" type="button" disabled={busy} onClick={() => setRefresh(v => v + 1)}><span aria-hidden="true">↻</span> Atualizar</button></form><Alert>{error}</Alert>{busy && <div className="loading" role="status"><div className="spinner"/>Carregando os indicadores da plataforma…</div>}{!busy && !data && <div className="empty panel"><h2>Não conseguimos carregar o painel</h2><p>Verifique se o backend está disponível e tente atualizar.</p><button className="secondary" onClick={() => setRefresh(v => v + 1)}>Tentar novamente</button></div>}{!busy && data && <><div className="range-label">{date(data.from)} — {date(data.to)} <span>Horário de Brasília</span></div><section className="metrics" aria-label="Indicadores"><Metric featured title="Comissões da Planno" value={money(data.platformCommissionTotal)} caption="Comissões registradas nos pedidos"/><Metric title="Vendas das lojas" value={money(data.grossRevenue)} caption="Volume bruto dos pedidos pagos"/><Metric title="Pedidos pagos" value={integer(data.paidOrdersCount)} caption={`Ticket médio de ${money(data.averageTicket)}`}/><Metric title="Lojas cadastradas" value={integer(data.storesCount)} caption="Total de lojas na plataforma"/></section><div className="chart-grid"><section className="panel"><div className="panel-heading"><div><h2>Evolução das comissões</h2><p>Comissões registradas por dia</p></div><span className="legend"><i/> Planno</span></div><Chart rows={data.salesByDay} from={data.from} to={data.to}/></section><section className="panel ranking"><div className="panel-heading"><div><h2>Lojas em destaque</h2><p>As maiores vendas no período</p></div></div>{data.topStores.length ? data.topStores.map((store, index) => <div className="rank-row" key={store.storeId}><span className="rank-number">{String(index + 1).padStart(2,'0')}</span><div className="rank-detail"><strong>{store.storeName}</strong><div className="rank-track"><i style={{ width: `${Number(data.topStores[0].grossRevenue) ? Number(store.grossRevenue)/Number(data.topStores[0].grossRevenue)*100 : 0}%` }}/></div></div><span>{money(store.grossRevenue)}</span></div>) : <div className="empty">Nenhuma loja com pedidos pagos neste período.</div>}</section></div><section className="panel stores-panel" id="stores"><div className="panel-heading"><div><h2>Comissões por loja</h2><p>Participação de cada loja no resultado da plataforma</p></div><span className="count-badge">{data.commissionByStore.length} lojas no período</span></div><div className="table-scroll"><table><thead><tr><th>Loja</th><th>Pedidos pagos</th><th>Vendas brutas</th><th>Comissão Planno</th><th>Líquido do lojista*</th></tr></thead><tbody>{data.commissionByStore.map(store => <tr key={store.storeId}><td><span className="store-icon">{store.storeName.slice(0,1).toUpperCase()}</span>{store.storeName}</td><td>{integer(store.paidOrdersCount)}</td><td>{money(store.grossRevenue)}</td><td className="commission-cell">{money(store.platformCommissionTotal)}</td><td>{money(store.sellerNetTotal)}</td></tr>)}</tbody></table>{!data.commissionByStore.length && <div className="empty">Não há comissões registradas para o período selecionado.</div>}</div><p className="table-foot">*Valor registrado no pedido; não representa confirmação de repasse.</p></section><div className="order-strip"><span><i className="pending-dot"/> Aguardando pagamento <strong>{integer(data.waitingPaymentOrdersCount)}</strong></span><span><i className="cancel-dot"/> Cancelados <strong>{integer(data.cancelledOrdersCount)}</strong></span></div><details className="methodology"><summary>Como estes números são calculados</summary><p>Este painel reproduz os indicadores atuais do backend: pedidos com status “pago”, agrupados pela data de criação. Pedidos que avançaram para processamento, envio ou entrega não entram nesses totais. Mensalidades SaaS e ajustes financeiros de estornos não são consolidados aqui. Os valores não representam saldo disponível ou liquidação confirmada.</p></details><footer>Planno · Administração da plataforma <span>Atualizado às {updated?.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' })}</span></footer></>}</main></div></div>;
}
function Metric({ title, value, caption, featured }) { return <article className={`metric ${featured ? 'featured' : ''}`}><div className="metric-label">{title}<span aria-hidden="true">{featured ? '↗' : '·'}</span></div><strong>{value}</strong><p>{caption}</p></article>; }
function Chart({ rows, from, to }) {
  if (!rows.length) return <div className="empty chart-empty">Sem comissões registradas neste período.</div>;
  const start = new Date(`${from}T00:00:00Z`).getTime(), end = new Date(`${to}T00:00:00Z`).getTime();
  const values = rows.map(r => Number(r.platformCommissionTotal));
  const max = Math.max(...values, 1);
  const x = day => 70 + (end === start ? .5 : (new Date(`${day}T00:00:00Z`).getTime() - start)/(end-start)) * 630;
  const points = rows.map((r,i) => `${x(r.day)},${180-values[i]/max*145}`).join(' ');
  return <div className="chart"><svg viewBox="0 0 740 220" role="img" aria-label="Comissões diárias da Planno. Valores detalhados abaixo.">{[0,.5,1].map(v => <g key={v}><line x1="70" x2="715" y1={180-v*145} y2={180-v*145} stroke="#e9eeea" strokeDasharray="4 5"/><text x="58" y={185-v*145} textAnchor="end" fill="#708077" fontSize="12">{new Intl.NumberFormat('pt-BR',{notation:'compact',maximumFractionDigits:1}).format(max*v)}</text></g>)}<polygon points={`${x(rows[0].day)},180 ${points} ${x(rows.at(-1).day)},180`} fill="#e9f3dd"/><polyline points={points} fill="none" stroke="#44823d" strokeWidth="3" strokeLinejoin="round"/>{rows.map((r,i) => <circle key={r.day} cx={x(r.day)} cy={180-values[i]/max*145} r="4" fill="#44823d"><title>{date(r.day)}: {money(values[i])}</title></circle>)}<text x="70" y="212" fontSize="12" fill="#708077">{date(from)}</text><text x="715" y="212" textAnchor="end" fontSize="12" fill="#708077">{date(to)}</text></svg><details className="chart-values"><summary>Ver valores por dia</summary><div className="table-scroll"><table><thead><tr><th>Dia</th><th>Vendas</th><th>Comissão</th></tr></thead><tbody>{rows.map(r => <tr key={r.day}><td>{date(r.day)}</td><td>{money(r.grossRevenue)}</td><td>{money(r.platformCommissionTotal)}</td></tr>)}</tbody></table></div></details></div>;
}
createRoot(document.getElementById('root')).render(<App/>);
