/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useBarLineChart } from '../hooks/useBarLineChart';

import type { BaseBarLineChartProps } from './BaseBarLineChart.types';

const BaseBarLineChart = ({
  data,
  colors,
  options,
  chartId,
  appearance = 'smooth',
  effect = 'none',
  showTrendPoints = true,
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'echarts-bar-line-chart-test-id',
}: BaseBarLineChartProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useBarLineChart(
    compactObject({
      data,
      colors,
      options,
      appearance,
      effect,
      showTrendPoints,
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
          key={`${chartId ?? 'bar-line'}-${effect}-${appearance}`}
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

export default BaseBarLineChart;
