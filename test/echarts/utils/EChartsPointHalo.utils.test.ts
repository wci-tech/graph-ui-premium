import {
  DEFAULT_POINT_HALO_CONFIG,
  getEChartsAlphaColor,
} from '@/components/echarts/utils/EChartsPointHalo.utils';
import { describe, expect, it } from 'vitest';

describe('PointHalo utils', () => {
  describe('getEChartsAlphaColor', () => {
    it('converts a 6-digit hex color', () => {
      expect(getEChartsAlphaColor('#3155e7', 0.3)).toBe('rgba(49, 85, 231, 0.3)');
    });

    it('converts an uppercase 6-digit hex color', () => {
      expect(getEChartsAlphaColor('#FF0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('converts a 3-digit hex color', () => {
      expect(getEChartsAlphaColor('#abc', 0.4)).toBe('rgba(170, 187, 204, 0.4)');
    });

    it('converts an uppercase 3-digit hex color', () => {
      expect(getEChartsAlphaColor('#F0A', 0.25)).toBe('rgba(255, 0, 170, 0.25)');
    });

    it('converts an rgb color', () => {
      expect(getEChartsAlphaColor('rgb(10, 20, 30)', 0.6)).toBe('rgba(10, 20, 30, 0.6)');
    });

    it('updates the alpha value of an rgba color', () => {
      expect(getEChartsAlphaColor('rgba(10, 20, 30, 0.2)', 0.8)).toBe('rgba(10, 20, 30, 0.8)');
    });

    it('returns unsupported colors unchanged', () => {
      expect(getEChartsAlphaColor('blue', 0.5)).toBe('blue');
    });

    it('clamps alpha values below zero', () => {
      expect(getEChartsAlphaColor('#000000', -5)).toBe('rgba(0, 0, 0, 0)');
    });

    it('clamps alpha values above one', () => {
      expect(getEChartsAlphaColor('#ffffff', 5)).toBe('rgba(255, 255, 255, 1)');
    });

    it('preserves alpha values already within range', () => {
      expect(getEChartsAlphaColor('#123456', 1)).toBe('rgba(18, 52, 86, 1)');

      expect(getEChartsAlphaColor('#123456', 0)).toBe('rgba(18, 52, 86, 0)');
    });
  });

  describe('DEFAULT_POINT_HALO_CONFIG', () => {
    it('exports the expected default configuration', () => {
      expect(DEFAULT_POINT_HALO_CONFIG).toEqual({
        pointSize: 12,
        haloRadius: 10,
        haloOpacity: 0.3,
        hoverScale: 1.35,
      });
    });

    it('uses sensible default values', () => {
      expect(DEFAULT_POINT_HALO_CONFIG.pointSize).toBeGreaterThan(0);

      expect(DEFAULT_POINT_HALO_CONFIG.haloRadius).toBeGreaterThan(0);

      expect(DEFAULT_POINT_HALO_CONFIG.haloOpacity).toBeGreaterThanOrEqual(0);
      expect(DEFAULT_POINT_HALO_CONFIG.haloOpacity).toBeLessThanOrEqual(1);

      expect(DEFAULT_POINT_HALO_CONFIG.hoverScale).toBeGreaterThan(1);
    });
  });
});
