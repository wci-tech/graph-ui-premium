/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useCandlestickChart } from '../hooks/useCandlestickChart';

import { useStyles } from './BaseCandlestickChart.styles';
import type { BaseCandlestickChartProps } from './BaseCandlestickChart.types';

export const BaseCandlestickChart = ({
  data,
  colors,
  options,
  effect,
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'candlestick-chart-test-id',
}: BaseCandlestickChartProps) => {
  const styles = useStyles(options);

  const { wrapperRef, processedData, candlestickOptions, wrapperProps, isReady } =
    useCandlestickChart(
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
    type: 'candlestick' as const,
    data: processedData,
    options: candlestickOptions,
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

export default BaseCandlestickChart;
