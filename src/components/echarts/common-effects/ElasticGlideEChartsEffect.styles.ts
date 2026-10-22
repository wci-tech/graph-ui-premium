import type { EChartsEffectStyleModule } from './EChartsEffect.types';

const ElasticGlideEChartsEffect: EChartsEffectStyleModule = {
  id: 'echarts.effect.elastic-glide',

  resolve: () => ({
    options: {
      animation: true,

      animationDuration: 2200,

      animationDurationUpdate: 2200,

      animationEasing: 'elasticOut',

      animationEasingUpdate: 'cubicInOut',
    },
  }),
};

export default ElasticGlideEChartsEffect;
