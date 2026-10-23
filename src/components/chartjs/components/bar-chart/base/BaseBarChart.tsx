/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useBarChart } from '../hooks/useBarChart';

import { useStyles } from './BaseBarChart.styles';
import type { BaseBarChartProps } from './BaseBarChart.types';

export const BaseBarChart = ({
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
  testId = 'bar-chart-test-id',
}: BaseBarChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, barOptions, wrapperProps, isReady } = useBarChart(
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
    type: 'bar' as const,

    data: processedData,

    options: barOptions,

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

export default BaseBarChart;
