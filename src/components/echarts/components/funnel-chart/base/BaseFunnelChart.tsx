/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';
import type { EChartsProps } from '@/components/echarts/ECharts.types';

import { useFunnelChart } from '../hooks/useFunnelChart';

import { DEFAULT_FUNNEL_CHART_ID } from './BaseFunnelChart.constants';
import { useStyles } from './BaseFunnelChart.styles';
import type { BaseFunnelChartProps } from './BaseFunnelChart.types';

const BaseFunnelChart = ({
  data,
  colors,
  options,
  chartId = DEFAULT_FUNNEL_CHART_ID,
  effect = 'none',
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'echarts-funnel-chart-test-id',
}: BaseFunnelChartProps) => {
  const {
    wrapperRef,
    definition,
    chartOptions,
    wrapperProps,
    crosshair,
    crosshairEnabled,
    handlePointerMove,
    handlePointerLeave,
    isReady,
  } = useFunnelChart(
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

  const styles = useStyles(crosshair, definition?.funnelChartColors.axisText);

  const wrapperStyles = [styles.wrapper, customStyles?.wrapper, rendererCustomStyles?.container];

  if (!isReady) {
    return <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles} />;
  }

  const echartsProps: EChartsProps = compactObject({
    chartId,
    options: chartOptions,
    showDownload,
    downloadPlacement,
    customStyles: rendererCustomStyles,
  });

  return (
    <div
      ref={wrapperRef}
      {...wrapperProps}
      css={wrapperStyles}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <ECharts key={`${chartId}-${effect}`} {...echartsProps} />
      {crosshairEnabled && crosshair.visible ? (
        <>
          <div css={styles.horizontalCrosshair} />
          <div css={styles.verticalCrosshair} />
        </>
      ) : null}
    </div>
  );
};

export default BaseFunnelChart;
