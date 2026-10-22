import type { DownloadFormat } from '../ECharts.types';

export const DEFAULT_ECHARTS_HEIGHT = 400;

export const DOWNLOAD_FORMATS: readonly DownloadFormat[] = ['png', 'jpg', 'svg'];

export const DOWNLOAD_ITEMS = DOWNLOAD_FORMATS.map((format) => ({
  id: format,
  label: `${format.toUpperCase()} Image`,
}));

export const DEFAULT_ECHARTS_EXPORT_FILE_NAME = 'echarts-export';
