/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useRadarChart } from '../hooks/useRadarChart';

import type { BaseRadarChartProps } from './BaseRadarChart.types';

const BaseRadarChart = ({
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
  testId = 'echarts-radar-chart-test-id',
}: BaseRadarChartProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useRadarChart(
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
        <div css={customStyles?.chart}>
          <ECharts
            key={`${chartId ?? 'radar'}-${effect}`}
            {...compactObject({
              chartId,
              options: chartOptions,
              showDownload,
              downloadPlacement,
              customStyles: rendererCustomStyles,
            })}
          />
        </div>
      ) : null}
    </div>
  );
};

export default BaseRadarChart;
