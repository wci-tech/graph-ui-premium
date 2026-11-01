/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useStackedBarChart } from '../hooks/useStackedBarChart';

import { useStyles } from './BaseStackedBarChart.styles';
import type { BaseStackedBarChartProps } from './BaseStackedBarChart.types';

export const BaseStackedBarChart = ({
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
  testId = 'stacked-bar-chart-test-id',
}: BaseStackedBarChartProps) => {
  const styles = useStyles(options);
  const { wrapperRef, processedData, stackedBarOptions, wrapperProps, isReady } =
    useStackedBarChart(
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
    options: stackedBarOptions,
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

export default BaseStackedBarChart;
