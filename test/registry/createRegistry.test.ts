import { describe, expect, it, vi } from 'vitest';

import { createRegistry } from '@/registry/createRegistry';

type TestRegistryKey = 'primary' | 'secondary' | 'fallback' | 'missing';

type TestModule = Readonly<{
  name: string;
}>;

describe('createRegistry', () => {
  it('returns an eager module', () => {
    const primaryModule: TestModule = {
      name: 'primary',
    };

    const getComponent = createRegistry<TestRegistryKey, TestModule>({
      eager: {
        primary: primaryModule,
      },
    });

    expect(getComponent('primary')).toBe(primaryModule);
  });

  it('stores an eager module in the resolved module cache', () => {
    const primaryModule: TestModule = {
      name: 'primary',
    };

    const getComponent = createRegistry<TestRegistryKey, TestModule>({
      eager: {
        primary: primaryModule,
      },
    });

    const firstResult = getComponent('primary');
    const secondResult = getComponent('primary');

    expect(firstResult).toBe(primaryModule);
    expect(secondResult).toBe(primaryModule);
  });

  it('throws the lazy module promise while the module is loading', () => {
    const secondaryModule: TestModule = {
      name: 'secondary',
    };

    const lazyResolver = vi.fn<() => Promise<TestModule>>(() => Promise.resolve(secondaryModule));

    const getComponent = createRegistry<TestRegistryKey, TestModule>({
      lazy: {
        secondary: lazyResolver,
      },
    });

    expect(() => getComponent('secondary')).toThrow(Promise);

    expect(lazyResolver).toHaveBeenCalledTimes(1);
  });

  it('throws the same in-flight promise when requested more than once', () => {
    let resolveModule: ((module: TestModule) => void) | undefined;

    const lazyPromise = new Promise<TestModule>((resolve) => {
      resolveModule = resolve;
    });

    const lazyResolver = vi.fn<() => Promise<TestModule>>(() => lazyPromise);

    const getComponent = createRegistry<TestRegistryKey, TestModule>({
      lazy: {
        secondary: lazyResolver,
      },
    });

    let firstThrownValue: unknown;
    let secondThrownValue: unknown;

    try {
      getComponent('secondary');
    } catch (error: unknown) {
      firstThrownValue = error;
    }

    try {
      getComponent('secondary');
    } catch (error: unknown) {
      secondThrownValue = error;
    }

    expect(firstThrownValue).toBeInstanceOf(Promise);
    expect(secondThrownValue).toBe(firstThrownValue);
    expect(lazyResolver).toHaveBeenCalledTimes(1);

    resolveModule?.({
      name: 'secondary',
    });
  });

  it('returns the resolved lazy module from the module cache', async () => {
    const secondaryModule: TestModule = {
      name: 'secondary',
    };

    const lazyResolver = vi.fn<() => Promise<TestModule>>(() => Promise.resolve(secondaryModule));

    const getComponent = createRegistry<TestRegistryKey, TestModule>({
      lazy: {
        secondary: lazyResolver,
      },
    });

    let thrownPromise: Promise<TestModule> | undefined;

    try {
      getComponent('secondary');
    } catch (error: unknown) {
      if (error instanceof Promise) {
        thrownPromise = error as Promise<TestModule>;
      }
    }

    expect(thrownPromise).toBeDefined();

    await expect(thrownPromise).resolves.toBe(secondaryModule);

    const result = getComponent('secondary');

    expect(result).toBe(secondaryModule);
    expect(lazyResolver).toHaveBeenCalledTimes(1);
  });

  it('removes the resolved promise from the in-flight cache', async () => {
    const secondaryModule: TestModule = {
      name: 'secondary',
    };

    const lazyResolver = vi.fn<() => Promise<TestModule>>(() => Promise.resolve(secondaryModule));

    const getComponent = createRegistry<TestRegistryKey, TestModule>({
      lazy: {
        secondary: lazyResolver,
      },
    });

    let thrownPromise: Promise<TestModule> | undefined;

    try {
      getComponent('secondary');
    } catch (error: unknown) {
      if (error instanceof Promise) {
        thrownPromise = error as Promise<TestModule>;
      }
    }

    await thrownPromise;

    expect(getComponent('secondary')).toBe(secondaryModule);
    expect(getComponent('secondary')).toBe(secondaryModule);
    expect(lazyResolver).toHaveBeenCalledTimes(1);
  });

  it('returns an eager fallback when the requested module does not exist', () => {
    const fallbackModule: TestModule = {
      name: 'fallback',
    };

    const getComponent = createRegistry<TestRegistryKey, TestModule>({
      eager: {
        fallback: fallbackModule,
      },
    });

    const result = getComponent('missing', 'fallback');

    expect(result).toBe(fallbackModule);
  });

  it('throws when the requested module and fallback module do not exist', () => {
    const getComponent = createRegistry<TestRegistryKey, TestModule>({
      eager: {},
      lazy: {},
    });

    expect(() => getComponent('missing', 'fallback')).toThrowError(
      'Registry: no module found for "missing"',
    );
  });

  it('throws when the requested module does not exist and no fallback is provided', () => {
    const getComponent = createRegistry<TestRegistryKey, TestModule>({
      eager: {},
      lazy: {},
    });

    expect(() => getComponent('missing')).toThrowError('Registry: no module found for "missing"');
  });

  it('works when eager and lazy configurations are omitted', () => {
    const getComponent = createRegistry<TestRegistryKey, TestModule>({});

    expect(() => getComponent('missing')).toThrowError('Registry: no module found for "missing"');
  });
});
