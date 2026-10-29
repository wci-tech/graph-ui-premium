/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { usePieChart } from '../hooks/usePieChart';

import { useStyles } from './BasePieChart.styles';
import type { BasePieChartProps } from './BasePieChart.types';

const BasePieChart = ({
  data,
  colors,
  options,
  chartId,
  effect = 'none',
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'echarts-pie-chart-test-id',
}: BasePieChartProps) => {
  const styles = useStyles(options);

  const {
    wrapperRef,
    definition,
    chartOptions,
    wrapperProps,
    crosshairPosition,
    crosshairEnabled,
    handlePointerMove,
    handlePointerLeave,
    isReady,
  } = usePieChart(
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

  const crosshairColor = definition?.pieChartColors.crosshair;

  const crosshairStyles = useMemo(
    () =>
      crosshairColor
        ? styles.getCrosshairStyles({
            x: crosshairPosition.x,
            y: crosshairPosition.y,
            color: crosshairColor,
          })
        : undefined,
    [styles, crosshairColor, crosshairPosition.x, crosshairPosition.y],
  );

  return (
    <div
      ref={wrapperRef}
      {...wrapperProps}
      css={[styles.wrapper, customStyles?.wrapper, rendererCustomStyles?.container]}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {isReady && chartOptions ? (
        <ECharts
          key={`${chartId ?? 'pie'}-${effect}`}
          {...compactObject({
            chartId,
            options: chartOptions,
            showDownload,
            downloadPlacement,
            customStyles: rendererCustomStyles,
          })}
        />
      ) : null}

      {crosshairEnabled && crosshairPosition.visible && crosshairStyles ? (
        <>
          <div aria-hidden="true" css={crosshairStyles.horizontal} />
          <div aria-hidden="true" css={crosshairStyles.vertical} />
        </>
      ) : null}
    </div>
  );
};

export default BasePieChart;
