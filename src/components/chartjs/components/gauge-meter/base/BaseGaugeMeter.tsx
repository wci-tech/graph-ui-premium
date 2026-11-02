/** @jsxImportSource @emotion/react */

import { compactObject } from '@wci-tech/core-ui-premium';

import Chartjs from '@/components/chartjs/Chartjs';

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

  if (!resolvedColors || !gaugeOptions) {
    return <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles} />;
  }

  return (
    <div ref={wrapperRef} {...wrapperProps} css={wrapperStyles}>
      <div css={[styles.chart, customStyles?.chart]}>
        <Chartjs
          type="doughnut"
          data={processedData}
          options={gaugeOptions}
          plugins={plugins}
          showDownload={showDownload}
          downloadPlacement={downloadPlacement}
          {...(rendererCustomStyles !== undefined ? { customStyles: rendererCustomStyles } : {})}
        />
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
