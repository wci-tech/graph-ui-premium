import type { BarLineChartStyleModule } from '../engine/BarLineChartEngine.types';

const BarLineRevealChartStyles: BarLineChartStyleModule = {
  id: 'barLineChart.effect.reveal',

  resolve: () => ({
    options: {
      animation: true,
      animationDuration: 2200,
      animationDurationUpdate: 1800,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
    },
  }),
};

export default BarLineRevealChartStyles;
