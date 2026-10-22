import type { AlignedData, Options, Series } from 'uplot';

import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type UPlotAppearance = 'solid' | 'smooth' | 'stepped';

export type DownloadFormat = 'png' | 'jpg';

export type UPlotSeriesDefinition = {
  readonly label?: string;
  readonly data: number[];
  readonly color?: string;
  readonly borderColor?: string;
  readonly appearance?: UPlotAppearance;
};

export type UPlotDefinition = {
  readonly labels?: string[];
  readonly series?: UPlotSeriesDefinition[];
  readonly appearance?: UPlotAppearance;
  readonly colors?: string[];
  readonly axisColor?: string;
  readonly gridColor?: string;
  readonly pointFillColor?: string;
};

export type UPlotHoverSeries = {
  readonly label: string;
  readonly value: number | null;
  readonly color: string;
};

export type UPlotHoverInfo = {
  readonly time: string | number;
  readonly series: UPlotHoverSeries[];
};

export type UPlotCursorMoveHandler = (values: UPlotHoverInfo) => void;

export type UPlotRendererOptions = {
  readonly height?: number;
  readonly fileName?: string;

  /**
   * @deprecated Prefer the top-level showDownload prop.
   */
  readonly showDownload?: boolean;

  readonly chartBackground?: string;
} & Record<string, unknown>;

export type UPlotRendererProps = {
  readonly data?: UPlotDefinition;

  readonly options?: UPlotRendererOptions;

  readonly showDownload?: boolean;

  readonly downloadPlacement?: DownloadPlacement;

  readonly customStyles?: ChartCustomStyles;
};

export type UPlotAdapterResult = {
  readonly options: Options;
  readonly data: AlignedData;
};

export type UPlotSeriesLabel = Series['label'];
