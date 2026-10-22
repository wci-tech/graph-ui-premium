import { useCallback } from 'react';

import type { DownloadFormat } from '../ChartJS.types';
import { CHART_JS_EXPORT_FILE_NAME } from '../utils/ChartJS.constants';
import { createSvgDownloadUrl } from '../utils/ChartJS.utils';

export const useChartDownload = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  const handleDownload = useCallback(
    (format: DownloadFormat) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const link = document.createElement('a');

      if (format === 'svg') {
        const objectUrl = createSvgDownloadUrl(canvas);

        link.href = objectUrl;
        link.download = `${CHART_JS_EXPORT_FILE_NAME}.svg`;
        link.click();

        URL.revokeObjectURL(objectUrl);

        return;
      }

      const imageType = format === 'jpg' ? 'jpeg' : format;

      link.href = canvas.toDataURL(`image/${imageType}`);
      link.download = `${CHART_JS_EXPORT_FILE_NAME}.${format}`;
      link.click();
    },
    [canvasRef],
  );

  return {
    handleDownload,
  };
};
