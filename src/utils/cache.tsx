import NodeCache from 'node-cache';

const cache = new NodeCache();

export function setCache(key: string, value: any, ttl: number = 60): void {
  cache.set(key, value, ttl);
}

export function getCache<T>(key: string): T | undefined {
  return cache.get(key) as T | undefined;
}
