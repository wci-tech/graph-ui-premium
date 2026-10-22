import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type ChartRendererProps = {
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
};
