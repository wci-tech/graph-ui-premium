import type { BarSeriesOption, EChartsOption } from 'echarts';

import type { EChartsDefinition, EChartsSeriesDefinition } from '../../ECharts.types';

const DEFAULT_BAR_COLOR = '#763d6c';
const DEFAULT_BAR_WIDTH = 40;

const getSeriesColor = (series: EChartsSeriesDefinition): string =>
  typeof series.color === 'string' ? series.color : DEFAULT_BAR_COLOR;

const getBarChartColors = (
  definition: EChartsDefinition,
):
  | {
      readonly barColors?: string[];
      readonly labelColor?: string;
      readonly axisColor?: string;
      readonly gridColor?: string;
    }
  | undefined =>
  definition['barChartColors'] as
    | {
        readonly barColors?: string[];
        readonly labelColor?: string;
        readonly axisColor?: string;
        readonly gridColor?: string;
      }
    | undefined;

const getSeriesStack = (item: EChartsSeriesDefinition): string | undefined => {
  const stack = item['stack'];

  return typeof stack === 'string' ? stack : undefined;
};

const createBarSeries = ({
  item,
  isHorizontal,
  barWidth,
}: {
  readonly item: EChartsSeriesDefinition;
  readonly isHorizontal: boolean;
  readonly barWidth: number;
}): BarSeriesOption => {
  const mainColor = getSeriesColor(item);

  const name = item.label ?? item.name;

  const stack = getSeriesStack(item);

  const borderRadius = isHorizontal ? [0, 6, 6, 0] : [6, 6, 0, 0];

  return {
    ...(name ? { name } : {}),
    ...(stack ? { stack } : {}),

    type: 'bar',

    data: item.data,

    barWidth,
    barMaxWidth: barWidth,

    itemStyle: {
      color: mainColor,
      borderRadius,
    },

    emphasis: {
      focus: 'none',

      itemStyle: {
        color: mainColor,
        borderRadius,
      },
    },

    blur: {
      itemStyle: {
        opacity: 1,
      },
    },

    select: {
      disabled: true,
    },

    /*
     * Supports the zero-value to real-value transition
     * created by BaseBarChart.
     */
    universalTransition: {
      enabled: true,
    },

    animation: true,
  };
};

export const getBarConfig = (definition: EChartsDefinition): EChartsOption => {
  const colors = getBarChartColors(definition);

  const isHorizontal = definition['horizontal'] === true;

  const resolvedBarWidth = definition['barWidth'];

  const barWidth = typeof resolvedBarWidth === 'number' ? resolvedBarWidth : DEFAULT_BAR_WIDTH;

  const labelColor = colors?.labelColor ?? '#4b5563';

  const axisColor = colors?.axisColor ?? '#d1d5db';

  const gridColor = colors?.gridColor ?? '#e5e7eb';

  const series: BarSeriesOption[] = (definition.series ?? []).map((item) =>
    createBarSeries({
      item,
      isHorizontal,
      barWidth,
    }),
  );

  return {
    animation: true,
    animationThreshold: 10000,

    animationDuration: 1800,
    animationDurationUpdate: 1800,

    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',

    tooltip: {
      trigger: 'item',

      axisPointer: {
        show: false,
        type: 'line',

        shadowStyle: {
          color: 'transparent',
          opacity: 0,
        },
      },
    },

    legend: {
      show: series.length > 1,
      top: 8,

      textStyle: {
        color: labelColor,
      },
    },

    grid: {
      left: 8,

      right: 8,

      top: 36,

      bottom: 0,

      containLabel: true,
    },
    xAxis: isHorizontal
      ? {
          type: 'value',

          axisLabel: {
            color: labelColor,
          },

          axisLine: {
            lineStyle: {
              color: axisColor,
            },
          },

          axisTick: {
            lineStyle: {
              color: axisColor,
            },
          },

          splitLine: {
            lineStyle: {
              color: gridColor,
            },
          },
        }
      : {
          type: 'category',

          data: definition.labels ?? [],

          boundaryGap: true,

          axisLabel: {
            color: labelColor,
          },

          axisLine: {
            lineStyle: {
              color: axisColor,
            },
          },

          axisTick: {
            lineStyle: {
              color: axisColor,
            },
          },
        },

    yAxis: isHorizontal
      ? {
          type: 'category',

          data: definition.labels ?? [],

          axisLabel: {
            color: labelColor,
          },

          axisLine: {
            lineStyle: {
              color: axisColor,
            },
          },

          axisTick: {
            lineStyle: {
              color: axisColor,
            },
          },
        }
      : {
          type: 'value',

          axisLabel: {
            color: labelColor,
          },

          axisLine: {
            lineStyle: {
              color: axisColor,
            },
          },

          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: gridColor,
            },
          },
        },

    series,
  };
};
