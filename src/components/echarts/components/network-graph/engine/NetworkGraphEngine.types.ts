import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  NetworkGraphCustomStyles,
  NetworkGraphEffect,
  NetworkGraphProps,
} from '../NetworkGraph.types';

export type NetworkGraphRegistryKey = Exclude<NetworkGraphEffect, 'none'>;

export type NetworkGraphResolvedConfig = {
  readonly customStyles?: NetworkGraphCustomStyles;
  readonly options?: EChartsOption;
};

export type NetworkGraphRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<NetworkGraphProps>;