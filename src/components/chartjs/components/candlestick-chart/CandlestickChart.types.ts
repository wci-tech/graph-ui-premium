import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import type {
  ChartJSData,
  ChartJSOptions,
  ChartjsProps,
} from '@/components/chartjs/ChartJS.types';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
  ChartCustomStyles,
  DownloadPlacement,
} from '@/engines/engine.types';

export type CandlestickChartEffect = ChartJSEffect;

export interface CandlestickChartPoint {
  readonly t: string | number | Date;
  readonly o: number | string;
  readonly h: number | string;
  readonly l: number | string;
  readonly c: number | string;
  readonly v: number | string;
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

export type CandlestickChartResolvedColors =
  Required<CandlestickChartColors>;

export interface CandlestickChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type CandlestickChartOptions = ChartJSOptions & {
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly showLegend?: boolean;
  readonly isBoxVisible?: boolean;
  readonly chartBackground?: string;
  readonly timeUnit?: 'day' | 'week' | 'month' | 'quarter' | 'year';
  readonly crosshair?: boolean;
  readonly onClick?: (
    event: ChartEvent,
    elements: ActiveElement[],
  ) => void;
};

export interface CandlestickChartProps {
  readonly data: CandlestickChartPoint[];
  readonly colors?: CandlestickChartColors;
  readonly effect?: CandlestickChartEffect;
  readonly options?: CandlestickChartOptions;
  readonly customStyles?: CandlestickChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
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
  readonly processedData: ChartJSData;
  readonly candlestickOptions: ChartjsProps['options'] | undefined;
  readonly wrapperProps: CandlestickChartWrapperProps;
  readonly isReady: boolean;
}