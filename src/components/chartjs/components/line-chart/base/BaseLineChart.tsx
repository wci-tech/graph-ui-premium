/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useLineChart } from '../hooks/useLineChart';

import { useStyles } from './BaseLineChart.styles';
import type { BaseLineChartProps } from './BaseLineChart.types';

export const BaseLineChart = ({
  data,
  labels,
  colors,
  options,
  appearance = 'solid',
  effect,
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'line-chart-test-id',
}: BaseLineChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, lineOptions, plugins, wrapperProps, isReady } = useLineChart(
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
    options: lineOptions,
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

export default BaseLineChart;
