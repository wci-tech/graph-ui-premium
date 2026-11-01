import type { RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { NetworkGraphDefinition } from './base/BaseNetworkGraph.utils';

export type NetworkGraphEffect = EChartsEffect;

export interface NetworkGraphNode {
  readonly id?: string | number;
  readonly name: string;
  readonly value?: number;
  readonly symbolSize?: number;
  readonly color?: string;
}

export interface NetworkGraphLink {
  readonly source: string | number;
  readonly target: string | number;
  readonly value?: number;
}

export interface NetworkGraphSeries {
  readonly label?: string;
  readonly nodes: NetworkGraphNode[];
  readonly links: NetworkGraphLink[];
}

export interface NetworkGraphData {
  readonly series: NetworkGraphSeries[];
}

export interface NetworkGraphColors {
  readonly series?: string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type NetworkGraphResolvedColors = Required<NetworkGraphColors>;

export interface NetworkGraphCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type NetworkGraphOptions = EChartsOption & {
  readonly height?: number | string;
  readonly isBoxVisible?: boolean;
  readonly chartBackground?: string;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly repulsion?: number;
  readonly gravity?: number;
  readonly edgeLength?: number | [number, number];
  readonly friction?: number;
  readonly roam?: boolean;
  readonly draggable?: boolean;
  readonly crosshair?: boolean;
};

export interface NetworkGraphProps {
  readonly data: NetworkGraphData;
  readonly colors?: NetworkGraphColors;
  readonly options?: NetworkGraphOptions;
  readonly chartId?: string;
  readonly effect?: NetworkGraphEffect;
  readonly customStyles?: NetworkGraphCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type NetworkGraphHookProps = Pick<
  NetworkGraphProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface NetworkGraphWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
  readonly 'data-crosshair'?: boolean;
}

export interface NetworkGraphCrosshair {
  readonly x: number;
  readonly y: number;
  readonly visible: boolean;
}

export interface NetworkGraphHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: NetworkGraphDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: NetworkGraphWrapperProps;
  readonly crosshair: NetworkGraphCrosshair;
  readonly handlePointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  readonly handlePointerLeave: () => void;
  readonly isReady: boolean;
}