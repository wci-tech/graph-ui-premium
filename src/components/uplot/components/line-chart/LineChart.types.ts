import type { OptionalWithUndefined, StyleType } from '@wci-tech/core-ui-premium';

import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type {
  UPlotAppearance,
  UPlotRendererOptions,
  UPlotSeriesDefinition,
} from '../../UPlot.types';

export type LineChartVariant = 'primary' | 'secondary';

export type LineChartEffect = 'none' | 'fade-in';

export type LineChartCustomStyles = {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
};

export type LineChartData = {
  readonly labels?: string[];
  readonly series?: UPlotSeriesDefinition[];
  readonly datasets?: UPlotSeriesDefinition[];
  readonly appearance?: UPlotAppearance;
};

export type LineChartProps = {
  readonly data?: LineChartData | UPlotSeriesDefinition[];

  readonly labels?: string[];

  readonly series?: UPlotSeriesDefinition[];

  readonly options?: UPlotRendererOptions;

  readonly appearance?: UPlotAppearance;

  readonly variant?: LineChartVariant;

  readonly effect?: LineChartEffect;

  readonly customStyles?: LineChartCustomStyles;

  readonly showDownload?: boolean;

  readonly downloadPlacement?: DownloadPlacement;

  readonly rendererCustomStyles?: ChartCustomStyles;

  readonly className?: string;

  readonly testId?: string;
};

export type LineChartStyleProps = OptionalWithUndefined<Pick<LineChartProps, 'variant'>>;
