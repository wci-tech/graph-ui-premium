/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useStackedAreaChart } from '../hooks/useStackedAreaChart';

import type { BaseStackedAreaChartProps } from './BaseStackedAreaChart.types';

const BaseStackedAreaChart = ({
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
  testId = 'echarts-stacked-area-chart-test-id',
}: BaseStackedAreaChartProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useStackedAreaChart(
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
          key={`${chartId ?? 'stacked-area'}-${effect}-${appearance}`}
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

export default BaseStackedAreaChart;
