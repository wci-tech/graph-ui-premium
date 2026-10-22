import type { RefObject } from 'react';

import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { DownloadFormat } from '@/components/chartjs/ChartJS.types';
import { useChartDownload } from '@/components/chartjs/hooks/useChartDownload';
import { CHART_JS_EXPORT_FILE_NAME } from '@/components/chartjs/utils/ChartJS.constants';
import { createSvgDownloadUrl } from '@/components/chartjs/utils/ChartJS.utils';

vi.mock('@/components/chartjs/utils/ChartJS.utils', () => ({
  createSvgDownloadUrl: vi.fn(),
}));

describe('useChartDownload', () => {
  const mockCreateSvgDownloadUrl = vi.mocked(createSvgDownloadUrl);

  let canvas: HTMLCanvasElement;
  let canvasRef: RefObject<HTMLCanvasElement | null>;
  let link: HTMLAnchorElement;

  let createElementSpy: ReturnType<typeof vi.spyOn>;
  let revokeObjectURLSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    canvas = document.createElement('canvas');

    canvasRef = {
      current: canvas,
    };

    link = document.createElement('a');

    vi.spyOn(link, 'click').mockImplementation(() => undefined);

    vi.spyOn(canvas, 'toDataURL').mockReturnValue('data:image/png;base64,mock-image');

    const originalCreateElement = document.createElement.bind(document);

    createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockImplementation((tagName: string, options?: ElementCreationOptions): HTMLElement => {
        if (tagName === 'a') {
          return link;
        }

        return originalCreateElement(tagName, options);
      });

    revokeObjectURLSpy = vi.fn();

    vi.stubGlobal('URL', {
      ...URL,
      revokeObjectURL: revokeObjectURLSpy,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('returns the download handler', () => {
    const { result } = renderHook(() => useChartDownload(canvasRef));

    expect(result.current.handleDownload).toEqual(expect.any(Function));
  });

  it('does nothing when the canvas reference is null', () => {
    const emptyCanvasRef: RefObject<HTMLCanvasElement | null> = {
      current: null,
    };

    const { result } = renderHook(() => useChartDownload(emptyCanvasRef));

    /*
     * renderHook creates its own container element, so clear those
     * document.createElement calls before invoking handleDownload.
     */
    createElementSpy.mockClear();

    result.current.handleDownload('png');

    expect(createElementSpy).not.toHaveBeenCalled();
    expect(canvas.toDataURL).not.toHaveBeenCalled();
    expect(link.click).not.toHaveBeenCalled();
    expect(mockCreateSvgDownloadUrl).not.toHaveBeenCalled();
    expect(revokeObjectURLSpy).not.toHaveBeenCalled();
  });

  it('downloads the canvas as SVG', () => {
    const objectUrl = 'blob:mock-svg-url';

    mockCreateSvgDownloadUrl.mockReturnValue(objectUrl);

    const { result } = renderHook(() => useChartDownload(canvasRef));

    createElementSpy.mockClear();

    result.current.handleDownload('svg');

    expect(createElementSpy).toHaveBeenCalledTimes(1);
    expect(createElementSpy).toHaveBeenCalledWith('a');

    expect(mockCreateSvgDownloadUrl).toHaveBeenCalledTimes(1);
    expect(mockCreateSvgDownloadUrl).toHaveBeenCalledWith(canvas);

    expect(link.href).toBe(objectUrl);
    expect(link.download).toBe(`${CHART_JS_EXPORT_FILE_NAME}.svg`);

    expect(link.click).toHaveBeenCalledTimes(1);

    expect(revokeObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith(objectUrl);

    expect(canvas.toDataURL).not.toHaveBeenCalled();
  });

  type RasterDownloadCase = {
    readonly format: Exclude<DownloadFormat, 'svg'>;
    readonly imageType: 'png' | 'jpeg';
    readonly dataUrl: string;
  };

  const rasterDownloadCases = [
    {
      format: 'png',
      imageType: 'png',
      dataUrl: 'data:image/png;base64,mock-png',
    },
    {
      format: 'jpg',
      imageType: 'jpeg',
      dataUrl: 'data:image/jpeg;base64,mock-jpg',
    },
  ] as const satisfies readonly RasterDownloadCase[];

  it.each(rasterDownloadCases)(
    'downloads the canvas as $format',
    ({ format, imageType, dataUrl }) => {
      vi.mocked(canvas.toDataURL).mockReturnValue(dataUrl);

      const { result } = renderHook(() => useChartDownload(canvasRef));

      createElementSpy.mockClear();

      result.current.handleDownload(format);

      expect(createElementSpy).toHaveBeenCalledTimes(1);
      expect(createElementSpy).toHaveBeenCalledWith('a');

      expect(canvas.toDataURL).toHaveBeenCalledTimes(1);
      expect(canvas.toDataURL).toHaveBeenCalledWith(`image/${imageType}`);

      expect(link.href).toBe(dataUrl);
      expect(link.download).toBe(`${CHART_JS_EXPORT_FILE_NAME}.${format}`);

      expect(link.click).toHaveBeenCalledTimes(1);

      expect(mockCreateSvgDownloadUrl).not.toHaveBeenCalled();
      expect(revokeObjectURLSpy).not.toHaveBeenCalled();
    },
  );

  it('keeps the same download handler when the canvas ref does not change', () => {
    const { result, rerender } = renderHook(() => useChartDownload(canvasRef));

    const initialHandleDownload = result.current.handleDownload;

    rerender();

    expect(result.current.handleDownload).toBe(initialHandleDownload);
  });

  it('creates a new download handler when the canvas ref changes', () => {
    const secondCanvasRef: RefObject<HTMLCanvasElement | null> = {
      current: document.createElement('canvas'),
    };

    type HookProps = {
      currentCanvasRef: RefObject<HTMLCanvasElement | null>;
    };

    const { result, rerender } = renderHook(
      ({ currentCanvasRef }: HookProps) => useChartDownload(currentCanvasRef),
      {
        initialProps: {
          currentCanvasRef: canvasRef,
        },
      },
    );

    const initialHandleDownload = result.current.handleDownload;

    rerender({
      currentCanvasRef: secondCanvasRef,
    });

    expect(result.current.handleDownload).not.toBe(initialHandleDownload);
  });
});
