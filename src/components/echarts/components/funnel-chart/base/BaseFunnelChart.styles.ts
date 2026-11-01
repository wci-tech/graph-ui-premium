import { useMemo } from 'react';

import { css } from '@emotion/react';

import type { FunnelChartCrosshairPosition } from '../FunnelChart.types';

const getHorizontalCrosshairStyles = (
  top: number,
  color: string | undefined,
) => css`
  position: absolute;
  top: ${top}px;
  right: 0;
  left: 0;
  z-index: 10;
  border-top: 1px dashed ${color};
  pointer-events: none;
`;

const getVerticalCrosshairStyles = (
  left: number,
  color: string | undefined,
) => css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${left}px;
  z-index: 10;
  border-left: 1px dashed ${color};
  pointer-events: none;
`;

const getWrapperStyles = () => css`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const useStyles = (
  crosshair: FunnelChartCrosshairPosition,
  crosshairColor?: string,
) => {
  return useMemo(
    () => ({
      wrapper: getWrapperStyles(),
      horizontalCrosshair: getHorizontalCrosshairStyles(
        crosshair.y,
        crosshairColor,
      ),
      verticalCrosshair: getVerticalCrosshairStyles(
        crosshair.x,
        crosshairColor,
      ),
    }),
    [
      crosshair.x,
      crosshair.y,
      crosshairColor,
    ],
  );
};