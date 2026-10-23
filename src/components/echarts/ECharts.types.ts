import type { EChartsOption } from 'echarts';

import type { ChartType } from '@/engines/engine.capabilities';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';
import type { DownloadType } from '@/hooks/useEChartsDownload';

export type DownloadFormat = 'png' | 'jpg' | 'svg';

export type BubblePoint = [number, number, number];

export type EChartsSeriesData = number[] | BubblePoint[];

export type SupportedEChartType = ChartType;

export type EChartsSeriesDefinition = {
  label?: string;
  name?: string;
  data: EChartsSeriesData;
  color?: string;
  type?: ChartType;
} & Record<string, unknown>;

export type EChartsDefinition = {
  type?: ChartType;
  labels?: string[];
  series?: EChartsSeriesDefinition[];
} & Record<string, unknown>;

/**
 * height and chartBackground are renderer properties.
 *
 * They are used by the React wrapper and download functionality.
 * They must be removed before calling ECharts setOption().
 */
export type EChartsRendererOptions = EChartsOption & {
  height?: number | string;
  chartBackground?: string;
};

export type EChartsProps = {
  data?: unknown;
  options?: EChartsRendererOptions;
  chartId?: string;
  showDownload?: boolean;
  downloadPlacement?: DownloadPlacement;
  customStyles?: ChartCustomStyles;
  ariaLable?: string;
  downloadText?: string;
};

export type EChartsDownloadItem = {
  id: DownloadType;
  label: string;
};
