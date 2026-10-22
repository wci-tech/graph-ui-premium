import { describe, expect, it } from 'vitest';

import {
  CHART_JS_CSS_VARIABLES,
  CHART_JS_EXPORT_FILE_NAME,
  DOWNLOAD_FORMATS,
  DOWNLOAD_ITEMS,
} from '@/components/chartjs/utils/ChartJS.constants';

describe('ChartJS.constants', () => {
  describe('DOWNLOAD_FORMATS', () => {
    it('contains all supported download formats in the expected order', () => {
      expect(DOWNLOAD_FORMATS).toEqual(['png', 'jpg', 'svg']);
    });

    it('contains exactly three download formats', () => {
      expect(DOWNLOAD_FORMATS).toHaveLength(3);
    });
  });

  describe('DOWNLOAD_ITEMS', () => {
    it('creates a download item for every supported format', () => {
      expect(DOWNLOAD_ITEMS).toHaveLength(DOWNLOAD_FORMATS.length);
    });

    it('creates the expected download menu items', () => {
      expect(DOWNLOAD_ITEMS).toEqual([
        {
          id: 'png',
          label: 'PNG Image',
        },
        {
          id: 'jpg',
          label: 'JPG Image',
        },
        {
          id: 'svg',
          label: 'SVG Image',
        },
      ]);
    });

    it('uses each download format as the item id', () => {
      expect(DOWNLOAD_ITEMS.map(({ id }) => id)).toEqual(DOWNLOAD_FORMATS);
    });

    it('creates an uppercase image label for each format', () => {
      DOWNLOAD_ITEMS.forEach(({ id, label }) => {
        expect(label).toBe(`${id.toUpperCase()} Image`);
      });
    });
  });

  describe('CHART_JS_EXPORT_FILE_NAME', () => {
    it('defines the default chart export file name', () => {
      expect(CHART_JS_EXPORT_FILE_NAME).toBe('chart-export');
    });
  });

  describe('CHART_JS_CSS_VARIABLES', () => {
    it('defines the ChartJS CSS variable names', () => {
      expect(CHART_JS_CSS_VARIABLES).toEqual({
        lineColor: '--chartjs-line-color',
        labelColor: '--chartjs-label-color',
      });
    });

    it('defines the line color CSS variable', () => {
      expect(CHART_JS_CSS_VARIABLES.lineColor).toBe('--chartjs-line-color');
    });

    it('defines the label color CSS variable', () => {
      expect(CHART_JS_CSS_VARIABLES.labelColor).toBe('--chartjs-label-color');
    });
  });
});
