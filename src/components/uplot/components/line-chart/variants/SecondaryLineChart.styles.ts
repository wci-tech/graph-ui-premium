import { css } from '@emotion/react';

import type { LineChartStyleModule } from '../engine/LineChartEngine.types';

const SecondaryLineChartStyles: LineChartStyleModule = {
  id: 'uplot.lineChart.variant.secondary',

  resolve: ({ theme }) => {
    const primary =
      theme.colors.brandColors.secondary[500] ?? theme.colors.brandColors.primary[500];
    const secondary = theme.colors.brandColors.primary[500];

    return {
      colors: [primary, secondary],
      customStyles: {
        wrapper: css`
          --line-chart-line-color: ${primary};
          --line-chart-secondary-line-color: ${secondary};
          --line-chart-axis-color: ${theme.colors.grayShades[500]};
          --line-chart-grid-color: ${theme.colors.grayShades[500]};
          --line-chart-point-bg-color: ${secondary};
        `,
      },
    };
  },
};

export default SecondaryLineChartStyles;
