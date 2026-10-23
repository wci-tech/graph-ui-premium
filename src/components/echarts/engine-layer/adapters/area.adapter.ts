import { compactObject } from '@wci-tech/core-ui-premium';

import type {
  AreaChartAppearance,
  AreaChartColors,
  AreaChartEffect,
  AreaChartOptions,
  AreaChartProps,
  AreaChartSeries,
} from '@/components/echarts/components/area-chart/AreaChart.types';
import type { EngineRendererProps } from '@/engines/engine.types';

const ECHARTS_AREA_EFFECTS: readonly AreaChartEffect[] = [
  'none',
  'bounce',
  'wobble',
  'elastic',
  'progressive-trace',
  'elastic-glide',
  'staggered-reveal',
];

const ECHARTS_AREA_APPEARANCES: readonly AreaChartAppearance[] = [
  'basic',
  'smooth',
];

const resolveEffect = (
  effect: EngineRendererProps['effect'],
): AreaChartEffect =>
  ECHARTS_AREA_EFFECTS.includes(effect as AreaChartEffect)
    ? (effect as AreaChartEffect)
    : 'none';

const resolveAppearance = (
  appearance: EngineRendererProps['appearance'],
): AreaChartProps['appearance'] => {
  if (appearance === 'solid') {
    return 'smooth';
  }

  return ECHARTS_AREA_APPEARANCES.includes(
    appearance as AreaChartAppearance,
  )
    ? (appearance as AreaChartAppearance)
    : undefined;
};

const resolveOptions = (
  options: EngineRendererProps['options'],
): AreaChartOptions | undefined =>
  options
    ? (options as AreaChartOptions)
    : undefined;

const resolveColors = (
  colors: EngineRendererProps['colors'],
): AreaChartColors | undefined =>
  colors
    ? (colors as AreaChartColors)
    : undefined;

const toAreaChartData = (
  series: EngineRendererProps['data']['series'],
): AreaChartSeries[] =>
  series.map((seriesItem) =>
    compactObject({
      label: seriesItem.label,
      data: Array.from(seriesItem.data),

      color: seriesItem.color,
      pointColor: seriesItem.pointColor,
      pointRadius: seriesItem.pointRadius,
      borderWidth: seriesItem.borderWidth,
    }),
  );

export const adaptEChartsAreaProps = ({
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
    data: {
      labels: Array.from(data.labels),
      series: toAreaChartData(data.series),
    },

    colors: resolveColors(colors),

    options: resolveOptions(options),

    appearance: resolveAppearance(appearance),

    effect: resolveEffect(effect),

    showDownload,

    downloadPlacement,

    rendererCustomStyles: customStyles,

    className,

    testId,
  });
