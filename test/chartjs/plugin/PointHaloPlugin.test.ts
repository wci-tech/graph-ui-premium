import { beforeEach, describe, expect, it, vi } from 'vitest';

const { PointElementMock } = vi.hoisted(() => {
  class PointElementMock {
    x = 0;

    y = 0;

    skip = false;

    options: {
      radius: number;
      backgroundColor: string;
    } = {
      radius: 0,
      backgroundColor: '#000000',
    };

    constructor(
      config: {
        readonly x?: number;
        readonly y?: number;
        readonly skip?: boolean;
        readonly radius?: number;
        readonly backgroundColor?: string;
      } = {},
    ) {
      this.x = config.x ?? 0;
      this.y = config.y ?? 0;
      this.skip = config.skip ?? false;

      this.options = {
        radius: config.radius ?? 0,
        backgroundColor: config.backgroundColor ?? '#000000',
      };
    }
  }

  return {
    PointElementMock,
  };
});

vi.mock('chart.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('chart.js')>();

  return {
    ...actual,
    PointElement: PointElementMock,
  };
});

import type { Chart, ChartType, Plugin } from 'chart.js';

import PointHaloPlugin, {
  createPointHaloPlugin,
  PointHaloPlugin as NamedPointHaloPlugin,
} from '@/components/chartjs/plugin/PointHaloPlugin';

type CanvasContextMock = {
  readonly save: ReturnType<typeof vi.fn>;
  readonly beginPath: ReturnType<typeof vi.fn>;
  readonly arc: ReturnType<typeof vi.fn>;
  readonly fill: ReturnType<typeof vi.fn>;
  readonly restore: ReturnType<typeof vi.fn>;

  globalAlpha: number;
  fillStyle: string | CanvasGradient | CanvasPattern;
};

type ActiveElementInput = {
  readonly element: unknown;
  readonly datasetIndex?: number;
  readonly index?: number;
};

const createContext = (): CanvasContextMock => ({
  save: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  restore: vi.fn(),

  globalAlpha: 1,
  fillStyle: '#000000',
});

const createPoint = (
  overrides: {
    readonly x?: number;
    readonly y?: number;
    readonly skip?: boolean;
    readonly radius?: number;
    readonly backgroundColor?: string;
  } = {},
): InstanceType<typeof PointElementMock> =>
  new PointElementMock({
    x: 100,
    y: 200,
    radius: 5,
    backgroundColor: '#3155e7',
    ...overrides,
  });

const createChart = ({
  activeElements = [],
  ctx = createContext(),
}: {
  readonly activeElements?: readonly ActiveElementInput[];
  readonly ctx?: CanvasContextMock;
} = {}) => {
  const getActiveElements = vi.fn(() =>
    activeElements.map((item) => ({
      datasetIndex: item.datasetIndex ?? 0,
      index: item.index ?? 0,
      element: item.element,
    })),
  );

  const chart = {
    ctx,
    getActiveElements,
  } as unknown as Chart<ChartType>;

  return {
    chart,
    ctx,
    getActiveElements,
  };
};

const runBeforeDatasetsDraw = (plugin: Plugin<ChartType>, chart: Chart<ChartType>): void => {
  const hook = plugin.beforeDatasetsDraw;

  if (typeof hook !== 'function') {
    throw new Error('Expected beforeDatasetsDraw to be a function');
  }

  hook(
    chart,
    {
      cancelable: true,
    },
    {},
  );
};

const expectNoDrawing = (ctx: CanvasContextMock): void => {
  expect(ctx.save).not.toHaveBeenCalled();
  expect(ctx.beginPath).not.toHaveBeenCalled();
  expect(ctx.arc).not.toHaveBeenCalled();
  expect(ctx.fill).not.toHaveBeenCalled();
  expect(ctx.restore).not.toHaveBeenCalled();
};

describe('createPointHaloPlugin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a plugin with the expected id', () => {
    const plugin = createPointHaloPlugin();

    expect(plugin.id).toBe('pointHalo');
  });

  it('draws a halo using the default configuration', () => {
    const point = createPoint({
      x: 100,
      y: 200,
      radius: 5,
      backgroundColor: '#3155e7',
    });

    const { chart, ctx, getActiveElements } = createChart({
      activeElements: [
        {
          element: point,
        },
      ],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expect(getActiveElements).toHaveBeenCalledTimes(1);

    expect(ctx.save).toHaveBeenCalledTimes(1);
    expect(ctx.beginPath).toHaveBeenCalledTimes(1);

    expect(ctx.arc).toHaveBeenCalledTimes(1);
    expect(ctx.arc).toHaveBeenCalledWith(100, 200, 11, 0, Math.PI * 2);

    expect(ctx.globalAlpha).toBe(0.2);
    expect(ctx.fillStyle).toBe('#3155e7');

    expect(ctx.fill).toHaveBeenCalledTimes(1);
    expect(ctx.restore).toHaveBeenCalledTimes(1);
  });

  it('uses the supplied radius offset and opacity', () => {
    const point = createPoint({
      radius: 8,
      backgroundColor: '#763d6c',
    });

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: point,
        },
      ],
    });

    const plugin = createPointHaloPlugin({
      radiusOffset: 5,
      opacity: 0.3,
    });

    runBeforeDatasetsDraw(plugin, chart);

    expect(ctx.arc).toHaveBeenCalledWith(100, 200, 13, 0, Math.PI * 2);

    expect(ctx.globalAlpha).toBe(0.3);
    expect(ctx.fillStyle).toBe('#763d6c');
  });

  it('does not inspect active elements when disabled', () => {
    const { chart, ctx, getActiveElements } = createChart({
      activeElements: [
        {
          element: createPoint(),
        },
      ],
    });

    const plugin = createPointHaloPlugin({
      enabled: false,
    });

    runBeforeDatasetsDraw(plugin, chart);

    expect(getActiveElements).not.toHaveBeenCalled();

    expectNoDrawing(ctx);
  });

  it('does not inspect active elements when radiusOffset is zero', () => {
    const { chart, ctx, getActiveElements } = createChart({
      activeElements: [
        {
          element: createPoint(),
        },
      ],
    });

    const plugin = createPointHaloPlugin({
      radiusOffset: 0,
    });

    runBeforeDatasetsDraw(plugin, chart);

    expect(getActiveElements).not.toHaveBeenCalled();

    expectNoDrawing(ctx);
  });

  it('clamps a negative radius offset to zero and does not draw', () => {
    const { chart, ctx, getActiveElements } = createChart({
      activeElements: [
        {
          element: createPoint(),
        },
      ],
    });

    const plugin = createPointHaloPlugin({
      radiusOffset: -10,
    });

    runBeforeDatasetsDraw(plugin, chart);

    expect(getActiveElements).not.toHaveBeenCalled();

    expectNoDrawing(ctx);
  });

  it('does not inspect active elements when opacity is zero', () => {
    const { chart, ctx, getActiveElements } = createChart({
      activeElements: [
        {
          element: createPoint(),
        },
      ],
    });

    const plugin = createPointHaloPlugin({
      opacity: 0,
    });

    runBeforeDatasetsDraw(plugin, chart);

    expect(getActiveElements).not.toHaveBeenCalled();

    expectNoDrawing(ctx);
  });

  it('clamps a negative opacity to zero and does not draw', () => {
    const { chart, ctx, getActiveElements } = createChart({
      activeElements: [
        {
          element: createPoint(),
        },
      ],
    });

    const plugin = createPointHaloPlugin({
      opacity: -0.5,
    });

    runBeforeDatasetsDraw(plugin, chart);

    expect(getActiveElements).not.toHaveBeenCalled();

    expectNoDrawing(ctx);
  });

  it('clamps opacity values greater than one', () => {
    const point = createPoint();

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: point,
        },
      ],
    });

    const plugin = createPointHaloPlugin({
      opacity: 4,
    });

    runBeforeDatasetsDraw(plugin, chart);

    expect(ctx.globalAlpha).toBe(1);
    expect(ctx.fill).toHaveBeenCalledTimes(1);
  });

  it('does not draw when there are no active elements', () => {
    const { chart, ctx, getActiveElements } = createChart({
      activeElements: [],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expect(getActiveElements).toHaveBeenCalledTimes(1);

    expectNoDrawing(ctx);
  });

  it('ignores active elements that are not PointElement instances', () => {
    const nonPointElement = {
      x: 100,
      y: 200,
      skip: false,

      options: {
        radius: 5,
        backgroundColor: '#3155e7',
      },
    };

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: nonPointElement,
        },
      ],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expectNoDrawing(ctx);
  });

  it('does not draw a skipped point', () => {
    const point = createPoint({
      skip: true,
    });

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: point,
        },
      ],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expectNoDrawing(ctx);
  });

  it('does not draw when the point x coordinate is NaN', () => {
    const point = createPoint({
      x: Number.NaN,
    });

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: point,
        },
      ],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expectNoDrawing(ctx);
  });

  it('does not draw when the point x coordinate is infinite', () => {
    const point = createPoint({
      x: Number.POSITIVE_INFINITY,
    });

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: point,
        },
      ],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expectNoDrawing(ctx);
  });

  it('does not draw when the point y coordinate is NaN', () => {
    const point = createPoint({
      y: Number.NaN,
    });

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: point,
        },
      ],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expectNoDrawing(ctx);
  });

  it('does not draw when the point y coordinate is infinite', () => {
    const point = createPoint({
      y: Number.NEGATIVE_INFINITY,
    });

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: point,
        },
      ],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expectNoDrawing(ctx);
  });

  it('does not draw when the point radius is zero', () => {
    const point = createPoint({
      radius: 0,
    });

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: point,
        },
      ],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expectNoDrawing(ctx);
  });

  it('does not draw when the point radius is negative', () => {
    const point = createPoint({
      radius: -5,
    });

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: point,
        },
      ],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expectNoDrawing(ctx);
  });

  it('draws one halo for every valid active point', () => {
    const firstPoint = createPoint({
      x: 50,
      y: 75,
      radius: 4,
      backgroundColor: '#111111',
    });

    const secondPoint = createPoint({
      x: 150,
      y: 175,
      radius: 8,
      backgroundColor: '#222222',
    });

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: firstPoint,
          datasetIndex: 0,
          index: 0,
        },
        {
          element: secondPoint,
          datasetIndex: 1,
          index: 2,
        },
      ],
    });

    const plugin = createPointHaloPlugin({
      radiusOffset: 5,
      opacity: 0.3,
    });

    runBeforeDatasetsDraw(plugin, chart);

    expect(ctx.save).toHaveBeenCalledTimes(2);
    expect(ctx.beginPath).toHaveBeenCalledTimes(2);
    expect(ctx.arc).toHaveBeenCalledTimes(2);
    expect(ctx.fill).toHaveBeenCalledTimes(2);
    expect(ctx.restore).toHaveBeenCalledTimes(2);

    expect(ctx.arc).toHaveBeenNthCalledWith(1, 50, 75, 9, 0, Math.PI * 2);

    expect(ctx.arc).toHaveBeenNthCalledWith(2, 150, 175, 13, 0, Math.PI * 2);
  });

  it('draws only valid PointElement instances from a mixed active-element list', () => {
    const validPoint = createPoint({
      x: 100,
      y: 200,
      radius: 5,
    });

    const skippedPoint = createPoint({
      skip: true,
    });

    const invalidCoordinatePoint = createPoint({
      x: Number.NaN,
    });

    const zeroRadiusPoint = createPoint({
      radius: 0,
    });

    const nonPointElement = {
      x: 100,
      y: 200,

      options: {
        radius: 5,
        backgroundColor: '#000000',
      },
    };

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: skippedPoint,
        },
        {
          element: nonPointElement,
        },
        {
          element: validPoint,
        },
        {
          element: invalidCoordinatePoint,
        },
        {
          element: zeroRadiusPoint,
        },
      ],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expect(ctx.save).toHaveBeenCalledTimes(1);
    expect(ctx.beginPath).toHaveBeenCalledTimes(1);
    expect(ctx.arc).toHaveBeenCalledTimes(1);
    expect(ctx.fill).toHaveBeenCalledTimes(1);
    expect(ctx.restore).toHaveBeenCalledTimes(1);
  });

  it('uses each point background color as its halo fill color', () => {
    const firstPoint = createPoint({
      backgroundColor: '#111111',
    });

    const secondPoint = createPoint({
      backgroundColor: '#222222',
    });

    const ctx = createContext();

    const assignedFillStyles: unknown[] = [];

    Object.defineProperty(ctx, 'fillStyle', {
      configurable: true,

      get() {
        return assignedFillStyles.at(-1) ?? '#000000';
      },

      set(value: unknown) {
        assignedFillStyles.push(value);
      },
    });

    const { chart } = createChart({
      ctx,

      activeElements: [
        {
          element: firstPoint,
        },
        {
          element: secondPoint,
        },
      ],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expect(assignedFillStyles).toEqual(['#111111', '#222222']);
  });

  it('sets globalAlpha for every valid point', () => {
    const firstPoint = createPoint();
    const secondPoint = createPoint();

    const ctx = createContext();

    const assignedOpacityValues: number[] = [];

    Object.defineProperty(ctx, 'globalAlpha', {
      configurable: true,

      get() {
        return assignedOpacityValues.at(-1) ?? 1;
      },

      set(value: number) {
        assignedOpacityValues.push(value);
      },
    });

    const { chart } = createChart({
      ctx,

      activeElements: [
        {
          element: firstPoint,
        },
        {
          element: secondPoint,
        },
      ],
    });

    const plugin = createPointHaloPlugin({
      opacity: 0.35,
    });

    runBeforeDatasetsDraw(plugin, chart);

    expect(assignedOpacityValues).toEqual([0.35, 0.35]);
  });

  it('performs canvas operations in the expected order', () => {
    const operationOrder: string[] = [];

    const ctx = createContext();

    ctx.save.mockImplementation(() => {
      operationOrder.push('save');
    });

    ctx.beginPath.mockImplementation(() => {
      operationOrder.push('beginPath');
    });

    ctx.arc.mockImplementation(() => {
      operationOrder.push('arc');
    });

    ctx.fill.mockImplementation(() => {
      operationOrder.push('fill');
    });

    ctx.restore.mockImplementation(() => {
      operationOrder.push('restore');
    });

    const { chart } = createChart({
      ctx,

      activeElements: [
        {
          element: createPoint(),
        },
      ],
    });

    const plugin = createPointHaloPlugin();

    runBeforeDatasetsDraw(plugin, chart);

    expect(operationOrder).toEqual(['save', 'beginPath', 'arc', 'fill', 'restore']);
  });

  it('creates independent plugin instances', () => {
    const firstPlugin = createPointHaloPlugin({
      opacity: 0.2,
    });

    const secondPlugin = createPointHaloPlugin({
      opacity: 0.8,
    });

    expect(firstPlugin).not.toBe(secondPlugin);

    expect(firstPlugin.id).toBe('pointHalo');
    expect(secondPlugin.id).toBe('pointHalo');
  });
});

describe('PointHaloPlugin', () => {
  it('exports a ready-to-use plugin instance', () => {
    expect(NamedPointHaloPlugin.id).toBe('pointHalo');

    expect(typeof NamedPointHaloPlugin.beforeDatasetsDraw).toBe('function');
  });

  it('exports the same plugin as the default export', () => {
    expect(PointHaloPlugin).toBe(NamedPointHaloPlugin);
  });

  it('uses the default halo settings', () => {
    const point = createPoint({
      x: 25,
      y: 50,
      radius: 4,
      backgroundColor: '#763d6c',
    });

    const { chart, ctx } = createChart({
      activeElements: [
        {
          element: point,
        },
      ],
    });

    runBeforeDatasetsDraw(PointHaloPlugin, chart);

    expect(ctx.arc).toHaveBeenCalledWith(25, 50, 10, 0, Math.PI * 2);

    expect(ctx.globalAlpha).toBe(0.2);
    expect(ctx.fillStyle).toBe('#763d6c');
  });
});
