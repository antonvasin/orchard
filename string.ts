/** Converts kebab-, snake-cased or whitespaced string to camelCase */
export function camelize(str: string) {
  let camelized = "";

  let toCapital = false;

  // TODO: bench with for loop
  for (const char of str) {
    if (char === "_" || char === "-" || char === " ") {
      toCapital = true;
      continue;
    }

    if (toCapital) {
      camelized += char.toUpperCase();
      toCapital = false;
      continue;
    }

    camelized += char.toLowerCase();
  }

  return camelized;
}
