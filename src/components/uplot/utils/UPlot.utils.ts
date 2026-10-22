import { compactObject } from '@wci-tech/core-ui-premium';
import type { AlignedData, Options, Series } from 'uplot';
import uPlot from 'uplot';

import type {
  UPlotAppearance,
  UPlotCursorMoveHandler,
  UPlotDefinition,
  UPlotSeriesDefinition,
  UPlotSeriesLabel,
} from '../UPlot.types';

//fall back colors and labels in case they are not provided in the definition or series item

const DEFAULT_AXIS_COLOR = '#999999';
const DEFAULT_GRID_COLOR = '#eeeeee';
const DEFAULT_POINT_FILL = '#ffffff';
const DEFAULT_SERIES_COLOR = '#763d6c';
const DEFAULT_SERIES_LABEL = 'Series';

const resolveSeriesColor = (series: UPlotSeriesDefinition, fallbackColor?: string): string =>
  series.color ?? series.borderColor ?? fallbackColor ?? DEFAULT_SERIES_COLOR;

const getSeriesLabel = (label: UPlotSeriesLabel, fallback: string): string => {
  if (typeof label === 'string') return label;

  if (label instanceof HTMLElement) {
    return label.textContent?.trim() || fallback;
  }

  return fallback;
};

const getSeriesPath = (
  globalAppearance: UPlotAppearance,
  seriesAppearance?: UPlotAppearance,
): Series['paths'] | undefined => {
  const resolvedAppearance = seriesAppearance ?? globalAppearance;

  if (resolvedAppearance === 'smooth') {
    return uPlot.paths.spline?.();
  }

  if (resolvedAppearance === 'stepped') {
    return uPlot.paths.stepped?.({ align: 1 });
  }

  return undefined;
};

export const toUPlotData = (definition: UPlotDefinition): AlignedData => {
  const labels = definition.labels ?? [];
  const rawSeries = definition.series ?? [];

  return [
    labels.map((_, index) => index),
    ...rawSeries.map((seriesItem) => Array.from(seriesItem.data)),
  ];
};

export const createUPlotOptions = ({
  definition,
  width,
  height,
  onCursorMove,
}: {
  readonly definition: UPlotDefinition;
  readonly width: number;
  readonly height: number;
  readonly onCursorMove: UPlotCursorMoveHandler;
}): Options => {
  const rawSeries = definition.series ?? [];
  const appearance = definition.appearance ?? 'solid';
  const labels = definition.labels ?? [];
  const resolvedColors = definition.colors ?? [];

  return {
    width,
    height,
    cursor: {
      show: true,
      drag: {
        setScale: false,
      },
      points: {
        show: true,
        size: 8,
        fill: definition.pointFillColor ?? DEFAULT_POINT_FILL,
        stroke: (chart, seriesIndex) =>
          String(chart.series[seriesIndex]?.stroke ?? DEFAULT_SERIES_COLOR),
      },
    },
    hooks: {
      setCursor: [
        (chart) => {
          const index = chart.cursor.idx;

          if (index == null) return;

          onCursorMove({
            time: labels[index] ?? index,
            series: chart.series.slice(1).map((seriesItem, seriesIndex) => ({
              label: getSeriesLabel(seriesItem.label, `${DEFAULT_SERIES_LABEL} ${seriesIndex + 1}`),
              value: chart.data[seriesIndex + 1]?.[index] ?? null,
              color: String(seriesItem.stroke ?? DEFAULT_SERIES_COLOR),
            })),
          });
        },
      ],
    },
    series: [
      {
        label: 'Time',
      },
      ...rawSeries.map<Series>((seriesItem, index) => {
        const strokeColor = resolveSeriesColor(seriesItem, resolvedColors[index]);
        const paths = getSeriesPath(appearance, seriesItem.appearance);

        return compactObject({
          label: seriesItem.label ?? `${DEFAULT_SERIES_LABEL} ${index + 1}`,
          stroke: strokeColor,
          width: 2,
          fill: `${strokeColor}18`,
          points: {
            show: false,
          },
          paths,
        });
      }),
    ],
    axes: [
      {
        stroke: definition.axisColor ?? DEFAULT_AXIS_COLOR,
        values: (_chart, values) => values.map((value) => labels[Number(value)] ?? value),
      },
      {
        stroke: definition.axisColor ?? DEFAULT_AXIS_COLOR,
        grid: {
          stroke: definition.gridColor ?? DEFAULT_GRID_COLOR,
          width: 1,
        },
      },
    ],
  };
};
