import { css } from '@emotion/react';

import type { BarChartStyleModule } from '../engine/BarChartEngine.types';

const PrimaryBarChartStyles: BarChartStyleModule = {
  id: 'barChart.variant.primary',

  resolve: ({ theme }) => {
    const primary = theme.colors.brandColors.primary.default;

    const secondary = theme.colors.brandColors.secondary?.default ?? primary;

    return {
      customStyles: {
        wrapper: css`
          --bar-chart-bar-color: ${primary};
          --bar-chart-secondary-bar-color: ${secondary};

          --bar-chart-label-color: ${primary};

          --bar-chart-axis-color: ${theme.colors.grayShades.gray_8};

          --bar-chart-grid-color: ${theme.colors.grayShades.gray_4};
        `,
      },
    };
  },
};

export default PrimaryBarChartStyles;
