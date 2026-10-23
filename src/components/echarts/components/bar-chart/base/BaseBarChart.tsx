/** @jsxImportSource @emotion/react */
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui';

import ECharts from '@/components/echarts/ECharts';
import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import type { BaseBarChartProps } from './BaseBarChart.types';
import {
  createBarChartDefinition,
  getResolvedBarChartColors,
  mergeBarChartOptions,
} from './BaseBarChart.utils';

const DEFAULT_BAR_WIDTH = 40;

const BaseBarChart = ({
  data,
  labels,
  series,
  options,
  chartId,
  effect = 'none',

  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,

  customStyles,
  className,
  testId = 'echarts-bar-chart-test-id',
}: BaseBarChartProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setRootElement(wrapperRef.current);
  }, [customStyles?.wrapper, rendererCustomStyles?.container]);

  const resolvedColors = useMemo(() => getResolvedBarChartColors(rootElement), [rootElement]);

  const horizontal = options?.horizontal ?? false;

  const barWidth = options?.barWidth ?? DEFAULT_BAR_WIDTH;

  const normalizedData = useMemo(
    () =>
      createBarChartDefinition(
        compactObject({
          data,
          labels,
          series,
          colors: resolvedColors,
          horizontal,
          barWidth,
        }),
      ),
    [barWidth, data, horizontal, labels, resolvedColors, series],
  );

  const chartOptions = useMemo(() => {
    const generatedOptions = createEChartsOptions(normalizedData);

    const animatedOptions = applyEChartsSeriesAnimation(generatedOptions, options);

    return mergeBarChartOptions(
      compactObject({
        generatedOptions: animatedOptions,
        options,
      }),
    );
  }, [normalizedData, options]);

  const eChartsProps = compactObject({
    chartId,
    options: chartOptions,
    showDownload,
    downloadPlacement,
    customStyles: rendererCustomStyles,
  });

  return (
    <div
      ref={wrapperRef}
      {...compactObject({
        className,
        'data-testid': testId,
        'data-effect': effect,
        'data-orientation': horizontal ? 'horizontal' : 'vertical',
      })}
      css={[customStyles?.wrapper, rendererCustomStyles?.container]}
    >
      <ECharts
        key={`${chartId ?? 'echarts-bar-chart'}-${effect}-${horizontal}-${barWidth}`}
        {...eChartsProps}
      />
    </div>
  );
};

export default BaseBarChart;
