import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { GaugeMeterOptions } from '../GaugeMeter.types';

import { GAUGE_METER_CONFIG } from './BaseGaugeMeter.constants';

const getHeight = (
  height?: number | string,
): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  return height ?? 'var(--gauge-meter-height, 420px)';
};

const getWrapperStyles = (
  theme: ITheme,
  options?: GaugeMeterOptions,
) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  overflow: hidden;
  background-color: var(--gauge-meter-bg-color, transparent);
  border-radius: ${options?.isBoxVisible === false
    ? 0
    : theme.border.radius.lg};
`;

const chart = css`
  width: 100%;
  height: 100%;
`;

const score = css`
  position: absolute;
  bottom: ${GAUGE_METER_CONFIG.scoreBottom}px;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  text-align: center;
  pointer-events: none;
`;

const getScoreValueStyles = (
  boldScore: boolean,
) => css`
  margin-bottom: ${GAUGE_METER_CONFIG.scoreMarginBottom}px;
  font-size: ${GAUGE_METER_CONFIG.scoreFontSize}px;
  font-weight: ${boldScore ? 800 : 400};
  line-height: 1;
`;

const scoreLabel = css`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2;
`;

export const useStyles = (
  options?: GaugeMeterOptions,
) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(
        theme,
        options,
      ),

      chart,

      score,

      scoreValue: getScoreValueStyles(
        options?.boldScore ?? true,
      ),

      scoreLabel,
    }),
    [theme, options],
  );
};