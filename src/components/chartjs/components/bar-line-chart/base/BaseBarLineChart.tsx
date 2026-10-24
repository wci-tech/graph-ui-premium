/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useBarLineChart } from '../hooks/useBarLineChart';

import { useStyles } from './BaseBarLineChart.styles';
import type { BaseBarLineChartProps } from './BaseBarLineChart.types';

export const BaseBarLineChart = ({
  data,
  labels,
  colors,
  options,
  appearance = 'smooth',
  effect,
  showTrendPoints = true,

  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,

  customStyles,
  className,
  testId = 'bar-line-chart-test-id',
}: BaseBarLineChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, barLineOptions, plugins, wrapperProps, isReady } =
    useBarLineChart(
      compactObject({
        data,
        labels,
        colors,
        options,
        appearance,
        effect,
        showTrendPoints,
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

    options: barLineOptions,

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

export default BaseBarLineChart;
