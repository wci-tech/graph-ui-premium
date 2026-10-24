import type { EChartsEffectStyleModule } from './EChartsEffect.types';

const BounceEChartsEffect: EChartsEffectStyleModule = {
  id: 'echarts.effect.bounce',

  resolve: () => ({
    options: {
      animation: true,

      animationDuration: 2500,

      animationDurationUpdate: 2000,

      animationEasing: 'bounceOut',

      animationEasingUpdate: 'bounceOut',
    },
  }),
};

export default BounceEChartsEffect;
