import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
export function Brand() { return <a className="brand" href="/" aria-label="Planno, página inicial"><img src="/planno-logo.png" alt=""/>planno<span>.</span></a> }
export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    truck: <><path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
    box: <><path d="m12 3 9 5-9 5-9-5 9-5ZM3 8v9l9 5 9-5V8M12 13v9M7 5.8l9 5"/></>,
    store: <><path d="M3 9h18l-2-6H5L3 9ZM4 9v11h16V9M9 20v-7h6v7"/></>,
    link: <><path d="m10 13 4-4M8 16l-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M16 8l1-1a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(0 -1) scale(.95)"/></>,
    plus: <path d="M12 5v14M5 12h14"/>, arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
    check: <path d="m5 12 4 4L19 6"/>, close: <path d="m6 6 12 12M6 18 18 6"/>,
    edit: <><path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14v6ZM13 20h8"/></>,
    logout: <><path d="M9 4H4v16h5M10 12h11m-4-4 4 4-4 4"/></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-5"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.box}</svg>
}
export function Alert({ children, success = false }: { children?: ReactNode; success?: boolean }) {
  return children ? <div className={`notice ${success ? 'success' : ''}`} role={success ? 'status' : 'alert'}>{children}</div> : null
}
export function Loading() { return <div className="loading" role="status"><span className="spinner"/>Carregando os dados da loja…</div> }
export function Modal({ title, subtitle, children, close, busy = false }: { title: string; subtitle?: string; children: ReactNode; close: () => void; busy?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { const dialog = ref.current; dialog?.showModal(); return () => dialog?.close() }, [])
  return <dialog ref={ref} className="modal" aria-labelledby="dialog-title" onCancel={event => { event.preventDefault(); if (!busy) close() }}>
    <header><div><p className="eyebrow">CONFIGURAÇÃO DA LOJA</p><h2 id="dialog-title">{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button type="button" className="icon-button" aria-label="Fechar" disabled={busy} onClick={close}><Icon name="close"/></button></header>{children}
  </dialog>
}
