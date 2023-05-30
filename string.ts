/** Converts kebab-, snake-cased or whitespaced string to camelCase */
export function camelize(str: string) {
  let camelized = "";
  let toCapital = false;

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

export function hammingDistance(str1: string, str2: string): number {
  if (str1.length !== str2.length) {
    throw new Error("Strings should be the same length");
  }

  let count = 0;

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      count++;
    }
  }

  return count;
}

export function truncate(str: string, num = 50, ellipsis = "…"): string {
  return str.length >= num
    ? str.slice(0, num >= ellipsis.length ? num - ellipsis.length : num) +
      ellipsis
    : str;
}
