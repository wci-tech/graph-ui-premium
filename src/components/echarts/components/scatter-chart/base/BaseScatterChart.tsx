/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useScatterChart } from '../hooks/useScatterChart';

import type { BaseScatterChartProps } from './BaseScatterChart.types';

const DEFAULT_SCATTER_CHART_ID = 'echarts-scatter-chart';

const BaseScatterChart = ({
  data,
  colors,
  options,
  chartId = DEFAULT_SCATTER_CHART_ID,
  effect = 'none',
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'echarts-scatter-chart-test-id',
}: BaseScatterChartProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useScatterChart(
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
      {...wrapperProps}
      css={[customStyles?.wrapper, rendererCustomStyles?.container]}
    >
      <div css={customStyles?.chart}>{isReady ? <ECharts {...eChartsProps} /> : null}</div>
    </div>
  );
};

export default BaseScatterChart;
