import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type {
  AreaChartDataset,
  AreaChartEffect,
  AreaChartProps,
} from '@/components/chartjs/components/area-chart/AreaChart.types';
import type { EngineRendererProps } from '@/engines/engine.types';

const CHARTJS_AREA_EFFECTS: readonly AreaChartEffect[] = [
  'none',
  'bounce',
  'wobble',
  'elastic',
  'progressive-trace',
  'elastic-glide',
  'staggered-reveal',
];

const resolveEffect = (
  effect: EngineRendererProps['effect'],
): AreaChartEffect =>
  CHARTJS_AREA_EFFECTS.includes(effect as AreaChartEffect)
    ? (effect as AreaChartEffect)
    : 'none';

const resolveAppearance = (
  appearance: EngineRendererProps['appearance'],
): AreaChartProps['appearance'] =>
  appearance === 'basic' || appearance === 'smooth'
    ? appearance
    : undefined;

const toAreaChartData = (
  series: EngineRendererProps['data']['series'],
): AreaChartDataset[] =>
  series.map((seriesItem) =>
    compactObject({
      label: seriesItem.label,
      data: toNumberSeriesData(seriesItem.data),
      color: seriesItem.color,
      pointColor: seriesItem.pointColor,
      pointRadius: seriesItem.pointRadius,
      borderWidth: seriesItem.borderWidth,
    }),
  );

export const adaptChartJSAreaProps = ({
  data,
  colors,
  options,
  appearance,
  effect,
  showDownload,
  downloadPlacement,
  customStyles,
  className,
  testId,
}: EngineRendererProps): AreaChartProps =>
  compactObject({
    labels: Array.from(data.labels),
    data: toAreaChartData(data.series),
    effect: resolveEffect(effect),
    colors,
    appearance: resolveAppearance(appearance),
    options,
    showDownload,
    downloadPlacement,
    rendererCustomStyles: customStyles,
    className,
    testId,
  });