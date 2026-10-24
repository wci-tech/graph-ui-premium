import type { ScriptableContext } from 'chart.js';
import type {
  ChartData,
  ChartDataset,
  ChartType as ChartJSNativeType,
  EasingFunction,
  Plugin,
} from 'chart.js/auto';

import type { ChartType } from '@/engines/engine.capabilities';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type DownloadFormat = 'png' | 'jpg' | 'svg';

export type LineAppearance = 'solid' | 'smooth' | 'dashed' | 'dotted' | 'stepped';

export type ChartValue =
  | number
  | [number, number]
  | { x: number | string | Date; y: number }
  | { x: number | string | Date; y: number; r: number }
  | Record<string, unknown>
  | null;

export type ChartColor = string | CanvasGradient | CanvasPattern;

export type ScriptableChartColor =
  | ChartColor
  | ((context: ScriptableContext<'line'>) => ChartColor | null);

export type ChartAnimationConfig = {
  duration?: number;
  easing?: EasingFunction;
  cssKeyframes?: string;
};

export type ChartJSDataset = {
  label?: string;
  data?: ChartValue[];
  type?: ChartType;
  color?: ChartColor;
  borderColor?: ChartColor;
  backgroundColor?: ScriptableChartColor;
  borderWidth?: number;
  pointRadius?: number;
  pointBackgroundColor?: ChartColor;
  pointBorderColor?: ChartColor;
  pointBorderWidth?: number;
  fill?: boolean;
  tension?: number;
  clip?: boolean | number | Record<string, number>;
  animation?: ChartAnimationConfig;
} & Record<string, unknown>;

export type ChartJSData = {
  labels?: string[];
  datasets?: ChartJSDataset[];
  series?: ChartJSDataset[];
};

export type ChartJSOptions = {
  height?: number | string;
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  resizeDelay?: number;
  scales?: Record<string, unknown>;
  animation?: Record<string, unknown> & {
    duration?: number;
    easing?: EasingFunction;
  };
  interaction?: Record<string, unknown>;
} & Record<string, unknown>;

export type ChartjsProps = {
  type: ChartType;
  data: ChartJSData;
  options?: ChartJSOptions;
  plugins?: Plugin<ChartJSNativeType>[];
  showDownload?: boolean;
  downloadPlacement?: DownloadPlacement;
  customStyles?: ChartCustomStyles;
  ariaLable?: string;
  downloadText?: string;
};

export type LineSeries = {
  label: string;
  data: number[];
  color?: string;
  appearance?: LineAppearance;
  fill?: boolean;
  animation?: ChartAnimationConfig;
};

export type LineChartDefinition = {
  labels: string[];
  series?: LineSeries[];
  datasets?: LineSeries[];
};

export type LineChartData = ChartData<'line'>;
export type LineChartDataset = ChartDataset<'line'>;
