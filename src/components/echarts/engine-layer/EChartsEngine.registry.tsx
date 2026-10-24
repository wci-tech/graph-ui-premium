/** @jsxImportSource @emotion/react */

import { AreaChart, BarChart, BarLineChart } from '@/components/echarts/components';

import { adaptEChartsAreaProps } from './adapters/area.adapter';
import { adaptEChartsBarProps } from './adapters/bar.adapter';
import { adaptEChartsBarLineProps } from './adapters/bar-line.adapter';
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
};
