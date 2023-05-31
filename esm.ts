/** Cache busting for import(). Useful for local debugging and REPLs */
export function reimport(url: string) {
  return import(`${url}?${Date.now()}`);
}
