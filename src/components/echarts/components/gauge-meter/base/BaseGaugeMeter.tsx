/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import ECharts from '@/components/echarts/ECharts';

import { useGaugeMeter } from '../hooks/useGaugeMeter';

import type { BaseGaugeMeterProps } from './BaseGaugeMeter.types';

const BaseGaugeMeter = ({
  labels,
  data,
  value,
  colors,
  options,
  chartId,
  effect = 'none',
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'echarts-gauge-meter-test-id',
}: BaseGaugeMeterProps) => {
  const { wrapperRef, chartOptions, wrapperProps, isReady } = useGaugeMeter(
    compactObject({
      labels,
      data,
      value,
      colors,
      options,
      effect,
      customStyles,
      rendererCustomStyles,
      className,
      testId,
    }),
  );

  const wrapperStyles = [customStyles?.wrapper, rendererCustomStyles?.container];

  return (
    <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles}>
      {isReady && chartOptions ? (
        <ECharts
          key={`${chartId ?? 'gauge'}-${effect}`}
          {...compactObject({
            chartId,
            options: chartOptions,
            showDownload,
            downloadPlacement,
            customStyles: rendererCustomStyles,
          })}
        />
      ) : null}
    </div>
  );
};

export default BaseGaugeMeter;
