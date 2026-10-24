/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useAreaChart } from '../hooks/useAreaChart';

import type { BaseAreaChartProps } from './BaseAreaChart.types';

const BaseAreaChart = ({
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
  testId = 'echarts-area-chart-test-id',
}: BaseAreaChartProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useAreaChart(
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
          key={`${chartId ?? 'area'}-${effect}-${appearance}`}
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

export default BaseAreaChart;
