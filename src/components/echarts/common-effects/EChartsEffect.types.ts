import type { StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

export type EChartsEffect =
  | 'none'
  | 'bounce'
  | 'wobble'
  | 'elastic'
  | 'progressive-trace'
  | 'elastic-glide'
  | 'staggered-reveal';

export type EChartsEffectResolvedConfig = {
  readonly customStyles?: {
    readonly wrapper?: StyleType;
    readonly chart?: StyleType;
  };

  readonly options?: Partial<EChartsOption>;
};

export type EChartsEffectStyleModule = {
  readonly id: string;

  readonly resolve: () => EChartsEffectResolvedConfig | undefined;
};
