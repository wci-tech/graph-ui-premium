import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '../../../common-effects';
import type {
  GaugeMeterCustomStyles,
  GaugeMeterEffect,
  GaugeMeterOptions,
  GaugeMeterProps,
} from '../GaugeMeter.types';

export type GaugeMeterRegistryKey =
  Exclude<
    GaugeMeterEffect,
    'none'
  >;

export type GaugeMeterResolvedConfig = {
  readonly customStyles?: GaugeMeterCustomStyles;
  readonly options?: Partial<GaugeMeterOptions>;
};

export type GaugeMeterRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<GaugeMeterProps>;