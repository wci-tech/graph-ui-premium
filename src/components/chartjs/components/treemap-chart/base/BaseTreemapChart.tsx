/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { registerTreemapChart } from '../engine/registerTreemapChart';
import { useTreemapChart } from '../hooks/useTreemapChart';

import { useStyles } from './BaseTreemapChart.styles';
import type { BaseTreemapChartProps } from './BaseTreemapChart.types';

registerTreemapChart();

export const BaseTreemapChart = ({
  data,
  colors,
  options,
  effect,
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'treemap-chart-test-id',
}: BaseTreemapChartProps) => {
  const styles = useStyles(options);
  const { wrapperRef, processedData, treemapOptions, wrapperProps, isReady } = useTreemapChart(
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

  if (!isReady) return <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles} />;

  const chartjsProps: ChartjsProps = compactObject({
    type: 'treemap' as const,
    data: processedData,
    options: treemapOptions,
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

export default BaseTreemapChart;
