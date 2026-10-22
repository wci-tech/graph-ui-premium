import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useChart } from '@/charts/hooks/useChart';
import { resolveChartEngine } from '@/engines/engine.resolver';
import { loadChartEngine } from '@/engines/engine.runtime';
import type { ChartEngine, EngineModule } from '@/engines/engine.types';

vi.mock('@/engines/engine.runtime', () => ({
  loadChartEngine: vi.fn(),
}));

vi.mock('@/engines/engine.resolver', () => ({
  resolveChartEngine: vi.fn(),
}));

const mockLoadChartEngine = vi.mocked(loadChartEngine);
const mockResolveChartEngine = vi.mocked(resolveChartEngine);

const mockEngineModule = {
  EngineRenderer: vi.fn(),
} as unknown as EngineModule;

type TestChartEngine = Extract<ChartEngine, 'chart-1' | 'chart-2'>;

type UseChartTestProps = {
  readonly engine: TestChartEngine;
  readonly enabled?: boolean;
};

type UseChartEnabledTestProps = {
  readonly engine: TestChartEngine;
  readonly enabled: boolean;
};

describe('useChart', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockResolveChartEngine.mockReturnValue('chartjs');
    mockLoadChartEngine.mockResolvedValue(mockEngineModule);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('resolves the requested public chart engine alias and loads its internal engine module', async () => {
    const { result } = renderHook(() =>
      useChart({
        engine: 'chart-1',
        type: 'bar',
      }),
    );

    expect(mockResolveChartEngine).toHaveBeenCalledTimes(1);

    expect(mockResolveChartEngine).toHaveBeenCalledWith({
      engine: 'chart-1',
      type: 'bar',
    });

    expect(result.current.resolvedEngine).toBe('chartjs');
    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.engineModule).toBe(mockEngineModule);
    });

    expect(mockLoadChartEngine).toHaveBeenCalledTimes(1);
    expect(mockLoadChartEngine).toHaveBeenCalledWith('chartjs');
    expect(result.current.isLoading).toBe(false);
  });

  it('uses auto as the default engine', async () => {
    renderHook(() =>
      useChart({
        type: 'line',
      }),
    );

    expect(mockResolveChartEngine).toHaveBeenCalledWith({
      engine: 'auto',
      type: 'line',
    });

    await waitFor(() => {
      expect(mockLoadChartEngine).toHaveBeenCalledWith('chartjs');
    });
  });

  it('uses enabled true by default', async () => {
    const { result } = renderHook(() =>
      useChart({
        engine: 'chart-1',
        type: 'bar',
      }),
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.engineModule).toBe(mockEngineModule);
    });

    expect(mockLoadChartEngine).toHaveBeenCalledWith('chartjs');
    expect(result.current.isLoading).toBe(false);
  });

  it('does not load the engine when disabled', () => {
    const { result } = renderHook(() =>
      useChart({
        engine: 'chart-1',
        type: 'bar',
        enabled: false,
      }),
    );

    expect(mockResolveChartEngine).toHaveBeenCalledWith({
      engine: 'chart-1',
      type: 'bar',
    });

    expect(mockLoadChartEngine).not.toHaveBeenCalled();

    expect(result.current.resolvedEngine).toBe('chartjs');
    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('does not load an engine when no engine can be resolved', () => {
    mockResolveChartEngine.mockReturnValue(null);

    const { result } = renderHook(() =>
      useChart({
        engine: 'auto',
        type: 'bar',
      }),
    );

    expect(mockResolveChartEngine).toHaveBeenCalledWith({
      engine: 'auto',
      type: 'bar',
    });

    expect(mockLoadChartEngine).not.toHaveBeenCalled();

    expect(result.current.resolvedEngine).toBeNull();
    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('logs an error and stops loading when the engine module fails to load', async () => {
    const error = new Error('Unable to load chart engine');

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    mockResolveChartEngine.mockReturnValue('echarts');
    mockLoadChartEngine.mockRejectedValue(error);

    const { result } = renderHook(() =>
      useChart({
        engine: 'chart-2',
        type: 'bar',
      }),
    );

    expect(mockResolveChartEngine).toHaveBeenCalledWith({
      engine: 'chart-2',
      type: 'bar',
    });

    expect(result.current.resolvedEngine).toBe('echarts');
    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Chart engine load error:', error);
    });

    expect(mockLoadChartEngine).toHaveBeenCalledWith('echarts');
    expect(result.current.engineModule).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('clears the current module and loads a new module when the resolved engine changes', async () => {
    const chartjsModule = {
      EngineRenderer: vi.fn(),
    } as unknown as EngineModule;

    const echartsModule = {
      EngineRenderer: vi.fn(),
    } as unknown as EngineModule;

    mockResolveChartEngine.mockImplementation(({ engine }) => {
      if (engine === 'chart-2') {
        return 'echarts';
      }

      return 'chartjs';
    });

    mockLoadChartEngine.mockImplementation((engine) =>
      Promise.resolve(engine === 'echarts' ? echartsModule : chartjsModule),
    );

    const initialProps: UseChartTestProps = {
      engine: 'chart-1',
    };

    const { result, rerender } = renderHook(
      ({ engine }: UseChartTestProps) =>
        useChart({
          engine,
          type: 'bar',
        }),
      {
        initialProps,
      },
    );

    await waitFor(() => {
      expect(result.current.engineModule).toBe(chartjsModule);
    });

    expect(result.current.resolvedEngine).toBe('chartjs');
    expect(result.current.isLoading).toBe(false);

    rerender({
      engine: 'chart-2',
    });

    expect(mockResolveChartEngine).toHaveBeenLastCalledWith({
      engine: 'chart-2',
      type: 'bar',
    });

    expect(result.current.resolvedEngine).toBe('echarts');
    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.engineModule).toBe(echartsModule);
    });

    expect(mockLoadChartEngine).toHaveBeenNthCalledWith(1, 'chartjs');
    expect(mockLoadChartEngine).toHaveBeenNthCalledWith(2, 'echarts');
    expect(result.current.isLoading).toBe(false);
  });

  it('loads the uPlot module when chart-3 resolves to uplot', async () => {
    const uplotModule = {
      EngineRenderer: vi.fn(),
    } as unknown as EngineModule;

    mockResolveChartEngine.mockReturnValue('uplot');
    mockLoadChartEngine.mockResolvedValue(uplotModule);

    const { result } = renderHook(() =>
      useChart({
        engine: 'chart-3',
        type: 'line',
      }),
    );

    expect(mockResolveChartEngine).toHaveBeenCalledWith({
      engine: 'chart-3',
      type: 'line',
    });

    expect(result.current.resolvedEngine).toBe('uplot');
    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.engineModule).toBe(uplotModule);
    });

    expect(mockLoadChartEngine).toHaveBeenCalledWith('uplot');
    expect(result.current.isLoading).toBe(false);
  });

  it('does not update the engine module after the hook is unmounted', async () => {
    let resolveEngineModule: ((module: EngineModule) => void) | undefined;

    mockLoadChartEngine.mockReturnValue(
      new Promise<EngineModule>((resolve) => {
        resolveEngineModule = resolve;
      }),
    );

    const { unmount } = renderHook(() =>
      useChart({
        engine: 'chart-1',
        type: 'bar',
      }),
    );

    expect(mockLoadChartEngine).toHaveBeenCalledWith('chartjs');

    unmount();

    await act(async () => {
      resolveEngineModule?.(mockEngineModule);

      await Promise.resolve();
      await Promise.resolve();
    });
  });

  it('does not log or update state after the hook is unmounted when loading fails', async () => {
    let rejectEngineModule: ((error: unknown) => void) | undefined;

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    mockLoadChartEngine.mockReturnValue(
      new Promise<EngineModule>((_, reject) => {
        rejectEngineModule = reject;
      }),
    );

    const { unmount } = renderHook(() =>
      useChart({
        engine: 'chart-1',
        type: 'bar',
      }),
    );

    expect(mockLoadChartEngine).toHaveBeenCalledWith('chartjs');

    unmount();

    const error = new Error('Load failed after unmount');

    await act(async () => {
      rejectEngineModule?.(error);

      await Promise.resolve();
      await Promise.resolve();
    });

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('ignores the previous engine result when the resolved engine changes before loading completes', async () => {
    let resolveChartjsModule: ((module: EngineModule) => void) | undefined;

    let resolveEchartsModule: ((module: EngineModule) => void) | undefined;

    const chartjsModule = {
      EngineRenderer: vi.fn(),
    } as unknown as EngineModule;

    const echartsModule = {
      EngineRenderer: vi.fn(),
    } as unknown as EngineModule;

    mockResolveChartEngine.mockImplementation(({ engine }) => {
      if (engine === 'chart-2') {
        return 'echarts';
      }

      return 'chartjs';
    });

    mockLoadChartEngine.mockImplementation(
      (engine) =>
        new Promise<EngineModule>((resolve) => {
          if (engine === 'chartjs') {
            resolveChartjsModule = resolve;
            return;
          }

          resolveEchartsModule = resolve;
        }),
    );

    const initialProps: UseChartTestProps = {
      engine: 'chart-1',
    };

    const { result, rerender } = renderHook(
      ({ engine }: UseChartTestProps) =>
        useChart({
          engine,
          type: 'bar',
        }),
      {
        initialProps,
      },
    );

    expect(result.current.resolvedEngine).toBe('chartjs');
    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(true);

    rerender({
      engine: 'chart-2',
    });

    expect(mockResolveChartEngine).toHaveBeenLastCalledWith({
      engine: 'chart-2',
      type: 'bar',
    });

    expect(result.current.resolvedEngine).toBe('echarts');
    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolveChartjsModule?.(chartjsModule);

      await Promise.resolve();
      await Promise.resolve();
    });

    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolveEchartsModule?.(echartsModule);

      await Promise.resolve();
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(result.current.engineModule).toBe(echartsModule);
    });

    expect(mockLoadChartEngine).toHaveBeenNthCalledWith(1, 'chartjs');
    expect(mockLoadChartEngine).toHaveBeenNthCalledWith(2, 'echarts');

    expect(result.current.isLoading).toBe(false);
  });

  it('ignores an in-flight engine result when the chart becomes disabled', async () => {
    let resolveEngineModule: ((module: EngineModule) => void) | undefined;

    mockLoadChartEngine.mockReturnValue(
      new Promise<EngineModule>((resolve) => {
        resolveEngineModule = resolve;
      }),
    );

    const initialProps: UseChartEnabledTestProps = {
      engine: 'chart-1',
      enabled: true,
    };

    const { result, rerender } = renderHook(
      ({ engine, enabled }: UseChartEnabledTestProps) =>
        useChart({
          engine,
          type: 'bar',
          enabled,
        }),
      {
        initialProps,
      },
    );

    expect(result.current.isLoading).toBe(true);

    rerender({
      engine: 'chart-1',
      enabled: false,
    });

    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      resolveEngineModule?.(mockEngineModule);

      await Promise.resolve();
      await Promise.resolve();
    });

    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('loads the resolved engine when re-enabled', async () => {
    const initialProps: UseChartEnabledTestProps = {
      engine: 'chart-1',
      enabled: false,
    };

    const { result, rerender } = renderHook(
      ({ engine, enabled }: UseChartEnabledTestProps) =>
        useChart({
          engine,
          type: 'bar',
          enabled,
        }),
      {
        initialProps,
      },
    );

    expect(result.current.resolvedEngine).toBe('chartjs');
    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(mockLoadChartEngine).not.toHaveBeenCalled();

    rerender({
      engine: 'chart-1',
      enabled: true,
    });

    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.engineModule).toBe(mockEngineModule);
    });

    expect(mockLoadChartEngine).toHaveBeenCalledTimes(1);
    expect(mockLoadChartEngine).toHaveBeenCalledWith('chartjs');
    expect(result.current.isLoading).toBe(false);
  });

  it('stays idle when enabled but the resolved engine is null', () => {
    mockResolveChartEngine.mockReturnValue(null);

    const { result, unmount } = renderHook(() =>
      useChart({
        engine: 'chart-1',
        type: 'bar',
        enabled: true,
      }),
    );

    expect(result.current.resolvedEngine).toBeNull();
    expect(result.current.engineModule).toBeNull();
    expect(result.current.isLoading).toBe(false);

    expect(mockLoadChartEngine).not.toHaveBeenCalled();

    unmount();
  });
});
