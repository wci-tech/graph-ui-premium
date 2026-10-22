import { css } from '@emotion/react';

import type { LineChartStyleModule } from '../engine/LineChartEngine.types';

const PrimaryLineChartStyles: LineChartStyleModule = {
  id: 'uplot.lineChart.variant.primary',

  resolve: ({ theme }) => {
    const primary = theme.colors.brandColors.primary[500];
    const secondary = theme.colors.brandColors.secondary[500];

    return {
      colors: [primary, secondary],
      customStyles: {
        wrapper: css`
          --line-chart-line-color: ${primary};
          --line-chart-secondary-line-color: ${secondary};
          --line-chart-axis-color: ${theme.colors.grayShades[700]};
          --line-chart-grid-color: ${theme.colors.grayShades[300]};
          --line-chart-point-bg-color: ${secondary};
        `,
      },
    };
  },
};

export default PrimaryLineChartStyles;
