export class ApiError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}
export const isPlatformAdmin = user => user?.roles?.includes('ROLE_PLATFORM_ADMIN') || user?.roles?.includes('PLATFORM_ADMIN');
export function periodQuery(period, from, to) {
  if (period !== 'CUSTOM') return new URLSearchParams({ preset: period }).toString();
  if (!from || !to || from > to) throw new Error('Informe um período válido, com início anterior ou igual ao fim.');
  return new URLSearchParams({ from, to }).toString();
}
export async function request(path, { token, body, signal, base = '/api/v1' } = {}) {
  let response;
  try {
    response = await fetch(`${base.replace(/\/$/, '')}${path}`, {
      method: body ? 'POST' : 'GET', signal,
      headers: { Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError('Não foi possível conectar ao servidor. Verifique a conexão e tente novamente.', 0);
  }
  if (!response.ok) {
    const message = response.status === 401 ? 'Sessão expirada ou credenciais inválidas. Entre novamente.' : response.status === 403 ? 'Esta conta não tem acesso ao painel da plataforma.' : response.status === 429 ? 'Muitas tentativas. Aguarde um momento e tente novamente.' : response.status === 400 ? 'Não foi possível concluir. Confira os dados informados.' : 'O servidor não conseguiu concluir a solicitação. Tente novamente.';
    throw new ApiError(message, response.status);
  }
  if (response.status === 204) return null;
  try { return await response.json(); } catch { throw new ApiError('O servidor retornou uma resposta inesperada.', 502); }
}
