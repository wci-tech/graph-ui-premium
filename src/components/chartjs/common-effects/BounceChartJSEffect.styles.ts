import type { ChartJSEffectStyleModule } from './ChartJSEffect.types';

const BounceChartJSEffect: ChartJSEffectStyleModule = {
  id: 'chartjs.effect.bounce',

  resolve: () => ({
    options: {
      animation: {
        duration: 2500,
        easing: 'easeOutElastic',
      },
    },
  }),
};

export default BounceChartJSEffect;
