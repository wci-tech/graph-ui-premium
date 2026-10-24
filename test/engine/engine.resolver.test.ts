import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ChartEngine, ChartType, ResolvedChartEngine } from '@/engines/engine.types';

const { mockResolveEngineAlias, mockSupportsChartType } = vi.hoisted(() => ({
  mockResolveEngineAlias: vi.fn<(engine: Exclude<ChartEngine, 'auto'>) => ResolvedChartEngine>(),

  mockSupportsChartType: vi.fn<(engine: ResolvedChartEngine, type: ChartType) => boolean>(),
}));

vi.mock('@/engines/engine.aliases', () => ({
  resolveEngineAlias: mockResolveEngineAlias,
}));

vi.mock('@/engines/engine.matrix', () => ({
  DEFAULT_ENGINE: 'chartjs',
  AUTO_ENGINE_PRIORITY: ['chartjs', 'echarts', 'uplot'],
  supportsChartType: mockSupportsChartType,
}));

import { resolveChartEngine } from '@/engines/engine.resolver';

describe('resolveChartEngine', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockResolveEngineAlias.mockImplementation((engine) => {
      if (engine === 'chart-1') return 'chartjs';
      if (engine === 'chart-2') return 'echarts';

      return 'uplot';
    });
  });

  it('resolves chart-1 to chartjs when chartjs supports the chart type', () => {
    mockSupportsChartType.mockReturnValue(true);

    const result = resolveChartEngine({
      engine: 'chart-1',
      type: 'bar',
    });

    expect(result).toBe('chartjs');

    expect(mockResolveEngineAlias).toHaveBeenCalledTimes(1);
    expect(mockResolveEngineAlias).toHaveBeenCalledWith('chart-1');

    expect(mockSupportsChartType).toHaveBeenCalledTimes(1);
    expect(mockSupportsChartType).toHaveBeenCalledWith('chartjs', 'bar');
  });

  it('resolves chart-2 to echarts when echarts supports the chart type', () => {
    mockSupportsChartType.mockReturnValue(true);

    const result = resolveChartEngine({
      engine: 'chart-2',
      type: 'bar',
    });

    expect(result).toBe('echarts');

    expect(mockResolveEngineAlias).toHaveBeenCalledTimes(1);
    expect(mockResolveEngineAlias).toHaveBeenCalledWith('chart-2');

    expect(mockSupportsChartType).toHaveBeenCalledTimes(1);
    expect(mockSupportsChartType).toHaveBeenCalledWith('echarts', 'bar');
  });

  it('resolves chart-3 to uplot when uplot supports the chart type', () => {
    mockSupportsChartType.mockReturnValue(true);

    const result = resolveChartEngine({
      engine: 'chart-3',
      type: 'line',
    });

    expect(result).toBe('uplot');

    expect(mockResolveEngineAlias).toHaveBeenCalledTimes(1);
    expect(mockResolveEngineAlias).toHaveBeenCalledWith('chart-3');

    expect(mockSupportsChartType).toHaveBeenCalledTimes(1);
    expect(mockSupportsChartType).toHaveBeenCalledWith('uplot', 'line');
  });

  it('returns null when the resolved explicit engine does not support the chart type', () => {
    mockSupportsChartType.mockReturnValue(false);

    const result = resolveChartEngine({
      engine: 'chart-2',
      type: 'bar',
    });

    expect(result).toBeNull();

    expect(mockResolveEngineAlias).toHaveBeenCalledTimes(1);
    expect(mockResolveEngineAlias).toHaveBeenCalledWith('chart-2');

    expect(mockSupportsChartType).toHaveBeenCalledTimes(1);
    expect(mockSupportsChartType).toHaveBeenCalledWith('echarts', 'bar');
  });

  it('uses auto as the default engine value', () => {
    mockSupportsChartType.mockReturnValue(true);

    const result = resolveChartEngine({
      type: 'line',
    });

    expect(result).toBe('chartjs');

    expect(mockResolveEngineAlias).not.toHaveBeenCalled();

    expect(mockSupportsChartType).toHaveBeenCalledTimes(1);
    expect(mockSupportsChartType).toHaveBeenCalledWith('chartjs', 'line');
  });

  it('returns the default engine when auto is used and the default engine supports the chart type', () => {
    mockSupportsChartType.mockImplementation((engine) => engine === 'chartjs');

    const result = resolveChartEngine({
      engine: 'auto',
      type: 'scatter',
    });

    expect(result).toBe('chartjs');

    expect(mockResolveEngineAlias).not.toHaveBeenCalled();

    expect(mockSupportsChartType).toHaveBeenCalledTimes(1);
    expect(mockSupportsChartType).toHaveBeenCalledWith('chartjs', 'scatter');
  });

  it('returns the first supported engine from the priority list when the default engine does not support the chart type', () => {
    mockSupportsChartType.mockImplementation((engine) => engine === 'echarts');

    const result = resolveChartEngine({
      engine: 'auto',
      type: 'sunburst',
    });

    expect(result).toBe('echarts');

    expect(mockResolveEngineAlias).not.toHaveBeenCalled();

    expect(mockSupportsChartType).toHaveBeenCalledTimes(3);

    expect(mockSupportsChartType).toHaveBeenNthCalledWith(1, 'chartjs', 'sunburst');

    expect(mockSupportsChartType).toHaveBeenNthCalledWith(2, 'chartjs', 'sunburst');

    expect(mockSupportsChartType).toHaveBeenNthCalledWith(3, 'echarts', 'sunburst');
  });

  it('returns uplot when it is the first supported engine in the priority list', () => {
    mockSupportsChartType.mockImplementation((engine) => engine === 'uplot');

    const result = resolveChartEngine({
      engine: 'auto',
      type: 'line',
    });

    expect(result).toBe('uplot');

    expect(mockResolveEngineAlias).not.toHaveBeenCalled();

    expect(mockSupportsChartType).toHaveBeenCalledTimes(4);

    expect(mockSupportsChartType).toHaveBeenNthCalledWith(1, 'chartjs', 'line');

    expect(mockSupportsChartType).toHaveBeenNthCalledWith(2, 'chartjs', 'line');

    expect(mockSupportsChartType).toHaveBeenNthCalledWith(3, 'echarts', 'line');

    expect(mockSupportsChartType).toHaveBeenNthCalledWith(4, 'uplot', 'line');
  });

  it('returns null when no engine supports the chart type', () => {
    mockSupportsChartType.mockReturnValue(false);

    const result = resolveChartEngine({
      engine: 'auto',
      type: 'donut',
    });

    expect(result).toBeNull();

    expect(mockResolveEngineAlias).not.toHaveBeenCalled();

    expect(mockSupportsChartType).toHaveBeenCalledTimes(4);

    expect(mockSupportsChartType).toHaveBeenNthCalledWith(1, 'chartjs', 'donut');

    expect(mockSupportsChartType).toHaveBeenNthCalledWith(2, 'chartjs', 'donut');

    expect(mockSupportsChartType).toHaveBeenNthCalledWith(3, 'echarts', 'donut');

    expect(mockSupportsChartType).toHaveBeenNthCalledWith(4, 'uplot', 'donut');
  });
});
