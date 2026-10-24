import type { RefObject } from 'react';

import type { OptionalWithUndefined, StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { CandlestickChartDefinition } from './base/BaseCandlestickChart.utils';

export type CandlestickChartEffect = EChartsEffect;

export interface CandlestickChartPoint {
  readonly t: string | number | Date;
  readonly o: number | string;
  readonly h: number | string;
  readonly l: number | string;
  readonly c: number | string;
  readonly v: number | string;
}

export interface CandlestickChartData {
  readonly labels: string[];
  readonly series: readonly CandlestickChartPoint[];
}

export interface CandlestickChartColors {
  readonly up?: string;
  readonly down?: string;
  readonly unchanged?: string;
  readonly volumeUp?: string;
  readonly volumeDown?: string;
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly crosshair?: string;
  readonly crosshairLabelBackground?: string;
  readonly crosshairLabelText?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type CandlestickChartResolvedColors = Required<CandlestickChartColors>;

export interface CandlestickChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type CandlestickChartOptions = EChartsOption & {
  readonly crosshair?: boolean;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface CandlestickChartProps {
  readonly data: CandlestickChartData;
  readonly colors?: CandlestickChartColors;
  readonly options?: CandlestickChartOptions;
  readonly chartId?: string;
  readonly effect?: CandlestickChartEffect;
  readonly customStyles?: CandlestickChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type CandlestickChartHookProps = Pick<
  CandlestickChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface CandlestickChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface CandlestickChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: CandlestickChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: CandlestickChartWrapperProps;
  readonly isReady: boolean;
}

export type CandlestickChartStyleProps = OptionalWithUndefined<
  Pick<CandlestickChartProps, 'effect'>
>;