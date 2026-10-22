/** @jsxImportSource @emotion/react */
import type { EngineRendererProps } from '@/engines/engine.types';

import { CHARTJS_ENGINE_REGISTRY } from './ChartJSEngine.registry';

export const EngineRenderer = (props: EngineRendererProps) => {
  const entry = CHARTJS_ENGINE_REGISTRY[props.type];

  if (!entry) return null;

  return entry.render(props);
};
