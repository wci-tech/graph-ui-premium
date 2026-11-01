/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseNetworkGraph from '../base/BaseNetworkGraph';
import type {
  NetworkGraphCustomStyles,
  NetworkGraphOptions,
  NetworkGraphProps,
} from '../NetworkGraph.types';

import { resolveNetworkGraphEffect } from './networkGraphResolveEffect';

export const NetworkGraphEngine = (props: NetworkGraphProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;
  const effectConfig = resolveNetworkGraphEffect(effect);

  const mergedStyles = useMemo<NetworkGraphCustomStyles>(
    () => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [
      effectConfig?.customStyles?.wrapper,
      effectConfig?.customStyles?.chart,
      customStyles?.wrapper,
      customStyles?.chart,
    ],
  );

  const mergedOptions = useMemo<NetworkGraphOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseNetworkGraph
      {...rest}
      effect={effect}
      options={mergedOptions}
      customStyles={mergedStyles}
    />
  );
};

export default NetworkGraphEngine;
