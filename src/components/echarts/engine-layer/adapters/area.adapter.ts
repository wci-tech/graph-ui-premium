import type {
  AreaChartAppearance,
  AreaChartColors,
  AreaChartEffect,
  AreaChartOptions,
  AreaChartProps,
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

const ECHARTS_AREA_APPEARANCES: readonly AreaChartAppearance[] = ['basic', 'smooth'];

const resolveEffect = (effect: EngineRendererProps['effect']): AreaChartEffect =>
  ECHARTS_AREA_EFFECTS.includes(effect as AreaChartEffect) ? (effect as AreaChartEffect) : 'none';

const resolveAppearance = (
  appearance: EngineRendererProps['appearance'],
): AreaChartAppearance | undefined => {
  if (appearance === 'solid') {
    return 'smooth';
  }

  return ECHARTS_AREA_APPEARANCES.includes(appearance as AreaChartAppearance)
    ? (appearance as AreaChartAppearance)
    : undefined;
};

const resolveOptions = (options: EngineRendererProps['options']): AreaChartOptions | undefined =>
  options ? (options as AreaChartOptions) : undefined;

const resolveColors = (colors: EngineRendererProps['colors']): AreaChartColors | undefined =>
  colors ? (colors as AreaChartColors) : undefined;

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
}: EngineRendererProps): AreaChartProps => {
  const resolvedOptions = resolveOptions(options);

  const resolvedColors = resolveColors(colors);

  const resolvedAppearance = resolveAppearance(appearance);

  return {
    data: {
      labels: [...data.labels],

      series: data.series.map((seriesItem) => ({
        label: seriesItem.label,

        data: [...seriesItem.data],

        ...(seriesItem.color
          ? {
              color: seriesItem.color,
            }
          : {}),

        ...(seriesItem.pointColor
          ? {
              pointColor: seriesItem.pointColor,
            }
          : {}),

        ...(seriesItem.pointRadius !== undefined
          ? {
              pointRadius: seriesItem.pointRadius,
            }
          : {}),

        ...(seriesItem.borderWidth !== undefined
          ? {
              borderWidth: seriesItem.borderWidth,
            }
          : {}),
      })),
    },

    ...(resolvedColors
      ? {
          colors: resolvedColors,
        }
      : {}),

    ...(resolvedOptions
      ? {
          options: resolvedOptions,
        }
      : {}),

    ...(resolvedAppearance
      ? {
          appearance: resolvedAppearance,
        }
      : {}),

    effect: resolveEffect(effect),

    ...(showDownload !== undefined
      ? {
          showDownload,
        }
      : {}),

    ...(downloadPlacement
      ? {
          downloadPlacement,
        }
      : {}),

    ...(customStyles
      ? {
          rendererCustomStyles: customStyles,
        }
      : {}),

    ...(className
      ? {
          className,
        }
      : {}),

    ...(testId
      ? {
          testId,
        }
      : {}),
  };
};
