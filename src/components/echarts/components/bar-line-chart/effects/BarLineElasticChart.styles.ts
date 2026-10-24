import type { BarLineChartStyleModule } from '../engine/BarLineChartEngine.types';

const BarLineElasticChartStyles: BarLineChartStyleModule = {
  id: 'barLineChart.effect.elastic',

  resolve: () => ({
    options: {
      animation: true,
      animationDuration: 1800,
      animationDurationUpdate: 1800,
      animationEasing: 'elasticOut',
      animationEasingUpdate: 'elasticOut',
    },
  }),
};

export default BarLineElasticChartStyles;
