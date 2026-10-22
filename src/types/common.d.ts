type WithDataAttributes<T = unknown> = T & {
  [key: `data-${string}`]: string | undefined;
};

interface ICustomStyles {
  [key: string]: unknown;
}

interface IntersectionObserverOptions {
  onIntersect?: (isIntersecting: boolean) => void;
  rootElement?: Element | null;
  rootMarginValue?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}
