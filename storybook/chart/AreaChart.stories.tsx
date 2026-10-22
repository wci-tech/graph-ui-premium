/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import type { Meta } from '@storybook/react';

import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import type { ChartColors, ChartData } from '@/engines/engine.types';

import { Chart } from '@/charts';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/AreaChart',
  component: Chart,

  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

const commonData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

  series: [
    {
      label: 'Revenue',
      data: [30, 45, 35, 60, 55, 80],
    },
    {
      label: 'Forecast',
      data: [25, 40, 40, 50, 60, 70],
    },
  ],
};

const singleSeriesData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

  series: [
    {
      label: 'Monthly Revenue',
      data: [30, 45, 35, 60, 55, 80],
    },
  ],
};

const customColorData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

  series: [
    {
      label: 'Actual Revenue',
      data: [35, 48, 42, 68, 61, 88],
      color: 'var(--wci-chart-purple)',
      pointColor: 'var(--wci-chart-magenta)',
      pointRadius: 7,
      borderWidth: 4,
    },
    {
      label: 'Projected Revenue',
      data: [28, 41, 46, 55, 65, 77],
      color: 'var(--wci-chart-teal)',
      pointColor: 'var(--wci-chart-cyan)',
      pointRadius: 6,
      borderWidth: 3,
    },
  ],
};

const customChartColors: ChartColors = {
  series: ['var(--wci-chart-orange)', 'var(--wci-chart-purple)'],

  axisText: 'var(--wci-chart-axis-text)',
  axisLine: 'var(--wci-chart-axis-line)',
  grid: 'var(--wci-chart-grid)',

  tooltipBackground: 'var(--wci-chart-tooltip-background)',

  tooltipText: 'var(--wci-chart-tooltip-text)',

  tooltipBorder: 'var(--wci-chart-tooltip-border)',
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
  statValue = 'area',
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
  readonly chartName: 'Chart 1' | 'Chart 2';
  readonly description?: string;
  readonly api?: string;
  readonly children?: ReactNode;
};

const ChartCard = ({ chartName, description, api, children }: ChartCardProps) => (
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
        <Typography variant="span" customStyles={paragraphSmall}>
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
        title="Area Chart"
        description="The same dataset is displayed using Chart 1 and Chart 2 so their default rendering behaviour can be reviewed side by side."
        statValue="2"
        statLabel="Charts"
        secondaryStatValue="1"
        secondaryStatLabel="Dataset"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both chart engines use the shared Area Chart data structure, smooth appearance, default graph color tokens, and equivalent entrance animations."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 uses the shared data structure and default graph color palette."
              api='appearance="smooth"'
            >
              <Chart
                type="area"
                engine="chart-1"
                data={commonData}
                appearance="smooth"
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
              description="Chart 2 renders the same data using the same default graph color palette."
              api='appearance="smooth"'
            >
              <Chart
                type="area"
                engine="chart-2"
                data={commonData}
                appearance="smooth"
                effect="line-reveal"
                showDownload={false}
                options={{
                  legend: {
                    show: true,
                  },
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
        title="Area Chart Colors"
        description="Chart-level and series-level color customization use the same shared API across both chart engines."
        statValue="2"
        statLabel="Color APIs"
        secondaryStatValue="4"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Chart-level Colors"
          description="The colors prop overrides the default graph palette and semantic chart colors for both implementations."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using the shared chart-level colors API."
              api="colors"
            >
              <Chart
                type="area"
                engine="chart-1"
                data={commonData}
                colors={customChartColors}
                appearance="smooth"
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
              description="Chart 2 using exactly the same chart-level colors API."
              api="colors"
            >
              <Chart
                type="area"
                engine="chart-2"
                data={commonData}
                colors={customChartColors}
                appearance="smooth"
                effect="line-reveal"
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Series-level Colors"
          description="Individual series can override the chart palette using color and pointColor. Point radius and border width can also be customized per series."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using custom line, point, radius, and border-width values from the shared series structure."
              api="data.series"
            >
              <Chart
                type="area"
                engine="chart-1"
                data={customColorData}
                appearance="smooth"
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
              description="Chart 2 consuming exactly the same series-level customization."
              api="data.series"
            >
              <Chart
                type="area"
                engine="chart-2"
                data={customColorData}
                appearance="smooth"
                effect="line-reveal"
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Appearances                                                                 */
/* -------------------------------------------------------------------------- */

export const Appearances = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Area Chart Appearances"
        description="Basic straight segments and smooth curved segments are compared across Chart 1 and Chart 2."
        statValue="2"
        statLabel="Appearances"
        secondaryStatValue="4"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Basic Appearance"
          description="The basic appearance connects each data point using straight line segments."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using straight line segments between each data point."
              api='appearance="basic"'
            >
              <Chart
                type="area"
                engine="chart-1"
                data={commonData}
                appearance="basic"
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
              description="Chart 2 using straight line segments between each data point."
              api='appearance="basic"'
            >
              <Chart
                type="area"
                engine="chart-2"
                data={commonData}
                appearance="basic"
                effect="line-reveal"
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={[pageSection, comparisonRow]}>
        <SectionHeading
          title="Smooth Appearance"
          description="The smooth appearance uses curved segments to create a softer continuous area shape."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using curved line segments and smooth transitions."
              api='appearance="smooth"'
            >
              <Chart
                type="area"
                engine="chart-1"
                data={commonData}
                appearance="smooth"
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
              description="Chart 2 using curved line segments and smooth transitions."
              api='appearance="smooth"'
            >
              <Chart
                type="area"
                engine="chart-2"
                data={commonData}
                appearance="smooth"
                effect="line-reveal"
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

type AreaEffectComparisonProps = {
  readonly title: string;

  readonly description: string;

  readonly chart1Description: string;

  readonly chart1Effect:
    | 'none'
    | 'bounce'
    | 'wobble'
    | 'elastic'
    | 'progressive-trace'
    | 'elastic-glide'
    | 'staggered-reveal';

  readonly chart2Description: string;

  readonly chart2Effect:
    | 'none'
    | 'line-reveal'
    | 'line-elastic'
    | 'line-bounce'
    | 'line-stagger'
    | 'line-smooth-update';

  readonly useMultipleSeries?: boolean;
};

const AreaEffectComparison = ({
  title,
  description,
  chart1Description,
  chart1Effect,
  chart2Description,
  chart2Effect,
  useMultipleSeries = false,
}: AreaEffectComparisonProps) => {
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
          secondaryStatLabel="Effect Group"
        />

        <section css={pageSection}>
          <SectionHeading
            title={`${title} Comparison`}
            description="The corresponding animation is displayed side by side using Chart 1 and Chart 2."
          />

          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description={chart1Description}
                api={`effect="${chart1Effect}"`}
              >
                <Chart
                  type="area"
                  engine="chart-1"
                  data={data}
                  appearance="smooth"
                  effect={chart1Effect}
                  options={{
                    showLegend: useMultipleSeries,
                  }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description={chart2Description}
                api={`effect="${chart2Effect}"`}
              >
                <Chart
                  type="area"
                  engine="chart-2"
                  data={data}
                  appearance="smooth"
                  effect={chart2Effect}
                  options={{
                    legend: {
                      show: useMultipleSeries,
                    },
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
  <AreaEffectComparison
    title="Area Chart Reveal Effect"
    description="Progressive reveal animations draw the area series across the category axis."
    chart1Description="Chart 1 progressively traces the area line from the first data point to the last."
    chart1Effect="progressive-trace"
    chart2Description="Chart 2 sequentially reveals the line, data points, and filled area."
    chart2Effect="line-reveal"
  />
);

export const BounceEffect = () => (
  <AreaEffectComparison
    title="Area Chart Bounce Effect"
    description="Bounce animations create an energetic entrance before the series settles into its final position."
    chart1Description="Chart 1 introduces the area series using its bounce entrance animation."
    chart1Effect="bounce"
    chart2Description="Chart 2 applies bounce easing while revealing the area line."
    chart2Effect="line-bounce"
  />
);

export const ElasticEffect = () => (
  <AreaEffectComparison
    title="Area Chart Elastic Effect"
    description="Elastic animations briefly stretch the plotted series before returning it to its final position."
    chart1Description="Chart 1 reveals the area series using elastic motion."
    chart1Effect="elastic"
    chart2Description="Chart 2 uses elastic easing while drawing the area line."
    chart2Effect="line-elastic"
  />
);

export const StaggerEffect = () => (
  <AreaEffectComparison
    title="Area Chart Stagger Effect"
    description="Staggered animations introduce series and data points with a controlled sequence of delays."
    chart1Description="Chart 1 delays the entrance of each series and its data-point sequence."
    chart1Effect="staggered-reveal"
    chart2Description="Chart 2 applies delayed animation to each series and data point."
    chart2Effect="line-stagger"
    useMultipleSeries
  />
);

export const MotionEffect = () => (
  <AreaEffectComparison
    title="Area Chart Motion Effect"
    description="Additional motion effects provide expressive alternatives to the standard reveal animation."
    chart1Description="Chart 1 introduces the area series with a short wobble movement."
    chart1Effect="wobble"
    chart2Description="Chart 2 smoothly transitions the area series when its data is updated."
    chart2Effect="line-smooth-update"
  />
);

export const GlideEffect = () => (
  <AreaEffectComparison
    title="Area Chart Glide Effect"
    description="Smooth gliding animations transition the area series into its final plotted position."
    chart1Description="Chart 1 combines elastic easing with a smooth gliding entrance."
    chart1Effect="elastic-glide"
    chart2Description="Chart 2 uses smooth interpolation to transition the rendered line."
    chart2Effect="line-smooth-update"
  />
);

export const StandardEffect = () => (
  <AreaEffectComparison
    title="Area Chart Standard Effect"
    description="Both charts are displayed without an additional named animation effect."
    chart1Description="Chart 1 rendered without an additional effect."
    chart1Effect="none"
    chart2Description="Chart 2 rendered without an additional effect."
    chart2Effect="none"
  />
);

/* -------------------------------------------------------------------------- */
/* Custom options                                                              */
/* -------------------------------------------------------------------------- */

export const CustomOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Area Chart Options"
        description="Tooltip and crosshair configurations demonstrate the advanced engine-specific options available for both chart implementations."
        statValue="2"
        statLabel="Option Groups"
        secondaryStatValue="4"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Custom Tooltip"
          description="Tooltip surfaces can be styled independently while keeping the same user-facing presentation."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="A custom tooltip using the Chart 1 advanced options API."
              api="options.plugins.tooltip"
            >
              <Chart
                type="area"
                engine="chart-1"
                data={commonData}
                appearance="smooth"
                effect="progressive-trace"
                colors={{
                  tooltipBackground: 'var(--wci-chart-tooltip-background)',
                  tooltipText: 'var(--wci-chart-tooltip-text)',
                  tooltipBorder: 'var(--wci-chart-tooltip-border)',
                }}
                options={{
                  showLegend: true,

                  interaction: {
                    mode: 'index',
                    intersect: false,
                  },

                  plugins: {
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                      borderWidth: 2,
                      cornerRadius: 10,
                      padding: 14,
                      displayColors: true,
                      caretPadding: 10,
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="A custom tooltip using the Chart 2 advanced options API."
              api="options.tooltip"
            >
              <Chart
                type="area"
                engine="chart-2"
                data={commonData}
                appearance="smooth"
                effect="line-reveal"
                colors={{
                  tooltipBackground: 'var(--wci-chart-tooltip-background)',
                  tooltipText: 'var(--wci-chart-tooltip-text)',
                  tooltipBorder: 'var(--wci-chart-tooltip-border)',
                }}
                options={{
                  tooltip: {
                    show: true,
                    trigger: 'axis',
                    confine: true,
                    borderWidth: 2,
                    padding: 14,

                    textStyle: {
                      fontSize: 13,
                    },

                    extraCssText: 'border-radius: 10px;',

                    axisPointer: {
                      type: 'line',

                      lineStyle: {
                        width: 1,
                        type: 'dashed',
                      },
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Crosshair"
          description="Crosshair inspection helps users follow the active horizontal and vertical values."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 with its crosshair plugin enabled."
              api="options.crosshair"
            >
              <Chart
                type="area"
                engine="chart-1"
                data={commonData}
                appearance="smooth"
                effect="progressive-trace"
                options={{
                  showLegend: true,
                  crosshair: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 with its cross-axis pointer enabled."
              api="options.crosshair"
            >
              <Chart
                type="area"
                engine="chart-2"
                data={commonData}
                appearance="smooth"
                effect="line-reveal"
                options={{
                  crosshair: true,

                  tooltip: {
                    show: true,
                    trigger: 'axis',

                    axisPointer: {
                      type: 'cross',
                      snap: true,

                      lineStyle: {
                        width: 1,
                        type: 'dashed',
                      },

                      crossStyle: {
                        width: 1,
                        type: 'dashed',
                      },

                      label: {
                        show: true,
                      },
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);
