import type { ChartJSEffectStyleModule } from './ChartJSEffect.types';

const StaggeredRevealChartJSEffect: ChartJSEffectStyleModule = {
  id: 'chartjs.effect.staggered-reveal',

  resolve: () => ({
    options: {
      animation: {
        duration: 1800,
        delay: 120,
      },
    },
  }),
};

export default StaggeredRevealChartJSEffect;
