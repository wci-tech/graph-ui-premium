import { compactObject } from '@wci-tech/core-ui-premium';
import type { ChartConfiguration, ChartType as ChartJSNativeType } from 'chart.js/auto';

import type { ChartJSData, ChartJSDataset, ChartJSOptions, ChartjsProps } from '../ChartJS.types';

import { CHART_JS_CSS_VARIABLES } from './ChartJS.constants';

export const getDatasets = (data: ChartJSData): ChartJSDataset[] =>
  data.datasets ?? data.series ?? [];

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const getScaleOptions = (
  scales: Record<string, unknown> | undefined,
  key: string,
): Record<string, unknown> => {
  const scale = scales?.[key];

  return isRecord(scale) ? scale : {};
};

export const getChartJSType = (type: ChartjsProps['type']): ChartJSNativeType => {
  if (type === 'bar-line') return 'bar';
  if (type === 'donut') return 'doughnut' as ChartJSNativeType;
  if (type === 'heatmap') return 'matrix' as ChartJSNativeType;

  return type as ChartJSNativeType;
};

export const getCanvasCssVariable = (
  canvas: HTMLCanvasElement,
  variableName: string,
): string | undefined => {
  const value = getComputedStyle(canvas).getPropertyValue(variableName).trim();

  return value || undefined;
};

export const createDataset = (
  dataset: ChartJSDataset,
  resolvedLineColor?: string,
): ChartJSDataset =>
  compactObject({
    ...dataset,
    borderColor: dataset.borderColor ?? dataset.color ?? resolvedLineColor,
    backgroundColor: dataset.backgroundColor ?? 'transparent',
  });

export const createChartOptions = ({
  canvas,
  options,
  firstDatasetAnimation,
}: {
  canvas: HTMLCanvasElement;
  options?: ChartJSOptions;
  firstDatasetAnimation?: ChartJSDataset['animation'];
}): ChartJSOptions => {
  const resolvedLabelColor = getCanvasCssVariable(canvas, CHART_JS_CSS_VARIABLES.labelColor);

  const xScaleOptions = getScaleOptions(options?.scales, 'x');
  const xTickOptions = isRecord(xScaleOptions['ticks']) ? xScaleOptions['ticks'] : {};

  return compactObject({
    ...options,
    responsive: true,
    maintainAspectRatio: false,
    animation: compactObject({
      ...options?.animation,
      duration: firstDatasetAnimation?.duration ?? options?.animation?.duration,
      easing: firstDatasetAnimation?.easing ?? options?.animation?.easing,
    }),
    scales: compactObject({
      ...options?.scales,
      x: compactObject({
        ...xScaleOptions,
        ticks: compactObject({
          ...xTickOptions,
          color: xTickOptions['color'] ?? resolvedLabelColor,
        }),
      }),
    }),
  }) as ChartJSOptions;
};

export const createChartConfig = ({
  canvas,
  type,
  data,
  options,
  plugins,
  datasets,
}: {
  canvas: HTMLCanvasElement;
  type: ChartjsProps['type'];
  data: ChartJSData;
  options?: ChartJSOptions;
  plugins: ChartjsProps['plugins'];
  datasets: ChartJSDataset[];
}): ChartConfiguration<ChartJSNativeType> => {
  const resolvedLineColor = getCanvasCssVariable(canvas, CHART_JS_CSS_VARIABLES.lineColor);

  return {
    type: getChartJSType(type),
    data: {
      labels: data.labels ?? [],
      datasets: datasets.map((dataset) => createDataset(dataset, resolvedLineColor)),
    },
    plugins,
    options: createChartOptions(
      compactObject({
        canvas,
        options,
        firstDatasetAnimation: datasets[0]?.animation,
      }),
    ),
  } as unknown as ChartConfiguration<ChartJSNativeType>;
};

export const createSvgDownloadUrl = (canvas: HTMLCanvasElement): string => {
  const svgNamespace = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNamespace, 'svg');
  const foreignObject = document.createElementNS(svgNamespace, 'foreignObject');

  foreignObject.setAttribute('width', canvas.width.toString());
  foreignObject.setAttribute('height', canvas.height.toString());

  const image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');

  image.setAttribute('src', canvas.toDataURL('image/png'));
  image.setAttribute('width', canvas.width.toString());
  image.setAttribute('height', canvas.height.toString());

  foreignObject.appendChild(image);
  svg.appendChild(foreignObject);
  svg.setAttribute('xmlns', svgNamespace);

  const svgString = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgString], { type: 'image/svg+xml' });

  return URL.createObjectURL(blob);
};
