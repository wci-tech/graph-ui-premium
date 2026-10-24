import type { BarLineChartStyleModule } from '../engine/BarLineChartEngine.types';

const BarLineBounceChartStyles: BarLineChartStyleModule = {
  id: 'barLineChart.effect.bounce',

  resolve: () => ({
    options: {
      animation: true,
      animationDuration: 1800,
      animationDurationUpdate: 1800,
      animationEasing: 'bounceOut',
      animationEasingUpdate: 'bounceOut',
    },
  }),
};

export default BarLineBounceChartStyles;
