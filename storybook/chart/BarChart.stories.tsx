/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts/Chart';
import type { ChartEffect } from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/BarChart',
  component: Chart,

  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

const commonData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

  series: [
    {
      label: 'Monthly Revenue',
      data: [1200, 1900, 3000, 5000, 4200, 3800],
    },
  ],
};

const twoSeriesData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],

  series: [
    {
      label: 'Revenue',
      data: [3200, 4600, 5100, 6800],
    },
    {
      label: 'Expenses',
      data: [2200, 3100, 3900, 4400],
    },
  ],
};

const threeSeriesData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],

  series: [
    {
      label: 'Revenue',
      data: [3200, 4600, 5100, 6800],
    },
    {
      label: 'Expenses',
      data: [2200, 3100, 3900, 4400],
    },
    {
      label: 'Profit',
      data: [1000, 1500, 1200, 2400],
    },
  ],
};

const customSeriesData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],

  series: [
    {
      label: 'Revenue',
      data: [3200, 4600, 5100, 6800],
      color: '#763d6c',
    },
    {
      label: 'Expenses',
      data: [2200, 3100, 3900, 4400],
      color: '#64bdd1',
    },
    {
      label: 'Profit',
      data: [1000, 1500, 1200, 2400],
      color: '#316851',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Styles                                                                      */
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

const comparisonRow = css`
  margin-top: 32px;
`;

const titleH1 = css`
  margin-bottom: 16px;
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH2 = css`
  margin-bottom: 12px;
  font-size: 1.875rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const sectionDescription = css`
  max-width: 820px;
  margin-bottom: 24px;
  font-size: 1rem;
  line-height: 1.6;
`;

const heroBox = css`
  padding: 32px !important;
  border: 1px solid var(--wci-chart-axis-line);
  border-radius: 16px;
`;

const chartCard = css`
  width: 100%;
  height: 100%;
  min-width: 0;
  border: 1px solid var(--wci-chart-axis-line);
  border-radius: 14px;
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
  border: 1px solid var(--wci-chart-axis-line);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const statBox = css`
  min-width: 140px;
  padding: 20px;
  border: 1px solid var(--wci-chart-axis-line);
  border-radius: 10px;
  text-align: center;
`;

const statValue = css`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

const statLabel = css`
  text-align: center;
`;

const customContainerStyles = css`
  padding: 12px;
  border: 1px solid var(--wci-chart-axis-line);
  border-radius: 12px;
`;

/* -------------------------------------------------------------------------- */
/* Shared presentation components                                              */
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
  statValue: primaryStatValue = 'bar',
  statLabel: primaryStatLabel = 'Chart Type',
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
            <Typography variant="p" customStyles={statValue}>
              {primaryStatValue}
            </Typography>

            <Typography variant="span" customStyles={statLabel}>
              {primaryStatLabel}
            </Typography>
          </Box>

          <Box customStyles={statBox}>
            <Typography variant="p" customStyles={statValue}>
              {secondaryStatValue}
            </Typography>

            <Typography variant="span" customStyles={statLabel}>
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
  readonly chartName: 'Chart 1' | 'Chart 2';
  readonly description?: string;
  readonly children?: ReactNode;
};

const ChartCard = ({ chartName, description, children }: ChartCardProps) => {
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

        <div css={chartShell}>{children}</div>
      </FlexLayout>
    </Box>
  );
};

type ComparisonGridProps = {
  readonly children: ReactNode;
};

const ComparisonGrid = ({ children }: ComparisonGridProps) => (
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

type ComparisonItemProps = {
  readonly children: ReactNode;
};

const ComparisonItem = ({ children }: ComparisonItemProps) => (
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
/* Shared effect comparison                                                    */
/* -------------------------------------------------------------------------- */

type BarEffectComparisonProps = {
  readonly title: string;
  readonly description: string;
  readonly effect: ChartEffect;
  readonly data?: typeof commonData | typeof twoSeriesData;
};

const BarEffectComparison = ({
  title,
  description,
  effect,
  data = commonData,
}: BarEffectComparisonProps) => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title={title}
        description={description}
        statValue="2"
        statLabel="Charts"
        secondaryStatValue="1"
        secondaryStatLabel="Effect"
      />

      <section css={pageSection}>
        <SectionHeading
          title={`${title} Comparison`}
          description="The same animation effect is rendered side by side using Chart 1 and Chart 2."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description={`Chart 1 renders the bar series using the ${effect} effect.`}
            >
              <Chart
                type="bar"
                engine="chart-1"
                data={data}
                effect={effect}
                options={{
                  barWidth: 40,
                  showLegend: data.series.length > 1,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description={`Chart 2 renders the bar series using the ${effect} effect.`}
            >
              <Chart
                type="bar"
                engine="chart-2"
                data={data}
                effect={effect}
                options={{
                  barWidth: 40,
                  showLegend: data.series.length > 1,
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
/* Default rendering                                                           */
/* -------------------------------------------------------------------------- */

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Chart"
        description="The same dataset is displayed using Chart 1 and Chart 2 so their default rendering behaviour can be reviewed side by side."
        statValue="2"
        statLabel="Charts"
        secondaryStatValue="1"
        secondaryStatLabel="Dataset"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines use the shared chart color system, matching bar widths, visible legends, and comparable reveal animations."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using the shared generic Bar Chart API."
            >
              <Chart
                type="bar"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                options={{
                  showLegend: true,
                  barWidth: 44,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 using the same dataset, width, colors, and animation."
            >
              <Chart
                type="bar"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                options={{
                  showLegend: true,
                  barWidth: 44,
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
/* Colors                                                                      */
/* -------------------------------------------------------------------------- */

export const Colors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Chart Colors"
        description="Default, chart-level, and series-level color behaviour can be compared across both chart engines."
        statValue="3"
        statLabel="Color Modes"
        secondaryStatValue="2"
        secondaryStatLabel="Engines"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Automatic Colors"
          description="Both engines resolve their colors from the shared WCI chart palette."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 automatically resolves colors for all three series."
            >
              <Chart
                type="bar"
                engine="chart-1"
                data={threeSeriesData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  barWidth: 24,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 automatically resolves the same shared chart palette."
            >
              <Chart
                type="bar"
                engine="chart-2"
                data={threeSeriesData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  barWidth: 24,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Chart-Level Colors"
          description="The generic colors API overrides the default chart palette for both engines."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 using explicit series colors.">
              <Chart
                type="bar"
                engine="chart-1"
                data={threeSeriesData}
                colors={{
                  series: ['#763d6c', '#64bdd1', '#316851'],
                }}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  barWidth: 24,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 using the same explicit series colors."
            >
              <Chart
                type="bar"
                engine="chart-2"
                data={threeSeriesData}
                colors={{
                  series: ['#763d6c', '#64bdd1', '#316851'],
                }}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  barWidth: 24,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Series-Level Colors"
          description="A color defined directly on each series takes precedence over the automatic palette."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using colors supplied directly by each series."
            >
              <Chart
                type="bar"
                engine="chart-1"
                data={customSeriesData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  barWidth: 24,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 using the same series-level colors."
            >
              <Chart
                type="bar"
                engine="chart-2"
                data={customSeriesData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  barWidth: 24,
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
/* Effects                                                                     */
/* -------------------------------------------------------------------------- */

export const BounceEffect = () => (
  <BarEffectComparison
    title="Bar Chart Bounce Effect"
    description="Bounce easing creates an energetic bar entrance before each value settles into position."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <BarEffectComparison
    title="Bar Chart Wobble Effect"
    description="The wobble effect introduces the bar series using a short oscillating movement."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <BarEffectComparison
    title="Bar Chart Elastic Effect"
    description="Elastic easing briefly stretches each bar before it settles into its final value."
    effect="elastic"
  />
);

export const ProgressiveTraceEffect = () => (
  <BarEffectComparison
    title="Bar Chart Progressive Trace Effect"
    description="The bar series is progressively revealed across the category axis."
    effect="progressive-trace"
  />
);

export const ElasticGlideEffect = () => (
  <BarEffectComparison
    title="Bar Chart Elastic Glide Effect"
    description="Elastic movement and smooth gliding are combined in the bar entrance animation."
    effect="elastic-glide"
  />
);

export const StaggeredRevealEffect = () => (
  <BarEffectComparison
    title="Bar Chart Staggered Reveal Effect"
    description="Bars and grouped series enter sequentially using controlled animation delays."
    effect="staggered-reveal"
    data={twoSeriesData}
  />
);

export const StandardEffect = () => (
  <BarEffectComparison
    title="Bar Chart Standard Effect"
    description="Both charts are rendered without an additional named animation effect."
    effect="none"
  />
);

/* -------------------------------------------------------------------------- */
/* Bar width options                                                           */
/* -------------------------------------------------------------------------- */

export const BarWidthOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Width Options"
        description="Thin, default, and wide bar widths are compared across Chart 1 and Chart 2."
        statValue="3"
        statLabel="Widths"
        secondaryStatValue="6"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Thin Bars"
          description="A narrow bar width provides more visual separation between categories."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 using a bar width of 20 pixels.">
              <Chart
                type="bar"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                options={{
                  barWidth: 20,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 using a bar width of 20 pixels.">
              <Chart
                type="bar"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                options={{
                  barWidth: 20,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Default Bars"
          description="The default bar width balances visual weight and spacing."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 using the default bar width.">
              <Chart type="bar" engine="chart-1" data={commonData} effect="progressive-trace" />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 using the default bar width.">
              <Chart type="bar" engine="chart-2" data={commonData} effect="progressive-trace" />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Wide Bars"
          description="A wider bar width creates stronger emphasis for each category."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 using a bar width of 64 pixels.">
              <Chart
                type="bar"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                options={{
                  barWidth: 64,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 using a bar width of 64 pixels.">
              <Chart
                type="bar"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                options={{
                  barWidth: 64,
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
/* Horizontal bars                                                             */
/* -------------------------------------------------------------------------- */

export const HorizontalBars = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Horizontal Bar Charts"
        description="The same dataset is rendered horizontally using Chart 1 and Chart 2."
        statValue="2"
        statLabel="Charts"
        secondaryStatValue="horizontal"
        secondaryStatLabel="Layout"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Horizontal Layout"
          description="The horizontal option swaps the category and value axes for both charts."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using horizontal bars with a reduced bar width."
            >
              <Chart
                type="bar"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                options={{
                  horizontal: true,
                  barWidth: 28,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 using the same horizontal bar configuration."
            >
              <Chart
                type="bar"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                options={{
                  horizontal: true,
                  barWidth: 28,
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
/* Multiple series                                                             */
/* -------------------------------------------------------------------------- */

export const MultiSeries = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Multi-Series Bar Charts"
        description="Grouped two-series and three-series datasets are compared across Chart 1 and Chart 2."
        statValue="3"
        statLabel="Maximum Series"
        secondaryStatValue="4"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Two Series"
          description="Revenue and expenses are displayed as grouped bars."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 displaying revenue and expenses in grouped categories."
            >
              <Chart
                type="bar"
                engine="chart-1"
                data={twoSeriesData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  barWidth: 32,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 displaying the same revenue and expenses data."
            >
              <Chart
                type="bar"
                engine="chart-2"
                data={twoSeriesData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  barWidth: 32,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Three Series"
          description="Revenue, expenses, and profit are displayed as grouped bars."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 displaying three grouped datasets.">
              <Chart
                type="bar"
                engine="chart-1"
                data={threeSeriesData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  barWidth: 24,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 displaying the same three grouped datasets."
            >
              <Chart
                type="bar"
                engine="chart-2"
                data={threeSeriesData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  barWidth: 24,
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
/* Custom options                                                              */
/* -------------------------------------------------------------------------- */

export const CustomOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Chart Options"
        description="Tooltip, crosshair, color, and custom-style configurations are demonstrated across both chart engines."
        statValue="4"
        statLabel="Option Groups"
        secondaryStatValue="8"
        secondaryStatLabel="Examples"
      />

      {/* -------------------------------------------------------------------- */}
      {/* Custom Tooltip                                                       */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Custom Tooltip"
          description="Each engine receives its native tooltip configuration through the shared options API."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 with a customized tooltip configuration."
            >
              <Chart
                type="bar"
                engine="chart-1"
                data={twoSeriesData}
                effect="progressive-trace"
                options={{
                  barWidth: 32,
                  showLegend: true,
                  boldLabels: true,

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
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 with a matching ECharts tooltip configuration."
            >
              <Chart
                type="bar"
                engine="chart-2"
                data={twoSeriesData}
                effect="staggered-reveal"
                options={{
                  barWidth: 32,
                  showLegend: true,

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

                    extraCssText:
                      'border-radius: 10px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.14);',

                    axisPointer: {
                      type: 'line',

                      lineStyle: {
                        color: '#94a3b8',
                        width: 1,
                        type: 'dashed',
                      },

                      shadowStyle: {
                        color: 'transparent',
                        opacity: 0,
                      },
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Crosshair                                                            */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Crosshair"
          description="Crosshair inspection is enabled through the shared crosshair option."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 with its crosshair support enabled."
            >
              <Chart
                type="bar"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                options={{
                  crosshair: true,
                  barWidth: 44,
                  showLegend: true,
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 with a snapped cross-axis pointer and visible pointer labels."
            >
              <Chart
                type="bar"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                options={{
                  crosshair: true,
                  barWidth: 44,
                  showLegend: true,

                  tooltip: {
                    show: true,
                    trigger: 'axis',

                    axisPointer: {
                      type: 'cross',
                      snap: true,

                      lineStyle: {
                        color: '#64748b',
                        width: 1,
                        type: 'dashed',
                      },

                      crossStyle: {
                        color: '#64748b',
                        width: 1,
                        type: 'dashed',
                      },

                      label: {
                        show: true,
                        color: '#ffffff',
                        backgroundColor: '#334155',
                      },

                      shadowStyle: {
                        color: 'transparent',
                        opacity: 0,
                      },
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Colors                                                               */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Custom Colors"
          description="Both engines receive the same chart colors through the generic colors prop."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 rendering the shared custom series colors."
            >
              <Chart
                type="bar"
                engine="chart-1"
                data={threeSeriesData}
                colors={{
                  series: ['#d4af37', '#2d5a27', '#7c3aed'],
                }}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  barWidth: 32,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 rendering the same custom series colors."
            >
              <Chart
                type="bar"
                engine="chart-2"
                data={threeSeriesData}
                colors={{
                  series: ['#d4af37', '#2d5a27', '#7c3aed'],
                }}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  barWidth: 32,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Custom Styles                                                        */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Custom Styles"
          description="Structural container styles are shared across both chart engines."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 with custom container styling.">
              <Chart
                type="bar"
                engine="chart-1"
                data={commonData}
                effect="staggered-reveal"
                customStyles={{
                  container: customContainerStyles,
                }}
                options={{
                  showLegend: true,
                  barWidth: 32,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 with the same custom container styling."
            >
              <Chart
                type="bar"
                engine="chart-2"
                data={commonData}
                effect="staggered-reveal"
                customStyles={{
                  container: customContainerStyles,
                }}
                options={{
                  showLegend: true,
                  barWidth: 32,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);
