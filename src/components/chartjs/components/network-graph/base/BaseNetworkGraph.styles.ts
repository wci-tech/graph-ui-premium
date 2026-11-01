import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { NetworkGraphOptions } from '../NetworkGraph.types';

import { NETWORK_GRAPH_CONFIG } from './BaseNetworkGraph.constants';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }
  return height ?? `var(--network-graph-height, ${NETWORK_GRAPH_CONFIG.defaultHeight})`;
};

const getWrapperStyles = (theme: ITheme, options?: NetworkGraphOptions) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  background-color: ${options?.chartBackground ?? 'var(--network-graph-bg-color, transparent)'};
  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
`;

export const useStyles = (options?: NetworkGraphOptions) => {
  const { theme } = useTheme();
  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};