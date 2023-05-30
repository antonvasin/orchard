export function debounce<T extends Array<unknown>>(
  fn: (...args: T) => void,
  interval = 250,
  immediate = true,
) {
  let timeout: number | null = null;

  return (...args: T) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (!immediate) fn(...args);
    }, interval);

    if (immediate && !timeout) fn(...args);
  };
}

export function throttle<T extends Array<unknown>>(
  fn: (...args: T) => void,
  interval = 250,
) {
  let isThrottling = false;

  return (...args: T) => {
    if (!isThrottling) {
      fn(...args);
      isThrottling = true;
      setTimeout(() => {
        isThrottling = false;
      }, interval);
    }
  };
}

export function wait(time = 1) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
