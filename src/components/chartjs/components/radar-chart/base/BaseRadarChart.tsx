/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useRadarChart } from '../hooks/useRadarChart';

import { useStyles } from './BaseRadarChart.styles';
import type { BaseRadarChartProps } from './BaseRadarChart.types';

export const BaseRadarChart = ({
  data,
  labels,
  colors,
  options,
  effect,
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'radar-chart-test-id',
}: BaseRadarChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, radarOptions, plugins, wrapperProps, isReady } = useRadarChart(
    compactObject({
      data,
      labels,
      colors,
      options,
      effect,
      customStyles,
      rendererCustomStyles,
      className,
      testId,
    }),
  );

  const wrapperStyles = [styles.wrapper, customStyles?.wrapper, rendererCustomStyles?.container];

  if (!isReady) {
    return <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles} />;
  }

  const chartjsProps: ChartjsProps = compactObject({
    type: 'radar' as const,
    data: processedData,
    options: radarOptions,
    plugins,
    showDownload,
    downloadPlacement,
    customStyles: rendererCustomStyles,
  });

  return (
    <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles}>
      <div css={customStyles?.chart}>
        <Chartjs {...chartjsProps} />
      </div>
    </div>
  );
};

export default BaseRadarChart;
