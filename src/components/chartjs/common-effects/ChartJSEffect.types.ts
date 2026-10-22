import type { StyleType } from '@wci-tech/core-ui-premium';

import type { ChartJSOptions } from '../ChartJS.types';

export type ChartJSEffect =
  | 'none'
  | 'bounce'
  | 'wobble'
  | 'elastic'
  | 'progressive-trace'
  | 'elastic-glide'
  | 'staggered-reveal';

export type ChartJSEffectResolvedConfig = {
  readonly customStyles?: {
    readonly wrapper?: StyleType;
    readonly chart?: StyleType;
  };
  readonly options?: Partial<ChartJSOptions>;
};

export type ChartJSEffectStyleModule = {
  readonly id: string;
  readonly resolve: () => ChartJSEffectResolvedConfig | undefined;
};
