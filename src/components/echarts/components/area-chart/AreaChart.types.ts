import type { RefObject } from 'react';

import type { OptionalWithUndefined, StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { AreaChartDefinition } from './base/BaseAreaChart.utils';

export type AreaChartAppearance = 'basic' | 'smooth';

export type AreaChartEffect = EChartsEffect;

export interface AreaChartSeries {
  readonly label: string;
  readonly data: number[];
  readonly color?: string;
  readonly pointColor?: string;
  readonly pointRadius?: number;
  readonly borderWidth?: number;
}

export interface AreaChartData {
  readonly labels: string[];
  readonly series: AreaChartSeries[];
}

export interface AreaChartColors {
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

/**
 * Internal resolved colors.
 *
 * CSS variables and consumer overrides have already
 * been converted to values that can be used by ECharts.
 */
export type AreaChartResolvedColors = Required<AreaChartColors>;

export interface AreaChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type AreaChartOptions = EChartsOption & {
  readonly crosshair?: boolean;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface AreaChartProps {
  readonly data: AreaChartData;
  readonly colors?: AreaChartColors;
  readonly options?: AreaChartOptions;
  readonly chartId?: string;
  readonly appearance?: AreaChartAppearance;
  readonly effect?: AreaChartEffect;
  readonly customStyles?: AreaChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

/* -------------------------------------------------------------------------- */
/* Hook Types                                                                  */
/* -------------------------------------------------------------------------- */

export type AreaChartHookProps = Pick<
  AreaChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'appearance'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface AreaChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-appearance'?: string;
  readonly 'data-effect'?: string;
}

export interface AreaChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: AreaChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: AreaChartWrapperProps;
  readonly isReady: boolean;
}

/* -------------------------------------------------------------------------- */
/* Style Types                                                                 */
/* -------------------------------------------------------------------------- */

export type AreaChartStyleProps = OptionalWithUndefined<Pick<AreaChartProps, 'appearance'>>;