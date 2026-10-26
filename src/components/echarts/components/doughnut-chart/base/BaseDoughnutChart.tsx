/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useDoughnutChart } from '../hooks/useDoughnutChart';

import type { BaseDoughnutChartProps } from './BaseDoughnutChart.types';

const BaseDoughnutChart = ({
  data,
  colors,
  options,
  chartId,
  effect = 'none',
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'echarts-doughnut-chart-test-id',
}: BaseDoughnutChartProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useDoughnutChart(
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
  const wrapperStyles = [customStyles?.wrapper, rendererCustomStyles?.container];
  return (
    <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles}>
      {isReady && chartOptions ? (
        <ECharts
          key={`${chartId ?? 'doughnut'}-${effect}`}
          {...compactObject({
            chartId,
            options: chartOptions,
            showDownload,
            downloadPlacement,
            customStyles: rendererCustomStyles,
          })}
        />
      ) : null}
    </div>
  );
};

export default BaseDoughnutChart;
