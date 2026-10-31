/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useStackedAreaChart } from '../hooks/useStackedAreaChart';

import { useStyles } from './BaseStackedAreaChart.styles';
import type { BaseStackedAreaChartProps } from './BaseStackedAreaChart.types';

export const BaseStackedAreaChart = ({
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
  testId = 'stacked-area-chart-test-id',
}: BaseStackedAreaChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, stackedAreaOptions, plugins, wrapperProps, isReady } =
    useStackedAreaChart(
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
    options: stackedAreaOptions,
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

export default BaseStackedAreaChart;
