import type { RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type {
  ChartCustomStyles,
  DownloadPlacement,
} from '@/engines/engine.types';

import type { GaugeMeterDefinition } from './base/BaseGaugeMeter.utils';

export type GaugeMeterEffect = EChartsEffect;

export interface GaugeMeterColors {
  readonly series?: string[];
  readonly needle?: string;
  readonly label?: string;
  readonly score?: string;
  readonly scoreLabel?: string;
  readonly axisLine?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type GaugeMeterResolvedColors = Required<GaugeMeterColors>;

export interface GaugeMeterCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type GaugeMeterOptions = EChartsOption & {
  readonly value?: number;
  readonly unit?: string;
  readonly label?: string;
  readonly min?: number;
  readonly max?: number;
  readonly splitNumber?: number;
  readonly startAngle?: number;
  readonly endAngle?: number;
  readonly radius?: string | number;
  readonly center?: [string | number, string | number];
  readonly axisLineWidth?: number;
  readonly pointerLength?: string;
  readonly pointerWidth?: number;
  readonly showBoundaryLabels?: boolean;
  readonly showSegmentLabels?: boolean;
  readonly boldScore?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface GaugeMeterProps {
  readonly labels: string[];
  readonly data: number[];
  readonly value?: number;
  readonly colors?: GaugeMeterColors;
  readonly options?: GaugeMeterOptions;
  readonly chartId?: string;
  readonly effect?: GaugeMeterEffect;
  readonly customStyles?: GaugeMeterCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type GaugeMeterHookProps = Pick<
  GaugeMeterProps,
  | 'labels'
  | 'data'
  | 'value'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface GaugeMeterWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface GaugeMeterHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: GaugeMeterDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: GaugeMeterWrapperProps;
  readonly isReady: boolean;
}