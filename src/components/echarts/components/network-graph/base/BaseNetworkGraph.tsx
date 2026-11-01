/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useNetworkGraph } from '../hooks/useNetworkGraph';

import { useStyles } from './BaseNetworkGraph.styles';
import type { BaseNetworkGraphProps } from './BaseNetworkGraph.types';

const BaseNetworkGraph = ({
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
  testId = 'echarts-network-graph-test-id',
}: BaseNetworkGraphProps) => {
  const {
    wrapperRef,
    chartOptions,
    wrapperProps,
    crosshair,
    handlePointerMove,
    handlePointerLeave,
    isReady,
  } = useNetworkGraph(
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

  const styles = useStyles(options, crosshair);
  const wrapperStyles = [styles.wrapper, customStyles?.wrapper, rendererCustomStyles?.container];

  return (
    <div
      ref={wrapperRef}
      {...wrapperProps}
      css={wrapperStyles}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {isReady && chartOptions ? (
        <div css={customStyles?.chart}>
          <ECharts
            key={`${chartId ?? 'network'}-${effect}`}
            {...compactObject({
              chartId,
              options: chartOptions,
              showDownload,
              downloadPlacement,
              customStyles: rendererCustomStyles,
            })}
          />
        </div>
      ) : null}
      {options?.crosshair === true && crosshair.visible ? (
        <>
          <div css={styles.horizontalCrosshair} />
          <div css={styles.verticalCrosshair} />
        </>
      ) : null}
    </div>
  );
};

export default BaseNetworkGraph;
