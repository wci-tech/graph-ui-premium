/** @jsxImportSource @emotion/react */
import { LineChart } from '@/components/uplot/components/line-chart/LineChart';

import { adaptUPlotLineProps } from './adapters/line.adapter';
import type { EngineRegistry } from './engineRegistry.types';

export const UPLOT_ENGINE_REGISTRY: EngineRegistry = {
  line: {
    render: (props) => <LineChart {...adaptUPlotLineProps(props)} />,
  },
};
