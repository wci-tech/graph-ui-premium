/** @jsxImportSource @emotion/react */
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import { UPlot } from '../../../UPlot';
import type { LineChartProps } from '../LineChart.types';

import { createLineChartDefinition, getResolvedLineChartColors } from './BaseLineChart.utils';

type BaseLineChartProps = LineChartProps & {
  readonly resolvedColors?: string[];
};

const BaseLineChart = ({
  data,
  labels,
  series,
  options,
  appearance = 'solid',

  showDownload = true,
  downloadPlacement = 'top-right',
  rendererCustomStyles,

  customStyles,
  className,
  testId = 'uplot-line-chart-test-id',

  resolvedColors: variantColors = [],
}: BaseLineChartProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setRootElement(wrapperRef.current);
  }, [customStyles?.wrapper, rendererCustomStyles?.container]);

  const resolvedColors = useMemo(
    () => getResolvedLineChartColors(rootElement, variantColors),
    [rootElement, variantColors, customStyles?.wrapper, rendererCustomStyles?.container],
  );

  const normalizedData = useMemo(
    () =>
      createLineChartDefinition(
        compactObject({
          data,
          labels,
          series,
          appearance,
          resolvedColors,
        }),
      ),
    [appearance, data, labels, resolvedColors, series],
  );

  const uPlotProps = compactObject({
    data: normalizedData,
    options,
    showDownload,
    downloadPlacement,
    customStyles: rendererCustomStyles,
  });

  return (
    <div
      ref={wrapperRef}
      {...compactObject({
        className,
        'data-testid': testId,
      })}
      css={[customStyles?.wrapper, rendererCustomStyles?.container]}
    >
      <div css={customStyles?.chart}>
        <UPlot {...uPlotProps} />
      </div>
    </div>
  );
};

export default BaseLineChart;
