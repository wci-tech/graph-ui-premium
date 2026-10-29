import type { PointerEventHandler, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { PieChartDefinition } from './base/BasePieChart.utils';

export type PieChartEffect = EChartsEffect;

export interface PieChartData {
  readonly labels: string[];
  readonly data: number[];
}

export interface PieChartColors {
  readonly series?: readonly string[];
  readonly label?: string;
  readonly border?: string;
  readonly crosshair?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type PieChartResolvedColors = Required<PieChartColors>;

export interface PieChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type PieChartOptions = EChartsOption & {
  readonly height?: number | string;
  readonly crosshair?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly isBoxVisible?: boolean;
  readonly chartBackground?: string;
};

export interface PieChartProps {
  readonly data: PieChartData;
  readonly colors?: PieChartColors;
  readonly options?: PieChartOptions;
  readonly chartId?: string;
  readonly effect?: PieChartEffect;
  readonly customStyles?: PieChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type PieChartHookProps = Pick<
  PieChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface PieChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
  readonly 'data-crosshair-enabled'?: boolean;
}

export interface CrosshairPosition {
  readonly x: number;
  readonly y: number;
  readonly visible: boolean;
}

export interface CrosshairStyleProps {
  readonly x: number;
  readonly y: number;
  readonly color: string;
}

export interface PieChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: PieChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: PieChartWrapperProps;
  readonly crosshairPosition: CrosshairPosition;
  readonly crosshairEnabled: boolean;
  readonly handlePointerMove: PointerEventHandler<HTMLDivElement>;
  readonly handlePointerLeave: () => void;
  readonly isReady: boolean;
}