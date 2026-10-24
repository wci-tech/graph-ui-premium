import type { RegistryConfig, RegistryKey } from '@/registry';

export const createRegistry = <K extends RegistryKey, M>(config: RegistryConfig<K, M>) => {
  const moduleCache = new Map<K, M>();
  const promiseCache = new Map<K, Promise<M>>();

  return (key: K, fallback?: K): M => {
    // eager
    const eager = config.eager?.[key];
    if (eager) {
      moduleCache.set(key, eager);
      return eager;
    }

    // resolved cache
    const cached = moduleCache.get(key);
    if (cached) return cached;

    // lazy module resolver (dynamic import factory)
    const lazyResolver = config.lazy?.[key];

    if (!lazyResolver) {
      if (fallback) {
        const fb = config.eager?.[fallback];
        if (fb) return fb;
      }
      throw new Error(`Registry: no module found for "${String(key)}"`);
    }

    // inflight promise
    const inflight = promiseCache.get(key);
    if (inflight) throw inflight;

    const promise = lazyResolver().then((mod: M) => {
      moduleCache.set(key, mod);
      promiseCache.delete(key);
      return mod;
    });

    promiseCache.set(key, promise);
    throw promise;
  };
};
