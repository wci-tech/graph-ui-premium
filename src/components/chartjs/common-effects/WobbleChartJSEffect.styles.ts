import type { ChartJSEffectStyleModule } from './ChartJSEffect.types';

const WobbleChartJSEffect: ChartJSEffectStyleModule = {
  id: 'chartjs.effect.wobble',

  resolve: () => ({
    options: {
      animation: {
        duration: 1800,
        easing: 'easeInOutBack',
      },
    },
  }),
};

export default WobbleChartJSEffect;
