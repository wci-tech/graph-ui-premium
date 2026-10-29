/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';
import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import { useGaugeMeter } from '../hooks/useGaugeMeter';

import { useStyles } from './BaseGaugeMeter.styles';
import type { BaseGaugeMeterProps } from './BaseGaugeMeter.types';

export const BaseGaugeMeter = ({
  labels,
  data,
  value,
  colors,
  options,
  effect,
  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,
  customStyles,
  className,
  testId = 'gauge-meter-test-id',
}: BaseGaugeMeterProps) => {
  const styles = useStyles(options);

  const {
    wrapperRef,
    processedData,
    gaugeOptions,
    plugins,
    wrapperProps,
    resolvedColors,
    resolvedValue,
    isReady,
  } = useGaugeMeter(
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

  const wrapperStyles = [styles.wrapper, customStyles?.wrapper, rendererCustomStyles?.container];

  if (!isReady || !resolvedColors) {
    return <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles} />;
  }

  const chartjsProps: ChartjsProps = compactObject({
    type: 'doughnut' as const,
    data: processedData,
    options: gaugeOptions,
    plugins,
    showDownload,
    downloadPlacement,
    customStyles: rendererCustomStyles,
  });

  return (
    <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles}>
      <div css={[styles.chart, customStyles?.chart]}>
        <Chartjs {...chartjsProps} />
      </div>

      <div css={[styles.score, customStyles?.score]}>
        <div
          css={[
            styles.scoreValue,
            {
              color: resolvedColors.score,
            },
            customStyles?.scoreValue,
          ]}
        >
          {resolvedValue}
          {options?.unit ?? ''}
        </div>

        <div
          css={[
            styles.scoreLabel,
            {
              color: resolvedColors.scoreLabel,
            },
            customStyles?.scoreLabel,
          ]}
        >
          {options?.label ?? 'Score'}
        </div>
      </div>
    </div>
  );
};

export default BaseGaugeMeter;
