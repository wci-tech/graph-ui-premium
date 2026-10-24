import type { BarLineChartStyleModule } from '../engine/BarLineChartEngine.types';

const BarLineStaggerChartStyles: BarLineChartStyleModule = {
  id: 'barLineChart.effect.stagger',

  resolve: () => ({
    options: {
      animation: true,
      animationDuration: 1600,
      animationDurationUpdate: 1600,
      animationDelay: (index: number) => index * 120,
      animationDelayUpdate: (index: number) => index * 80,
      animationEasing: 'cubicOut',
      animationEasingUpdate: 'cubicOut',
    },
  }),
};

export default BarLineStaggerChartStyles;
