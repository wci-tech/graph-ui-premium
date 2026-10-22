import type { EChartsEffectStyleModule } from './EChartsEffect.types';

const ElasticEChartsEffect: EChartsEffectStyleModule = {
  id: 'echarts.effect.elastic',

  resolve: () => ({
    options: {
      animation: true,

      animationDuration: 2400,

      animationDurationUpdate: 2000,

      animationEasing: 'elasticOut',

      animationEasingUpdate: 'elasticOut',
    },
  }),
};

export default ElasticEChartsEffect;
