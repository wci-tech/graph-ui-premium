import { type RefObject, useCallback } from 'react';

import type { DownloadFormat } from '../ChartJS.types';
import { CHART_JS_EXPORT_FILE_NAME } from '../utils/ChartJS.constants';
import { createSvgDownloadUrl } from '../utils/ChartJS.utils';

const IMAGE_MIME_TYPES = {
  png: 'image/png',
  jpg: 'image/jpeg',
} as const;

const createDownloadUrl = (
  canvas: HTMLCanvasElement,
  format: DownloadFormat,
): string =>
  format === 'svg'
    ? createSvgDownloadUrl(canvas)
    : canvas.toDataURL(IMAGE_MIME_TYPES[format]);

export const useChartDownload = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
) => {
  const handleDownload = useCallback(
    (format: DownloadFormat) => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const downloadUrl = createDownloadUrl(canvas, format);

      const link = document.createElement('a');

      link.href = downloadUrl;
      link.download = `${CHART_JS_EXPORT_FILE_NAME}.${format}`;

      link.click();

      if (format === 'svg') {
        URL.revokeObjectURL(downloadUrl);
      }
    },
    [canvasRef],
  );

  return {
    handleDownload,
  };
};
