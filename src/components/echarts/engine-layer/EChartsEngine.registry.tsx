/** @jsxImportSource @emotion/react */

import { AreaChart, BarChart, BubbleChart } from '@/components/echarts/components';

import { adaptEChartsAreaProps } from './adapters/area.adapter';
import { adaptEChartsBarProps } from './adapters/bar.adapter';
import { adaptEChartsBubbleProps } from './adapters/bubble.adapter';
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
};
