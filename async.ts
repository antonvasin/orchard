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

export function rateLimit(max: number, windowMs: number): () => Promise<void> {
  const timestamps: number[] = [];
  let lock: Promise<void> = Promise.resolve();

  const purge = () => {
    while (timestamps.length > 0 && timestamps[0] < Date.now() - windowMs) {
      timestamps.shift();
    }
  };

  return () => {
    lock = lock.then(async () => {
      purge();
      if (timestamps.length >= max) {
        await wait(timestamps[0] + windowMs - Date.now());
        purge();
      }
      timestamps.push(Date.now());
    });

    return lock;
  };
}

export function rateLimitTokenBucket(max: number, rate: number) {
  let tokens: number;
  let lastRefill = Date.now();
  let lock: Promise<void> = Promise.resolve();

  const refill = () => {
    const now = Date.now();
    if (now > lastRefill) {
      tokens = Math.min(max, tokens + (now - lastRefill) * rate);
      lastRefill = Date.now();
    }
  };

  return () => {
    return lock = lock.then(async () => {
      refill();
      if (tokens < 1) {
        await wait(Math.ceil((1 - tokens) / rate));
        refill();
      }
      tokens -= 1;
    });
  };
}

export function wait(time = 1) {
  return new Promise<void>((resolve) => setTimeout(resolve, Math.max(0, time)));
}

export function timeout<R, T extends unknown[]>(
  fn: (...args: T) => Promise<R>,
  timeout = 250,
) {
  return (...args: T) => Promise.race([fn(...args), wait(timeout)]);
}

export class Queue<T extends { id: string; retryCount?: number }> {
  private items: T[] = [];
  private isRunning = false;
  constructor(private processItem: (item: T) => Promise<any>) {}
  enqueu(item: T) {
    this.items.push(item);
    this.process();
  }
  dequeue() {
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length < 1;
  }
  private async process() {
    if (this.isRunning) return;
    this.isRunning = true;
    while (!this.isEmpty) {
      const next = this.dequeue();
      if (!next) continue;
      try {
        await this.processItem(next);
      } catch {
        next.retryCount ??= 0;
        next.retryCount++;
        await wait(Math.pow(100, next.retryCount - 1));
        this.enqueu(next);
      }
    }
    this.isRunning = false;
  }
}

export async function ppool<T, O = unknown>(
  items: T[],
  fn: (items: T) => Promise<O>,
  concurrency = 5,
) {
  const cursor = items.entries();
  const result: O[] = [];

  const workers = Array(concurrency).fill(cursor).map(async () => {
    for (const [i, item] of cursor) {
      try {
        result[i] = await fn(item);
      } catch (e) {
        console.debug(e);
      }
    }
  });

  await Promise.allSettled(workers);
  return result;
}
