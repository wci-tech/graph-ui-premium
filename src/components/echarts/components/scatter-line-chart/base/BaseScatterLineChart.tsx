/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useScatterLineChart } from '../hooks/useScatterLineChart';

import type { BaseScatterLineChartProps } from './BaseScatterLineChart.types';

const BaseScatterLineChart = ({
  data,
  colors,
  options,
  chartId,
  appearance = 'smooth',
  effect = 'none',
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'echarts-scatter-line-chart-test-id',
}: BaseScatterLineChartProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useScatterLineChart(
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

  const wrapperStyles = [customStyles?.wrapper, rendererCustomStyles?.container];

  return (
    <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles}>
      {isReady && chartOptions ? (
        <ECharts
          key={`${chartId ?? 'scatter-line'}-${effect}-${appearance}`}
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

export default BaseScatterLineChart;
