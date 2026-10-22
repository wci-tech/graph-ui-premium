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

const resolveEffect = (effect: EngineRendererProps['effect']): AreaChartEffect =>
  CHARTJS_AREA_EFFECTS.includes(effect as AreaChartEffect) ? (effect as AreaChartEffect) : 'none';

const toAreaChartData = (series: EngineRendererProps['data']['series']): AreaChartDataset[] =>
  series.map(
    (seriesItem): AreaChartDataset => ({
      label: seriesItem.label,

      data: Array.from(seriesItem.data),

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
}: EngineRendererProps): AreaChartProps => ({
  labels: Array.from(data.labels),

  data: toAreaChartData(data.series),

  effect: resolveEffect(effect),

  ...(colors
    ? {
        colors,
      }
    : {}),

  ...(appearance === 'basic' || appearance === 'smooth'
    ? {
        appearance,
      }
    : {}),

  ...(options
    ? {
        options,
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
});
