import { css } from '@emotion/react';

import type { LineChartStyleModule } from '../engine/LineChartEngine.types';

const FadeInLineChartStyles: LineChartStyleModule = {
  id: 'uplot.lineChart.effect.fadeIn',

  resolve: () => ({
    customStyles: {
      chart: css`
        animation: uplot-line-chart-fade-in 420ms ease-out both;

        @keyframes uplot-line-chart-fade-in {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }
      `,
    },
  }),
};

export default FadeInLineChartStyles;
