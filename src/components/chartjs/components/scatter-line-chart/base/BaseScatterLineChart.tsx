/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useScatterLineChart } from '../hooks/useScatterLineChart';

import { useStyles } from './BaseScatterLineChart.styles';
import type { BaseScatterLineChartProps } from './BaseScatterLineChart.types';

export const BaseScatterLineChart = ({
  data,
  colors,
  options,
  appearance = 'smooth',
  effect,
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'scatter-line-chart-test-id',
}: BaseScatterLineChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, scatterLineOptions, plugins, wrapperProps, isReady } =
    useScatterLineChart(
      compactObject({
        data,
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
    type: 'scatter' as const,
    data: processedData,
    options: scatterLineOptions,
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

export default BaseScatterLineChart;
