import { useEffect } from 'react';

// A full navigation loads the isolated static Pages entry, without landing CSS.
export function SuperadminRedirect() {
  useEffect(() => {
    window.location.replace(`/superadmin/${window.location.search}${window.location.hash}`);
  }, []);
  return <p role="status">Abrindo o painel da plataforma…</p>;
}
