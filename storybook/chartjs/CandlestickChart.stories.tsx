/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import { Chart } from '@/charts/Chart';
import type { ChartCandlestickPoint, ChartData, ChartEffect } from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/chartjs/CandlestickChart',
  component: Chart,
};

export default meta;

const manualCandleData: ChartCandlestickPoint[] = [
  { t: '2024-03-10', o: 149.69, h: 152.5, l: 148.25, c: 152.38, v: 64390000 },
  { t: '2024-03-11', o: 150.5, h: 151.2, l: 137.8, c: 146.9, v: 70110000 },
  { t: '2024-03-12', o: 154.67, h: 159.73, l: 154.01, c: 158.03, v: 38450000 },
  { t: '2024-03-13', o: 152.6, h: 156.9, l: 145.5, c: 152.25, v: 44820000 },
  { t: '2024-03-14', o: 152.2, h: 162.8, l: 145.1, c: 157.2, v: 61240000 },
  { t: '2024-03-15', o: 153.9, h: 156.2, l: 143.1, c: 149.65, v: 55930000 },
  { t: '2024-03-16', o: 147.9, h: 148.8, l: 139.2, c: 141.85, v: 83220000 },
  { t: '2024-03-17', o: 146.9, h: 150.1, l: 140.5, c: 148.2, v: 41340000 },
  { t: '2024-03-18', o: 148.8, h: 156.8, l: 146.5, c: 149.6, v: 37650000 },
  { t: '2024-03-19', o: 143.1, h: 148.5, l: 134.2, c: 141.7, v: 92760000 },
  { t: '2024-03-20', o: 144.9, h: 153.7, l: 139.8, c: 147.8, v: 52590000 },
  { t: '2024-03-21', o: 149.1, h: 151.7, l: 142.6, c: 149.45, v: 31870000 },
  { t: '2024-03-22', o: 146.8, h: 152.9, l: 142.4, c: 150.1, v: 49280000 },
  { t: '2024-03-23', o: 149.5, h: 156.9, l: 147.1, c: 151.3, v: 44160000 },
  { t: '2024-03-24', o: 156.9, h: 158.0, l: 150.8, c: 157.15, v: 53730000 },
  { t: '2024-03-25', o: 156.5, h: 167.6, l: 156.4, c: 163.5, v: 86190000 },
  { t: '2024-03-26', o: 149.8, h: 156.9, l: 139.0, c: 142.8, v: 77880000 },
  { t: '2024-03-27', o: 142.8, h: 151.0, l: 139.3, c: 144.2, v: 46640000 },
  { t: '2024-03-28', o: 141.4, h: 149.2, l: 137.1, c: 147.5, v: 56920000 },
  { t: '2024-03-29', o: 145.9, h: 150.5, l: 143.7, c: 150.1, v: 62150000 },
];

const createChartData = (data: ChartCandlestickPoint[]): ChartData => ({
  labels: [],
  series: [
    {
      label: 'Market',
      data,
    },
  ],
});

const manualChartData = createChartData(manualCandleData);

const generateCandleData = (count: number): ChartCandlestickPoint[] => {
  let initial = 150;

  return Array.from({ length: count }, (_, index) => {
    const volatility = 15;
    const open = initial + (Math.random() * volatility - volatility / 2);
    const close = open + (Math.random() * volatility - volatility / 2);
    const high = Math.max(open, close) + Math.random() * (volatility / 2);
    const low = Math.min(open, close) - Math.random() * (volatility / 2);
    const volume = 15_000_000 + Math.random() * 75_000_000;

    initial = close;

    return {
      t: `2024-03-${10 + index}`,
      o: Number(open.toFixed(2)),
      h: Number(high.toFixed(2)),
      l: Number(low.toFixed(2)),
      c: Number(close.toFixed(2)),
      v: Number(volume.toFixed(0)),
    };
  });
};

const addDays = (date: Date, days: number): Date => {
  const nextDate = new Date(date);

  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
};

const getDateKey = (date: Date): string => date.toISOString().slice(0, 10);

const getNextBusinessDate = (date: Date): Date => {
  let nextDate = addDays(date, 1);

  while (nextDate.getDay() === 0 || nextDate.getDay() === 6) {
    nextDate = addDays(nextDate, 1);
  }

  return nextDate;
};

const generateMarketHistoryData = (count: number): ChartCandlestickPoint[] => {
  let date = new Date('2025-06-02');
  let previousClose = 225;

  return Array.from({ length: count }, () => {
    const volatility = 8;
    const open = previousClose;
    const close = open + (Math.random() * volatility - volatility / 2);
    const high = Math.max(open, close) + Math.random() * 4;
    const low = Math.min(open, close) - Math.random() * 4;
    const volume = 20_000_000 + Math.random() * 85_000_000;

    const candle: ChartCandlestickPoint = {
      t: getDateKey(date),
      o: Number(open.toFixed(2)),
      h: Number(high.toFixed(2)),
      l: Number(low.toFixed(2)),
      c: Number(close.toFixed(2)),
      v: Number(volume.toFixed(0)),
    };

    previousClose = close;
    date = getNextBusinessDate(date);

    return candle;
  });
};

const updateLiveCandle = (candle: ChartCandlestickPoint): ChartCandlestickPoint => {
  const open = Number(candle.o);
  const currentClose = Number(candle.c);
  const nextClose = currentClose + (Math.random() * 4 - 2);
  const high = Math.max(Number(candle.h), nextClose);
  const low = Math.min(Number(candle.l), nextClose);
  const volume = Number(candle.v) + 1_000_000 + Math.random() * 8_000_000;

  return {
    ...candle,
    o: Number(open.toFixed(2)),
    h: Number(high.toFixed(2)),
    l: Number(low.toFixed(2)),
    c: Number(nextClose.toFixed(2)),
    v: Number(volume.toFixed(0)),
  };
};

const createNextClosedCandle = (lastCandle: ChartCandlestickPoint): ChartCandlestickPoint => {
  const previousClose = Number(lastCandle.c);
  const open = previousClose;
  const close = open + (Math.random() * 8 - 4);
  const high = Math.max(open, close) + Math.random() * 3;
  const low = Math.min(open, close) - Math.random() * 3;
  const date = getNextBusinessDate(new Date(lastCandle.t));

  return {
    t: getDateKey(date),
    o: Number(open.toFixed(2)),
    h: Number(high.toFixed(2)),
    l: Number(low.toFixed(2)),
    c: Number(close.toFixed(2)),
    v: Number((20_000_000 + Math.random() * 90_000_000).toFixed(0)),
  };
};

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const titleH2 = css`
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 12px;
  padding: 16px;
`;

const titleH3 = css`
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const paragraph = css`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const paragraphSmall = css`
  font-size: 0.95rem;
  line-height: 1.5;
`;

const heroBox = css`
  padding: 32px !important;
  border-radius: 16px;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border-radius: 14px;
`;

const chartShell = css`
  width: 100%;
  min-height: 460px;
  margin-top: 20px;
`;

const codePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-family: monospace;
  font-size: 12px;
`;

const customChartVariables = css`
  --candlestick-chart-height: 500px;
  --candlestick-chart-bg-color: #fffbeb;

  --candlestick-chart-up-color: #16a34a;
  --candlestick-chart-down-color: #dc2626;
  --candlestick-chart-unchanged-color: #64748b;

  --candlestick-chart-volume-up-color: rgb(22 163 74 / 32%);
  --candlestick-chart-volume-down-color: rgb(220 38 38 / 32%);

  --candlestick-chart-crosshair-color: #111827;
  --candlestick-chart-crosshair-label-background: #111827;
  --candlestick-chart-crosshair-label-text: #ffffff;

  --wci-chart-axis-text: #92400e;
  --wci-chart-axis-line: #b45309;
  --wci-chart-grid: rgb(146 64 14 / 18%);

  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #111827;
  --wci-chart-tooltip-border: #92400e;
`;

const PageIntro = ({
  title,
  description,
}: {
  readonly title: string;
  readonly description: string;
}) => (
  <FlexLayout direction="column" gap="8px" fullWidth>
    <Typography variant="h1" customStyles={titleH1}>
      {title}
    </Typography>
    <Typography variant="p" customStyles={paragraph}>
      {description}
    </Typography>
  </FlexLayout>
);

const ChartCard = ({
  title,
  description,
  api,
  children,
}: {
  readonly title: string;
  readonly description: string;
  readonly api: string;
  readonly children: ReactNode;
}) => {
  return (
    <Box customStyles={chartCard}>
      <FlexLayout direction="column" gap="12px">
        <Typography variant="h3" customStyles={titleH3}>
          {title}
        </Typography>
        <Typography
          variant="p"
          customStyles={css`
            ${paragraphSmall};
            color: var(--wci-gray-700);
          `}
        >
          {description}
        </Typography>
        <Typography variant="span" customStyles={codePill}>
          {api}
        </Typography>
        <div css={chartShell}>{children}</div>
      </FlexLayout>
    </Box>
  );
};

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Default ChartJS Candlestick Chart"
        description="OHLCV candlestick data rendered through the shared Chart API."
      />
      <Box customStyles={heroBox}>
        <Chart type="candlestick" engine="chart-1" data={manualChartData} effect="none" />
      </Box>
    </div>
  </main>
);

export const FinanceMarketChart = () => {
  const chartData = createChartData(generateCandleData(30));

  return (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Finance Market Candlestick Chart"
          description="Trading-style candlestick chart with candles, volume bars, grid, and crosshair."
        />
        <Box customStyles={heroBox}>
          <Chart
            type="candlestick"
            engine="chart-1"
            data={chartData}
            effect="none"
            options={{
              height: '520px',
              showLegend: false,
              scales: {
                y: {
                  position: 'right',
                },
              },
            }}
          />
        </Box>
      </div>
    </main>
  );
};

const VISIBLE_LIVE_CANDLE_COUNT = 90;
const CREATE_NEW_CANDLE_EVERY_TICKS = 5;

export const LiveTradingViewLikeMarket = () => {
  const tickRef = useRef(0);

  const [chartData, setChartData] = useState<ChartCandlestickPoint[]>(() =>
    generateMarketHistoryData(VISIBLE_LIVE_CANDLE_COUNT),
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      tickRef.current += 1;

      setChartData((currentData) => {
        const lastCandle = currentData[currentData.length - 1];

        if (!lastCandle) {
          return currentData;
        }

        const shouldCreateNextCandle = tickRef.current % CREATE_NEW_CANDLE_EVERY_TICKS === 0;

        if (shouldCreateNextCandle) {
          const nextCandle = createNextClosedCandle(lastCandle);

          return [...currentData.slice(-(VISIBLE_LIVE_CANDLE_COUNT - 1)), nextCandle];
        }

        return [...currentData.slice(0, -1), updateLiveCandle(lastCandle)];
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Live TradingView Like Candlestick Chart"
          description="Focused OHLCV history with live candle updates every second and a new candle after every few ticks."
        />
        <Box customStyles={heroBox}>
          <Chart
            type="candlestick"
            engine="chart-1"
            data={createChartData(chartData)}
            effect="none"
            options={{
              height: '620px',
              showLegend: false,
              scales: {
                x: {
                  ticks: {
                    maxTicksLimit: 8,
                  },
                },
                y: {
                  position: 'right',
                },
              },
            }}
          />
        </Box>
      </div>
    </main>
  );
};

const effectMockData = createChartData(generateCandleData(20));

const EffectStory = ({
  effect,
  title,
  description,
}: {
  readonly effect: ChartEffect;
  readonly title: string;
  readonly description: string;
}) => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title={title} description={description} />
      <Box customStyles={heroBox}>
        <FlexLayout direction="column" gap="16px">
          <Typography variant="h2" customStyles={titleH2}>
            {title}
          </Typography>
          <Typography variant="span" customStyles={codePill}>
            effect="{effect}"
          </Typography>
          <div css={chartShell}>
            <Chart type="candlestick" engine="chart-1" data={effectMockData} effect={effect} />
          </div>
        </FlexLayout>
      </Box>
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Candlestick Bounce Effect"
    description="Bounce animation gives the candlestick chart a strong animated entrance."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Candlestick Wobble Effect"
    description="Wobble animation creates an energetic financial chart refresh."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Candlestick Elastic Effect"
    description="Elastic animation creates a flexible candlestick entrance."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Candlestick Progressive Trace Effect"
    description="Progressive trace reveals financial candles over time."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Candlestick Elastic Glide Effect"
    description="Elastic glide combines smooth movement with an elastic entrance."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Candlestick Staggered Reveal Effect"
    description="Staggered reveal adds a delayed candle-by-candle entrance."
  />
);

export const Crosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Candlestick Crosshair"
        description="Crosshair tracking can be enabled or disabled through chart options."
      />
      <Box customStyles={heroBox}>
        <Chart
          type="candlestick"
          engine="chart-1"
          data={manualChartData}
          effect="none"
          options={{
            crosshair: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Candlestick Custom Colors"
        description="Override financial and shared semantic chart colors through the common colors API."
      />
      <Box customStyles={heroBox}>
        <Chart
          type="candlestick"
          engine="chart-1"
          data={manualChartData}
          effect="none"
          colors={{
            up: '#2563eb',
            down: '#f97316',
            unchanged: '#64748b',
            volumeUp: 'rgb(37 99 235 / 32%)',
            volumeDown: 'rgb(249 115 22 / 32%)',
            axisText: '#334155',
            axisLine: '#7c3aed',
            grid: '#cbd5e1',
            crosshair: '#111827',
            crosshairLabelBackground: '#111827',
            crosshairLabelText: '#ffffff',
            tooltipBackground: '#ffffff',
            tooltipText: '#0f172a',
            tooltipBorder: '#7c3aed',
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Candlestick Custom Tooltip"
        description="Tooltip styling can be overridden through the standard Chart.js options API."
      />
      <Box customStyles={heroBox}>
        <Chart
          type="candlestick"
          engine="chart-1"
          data={manualChartData}
          effect="none"
          options={{
            plugins: {
              tooltip: {
                backgroundColor: '#ffffff',
                borderColor: '#763d6c',
                borderWidth: 2,
                titleColor: '#0f172a',
                bodyColor: '#475569',
                cornerRadius: 10,
                padding: 14,
                displayColors: false,
                caretPadding: 10,
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomStyles = () => {
  const chartData = createChartData(generateCandleData(24));

  return (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="ChartJS Candlestick Custom Styles"
          description="Override Candlestick-specific and common chart tokens using CSS variables."
        />
        <Typography variant="h2" customStyles={titleH2}>
          Custom Styling and Behavior
        </Typography>
        <FlexLayout
          columns={12}
          gap={{
            default: '24px',
            md: '32px',
          }}
          wrap="wrap"
        >
          <FlexItem
            columnSpan={{
              default: 12,
            }}
          >
            <ChartCard
              title="Custom CSS Variables"
              description="Financial colors use Candlestick-specific variables while axes, grid, and tooltip reuse common chart tokens."
              api="customStyles.container"
            >
              <Chart
                type="candlestick"
                engine="chart-1"
                data={chartData}
                effect="none"
                customStyles={{
                  container: customChartVariables,
                }}
                options={{
                  chartBackground: 'var(--candlestick-chart-bg-color)',
                  boldLabels: true,
                  boldLegends: true,
                  onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                    const firstElement = elements[0];

                    if (!firstElement) {
                      return;
                    }

                    alert(`API Call: Fetching candle index ${firstElement.index}`);
                  },
                }}
              />
            </ChartCard>
          </FlexItem>
          <FlexItem
            columnSpan={{
              default: 12,
            }}
          >
            <ChartCard
              title="Right Axis No Box"
              description="Transparent wrapper with right-side price axis and volume bars."
              api="options.isBoxVisible"
            >
              <Chart
                type="candlestick"
                engine="chart-1"
                data={chartData}
                effect="none"
                options={{
                  isBoxVisible: false,
                  scales: {
                    y: {
                      position: 'right',
                    },
                  },
                }}
              />
            </ChartCard>
          </FlexItem>
          <FlexItem
            columnSpan={{
              default: 12,
            }}
          >
            <ChartCard
              title="High Volatility Weekly Market"
              description="Visualizes long wicks, volume spikes, and price gaps using weekly time grouping."
              api='options.timeUnit="week"'
            >
              <Chart
                type="candlestick"
                engine="chart-1"
                data={createChartData(generateCandleData(40))}
                effect="progressive-trace"
                options={{
                  height: '520px',
                  timeUnit: 'week',
                }}
              />
            </ChartCard>
          </FlexItem>
        </FlexLayout>
      </div>
    </main>
  );
};

export const DarkBackground = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Candlestick Dark Background"
        description="Candlestick colors and shared semantic tokens can be overridden for dark surfaces."
      />
      <Box
        customStyles={css`
          padding: 32px;
          border-radius: 16px;
          background: #0f172a;
        `}
      >
        <Chart
          type="candlestick"
          engine="chart-1"
          data={manualChartData}
          effect="none"
          colors={{
            up: '#34d399',
            down: '#fb7185',
            unchanged: '#94a3b8',
            volumeUp: 'rgb(52 211 153 / 32%)',
            volumeDown: 'rgb(251 113 133 / 32%)',
            axisText: '#e2e8f0',
            axisLine: '#64748b',
            grid: '#334155',
            crosshair: '#cbd5e1',
            crosshairLabelBackground: '#e2e8f0',
            crosshairLabelText: '#0f172a',
            tooltipBackground: '#1e293b',
            tooltipText: '#f8fafc',
            tooltipBorder: '#64748b',
          }}
          options={{
            chartBackground: '#0f172a',
          }}
        />
      </Box>
    </div>
  </main>
);
