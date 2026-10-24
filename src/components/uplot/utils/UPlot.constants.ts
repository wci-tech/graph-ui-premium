import type { DownloadFormat } from '../UPlot.types';

export const DEFAULT_UPLOT_HEIGHT = 400;

export const DEFAULT_UPLOT_EXPORT_FILE_NAME = 'uplot-export';

export const DOWNLOAD_FORMATS: readonly DownloadFormat[] = ['png', 'jpg'];

export const DOWNLOAD_ITEMS = DOWNLOAD_FORMATS.map((format) => ({
  id: format,
  label: `${format.toUpperCase()} Image`,
}));
