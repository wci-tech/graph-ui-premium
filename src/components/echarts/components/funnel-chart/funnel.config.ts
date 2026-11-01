import type {
  EChartsOption,
  FunnelSeriesOption,
} from 'echarts';

import { FUNNEL_CHART_CONFIG } from './base/BaseFunnelChart.constants';
import type { FunnelChartDefinition } from './base/BaseFunnelChart.utils';

const createSeries = (
  item: FunnelChartDefinition['series'][number],
  definition: FunnelChartDefinition,
  index: number,
): FunnelSeriesOption => ({
  id: `funnel-series-${index}`,
  name:
    item.label ||
    FUNNEL_CHART_CONFIG.name,
  type: 'funnel',
  left: FUNNEL_CHART_CONFIG.left,
  right: FUNNEL_CHART_CONFIG.right,
  top: FUNNEL_CHART_CONFIG.top,
  bottom: FUNNEL_CHART_CONFIG.bottom,
  width: FUNNEL_CHART_CONFIG.width,
  min: FUNNEL_CHART_CONFIG.min,
  max: FUNNEL_CHART_CONFIG.max,
  minSize: definition.minSize,
  maxSize: definition.maxSize,
  sort: definition.sort,
  gap: definition.gap,
  funnelAlign: definition.funnelAlign,
  label: {
    show: true,
    position: 'inside',
    color:
      definition.funnelChartColors
        .tooltipText,
    fontSize:
      FUNNEL_CHART_CONFIG.labelFontSize,
    fontWeight: definition.boldLabels
      ? 'bold'
      : 'normal',
    lineHeight:
      FUNNEL_CHART_CONFIG.labelLineHeight,
    formatter: '{b}',
  },
  labelLine: {
    show: true,
    length:
      FUNNEL_CHART_CONFIG.labelLineLength,
    length2:
      FUNNEL_CHART_CONFIG.labelLineLength2,
    lineStyle: {
      color:
        definition.funnelChartColors
          .axisLine,
      width: 1,
      type: 'solid',
    },
  },
  emphasis: {
    disabled: true,
  },
  itemStyle: {
    borderColor:
      definition.funnelChartColors
        .axisLine,
    borderWidth:
      FUNNEL_CHART_CONFIG.borderWidth,
  },
  data: definition.labels.map(
    (label, dataIndex) => ({
      name: label,
      value:
        item.data[dataIndex] ?? 0,
      itemStyle: {
        color:
          item.colors[
          dataIndex %
          item.colors.length
          ],
      },
    }),
  ),
});

export const getFunnelConfig = (
  definition: FunnelChartDefinition,
): EChartsOption => ({
  grid: {
    show: false,
  },
  xAxis: {
    show: false,
    type: 'value',
  },
  yAxis: {
    show: false,
    type: 'category',
  },
  tooltip: {
    trigger: 'item',
    formatter:
      '{a}<br />{b}: <b>{c}</b>',
    backgroundColor:
      definition.funnelChartColors
        .tooltipBackground,
    borderColor:
      definition.funnelChartColors
        .tooltipBorder,
    borderWidth: 1,
    textStyle: {
      color:
        definition.funnelChartColors
          .tooltipText,
    },
  },
  legend: {
    show: definition.showLegend,
    bottom:
      FUNNEL_CHART_CONFIG.legendBottom,
    left: 'center',
    textStyle: {
      color:
        definition.funnelChartColors
          .axisText,
      fontWeight:
        definition.boldLegends
          ? 'bold'
          : 'normal',
    },
  },
  series: definition.series.map(
    (item, index) =>
      createSeries(
        item,
        definition,
        index,
      ),
  ),
});