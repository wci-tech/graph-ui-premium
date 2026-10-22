import type { DownloadFormat } from '../ChartJS.types';

export const DOWNLOAD_FORMATS: readonly DownloadFormat[] = ['png', 'jpg', 'svg'];

export const DOWNLOAD_ITEMS = DOWNLOAD_FORMATS.map((format) => ({
  id: format,
  label: `${format.toUpperCase()} Image`,
}));

export const CHART_JS_EXPORT_FILE_NAME = 'chart-export';

export const CHART_JS_CSS_VARIABLES = {
  lineColor: '--chartjs-line-color',
  labelColor: '--chartjs-label-color',
} as const;
