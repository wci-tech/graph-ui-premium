/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseGaugeMeter from '../base/BaseGaugeMeter';
import type {
  GaugeMeterCustomStyles,
  GaugeMeterOptions,
  GaugeMeterProps,
} from '../GaugeMeter.types';

import { resolveGaugeMeterEffect } from './gaugeMeterResolveEffect';

export const GaugeMeterEngine = (props: GaugeMeterProps) => {
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

  const effectConfig = resolveGaugeMeterEffect(effect);

  const mergedStyles = useMemo<GaugeMeterCustomStyles>(
    () => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),

      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),

      score: css(customStyles?.score),

      scoreValue: css(customStyles?.scoreValue),

      scoreLabel: css(customStyles?.scoreLabel),
    }),
    [effectConfig?.customStyles, customStyles],
  );

  const mergedOptions = useMemo<GaugeMeterOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,

      animation: {
        ...effectConfig?.options?.animation,

        ...options?.animation,
      },
    }),
    [effectConfig?.options, options],
  );

  const baseGaugeMeterProps = compactObject({
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

  return <BaseGaugeMeter {...baseGaugeMeterProps} />;
};

export default GaugeMeterEngine;
