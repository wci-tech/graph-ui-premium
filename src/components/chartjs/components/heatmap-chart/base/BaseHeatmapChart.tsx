/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useHeatmapChart } from '../hooks/useHeatmapChart';

import { useStyles } from './BaseHeatmapChart.styles';
import type { BaseHeatmapChartProps } from './BaseHeatmapChart.types';

export const BaseHeatmapChart = ({
  data,
  xLabels,
  yLabels,
  colors,
  options,
  effect,
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'heatmap-chart-test-id',
}: BaseHeatmapChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, heatmapOptions, plugins, wrapperProps, isReady } =
    useHeatmapChart(
      compactObject({
        data,
        xLabels,
        yLabels,
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
    type: 'matrix' as const,
    data: processedData,
    options: heatmapOptions,
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

export default BaseHeatmapChart;
