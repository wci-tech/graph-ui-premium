/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import {
  Box,
  compactObject,
  FlexItem,
  FlexLayout,
  responsive,
  Typography,
} from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts/Chart';
import type { ChartEffect } from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/BarLineChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const commonData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      label: 'Revenue',
      data: [450, 650, 950, 1150, 1050, 1350],
    },
    {
      label: 'Forecast',
      data: [420, 700, 900, 1200, 1100, 1300],
    },
  ],
};

const matchingBarLineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      label: 'Revenue',
      data: [450, 650, 950, 1150, 1050, 1350],
    },
    {
      label: 'Revenue Trend',
      data: [450, 650, 950, 1150, 1050, 1350],
    },
  ],
};

const quarterlyData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    {
      label: 'Quarterly Revenue',
      data: [3200, 4600, 5100, 6800],
    },
    {
      label: 'Revenue Forecast',
      data: [3000, 4200, 5400, 6500],
    },
  ],
};

const customColorData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      label: 'Actual Revenue',
      data: [450, 650, 950, 1150, 1050, 1350],
      color: '#d4af37',
    },
    {
      label: 'Projected Revenue',
      data: [420, 700, 900, 1200, 1100, 1300],
      color: '#2d5a27',
    },
  ],
};

const trendData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    {
      label: 'Actual Sales',
      data: [450, 620, 380, 810, 540, 900, 720],
    },
    {
      label: 'Market Trend',
      data: [430, 580, 420, 760, 590, 850, 760],
    },
  ],
};

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

const comparisonRow = css`
  margin-top: 32px;
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
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 10px 25px rgb(15 23 42 / 6%);
`;

const chartShell = css`
  position: relative;
  width: 100%;
  min-width: 0;
  min-height: 420px;
  margin-top: 16px;
  overflow: visible;

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

const apiPill = css`
  display: inline-flex;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #334155;
  font-family: monospace;
  font-size: 12px;
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
  text-align: center;
`;

const statValueGreen = css`
  color: #013a28;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

const statLabelGreen = css`
  color: #013a28;
  text-align: center;
`;

const customChartVariables = css`
  --wci-chart-blue: #2563eb;
  --wci-chart-teal: #0d9488;
  --wci-chart-green: #16a34a;
  --wci-chart-orange: #ea580c;
  --wci-chart-red: #dc2626;
  --wci-chart-purple: #9333ea;
  --wci-chart-magenta: #db2777;
  --wci-chart-cyan: #0891b2;
  --wci-chart-yellow: #ca8a04;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #7c3aed;
  --wci-chart-grid: #cbd5e1;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #0f172a;
  --wci-chart-tooltip-border: #7c3aed;
`;

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
  statValue = 'bar-line',
  statLabel = 'Chart Type',
  secondaryStatValue = 'auto',
  secondaryStatLabel = 'Default',
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

type SectionHeadingProps = {
  readonly title: string;
  readonly description: string;
};

const SectionHeading = ({ title, description }: SectionHeadingProps) => (
  <>
    <Typography variant="h2" customStyles={titleH2}>
      {title}
    </Typography>
    <Typography variant="p" customStyles={sectionDescription}>
      {description}
    </Typography>
  </>
);

type ChartCardProps = {
  readonly chartName: 'Chart.js' | 'ECharts';
  readonly description?: string;
  readonly api?: string;
  readonly children: ReactNode;
};

const ChartCard = ({ chartName, description, api, children }: ChartCardProps) => {
  return (
    <Box customStyles={chartCard}>
      <FlexLayout direction="column" gap="12px">
        <Typography variant="span" customStyles={chartNamePill}>
          {chartName}
        </Typography>

        {description ? (
          <Typography
            variant="p"
            customStyles={css`
              ${paragraphSmall};
              color: var(--wci-gray-700);
            `}
          >
            {description}
          </Typography>
        ) : null}

        {api ? (
          <Typography variant="span" customStyles={apiPill}>
            {api}
          </Typography>
        ) : null}

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

type BarLineComparisonProps = {
  readonly data?: typeof commonData;
  readonly appearance?: 'basic' | 'smooth';
  readonly effect?: ChartEffect;
  readonly chartJSOptions?: Record<string, unknown>;
  readonly eChartsOptions?: Record<string, unknown>;
  readonly colors?: {
    readonly series?: readonly string[];
    readonly axisText?: string;
    readonly axisLine?: string;
    readonly grid?: string;
    readonly tooltipBackground?: string;
    readonly tooltipText?: string;
    readonly tooltipBorder?: string;
    readonly trendUp?: string;
    readonly trendDown?: string;
    readonly trendNeutral?: string;
  };
};

const BarLineComparison = ({
  data = commonData,
  appearance = 'smooth',
  effect = 'none',
  chartJSOptions,
  eChartsOptions,
  colors,
}: BarLineComparisonProps) => (
  <ComparisonGrid>
    <ComparisonItem>
      <ChartCard
        chartName="Chart.js"
        description="Bar-Line chart rendered using the Chart.js engine."
        api={`appearance="${appearance}" effect="${effect}"`}
      >
        <Chart
          {...compactObject({
            type: 'bar-line' as const,
            engine: 'chart-1' as const,
            data,
            appearance,
            effect,
            colors,
            options: {
              barWidth: 44,
              showLegend: true,
              ...chartJSOptions,
            },
          })}
        />
      </ChartCard>
    </ComparisonItem>

    <ComparisonItem>
      <ChartCard
        chartName="ECharts"
        description="Bar-Line chart rendered using the ECharts engine."
        api={`appearance="${appearance}" effect="${effect}"`}
      >
        <Chart
          {...compactObject({
            type: 'bar-line' as const,
            engine: 'chart-2' as const,
            data,
            appearance,
            effect,
            colors,
            options: {
              barWidth: 44,
              legend: {
                show: true,
              },
              ...eChartsOptions,
            },
          })}
        />
      </ChartCard>
    </ComparisonItem>
  </ComparisonGrid>
);

type BarLineEffectComparisonProps = {
  readonly title: string;
  readonly description: string;
  readonly effect: ChartEffect;
  readonly useMatchingData?: boolean;
};

const BarLineEffectComparison = ({
  title,
  description,
  effect,
  useMatchingData = false,
}: BarLineEffectComparisonProps) => {
  const data = useMatchingData ? matchingBarLineData : commonData;

  return (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title={title}
          description={description}
          statValue="2"
          statLabel="Engines"
          secondaryStatValue="1"
          secondaryStatLabel="Effect"
        />

        <section css={pageSection}>
          <SectionHeading
            title={`${title} Comparison`}
            description="The same effect and data are rendered side by side using Chart.js and ECharts."
          />

          <BarLineComparison
            data={data}
            effect={effect}
            eChartsOptions={{
              touchBarTop: useMatchingData,
            }}
          />
        </section>
      </div>
    </main>
  );
};

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Chart"
        description="The same mixed-series data is rendered using Chart.js and ECharts for side-by-side comparison."
        statValue="2"
        statLabel="Engines"
        secondaryStatValue="1"
        secondaryStatLabel="Dataset"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines use the smooth appearance, shared chart colors, visible legends, and matching bar widths."
        />

        <BarLineComparison effect="progressive-trace" />
      </section>
    </div>
  </main>
);

export const Appearances = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Chart Appearances"
        description="Basic straight lines and smooth curved lines are compared across Chart.js and ECharts."
        statValue="2"
        statLabel="Appearances"
        secondaryStatValue="4"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Basic Appearance"
          description="The line series uses straight segments between each category."
        />

        <BarLineComparison appearance="basic" effect="progressive-trace" />
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Smooth Appearance"
          description="The line series uses curved transitions between categories."
        />

        <BarLineComparison appearance="smooth" effect="progressive-trace" />
      </section>
    </div>
  </main>
);

export const BounceEffect = () => (
  <BarLineEffectComparison
    title="Bar Line Chart Bounce Effect"
    description="Bounce easing creates an energetic entrance for both bar and line series."
    effect="bounce"
    useMatchingData
  />
);

export const WobbleEffect = () => (
  <BarLineEffectComparison
    title="Bar Line Chart Wobble Effect"
    description="The wobble effect adds a short oscillating motion to the mixed-chart entrance."
    effect="wobble"
    useMatchingData
  />
);

export const ElasticEffect = () => (
  <BarLineEffectComparison
    title="Bar Line Chart Elastic Effect"
    description="Elastic easing briefly stretches the mixed series before settling into position."
    effect="elastic"
    useMatchingData
  />
);

export const ProgressiveTraceEffect = () => (
  <BarLineEffectComparison
    title="Bar Line Chart Progressive Trace Effect"
    description="The bars and line are progressively revealed across the category axis."
    effect="progressive-trace"
    useMatchingData
  />
);

export const ElasticGlideEffect = () => (
  <BarLineEffectComparison
    title="Bar Line Chart Elastic Glide Effect"
    description="Elastic movement is combined with a smooth gliding entrance."
    effect="elastic-glide"
    useMatchingData
  />
);

export const StaggeredRevealEffect = () => (
  <BarLineEffectComparison
    title="Bar Line Chart Staggered Reveal Effect"
    description="Bar and line elements are introduced sequentially using animation delays."
    effect="staggered-reveal"
    useMatchingData
  />
);

export const StandardEffect = () => (
  <BarLineEffectComparison
    title="Bar Line Chart Standard Effect"
    description="Both engines are displayed without an additional named animation effect."
    effect="none"
  />
);

export const BarWidthOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Width Options"
        description="Thin, default, and wide bar widths are compared across both engines."
        statValue="3"
        statLabel="Widths"
        secondaryStatValue="6"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Thin Bars"
          description="A narrow bar width provides more spacing between categories."
        />

        <BarLineComparison
          effect="progressive-trace"
          chartJSOptions={{
            barWidth: 20,
          }}
          eChartsOptions={{
            barWidth: 20,
          }}
        />
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Default Bars"
          description="The default bar width balances visual weight and category spacing."
        />

        <BarLineComparison
          effect="progressive-trace"
          chartJSOptions={{
            barWidth: 44,
          }}
          eChartsOptions={{
            barWidth: 44,
          }}
        />
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Wide Bars"
          description="Wider bars place stronger emphasis on each category."
        />

        <BarLineComparison
          effect="progressive-trace"
          chartJSOptions={{
            barWidth: 64,
          }}
          eChartsOptions={{
            barWidth: 64,
          }}
        />
      </section>
    </div>
  </main>
);

export const TrendPoints = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Trend Points"
        description="Semantic increase, decrease, and neutral colors are compared across both engines."
        statValue="2"
        statLabel="Engines"
        secondaryStatValue="3"
        secondaryStatLabel="Trend States"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Trend Point Colors"
          description="Both engines resolve trend points from the same shared semantic chart colors."
        />

        <BarLineComparison data={trendData} effect="progressive-trace" />
      </section>
    </div>
  </main>
);

export const CustomSeriesColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Custom Series Colors"
        description="Series-level colors are passed through the shared data API and respected by both engines."
        statValue="2"
        statLabel="Engines"
        secondaryStatValue="2"
        secondaryStatLabel="Series Colors"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Per-Series Colors"
          description="The bar and line series use the colors supplied directly through the shared series data."
        />

        <BarLineComparison data={customColorData} effect="progressive-trace" />
      </section>
    </div>
  </main>
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Custom Colors"
        description="The complete shared Bar-Line color API is applied to both Chart.js and ECharts."
        statValue="10"
        statLabel="Color Tokens"
        secondaryStatValue="2"
        secondaryStatLabel="Engines"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Shared Colors API"
          description="Series, axes, grid, tooltip, and semantic trend colors use the same shared configuration."
        />

        <BarLineComparison
          data={trendData}
          effect="none"
          colors={{
            series: ['#7c3aed', '#f97316', '#0891b2', '#db2777'],
            axisText: '#1e293b',
            axisLine: '#9333ea',
            grid: '#d8b4fe',
            tooltipBackground: '#faf5ff',
            tooltipText: '#581c87',
            tooltipBorder: '#7e22ce',
            trendUp: '#15803d',
            trendDown: '#b91c1c',
            trendNeutral: '#475569',
          }}
        />
      </section>
    </div>
  </main>
);

export const CustomCSSVariables = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line CSS Variables"
        description="The shared chart CSS variables are overridden once and consumed by both rendering engines."
        statValue="15"
        statLabel="CSS Variables"
        secondaryStatValue="2"
        secondaryStatLabel="Engines"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Shared CSS Variables"
          description="Series palette, semantic trend states, axes, grid, and tooltip colors are overridden through the shared chart variables."
        />

        <div css={customChartVariables}>
          <BarLineComparison data={trendData} effect="none" />
        </div>
      </section>
    </div>
  </main>
);

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Custom Tooltip"
        description="Engine-specific native tooltip options remain available while both charts share the same high-level API."
        statValue="2"
        statLabel="Tooltips"
        secondaryStatValue="2"
        secondaryStatLabel="Engines"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Native Tooltip Configuration"
          description="Chart.js and ECharts receive their own native tooltip configuration through the shared options entry point."
        />

        <BarLineComparison
          data={quarterlyData}
          effect="progressive-trace"
          chartJSOptions={{
            boldLabels: true,
            boldLegends: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            plugins: {
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#ffffff',
                borderColor: '#763d6c',
                borderWidth: 2,
                titleColor: '#0f172a',
                bodyColor: '#475569',
                footerColor: '#0f172a',
                cornerRadius: 10,
                padding: 14,
                displayColors: true,
                caretSize: 8,
                caretPadding: 10,
                titleFont: {
                  size: 14,
                  weight: 'bold',
                },
                bodyFont: {
                  size: 13,
                },
                footerFont: {
                  size: 13,
                  weight: 'bold',
                },
              },
            },
          }}
          eChartsOptions={{
            tooltip: {
              show: true,
              trigger: 'axis',
              confine: true,
              backgroundColor: '#ffffff',
              borderColor: '#763d6c',
              borderWidth: 2,
              padding: 14,
              textStyle: {
                color: '#475569',
                fontSize: 13,
              },
              extraCssText: 'border-radius: 10px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.14);',
            },
          }}
        />
      </section>
    </div>
  </main>
);

export const Crosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Crosshair"
        description="Crosshair inspection is compared using the native interaction implementation of each engine."
        statValue="2"
        statLabel="Crosshairs"
        secondaryStatValue="2"
        secondaryStatLabel="Engines"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Crosshair Interaction"
          description="Both engines enable crosshair behavior through the same high-level crosshair option."
        />

        <BarLineComparison
          data={trendData}
          effect="progressive-trace"
          chartJSOptions={{
            crosshair: true,
            boldLabels: true,
            boldLegends: true,
          }}
          eChartsOptions={{
            crosshair: true,
          }}
        />
      </section>
    </div>
  </main>
);
