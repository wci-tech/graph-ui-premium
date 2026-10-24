import type { ChartJSEffectStyleModule } from './ChartJSEffect.types';

const ProgressiveTraceChartJSEffect: ChartJSEffectStyleModule = {
  id: 'chartjs.effect.progressive-trace',

  resolve: () => ({
    options: {
      animation: {
        duration: 2400,
      },
    },
  }),
};

export default ProgressiveTraceChartJSEffect;
