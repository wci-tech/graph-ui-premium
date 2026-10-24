/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import CandlestickChart from '@/components/echarts/components/candlestick-chart/CandlestickChart';
import type {
  CandlestickChartColors,
  CandlestickChartData,
  CandlestickChartEffect,
  CandlestickChartPoint,
} from '@/components/echarts/components/candlestick-chart/CandlestickChart.types';

const meta: Meta<typeof CandlestickChart> = {
  title: 'components/echarts/CandlestickChart',
  component: CandlestickChart,
};

export default meta;

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
`;

const titleH2 = css`
  font-size: 1.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
  padding: 16px;
`;

const titleH3 = css`
  font-size: 1.35rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`;

const paragraph = css`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 24px;
  color: #475569;
`;

const paragraphSmall = css`
  font-size: 0.95rem;
  line-height: 1.5;
  color: #64748b;
`;

const heroBox = css`
  padding: 32px !important;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px rgb(15 23 42 / 6%);
`;

const chartShell = css`
  width: 100%;
  min-height: 520px;
  margin-top: 20px;
`;

const codePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #334155;
  font-family: monospace;
  font-size: 12px;
`;

const customChartStyles = css`
  --wci-chart-axis-text: #92400e;
  --wci-chart-axis-line: #b45309;
  --wci-chart-grid: rgb(146 64 14 / 18%);
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #111827;
  --wci-chart-tooltip-border: #92400e;
`;

const darkTradingStyles = css`
  --wci-chart-axis-text: #cbd5e1;
  --wci-chart-axis-line: #475569;
  --wci-chart-grid: rgb(148 163 184 / 14%);
  --wci-chart-tooltip-background: #020617;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #475569;
`;

const customColors: CandlestickChartColors = {
  up: '#16a34a',
  down: '#dc2626',
  unchanged: '#64748b',
  volumeUp: 'rgb(22 163 74 / 32%)',
  volumeDown: 'rgb(220 38 38 / 32%)',
  crosshair: 'rgb(17 24 39 / 65%)',
  crosshairLabelBackground: '#111827',
  crosshairLabelText: '#ffffff',
};

const darkTradingColors: CandlestickChartColors = {
  up: '#22c55e',
  down: '#ef4444',
  unchanged: '#94a3b8',
  volumeUp: 'rgb(34 197 94 / 28%)',
  volumeDown: 'rgb(239 68 68 / 28%)',
  crosshair: 'rgb(203 213 225 / 65%)',
  crosshairLabelBackground: '#020617',
  crosshairLabelText: '#ffffff',
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

const generateMarketHistoryData = (count: number): CandlestickChartPoint[] => {
  let date = new Date('2025-06-02');
  let previousClose = 225;

  return Array.from({ length: count }, () => {
    const volatility = 8;
    const open = previousClose;
    const close = open + (Math.random() * volatility - volatility / 2);
    const high = Math.max(open, close) + Math.random() * 4;
    const low = Math.min(open, close) - Math.random() * 4;
    const volume = 20_000_000 + Math.random() * 85_000_000;

    const point: CandlestickChartPoint = {
      t: new Date(date),
      o: Number(open.toFixed(2)),
      c: Number(close.toFixed(2)),
      l: Number(low.toFixed(2)),
      h: Number(high.toFixed(2)),
      v: Number(volume.toFixed(0)),
    };

    previousClose = close;
    date = getNextBusinessDate(date);

    return point;
  });
};

const createChartData = (candles: CandlestickChartPoint[]): CandlestickChartData => ({
  labels: candles.map((point) => (point.t instanceof Date ? getDateKey(point.t) : String(point.t))),
  series: candles,
});

const createMarketData = (count: number): CandlestickChartData =>
  createChartData(generateMarketHistoryData(count));

const updateLiveCandle = (candle: CandlestickChartPoint): CandlestickChartPoint => {
  const currentClose = Number(candle.c);
  const nextClose = currentClose + (Math.random() * 4 - 2);
  const high = Math.max(Number(candle.h), nextClose);
  const low = Math.min(Number(candle.l), nextClose);
  const volume = Number(candle.v) + 1_000_000 + Math.random() * 8_000_000;

  return {
    ...candle,
    h: Number(high.toFixed(2)),
    l: Number(low.toFixed(2)),
    c: Number(nextClose.toFixed(2)),
    v: Number(volume.toFixed(0)),
  };
};

const createNextCandle = (lastCandle: CandlestickChartPoint): CandlestickChartPoint => {
  const previousClose = Number(lastCandle.c);
  const open = previousClose;
  const close = open + (Math.random() * 8 - 4);
  const high = Math.max(open, close) + Math.random() * 3;
  const low = Math.min(open, close) - Math.random() * 3;

  return {
    t: getNextBusinessDate(new Date(lastCandle.t)),
    o: Number(open.toFixed(2)),
    c: Number(close.toFixed(2)),
    l: Number(low.toFixed(2)),
    h: Number(high.toFixed(2)),
    v: Number((20_000_000 + Math.random() * 90_000_000).toFixed(0)),
  };
};

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
  readonly children: React.ReactNode;
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

const EffectStory = ({
  effect,
  title,
  description,
}: {
  readonly effect: CandlestickChartEffect;
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
            <CandlestickChart
              data={createMarketData(40)}
              effect={effect}
              options={{
                height: 520,
              }}
            />
          </div>
        </FlexLayout>
      </Box>
    </div>
  </main>
);

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Default ECharts Candlestick Chart"
        description="Standard OHLCV candlestick chart using the shared chart color tokens, crosshair hover, and volume bars."
      />
      <Box customStyles={heroBox}>
        <CandlestickChart chartId="default-kline" data={createMarketData(40)} effect="none" />
      </Box>
    </div>
  </main>
);

export const FinanceMarketChart = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Finance Market Candlestick Chart"
        description="Trading-style candlestick chart with price candles, bottom volume bars, right price axis, and crosshair hover."
      />
      <Box customStyles={heroBox}>
        <CandlestickChart
          data={createMarketData(70)}
          effect="none"
          options={{
            height: 580,
          }}
        />
      </Box>
    </div>
  </main>
);

export const LiveTradingViewLikeMarket = () => {
  const tickRef = useRef(0);
  const visibleCount = 70;
  const newCandleEveryTicks = 5;

  const [candles, setCandles] = useState<CandlestickChartPoint[]>(() =>
    generateMarketHistoryData(visibleCount),
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      tickRef.current += 1;

      setCandles((currentCandles) => {
        const lastCandle = currentCandles[currentCandles.length - 1];

        if (!lastCandle) {
          return currentCandles;
        }

        if (tickRef.current % newCandleEveryTicks === 0) {
          return [...currentCandles.slice(-(visibleCount - 1)), createNextCandle(lastCandle)];
        }

        return [...currentCandles.slice(0, -1), updateLiveCandle(lastCandle)];
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
          <CandlestickChart
            data={createChartData(candles)}
            effect="none"
            options={{
              height: 620,
              dataZoom: [
                {
                  type: 'inside',
                  start: 0,
                  end: 100,
                },
              ],
            }}
          />
        </Box>
      </div>
    </main>
  );
};

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Bounce gives the candlestick chart a stronger animated entrance."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble adds an energetic motion to the candlestick chart entrance."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic creates a spring-like entrance for the candlestick chart."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive trace reveals the candlestick chart gradually across the dataset."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide combines spring-like motion with a smooth transition for candlestick data."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered reveal animates the candlestick chart with a delayed sequential entrance."
  />
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Candlestick Custom Colors"
        description="Customize financial colors through the colors prop while common chart colors use the shared chart CSS tokens."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Colors
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
            title="Custom Financial Colors"
            description="Financial colors use the colors prop while axis, grid, and tooltip styling use the shared chart tokens."
            api="colors + customStyles.wrapper"
          >
            <CandlestickChart
              data={createMarketData(50)}
              colors={customColors}
              effect="staggered-reveal"
              customStyles={{
                wrapper: customChartStyles,
              }}
              options={{
                height: 540,
                backgroundColor: '#fffbeb',
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
            title="Dark Trading Surface"
            description="Dark trading surface with financial colors from the colors prop and common chart styling from shared CSS tokens."
            api="colors + customStyles.wrapper + options.backgroundColor"
          >
            <CandlestickChart
              data={createMarketData(50)}
              colors={darkTradingColors}
              effect="staggered-reveal"
              customStyles={{
                wrapper: darkTradingStyles,
              }}
              options={{
                height: 540,
                backgroundColor: '#0f172a',
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
