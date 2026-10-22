import type { EChartsEffectStyleModule } from './EChartsEffect.types';

const StaggeredRevealEChartsEffect: EChartsEffectStyleModule = {
  id: 'echarts.effect.staggered-reveal',

  resolve: () => ({
    options: {
      animation: true,

      animationDuration: 1800,

      animationDurationUpdate: 1800,

      animationDelay: (index: number) => index * 120,

      animationDelayUpdate: (index: number) => index * 120,

      animationEasing: 'cubicOut',

      animationEasingUpdate: 'cubicOut',
    },
  }),
};

export default StaggeredRevealEChartsEffect;
