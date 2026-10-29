/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseGaugeMeter from '../base/BaseGaugeMeter';
import type {
  GaugeMeterCustomStyles,
  GaugeMeterOptions,
  GaugeMeterProps,
} from '../GaugeMeter.types';

import { resolveGaugeMeterEffect } from './gaugeMeterResolveEffect';

export const GaugeMeterEngine = (props: GaugeMeterProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveGaugeMeterEffect(effect);

  const mergedStyles = useMemo<GaugeMeterCustomStyles>(
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

  const mergedOptions = useMemo<GaugeMeterOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseGaugeMeter {...rest} effect={effect} options={mergedOptions} customStyles={mergedStyles} />
  );
};

export default GaugeMeterEngine;
