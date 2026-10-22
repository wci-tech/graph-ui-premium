export interface PointHaloConfig {
  readonly pointSize: number;
  readonly haloRadius: number;
  readonly haloOpacity: number;
  readonly hoverScale: number;
}

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(Math.max(value, minimum), maximum);

export const getEChartsAlphaColor = (color: string, alpha: number): string => {
  const resolvedAlpha = clamp(alpha, 0, 1);

  if (/^#[\da-f]{6}$/i.test(color)) {
    const red = Number.parseInt(color.slice(1, 3), 16);
    const green = Number.parseInt(color.slice(3, 5), 16);
    const blue = Number.parseInt(color.slice(5, 7), 16);

    return `rgba(${red}, ${green}, ${blue}, ${resolvedAlpha})`;
  }

  if (/^#[\da-f]{3}$/i.test(color)) {
    const red = Number.parseInt(`${color[1]}${color[1]}`, 16);

    const green = Number.parseInt(`${color[2]}${color[2]}`, 16);

    const blue = Number.parseInt(`${color[3]}${color[3]}`, 16);

    return `rgba(${red}, ${green}, ${blue}, ${resolvedAlpha})`;
  }

  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${resolvedAlpha})`);
  }

  if (color.startsWith('rgba(')) {
    return color.replace(/rgba\((.+),\s*[\d.]+\)/, `rgba($1, ${resolvedAlpha})`);
  }

  return color;
};

export const DEFAULT_POINT_HALO_CONFIG: PointHaloConfig = {
  pointSize: 12,
  haloRadius: 10,
  haloOpacity: 0.3,
  hoverScale: 1.35,
};
