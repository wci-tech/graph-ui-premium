import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption, SeriesOption } from 'echarts';

export type EChartsAnimationOptions = Pick<
  EChartsOption,
  | 'animation'
  | 'animationDuration'
  | 'animationDurationUpdate'
  | 'animationDelay'
  | 'animationDelayUpdate'
  | 'animationEasing'
  | 'animationEasingUpdate'
>;

const DEFAULT_ANIMATION_DURATION = 1800;
const DEFAULT_ANIMATION_DURATION_UPDATE = 1800;
const DEFAULT_ANIMATION_EASING = 'cubicOut';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const getOptionValue = <TKey extends keyof EChartsAnimationOptions>(
  options: unknown,
  key: TKey,
): EChartsAnimationOptions[TKey] | undefined => {
  if (!isRecord(options)) {
    return undefined;
  }

  return options[key] as EChartsAnimationOptions[TKey] | undefined;
};

export const applyEChartsSeriesAnimation = (
  chartOptions: EChartsOption,
  options: unknown,
): EChartsOption => {
  const animation = getOptionValue(options, 'animation') ?? true;

  const animationDuration =
    getOptionValue(options, 'animationDuration') ?? DEFAULT_ANIMATION_DURATION;

  const animationDurationUpdate =
    getOptionValue(options, 'animationDurationUpdate') ?? DEFAULT_ANIMATION_DURATION_UPDATE;

  const animationDelay = getOptionValue(options, 'animationDelay');

  const animationDelayUpdate = getOptionValue(options, 'animationDelayUpdate');

  const animationEasing = getOptionValue(options, 'animationEasing') ?? DEFAULT_ANIMATION_EASING;

  const animationEasingUpdate =
    getOptionValue(options, 'animationEasingUpdate') ?? DEFAULT_ANIMATION_EASING;

  const currentSeries = Array.isArray(chartOptions.series) ? chartOptions.series : [];

  const animatedSeries = currentSeries.map((seriesItem) => {
    const series = seriesItem as SeriesOption;

    return compactObject({
      ...series,

      animation,

      animationDuration,
      animationDurationUpdate,

      animationDelay,
      animationDelayUpdate,

      animationEasing,
      animationEasingUpdate,
    });
  });

  return compactObject({
    ...chartOptions,

    animation,
    animationThreshold: 10000,

    animationDuration,
    animationDurationUpdate,

    animationDelay,
    animationDelayUpdate,

    animationEasing,
    animationEasingUpdate,

    series: animatedSeries,
  }) as EChartsOption;
};
