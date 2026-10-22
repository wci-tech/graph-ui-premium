import type { ReactNode } from 'react';

import type { ChartType, EngineRendererProps } from '@/engines/engine.types';

export type EngineRegistryEntry = {
  readonly render: (props: EngineRendererProps) => ReactNode;
};

export type EngineRegistry = Partial<Record<ChartType, EngineRegistryEntry>>;
