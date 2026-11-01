import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type {
  NetworkGraphCrosshair,
  NetworkGraphOptions,
} from '../NetworkGraph.types';

import { NETWORK_GRAPH_CONFIG } from './BaseNetworkGraph.constants';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') return `${height}px`;
  return height ?? `var(--network-graph-height, ${NETWORK_GRAPH_CONFIG.defaultHeight})`;
};

const getWrapperStyles = (theme: ITheme, options?: NetworkGraphOptions) => css`
  position: relative;
  width: 100%;
  min-width: 0;
  height: ${getHeight(options?.height)};
  background-color: ${options?.chartBackground ?? 'var(--network-graph-bg-color, transparent)'};
  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
`;

const getHorizontalCrosshairStyles = (top: number) => css`
  position: absolute;
  top: ${top}px;
  right: 0;
  left: 0;
  z-index: 10;
  border-top: ${NETWORK_GRAPH_CONFIG.crosshairWidth}px dashed var(--wci-chart-axis-line);
  pointer-events: none;
`;

const getVerticalCrosshairStyles = (left: number) => css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${left}px;
  z-index: 10;
  border-left: ${NETWORK_GRAPH_CONFIG.crosshairWidth}px dashed var(--wci-chart-axis-line);
  pointer-events: none;
`;

export const useStyles = (
  options: NetworkGraphOptions | undefined,
  crosshair: NetworkGraphCrosshair,
) => {
  const { theme } = useTheme();
  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
      horizontalCrosshair: getHorizontalCrosshairStyles(crosshair.y),
      verticalCrosshair: getVerticalCrosshairStyles(crosshair.x),
    }),
    [theme, options, crosshair.x, crosshair.y],
  );
};