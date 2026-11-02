/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useWaterfallChart } from '../hooks/useWaterfallChart';

import { useStyles } from './BaseWaterfallChart.styles';
import type { BaseWaterfallChartProps } from './BaseWaterfallChart.types';

export const BaseWaterfallChart = ({
  labels,
  data,
  colors,
  options,
  effect,
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'waterfall-chart-test-id',
}: BaseWaterfallChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, waterfallOptions, wrapperProps, isReady } = useWaterfallChart(
    compactObject({
      labels,
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

  const wrapperStyles = [styles.wrapper, customStyles?.wrapper, rendererCustomStyles?.container];

  if (!isReady) {
    return <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles} />;
  }

  const chartjsProps: ChartjsProps = compactObject({
    type: 'bar' as const,
    data: processedData,
    options: waterfallOptions,
    showDownload,
    downloadPlacement,
    customStyles: rendererCustomStyles,
  });

  return (
    <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles}>
      <Chartjs {...chartjsProps} />
    </div>
  );
};

export default BaseWaterfallChart;
