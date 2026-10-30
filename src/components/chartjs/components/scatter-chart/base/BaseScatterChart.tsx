/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useScatterChart } from '../hooks/useScatterChart';

import { useStyles } from './BaseScatterChart.styles';
import type { BaseScatterChartProps } from './BaseScatterChart.types';

export const BaseScatterChart = ({
  data,
  colors,
  options,
  effect,
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'scatter-chart-test-id',
}: BaseScatterChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, scatterOptions, plugins, wrapperProps, isReady } =
    useScatterChart(
      compactObject({
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
    type: 'scatter' as const,
    data: processedData,
    options: scatterOptions,
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

export default BaseScatterChart;
