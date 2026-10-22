/** @jsxImportSource @emotion/react */
import { AreaChart } from '@/components/chartjs/components';

import { adaptChartJSAreaProps } from './adapters/area.adapter';
import type { EngineRegistry } from './engineRegistry.types';

export const CHARTJS_ENGINE_REGISTRY: EngineRegistry = {
  area: {
    render: (props) => <AreaChart {...adaptChartJSAreaProps(props)} />,
  },
};
