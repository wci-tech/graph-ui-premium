import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  NetworkGraphCustomStyles,
  NetworkGraphEffect,
  NetworkGraphOptions,
  NetworkGraphProps,
} from '../NetworkGraph.types';

export type NetworkGraphRegistryKey = Exclude<NetworkGraphEffect, 'none'>;

export type NetworkGraphResolvedConfig = {
  readonly customStyles?: NetworkGraphCustomStyles;
  readonly options?: Partial<NetworkGraphOptions>;
};

export type NetworkGraphRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<NetworkGraphProps>;