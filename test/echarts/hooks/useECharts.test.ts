import { createElement, type ReactElement } from 'react';

import { act, render, renderHook } from '@testing-library/react';
import type { EChartsOption } from 'echarts';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { compactObject } from '@wci-tech/core-ui-premium';

import { useECharts } from '@/components/echarts/hooks/useECharts';
import { DEFAULT_ECHARTS_EXPORT_FILE_NAME } from '@/components/echarts/utils/ECharts.constants';
import { useEChartsDownload } from '@/hooks/useEChartsDownload';

const { echartsInitMock, getInstanceByDomMock, handleDownloadMock } = vi.hoisted(() => ({
  echartsInitMock: vi.fn(),
  getInstanceByDomMock: vi.fn(),
  handleDownloadMock: vi.fn(),
}));

vi.mock('echarts', () => ({
  init: echartsInitMock,
  getInstanceByDom: getInstanceByDomMock,
}));

vi.mock('@wci-tech/core-ui-premium', () => ({
  compactObject: vi.fn((value: unknown) => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return value;
    }

    return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined));
  }),
}));

vi.mock('@/hooks/useEChartsDownload', () => ({
  useEChartsDownload: vi.fn(() => ({
    handleDownload: handleDownloadMock,
  })),
}));

type HookParams = Parameters<typeof useECharts>[0];
type HookOptions = HookParams['options'];
type HookResult = ReturnType<typeof useECharts>;

type MockChartInstance = {
  readonly setOption: ReturnType<typeof vi.fn>;
  readonly resize: ReturnType<typeof vi.fn>;
  readonly isDisposed: ReturnType<typeof vi.fn>;
  readonly dispose: ReturnType<typeof vi.fn>;
  readonly on: ReturnType<typeof vi.fn>;
  readonly off: ReturnType<typeof vi.fn>;
};

type ResizeObserverCallbackType = ConstructorParameters<typeof ResizeObserver>[0];

type HarnessProps = {
  readonly options?: HookOptions;
  readonly chartId?: string;
  readonly width?: number;
  readonly height?: number;
  readonly detached?: boolean;
  readonly onResult: (result: HookResult) => void;
};

type MountedRenderOptions = Omit<HarnessProps, 'onResult'>;

const createChartInstance = (overrides: Partial<MockChartInstance> = {}): MockChartInstance => ({
  setOption: vi.fn(),
  resize: vi.fn(),
  isDisposed: vi.fn(() => false),
  dispose: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  ...overrides,
});

const createOptions = (overrides: Record<string, unknown> = {}): HookOptions =>
  ({
    height: '500px',
    chartBackground: '#ffffff',
    animation: true,
    animationDuration: 1000,
    animationDurationUpdate: 1200,
    animationDelay: 50,
    animationDelayUpdate: 100,
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'line',
        data: [100, 200],
      },
    ],
    ...overrides,
  }) as HookOptions;

const createRect = (width: number, height: number): DOMRect => ({
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: width,
  bottom: height,
  width,
  height,
  toJSON: () => ({}),
});

const HookHarness = ({
  options,
  chartId,
  width = 600,
  height = 400,
  detached = false,
  onResult,
}: HarnessProps): ReactElement => {
  const result = useECharts(
    compactObject({
      options,
      chartId,
    }) as HookParams,
  );

  onResult(result);

  const setChartElement = (element: HTMLDivElement | null): void => {
    if (!element) {
      return;
    }

    element.getBoundingClientRect = vi.fn(() => createRect(width, height));

    /*
     * Do not call element.remove().
     *
     * React owns this DOM node and must remain responsible for removing it.
     * We only change what the hook sees when it reads parentElement.
     */
    if (detached) {
      Object.defineProperty(element, 'parentElement', {
        configurable: true,
        get: () => null,
      });
    }

    result.chartRef.current = element;
  };

  if (detached) {
    return createElement('div', {
      ref: setChartElement,
      'data-testid': 'echarts-element',
    });
  }

  const setWrapperElement = (element: HTMLDivElement | null): void => {
    if (!element) {
      return;
    }

    element.getBoundingClientRect = vi.fn(() => createRect(width, height));
  };

  return createElement(
    'div',
    {
      ref: setWrapperElement,
      'data-testid': 'echarts-wrapper',
    },
    createElement('div', {
      ref: setChartElement,
      'data-testid': 'echarts-element',
    }),
  );
};

describe('useECharts', () => {
  const compactObjectMock = vi.mocked(compactObject);
  const useEChartsDownloadMock = vi.mocked(useEChartsDownload);

  let chartInstance: MockChartInstance;

  let rafCallbacks: Map<number, FrameRequestCallback>;
  let nextFrameId: number;
  let requestAnimationFrameMock: ReturnType<typeof vi.fn>;
  let cancelAnimationFrameMock: ReturnType<typeof vi.fn>;

  let resizeObserverCallback: ResizeObserverCallbackType | undefined;
  let resizeObserverObserveMock: ReturnType<typeof vi.fn>;
  let resizeObserverDisconnectMock: ReturnType<typeof vi.fn>;
  let resizeObserverConstructorMock: ReturnType<typeof vi.fn>;

  const renderUnmountedUseECharts = (options?: HookOptions, chartId?: string) =>
    renderHook(() =>
      useECharts(
        compactObject({
          options,
          chartId,
        }) as HookParams,
      ),
    );

  const renderMountedUseECharts = (initialProps: MountedRenderOptions = {}) => {
    let currentResult: HookResult | undefined;

    const onResult = (result: HookResult): void => {
      currentResult = result;
    };

    const view = render(
      createElement(HookHarness, {
        ...initialProps,
        onResult,
      }),
    );

    const getResult = (): HookResult => {
      if (!currentResult) {
        throw new Error('Expected useECharts result');
      }

      return currentResult;
    };

    const rerender = (nextProps: MountedRenderOptions): void => {
      view.rerender(
        createElement(HookHarness, {
          ...nextProps,
          onResult,
        }),
      );
    };

    return {
      ...view,
      getResult,
      rerender,
    };
  };

  const getFrameId = (callIndex: number): number => {
    const result = requestAnimationFrameMock.mock.results[callIndex];

    if (!result || typeof result.value !== 'number') {
      throw new Error(`Expected frame ID for RAF call ${callIndex}`);
    }

    return result.value;
  };

  const getFrameCallback = (frameId: number): FrameRequestCallback => {
    const callback = rafCallbacks.get(frameId);

    if (!callback) {
      throw new Error(`Expected callback for RAF frame ${frameId}`);
    }

    return callback;
  };

  const runFrame = (frameId: number, timestamp = 0): void => {
    const callback = getFrameCallback(frameId);

    rafCallbacks.delete(frameId);

    act(() => {
      callback(timestamp);
    });
  };

  const runNextFrame = (): number => {
    const entry = rafCallbacks.entries().next().value as [number, FrameRequestCallback] | undefined;

    if (!entry) {
      throw new Error('Expected a queued animation frame');
    }

    const [frameId] = entry;

    runFrame(frameId);

    return frameId;
  };

  const runAllFrames = (maximumFrames = 50): void => {
    let count = 0;

    while (rafCallbacks.size > 0) {
      runNextFrame();
      count += 1;

      if (count > maximumFrames) {
        throw new Error('Animation-frame queue did not become empty');
      }
    }
  };

  const finishInitialAnimationByGuard = (): void => {
    runAllFrames();

    act(() => {
      vi.runAllTimers();
    });

    runAllFrames();
  };

  const getFinishedHandler = (instance = chartInstance): (() => void) => {
    const handler = instance.on.mock.calls.find(([eventName]) => eventName === 'finished')?.[1];

    if (typeof handler !== 'function') {
      throw new Error('Expected finished event handler');
    }

    return handler as () => void;
  };

  const triggerResizeObserver = (width: number, height: number): void => {
    if (!resizeObserverCallback) {
      throw new Error('ResizeObserver callback was not registered');
    }

    const entry = {
      contentRect: {
        width,
        height,
      },
    } as ResizeObserverEntry;

    act(() => {
      resizeObserverCallback?.([entry], {} as ResizeObserver);
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    chartInstance = createChartInstance();

    getInstanceByDomMock.mockReturnValue(undefined);
    echartsInitMock.mockReturnValue(chartInstance);

    rafCallbacks = new Map();
    nextFrameId = 1;

    requestAnimationFrameMock = vi.fn((callback: FrameRequestCallback): number => {
      const frameId = nextFrameId;
      nextFrameId += 1;
      rafCallbacks.set(frameId, callback);
      return frameId;
    });

    cancelAnimationFrameMock = vi.fn((frameId: number): void => {
      rafCallbacks.delete(frameId);
    });

    vi.stubGlobal('requestAnimationFrame', requestAnimationFrameMock);
    vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrameMock);

    resizeObserverCallback = undefined;
    resizeObserverObserveMock = vi.fn();
    resizeObserverDisconnectMock = vi.fn();

    resizeObserverConstructorMock = vi.fn(function ResizeObserverMock(
      callback: ResizeObserverCallbackType,
    ) {
      resizeObserverCallback = callback;

      return {
        observe: resizeObserverObserveMock,
        disconnect: resizeObserverDisconnectMock,
        unobserve: vi.fn(),
      };
    });

    vi.stubGlobal('ResizeObserver', resizeObserverConstructorMock);

    useEChartsDownloadMock.mockReturnValue({
      handleDownload: handleDownloadMock,
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('uses the chart element dimensions when parentElement is unavailable', () => {
    const view = renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',

      width: 500.9,
      height: 300.7,

      detached: true,
    });

    const chartElement = view.getByTestId('echarts-element');

    expect(chartElement.parentElement).toBeNull();

    expect(chartInstance.resize).toHaveBeenCalledWith({
      width: 500,
      height: 300,

      animation: {
        duration: 0,
      },
    });
  });

  it('observes the chart element when parentElement is unavailable', () => {
    const view = renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
      detached: true,
    });

    const chartElement = view.getByTestId('echarts-element');

    expect(chartElement.parentElement).toBeNull();

    expect(resizeObserverObserveMock).toHaveBeenCalledTimes(1);
    expect(resizeObserverObserveMock).toHaveBeenCalledWith(chartElement);

    const observedElement = resizeObserverObserveMock.mock.calls[0]?.[0];

    expect(observedElement).toBe(chartElement);
    expect(chartElement.dataset['testid']).toBe('echarts-element');
  });

  it('returns the chart ref and download handler', () => {
    const { result } = renderUnmountedUseECharts(createOptions(), 'sales-chart');

    expect(result.current.chartRef.current).toBeNull();
    expect(result.current.handleDownload).toBe(handleDownloadMock);
  });

  it('configures chart downloading with chart id and background', () => {
    const options = createOptions({
      chartBackground: '#123456',
    });

    renderUnmountedUseECharts(options, 'revenue-chart');

    expect(useEChartsDownloadMock).toHaveBeenCalledWith(expect.any(Object), 'echarts', {
      fileName: 'revenue-chart',
      backgroundColor: '#123456',
    });
  });

  it('uses the default export file name when chart id is omitted', () => {
    renderUnmountedUseECharts(createOptions());

    expect(useEChartsDownloadMock).toHaveBeenCalledWith(expect.any(Object), 'echarts', {
      fileName: DEFAULT_ECHARTS_EXPORT_FILE_NAME,
      backgroundColor: '#ffffff',
    });
  });

  it('omits an undefined download background', () => {
    const options = createOptions();
    const { chartBackground: _chartBackground, ...withoutBackground } = options as Record<
      string,
      unknown
    >;

    renderUnmountedUseECharts(withoutBackground as HookOptions, 'chart');

    expect(compactObjectMock).toHaveBeenCalledWith({
      fileName: 'chart',
      backgroundColor: undefined,
    });

    expect(useEChartsDownloadMock).toHaveBeenCalledWith(expect.any(Object), 'echarts', {
      fileName: 'chart',
    });
  });

  it('does not initialize when the chart element is unavailable', () => {
    renderUnmountedUseECharts(createOptions(), 'sales-chart');

    expect(getInstanceByDomMock).not.toHaveBeenCalled();
    expect(echartsInitMock).not.toHaveBeenCalled();
    expect(resizeObserverConstructorMock).not.toHaveBeenCalled();
  });

  it('creates a new ECharts instance', () => {
    const view = renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    const chartElement = view.getByTestId('echarts-element');

    expect(getInstanceByDomMock).toHaveBeenCalledWith(chartElement);
    expect(echartsInitMock).toHaveBeenCalledWith(chartElement, undefined, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    expect(chartInstance.on).toHaveBeenCalledWith('finished', expect.any(Function));
  });

  it('reuses an existing ECharts instance', () => {
    const existingInstance = createChartInstance();
    getInstanceByDomMock.mockReturnValue(existingInstance);

    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    expect(echartsInitMock).not.toHaveBeenCalled();
    expect(existingInstance.on).toHaveBeenCalledWith('finished', expect.any(Function));
  });

  it('initially resizes using wrapper dimensions', () => {
    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
      width: 620.8,
      height: 410.4,
    });

    expect(chartInstance.resize).toHaveBeenCalledWith({
      width: 620,
      height: 410,
      animation: {
        duration: 0,
      },
    });
  });

  it('uses the detached chart element dimensions when it has no parent', () => {
    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
      width: 500.9,
      height: 300.7,
      detached: true,
    });

    expect(chartInstance.resize).toHaveBeenCalledWith({
      width: 500,
      height: 300,
      animation: {
        duration: 0,
      },
    });
  });

  it.each([
    [0, 400],
    [400, 0],
  ])('does not resize invalid dimensions %s x %s', (width, height) => {
    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
      width,
      height,
    });

    expect(chartInstance.resize).not.toHaveBeenCalled();
  });

  it('does not resize a disposed instance', () => {
    chartInstance.isDisposed.mockReturnValue(true);

    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    expect(chartInstance.resize).not.toHaveBeenCalled();
  });

  it('observes the wrapper and registers the window resize listener', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const view = renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    expect(resizeObserverObserveMock).toHaveBeenCalledWith(view.getByTestId('echarts-wrapper'));
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('ignores an empty ResizeObserver entry list', () => {
    renderMountedUseECharts({
      chartId: 'sales-chart',
    });

    if (!resizeObserverCallback) {
      throw new Error('Expected ResizeObserver callback');
    }

    requestAnimationFrameMock.mockClear();
    rafCallbacks.clear();
    chartInstance.resize.mockClear();

    act(() => {
      resizeObserverCallback?.([], {} as ResizeObserver);
    });

    expect(requestAnimationFrameMock).not.toHaveBeenCalled();
    expect(chartInstance.resize).not.toHaveBeenCalled();
  });

  it('queues ResizeObserver changes while initial animation is protected', () => {
    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    const frameCount = requestAnimationFrameMock.mock.calls.length;

    triggerResizeObserver(700, 500);

    expect(requestAnimationFrameMock.mock.calls.length).toBe(frameCount);
  });

  it.each([
    [0, 300],
    [300, 0],
  ])('ignores invalid ResizeObserver dimensions %s x %s', (width, height) => {
    renderMountedUseECharts({
      chartId: 'sales-chart',
    });

    finishInitialAnimationByGuard();
    requestAnimationFrameMock.mockClear();
    rafCallbacks.clear();

    triggerResizeObserver(width, height);

    expect(requestAnimationFrameMock).not.toHaveBeenCalled();
  });

  it('resizes from ResizeObserver dimensions', () => {
    renderMountedUseECharts({
      chartId: 'sales-chart',
    });

    finishInitialAnimationByGuard();

    chartInstance.resize.mockClear();
    requestAnimationFrameMock.mockClear();
    rafCallbacks.clear();

    triggerResizeObserver(450.9, 260.8);
    runNextFrame();

    expect(chartInstance.resize).toHaveBeenCalledWith({
      width: 450,
      height: 260,
      animation: {
        duration: 0,
      },
    });
  });

  it('cancels a previous ResizeObserver frame', () => {
    renderMountedUseECharts({
      chartId: 'sales-chart',
    });

    finishInitialAnimationByGuard();

    requestAnimationFrameMock.mockClear();
    cancelAnimationFrameMock.mockClear();
    rafCallbacks.clear();

    triggerResizeObserver(400, 300);
    const firstFrameId = getFrameId(0);

    triggerResizeObserver(500, 350);

    expect(cancelAnimationFrameMock).toHaveBeenCalledWith(firstFrameId);
  });

  it('queues a ResizeObserver resize if preparation begins before its frame executes', () => {
    const view = renderMountedUseECharts({
      chartId: 'sales-chart',
    });

    /*
     * Finish the first chart lifecycle so ordinary resize events can
     * schedule a resize frame.
     */
    finishInitialAnimationByGuard();

    requestAnimationFrameMock.mockClear();
    cancelAnimationFrameMock.mockClear();
    rafCallbacks.clear();
    chartInstance.resize.mockClear();

    /*
     * Schedule an ordinary ResizeObserver resize.
     */
    triggerResizeObserver(500, 300);

    expect(requestAnimationFrameMock).toHaveBeenCalledTimes(1);

    const resizeFrameId = getFrameId(0);
    const resizeFrameCallback = getFrameCallback(resizeFrameId);

    /*
     * Starting a new options preparation cancels the pending frame and
     * removes it from rafCallbacks.
     */
    view.rerender({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    expect(cancelAnimationFrameMock).toHaveBeenCalledWith(resizeFrameId);
    expect(rafCallbacks.has(resizeFrameId)).toBe(false);

    /*
     * Execute the previously captured stale callback manually.
     *
     * At this point isPreparingRef.current is true, so scheduleResize()
     * must queue the resize instead of calling chart.resize().
     */
    act(() => {
      resizeFrameCallback(0);
    });

    expect(chartInstance.resize).not.toHaveBeenCalledWith({
      width: 500,
      height: 300,

      animation: {
        duration: 0,
      },
    });
  });

  it('resizes after a window resize event', () => {
    renderMountedUseECharts({
      chartId: 'sales-chart',
      width: 700,
      height: 500,
    });

    finishInitialAnimationByGuard();

    chartInstance.resize.mockClear();
    requestAnimationFrameMock.mockClear();
    rafCallbacks.clear();

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    runNextFrame();

    expect(chartInstance.resize).toHaveBeenCalledWith({
      width: 700,
      height: 500,
      animation: {
        duration: 0,
      },
    });
  });

  it('cancels a previous window resize frame', () => {
    renderMountedUseECharts({
      chartId: 'sales-chart',
    });

    finishInitialAnimationByGuard();

    requestAnimationFrameMock.mockClear();
    cancelAnimationFrameMock.mockClear();
    rafCallbacks.clear();

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    const firstFrameId = getFrameId(0);

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(cancelAnimationFrameMock).toHaveBeenCalledWith(firstFrameId);
  });

  it('removes wrapper-only options before passing options to ECharts', () => {
    const options = createOptions({
      height: '800px',
      chartBackground: '#abcdef',
    });

    renderMountedUseECharts({
      options,
      chartId: 'sales-chart',
    });

    runAllFrames();

    const realOptions = chartInstance.setOption.mock.calls.at(-1)?.[0] as
      | Record<string, unknown>
      | undefined;

    expect(realOptions).toBeDefined();
    expect(realOptions).not.toHaveProperty('height');
    expect(realOptions).not.toHaveProperty('chartBackground');
    expect(realOptions).toMatchObject({
      animation: true,
      animationDuration: 1000,
    });
  });

  it('does not apply options when options are omitted', () => {
    renderMountedUseECharts({
      chartId: 'sales-chart',
    });

    expect(chartInstance.setOption).not.toHaveBeenCalled();
  });

  it('does not apply options to a disposed instance', () => {
    chartInstance.isDisposed.mockReturnValue(true);

    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    runAllFrames();

    expect(chartInstance.setOption).not.toHaveBeenCalled();
  });

  it('creates the zero-state before applying real values', () => {
    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    runAllFrames();

    expect(chartInstance.setOption).toHaveBeenCalledTimes(2);
    expect(chartInstance.setOption).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        animation: false,
        series: [
          expect.objectContaining({
            type: 'line',
            animation: false,
            data: [0, 0],
          }),
        ],
      }),
      {
        notMerge: true,
        lazyUpdate: false,
      },
    );
    expect(chartInstance.setOption).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        animation: true,
        series: [
          expect.objectContaining({
            type: 'line',
            data: [100, 200],
          }),
        ],
      }),
      {
        notMerge: false,
        lazyUpdate: false,
      },
    );
  });

  it('creates supported zero-state values for numbers, arrays, objects, and unchanged values', () => {
    const options = createOptions({
      series: [
        {
          type: 'custom',
          data: [
            50,
            [10, 'Jan', 20],
            [
              [1, 2],
              {
                value: 100,
                name: 'Revenue',
              },
              'unchanged',
            ],
            {
              value: 300,
              name: 'Direct object',
            },
            {
              value: 'not-number',
              name: 'Text value',
            },
            'unchanged',
          ],
        },
      ],
    });

    renderMountedUseECharts({
      options,
      chartId: 'sales-chart',
    });

    runAllFrames();

    const initialOptions = chartInstance.setOption.mock.calls[0]?.[0] as EChartsOption;
    const initialSeries = Array.isArray(initialOptions.series) ? initialOptions.series : [];

    expect(initialSeries[0]).toMatchObject({
      animation: false,
      data: [
        0,
        [0, 'Jan', 0],
        [
          [1, 2],
          {
            value: 100,
            name: 'Revenue',
          },
          'unchanged',
        ],
        {
          value: 0,
          name: 'Direct object',
        },
        {
          value: 'not-number',
          name: 'Text value',
        },
        'unchanged',
      ],
    });
  });

  it('uses an empty initial series when series is not an array', () => {
    renderMountedUseECharts({
      options: createOptions({
        series: {
          type: 'line',
          data: [100],
        },
      }),
      chartId: 'sales-chart',
    });

    runAllFrames();

    expect(chartInstance.setOption).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        animation: false,
        series: [],
      }),
      {
        notMerge: true,
        lazyUpdate: false,
      },
    );
  });

  it('waits two stabilization frames before setting zero-state', () => {
    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    expect(chartInstance.setOption).not.toHaveBeenCalled();

    runNextFrame();
    expect(chartInstance.setOption).not.toHaveBeenCalled();

    runNextFrame();
    expect(chartInstance.setOption).toHaveBeenCalledTimes(1);
  });

  it('waits two paint frames before applying real values', () => {
    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    runNextFrame();
    runNextFrame();
    expect(chartInstance.setOption).toHaveBeenCalledTimes(1);

    runNextFrame();
    expect(chartInstance.setOption).toHaveBeenCalledTimes(1);

    runNextFrame();
    expect(chartInstance.setOption).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['first stabilization', 0, 0],
    ['second stabilization', 1, 0],
    ['first paint', 2, 1],
    ['final paint', 3, 1],
  ] as const)(
    'stops stale %s work when newer options arrive',
    (_name, framesToRun, expectedCallsBeforeStaleCallback) => {
      const view = renderMountedUseECharts({
        options: createOptions({
          animationDuration: 1000,
        }),
        chartId: 'sales-chart',
      });

      for (let index = 0; index < framesToRun; index += 1) {
        runNextFrame();
      }

      const staleFrameId = getFrameId(framesToRun);
      const staleCallback = getFrameCallback(staleFrameId);

      view.rerender({
        options: createOptions({
          animationDuration: 2000,
        }),
        chartId: 'sales-chart',
      });

      act(() => {
        staleCallback(0);
      });

      expect(chartInstance.setOption).toHaveBeenCalledTimes(expectedCallsBeforeStaleCallback);
    },
  );

  it.each([
    ['first stabilization', 0, 0],
    ['second stabilization', 1, 0],
    ['first paint', 2, 1],
    ['final paint', 3, 1],
  ] as const)('stops disposed %s work', (_name, framesToRun, expectedCalls) => {
    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    for (let index = 0; index < framesToRun; index += 1) {
      runNextFrame();
    }

    chartInstance.isDisposed.mockReturnValue(true);
    runNextFrame();

    expect(chartInstance.setOption).toHaveBeenCalledTimes(expectedCalls);
  });

  it('finishes entrance animation from the finished event', () => {
    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    runAllFrames();
    chartInstance.resize.mockClear();

    act(() => {
      getFinishedHandler()();
    });

    runAllFrames();

    expect(chartInstance.resize).toHaveBeenCalled();
  });

  it('ignores the finished event before entrance starts', () => {
    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    chartInstance.resize.mockClear();

    act(() => {
      getFinishedHandler()();
    });

    expect(chartInstance.resize).not.toHaveBeenCalled();
  });

  it('uses update duration and maximum numeric delay for the guard', () => {
    renderMountedUseECharts({
      options: createOptions({
        animationDuration: 500,
        animationDurationUpdate: 1200,
        animationDelay: 50,
        animationDelayUpdate: 100,
      }),
      chartId: 'sales-chart',
    });

    runAllFrames();
    chartInstance.resize.mockClear();

    act(() => {
      vi.advanceTimersByTime(1449);
    });

    expect(chartInstance.resize).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    runAllFrames();
    expect(chartInstance.resize).toHaveBeenCalled();
  });

  it('falls back to initial duration and zero delay when update values are invalid', () => {
    renderMountedUseECharts({
      options: createOptions({
        animationDuration: 700,
        animationDurationUpdate: 'invalid',
        animationDelay: 20,
        animationDelayUpdate: 'invalid',
      }),
      chartId: 'sales-chart',
    });

    runAllFrames();
    chartInstance.resize.mockClear();

    act(() => {
      vi.advanceTimersByTime(870);
    });

    runAllFrames();
    expect(chartInstance.resize).toHaveBeenCalled();
  });

  it('uses the default duration when animation durations are invalid', () => {
    renderMountedUseECharts({
      options: createOptions({
        animationDuration: 'invalid',
        animationDurationUpdate: 'invalid',
        animationDelay: 'invalid',
        animationDelayUpdate: 'invalid',
      }),
      chartId: 'sales-chart',
    });

    runAllFrames();
    chartInstance.resize.mockClear();

    act(() => {
      vi.advanceTimersByTime(1950);
    });

    runAllFrames();
    expect(chartInstance.resize).toHaveBeenCalled();
  });

  it('protects entrance animation from window resize and flushes afterward', () => {
    renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
      width: 800,
      height: 500,
    });

    runAllFrames();

    requestAnimationFrameMock.mockClear();
    rafCallbacks.clear();
    chartInstance.resize.mockClear();

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(requestAnimationFrameMock).not.toHaveBeenCalled();

    act(() => {
      getFinishedHandler()();
    });

    runAllFrames();

    expect(chartInstance.resize).toHaveBeenCalledWith({
      width: 800,
      height: 500,
      animation: {
        duration: 0,
      },
    });
  });

  it('applies later options without replaying the zero-state sequence', () => {
    const view = renderMountedUseECharts({
      options: createOptions({
        series: [
          {
            type: 'bar',
            data: [10, 20],
          },
        ],
      }),
      chartId: 'sales-chart',
    });

    finishInitialAnimationByGuard();
    chartInstance.setOption.mockClear();

    const updatedOptions = createOptions({
      animationDuration: 900,
      series: [
        {
          type: 'bar',
          data: [30, 40],
        },
      ],
    });

    view.rerender({
      options: updatedOptions,
      chartId: 'sales-chart',
    });

    expect(chartInstance.setOption).toHaveBeenCalledTimes(1);
    expect(chartInstance.setOption).toHaveBeenCalledWith(
      expect.objectContaining({
        animationDuration: 900,
        series: [
          expect.objectContaining({
            type: 'bar',
            data: [30, 40],
          }),
        ],
      }),
      {
        notMerge: false,
        lazyUpdate: false,
      },
    );
  });

  it('logs an ECharts render error for a later update failure', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const view = renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    finishInitialAnimationByGuard();

    const error = new Error('Unable to render');
    chartInstance.setOption.mockImplementationOnce(() => {
      throw error;
    });

    view.rerender({
      options: createOptions({
        animationDuration: 600,
      }),
      chartId: 'sales-chart',
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('ECharts Render Error:', error);
  });

  it('invalidates and cancels pending startup work when options change', () => {
    const view = renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    const firstFrameId = getFrameId(0);

    view.rerender({
      options: createOptions({
        animationDuration: 2000,
      }),
      chartId: 'sales-chart',
    });

    expect(cancelAnimationFrameMock).toHaveBeenCalledWith(firstFrameId);
  });

  it('releases preparation when initial options are removed', () => {
    const view = renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    view.rerender({
      chartId: 'sales-chart',
    });

    requestAnimationFrameMock.mockClear();
    rafCallbacks.clear();

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(requestAnimationFrameMock).toHaveBeenCalledTimes(1);
  });

  it('cleans up observers, listeners, frames, events, guard, and the instance', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');

    const view = renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    runAllFrames();

    const finishedHandler = getFinishedHandler();

    view.unmount();

    expect(resizeObserverDisconnectMock).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(chartInstance.off).toHaveBeenCalledWith('finished', finishedHandler);
    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(chartInstance.dispose).toHaveBeenCalledTimes(1);
  });

  it('does not dispose an already disposed instance', () => {
    const view = renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    chartInstance.isDisposed.mockReturnValue(true);
    view.unmount();

    expect(chartInstance.dispose).not.toHaveBeenCalled();
  });

  it('cancels pending startup and resize frames during cleanup', () => {
    const view = renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    const firstFrameId = getFrameId(0);

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    view.unmount();

    expect(cancelAnimationFrameMock).toHaveBeenCalledWith(firstFrameId);
  });

  it('prevents stale startup work after unmount', () => {
    const view = renderMountedUseECharts({
      options: createOptions(),
      chartId: 'sales-chart',
    });

    const firstFrameId = getFrameId(0);
    const staleCallback = getFrameCallback(firstFrameId);

    view.unmount();

    act(() => {
      staleCallback(0);
    });

    expect(chartInstance.setOption).not.toHaveBeenCalled();
  });

  it('does not mutate the supplied options', () => {
    const options = createOptions();
    const originalOptions = structuredClone(options);

    renderMountedUseECharts({
      options,
      chartId: 'sales-chart',
    });

    runAllFrames();

    expect(options).toEqual(originalOptions);
  });
});
