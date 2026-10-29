import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';

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

export type GaugeMeterEffect = ChartJSEffect;

export interface GaugeMeterColors {
  readonly series?: readonly string[];
  readonly needle?: string;
  readonly label?: string;
  readonly score?: string;
  readonly scoreLabel?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type GaugeMeterResolvedColors =
  Required<GaugeMeterColors>;

export interface GaugeMeterCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
  readonly score?: StyleType;
  readonly scoreValue?: StyleType;
  readonly scoreLabel?: StyleType;
}

export type GaugeMeterOptions = ChartJSOptions & {
  readonly value?: number;
  readonly isBoxVisible?: boolean;
  readonly unit?: string;
  readonly label?: string;
  readonly boundaryLabelColor?: string;
  readonly segmentLabelColor?: string;
  readonly showBoundaryLabels?: boolean;
  readonly showSegmentLabels?: boolean;
  readonly cutout?: string | number;
  readonly boldScore?: boolean;
};

export interface GaugeMeterProps {
  readonly labels: string[];
  readonly data: number[];
  readonly value?: number;

  /**
   * Convenient Gauge Meter color overrides.
   * Unspecified colors fall back to WCI chart tokens.
   */
  readonly colors?: GaugeMeterColors;

  readonly effect?: GaugeMeterEffect;
  readonly options?: GaugeMeterOptions;

  /**
   * Gauge Meter-specific structural styles.
   */
  readonly customStyles?: GaugeMeterCustomStyles;

  /**
   * Shared renderer controls passed to Chartjs.
   */
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;

  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
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
  readonly processedData: ChartJSData;
  readonly gaugeOptions: ChartjsProps['options'] | undefined;
  readonly plugins: NonNullable<ChartjsProps['plugins']>;
  readonly wrapperProps: GaugeMeterWrapperProps;
  readonly resolvedColors: GaugeMeterResolvedColors | undefined;
  readonly resolvedValue: number;
  readonly isReady: boolean;
}