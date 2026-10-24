/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useBarChart } from '../hooks/useBarChart';

import type { BaseBarChartProps } from './BaseBarChart.types';

const BaseBarChart = ({
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
  testId = 'echarts-bar-chart-test-id',
}: BaseBarChartProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useBarChart(
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

  const horizontal = options?.horizontal ?? false;

  const wrapperStyles = [customStyles?.wrapper, rendererCustomStyles?.container];

  return (
    <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles}>
      {isReady && chartOptions ? (
        <ECharts
          key={`${chartId ?? 'bar'}-${effect}-${horizontal}`}
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

export default BaseBarChart;
