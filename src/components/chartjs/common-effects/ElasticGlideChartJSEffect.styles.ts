import type { ChartJSEffectStyleModule } from './ChartJSEffect.types';

const ElasticGlideChartJSEffect: ChartJSEffectStyleModule = {
  id: 'chartjs.effect.elastic-glide',

  resolve: () => ({
    options: {
      animation: {
        duration: 2200,
        easing: 'easeInOutElastic',
      },
    },
  }),
};

export default ElasticGlideChartJSEffect;
