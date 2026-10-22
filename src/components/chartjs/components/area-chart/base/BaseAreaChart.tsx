/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useAreaChart } from '../hooks/useAreaChart';

import { useStyles } from './BaseAreaChart.styles';
import type { BaseAreaChartProps } from './BaseAreaChart.types';

export const BaseAreaChart = ({
  data,
  labels,
  colors,
  options,
  appearance = 'smooth',
  effect,
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'area-chart-test-id',
}: BaseAreaChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, areaOptions, plugins, wrapperProps, isReady } = useAreaChart(
    compactObject({
      data,
      labels,
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

  const wrapperStyles = [styles.wrapper, customStyles?.wrapper, rendererCustomStyles?.container];

  if (!isReady) {
    return <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles} />;
  }

  const chartjsProps: ChartjsProps = compactObject({
    type: 'line' as const,
    data: processedData,
    options: areaOptions,
    plugins,
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

export default BaseAreaChart;
