import {
  AUTO_ENGINE_PRIORITY,
  DEFAULT_ENGINE,
  ENGINE_SUPPORTED_TYPES,
  supportsChartType,
} from '@/engines/engine.matrix';
import { describe, expect, it } from 'vitest';

describe('engine.constants', () => {
  it('exports the default engine', () => {
    expect(DEFAULT_ENGINE).toBe('chartjs');
  });

  it('exports the auto engine priority', () => {
    expect(AUTO_ENGINE_PRIORITY).toEqual(['chartjs', 'echarts', 'uplot']);
  });
  it('exports the supported chart types for each engine', () => {
    expect(ENGINE_SUPPORTED_TYPES.chartjs).toEqual([
      'area',
      'bar',
      'bar-line',
      'line',
      'bubble',
      'candlestick',
      'doughnut',
      'funnel',
      'gantt',
      'heatmap',
      'pie',
      'radar',
      'scatter',
      'network',
      'stacked-area',
      'stacked-bar',
      'waterfall',
      'treemap',
      'gauge',
      'scatter-line',
    ]);

    expect(ENGINE_SUPPORTED_TYPES.echarts).toEqual([
      'area',
      'bar',
      'bar-line',
      'line',
      'bubble',
      'sunburst',
      'candlestick',
      'doughnut',
      'funnel',
      'gantt',
      'heatmap',
      'pie',
      'radar',
      'scatter',
      'network',
      'stacked-area',
      'stacked-bar',
      'waterfall',
      'treemap',
      'gauge',
      'scatter-line',
    ]);

    expect(ENGINE_SUPPORTED_TYPES.uplot).toEqual(['line']);
  });

  it('returns true when the engine supports the chart type', () => {
    expect(supportsChartType('chartjs', 'bar')).toBe(true);
    expect(supportsChartType('chartjs', 'treemap')).toBe(true);

    expect(supportsChartType('echarts', 'sunburst')).toBe(true);
    expect(supportsChartType('echarts', 'waterfall')).toBe(true);

    expect(supportsChartType('uplot', 'line')).toBe(true);
  });

  it('returns false when the engine does not support the chart type', () => {
    expect(supportsChartType('chartjs', 'sunburst')).toBe(false);
    expect(supportsChartType('echarts', 'donut')).toBe(false);
    expect(supportsChartType('uplot', 'bar')).toBe(false);
    expect(supportsChartType('uplot', 'scatter')).toBe(false);
  });
});
