/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { registerFunnelChart } from '../engine/registerFunnelChart';
import { useFunnelChart } from '../hooks/useFunnelChart';

import { useStyles } from './BaseFunnelChart.styles';
import type { BaseFunnelChartProps } from './BaseFunnelChart.types';

registerFunnelChart();

export const BaseFunnelChart = ({
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
  testId = 'funnel-chart-test-id',
}: BaseFunnelChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, funnelOptions, plugins, wrapperProps, isReady } =
    useFunnelChart(
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
    type: 'funnel' as const,
    data: processedData,
    options: funnelOptions,
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

export default BaseFunnelChart;
