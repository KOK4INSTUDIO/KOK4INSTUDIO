export function uid() {
  return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())
}

