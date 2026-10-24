import type { MutableRefObject, RefObject } from 'react';

import { act, renderHook } from '@testing-library/react';
import { Chart as ChartJSAuto } from 'chart.js/auto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { compactObject } from '@wci-tech/core-ui-premium';

import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';
import { useChartDownload } from '@/components/chartjs/hooks/useChartDownload';
import { useChartjs } from '@/components/chartjs/hooks/useChartjs';
import { createChartConfig, getDatasets } from '@/components/chartjs/utils/ChartJS.utils';

type ChartType = ChartjsProps['type'];
type ChartData = ChartjsProps['data'];
type ChartOptions = NonNullable<ChartjsProps['options']>;
type ChartPlugins = NonNullable<ChartjsProps['plugins']>;

type MockChartInstance = {
  readonly destroy: ReturnType<typeof vi.fn>;
  readonly reset: ReturnType<typeof vi.fn>;
  readonly update: ReturnType<typeof vi.fn>;
};

type RafCallback = FrameRequestCallback;

const { mockHandleDownload, mockChartConstructor } = vi.hoisted(() => ({
  mockHandleDownload: vi.fn(),

  /*
   * The mock itself must be constructible because useChartjs calls:
   *
   * new ChartJSConstructor(canvas, config)
   */
  mockChartConstructor: vi.fn(function MockChartConstructor() {
    return {};
  }),
}));

vi.mock('chart.js/auto', () => ({
  Chart: mockChartConstructor,
}));

vi.mock('@wci-tech/core-ui-premium', () => ({
  compactObject: vi.fn((value: unknown) => value),
}));

vi.mock('@/components/chartjs/utils/ChartJS.utils', () => ({
  createChartConfig: vi.fn(),
  getDatasets: vi.fn(),
}));

vi.mock('@/components/chartjs/hooks/useChartDownload', () => ({
  useChartDownload: vi.fn(() => ({
    handleDownload: mockHandleDownload,
  })),
}));

const createMockChartInstance = (): MockChartInstance => ({
  destroy: vi.fn(),
  reset: vi.fn(),
  update: vi.fn(),
});

const setCanvasRef = (
  ref: RefObject<HTMLCanvasElement | null>,
  canvas: HTMLCanvasElement,
): void => {
  (ref as MutableRefObject<HTMLCanvasElement | null>).current = canvas;
};

describe('useChartjs', () => {
  const mockChartJSAuto = vi.mocked(ChartJSAuto);
  const mockCompactObject = vi.mocked(compactObject);
  const mockCreateChartConfig = vi.mocked(createChartConfig);
  const mockGetDatasets = vi.mocked(getDatasets);
  const mockUseChartDownload = vi.mocked(useChartDownload);

  const data: ChartData = {
    labels: ['January', 'February'],

    datasets: [
      {
        label: 'Sales',
        data: [10, 20],
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
  };

  const plugins: ChartPlugins = [
    {
      id: 'test-plugin',
    },
  ];

  const datasets = [
    {
      label: 'Sales',
      data: [10, 20],
    },
  ];

  const config = {
    type: 'bar',

    data: {
      labels: ['January', 'February'],
      datasets,
    },
  } as ReturnType<typeof createChartConfig>;

  let chartInstances: MockChartInstance[];

  let rafCallbacks: Map<number, RafCallback>;
  let nextRafId: number;

  let requestAnimationFrameMock: ReturnType<typeof vi.fn>;
  let cancelAnimationFrameMock: ReturnType<typeof vi.fn>;

  const getChartInstance = (index: number): MockChartInstance => {
    const instance = chartInstances[index];

    if (!instance) {
      throw new Error(`Expected chart instance at index ${index}`);
    }

    return instance;
  };

  const getRafCallback = (id: number): RafCallback => {
    const callback = rafCallbacks.get(id);

    if (!callback) {
      throw new Error(`Expected requestAnimationFrame callback for id ${id}`);
    }

    return callback;
  };

  const getRequestedFrameId = (callIndex: number): number => {
    const result = requestAnimationFrameMock.mock.results[callIndex];

    if (!result || typeof result.value !== 'number') {
      throw new Error(`Expected requestAnimationFrame call ${callIndex} to return a numeric id`);
    }

    return result.value;
  };

  const runAnimationFrame = (id: number, timestamp = 0): void => {
    const callback = getRafCallback(id);

    rafCallbacks.delete(id);

    act(() => {
      callback(timestamp);
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();

    chartInstances = [];

    /*
     * IMPORTANT:
     * Use a normal function, not an arrow function.
     *
     * Normal functions support construction with `new`.
     */
    mockChartConstructor.mockImplementation(function MockChartConstructor() {
      const instance = createMockChartInstance();

      chartInstances.push(instance);

      return instance;
    });

    rafCallbacks = new Map();
    nextRafId = 1;

    requestAnimationFrameMock = vi.fn((callback: RafCallback): number => {
      const id = nextRafId;

      nextRafId += 1;

      rafCallbacks.set(id, callback);

      return id;
    });

    cancelAnimationFrameMock = vi.fn((id: number): void => {
      rafCallbacks.delete(id);
    });

    vi.stubGlobal('requestAnimationFrame', requestAnimationFrameMock);
    vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrameMock);

    mockGetDatasets.mockReturnValue(datasets);
    mockCreateChartConfig.mockReturnValue(config);

    mockUseChartDownload.mockReturnValue({
      handleDownload: mockHandleDownload,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('gets the datasets from the supplied chart data', () => {
    renderHook(() =>
      useChartjs({
        type: 'bar',
        data,
        options,
        plugins,
      }),
    );

    expect(mockGetDatasets).toHaveBeenCalledTimes(1);
    expect(mockGetDatasets).toHaveBeenCalledWith(data);
  });

  it('passes the canvas reference to useChartDownload', () => {
    const { result } = renderHook(() =>
      useChartjs({
        type: 'bar',
        data,
        options,
        plugins,
      }),
    );

    expect(mockUseChartDownload).toHaveBeenCalledTimes(1);

    expect(mockUseChartDownload).toHaveBeenCalledWith(result.current.canvasRef);
  });

  it('returns the canvas reference and download handler', () => {
    const { result } = renderHook(() =>
      useChartjs({
        type: 'bar',
        data,
        options,
        plugins,
      }),
    );

    expect(result.current.canvasRef.current).toBeNull();
    expect(result.current.handleDownload).toBe(mockHandleDownload);
  });

  it('does not create a chart when the canvas reference is null', () => {
    renderHook(() =>
      useChartjs({
        type: 'bar',
        data,
        options,
        plugins,
      }),
    );

    expect(mockCompactObject).not.toHaveBeenCalled();
    expect(mockCreateChartConfig).not.toHaveBeenCalled();
    expect(mockChartJSAuto).not.toHaveBeenCalled();
    expect(requestAnimationFrameMock).not.toHaveBeenCalled();
  });

  it('creates a chart when a canvas element is available', () => {
    const canvas = document.createElement('canvas');

    type HookProps = {
      currentOptions: ChartOptions;
    };

    const { result, rerender } = renderHook(
      ({ currentOptions }: HookProps) =>
        useChartjs({
          type: 'bar',
          data,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    const nextOptions: ChartOptions = {
      ...options,
      maintainAspectRatio: false,
    };

    rerender({
      currentOptions: nextOptions,
    });

    const expectedParameters = {
      canvas,
      type: 'bar',
      data,
      options: nextOptions,
      plugins,
      datasets,
    };

    expect(mockCompactObject).toHaveBeenCalledTimes(1);
    expect(mockCompactObject).toHaveBeenCalledWith(expectedParameters);

    expect(mockCreateChartConfig).toHaveBeenCalledTimes(1);
    expect(mockCreateChartConfig).toHaveBeenCalledWith(expectedParameters);

    expect(mockChartJSAuto).toHaveBeenCalledTimes(1);
    expect(mockChartJSAuto).toHaveBeenCalledWith(canvas, config);

    expect(chartInstances).toHaveLength(1);
    expect(requestAnimationFrameMock).toHaveBeenCalledTimes(1);
  });

  it('uses an empty plugins array when plugins are not supplied', () => {
    const canvas = document.createElement('canvas');

    type HookProps = {
      currentOptions: ChartOptions;
    };

    const { result, rerender } = renderHook(
      ({ currentOptions }: HookProps) =>
        useChartjs({
          type: 'line',
          data,
          options: currentOptions,
        }),
      {
        initialProps: {
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    const nextOptions: ChartOptions = {
      ...options,
      maintainAspectRatio: false,
    };

    rerender({
      currentOptions: nextOptions,
    });

    expect(mockCompactObject).toHaveBeenCalledWith({
      canvas,
      type: 'line',
      data,
      options: nextOptions,
      plugins: [],
      datasets,
    });
  });

  it('supports omitted options', () => {
    renderHook(() =>
      useChartjs({
        type: 'line',
        data,
        plugins,
      }),
    );

    expect(mockGetDatasets).toHaveBeenCalledTimes(1);
    expect(mockGetDatasets).toHaveBeenCalledWith(data);

    expect(mockChartJSAuto).not.toHaveBeenCalled();
  });

  it('destroys the existing chart before creating a new chart', () => {
    const canvas = document.createElement('canvas');

    type HookProps = {
      currentType: ChartType;
      currentOptions: ChartOptions;
    };

    const { result, rerender } = renderHook(
      ({ currentType, currentOptions }: HookProps) =>
        useChartjs({
          type: currentType,
          data,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentType: 'bar' as ChartType,
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    const secondOptions: ChartOptions = {
      ...options,
      maintainAspectRatio: false,
    };

    rerender({
      currentType: 'line',
      currentOptions: secondOptions,
    });

    const firstChart = getChartInstance(0);

    expect(mockChartJSAuto).toHaveBeenCalledTimes(1);
    expect(firstChart.destroy).not.toHaveBeenCalled();

    const thirdOptions: ChartOptions = {
      ...secondOptions,
      responsive: false,
    };

    rerender({
      currentType: 'bar',
      currentOptions: thirdOptions,
    });

    expect(firstChart.destroy).toHaveBeenCalledTimes(1);
    expect(mockChartJSAuto).toHaveBeenCalledTimes(2);
    expect(chartInstances).toHaveLength(2);
  });

  it('schedules a second animation frame after the first frame runs', () => {
    const canvas = document.createElement('canvas');

    type HookProps = {
      currentOptions: ChartOptions;
    };

    const { result, rerender } = renderHook(
      ({ currentOptions }: HookProps) =>
        useChartjs({
          type: 'bar',
          data,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    rerender({
      currentOptions: {
        ...options,
        responsive: false,
      },
    });

    expect(requestAnimationFrameMock).toHaveBeenCalledTimes(1);

    const firstFrameId = getRequestedFrameId(0);

    runAnimationFrame(firstFrameId);

    expect(requestAnimationFrameMock).toHaveBeenCalledTimes(2);

    const chart = getChartInstance(0);

    expect(chart.reset).not.toHaveBeenCalled();
    expect(chart.update).not.toHaveBeenCalled();
  });

  it('resets and updates the active chart after two animation frames', () => {
    const canvas = document.createElement('canvas');

    type HookProps = {
      currentOptions: ChartOptions;
    };

    const { result, rerender } = renderHook(
      ({ currentOptions }: HookProps) =>
        useChartjs({
          type: 'bar',
          data,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    rerender({
      currentOptions: {
        ...options,
        responsive: false,
      },
    });

    const chart = getChartInstance(0);

    const firstFrameId = getRequestedFrameId(0);

    runAnimationFrame(firstFrameId);

    const secondFrameId = getRequestedFrameId(1);

    runAnimationFrame(secondFrameId);

    expect(chart.reset).toHaveBeenCalledTimes(1);
    expect(chart.reset).toHaveBeenCalledWith();

    expect(chart.update).toHaveBeenCalledTimes(1);
    expect(chart.update).toHaveBeenCalledWith();

    const resetOrder = chart.reset.mock.invocationCallOrder[0];
    const updateOrder = chart.update.mock.invocationCallOrder[0];

    expect(resetOrder).toBeDefined();
    expect(updateOrder).toBeDefined();

    expect(resetOrder).toBeLessThan(updateOrder as number);
  });

  it('does not replay animation for a chart that is no longer active', () => {
    const canvas = document.createElement('canvas');

    type HookProps = {
      currentOptions: ChartOptions;
    };

    const { result, rerender } = renderHook(
      ({ currentOptions }: HookProps) =>
        useChartjs({
          type: 'bar',
          data,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    const firstOptions: ChartOptions = {
      ...options,
      maintainAspectRatio: false,
    };

    rerender({
      currentOptions: firstOptions,
    });

    const firstChart = getChartInstance(0);

    const firstFrameId = getRequestedFrameId(0);

    runAnimationFrame(firstFrameId);

    const oldSecondFrameId = getRequestedFrameId(1);

    /*
     * Save the callback before cleanup cancels the frame.
     */
    const oldSecondFrameCallback = getRafCallback(oldSecondFrameId);

    rerender({
      currentOptions: {
        ...firstOptions,
        responsive: false,
      },
    });

    const secondChart = getChartInstance(1);

    expect(firstChart.destroy).toHaveBeenCalledTimes(1);

    act(() => {
      oldSecondFrameCallback(0);
    });

    expect(firstChart.reset).not.toHaveBeenCalled();
    expect(firstChart.update).not.toHaveBeenCalled();

    expect(secondChart.reset).not.toHaveBeenCalled();
    expect(secondChart.update).not.toHaveBeenCalled();
  });

  it('cancels the first replay frame during cleanup', () => {
    const canvas = document.createElement('canvas');

    type HookProps = {
      currentOptions: ChartOptions;
    };

    const { result, rerender, unmount } = renderHook(
      ({ currentOptions }: HookProps) =>
        useChartjs({
          type: 'bar',
          data,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    rerender({
      currentOptions: {
        ...options,
        responsive: false,
      },
    });

    const firstFrameId = getRequestedFrameId(0);

    unmount();

    expect(cancelAnimationFrameMock).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrameMock).toHaveBeenCalledWith(firstFrameId);

    expect(rafCallbacks.has(firstFrameId)).toBe(false);
  });

  it('cancels the first and second replay frames during cleanup', () => {
    const canvas = document.createElement('canvas');

    type HookProps = {
      currentOptions: ChartOptions;
    };

    const { result, rerender, unmount } = renderHook(
      ({ currentOptions }: HookProps) =>
        useChartjs({
          type: 'bar',
          data,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    rerender({
      currentOptions: {
        ...options,
        responsive: false,
      },
    });

    const firstFrameId = getRequestedFrameId(0);

    runAnimationFrame(firstFrameId);

    const secondFrameId = getRequestedFrameId(1);

    unmount();

    expect(cancelAnimationFrameMock).toHaveBeenCalledTimes(2);

    expect(cancelAnimationFrameMock).toHaveBeenNthCalledWith(1, firstFrameId);

    expect(cancelAnimationFrameMock).toHaveBeenNthCalledWith(2, secondFrameId);

    expect(rafCallbacks.has(secondFrameId)).toBe(false);
  });

  it('destroys the chart during cleanup', () => {
    const canvas = document.createElement('canvas');

    type HookProps = {
      currentOptions: ChartOptions;
    };

    const { result, rerender, unmount } = renderHook(
      ({ currentOptions }: HookProps) =>
        useChartjs({
          type: 'bar',
          data,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    rerender({
      currentOptions: {
        ...options,
        maintainAspectRatio: false,
      },
    });

    const chart = getChartInstance(0);

    unmount();

    expect(chart.destroy).toHaveBeenCalledTimes(1);
  });

  it('cancels the first replay frame during cleanup', () => {
    const canvas = document.createElement('canvas');

    type HookProps = {
      currentOptions: ChartOptions;
    };

    const { result, rerender, unmount } = renderHook(
      ({ currentOptions }: HookProps) =>
        useChartjs({
          type: 'bar',
          data,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    rerender({
      currentOptions: {
        ...options,
        responsive: false,
      },
    });

    const firstFrameId = getRequestedFrameId(0);

    unmount();

    expect(cancelAnimationFrameMock).toHaveBeenCalledWith(firstFrameId);
  });

  it('clears the active chart instance during cleanup', () => {
    const canvas = document.createElement('canvas');

    type HookProps = {
      currentOptions: ChartOptions;
    };

    const { result, rerender, unmount } = renderHook(
      ({ currentOptions }: HookProps) =>
        useChartjs({
          type: 'bar',
          data,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    rerender({
      currentOptions: {
        ...options,
        maintainAspectRatio: false,
      },
    });

    const chart = getChartInstance(0);

    unmount();

    expect(chart.destroy).toHaveBeenCalledTimes(1);
  });

  it('clears the active chart reference during cleanup', () => {
    const canvas = document.createElement('canvas');

    type HookProps = {
      currentOptions: ChartOptions;
    };

    const { result, rerender } = renderHook(
      ({ currentOptions }: HookProps) =>
        useChartjs({
          type: 'bar',
          data,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    const firstOptions: ChartOptions = {
      ...options,
      maintainAspectRatio: false,
    };

    rerender({
      currentOptions: firstOptions,
    });

    const firstChart = getChartInstance(0);

    rerender({
      currentOptions: {
        ...firstOptions,
        responsive: false,
      },
    });

    const secondChart = getChartInstance(1);

    expect(firstChart.destroy).toHaveBeenCalledTimes(1);

    rerender({
      currentOptions: {
        ...firstOptions,
        responsive: true,
        maintainAspectRatio: true,
      },
    });

    expect(firstChart.destroy).toHaveBeenCalledTimes(1);
    expect(secondChart.destroy).toHaveBeenCalledTimes(1);
  });

  it('does not recalculate datasets when the data reference remains unchanged', () => {
    type HookProps = {
      currentOptions: ChartOptions;
    };

    const { rerender } = renderHook(
      ({ currentOptions }: HookProps) =>
        useChartjs({
          type: 'bar',
          data,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentOptions: options,
        },
      },
    );

    rerender({
      currentOptions: {
        ...options,
        responsive: false,
      },
    });

    expect(mockGetDatasets).toHaveBeenCalledTimes(1);
  });

  it('recalculates datasets when the data reference changes', () => {
    const updatedData: ChartData = {
      labels: ['March', 'April'],

      datasets: [
        {
          label: 'Revenue',
          data: [30, 40],
        },
      ],
    };

    type HookProps = {
      currentData: ChartData;
    };

    const { rerender } = renderHook(
      ({ currentData }: HookProps) =>
        useChartjs({
          type: 'bar',
          data: currentData,
          options,
          plugins,
        }),
      {
        initialProps: {
          currentData: data,
        },
      },
    );

    rerender({
      currentData: updatedData,
    });

    expect(mockGetDatasets).toHaveBeenCalledTimes(2);
    expect(mockGetDatasets).toHaveBeenNthCalledWith(1, data);
    expect(mockGetDatasets).toHaveBeenNthCalledWith(2, updatedData);
  });

  it('recreates the chart when data changes', () => {
    const canvas = document.createElement('canvas');

    const updatedData: ChartData = {
      labels: ['March', 'April'],

      datasets: [
        {
          label: 'Revenue',
          data: [30, 40],
        },
      ],
    };

    const updatedDatasets = [
      {
        label: 'Revenue',
        data: [30, 40],
      },
    ];

    mockGetDatasets.mockReturnValueOnce(datasets).mockReturnValueOnce(updatedDatasets);

    type HookProps = {
      currentData: ChartData;
      currentOptions: ChartOptions;
    };

    const { result, rerender } = renderHook(
      ({ currentData, currentOptions }: HookProps) =>
        useChartjs({
          type: 'bar',
          data: currentData,
          options: currentOptions,
          plugins,
        }),
      {
        initialProps: {
          currentData: data,
          currentOptions: options,
        },
      },
    );

    setCanvasRef(result.current.canvasRef, canvas);

    const nextOptions: ChartOptions = {
      ...options,
      maintainAspectRatio: false,
    };

    rerender({
      currentData: data,
      currentOptions: nextOptions,
    });

    const firstChart = getChartInstance(0);

    expect(mockChartJSAuto).toHaveBeenCalledTimes(1);

    rerender({
      currentData: updatedData,
      currentOptions: nextOptions,
    });

    expect(firstChart.destroy).toHaveBeenCalledTimes(1);
    expect(mockChartJSAuto).toHaveBeenCalledTimes(2);

    expect(mockCompactObject).toHaveBeenLastCalledWith({
      canvas,
      type: 'bar',
      data: updatedData,
      options: nextOptions,
      plugins,
      datasets: updatedDatasets,
    });
  });
});
