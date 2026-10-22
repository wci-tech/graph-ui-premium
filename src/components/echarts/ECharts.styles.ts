/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { DownloadPlacement } from '@/engines/engine.types';

import { DEFAULT_ECHARTS_HEIGHT } from './utils/ECharts.constants';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  if (typeof height === 'string' && height.trim().length > 0) {
    return height;
  }

  return `var(--chart-height, ${DEFAULT_ECHARTS_HEIGHT}px)`;
};

const getRootStyles = () => css`
  position: relative;
  display: block;
  width: 100%;
  min-width: 0;
`;

const getChartWrapperStyles = (height?: number | string) => {
  const resolvedHeight = getHeight(height);

  return css`
    position: relative;
    display: block;
    width: 100%;
    min-width: 0;
    height: ${resolvedHeight};
    min-height: ${resolvedHeight};
    max-height: ${resolvedHeight};
    overflow: hidden;
  `;
};

const getChartStyles = () => css`
  position: relative;
  display: block;
  width: 100%;
  min-width: 0;
  height: 100% !important;
  min-height: 0;
`;

const getDownloadWrapperStyles = (theme: ITheme, placement: DownloadPlacement) => {
  const horizontalOffset = theme.spacing.get(10);
  const verticalOffset = theme.spacing.get(-50);

  return css`
    position: absolute;
    z-index: ${theme.zIndex.core.above};

    ${placement === 'top-left'
      ? css`
          top: ${verticalOffset};
          left: ${horizontalOffset};
        `
      : null}

    ${placement === 'top-right'
      ? css`
          top: ${verticalOffset};
          right: ${horizontalOffset};
        `
      : null}

    ${placement === 'bottom-left'
      ? css`
          bottom: ${verticalOffset};
          left: ${horizontalOffset};
        `
      : null}

    ${placement === 'bottom-right'
      ? css`
          right: ${horizontalOffset};
          bottom: ${verticalOffset};
        `
      : null}
  `;
};

const getDownloadTriggerStyles = () => css`
  cursor: pointer;
`;

const getLabelWrapperStyles = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.get(8)};
`;

const getDownloadMenuStyles = (theme: ITheme) => css`
  background: var(--chart-download-menu-bg, ${theme.colors.commonColors.white});

  border: ${theme.border.width.thin} solid var(--chart-download-menu-border, var(--wci-gray-400));
`;

export const useStyles = () => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      root: getRootStyles(),

      chartWrapper: (height?: number | string) => getChartWrapperStyles(height),

      chart: getChartStyles(),

      downloadWrapper: (placement: DownloadPlacement) => getDownloadWrapperStyles(theme, placement),

      downloadTrigger: getDownloadTriggerStyles(),

      labelWrapper: getLabelWrapperStyles(theme),

      downloadMenu: getDownloadMenuStyles(theme),
    }),
    [theme],
  );
};
