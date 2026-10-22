import { describe, expect, it, vi } from 'vitest';

const { mockChartJSEngineRenderer, mockEChartsEngineRenderer, mockUPlotEngineRenderer } =
  vi.hoisted(() => ({
    mockChartJSEngineRenderer: vi.fn(),
    mockEChartsEngineRenderer: vi.fn(),
    mockUPlotEngineRenderer: vi.fn(),
  }));

vi.mock('@/components/chartjs/engine-layer/ChartJSEngine.module', () => ({
  EngineRenderer: mockChartJSEngineRenderer,
}));

vi.mock('@/components/echarts/engine-layer/EChartsEngine.module', () => ({
  EngineRenderer: mockEChartsEngineRenderer,
}));

vi.mock('@/components/uplot/engineLayer/UPlotEngine.module', () => ({
  EngineRenderer: mockUPlotEngineRenderer,
}));

import { ENGINE_LOADERS } from '@/engines/engine.loaders';

describe('ENGINE_LOADERS', () => {
  it('contains loaders for all supported engines', () => {
    expect(Object.keys(ENGINE_LOADERS)).toEqual(['chartjs', 'echarts', 'uplot']);
  });

  it('loads the ChartJS engine module', async () => {
    const engineModule = await ENGINE_LOADERS.chartjs();

    expect(engineModule).toEqual({
      EngineRenderer: mockChartJSEngineRenderer,
    });

    expect(engineModule.EngineRenderer).toBe(mockChartJSEngineRenderer);
  });

  it('loads the ECharts engine module', async () => {
    const engineModule = await ENGINE_LOADERS.echarts();

    expect(engineModule).toEqual({
      EngineRenderer: mockEChartsEngineRenderer,
    });

    expect(engineModule.EngineRenderer).toBe(mockEChartsEngineRenderer);
  });

  it('loads the UPlot engine module', async () => {
    const engineModule = await ENGINE_LOADERS.uplot();

    expect(engineModule).toEqual({
      EngineRenderer: mockUPlotEngineRenderer,
    });

    expect(engineModule.EngineRenderer).toBe(mockUPlotEngineRenderer);
  });
});
