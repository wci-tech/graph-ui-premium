/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts/Chart';
import type { ChartData } from '@/charts/Chart.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/StackedBarChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

/* -------------------------------------------------------------------------- */
/* Shared data                                                                 */
/* -------------------------------------------------------------------------- */

const commonData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      label: 'Cloud Services',
      data: [30, 45, 60, 55, 70, 95],
    },
    {
      label: 'Hardware Sales',
      data: [20, 30, 25, 40, 35, 50],
    },
    {
      label: 'Consulting',
      data: [15, 20, 25, 20, 30, 40],
    },
    {
      label: 'Support',
      data: [10, 12, 18, 16, 22, 28],
    },
    {
      label: 'Training',
      data: [5, 8, 10, 14, 18, 24],
    },
  ],
};

const singleSeriesData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      label: 'Cloud Services',
      data: [30, 45, 60, 55, 70, 95],
    },
  ],
};

const twoSeriesData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      label: 'Cloud Services',
      data: [30, 45, 60, 55, 70, 95],
    },
    {
      label: 'Hardware Sales',
      data: [20, 30, 25, 40, 35, 50],
    },
  ],
};

const customColorData: ChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    {
      label: 'Product A',
      data: [120, 180, 220, 260],
      color: '#e11d48',
    },
    {
      label: 'Product B',
      data: [90, 130, 160, 210],
      color: '#7c3aed',
    },
    {
      label: 'Product C',
      data: [60, 95, 120, 150],
      color: '#0891b2',
    },
  ],
};

const roundedData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: commonData.series.map((series, index) => ({
    ...series,
    ...(index === commonData.series.length - 1 ? { borderRadius: 10 } : {}),
  })),
};

const denseData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    {
      label: 'Cloud',
      data: [28, 35, 42, 48, 54, 64, 72, 79, 88, 95, 106, 118],
    },
    {
      label: 'Hardware',
      data: [18, 22, 26, 32, 30, 38, 42, 46, 52, 58, 61, 68],
    },
    {
      label: 'Consulting',
      data: [10, 14, 16, 19, 22, 25, 29, 31, 35, 38, 42, 47],
    },
    {
      label: 'Support',
      data: [8, 9, 12, 14, 16, 18, 20, 22, 25, 27, 30, 34],
    },
    {
      label: 'Training',
      data: [4, 6, 8, 9, 11, 13, 15, 16, 18, 20, 22, 24],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Shared colors                                                               */
/* -------------------------------------------------------------------------- */

const customColors = {
  series: ['#f5456e', '#3d9eff', '#59cc26', '#ffae00', '#ff784d'],
  axisText: '#111827',
  axisLine: '#cbd5e1',
  grid: '#e2e8f0',
  tooltipBackground: '#ffffff',
  tooltipText: '#111827',
  tooltipBorder: '#e2e8f0',
} as const;

const darkColors = {
  series: ['#fb7185', '#60a5fa', '#86efac', '#fbbf24', '#fb923c'],
  axisText: '#f8fafc',
  axisLine: '#475569',
  grid: '#334155',
  tooltipBackground: '#020617',
  tooltipText: '#ffffff',
  tooltipBorder: '#334155',
} as const;

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
  color: var(--wci-chart-axis-text);
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH2 = css`
  margin-bottom: 12px;
  color: var(--wci-chart-axis-text);
  font-size: 1.875rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  color: var(--wci-chart-axis-text);
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  margin: 0;
  color: var(--wci-chart-axis-text);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const sectionDescription = css`
  max-width: 860px;
  margin-bottom: 24px;
  color: var(--wci-chart-axis-text);
  font-size: 1rem;
  line-height: 1.6;
`;

const heroBox = css`
  padding: 32px;
  border: 1px solid var(--wci-chart-axis-line);
  border-radius: 16px;
`;

const chartCard = css`
  width: 100%;
  height: 100%;
  min-width: 0;
  padding: 24px;
  border: 1px solid var(--wci-chart-axis-line);
  border-radius: 14px;
`;

const chartShell = css`
  position: relative;
  width: 100%;
  min-width: 0;
  min-height: 650px;
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
  color: var(--wci-chart-axis-text);
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
  color: var(--wci-chart-axis-text);
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

const statLabel = css`
  color: var(--wci-chart-axis-text);
  text-align: center;
`;

const darkChartSurface = css`
  background: #0f172a;
`;

/* -------------------------------------------------------------------------- */
/* Shared components                                                           */
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
  statValue: primaryValue = '2',
  statLabel: primaryLabel = 'Charts',
  secondaryStatValue = '5',
  secondaryStatLabel = 'Series',
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
              {primaryValue}
            </Typography>
            <Typography variant="span" customStyles={statLabel}>
              {primaryLabel}
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
  readonly api?: string;
  readonly children: ReactNode;
};

const ChartCard = ({ chartName, description, api, children }: ChartCardProps) => (
  <Box customStyles={chartCard}>
    <FlexLayout direction="column" gap="12px">
      <Typography variant="span" customStyles={chartNamePill}>
        {chartName}
      </Typography>

      {description ? (
        <Typography variant="p" customStyles={paragraphSmall}>
          {description}
        </Typography>
      ) : null}

      {api ? (
        <Typography variant="span" customStyles={chartNamePill}>
          {api}
        </Typography>
      ) : null}

      <div css={chartShell}>{children}</div>
    </FlexLayout>
  </Box>
);

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
/* Default rendering                                                           */
/* -------------------------------------------------------------------------- */

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Bar Chart"
        description="The same labels and numeric series are rendered through Chart 1 and Chart 2 using the shared Chart API."
        statValue="2"
        statLabel="Charts"
        secondaryStatValue="5"
        secondaryStatLabel="Series"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines receive the same data, legend configuration, vertical orientation, and shared animation effect."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders the shared stacked bar data."
              api='type="stacked-bar"'
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                options={{
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders the equivalent stacked bar data."
              api='type="stacked-bar"'
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                options={{
                  showLegend: true,
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
/* Orientations                                                                */
/* -------------------------------------------------------------------------- */

export const Orientations = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Bar Orientations"
        description="Vertical and horizontal stacked-bar layouts are compared using the same shared data."
        statValue="2"
        statLabel="Orientations"
        secondaryStatValue="4"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Vertical Stacked Bars"
          description="Categories are displayed on the horizontal axis and cumulative values on the vertical axis."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using the vertical layout."
              api="options.horizontal: false"
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                options={{
                  horizontal: false,
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 using the vertical layout."
              api="options.horizontal: false"
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                options={{
                  horizontal: false,
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Horizontal Stacked Bars"
          description="Categories move to the vertical axis while cumulative values use the horizontal axis."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 rendering horizontal stacked bars."
              api="options.horizontal: true"
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={commonData}
                effect="bounce"
                options={{
                  horizontal: true,
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 rendering the same horizontal stacked bars."
              api="options.horizontal: true"
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={commonData}
                effect="bounce"
                options={{
                  horizontal: true,
                  showLegend: true,
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

type SharedStackedBarEffect =
  | 'none'
  | 'bounce'
  | 'wobble'
  | 'elastic'
  | 'progressive-trace'
  | 'elastic-glide'
  | 'staggered-reveal';

type EffectComparisonProps = {
  readonly title: string;
  readonly description: string;
  readonly effect: SharedStackedBarEffect;
  readonly useMultipleSeries?: boolean;
  readonly horizontal?: boolean;
};

const EffectComparison = ({
  title,
  description,
  effect,
  useMultipleSeries = false,
  horizontal = false,
}: EffectComparisonProps) => {
  const data = useMultipleSeries ? commonData : singleSeriesData;

  return (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title={title}
          description={description}
          statValue="2"
          statLabel="Charts"
          secondaryStatValue="1"
          secondaryStatLabel="Shared Effect"
        />

        <section css={pageSection}>
          <SectionHeading
            title={`${title} Comparison`}
            description="The same shared effect is passed to both chart engines."
          />

          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description={`Chart 1 using the ${effect} effect.`}
                api={`effect="${effect}"`}
              >
                <Chart
                  type="stacked-bar"
                  engine="chart-1"
                  data={data}
                  effect={effect}
                  options={{
                    horizontal,
                    showLegend: useMultipleSeries,
                  }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description={`Chart 2 using the ${effect} effect.`}
                api={`effect="${effect}"`}
              >
                <Chart
                  type="stacked-bar"
                  engine="chart-2"
                  data={data}
                  effect={effect}
                  options={{
                    horizontal,
                    showLegend: useMultipleSeries,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  );
};

export const RevealEffect = () => (
  <EffectComparison
    title="Stacked Bar Reveal Effect"
    description="Both charts progressively reveal the stacked bars."
    effect="progressive-trace"
  />
);

export const BounceEffect = () => (
  <EffectComparison
    title="Stacked Bar Bounce Effect"
    description="Both charts use the shared bounce animation effect."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Stacked Bar Wobble Effect"
    description="Both charts use the shared wobble animation effect."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Stacked Bar Elastic Effect"
    description="Both charts use the shared elastic animation effect."
    effect="elastic"
  />
);

export const ElasticGlideEffect = () => (
  <EffectComparison
    title="Stacked Bar Elastic Glide Effect"
    description="Both charts use the shared elastic-glide animation effect."
    effect="elastic-glide"
  />
);

export const StaggeredRevealEffect = () => (
  <EffectComparison
    title="Stacked Bar Staggered Reveal"
    description="Multiple stacked series are revealed in sequence."
    effect="staggered-reveal"
    useMultipleSeries
  />
);

export const HorizontalBounceEffect = () => (
  <EffectComparison
    title="Horizontal Stacked Bar Bounce"
    description="Both charts render horizontal stacked bars with the bounce effect."
    effect="bounce"
    useMultipleSeries
    horizontal
  />
);

export const StandardEffect = () => (
  <EffectComparison
    title="Stacked Bar Standard Rendering"
    description="Both charts render without an additional named animation."
    effect="none"
    useMultipleSeries
  />
);

/* -------------------------------------------------------------------------- */
/* Options                                                                     */
/* -------------------------------------------------------------------------- */

export const Options = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Bar Options"
        description="Shared stacked-bar options are compared across Chart 1 and Chart 2."
        statValue="5"
        statLabel="Options"
        secondaryStatValue="10"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Crosshair"
          description="Crosshair inspection remains disabled by default and is enabled explicitly through options.crosshair."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 with crosshair enabled."
              api="options.crosshair: true"
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  crosshair: true,
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 with crosshair enabled."
              api="options.crosshair: true"
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  crosshair: true,
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Legend Visibility"
          description="Legend visibility is controlled through the same shared showLegend option."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 with its legend hidden."
              api="options.showLegend: false"
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  showLegend: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 with its legend hidden."
              api="options.showLegend: false"
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  showLegend: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Bold Labels and Legends"
          description="Both engines receive the same typography options."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 with bold labels and legend text."
              api="boldLabels + boldLegends"
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={commonData}
                effect="elastic"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 with matching bold typography."
              api="boldLabels + boldLegends"
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={commonData}
                effect="elastic"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Bar Width"
          description="Both engines receive the same bar width constraints."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 with a custom bar width."
              api="options.barWidth"
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={twoSeriesData}
                effect="none"
                options={{
                  showLegend: true,
                  barWidth: 32,
                  maxBarWidth: 32,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 with the same custom bar width."
              api="options.barWidth"
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={twoSeriesData}
                effect="none"
                options={{
                  showLegend: true,
                  barWidth: 32,
                  maxBarWidth: 32,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Dense Data"
          description="Both engines render twelve categories using the same shared data."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 displaying twelve monthly stacked groups."
              api="12 labels"
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={denseData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 displaying the same twelve monthly groups."
              api="12 labels"
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={denseData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
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
        title="Stacked Bar Colors"
        description="Shared semantic colors and dataset-level overrides are passed through both chart adapters."
        statValue="2"
        statLabel="Color APIs"
        secondaryStatValue="4"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Shared Colors"
          description="The colors prop controls the series palette, axes, grid, and tooltip colors for both engines."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using the shared custom color configuration."
              api="colors"
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={commonData}
                colors={customColors}
                effect="progressive-trace"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 using the same shared custom color configuration."
              api="colors"
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={commonData}
                colors={customColors}
                effect="progressive-trace"
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Dataset Color Overrides"
          description="Dataset-level colors take precedence over the shared series palette."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 rendering dataset-level colors."
              api="data.series.color"
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={customColorData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 rendering the same dataset-level colors."
              api="data.series.color"
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={customColorData}
                effect="staggered-reveal"
                options={{
                  showLegend: true,
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
/* Rounded bars                                                                */
/* -------------------------------------------------------------------------- */

export const RoundedBars = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Rounded Stacked Bars"
        description="The terminal stacked series uses the shared dataset borderRadius property."
        statValue="2"
        statLabel="Orientations"
        secondaryStatValue="4"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Vertical Rounded Bars"
          description="Only the outer edge of the terminal stacked series is rounded."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using dataset-level border radius."
              api="data.series.borderRadius"
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={roundedData}
                effect="progressive-trace"
                options={{
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 using the same dataset-level border radius."
              api="data.series.borderRadius"
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={roundedData}
                effect="progressive-trace"
                options={{
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Horizontal Rounded Bars"
          description="The same dataset radius is mapped to the right outer edge in horizontal mode."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 rendering horizontal rounded stacked bars."
              api="horizontal + borderRadius"
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={roundedData}
                effect="bounce"
                options={{
                  horizontal: true,
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 rendering horizontal rounded stacked bars."
              api="horizontal + borderRadius"
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={roundedData}
                effect="bounce"
                options={{
                  horizontal: true,
                  showLegend: true,
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
/* Dark surface                                                                */
/* -------------------------------------------------------------------------- */

export const DarkSurface = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Bar Dark Surface"
        description="Both engines use the same semantic colors and renderer container styling."
        statValue="2"
        statLabel="Charts"
        secondaryStatValue="1"
        secondaryStatLabel="Shared Theme"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Dark Chart Surface"
          description="Chart colors are provided through the shared colors prop while the renderer surface is styled through customStyles.container."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 rendered with the dark semantic palette."
              api="colors + customStyles.container"
            >
              <Chart
                type="stacked-bar"
                engine="chart-1"
                data={commonData}
                colors={darkColors}
                effect="progressive-trace"
                customStyles={{
                  container: darkChartSurface,
                }}
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 rendered with the same dark semantic palette."
              api="colors + customStyles.container"
            >
              <Chart
                type="stacked-bar"
                engine="chart-2"
                data={commonData}
                colors={darkColors}
                effect="progressive-trace"
                customStyles={{
                  container: darkChartSurface,
                }}
                options={{
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);
