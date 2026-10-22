import type { EChartsEffectStyleModule } from './EChartsEffect.types';

const ProgressiveTraceEChartsEffect: EChartsEffectStyleModule = {
  id: 'echarts.effect.progressive-trace',

  resolve: () => ({
    options: {
      animation: true,

      animationDuration: 2400,

      animationDurationUpdate: 1800,

      animationEasing: 'linear',

      animationEasingUpdate: 'linear',
    },
  }),
};

export default ProgressiveTraceEChartsEffect;
