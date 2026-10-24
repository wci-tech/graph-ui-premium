/** @jsxImportSource @emotion/react */

import {
  AreaChart,
  BarChart,
  BarLineChart,
  BubbleChart,
  CandlestickChart,
} from '@/components/chartjs/components';

import { adaptChartJSAreaProps } from './adapters/area.adapter';
import { adaptChartJSBarProps } from './adapters/bar.adapter';
import { adaptChartJSBarLineProps } from './adapters/bar-line.adapter';
import { adaptChartJSBubbleProps } from './adapters/bubble.adapter';
import { adaptChartJSCandlestickProps } from './adapters/candlestick.adapter';
import type { EngineRegistry } from './engineRegistry.types';

export const CHARTJS_ENGINE_REGISTRY: EngineRegistry = {
  area: {
    render: (props) => <AreaChart {...adaptChartJSAreaProps(props)} />,
  },
  bar: {
    render: (props) => <BarChart {...adaptChartJSBarProps(props)} />,
  },
  bubble: {
    render: (props) => <BubbleChart {...adaptChartJSBubbleProps(props)} />,
  },
  'bar-line': {
    render: (props) => <BarLineChart {...adaptChartJSBarLineProps(props)} />,
  },
  candlestick: {
    render: (props) => {
      if (props.type !== 'candlestick') {
        return null;
      }

      return <CandlestickChart {...adaptChartJSCandlestickProps(props)} />;
    },
  },
};
