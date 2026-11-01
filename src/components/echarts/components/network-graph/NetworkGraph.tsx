/** @jsxImportSource @emotion/react */

import NetworkGraphEngine from './engine/NetworkGraphEngine';
import type { NetworkGraphProps } from './NetworkGraph.types';

export const NetworkGraph = (props: NetworkGraphProps) => {
  return <NetworkGraphEngine {...props} />;
};

export default NetworkGraph;
