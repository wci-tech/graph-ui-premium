import { useEffect, useMemo, useRef } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import { Chart as ChartJSAuto } from 'chart.js/auto';

import type { ChartjsProps } from '../ChartJS.types';
import { createChartConfig, getDatasets } from '../utils/ChartJS.utils';

import { useChartDownload } from './useChartDownload';

type UseChartjsParams = Pick<ChartjsProps, 'data' | 'options' | 'plugins' | 'type'>;

type ChartConstructor = new (canvas: HTMLCanvasElement, config: object) => ChartJSAuto;

const ChartJSConstructor = ChartJSAuto as unknown as ChartConstructor;

export const useChartjs = ({ type, data, options, plugins = [] }: UseChartjsParams) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const chartInstanceRef = useRef<ChartJSAuto | null>(null);

  const replayFrameRef = useRef<number | null>(null);
  const secondReplayFrameRef = useRef<number | null>(null);

  const datasets = useMemo(() => getDatasets(data), [data]);

  const { handleDownload } = useChartDownload(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    chartInstanceRef.current?.destroy();
    chartInstanceRef.current = null;

    const config = createChartConfig(
      compactObject({
        canvas,
        type,
        data,
        options,
        plugins,
        datasets,
      }),
    );

    const chart = new ChartJSConstructor(canvas, config);

    chartInstanceRef.current = chart;

    replayFrameRef.current = requestAnimationFrame(() => {
      secondReplayFrameRef.current = requestAnimationFrame(() => {
        if (chartInstanceRef.current !== chart) {
          return;
        }

        chart.reset();
        chart.update();
      });
    });

    return () => {
      if (replayFrameRef.current !== null) {
        cancelAnimationFrame(replayFrameRef.current);
        replayFrameRef.current = null;
      }

      if (secondReplayFrameRef.current !== null) {
        cancelAnimationFrame(secondReplayFrameRef.current);
        secondReplayFrameRef.current = null;
      }

      chart.destroy();

      if (chartInstanceRef.current === chart) {
        chartInstanceRef.current = null;
      }
    };
  }, [data, datasets, options, plugins, type]);

  return {
    canvasRef,
    handleDownload,
  };
};
