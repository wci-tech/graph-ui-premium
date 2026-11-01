import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';

import type { ChartJSData, ChartJSOptions, ChartjsProps } from '@/components/chartjs/ChartJS.types';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type NetworkGraphEffect = ChartJSEffect;

export interface NetworkGraphNode {
  readonly id: string | number;
  readonly label: string;
  readonly size?: number;
  readonly color?: string;
}

export interface NetworkGraphEdge {
  readonly from: string | number;
  readonly to: string | number;
  readonly color?: string;
}

export interface NetworkGraphData {
  readonly nodes: NetworkGraphNode[];
  readonly edges: NetworkGraphEdge[];
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

export type NetworkGraphOptions = ChartJSOptions & {
  readonly isBoxVisible?: boolean;
  readonly chartBackground?: string;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly nodeRadius?: number;
  readonly nodeHoverRadius?: number;
  readonly edgeWidth?: number;
  readonly linkDistance?: number;
  readonly manyBodyStrength?: number;
  readonly simulationIterations?: number;
  readonly crosshair?: boolean;
};

export interface NetworkGraphProps {
  readonly data: NetworkGraphData;
  readonly colors?: NetworkGraphColors;
  readonly effect?: NetworkGraphEffect;
  readonly options?: NetworkGraphOptions;
  readonly customStyles?: NetworkGraphCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type NetworkGraphHookProps = Pick<
  NetworkGraphProps,
  | 'data'
  | 'colors'
  | 'effect'
  | 'options'
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

export interface NetworkGraphHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly networkOptions: ChartjsProps['options'] | undefined;
  readonly plugins: NonNullable<ChartjsProps['plugins']>;
  readonly wrapperProps: NetworkGraphWrapperProps;
  readonly isReady: boolean;
}