import { css } from '@emotion/react';

import type { BarChartStyleModule } from '../engine/BarChartEngine.types';

const SecondaryBarChartStyles: BarChartStyleModule = {
  id: 'barChart.variant.secondary',

  resolve: ({ theme }) => {
    const primary = theme.colors.brandColors.primary.default;
    const secondary = theme.colors.brandColors.secondary?.default ?? primary;

    return {
      customStyles: {
        wrapper: css`
          --bar-chart-bar-color: ${secondary};
          --bar-chart-secondary-bar-color: ${primary};
          --bar-chart-label-color: ${secondary};
          --bar-chart-axis-color: ${theme.colors.grayShades.gray_8};
          --bar-chart-grid-color: ${theme.colors.grayShades.gray_4};
        `,
      },
    };
  },
};

export default SecondaryBarChartStyles;
