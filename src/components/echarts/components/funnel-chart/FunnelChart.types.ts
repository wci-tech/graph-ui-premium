import type { RefObject } from 'react';

import type { OptionalWithUndefined, StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption, FunnelSeriesOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { FunnelChartDefinition } from './base/BaseFunnelChart.utils';

export type FunnelChartEffect = EChartsEffect;
export type FunnelChartAlignment = NonNullable<FunnelSeriesOption['funnelAlign']>;
export type FunnelChartSort = NonNullable<FunnelSeriesOption['sort']>;

export interface FunnelChartSeries {
  readonly label: string;
  readonly data: number[];
  readonly colors?: string[];
}

export interface FunnelChartData {
  readonly labels: string[];
  readonly series: FunnelChartSeries[];
}

export interface FunnelChartColors {
  readonly series?: string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type FunnelChartResolvedColors = Required<FunnelChartColors>;

export interface FunnelChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type FunnelChartOptions = EChartsOption & {
  readonly funnelAlign?: FunnelChartAlignment;
  readonly sort?: FunnelChartSort;
  readonly gap?: number;
  readonly minSize?: string;
  readonly maxSize?: string;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly crosshair?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface FunnelChartProps {
  readonly data: FunnelChartData;
  readonly colors?: FunnelChartColors;
  readonly options?: FunnelChartOptions;
  readonly chartId?: string;
  readonly effect?: FunnelChartEffect;
  readonly customStyles?: FunnelChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type FunnelChartHookProps = Pick<
  FunnelChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface FunnelChartCrosshairPosition {
  readonly x: number;
  readonly y: number;
  readonly visible: boolean;
}

export interface FunnelChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
  readonly 'data-crosshair'?: boolean;
}

export interface FunnelChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: FunnelChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: FunnelChartWrapperProps;
  readonly crosshair: FunnelChartCrosshairPosition;
  readonly crosshairEnabled: boolean;
  readonly handlePointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  readonly handlePointerLeave: () => void;
  readonly isReady: boolean;
}

export type FunnelChartStyleProps = OptionalWithUndefined<
  Pick<FunnelChartProps, 'effect'>
>;