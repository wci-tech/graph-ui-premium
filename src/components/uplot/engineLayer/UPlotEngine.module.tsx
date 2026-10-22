/** @jsxImportSource @emotion/react */
import type { EngineRendererProps } from '@/engines/engine.types';

import { UPLOT_ENGINE_REGISTRY } from './UPlotEngine.registry';

export const EngineRenderer = (props: EngineRendererProps) => {
  const entry = UPLOT_ENGINE_REGISTRY[props.type];

  if (!entry) return null;

  return entry.render(props);
};
