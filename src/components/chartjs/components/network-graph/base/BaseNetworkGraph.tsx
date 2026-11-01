/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { registerNetworkGraphChart } from '../engine/registerNetworkGraphChart';
import { useNetworkGraph } from '../hooks/useNetworkGraph';

import { useStyles } from './BaseNetworkGraph.styles';
import type { BaseNetworkGraphProps } from './BaseNetworkGraph.types';

registerNetworkGraphChart();

export const BaseNetworkGraph = ({
  data,
  colors,
  options,
  effect,
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'network-graph-test-id',
}: BaseNetworkGraphProps) => {
  const styles = useStyles(options);
  const { wrapperRef, processedData, networkOptions, plugins, wrapperProps, isReady } =
    useNetworkGraph(
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
    type: 'forceDirectedGraph' as const,
    data: processedData,
    options: networkOptions,
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

export default BaseNetworkGraph;
