/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { DownloadPlacement } from '@/engines/engine.types';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  return height ?? 'var(--chart-height, 400px)';
};

const getContainerStyles = () => css`
  position: relative;
  width: 100%;
  min-width: 0;
`;

const getWrapperStyles = (height?: number | string) => {
  const resolvedHeight = getHeight(height);

  return css`
    position: relative;
    display: block;
    width: 100%;
    height: ${resolvedHeight};
    min-height: ${resolvedHeight};
    max-height: ${resolvedHeight};
    overflow: hidden;
  `;
};

const getCanvasWrapperStyles = () => css`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  line-height: 0;
`;

const getCanvasStyles = () => css`
  display: block;
  width: 100% !important;
  height: 100% !important;
`;

const getDownloadWrapperStyles = (theme: ITheme, placement: DownloadPlacement) => {
  const horizontalOffset = theme.spacing.get(10);
  const verticalOffset = theme.spacing.get(-20);

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

const getDownloadMenuStyles = (theme: ITheme) => css`
  background: var(--chart-download-menu-bg, ${theme.colors.commonColors.white});

  border: ${theme.border.width.thin} solid var(--chart-download-menu-border, var(----wci-gray-400));
`;

const getLabelWrapperStyles = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.get(8)};
`;

export const useStyles = () => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      container: getContainerStyles(),

      wrapper: (height?: number | string) => getWrapperStyles(height),

      canvasWrapper: getCanvasWrapperStyles(),

      canvas: getCanvasStyles(),

      downloadWrapper: (placement: DownloadPlacement) => getDownloadWrapperStyles(theme, placement),

      downloadTrigger: getDownloadTriggerStyles(),

      downloadMenu: getDownloadMenuStyles(theme),

      labelWrapper: getLabelWrapperStyles(theme),
    }),
    [theme],
  );
};
