/** @jsxImportSource @emotion/react */
import { AreaChart } from '@/components/echarts/components';

import { adaptEChartsAreaProps } from './adapters/area.adapter';
import type { EngineRegistry } from './engineRegistry.types';

export const ECHARTS_ENGINE_REGISTRY: EngineRegistry = {
  area: {
    render: (props) => <AreaChart {...adaptEChartsAreaProps(props)} />,
  },
};
