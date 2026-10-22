export type RegistryKey = string | number | symbol;

export type LazyLoader<M> = () => Promise<M>;

export type RegistryConfig<K extends RegistryKey, M> = Readonly<{
  eager?: Partial<Record<K, M>>;
  lazy?: Partial<Record<K, LazyLoader<M>>>;
}>;

export type Registry<K extends RegistryKey, M> = (key: K, fallback?: K) => M;
