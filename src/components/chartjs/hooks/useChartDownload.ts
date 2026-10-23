import { useCallback } from 'react';

import type { DownloadFormat } from '../ChartJS.types';
import { CHART_JS_EXPORT_FILE_NAME } from '../utils/ChartJS.constants';
import { createSvgDownloadUrl } from '../utils/ChartJS.utils';

const IMAGE_MIME_TYPES = {
  png: 'image/png',
  jpg: 'image/jpeg',
} as const;

export const useChartDownload = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) => {
  const handleDownload = useCallback(
    (format: DownloadFormat) => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const link = document.createElement('a');

      if (format === 'svg') {
        const objectUrl = createSvgDownloadUrl(canvas);

        link.href = objectUrl;
        link.download = `${CHART_JS_EXPORT_FILE_NAME}.svg`;
        link.click();

        URL.revokeObjectURL(objectUrl);

        return;
      }

      const mimeType = IMAGE_MIME_TYPES[format];

      link.href = canvas.toDataURL(mimeType);
      link.download = `${CHART_JS_EXPORT_FILE_NAME}.${format}`;
      link.click();
    },
    [canvasRef],
  );

  return {
    handleDownload,
  };
};
