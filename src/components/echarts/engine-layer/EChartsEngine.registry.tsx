/** @jsxImportSource @emotion/react */

import {
  AreaChart,
  BarChart,
  BarLineChart,
  BubbleChart,
  CandlestickChart,
  GanttChart,
} from '@/components/echarts/components';

import { adaptEChartsAreaProps } from './adapters/area.adapter';
import { adaptEChartsBarProps } from './adapters/bar.adapter';
import { adaptEChartsBarLineProps } from './adapters/bar-line.adapter';
import { adaptEChartsBubbleProps } from './adapters/bubble.adapter';
import { adaptEChartsCandlestickProps } from './adapters/candlestick.adapter';
import { adaptEChartsGanttProps } from './adapters/gantt.adapter';
import type { EngineRegistry } from './engineRegistry.types';

export const ECHARTS_ENGINE_REGISTRY: EngineRegistry = {
  area: {
    render: (props) => <AreaChart {...adaptEChartsAreaProps(props)} />,
  },
  bar: {
    render: (props) => <BarChart {...adaptEChartsBarProps(props)} />,
  },
  bubble: {
    render: (props) => <BubbleChart {...adaptEChartsBubbleProps(props)} />,
  },
  'bar-line': {
    render: (props) => <BarLineChart {...adaptEChartsBarLineProps(props)} />,
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
};
