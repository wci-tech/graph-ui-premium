/** @jsxImportSource @emotion/react */

import {
  AreaChart,
  BarChart,
  BarLineChart,
  BubbleChart,
  CandlestickChart,
  DoughnutChart,
  FunnelChart,
  GanttChart,
  GaugeMeter,
  HeatmapChart,
  NetworkGraph,
  PieChart,
  RadarChart,
  ScatterChart,
  ScatterLineChart,
  StackedAreaChart,
  StackedBarChart,
  TreemapChart,
} from '@/components/echarts/components';

import { adaptEChartsAreaProps } from './adapters/area.adapter';
import { adaptEChartsBarProps } from './adapters/bar.adapter';
import { adaptEChartsBarLineProps } from './adapters/bar-line.adapter';
import { adaptEChartsBubbleProps } from './adapters/bubble.adapter';
import { adaptEChartsCandlestickProps } from './adapters/candlestick.adapter';
import { adaptEChartsDoughnutProps } from './adapters/doughnut.adapter';
import { adaptEChartsFunnelProps } from './adapters/funnel.adapter';
import { adaptEChartsGanttProps } from './adapters/gantt.adapter';
import { adaptEChartsGaugeMeterProps } from './adapters/gauge-meter.adapter';
import { adaptEChartsHeatmapProps } from './adapters/heatmap.adapter';
import { adaptEChartsNetworkGraphProps } from './adapters/network.adapter';
import { adaptEChartsPieProps } from './adapters/pieChart.adapter';
import { adaptEChartsRadarProps } from './adapters/radarChart.adapter';
import { adaptEChartsScatterProps } from './adapters/scatter.adapter';
import { adaptEChartsScatterLineProps } from './adapters/scatterLine.adapter';
import { adaptEChartsStackedAreaProps } from './adapters/stacked-area.adapter';
import { adaptEChartsStackedBarProps } from './adapters/stacked-bar.adapter';
import { adaptEChartsTreemapProps } from './adapters/treemap.adapter';
import type { EngineRegistry } from './engineRegistry.types';

export const ECHARTS_ENGINE_REGISTRY: EngineRegistry = {
  area: {
    render: (props) => <AreaChart {...adaptEChartsAreaProps(props)} />,
  },
  bar: {
    render: (props) => <BarChart {...adaptEChartsBarProps(props)} />,
  },
  'bar-line': {
    render: (props) => <BarLineChart {...adaptEChartsBarLineProps(props)} />,
  },
  bubble: {
    render: (props) => <BubbleChart {...adaptEChartsBubbleProps(props)} />,
  },
  candlestick: {
    render: (props) => {
      if (props.type !== 'candlestick') {
        return null;
      }

      return <CandlestickChart {...adaptEChartsCandlestickProps(props)} />;
    },
  },
  gantt: {
    render: (props) => <GanttChart {...adaptEChartsGanttProps(props)} />,
  },
  doughnut: {
    render: (props) => <DoughnutChart {...adaptEChartsDoughnutProps(props)} />,
  },
  funnel: {
    render: (props) => <FunnelChart {...adaptEChartsFunnelProps(props)} />,
  },
  heatmap: {
    render: (props) => <HeatmapChart {...adaptEChartsHeatmapProps(props)} />,
  },
  network: {
    render: (props) => <NetworkGraph {...adaptEChartsNetworkGraphProps(props)} />,
  },
  gauge: {
    render: (props) => <GaugeMeter {...adaptEChartsGaugeMeterProps(props)} />,
  },
  pie: {
    render: (props) => <PieChart {...adaptEChartsPieProps(props)} />,
  },
  radar: {
    render: (props) => <RadarChart {...adaptEChartsRadarProps(props)} />,
  },
  'scatter-line': {
    render: (props) => <ScatterLineChart {...adaptEChartsScatterLineProps(props)} />,
  },
  scatter: {
    render: (props) => <ScatterChart {...adaptEChartsScatterProps(props)} />,
  },
  'stacked-area': {
    render: (props) => <StackedAreaChart {...adaptEChartsStackedAreaProps(props)} />,
  },
  'stacked-bar': {
    render: (props) => <StackedBarChart {...adaptEChartsStackedBarProps(props)} />,
  },
  treemap: {
    render: (props) => <TreemapChart {...adaptEChartsTreemapProps(props)} />,
  },
};
