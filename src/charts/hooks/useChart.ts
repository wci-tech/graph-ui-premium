import { useEffect, useMemo, useState } from 'react';

import { resolveChartEngine } from '@/engines/engine.resolver';
import { loadChartEngine } from '@/engines/engine.runtime';
import type { EngineModule } from '@/engines/engine.types';

import type { ChartProps } from '../Chart.types';

type UseChartProps = Pick<ChartProps, 'engine' | 'type'> & {
  readonly enabled?: boolean;
};

export const useChart = ({ engine = 'auto', type, enabled = true }: UseChartProps) => {
  const [engineModule, setEngineModule] = useState<EngineModule | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const resolvedEngine = useMemo(
    () =>
      resolveChartEngine({
        engine,
        type,
      }),
    [engine, type],
  );

  useEffect(() => {
    let isMounted = true;

    /*
     * renderWhenVisible charts remain here until Chart enables them.
     */
    if (!enabled) {
      setEngineModule(null);
      setIsLoading(false);

      return () => {
        isMounted = false;
      };
    }

    /*
     * Clear any previous engine instance before loading the resolved one.
     */
    setEngineModule(null);

    if (!resolvedEngine) {
      setIsLoading(false);

      return () => {
        isMounted = false;
      };
    }

    setIsLoading(true);

    loadChartEngine(resolvedEngine)
      .then((module) => {
        if (!isMounted) {
          return;
        }

        setEngineModule(module);
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return;
        }

        console.error('Chart engine load error:', error);
      })
      .finally(() => {
        if (!isMounted) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [enabled, resolvedEngine]);

  return {
    resolvedEngine,
    engineModule,
    isLoading,
  };
};
