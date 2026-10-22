import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { EngineModule } from '@/engines/engine.types';

const { mockChartJSLoader, mockEChartsLoader, mockUPlotLoader } = vi.hoisted(() => ({
  mockChartJSLoader: vi.fn(),
  mockEChartsLoader: vi.fn(),
  mockUPlotLoader: vi.fn(),
}));

vi.mock('@/engines/engine.loaders', () => ({
  ENGINE_LOADERS: {
    chartjs: mockChartJSLoader,
    echarts: mockEChartsLoader,
    uplot: mockUPlotLoader,
  },
}));

const createEngineModule = (): EngineModule =>
  ({
    EngineRenderer: vi.fn(),
  }) as unknown as EngineModule;

describe('loadChartEngine', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('loads and caches the engine module', async () => {
    const engineModule = createEngineModule();
    const modulePromise = Promise.resolve(engineModule);

    mockChartJSLoader.mockReturnValue(modulePromise);

    const { loadChartEngine } = await import('@/engines/engine.runtime');

    const firstResult = loadChartEngine('chartjs');
    const secondResult = loadChartEngine('chartjs');

    expect(firstResult).toBe(modulePromise);
    expect(secondResult).toBe(modulePromise);
    expect(firstResult).toBe(secondResult);

    expect(mockChartJSLoader).toHaveBeenCalledTimes(1);

    await expect(firstResult).resolves.toBe(engineModule);
    await expect(secondResult).resolves.toBe(engineModule);
  });

  it('loads different engines independently', async () => {
    const chartJSEngineModule = createEngineModule();
    const eChartsEngineModule = createEngineModule();

    const chartJSPromise = Promise.resolve(chartJSEngineModule);
    const eChartsPromise = Promise.resolve(eChartsEngineModule);

    mockChartJSLoader.mockReturnValue(chartJSPromise);
    mockEChartsLoader.mockReturnValue(eChartsPromise);

    const { loadChartEngine } = await import('@/engines/engine.runtime');

    const chartJSResult = loadChartEngine('chartjs');
    const eChartsResult = loadChartEngine('echarts');

    expect(chartJSResult).toBe(chartJSPromise);
    expect(eChartsResult).toBe(eChartsPromise);

    expect(mockChartJSLoader).toHaveBeenCalledTimes(1);
    expect(mockEChartsLoader).toHaveBeenCalledTimes(1);
    expect(mockUPlotLoader).not.toHaveBeenCalled();

    await expect(chartJSResult).resolves.toBe(chartJSEngineModule);
    await expect(eChartsResult).resolves.toBe(eChartsEngineModule);
  });

  it('returns the cached promise without calling the loader again', async () => {
    const engineModule = createEngineModule();
    const modulePromise = Promise.resolve(engineModule);

    mockUPlotLoader.mockReturnValue(modulePromise);

    const { loadChartEngine } = await import('@/engines/engine.runtime');

    const firstResult = loadChartEngine('uplot');

    await expect(firstResult).resolves.toBe(engineModule);

    const cachedResult = loadChartEngine('uplot');

    expect(cachedResult).toBe(firstResult);
    expect(mockUPlotLoader).toHaveBeenCalledTimes(1);

    await expect(cachedResult).resolves.toBe(engineModule);
  });

  it('caches a rejected loader promise', async () => {
    const error = new Error('Unable to load engine');
    const rejectedPromise = Promise.reject(error);

    mockEChartsLoader.mockReturnValue(rejectedPromise);

    const { loadChartEngine } = await import('@/engines/engine.runtime');

    const firstResult = loadChartEngine('echarts');
    const secondResult = loadChartEngine('echarts');

    expect(firstResult).toBe(rejectedPromise);
    expect(secondResult).toBe(rejectedPromise);
    expect(mockEChartsLoader).toHaveBeenCalledTimes(1);

    await expect(firstResult).rejects.toBe(error);
  });
});
