/** @jsxImportSource @emotion/react */

import {
  AreaChart,
  BarChart,
  BarLineChart,
  BubbleChart,
  CandlestickChart,
  DoughnutChart,
  GanttChart,
  GaugeMeter,
} from '@/components/echarts/components';

import { adaptEChartsAreaProps } from './adapters/area.adapter';
import { adaptEChartsBarProps } from './adapters/bar.adapter';
import { adaptEChartsBarLineProps } from './adapters/bar-line.adapter';
import { adaptEChartsBubbleProps } from './adapters/bubble.adapter';
import { adaptEChartsCandlestickProps } from './adapters/candlestick.adapter';
import { adaptEChartsDoughnutProps } from './adapters/doughnut.adapter';
import { adaptEChartsGanttProps } from './adapters/gantt.adapter';
import { adaptEChartsGaugeMeterProps } from './adapters/gauge-meter.adapter';
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
  gauge: {
    render: (props) => <GaugeMeter {...adaptEChartsGaugeMeterProps(props)} />,
  },
};
