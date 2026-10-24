import type { BarLineChartStyleModule } from '../engine/BarLineChartEngine.types';

const BarLineSmoothUpdateChartStyles: BarLineChartStyleModule = {
  id: 'barLineChart.effect.smoothUpdate',

  resolve: () => ({
    options: {
      animation: true,
      animationDuration: 1200,
      animationDurationUpdate: 2000,
      animationEasing: 'cubicOut',
      animationEasingUpdate: 'cubicInOut',
    },
  }),
};

export default BarLineSmoothUpdateChartStyles;
