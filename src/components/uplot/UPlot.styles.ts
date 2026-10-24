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

  return height ?? 'var(--uplot-height, 400px)';
};

const getRootStyles = () => css`
  position: relative;
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
    overflow: hidden;
  `;
};

const getChartStyles = () => css`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: var(--uplot-min-height, 150px);
  overflow: hidden;

  .uplot {
    width: 100% !important;
    height: 100% !important;
  }
`;

const getDownloadWrapperStyles = (theme: ITheme, placement: DownloadPlacement) => {
  const verticalOffset = theme.spacing.get(8);
  const horizontalOffset = theme.spacing.get(20);

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

const getHoverInfoStyles = (theme: ITheme) => css`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.get(20)};
  margin-top: ${theme.spacing.get(16)};
  padding: ${theme.spacing.get(10)};
  font-size: ${theme.fonts.size.sm};

  border-top: ${theme.border.width.thin} solid
    var(--uplot-hover-border-color, ${theme.colors.grayShades[400]});

  color: var(--uplot-hover-text-color, ${theme.colors.commonColors.black});
`;

const getHoverSeriesStyles = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.get(8)};
`;

const getHoverMarkerStyles = (color: string) => css`
  width: 12px;
  height: 12px;
  border: 2px solid ${color};
  border-radius: 50%;
`;

export const useStyles = (height?: number | string) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      root: getRootStyles(),

      chartWrapper: getChartWrapperStyles(height),

      chart: getChartStyles(),

      downloadWrapper: (placement: DownloadPlacement) => getDownloadWrapperStyles(theme, placement),

      downloadTrigger: getDownloadTriggerStyles(),

      labelWrapper: getLabelWrapperStyles(theme),

      downloadMenu: getDownloadMenuStyles(theme),

      hoverInfo: getHoverInfoStyles(theme),

      hoverSeries: getHoverSeriesStyles(theme),

      hoverMarker: getHoverMarkerStyles,
    }),
    [theme, height],
  );
};
