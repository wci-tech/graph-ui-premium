/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts/Chart';
import type { ChartData } from '@/charts/Chart.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/BubbleChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type BubblePoint = readonly [x: number, y: number, radius: number];

type BubbleSourceSeries = {
  readonly label: string;
  readonly color?: string;
  readonly data: readonly BubblePoint[];
};

type BubbleSourceData = {
  readonly series: readonly BubbleSourceSeries[];
};

type BubbleEffect =
  | 'none'
  | 'bounce'
  | 'wobble'
  | 'elastic'
  | 'progressive-trace'
  | 'elastic-glide'
  | 'staggered-reveal';

const commonSourceData: BubbleSourceData = {
  series: [
    {
      label: 'Market Segment A',
      data: [
        [10, 80, 40],
        [20, 70, 60],
        [35, 60, 20],
        [50, 40, 80],
        [70, 90, 50],
      ],
    },
    {
      label: 'Market Segment B',
      data: [
        [15, 40, 30],
        [25, 30, 50],
        [40, 85, 40],
        [60, 20, 70],
        [80, 50, 25],
      ],
    },
  ],
};

const singleSeriesSourceData: BubbleSourceData = {
  series: [commonSourceData.series[0]],
};

const denseSourceData: BubbleSourceData = {
  series: [
    ...commonSourceData.series,
    {
      label: 'Market Segment C',
      data: [
        [12, 35, 25],
        [32, 45, 45],
        [52, 75, 65],
        [72, 30, 35],
      ],
    },
  ],
};

const largeBubbleSourceData: BubbleSourceData = {
  series: commonSourceData.series.map((seriesItem) => ({
    ...seriesItem,
    data: seriesItem.data.map(([x, y, radius]): BubblePoint => [x, y, radius * 1.6]),
  })),
};

const toChartData = (source: BubbleSourceData): ChartData => ({
  labels: [],
  series: source.series.map((seriesItem) => ({
    label: seriesItem.label,
    data: seriesItem.data,
    ...(seriesItem.color ? { color: seriesItem.color } : {}),
  })),
});

const commonData = toChartData(commonSourceData);
const singleSeriesData = toChartData(singleSeriesSourceData);
const denseData = toChartData(denseSourceData);
const largeBubbleData = toChartData(largeBubbleSourceData);

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
  statValue = 'bubble',
  statLabel = 'Chart Type',
  secondaryStatValue = 'auto',
  secondaryStatLabel = 'Default',
}: PageIntroProps) => (
  <FlexLayout
    direction={{ default: 'column', md: 'row' }}
    columns={12}
    padding={{ default: 0 }}
    gap={{ default: '32px', md: '60px' }}
    fullWidth
  >
    <FlexItem columnSpan={{ default: 12, md: 7 }}>
      <Typography variant="h1" customStyles={titleH1}>
        {title}
      </Typography>
      <Typography variant="p" customStyles={paragraph}>
        {description}
      </Typography>
    </FlexItem>
    <FlexItem columnSpan={{ default: 12, md: 5 }}>
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
}) => (
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

const ComparisonGrid = ({ children }: { readonly children: ReactNode }) => (
  <FlexLayout
    padding={{ default: 0 }}
    columns={12}
    gap={{ default: '24px', md: '32px' }}
    wrap="wrap"
    fullWidth
  >
    {children}
  </FlexLayout>
);

const ComparisonItem = ({ children }: { readonly children: ReactNode }) => (
  <FlexItem columnSpan={{ default: 12, lg: 6 }}>{children}</FlexItem>
);

type BubbleComparisonProps = {
  readonly data: ChartData;
  readonly effect?: BubbleEffect;
  readonly showLegend?: boolean;
  readonly chart1Description: string;
  readonly chart2Description: string;
};

const BubbleComparison = ({
  data,
  effect = 'none',
  showLegend = true,
  chart1Description,
  chart2Description,
}: BubbleComparisonProps) => (
  <ComparisonGrid>
    <ComparisonItem>
      <ChartCard chartName="Chart 1" description={chart1Description}>
        <Chart
          type="bubble"
          engine="chart-1"
          data={data}
          effect={effect}
          options={{
            showLegend,
          }}
        />
      </ChartCard>
    </ComparisonItem>
    <ComparisonItem>
      <ChartCard chartName="Chart 2" description={chart2Description}>
        <Chart
          type="bubble"
          engine="chart-2"
          data={data}
          effect={effect}
          options={{
            showLegend,
          }}
        />
      </ChartCard>
    </ComparisonItem>
  </ComparisonGrid>
);

type EffectComparisonProps = {
  readonly title: string;
  readonly description: string;
  readonly effect: BubbleEffect;
  readonly multipleSeries?: boolean;
};

const EffectComparison = ({
  title,
  description,
  effect,
  multipleSeries = false,
}: EffectComparisonProps) => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title={title}
        description={description}
        statValue="2"
        statLabel="Charts"
        secondaryStatValue={effect}
        secondaryStatLabel="Effect"
      />
      <section css={pageSection}>
        <SectionHeading
          title={`${title} Comparison`}
          description="The same shared effect is passed to both chart engines."
        />
        <BubbleComparison
          data={multipleSeries ? commonData : singleSeriesData}
          effect={effect}
          showLegend={multipleSeries}
          chart1Description={`Chart 1 using the ${effect} effect.`}
          chart2Description={`Chart 2 using the ${effect} effect.`}
        />
      </section>
    </div>
  </main>
);

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bubble Chart"
        description="The same bubble dataset is rendered by both chart engines using the shared Bubble Chart API."
        statValue="2"
        statLabel="Charts"
        secondaryStatValue="2"
        secondaryStatLabel="Series"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines receive the same source data, options, and effect configuration."
        />
        <BubbleComparison
          data={commonData}
          effect="progressive-trace"
          chart1Description="Chart 1 normalizes the shared bubble values for its renderer."
          chart2Description="Chart 2 normalizes the same shared bubble values for its renderer."
        />
      </section>
    </div>
  </main>
);

export const RevealEffect = () => (
  <EffectComparison
    title="Bubble Chart Reveal Effect"
    description="Both charts progressively reveal their bubble points."
    effect="progressive-trace"
  />
);

export const BounceEffect = () => (
  <EffectComparison
    title="Bubble Chart Bounce Effect"
    description="Both charts use the shared bounce entrance effect."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Bubble Chart Wobble Effect"
    description="Both charts use the shared wobble entrance effect."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Bubble Chart Elastic Effect"
    description="Both charts use the shared elastic entrance effect."
    effect="elastic"
  />
);

export const ElasticGlideEffect = () => (
  <EffectComparison
    title="Bubble Chart Elastic Glide Effect"
    description="Both charts combine elastic movement with a smooth glide."
    effect="elastic-glide"
  />
);

export const StaggeredRevealEffect = () => (
  <EffectComparison
    title="Bubble Chart Staggered Reveal Effect"
    description="Both charts reveal multiple bubble series with staggered timing."
    effect="staggered-reveal"
    multipleSeries
  />
);

export const StandardEffect = () => (
  <EffectComparison
    title="Bubble Chart Standard Rendering"
    description="Both charts render without an additional named animation effect."
    effect="none"
    multipleSeries
  />
);

export const Crosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bubble Chart Crosshair"
        description="Crosshair inspection is enabled through the shared options.crosshair API."
        statValue="true"
        statLabel="Crosshair"
        secondaryStatValue="2"
        secondaryStatLabel="Charts"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Crosshair Inspection"
          description="Both engines enable their renderer-specific crosshair implementation from the same shared option."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 with crosshair inspection enabled.">
              <Chart
                type="bubble"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                options={{
                  crosshair: true,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  xAxisTitle: 'Market Share (%)',
                  yAxisTitle: 'Growth Rate (%)',
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 with matching crosshair inspection enabled."
            >
              <Chart
                type="bubble"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                options={{
                  crosshair: true,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  xAxisTitle: 'Market Share (%)',
                  yAxisTitle: 'Growth Rate (%)',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const AxisTitlesAndLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bubble Chart Axis Configuration"
        description="Axis titles, bold labels, and bold legends use the same shared options across both engines."
        statValue="2"
        statLabel="Axes"
        secondaryStatValue="bold"
        secondaryStatLabel="Labels"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Axis Titles and Typography"
          description="Both engines receive identical axis-title and typography options."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 with named axes and bold chart typography."
            >
              <Chart
                type="bubble"
                engine="chart-1"
                data={commonData}
                effect="elastic"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  xAxisTitle: 'Market Share (%)',
                  yAxisTitle: 'Growth Rate (%)',
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 with matching named axes and bold chart typography."
            >
              <Chart
                type="bubble"
                engine="chart-2"
                data={commonData}
                effect="elastic"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  xAxisTitle: 'Market Share (%)',
                  yAxisTitle: 'Growth Rate (%)',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bubble Chart Custom Colors"
        description="Every shared Bubble Chart color is overridden through the colors API."
        statValue="7"
        statLabel="Color Controls"
        secondaryStatValue="2"
        secondaryStatLabel="Charts"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Complete Colors API Override"
          description="Series, axis text, axis line, grid, tooltip background, tooltip text, and tooltip border are all customized."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using the complete shared colors override."
            >
              <Chart
                type="bubble"
                engine="chart-1"
                data={denseData}
                effect="progressive-trace"
                colors={{
                  series: ['#7c3aed', '#f97316', '#0891b2'],
                  axisText: '#334155',
                  axisLine: '#9333ea',
                  grid: '#cbd5e1',
                  tooltipBackground: '#ffffff',
                  tooltipText: '#0f172a',
                  tooltipBorder: '#7c3aed',
                }}
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  xAxisTitle: 'Market Share (%)',
                  yAxisTitle: 'Growth Rate (%)',
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 using the same complete shared colors override."
            >
              <Chart
                type="bubble"
                engine="chart-2"
                data={denseData}
                effect="progressive-trace"
                colors={{
                  series: ['#7c3aed', '#f97316', '#0891b2'],
                  axisText: '#334155',
                  axisLine: '#9333ea',
                  grid: '#cbd5e1',
                  tooltipBackground: '#ffffff',
                  tooltipText: '#0f172a',
                  tooltipBorder: '#7c3aed',
                }}
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  xAxisTitle: 'Market Share (%)',
                  yAxisTitle: 'Growth Rate (%)',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bubble Chart Custom Styles"
        description="The wrapper overrides the complete shared chart palette and every semantic chart color token."
        statValue="15"
        statLabel="CSS Variables"
        secondaryStatValue="100%"
        secondaryStatLabel="Color Override"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Complete CSS Variable Override"
          description="All nine shared series colors plus axis text, axis line, grid, tooltip background, tooltip text, and tooltip border are overridden."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 resolves all chart colors from the overridden shared CSS variables."
            >
              <Chart
                type="bubble"
                engine="chart-1"
                data={denseData}
                effect="staggered-reveal"
                customStyles={{
                  container: customChartVariables,
                }}
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  xAxisTitle: 'Market Share (%)',
                  yAxisTitle: 'Growth Rate (%)',
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 resolves the same complete shared CSS variable overrides."
            >
              <Chart
                type="bubble"
                engine="chart-2"
                data={denseData}
                effect="staggered-reveal"
                customStyles={{
                  container: customChartVariables,
                }}
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  xAxisTitle: 'Market Share (%)',
                  yAxisTitle: 'Growth Rate (%)',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const LargerBubbleValues = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bubble Chart Size Scaling"
        description="Larger bubble values are supplied through the same shared source data."
        statValue="1.6×"
        statLabel="Bubble Value"
        secondaryStatValue="2"
        secondaryStatLabel="Charts"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Larger Bubble Values"
          description="The third tuple value is increased before the shared data reaches either engine."
        />
        <BubbleComparison
          data={largeBubbleData}
          effect="bounce"
          chart1Description="Chart 1 receives the increased shared bubble values."
          chart2Description="Chart 2 receives the same increased shared bubble values."
        />
      </section>
    </div>
  </main>
);

export const DenseMultipleSeries = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Dense Bubble Chart"
        description="Three bubble series are rendered to compare overlap, legend handling, and chart layout."
        statValue="3"
        statLabel="Series"
        secondaryStatValue="2"
        secondaryStatLabel="Charts"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Dense Multiple-Series Data"
          description="Both engines receive the same three-series dataset and shared chart configuration."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 rendering three bubble series.">
              <Chart
                type="bubble"
                engine="chart-1"
                data={denseData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  xAxisTitle: 'Market Share (%)',
                  yAxisTitle: 'Growth Rate (%)',
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 rendering the same three bubble series."
            >
              <Chart
                type="bubble"
                engine="chart-2"
                data={denseData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  xAxisTitle: 'Market Share (%)',
                  yAxisTitle: 'Growth Rate (%)',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const DarkBackground = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bubble Chart Dark Background"
        description="Both charts use the same dark semantic color configuration."
        statValue="dark"
        statLabel="Surface"
        secondaryStatValue="7"
        secondaryStatLabel="Colors"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Dark Chart Surface"
          description="The shared colors API keeps series, axes, grid, and tooltip content readable on a dark chart surface."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using the shared dark color configuration."
            >
              <Chart
                type="bubble"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                colors={{
                  series: ['#38bdf8', '#a78bfa', '#34d399'],
                  axisText: '#e2e8f0',
                  axisLine: '#64748b',
                  grid: '#334155',
                  tooltipBackground: '#1e293b',
                  tooltipText: '#f8fafc',
                  tooltipBorder: '#64748b',
                }}
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  chartBackground: '#0f172a',
                  backgroundColor: '#0f172a',
                  xAxisTitle: 'Market Share (%)',
                  yAxisTitle: 'Growth Rate (%)',
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 using the same shared dark color configuration."
            >
              <Chart
                type="bubble"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                colors={{
                  series: ['#38bdf8', '#a78bfa', '#34d399'],
                  axisText: '#e2e8f0',
                  axisLine: '#64748b',
                  grid: '#334155',
                  tooltipBackground: '#1e293b',
                  tooltipText: '#f8fafc',
                  tooltipBorder: '#64748b',
                }}
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  chartBackground: '#0f172a',
                  backgroundColor: '#0f172a',
                  xAxisTitle: 'Market Share (%)',
                  yAxisTitle: 'Growth Rate (%)',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);
