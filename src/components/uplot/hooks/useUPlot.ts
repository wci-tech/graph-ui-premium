import { useEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import uPlot from 'uplot';

import type {
  DownloadFormat,
  UPlotDefinition,
  UPlotHoverInfo,
  UPlotRendererProps,
} from '../UPlot.types';
import { DEFAULT_UPLOT_EXPORT_FILE_NAME, DEFAULT_UPLOT_HEIGHT } from '../utils/UPlot.constants';
import { createUPlotOptions, toUPlotData } from '../utils/UPlot.utils';

type UseUPlotParams = Pick<UPlotRendererProps, 'data' | 'options'>;

const getImageType = (format: DownloadFormat): 'png' | 'jpeg' =>
  format === 'jpg' ? 'jpeg' : 'png';

export const useUPlot = ({ data, options }: UseUPlotParams) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<uPlot | null>(null);

  const [hoverInfo, setHoverInfo] = useState<UPlotHoverInfo | null>(null);

  const chartHeight = options?.height ?? DEFAULT_UPLOT_HEIGHT;
  const fileName = options?.fileName ?? DEFAULT_UPLOT_EXPORT_FILE_NAME;

  const definition = useMemo<UPlotDefinition>(
    () =>
      compactObject({
        labels: data?.labels ?? [],
        series: data?.series ?? [],
        appearance: data?.appearance ?? 'solid',
        colors: data?.colors,
        axisColor: data?.axisColor,
        gridColor: data?.gridColor,
        pointFillColor: data?.pointFillColor,
      }),
    [data],
  );

  useEffect(() => {
    const container = chartRef.current;
    const seriesData = definition.series ?? [];

    if (!container || seriesData.length === 0) return undefined;

    const render = () => {
      const width = container.offsetWidth;
      const uPlotData = toUPlotData(definition);
      const uPlotOptions = createUPlotOptions({
        definition,
        width,
        height: chartHeight,
        onCursorMove: setHoverInfo,
      });

      instanceRef.current?.destroy();
      instanceRef.current = new uPlot(uPlotOptions, uPlotData, container);
    };

    const frameId = window.requestAnimationFrame(render);

    const resizeObserver = new ResizeObserver(() => {
      if (!instanceRef.current || !chartRef.current) return;

      instanceRef.current.setSize({
        width: chartRef.current.offsetWidth,
        height: chartHeight,
      });
    });

    resizeObserver.observe(container);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();

      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [chartHeight, definition]);

  const handleDownload = (format: DownloadFormat) => {
    const canvas = chartRef.current?.querySelector('canvas');

    if (!(canvas instanceof HTMLCanvasElement)) return;

    const link = document.createElement('a');
    const imageType = getImageType(format);

    link.href = canvas.toDataURL(`image/${imageType}`);
    link.download = `${fileName}.${format}`;
    link.click();
  };

  return {
    chartRef,
    hoverInfo,
    handleDownload,
  };
};
