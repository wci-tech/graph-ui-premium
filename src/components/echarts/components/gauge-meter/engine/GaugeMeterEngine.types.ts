import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  GaugeMeterCustomStyles,
  GaugeMeterEffect,
  GaugeMeterProps,
} from '../GaugeMeter.types';

export type GaugeMeterRegistryKey =
  Exclude<GaugeMeterEffect, 'none'>;

export type GaugeMeterResolvedConfig = {
  readonly customStyles?: GaugeMeterCustomStyles;
  readonly options?: EChartsOption;
};

export type GaugeMeterRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<GaugeMeterProps>;