type CssConsoleString = [string, string];
/**
 * @example
 * ```ts
 * console.log(...bold('Request: '), req.path)
 * ```
 */
export const bold = (str: CssConsoleString) =>
  wrapOrPush(str, "font-weight: bold");
export const italic = (str: CssConsoleString) =>
  wrapOrPush(str, "font-style: italic");
export const red = (str: CssConsoleString) => wrapOrPush(str, "color: red");
export const blue = (str: CssConsoleString) => wrapOrPush(str, "color: blue");

function isCssAry(ary: CssConsoleString): ary is [string, string] {
  return Array.isArray(ary) && ary.length === 2 &&
    !!ary[ary.length - 1].match(/^([0-9A-Za-z-]+):/);
}

function wrapOrPush(aryOrStr: CssConsoleString, css: string) {
  if (isCssAry(aryOrStr)) {
    const [msg, cssStr] = aryOrStr;
    return [msg, cssStr + `; ${css}`];
  } else {
    return wrap(aryOrStr, css);
  }
}

function wrap(msg: string, css: string) {
  return [`%c${msg}`, css];
}
