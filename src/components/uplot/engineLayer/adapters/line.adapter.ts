import type {
  LineChartEffect,
  LineChartProps,
} from '@/components/uplot/components/line-chart/LineChart.types';
import type { UPlotAppearance, UPlotRendererOptions } from '@/components/uplot/UPlot.types';
import type { EngineRendererProps } from '@/engines/engine.types';

const UPLOT_LINE_EFFECTS: readonly LineChartEffect[] = ['none', 'fade-in'];

const UPLOT_LINE_APPEARANCES: readonly UPlotAppearance[] = ['solid', 'smooth', 'stepped'];

const resolveEffect = (effect: EngineRendererProps['effect']): LineChartEffect =>
  UPLOT_LINE_EFFECTS.includes(effect as LineChartEffect) ? (effect as LineChartEffect) : 'none';

const resolveAppearance = (
  appearance: EngineRendererProps['appearance'],
): UPlotAppearance | undefined => {
  if (appearance === 'basic') {
    return 'solid';
  }

  return UPLOT_LINE_APPEARANCES.includes(appearance as UPlotAppearance)
    ? (appearance as UPlotAppearance)
    : undefined;
};

const resolveOptions = (
  options: EngineRendererProps['options'],
): UPlotRendererOptions | undefined => {
  if (!options) {
    return undefined;
  }

  return {
    ...(typeof options.height === 'number'
      ? {
        height: options.height,
      }
      : {}),
    ...(typeof options.fileName === 'string'
      ? {
        fileName: options.fileName,
      }
      : {}),
    ...(typeof options.chartBackground === 'string'
      ? {
        chartBackground: options.chartBackground,
      }
      : {}),
  };
};

const resolveSeriesData = (data: EngineRendererProps['data']['series'][number]['data']): number[] =>
  Array.isArray(data) ? data.filter((value): value is number => typeof value === 'number') : [];

export const adaptUPlotLineProps = ({
  data,
  options,
  appearance,
  effect,
  showDownload,
  downloadPlacement,
  customStyles,
  className,
  testId,
}: EngineRendererProps): LineChartProps => {
  const resolvedOptions = resolveOptions(options);
  const resolvedAppearance = resolveAppearance(appearance);

  return {
    data: {
      labels: Array.from(data.labels),
      series: data.series.map((seriesItem) => ({
        label: seriesItem.label,
        data: resolveSeriesData(seriesItem.data),
        ...(seriesItem.color
          ? {
            color: seriesItem.color,
          }
          : {}),
      })),
    },
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
    effect: resolveEffect(effect),
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