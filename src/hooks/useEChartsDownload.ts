import type React from 'react';

import type { Chart as ChartJS } from 'chart.js';
import type * as echarts from 'echarts';
import type uPlot from 'uplot';

export type DownloadType = 'png' | 'jpg' | 'svg';

type EChartsDownloadType = 'png' | 'jpeg' | 'svg';

export type SupportedChartType = 'echarts' | 'chartjs' | 'uplot';

type SupportedChartInstance = echarts.ECharts | ChartJS | uPlot;

export type UseChartDownloadOptions = {
  fileName?: string;
  backgroundColor?: string;
  pixelRatio?: number;
  excludeComponents?: string[];
};

const DEFAULT_FILE_NAME = 'chart-export';
const DEFAULT_PIXEL_RATIO = 2;

const isEChartsInstance = (instance: SupportedChartInstance): instance is echarts.ECharts => {
  return 'getDataURL' in instance;
};

const isChartJSInstance = (instance: SupportedChartInstance): instance is ChartJS => {
  return 'canvas' in instance;
};

const isUPlotInstance = (instance: SupportedChartInstance): instance is uPlot => {
  return 'root' in instance;
};

const getImageType = (type: DownloadType): EChartsDownloadType => {
  return type === 'jpg' ? 'jpeg' : type;
};

const downloadUrl = (url: string, fileName: string, type: DownloadType): void => {
  const link = document.createElement('a');

  link.href = url;
  link.download = `${fileName}-${Date.now()}.${type}`;
  link.click();
};

export const useEChartsDownload = (
  instanceRef: React.RefObject<SupportedChartInstance | null>,
  chartType: SupportedChartType,
  options: UseChartDownloadOptions = {},
) => {
  const {
    fileName = DEFAULT_FILE_NAME,
    backgroundColor,
    pixelRatio = DEFAULT_PIXEL_RATIO,
    excludeComponents = ['toolbox'],
  } = options;

  const handleDownload = (type: DownloadType): void => {
    const instance = instanceRef.current;

    if (!instance) {
      console.warn('Download failed: Chart instance not initialized.');
      return;
    }

    const imageType = getImageType(type);
    let url = '';

    if (chartType === 'echarts' && isEChartsInstance(instance)) {
      url = instance.getDataURL({
        type: imageType,
        pixelRatio,
        excludeComponents,
        ...(backgroundColor ? { backgroundColor } : {}),
      });
    }

    if (chartType === 'chartjs' && isChartJSInstance(instance)) {
      url = instance.canvas.toDataURL(`image/${imageType}`);
    }

    if (chartType === 'uplot' && isUPlotInstance(instance)) {
      const canvas = instance.root.querySelector('canvas');

      if (!(canvas instanceof HTMLCanvasElement)) {
        console.warn('uPlot canvas not found.');
        return;
      }

      url = canvas.toDataURL(`image/${imageType}`);
    }

    if (!url) {
      console.warn(`Download not supported for ${chartType}`);
      return;
    }

    downloadUrl(url, fileName, type);
  };

  return {
    handleDownload,
  };
};
