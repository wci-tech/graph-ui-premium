/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useDoughnutChart } from '../hooks/useDoughnutChart';

import { useStyles } from './BaseDoughnutChart.styles';
import type { BaseDoughnutChartProps } from './BaseDoughnutChart.types';

export const BaseDoughnutChart = ({
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
  testId = 'doughnut-chart-test-id',
}: BaseDoughnutChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, doughnutOptions, wrapperProps, isReady } = useDoughnutChart(
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
    type: 'doughnut' as const,
    data: processedData,
    options: doughnutOptions,
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

export default BaseDoughnutChart;
