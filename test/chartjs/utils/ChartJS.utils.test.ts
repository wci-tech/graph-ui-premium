import type { ChartConfiguration, ChartType as ChartJSNativeType } from 'chart.js/auto';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { compactObject } from '@wci-tech/core-ui-premium';

import type {
  ChartJSDataset,
  ChartJSData,
  ChartJSOptions,
  ChartjsProps,
} from '@/components/chartjs/ChartJS.types';
import { CHART_JS_CSS_VARIABLES } from '@/components/chartjs/utils/ChartJS.constants';
import {
  createChartConfig,
  createChartOptions,
  createDataset,
  createSvgDownloadUrl,
  getCanvasCssVariable,
  getChartJSType,
  getDatasets,
  getScaleOptions,
  isRecord,
} from '@/components/chartjs/utils/ChartJS.utils';

const { compactObjectMock } = vi.hoisted(() => ({
  compactObjectMock: vi.fn(
    <T extends Record<string, unknown>>(source: T): Partial<T> =>
      Object.fromEntries(
        Object.entries(source).filter(([, value]) => value !== undefined),
      ) as Partial<T>,
  ),
}));

vi.mock('@wci-tech/core-ui-premium', () => ({
  compactObject: compactObjectMock,
}));

describe('ChartJS.utils', () => {
  const mockCompactObject = vi.mocked(compactObject);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getDatasets', () => {
    it('returns datasets when datasets are supplied', () => {
      const datasets: ChartJSDataset[] = [
        {
          label: 'Sales',
          data: [10, 20],
        },
      ];

      const data: ChartJSData = {
        labels: ['January', 'February'],
        datasets,
      };

      expect(getDatasets(data)).toBe(datasets);
    });

    it('returns series when datasets are not supplied', () => {
      const series: ChartJSDataset[] = [
        {
          label: 'Revenue',
          data: [30, 40],
        },
      ];

      const data: ChartJSData = {
        labels: ['March', 'April'],
        series,
      };

      expect(getDatasets(data)).toBe(series);
    });

    it('prefers datasets over series', () => {
      const datasets: ChartJSDataset[] = [
        {
          label: 'Datasets',
          data: [10],
        },
      ];

      const series: ChartJSDataset[] = [
        {
          label: 'Series',
          data: [20],
        },
      ];

      const data: ChartJSData = {
        datasets,
        series,
      };

      expect(getDatasets(data)).toBe(datasets);
    });

    it('returns an empty array when datasets and series are not supplied', () => {
      const data: ChartJSData = {};

      expect(getDatasets(data)).toEqual([]);
    });
  });

  describe('isRecord', () => {
    it('returns true for a plain object', () => {
      expect(isRecord({ value: 1 })).toBe(true);
    });

    it('returns true for an empty object', () => {
      expect(isRecord({})).toBe(true);
    });

    it('returns false for null', () => {
      expect(isRecord(null)).toBe(false);
    });

    it('returns false for an array', () => {
      expect(isRecord([])).toBe(false);
    });

    it.each([undefined, 'value', 1, true, Symbol('value'), () => undefined])(
      'returns false for non-object value %s',
      (value) => {
        expect(isRecord(value)).toBe(false);
      },
    );
  });

  describe('getScaleOptions', () => {
    it('returns the requested scale configuration', () => {
      const xScale = {
        display: true,
        beginAtZero: true,
      };

      const scales: Record<string, unknown> = {
        x: xScale,
      };

      expect(getScaleOptions(scales, 'x')).toBe(xScale);
    });

    it('returns an empty object when scales are undefined', () => {
      expect(getScaleOptions(undefined, 'x')).toEqual({});
    });

    it('returns an empty object when the requested scale is missing', () => {
      expect(getScaleOptions({}, 'x')).toEqual({});
    });

    it.each([null, [], 'invalid', 10, true])(
      'returns an empty object when the scale value is not a record',
      (value) => {
        expect(
          getScaleOptions(
            {
              x: value,
            },
            'x',
          ),
        ).toEqual({});
      },
    );
  });

  describe('getChartJSType', () => {
    it.each<{
      sourceType: ChartjsProps['type'];
      expectedType: ChartJSNativeType;
    }>([
      {
        sourceType: 'bar-line',
        expectedType: 'bar',
      },
      {
        sourceType: 'donut',
        expectedType: 'doughnut',
      },
      {
        sourceType: 'heatmap',
        expectedType: 'matrix' as ChartJSNativeType,
      },
      {
        sourceType: 'bar',
        expectedType: 'bar',
      },
      {
        sourceType: 'line',
        expectedType: 'line',
      },
      {
        sourceType: 'pie',
        expectedType: 'pie',
      },
    ])('converts $sourceType to $expectedType', ({ sourceType, expectedType }) => {
      expect(getChartJSType(sourceType)).toBe(expectedType);
    });
  });

  describe('getCanvasCssVariable', () => {
    it('returns a trimmed CSS variable value', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn(() => '  #3155e7  '),
      } as unknown as CSSStyleDeclaration);

      expect(getCanvasCssVariable(canvas, CHART_JS_CSS_VARIABLES.lineColor)).toBe('#3155e7');
    });

    it('returns undefined when the CSS variable is empty', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn(() => '   '),
      } as unknown as CSSStyleDeclaration);

      expect(getCanvasCssVariable(canvas, CHART_JS_CSS_VARIABLES.lineColor)).toBeUndefined();
    });

    it('requests the supplied CSS variable name', () => {
      const canvas = document.createElement('canvas');
      const getPropertyValue = vi.fn(() => '#111827');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue,
      } as unknown as CSSStyleDeclaration);

      getCanvasCssVariable(canvas, CHART_JS_CSS_VARIABLES.labelColor);

      expect(getPropertyValue).toHaveBeenCalledTimes(1);
      expect(getPropertyValue).toHaveBeenCalledWith(CHART_JS_CSS_VARIABLES.labelColor);
    });
  });

  describe('createDataset', () => {
    it('preserves the supplied border and background colors', () => {
      const dataset: ChartJSDataset = {
        label: 'Sales',
        data: [10, 20],
        borderColor: '#111827',
        backgroundColor: '#e5e7eb',
      };

      expect(createDataset(dataset, '#3155e7')).toEqual({
        label: 'Sales',
        data: [10, 20],
        borderColor: '#111827',
        backgroundColor: '#e5e7eb',
      });
    });

    it('uses dataset color when borderColor is not supplied', () => {
      const dataset: ChartJSDataset = {
        label: 'Sales',
        data: [10, 20],
        color: '#763d6c',
      };

      expect(createDataset(dataset, '#3155e7')).toEqual({
        label: 'Sales',
        data: [10, 20],
        color: '#763d6c',
        borderColor: '#763d6c',
        backgroundColor: 'transparent',
      });
    });

    it('uses the resolved line color when borderColor and color are missing', () => {
      const dataset: ChartJSDataset = {
        label: 'Sales',
        data: [10, 20],
      };

      expect(createDataset(dataset, '#3155e7')).toEqual({
        label: 'Sales',
        data: [10, 20],
        borderColor: '#3155e7',
        backgroundColor: 'transparent',
      });
    });

    it('removes borderColor when no color can be resolved', () => {
      const dataset: ChartJSDataset = {
        label: 'Sales',
        data: [10, 20],
      };

      expect(createDataset(dataset)).toEqual({
        label: 'Sales',
        data: [10, 20],
        backgroundColor: 'transparent',
      });
    });

    it('calls compactObject with the resolved dataset', () => {
      const dataset: ChartJSDataset = {
        label: 'Sales',
        data: [10, 20],
      };

      createDataset(dataset, '#3155e7');

      expect(mockCompactObject).toHaveBeenCalledWith({
        label: 'Sales',
        data: [10, 20],
        borderColor: '#3155e7',
        backgroundColor: 'transparent',
      });
    });
  });

  describe('createChartOptions', () => {
    it('creates the default responsive chart options', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn(() => ''),
      } as unknown as CSSStyleDeclaration);

      expect(
        createChartOptions({
          canvas,
        }),
      ).toEqual({
        responsive: true,
        maintainAspectRatio: false,
        animation: {},
        scales: {
          x: {
            ticks: {},
          },
        },
      });
    });

    it('preserves supplied options', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn(() => ''),
      } as unknown as CSSStyleDeclaration);

      const options: ChartJSOptions = {
        responsive: false,
        maintainAspectRatio: true,
        indexAxis: 'y',
      };

      const result = createChartOptions({
        canvas,
        options,
      });

      expect(result).toMatchObject({
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
      });
    });

    it('uses animation values from the first dataset', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn(() => ''),
      } as unknown as CSSStyleDeclaration);

      const options: ChartJSOptions = {
        animation: {
          duration: 400,
          easing: 'linear',
        },
      };

      const result = createChartOptions({
        canvas,
        options,
        firstDatasetAnimation: {
          duration: 900,
          easing: 'easeOutBounce',
        },
      });

      expect(result.animation).toEqual({
        duration: 900,
        easing: 'easeOutBounce',
      });
    });

    it('falls back to option animation values', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn(() => ''),
      } as unknown as CSSStyleDeclaration);

      const options: ChartJSOptions = {
        animation: {
          duration: 500,
          easing: 'easeInOutQuad',
        },
      };

      const result = createChartOptions({
        canvas,
        options,
      });

      expect(result.animation).toEqual({
        duration: 500,
        easing: 'easeInOutQuad',
      });
    });

    it('uses the resolved label color for x-axis ticks', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn((variableName: string) =>
          variableName === CHART_JS_CSS_VARIABLES.labelColor ? ' #4b5563 ' : '',
        ),
      } as unknown as CSSStyleDeclaration);

      const result = createChartOptions({
        canvas,
      });

      expect(result.scales?.['x']).toEqual({
        ticks: {
          color: '#4b5563',
        },
      });
    });

    it('preserves an existing x-axis tick color', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn(() => '#4b5563'),
      } as unknown as CSSStyleDeclaration);

      const options = {
        scales: {
          x: {
            ticks: {
              color: '#111827',
              padding: 12,
            },
          },
        },
      } as ChartJSOptions;

      const result = createChartOptions({
        canvas,
        options,
      });

      expect(result.scales?.['x']).toEqual({
        ticks: {
          color: '#111827',
          padding: 12,
        },
      });
    });

    it('preserves existing x-axis options', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn(() => ''),
      } as unknown as CSSStyleDeclaration);

      const options = {
        scales: {
          x: {
            display: false,
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      } as ChartJSOptions;

      const result = createChartOptions({
        canvas,
        options,
      });

      expect(result.scales?.['x']).toEqual({
        display: false,
        grid: {
          display: false,
        },
        ticks: {},
      });

      expect(result.scales?.['y']).toEqual({
        beginAtZero: true,
      });
    });

    it('uses an empty tick configuration when x ticks are not a record', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn(() => '#4b5563'),
      } as unknown as CSSStyleDeclaration);

      const options = {
        scales: {
          x: {
            ticks: null,
          },
        },
      } as unknown as ChartJSOptions;

      const result = createChartOptions({
        canvas,
        options,
      });

      expect(result.scales?.['x']).toEqual({
        ticks: {
          color: '#4b5563',
        },
      });
    });
  });

  describe('createChartConfig', () => {
    it('creates a complete ChartJS configuration', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn((variableName: string) => {
          if (variableName === CHART_JS_CSS_VARIABLES.lineColor) {
            return '#3155e7';
          }

          if (variableName === CHART_JS_CSS_VARIABLES.labelColor) {
            return '#4b5563';
          }

          return '';
        }),
      } as unknown as CSSStyleDeclaration);

      const data: ChartJSData = {
        labels: ['January', 'February'],
      };

      const datasets: ChartJSDataset[] = [
        {
          label: 'Sales',
          data: [10, 20],
          animation: {
            duration: 700,
            easing: 'easeOutQuart',
          },
        },
      ];

      const plugins: NonNullable<ChartjsProps['plugins']> = [
        {
          id: 'test-plugin',
        },
      ];

      const options: ChartJSOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      const result = createChartConfig({
        canvas,
        type: 'bar',
        data,
        options,
        plugins,
        datasets,
      });

      expect(result).toEqual({
        type: 'bar',
        data: {
          labels: ['January', 'February'],
          datasets: [
            {
              label: 'Sales',
              data: [10, 20],
              animation: {
                duration: 700,
                easing: 'easeOutQuart',
              },
              borderColor: '#3155e7',
              backgroundColor: 'transparent',
            },
          ],
        },
        plugins,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
            x: {
              ticks: {
                color: '#4b5563',
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 700,
            easing: 'easeOutQuart',
          },
        },
      } satisfies ChartConfiguration<ChartJSNativeType>);
    });

    it('uses an empty labels array when labels are not supplied', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn(() => ''),
      } as unknown as CSSStyleDeclaration);

      const result = createChartConfig({
        canvas,
        type: 'line',
        data: {},
        plugins: [],
        datasets: [],
      });

      expect(result.data.labels).toEqual([]);
    });

    it.each<{
      type: ChartjsProps['type'];
      expectedType: ChartJSNativeType;
    }>([
      {
        type: 'bar-line',
        expectedType: 'bar',
      },
      {
        type: 'donut',
        expectedType: 'doughnut',
      },
      {
        type: 'heatmap',
        expectedType: 'matrix' as ChartJSNativeType,
      },
    ])('converts $type to $expectedType', ({ type, expectedType }) => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn(() => ''),
      } as unknown as CSSStyleDeclaration);

      const result = createChartConfig({
        canvas,
        type,
        data: {},
        plugins: [],
        datasets: [],
      });

      expect(result.type).toBe(expectedType);
    });

    it('passes the first dataset animation to chart options', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: vi.fn(() => ''),
      } as unknown as CSSStyleDeclaration);

      const datasets: ChartJSDataset[] = [
        {
          data: [10],
          animation: {
            duration: 1200,
            easing: 'easeOutBounce',
          },
        },
        {
          data: [20],
          animation: {
            duration: 300,
            easing: 'linear',
          },
        },
      ];

      const result = createChartConfig({
        canvas,
        type: 'bar',
        data: {},
        options: {
          animation: {
            duration: 100,
          },
        },
        plugins: [],
        datasets,
      });

      expect(result.options?.animation).toEqual({
        duration: 1200,
        easing: 'easeOutBounce',
      });
    });
  });

  describe('createSvgDownloadUrl', () => {
    it('creates an SVG object URL from the canvas', () => {
      const canvas = document.createElement('canvas');

      canvas.width = 640;
      canvas.height = 360;

      vi.spyOn(canvas, 'toDataURL').mockReturnValue('data:image/png;base64,mock-image');

      const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-svg');

      const result = createSvgDownloadUrl(canvas);

      expect(result).toBe('blob:mock-svg');

      expect(canvas.toDataURL).toHaveBeenCalledTimes(1);
      expect(canvas.toDataURL).toHaveBeenCalledWith('image/png');

      expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
      expect(createObjectURLSpy).toHaveBeenCalledWith(expect.any(Blob));
    });

    it('serializes the canvas dimensions and image source into the SVG', async () => {
      const canvas = document.createElement('canvas');

      canvas.width = 800;
      canvas.height = 450;

      vi.spyOn(canvas, 'toDataURL').mockReturnValue('data:image/png;base64,chart-image');

      let createdBlob: Blob | undefined;

      vi.spyOn(URL, 'createObjectURL').mockImplementation((value) => {
        if (value instanceof Blob) {
          createdBlob = value;
        }

        return 'blob:serialized-svg';
      });

      createSvgDownloadUrl(canvas);

      expect(createdBlob).toBeInstanceOf(Blob);

      if (!createdBlob) {
        throw new Error('Expected createObjectURL to receive a Blob');
      }

      const svgContent = await createdBlob.text();

      expect(svgContent).toContain('<svg');
      expect(svgContent).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(svgContent).toContain('<foreignObject width="800" height="450">');
      expect(svgContent).toContain('src="data:image/png;base64,chart-image"');
      expect(svgContent).toContain('width="800"');
      expect(svgContent).toContain('height="450"');
      expect(svgContent).toContain('</svg>');
    });

    it('creates a Blob with the SVG MIME type', () => {
      const canvas = document.createElement('canvas');

      vi.spyOn(canvas, 'toDataURL').mockReturnValue('data:image/png;base64,mock-image');

      const OriginalBlob = Blob;

      const blobConstructorSpy = vi.fn(function MockBlob(
        this: Blob,
        parts?: BlobPart[],
        options?: BlobPropertyBag,
      ) {
        return new OriginalBlob(parts, options);
      });

      vi.stubGlobal('Blob', blobConstructorSpy);

      vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-svg');

      createSvgDownloadUrl(canvas);

      expect(blobConstructorSpy).toHaveBeenCalledTimes(1);
      expect(blobConstructorSpy).toHaveBeenCalledWith([expect.any(String)], {
        type: 'image/svg+xml',
      });

      vi.unstubAllGlobals();
    });
  });
});
