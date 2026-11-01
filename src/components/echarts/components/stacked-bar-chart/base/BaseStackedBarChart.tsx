/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';
import type { EChartsProps } from '@/components/echarts/ECharts.types';

import { useStackedBarChart } from '../hooks/useStackedBarChart';

import type { BaseStackedBarChartProps } from './BaseStackedBarChart.types';

const DEFAULT_STACKED_BAR_CHART_ID = 'echarts-stacked-bar-chart';

const BaseStackedBarChart = ({
  data,
  colors,
  options,
  chartId = DEFAULT_STACKED_BAR_CHART_ID,
  effect = 'none',
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'echarts-stacked-bar-chart-test-id',
}: BaseStackedBarChartProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useStackedBarChart(
    compactObject({
      data,
      colors,
      options,
      effect,
      customStyles,
      rendererCustomStyles,
      className,
      testId,
    }),
  );

  const wrapperStyles = css([customStyles?.wrapper, rendererCustomStyles?.container]);

  if (!isReady || !chartOptions) {
    return <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles} />;
  }

  const echartsProps: EChartsProps = compactObject({
    options: chartOptions,
    chartId,
    showDownload,
    downloadPlacement,
    customStyles: rendererCustomStyles,
  });

  return (
    <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles}>
      <ECharts {...echartsProps} />
    </div>
  );
};

export default BaseStackedBarChart;
