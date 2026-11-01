/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseNetworkGraph from '../base/BaseNetworkGraph';
import type {
  NetworkGraphCustomStyles,
  NetworkGraphOptions,
  NetworkGraphProps,
} from '../NetworkGraph.types';

import { resolveNetworkGraphEffect } from './networkGraphResolveEffect';

export const NetworkGraphEngine = (props: NetworkGraphProps) => {
  const {
    effect = 'none',
    options,
    customStyles,
    rendererCustomStyles,
    showDownload,
    downloadPlacement,
    className,
    testId,
    ...rest
  } = props;
  const effectConfig = resolveNetworkGraphEffect(effect);
  const mergedStyles = useMemo(
    (): NetworkGraphCustomStyles => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );
  const mergedOptions = useMemo<NetworkGraphOptions>(
    () => ({
      ...options,
      ...effectConfig?.options,
      animation: {
        ...options?.animation,
        ...effectConfig?.options?.animation,
      },
    }),
    [options, effectConfig?.options],
  );
  const baseNetworkGraphProps = compactObject({
    ...rest,
    effect,
    options: mergedOptions,
    customStyles: mergedStyles,
    rendererCustomStyles,
    showDownload,
    downloadPlacement,
    className,
    testId,
  });
  return <BaseNetworkGraph {...baseNetworkGraphProps} />;
};

export default NetworkGraphEngine;
