import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption, SeriesOption } from 'echarts';
import * as echarts from 'echarts';

import { useEChartsDownload } from '@/hooks/useEChartsDownload';

import type { EChartsProps } from '../ECharts.types';
import { DEFAULT_ECHARTS_EXPORT_FILE_NAME } from '../utils/ECharts.constants';

type UseEChartsParams = Pick<EChartsProps, 'chartId' | 'options'>;

const DEFAULT_ANIMATION_DURATION = 1800;

/* -------------------------------------------------------------------------- */
/* Initial animation helpers                                                   */
/* -------------------------------------------------------------------------- */

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const getZeroValue = (value: unknown): unknown => {
  if (typeof value === 'number') {
    return 0;
  }

  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'number') {
        return 0;
      }

      if (Array.isArray(item)) {
        return item.map((nestedItem) => (typeof nestedItem === 'number' ? 0 : nestedItem));
      }

      if (isRecord(item)) {
        return {
          ...item,

          value: typeof item['value'] === 'number' ? 0 : item['value'],
        };
      }

      return item;
    });
  }

  return value;
};

const createInitialSeries = (series: SeriesOption): SeriesOption => {
  const seriesRecord = series as Record<string, unknown>;

  return {
    ...series,

    /*
     * Zero state is immediate.
     */
    animation: false,

    data: getZeroValue(seriesRecord['data']),
  } as SeriesOption;
};

const createInitialLoadOptions = (options: EChartsOption): EChartsOption => {
  const currentSeries = Array.isArray(options.series) ? options.series : [];

  return {
    ...options,

    animation: false,

    series: currentSeries.map(createInitialSeries),
  };
};

/* -------------------------------------------------------------------------- */
/* Native options                                                              */
/* -------------------------------------------------------------------------- */

const getNativeEChartsOptions = (options: EChartsProps['options']): EChartsOption | undefined => {
  if (!options) {
    return undefined;
  }

  const { height: _height, chartBackground: _chartBackground, ...nativeOptions } = options;

  return nativeOptions;
};

/* -------------------------------------------------------------------------- */
/* Animation guard                                                            */
/* -------------------------------------------------------------------------- */

const getAnimationGuardDuration = (options: EChartsOption): number => {
  const updateDuration =
    typeof options.animationDurationUpdate === 'number'
      ? options.animationDurationUpdate
      : undefined;

  const initialDuration =
    typeof options.animationDuration === 'number' ? options.animationDuration : undefined;

  const duration = updateDuration ?? initialDuration ?? DEFAULT_ANIMATION_DURATION;

  const updateDelay =
    typeof options.animationDelayUpdate === 'number' ? options.animationDelayUpdate : 0;

  const initialDelay = typeof options.animationDelay === 'number' ? options.animationDelay : 0;

  const delay = Math.max(updateDelay, initialDelay);

  return duration + delay + 150;
};

/* -------------------------------------------------------------------------- */
/* Hook                                                                        */
/* -------------------------------------------------------------------------- */

export const useECharts = ({ options, chartId }: UseEChartsParams) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const instanceRef = useRef<echarts.ECharts | null>(null);

  /*
   * Initial animation has actually started.
   *
   * This is different from "options have arrived".
   */
  const hasInitialAnimationRunRef = useRef(false);

  /*
   * Short setup period:
   *
   * resize
   * zero state
   * frame
   * resize
   * frame
   * real state
   */
  const isPreparingAnimationRef = useRef(false);

  /*
   * Real entrance animation is currently running.
   */
  const isEntranceAnimationRunningRef = useRef(false);

  /*
   * Resize that arrives while animation is protected.
   */
  const hasPendingResizeRef = useRef(false);

  /*
   * IMPORTANT:
   *
   * Every nativeOptions change gets a new version.
   *
   * If rootElement becomes available and CSS-derived colors/options
   * change during the first couple frames, the old startup sequence
   * becomes invalid.
   */
  const optionsVersionRef = useRef(0);

  const firstFrameRef = useRef<number | null>(null);

  const secondFrameRef = useRef<number | null>(null);

  const resizeFrameRef = useRef<number | null>(null);

  const animationGuardTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nativeOptions = useMemo(() => getNativeEChartsOptions(options), [options]);

  const { handleDownload } = useEChartsDownload(
    instanceRef,
    'echarts',
    compactObject({
      fileName: chartId ?? DEFAULT_ECHARTS_EXPORT_FILE_NAME,

      backgroundColor: options?.chartBackground,
    }),
  );

  /* ------------------------------------------------------------------------ */
  /* Cleanup                                                                  */
  /* ------------------------------------------------------------------------ */

  const cancelFrames = useCallback(() => {
    if (firstFrameRef.current !== null) {
      cancelAnimationFrame(firstFrameRef.current);

      firstFrameRef.current = null;
    }

    if (secondFrameRef.current !== null) {
      cancelAnimationFrame(secondFrameRef.current);

      secondFrameRef.current = null;
    }

    if (resizeFrameRef.current !== null) {
      cancelAnimationFrame(resizeFrameRef.current);

      resizeFrameRef.current = null;
    }
  }, []);

  const cancelAnimationGuard = useCallback(() => {
    if (animationGuardTimeoutRef.current !== null) {
      clearTimeout(animationGuardTimeoutRef.current);

      animationGuardTimeoutRef.current = null;
    }
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Resize                                                                   */
  /* ------------------------------------------------------------------------ */

  const resizeTo = useCallback((width: number, height: number) => {
    const chartInstance = instanceRef.current;

    if (!chartInstance || chartInstance.isDisposed() || width <= 0 || height <= 0) {
      return;
    }

    chartInstance.resize({
      width: Math.max(1, Math.floor(width)),

      height: Math.max(1, Math.floor(height)),

      /*
       * Responsive resize itself should not create another animation.
       */
      animation: {
        duration: 0,
      },
    });
  }, []);

  const resizeChartNow = useCallback(() => {
    const chartElement = chartRef.current;

    if (!chartElement) {
      return;
    }

    /*
     * The parent is ECharts.chartWrapper and is our responsive
     * source of truth.
     */
    const wrapper = chartElement.parentElement ?? chartElement;

    const rect = wrapper.getBoundingClientRect();

    resizeTo(rect.width, rect.height);
  }, [resizeTo]);

  const resizeChart = useCallback(() => {
    /*
     * Protect entrance animation.
     *
     * Never discard resize — queue it.
     */
    if (isPreparingAnimationRef.current || isEntranceAnimationRunningRef.current) {
      hasPendingResizeRef.current = true;

      return;
    }

    if (resizeFrameRef.current !== null) {
      cancelAnimationFrame(resizeFrameRef.current);
    }

    resizeFrameRef.current = requestAnimationFrame(() => {
      resizeFrameRef.current = null;

      if (isPreparingAnimationRef.current || isEntranceAnimationRunningRef.current) {
        hasPendingResizeRef.current = true;

        return;
      }

      resizeChartNow();
    });
  }, [resizeChartNow]);

  /* ------------------------------------------------------------------------ */
  /* Finish entrance                                                          */
  /* ------------------------------------------------------------------------ */

  const finishEntranceAnimation = useCallback(() => {
    if (!isEntranceAnimationRunningRef.current) {
      return;
    }

    isEntranceAnimationRunningRef.current = false;

    isPreparingAnimationRef.current = false;

    cancelAnimationGuard();

    /*
     * Flush latest responsive size after animation.
     */
    hasPendingResizeRef.current = false;

    resizeChart();
  }, [cancelAnimationGuard, resizeChart]);

  /* ------------------------------------------------------------------------ */
  /* Create ECharts                                                           */
  /* ------------------------------------------------------------------------ */

  useLayoutEffect(() => {
    const chartElement = chartRef.current;

    if (!chartElement) {
      return;
    }

    const existingInstance = echarts.getInstanceByDom(chartElement);

    const chartInstance =
      existingInstance ??
      echarts.init(chartElement, undefined, {
        renderer: 'canvas',
        useDirtyRect: false,
      });

    instanceRef.current = chartInstance;

    hasInitialAnimationRunRef.current = false;

    isPreparingAnimationRef.current = false;

    isEntranceAnimationRunningRef.current = false;

    hasPendingResizeRef.current = false;

    const handleFinished = () => {
      if (!isEntranceAnimationRunningRef.current) {
        return;
      }

      finishEntranceAnimation();
    };

    chartInstance.on('finished', handleFinished);

    /*
     * Instance may mount before Base chart's rootElement exists.
     * That's okay.
     *
     * Just size the renderer here.
     */
    resizeChartNow();

    return () => {
      /*
       * Invalidate all pending option startup work.
       */
      optionsVersionRef.current += 1;

      cancelFrames();
      cancelAnimationGuard();

      chartInstance.off('finished', handleFinished);

      hasInitialAnimationRunRef.current = false;

      isPreparingAnimationRef.current = false;

      isEntranceAnimationRunningRef.current = false;

      hasPendingResizeRef.current = false;

      if (!chartInstance.isDisposed()) {
        chartInstance.dispose();
      }

      if (instanceRef.current === chartInstance) {
        instanceRef.current = null;
      }
    };
  }, [chartId, cancelAnimationGuard, cancelFrames, finishEntranceAnimation, resizeChartNow]);

  /* ------------------------------------------------------------------------ */
  /* ResizeObserver                                                           */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const chartElement = chartRef.current;

    if (!chartElement) {
      return;
    }

    /*
     * Observe the wrapper because Grid/Flex changes that element.
     */
    const wrapper = chartElement.parentElement ?? chartElement;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      if (isPreparingAnimationRef.current || isEntranceAnimationRunningRef.current) {
        hasPendingResizeRef.current = true;

        return;
      }

      const { width, height } = entry.contentRect;

      if (width <= 0 || height <= 0) {
        return;
      }

      if (resizeFrameRef.current !== null) {
        cancelAnimationFrame(resizeFrameRef.current);
      }

      resizeFrameRef.current = requestAnimationFrame(() => {
        resizeFrameRef.current = null;

        if (isPreparingAnimationRef.current || isEntranceAnimationRunningRef.current) {
          hasPendingResizeRef.current = true;

          return;
        }

        resizeTo(width, height);
      });
    });

    resizeObserver.observe(wrapper);

    const handleWindowResize = () => {
      resizeChart();
    };

    window.addEventListener('resize', handleWindowResize);

    resizeChart();

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener('resize', handleWindowResize);
    };
  }, [resizeChart, resizeTo]);

  /* ------------------------------------------------------------------------ */
  /* Options + initial animation                                              */
  /* ------------------------------------------------------------------------ */

  useLayoutEffect(() => {
    const chartInstance = instanceRef.current;

    if (!chartInstance || chartInstance.isDisposed() || !nativeOptions) {
      return;
    }

    /*
     * Every new options object creates a new startup version.
     *
     * Example:
     *
     * render 1
     * rootElement = null
     * fallback colors
     * version 1
     *
     * render 2
     * rootElement = actual wrapper
     * CSS colors
     * version 2
     *
     * Version 1 RAF sees that it is stale and exits.
     */
    optionsVersionRef.current += 1;

    const currentVersion = optionsVersionRef.current;

    cancelFrames();

    /*
     * ----------------------------------------------------------------------
     * Before initial animation has actually started:
     *
     * treat every option change as another candidate for the REAL first
     * render.
     *
     * This is what removes the need for:
     *
     * {rootElement ? <ECharts /> : null}
     * ----------------------------------------------------------------------
     */
    if (!hasInitialAnimationRunRef.current) {
      isPreparingAnimationRef.current = true;

      hasPendingResizeRef.current = false;

      /*
       * Don't immediately set zero-state.
       *
       * Wait one frame first so Base chart gets a chance to resolve
       * rootElement / CSS variables.
       */
      firstFrameRef.current = requestAnimationFrame(() => {
        firstFrameRef.current = null;

        /*
         * Newer options arrived.
         *
         * This startup sequence is obsolete.
         */
        if (optionsVersionRef.current !== currentVersion) {
          return;
        }

        if (chartInstance.isDisposed()) {
          return;
        }

        resizeChartNow();

        /*
         * One more frame gives React + Emotion + Grid/Flex the chance
         * to finish the rootElement-driven update.
         */
        secondFrameRef.current = requestAnimationFrame(() => {
          secondFrameRef.current = null;

          if (optionsVersionRef.current !== currentVersion) {
            return;
          }

          if (chartInstance.isDisposed()) {
            return;
          }

          resizeChartNow();

          /*
           * NOW we consider these options stable enough to become the
           * actual initial animation.
           */
          chartInstance.setOption(createInitialLoadOptions(nativeOptions), {
            notMerge: true,
            lazyUpdate: false,
          });

          /*
           * Make sure zero-state gets a paint before real values.
           */
          firstFrameRef.current = requestAnimationFrame(() => {
            firstFrameRef.current = null;

            if (optionsVersionRef.current !== currentVersion) {
              return;
            }

            if (chartInstance.isDisposed()) {
              return;
            }

            resizeChartNow();

            secondFrameRef.current = requestAnimationFrame(() => {
              secondFrameRef.current = null;

              if (optionsVersionRef.current !== currentVersion) {
                return;
              }

              if (chartInstance.isDisposed()) {
                return;
              }

              /*
               * Final resize before effect begins.
               */
              resizeChartNow();

              /*
               * We only mark the initial animation as RUN
               * now — after the latest options have survived
               * the stabilization period.
               */
              hasInitialAnimationRunRef.current = true;

              isPreparingAnimationRef.current = false;

              isEntranceAnimationRunningRef.current = true;

              /*
               * ZERO -> REAL.
               */
              chartInstance.setOption(nativeOptions, {
                notMerge: false,

                lazyUpdate: false,
              });

              /*
               * Protect the animation from responsive resize,
               * but guarantee the lock eventually releases.
               */
              cancelAnimationGuard();

              const guardDuration = getAnimationGuardDuration(nativeOptions);

              animationGuardTimeoutRef.current = setTimeout(() => {
                animationGuardTimeoutRef.current = null;

                finishEntranceAnimation();
              }, guardDuration);
            });
          });
        });
      });

      return () => {
        /*
         * Invalidate this setup if nativeOptions changes.
         */
        if (optionsVersionRef.current === currentVersion) {
          optionsVersionRef.current += 1;
        }

        cancelFrames();

        /*
         * Only release the preparation lock.
         *
         * Don't cancel an entrance animation that already started.
         */
        if (!hasInitialAnimationRunRef.current) {
          isPreparingAnimationRef.current = false;
        }
      };
    }

    /* ---------------------------------------------------------------------- */
    /* Normal later updates                                                   */
    /* ---------------------------------------------------------------------- */

    try {
      chartInstance.setOption(nativeOptions, {
        notMerge: false,
        lazyUpdate: false,
      });

      resizeChart();
    } catch (error: unknown) {
      console.error('ECharts Render Error:', error);
    }

    return;
  }, [
    nativeOptions,
    chartId,
    cancelAnimationGuard,
    cancelFrames,
    finishEntranceAnimation,
    resizeChart,
    resizeChartNow,
  ]);

  return {
    chartRef,
    handleDownload,
  };
};
