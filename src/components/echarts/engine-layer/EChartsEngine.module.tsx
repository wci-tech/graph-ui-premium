/** @jsxImportSource @emotion/react */
import type { EngineRendererProps } from '@/engines/engine.types';

import { ECHARTS_ENGINE_REGISTRY } from './EChartsEngine.registry';

export const EngineRenderer = (props: EngineRendererProps) => {
  const entry = ECHARTS_ENGINE_REGISTRY[props.type];

  if (!entry) return null;

  return entry.render(props);
};
