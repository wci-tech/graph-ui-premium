/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts/Chart';
import type {
  ChartCandlestickColors,
  ChartCandlestickPoint,
  ChartData,
  ChartEffect,
} from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/CandlestickChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const manualCandleData: ChartCandlestickPoint[] = [
  {
    t: '2024-03-10',
    o: 149.69,
    h: 152.5,
    l: 148.25,
    c: 152.38,
    v: 64_390_000,
  },
  {
    t: '2024-03-11',
    o: 150.5,
    h: 151.2,
    l: 137.8,
    c: 146.9,
    v: 70_110_000,
  },
  {
    t: '2024-03-12',
    o: 154.67,
    h: 159.73,
    l: 154.01,
    c: 158.03,
    v: 38_450_000,
  },
  {
    t: '2024-03-13',
    o: 152.6,
    h: 156.9,
    l: 145.5,
    c: 152.25,
    v: 44_820_000,
  },
  {
    t: '2024-03-14',
    o: 152.2,
    h: 162.8,
    l: 145.1,
    c: 157.2,
    v: 61_240_000,
  },
  {
    t: '2024-03-15',
    o: 153.9,
    h: 156.2,
    l: 143.1,
    c: 149.65,
    v: 55_930_000,
  },
  {
    t: '2024-03-16',
    o: 147.9,
    h: 148.8,
    l: 139.2,
    c: 141.85,
    v: 83_220_000,
  },
  {
    t: '2024-03-17',
    o: 146.9,
    h: 150.1,
    l: 140.5,
    c: 148.2,
    v: 41_340_000,
  },
  {
    t: '2024-03-18',
    o: 148.8,
    h: 156.8,
    l: 146.5,
    c: 149.6,
    v: 37_650_000,
  },
  {
    t: '2024-03-19',
    o: 143.1,
    h: 148.5,
    l: 134.2,
    c: 141.7,
    v: 92_760_000,
  },
  {
    t: '2024-03-20',
    o: 144.9,
    h: 153.7,
    l: 139.8,
    c: 147.8,
    v: 52_590_000,
  },
  {
    t: '2024-03-21',
    o: 149.1,
    h: 151.7,
    l: 142.6,
    c: 149.45,
    v: 31_870_000,
  },
  {
    t: '2024-03-22',
    o: 146.8,
    h: 152.9,
    l: 142.4,
    c: 150.1,
    v: 49_280_000,
  },
  {
    t: '2024-03-23',
    o: 149.5,
    h: 156.9,
    l: 147.1,
    c: 151.3,
    v: 44_160_000,
  },
  {
    t: '2024-03-24',
    o: 156.9,
    h: 158,
    l: 150.8,
    c: 157.15,
    v: 53_730_000,
  },
  {
    t: '2024-03-25',
    o: 156.5,
    h: 167.6,
    l: 156.4,
    c: 163.5,
    v: 86_190_000,
  },
  {
    t: '2024-03-26',
    o: 149.8,
    h: 156.9,
    l: 139,
    c: 142.8,
    v: 77_880_000,
  },
  {
    t: '2024-03-27',
    o: 142.8,
    h: 151,
    l: 139.3,
    c: 144.2,
    v: 46_640_000,
  },
  {
    t: '2024-03-28',
    o: 141.4,
    h: 149.2,
    l: 137.1,
    c: 147.5,
    v: 56_920_000,
  },
  {
    t: '2024-03-29',
    o: 145.9,
    h: 150.5,
    l: 143.7,
    c: 150.1,
    v: 62_150_000,
  },
];

const createCandlestickData = (points: readonly ChartCandlestickPoint[]): ChartData => ({
  labels: points.map((point) =>
    point.t instanceof Date ? point.t.toISOString() : String(point.t),
  ),
  series: [
    {
      label: 'Market Index',
      data: points,
    },
  ],
});

const commonData = createCandlestickData(manualCandleData);

const shortData = createCandlestickData(manualCandleData.slice(0, 12));

/* -------------------------------------------------------------------------- */
/* Colors                                                                     */
/* -------------------------------------------------------------------------- */

const customColors: ChartCandlestickColors = {
  up: '#16a34a',
  down: '#dc2626',
  unchanged: '#64748b',
  volumeUp: 'rgb(22 163 74 / 32%)',
  volumeDown: 'rgb(220 38 38 / 32%)',
  axisText: '#334155',
  axisLine: '#7c3aed',
  grid: '#cbd5e1',
  crosshair: '#111827',
  crosshairLabelBackground: '#111827',
  crosshairLabelText: '#ffffff',
  tooltipBackground: '#ffffff',
  tooltipText: '#0f172a',
  tooltipBorder: '#7c3aed',
};

const darkTradingColors: ChartCandlestickColors = {
  up: '#22c55e',
  down: '#ef4444',
  unchanged: '#94a3b8',
  volumeUp: 'rgb(34 197 94 / 28%)',
  volumeDown: 'rgb(239 68 68 / 28%)',
  axisText: '#cbd5e1',
  axisLine: '#475569',
  grid: 'rgb(148 163 184 / 14%)',
  crosshair: 'rgb(203 213 225 / 65%)',
  crosshairLabelBackground: '#020617',
  crosshairLabelText: '#ffffff',
  tooltipBackground: '#020617',
  tooltipText: '#ffffff',
  tooltipBorder: '#475569',
};

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const pageContainer = css`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;

  ${responsive.create({
    padding: {
      default: '20px',
      md: '32px',
      lg: '40px',
    },
  })}
`;

const pageSection = css`
  margin-top: 56px;
`;

const titleH1 = css`
  margin-bottom: 16px;
  color: #1e293b;
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH2 = css`
  margin-bottom: 12px;
  color: #1e293b;
  font-size: 1.875rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  color: #475569;
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const sectionDescription = css`
  max-width: 820px;
  margin-bottom: 24px;
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
`;

const heroBox = css`
  padding: 32px !important;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #f8fafc;
`;

const chartCard = css`
  width: 100%;
  height: 100%;
  min-width: 0;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 10px 25px rgb(15 23 42 / 6%);
`;

const chartShell = css`
  position: relative;
  width: 100%;
  min-width: 0;
  margin-top: 16px;

  > div {
    width: 100%;
    min-width: 0;
  }
`;

const chartNamePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 5px 10px;
  border: 1px solid #dbeafe;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const statBox = css`
  min-width: 140px;
  padding: 20px;
  border: 1px solid #bae6fd;
  border-radius: 10px;
  background: #f0f9ff;
  text-align: center;
`;

const statBoxGreen = css`
  min-width: 140px;
  padding: 20px;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  background: #f0fdf4;
  text-align: center;
`;

const statValueBlue = css`
  color: #0369a1;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

const statLabelBlue = css`
  color: #0c4a6e;
`;

const statValueGreen = css`
  color: #013a28;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

const statLabelGreen = css`
  color: #013a28;
`;

const darkChartContainer = css`
  border-radius: 12px;
  background: #0f172a;
`;

/* -------------------------------------------------------------------------- */
/* Shared components                                                          */
/* -------------------------------------------------------------------------- */

type PageIntroProps = {
  readonly title: string;
  readonly description: string;
  readonly statValue?: string;
  readonly statLabel?: string;
  readonly secondaryStatValue?: string;
  readonly secondaryStatLabel?: string;
};

const PageIntro = ({
  title,
  description,
  statValue = '2',
  statLabel = 'Charts',
  secondaryStatValue = 'OHLCV',
  secondaryStatLabel = 'Data',
}: PageIntroProps) => (
  <FlexLayout
    direction={{
      default: 'column',
      md: 'row',
    }}
    columns={12}
    padding={{ default: 0 }}
    gap={{
      default: '32px',
      md: '60px',
    }}
    fullWidth
  >
    <FlexItem
      columnSpan={{
        default: 12,
        md: 7,
      }}
    >
      <Typography variant="h1" customStyles={titleH1}>
        {title}
      </Typography>
      <Typography variant="p" customStyles={paragraph}>
        {description}
      </Typography>
    </FlexItem>

    <FlexItem
      columnSpan={{
        default: 12,
        md: 5,
      }}
    >
      <Box customStyles={heroBox}>
        <FlexLayout direction="row" gap="16px" wrap="wrap" justifyContent="center">
          <Box customStyles={statBox}>
            <Typography variant="p" customStyles={statValueBlue}>
              {statValue}
            </Typography>
            <Typography variant="span" customStyles={statLabelBlue}>
              {statLabel}
            </Typography>
          </Box>

          <Box customStyles={statBoxGreen}>
            <Typography variant="p" customStyles={statValueGreen}>
              {secondaryStatValue}
            </Typography>
            <Typography variant="span" customStyles={statLabelGreen}>
              {secondaryStatLabel}
            </Typography>
          </Box>
        </FlexLayout>
      </Box>
    </FlexItem>
  </FlexLayout>
);

const SectionHeading = ({
  title,
  description,
}: {
  readonly title: string;
  readonly description: string;
}) => (
  <>
    <Typography variant="h2" customStyles={titleH2}>
      {title}
    </Typography>
    <Typography variant="p" customStyles={sectionDescription}>
      {description}
    </Typography>
  </>
);

const ChartCard = ({
  chartName,
  description,
  children,
}: {
  readonly chartName: 'Chart 1' | 'Chart 2';
  readonly description: string;
  readonly children: ReactNode;
}) => {
  return (
    <Box customStyles={chartCard}>
      <FlexLayout direction="column" gap="12px">
        <Typography variant="span" customStyles={chartNamePill}>
          {chartName}
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

        <div css={chartShell}>{children}</div>
      </FlexLayout>
    </Box>
  );
};

const ComparisonGrid = ({ children }: { readonly children: ReactNode }) => (
  <FlexLayout
    padding={{ default: 0 }}
    columns={12}
    gap={{
      default: '24px',
      md: '32px',
    }}
    wrap="wrap"
    fullWidth
  >
    {children}
  </FlexLayout>
);

const ComparisonItem = ({ children }: { readonly children: ReactNode }) => (
  <FlexItem
    columnSpan={{
      default: 12,
      lg: 6,
    }}
  >
    {children}
  </FlexItem>
);

/* -------------------------------------------------------------------------- */
/* Default rendering                                                          */
/* -------------------------------------------------------------------------- */

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Candlestick Chart"
        description="The same OHLCV market data is displayed using Chart 1 and Chart 2."
      />

      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines receive the same shared candlestick data and resolve their default financial presentation."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders the shared candlestick data using Chart.js."
            >
              <Chart
                type="candlestick"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: '540px',
                  showLegend: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders the same candlestick data using ECharts."
            >
              <Chart
                type="candlestick"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: '540px',
                  showLegend: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Effects                                                                    */
/* -------------------------------------------------------------------------- */

type SharedCandlestickEffect = Extract<
  ChartEffect,
  | 'none'
  | 'bounce'
  | 'wobble'
  | 'elastic'
  | 'progressive-trace'
  | 'elastic-glide'
  | 'staggered-reveal'
>;

type EffectComparisonProps = {
  readonly title: string;
  readonly description: string;
  readonly effect: SharedCandlestickEffect;
};

const EffectComparison = ({ title, description, effect }: EffectComparisonProps) => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title={title}
        description={description}
        secondaryStatValue="1"
        secondaryStatLabel="Shared Effect"
      />

      <section css={pageSection}>
        <SectionHeading
          title={`${title} Comparison`}
          description="The same shared effect is passed through the common Chart API to Chart 1 and Chart 2."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js renders the selected shared candlestick effect."
            >
              <Chart
                type="candlestick"
                engine="chart-1"
                data={shortData}
                effect={effect}
                options={{
                  height: '520px',
                  showLegend: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts renders the equivalent shared candlestick effect."
            >
              <Chart
                type="candlestick"
                engine="chart-2"
                data={shortData}
                effect={effect}
                options={{
                  height: '520px',
                  showLegend: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const ProgressiveTraceEffect = () => (
  <EffectComparison
    title="Candlestick Progressive Trace Effect"
    description="Candles progressively enter from the first market period."
    effect="progressive-trace"
  />
);

export const BounceEffect = () => (
  <EffectComparison
    title="Candlestick Bounce Effect"
    description="Candles enter using a stronger bounce animation."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Candlestick Wobble Effect"
    description="Candles enter using a short wobble movement."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Candlestick Elastic Effect"
    description="Candles use elastic motion while entering the chart."
    effect="elastic"
  />
);

export const ElasticGlideEffect = () => (
  <EffectComparison
    title="Candlestick Elastic Glide Effect"
    description="Candles combine elastic motion with a smooth glide entrance."
    effect="elastic-glide"
  />
);

export const StaggeredRevealEffect = () => (
  <EffectComparison
    title="Candlestick Staggered Reveal Effect"
    description="Candles are revealed using controlled sequential delays."
    effect="staggered-reveal"
  />
);

/* -------------------------------------------------------------------------- */
/* Custom colors                                                              */
/* -------------------------------------------------------------------------- */

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Candlestick Chart Colors"
        description="The same shared financial color configuration is passed to Chart.js and ECharts."
        statValue="2"
        statLabel="Engines"
        secondaryStatValue="1"
        secondaryStatLabel="Color API"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Custom Financial Colors"
          description="Both engines receive the same colors prop without engine-specific candlestick CSS variables."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js resolves the shared candlestick colors through its adapter."
            >
              <Chart
                type="candlestick"
                engine="chart-1"
                data={commonData}
                colors={customColors}
                effect="staggered-reveal"
                options={{
                  height: '540px',
                  showLegend: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts receives the same shared candlestick colors through its adapter."
            >
              <Chart
                type="candlestick"
                engine="chart-2"
                data={commonData}
                colors={customColors}
                effect="staggered-reveal"
                options={{
                  height: '540px',
                  showLegend: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Dark Trading Surface"
          description="Both engines use the same financial color contract on a dark trading surface."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js uses shared candlestick colors and its chart background option."
            >
              <Chart
                type="candlestick"
                engine="chart-1"
                data={commonData}
                colors={darkTradingColors}
                effect="none"
                customStyles={{
                  container: darkChartContainer,
                }}
                options={{
                  height: '540px',
                  showLegend: false,
                  chartBackground: '#0f172a',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts uses the same financial colors with its backgroundColor option."
            >
              <Chart
                type="candlestick"
                engine="chart-2"
                data={commonData}
                colors={darkTradingColors}
                effect="none"
                customStyles={{
                  container: darkChartContainer,
                }}
                options={{
                  height: '540px',
                  showLegend: false,
                  backgroundColor: '#0f172a',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Custom options                                                             */
/* -------------------------------------------------------------------------- */

export const CustomOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Candlestick Chart Options"
        description="Engine-specific options remain available while both engines share the same Chart data and colors contracts."
        statValue="2"
        statLabel="Option Groups"
        secondaryStatValue="4"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Custom Tooltip"
          description="Both engines use equivalent tooltip styling through their native option structures."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js uses its native plugins.tooltip configuration."
            >
              <Chart
                type="candlestick"
                engine="chart-1"
                data={commonData}
                colors={customColors}
                effect="none"
                options={{
                  height: '540px',
                  showLegend: false,
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
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts uses its native tooltip configuration."
            >
              <Chart
                type="candlestick"
                engine="chart-2"
                data={commonData}
                colors={customColors}
                effect="none"
                options={{
                  height: '540px',
                  showLegend: false,
                  tooltip: {
                    trigger: 'axis',
                    confine: true,
                    backgroundColor: '#ffffff',
                    borderColor: '#763d6c',
                    borderWidth: 2,
                    padding: 14,
                    textStyle: {
                      color: '#475569',
                    },
                    extraCssText:
                      'border-radius: 10px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.14);',
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Custom Background"
          description="Each engine keeps its native background option while the common Chart API remains unchanged."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js uses chartBackground through its chart options."
            >
              <Chart
                type="candlestick"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                options={{
                  height: '540px',
                  showLegend: false,
                  chartBackground: '#f8fafc',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts uses its native backgroundColor option."
            >
              <Chart
                type="candlestick"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                options={{
                  height: '540px',
                  showLegend: false,
                  backgroundColor: '#f8fafc',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);
