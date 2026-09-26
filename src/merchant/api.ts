import type { User } from './types'
export const API_BASE = import.meta.env.VITE_MERCHANT_API_BASE_URL || import.meta.env.VITE_PLATFORM_API_BASE_URL || (import.meta.env.DEV ? '/api/v1' : '')
const SESSION_KEY = 'planno.merchant.token'
export function storedToken() { try { return sessionStorage.getItem(SESSION_KEY) } catch { return null } }
export function saveToken(token: string | null) {
  try { if (token) sessionStorage.setItem(SESSION_KEY, token); else sessionStorage.removeItem(SESSION_KEY) } catch { /* Session remains in memory when storage is unavailable. */ }
}
export function accessError(user: User): string | null {
  if (!user.roles?.some(role => role === 'ROLE_ADMIN' || role === 'ADMIN')) return 'Use uma conta de administrador da loja. O acesso da plataforma é separado.'
  if (user.storeIds?.length !== 1) return 'Esta conta precisa estar vinculada a uma única loja. Peça à Planno para revisar seu acesso antes de continuar.'
  return null
}
export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) { super(message); this.status = status }
}
const messages: Record<number, string> = {
  400: 'Confira os campos preenchidos. Verifique também os dados exigidos para a modalidade escolhida.',
  401: 'Sua sessão expirou. Entre novamente.',
  403: 'Sua conta não tem permissão para essa ação.',
  404: 'Esse recurso não está disponível. Atualize a página ou confirme se o servidor já recebeu a atualização de frete.',
  409: 'Os dados mudaram ou já estão em uso. Atualize a página antes de tentar novamente.',
  429: 'Muitas tentativas. Aguarde um momento antes de tentar novamente.',
  503: 'O serviço está temporariamente indisponível. Tente novamente em instantes.',
}
export async function request<T>(path: string, token: string | null, options: { method?: string; body?: unknown; signal?: AbortSignal } = {}): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_BASE.replace(/\/$/, '')}${path}`, {
      method: options.method || 'GET', signal: options.signal, credentials: 'omit',
      headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}) },
      ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw error
    throw new ApiError('Não foi possível conectar. Verifique sua conexão e tente novamente.', 0)
  }
  if (!response.ok) throw new ApiError(path === '/auth/login' && response.status === 401 ? 'E-mail ou senha incorretos.' : messages[response.status] || 'Não foi possível concluir. Tente novamente em instantes.', response.status)
  if (response.status === 204) return undefined as T
  try { return await response.json() as T } catch { throw new ApiError('O servidor retornou dados inesperados. Tente novamente.', 502) }
}
