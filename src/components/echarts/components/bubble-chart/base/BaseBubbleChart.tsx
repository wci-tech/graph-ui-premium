/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useBubbleChart } from '../hooks/useBubbleChart';

import type { BaseBubbleChartProps } from './BaseBubbleChart.types';

const BaseBubbleChart = ({
  data,
  series,
  colors,
  sizeMultiplier,
  options,
  chartId,
  effect = 'none',
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'echarts-bubble-chart-test-id',
}: BaseBubbleChartProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useBubbleChart(
    compactObject({
      data,
      series,
      colors,
      sizeMultiplier,
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
          key={`${chartId ?? 'bubble'}-${effect}`}
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

export default BaseBubbleChart;
