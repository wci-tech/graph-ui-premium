import { describe, expect, it } from 'vitest';

import { CHART_ENGINE_ALIASES, resolveEngineAlias } from '@/engines/engine.aliases';
import type { ExplicitChartEngine } from '@/engines/engine.aliases';
import type { ResolvedChartEngine } from '@/engines/engine.types';

describe('engine aliases', () => {
  describe('CHART_ENGINE_ALIASES', () => {
    it('exports the complete engine alias mapping', () => {
      expect(CHART_ENGINE_ALIASES).toEqual({
        'chart-1': 'chartjs',
        'chart-2': 'echarts',
        'chart-3': 'uplot',
      });
    });

    it('contains all explicit chart engines', () => {
      expect(Object.keys(CHART_ENGINE_ALIASES)).toEqual(['chart-1', 'chart-2', 'chart-3']);
    });

    it('contains all resolved chart engines', () => {
      expect(Object.values(CHART_ENGINE_ALIASES)).toEqual(['chartjs', 'echarts', 'uplot']);
    });

    it('does not contain the auto engine', () => {
      expect(CHART_ENGINE_ALIASES).not.toHaveProperty('auto');
    });
  });

  describe('resolveEngineAlias', () => {
    it.each([
      ['chart-1', 'chartjs'],
      ['chart-2', 'echarts'],
      ['chart-3', 'uplot'],
    ] as const)('resolves "%s" to "%s"', (engine, expectedEngine) => {
      expect(resolveEngineAlias(engine)).toBe(expectedEngine);
    });

    it('returns the exact value stored in the alias map', () => {
      const engines: ExplicitChartEngine[] = ['chart-1', 'chart-2', 'chart-3'];

      engines.forEach((engine) => {
        expect(resolveEngineAlias(engine)).toBe(CHART_ENGINE_ALIASES[engine]);
      });
    });

    it('returns a supported resolved chart engine for every alias', () => {
      const expectedEngines: ResolvedChartEngine[] = ['chartjs', 'echarts', 'uplot'];

      const resolvedEngines = (Object.keys(CHART_ENGINE_ALIASES) as ExplicitChartEngine[]).map(
        resolveEngineAlias,
      );

      expect(resolvedEngines).toEqual(expectedEngines);
    });

    it('returns undefined at runtime for an unknown alias', () => {
      const invalidEngine = 'chart-4' as ExplicitChartEngine;

      expect(resolveEngineAlias(invalidEngine)).toBeUndefined();
    });
  });
});
