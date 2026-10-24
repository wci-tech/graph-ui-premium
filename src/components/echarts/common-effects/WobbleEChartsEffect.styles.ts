import type { EChartsEffectStyleModule } from './EChartsEffect.types';

const WobbleEChartsEffect: EChartsEffectStyleModule = {
  id: 'echarts.effect.wobble',

  resolve: () => ({
    options: {
      animation: true,

      animationDuration: 1800,

      animationDurationUpdate: 1800,

      animationEasing: 'backOut',

      animationEasingUpdate: 'backOut',
    },
  }),
};

export default WobbleEChartsEffect;
