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
const ANIMATION_GUARD_BUFFER = 150;

const isRecord = (
  value: unknown,
): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value);

const getOptionValue = <
  TKey extends keyof EChartsAnimationOptions,
>(
  options: unknown,
  key: TKey,
): EChartsAnimationOptions[TKey] | undefined => {
  if (!isRecord(options)) {
    return undefined;
  }

  return options[key] as
    | EChartsAnimationOptions[TKey]
    | undefined;
};

/**
 * Applies resolved animation configuration to the chart and each series.
 *
 * Consumer-provided animation values are preserved while missing values fall
 * back to the default ECharts animation configuration.
 *
 * @param chartOptions - Generated ECharts configuration.
 * @param options - Consumer-provided animation options.
 * @returns ECharts configuration with animation settings applied.
 */
export const applyEChartsSeriesAnimation = (
  chartOptions: EChartsOption,
  options: unknown,
): EChartsOption => {
  const animation =
    getOptionValue(options, 'animation') ?? true;

  const animationDuration =
    getOptionValue(
      options,
      'animationDuration',
    ) ?? DEFAULT_ANIMATION_DURATION;

  const animationDurationUpdate =
    getOptionValue(
      options,
      'animationDurationUpdate',
    ) ?? DEFAULT_ANIMATION_DURATION_UPDATE;

  const animationDelay = getOptionValue(
    options,
    'animationDelay',
  );

  const animationDelayUpdate =
    getOptionValue(
      options,
      'animationDelayUpdate',
    );

  const animationEasing =
    getOptionValue(
      options,
      'animationEasing',
    ) ?? DEFAULT_ANIMATION_EASING;

  const animationEasingUpdate =
    getOptionValue(
      options,
      'animationEasingUpdate',
    ) ?? DEFAULT_ANIMATION_EASING;

  const currentSeries = Array.isArray(
    chartOptions.series,
  )
    ? chartOptions.series
    : [];

  const animatedSeries = currentSeries.map(
    (seriesItem) => {
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
    },
  );

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

/**
 * Converts numeric chart data to its zero-state equivalent while preserving
 * the original data structure.
 *
 * The zero-state data is used as the starting point for the initial entrance
 * animation.
 *
 * @param value - Original series data.
 * @returns Series data with numeric values replaced by zero.
 */
const getZeroValue = (
  value: unknown,
): unknown => {
  if (typeof value === 'number') {
    return 0;
  }

  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'number') {
        return 0;
      }

      if (Array.isArray(item)) {
        return item.map((nestedItem) =>
          typeof nestedItem === 'number'
            ? 0
            : nestedItem,
        );
      }

      if (isRecord(item)) {
        return {
          ...item,
          value:
            typeof item['value'] === 'number'
              ? 0
              : item['value'],
        };
      }

      return item;
    });
  }

  return value;
};

/**
 * Creates a zero-state version of an ECharts series for the initial entrance
 * animation.
 *
 * Native animation is disabled for this state so the zero values are painted
 * immediately before transitioning to the real values.
 *
 * @param series - Original ECharts series configuration.
 * @returns Zero-state series configuration.
 */
const createInitialSeries = (
  series: SeriesOption,
): SeriesOption => {
  const seriesRecord =
    series as Record<string, unknown>;

  return {
    ...series,
    animation: false,
    data: getZeroValue(
      seriesRecord['data'],
    ),
  } as SeriesOption;
};

/**
 * Creates the zero-state ECharts configuration used immediately before the
 * initial entrance animation.
 *
 * @param options - Final ECharts configuration.
 * @returns ECharts configuration containing zero-state series values.
 */
export const createInitialLoadOptions = (
  options: EChartsOption,
): EChartsOption => {
  const currentSeries = Array.isArray(
    options.series,
  )
    ? options.series
    : [];

  return {
    ...options,
    animation: false,
    series: currentSeries.map(
      createInitialSeries,
    ),
  };
};

/**
 * Calculates the fallback duration used to protect the entrance animation
 * from resize updates.
 *
 * The longest configured animation delay is combined with the active
 * animation duration and a small completion buffer.
 *
 * @param options - Current ECharts configuration.
 * @returns Animation guard duration in milliseconds.
 */
export const getAnimationGuardDuration = (
  options: EChartsOption,
): number => {
  const updateDuration =
    typeof options.animationDurationUpdate ===
      'number'
      ? options.animationDurationUpdate
      : undefined;

  const initialDuration =
    typeof options.animationDuration === 'number'
      ? options.animationDuration
      : undefined;

  const duration =
    updateDuration ??
    initialDuration ??
    DEFAULT_ANIMATION_DURATION;

  const updateDelay =
    typeof options.animationDelayUpdate ===
      'number'
      ? options.animationDelayUpdate
      : 0;

  const initialDelay =
    typeof options.animationDelay === 'number'
      ? options.animationDelay
      : 0;

  const delay = Math.max(
    updateDelay,
    initialDelay,
  );

  return (
    duration +
    delay +
    ANIMATION_GUARD_BUFFER
  );
};