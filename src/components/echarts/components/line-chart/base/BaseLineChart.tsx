/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useLineChart } from '../hooks/useLineChart';

import type { BaseLineChartProps } from './BaseLineChart.types';

const BaseLineChart = ({
  data,
  colors,
  options,
  chartId,
  appearance = 'solid',
  effect = 'none',
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'echarts-line-chart-test-id',
}: BaseLineChartProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useLineChart(
    compactObject({
      data,
      colors,
      options,
      appearance,
      effect,
      customStyles,
      rendererCustomStyles,
      className,
      testId,
    }),
  );

  return (
    <div
      ref={wrapperRef}
      {...wrapperProps}
      css={[customStyles?.wrapper, customStyles?.chart, rendererCustomStyles?.container]}
    >
      {isReady && chartOptions ? (
        <ECharts
          key={`${chartId ?? 'line'}-${effect}-${appearance}`}
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

export default BaseLineChart;
