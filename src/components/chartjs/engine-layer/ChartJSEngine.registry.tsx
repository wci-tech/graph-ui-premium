/** @jsxImportSource @emotion/react */
import { AreaChart, BarChart } from '@/components/chartjs/components';

import { adaptChartJSBarProps } from './adapters//bar.adapter';
import { adaptChartJSAreaProps } from './adapters/area.adapter';
import type { EngineRegistry } from './engineRegistry.types';

export const CHARTJS_ENGINE_REGISTRY: EngineRegistry = {
  area: {
    render: (props) => <AreaChart {...adaptChartJSAreaProps(props)} />,
  },

  bar: {
    render: (props) => <BarChart {...adaptChartJSBarProps(props)} />,
  },
};
