import type { ChartJSEffectStyleModule } from './ChartJSEffect.types';

const ElasticChartJSEffect: ChartJSEffectStyleModule = {
  id: 'chartjs.effect.elastic',

  resolve: () => ({
    options: {
      animation: {
        duration: 2200,
        easing: 'easeOutElastic',
      },
    },
  }),
};

export default ElasticChartJSEffect;
