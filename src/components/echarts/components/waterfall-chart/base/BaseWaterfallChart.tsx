/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useWaterfallChart } from '../hooks/useWaterfallChart';

import type { BaseWaterfallChartProps } from './BaseWaterfallChart.types';

const BaseWaterfallChart = ({
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
  testId = 'echarts-waterfall-chart-test-id',
}: BaseWaterfallChartProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useWaterfallChart(
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

  const wrapperStyles = [
    customStyles?.wrapper,
    customStyles?.chart,
    rendererCustomStyles?.container,
  ];

  return (
    <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles}>
      {isReady && chartOptions ? (
        <ECharts
          key={`${chartId ?? 'waterfall'}-${effect}`}
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

export default BaseWaterfallChart;
