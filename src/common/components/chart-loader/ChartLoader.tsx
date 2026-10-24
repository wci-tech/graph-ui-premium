/** @jsxImportSource @emotion/react */

import { Loader } from '@wci-tech/core-ui-premium';

import { styles } from './ChartLoader.styles';
import type { ChartLoaderProps } from './ChartLoader.types';

export const ChartLoader = ({
  loading = true,
  loaderType = 'spinner',
  spinnerType = 'conic-gradient',
  ariaLabel,
  size = 'lg',
  customChartLoaderStyles,
  testId = 'chart-loader',
  ...loaderProps
}: ChartLoaderProps) => (
  <div
    css={[styles.wrapper, customChartLoaderStyles?.wrapper]}
    role="status"
    aria-label={ariaLabel || 'Loading chart'}
    data-testid={testId}
  >
    <Loader
      {...loaderProps}
      loading={loading}
      loaderType={loaderType}
      spinnerType={spinnerType}
      size={size}
    />
  </div>
);
