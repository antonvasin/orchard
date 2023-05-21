/** Converts kebab-, snake-cased or whitespaced string to camelCase */
export function camelize(str: string) {
  let camelized = "";
  const delims = ["_", "-", " "];

  let toCapital = false;
  let start = true;

  // TODO: bench with for loop
  for (const char of str) {
    if (delims.includes(char)) {
      toCapital = true;
      continue;
    }

    if (toCapital) {
      camelized += char.toUpperCase();
      toCapital = false;
      continue;
    }

    if (start) {
      camelized += char.toLowerCase();
      continue;
    }

    camelized += char.toLowerCase();
  }

  if (start) {
    start = false;
  }
  return camelized;
}
