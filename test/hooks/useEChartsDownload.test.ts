import type { RefObject } from 'react';

import { renderHook } from '@testing-library/react';
import type { Chart as ChartJS } from 'chart.js';
import type * as echarts from 'echarts';
import type uPlot from 'uplot';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useEChartsDownload } from '@/hooks/useEChartsDownload';

type SupportedChartInstance = echarts.ECharts | ChartJS | uPlot;

const createInstanceRef = (
  current: SupportedChartInstance | null,
): RefObject<SupportedChartInstance | null> => ({
  current,
});

describe('useEChartsDownload', () => {
  const mockedTimestamp = 1_721_234_567_890;

  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let linkClickSpy: ReturnType<typeof vi.fn<() => void>>;
  let createdLink: HTMLAnchorElement;
  let originalCreateElement: typeof document.createElement;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    vi.spyOn(Date, 'now').mockReturnValue(mockedTimestamp);

    linkClickSpy = vi.fn<() => void>();

    createdLink = document.createElement('a');
    createdLink.click = linkClickSpy;

    originalCreateElement = document.createElement.bind(document);

    vi.spyOn(document, 'createElement').mockImplementation(((
      tagName: string,
      options?: ElementCreationOptions,
    ): HTMLElement => {
      if (tagName.toLowerCase() === 'a') {
        return createdLink;
      }

      return originalCreateElement(tagName, options);
    }) as typeof document.createElement);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('warns when the chart instance is not initialized', () => {
    const instanceRef = createInstanceRef(null);

    const { result } = renderHook(() => useEChartsDownload(instanceRef, 'echarts'));

    result.current.handleDownload('png');

    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith('Download failed: Chart instance not initialized.');

    expect(linkClickSpy).not.toHaveBeenCalled();
  });

  it('downloads an ECharts chart using the default options', () => {
    const getDataURL = vi.fn().mockReturnValue('data:image/png;base64,echarts');

    const instance = {
      getDataURL,
    } as unknown as echarts.ECharts;

    const instanceRef = createInstanceRef(instance);

    const { result } = renderHook(() => useEChartsDownload(instanceRef, 'echarts'));

    result.current.handleDownload('png');

    expect(getDataURL).toHaveBeenCalledTimes(1);
    expect(getDataURL).toHaveBeenCalledWith({
      type: 'png',
      pixelRatio: 2,
      excludeComponents: ['toolbox'],
    });

    expect(createdLink.href).toBe('data:image/png;base64,echarts');
    expect(createdLink.download).toBe(`chart-export-${mockedTimestamp}.png`);
    expect(linkClickSpy).toHaveBeenCalledTimes(1);
  });

  it('downloads an ECharts chart using custom options', () => {
    const getDataURL = vi.fn().mockReturnValue('data:image/svg+xml,echarts');

    const instance = {
      getDataURL,
    } as unknown as echarts.ECharts;

    const instanceRef = createInstanceRef(instance);

    const { result } = renderHook(() =>
      useEChartsDownload(instanceRef, 'echarts', {
        fileName: 'sales-chart',
        backgroundColor: '#ffffff',
        pixelRatio: 4,
        excludeComponents: ['toolbox', 'dataZoom'],
      }),
    );

    result.current.handleDownload('svg');

    expect(getDataURL).toHaveBeenCalledWith({
      type: 'svg',
      pixelRatio: 4,
      excludeComponents: ['toolbox', 'dataZoom'],
      backgroundColor: '#ffffff',
    });

    expect(createdLink.href).toBe('data:image/svg+xml,echarts');
    expect(createdLink.download).toBe(`sales-chart-${mockedTimestamp}.svg`);
    expect(linkClickSpy).toHaveBeenCalledTimes(1);
  });

  it('converts jpg to jpeg when downloading an ECharts chart', () => {
    const getDataURL = vi.fn().mockReturnValue('data:image/jpeg;base64,echarts');

    const instance = {
      getDataURL,
    } as unknown as echarts.ECharts;

    const instanceRef = createInstanceRef(instance);

    const { result } = renderHook(() =>
      useEChartsDownload(instanceRef, 'echarts', {
        fileName: 'echarts-export',
      }),
    );

    result.current.handleDownload('jpg');

    expect(getDataURL).toHaveBeenCalledWith({
      type: 'jpeg',
      pixelRatio: 2,
      excludeComponents: ['toolbox'],
    });

    expect(createdLink.download).toBe(`echarts-export-${mockedTimestamp}.jpg`);
    expect(linkClickSpy).toHaveBeenCalledTimes(1);
  });

  it('downloads a Chart.js chart from its canvas', () => {
    const toDataURL = vi.fn().mockReturnValue('data:image/png;base64,chartjs');

    const canvas = document.createElement('canvas');
    canvas.toDataURL = toDataURL;

    const instance = {
      canvas,
    } as unknown as ChartJS;

    const instanceRef = createInstanceRef(instance);

    const { result } = renderHook(() =>
      useEChartsDownload(instanceRef, 'chartjs', {
        fileName: 'chartjs-export',
      }),
    );

    result.current.handleDownload('png');

    expect(toDataURL).toHaveBeenCalledTimes(1);
    expect(toDataURL).toHaveBeenCalledWith('image/png');

    expect(createdLink.href).toBe('data:image/png;base64,chartjs');
    expect(createdLink.download).toBe(`chartjs-export-${mockedTimestamp}.png`);
    expect(linkClickSpy).toHaveBeenCalledTimes(1);
  });

  it('uses image/jpeg when downloading a Chart.js chart as jpg', () => {
    const toDataURL = vi.fn().mockReturnValue('data:image/jpeg;base64,chartjs');

    const canvas = document.createElement('canvas');
    canvas.toDataURL = toDataURL;

    const instance = {
      canvas,
    } as unknown as ChartJS;

    const instanceRef = createInstanceRef(instance);

    const { result } = renderHook(() => useEChartsDownload(instanceRef, 'chartjs'));

    result.current.handleDownload('jpg');

    expect(toDataURL).toHaveBeenCalledWith('image/jpeg');
    expect(createdLink.download).toBe(`chart-export-${mockedTimestamp}.jpg`);
    expect(linkClickSpy).toHaveBeenCalledTimes(1);
  });

  it('downloads a uPlot chart from the canvas inside its root element', () => {
    const toDataURL = vi.fn().mockReturnValue('data:image/png;base64,uplot');

    const canvas = document.createElement('canvas');
    canvas.toDataURL = toDataURL;

    const root = document.createElement('div');
    root.append(canvas);

    const instance = {
      root,
    } as unknown as uPlot;

    const instanceRef = createInstanceRef(instance);

    const { result } = renderHook(() =>
      useEChartsDownload(instanceRef, 'uplot', {
        fileName: 'uplot-export',
      }),
    );

    result.current.handleDownload('png');

    expect(toDataURL).toHaveBeenCalledTimes(1);
    expect(toDataURL).toHaveBeenCalledWith('image/png');

    expect(createdLink.href).toBe('data:image/png;base64,uplot');
    expect(createdLink.download).toBe(`uplot-export-${mockedTimestamp}.png`);
    expect(linkClickSpy).toHaveBeenCalledTimes(1);
  });

  it('warns when the uPlot root does not contain a canvas', () => {
    const root = document.createElement('div');

    const instance = {
      root,
    } as unknown as uPlot;

    const instanceRef = createInstanceRef(instance);

    const { result } = renderHook(() => useEChartsDownload(instanceRef, 'uplot'));

    result.current.handleDownload('png');

    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith('uPlot canvas not found.');

    expect(linkClickSpy).not.toHaveBeenCalled();
  });

  it('warns when the instance does not match the selected chart type', () => {
    const getDataURL = vi.fn().mockReturnValue('data:image/png;base64,echarts');

    const instance = {
      getDataURL,
    } as unknown as echarts.ECharts;

    const instanceRef = createInstanceRef(instance);

    const { result } = renderHook(() => useEChartsDownload(instanceRef, 'chartjs'));

    result.current.handleDownload('png');

    expect(getDataURL).not.toHaveBeenCalled();

    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith('Download not supported for chartjs');

    expect(linkClickSpy).not.toHaveBeenCalled();
  });

  it('warns when ECharts returns an empty download URL', () => {
    const getDataURL = vi.fn().mockReturnValue('');

    const instance = {
      getDataURL,
    } as unknown as echarts.ECharts;

    const instanceRef = createInstanceRef(instance);

    const { result } = renderHook(() => useEChartsDownload(instanceRef, 'echarts'));

    result.current.handleDownload('png');

    expect(getDataURL).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith('Download not supported for echarts');
    expect(linkClickSpy).not.toHaveBeenCalled();
  });
});
