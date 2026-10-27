/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';
import type { TooltipItem } from 'chart.js';
import type { CallbackDataParams } from 'echarts/types/dist/shared';

import { Chart } from '@/charts/Chart';
import type { ChartData } from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/DoughnutChart',
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
  labels: ['Desktop', 'Mobile', 'Tablet', 'Other', 'TV'],
  series: [
    {
      label: 'Device Traffic',
      data: [45, 22, 16, 10, 7],
    },
  ],
};

const revenueData: ChartData = {
  labels: ['Search Engine', 'Direct', 'Email', 'Union Ads', 'Video Ads'],
  series: [
    {
      label: 'Access Source',
      data: [1048, 735, 580, 484, 300],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Shared colors                                                               */
/* -------------------------------------------------------------------------- */

const customColors = {
  series: [
    'var(--wci-chart-purple)',
    'var(--wci-chart-teal)',
    'var(--wci-chart-red)',
    'var(--wci-chart-orange)',
    'var(--wci-chart-cyan)',
  ],
  axisText: 'var(--wci-chart-axis-text)',
  tooltipBackground: 'var(--wci-chart-tooltip-background)',
  tooltipText: 'var(--wci-chart-tooltip-text)',
  tooltipBorder: 'var(--wci-chart-tooltip-border)',
} as const;

const alternateColors = {
  series: [
    'var(--wci-chart-magenta)',
    'var(--wci-chart-blue)',
    'var(--wci-chart-green)',
    'var(--wci-chart-yellow)',
    'var(--wci-chart-purple)',
  ],
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
  border-radius: 16px;
`;

const chartCard = css`
  width: 100%;
  height: 100%;
  min-width: 0;
  border-radius: 14px;
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
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const statBox = css`
  min-width: 140px;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const statValue = css`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
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
  statValue: primaryStatValue = '2',
  statLabel = 'Charts',
  secondaryStatValue = '5',
  secondaryStatLabel = 'Segments',
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

            <Typography variant="span">{statLabel}</Typography>
          </Box>

          <Box customStyles={statBox}>
            <Typography variant="p" customStyles={statValue}>
              {secondaryStatValue}
            </Typography>

            <Typography variant="span">{secondaryStatLabel}</Typography>
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
/* Default rendering                                                           */
/* -------------------------------------------------------------------------- */

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Doughnut Chart"
        description="The same category data is rendered with Chart 1 and Chart 2 through the shared Chart API."
      />

      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines use the shared data contract, default chart palette, bottom legend, and doughnut presentation."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js renders the default Doughnut configuration."
            >
              <Chart
                type="doughnut"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: '440px',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts renders the same shared Doughnut data."
            >
              <Chart
                type="doughnut"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
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

type SharedDoughnutEffect =
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
  readonly effect: SharedDoughnutEffect;
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
          description="The same shared effect is applied to Chart 1 and Chart 2."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js renders the selected Doughnut effect."
            >
              <Chart
                type="doughnut"
                engine="chart-1"
                data={commonData}
                effect={effect}
                options={{
                  height: '440px',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts renders the equivalent Doughnut effect."
            >
              <Chart
                type="doughnut"
                engine="chart-2"
                data={commonData}
                effect={effect}
                options={{
                  height: 440,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const RevealEffect = () => (
  <EffectComparison
    title="Doughnut Reveal Effect"
    description="Segments progressively enter the chart."
    effect="progressive-trace"
  />
);

export const BounceEffect = () => (
  <EffectComparison
    title="Doughnut Bounce Effect"
    description="Segments enter using a bounce animation."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Doughnut Wobble Effect"
    description="Segments enter using a wobble animation."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Doughnut Elastic Effect"
    description="Segments enter using elastic motion."
    effect="elastic"
  />
);

export const ElasticGlideEffect = () => (
  <EffectComparison
    title="Doughnut Elastic Glide Effect"
    description="Segments enter using a smooth glide with an elastic finish."
    effect="elastic-glide"
  />
);

export const StaggerEffect = () => (
  <EffectComparison
    title="Doughnut Stagger Effect"
    description="Segments enter using controlled sequential delays."
    effect="staggered-reveal"
  />
);

/* -------------------------------------------------------------------------- */
/* Custom options                                                              */
/* -------------------------------------------------------------------------- */

export const CustomOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Doughnut Chart Options"
        description="Shared and engine-specific Doughnut configuration is compared across Chart 1 and Chart 2."
        statValue="6"
        statLabel="Option Groups"
        secondaryStatValue="12"
        secondaryStatLabel="Examples"
      />

      {/* -------------------------------------------------------------------- */}
      {/* Legend right                                                         */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Legend Right"
          description="Both engines position the legend vertically on the right using their native option structures."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart.js legend positioned on the right.">
              <Chart
                type="doughnut"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: '440px',
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts legend positioned vertically on the right."
            >
              <Chart
                type="doughnut"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
                  legend: {
                    show: true,
                    orient: 'vertical',
                    right: '4%',
                    top: 'center',
                  },
                  series: [
                    {
                      center: ['38%', '50%'],
                    },
                  ],
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Large inner radius                                                   */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Large Inner Radius"
          description="Both engines use their dedicated innerRadius option to create a thinner Doughnut ring."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart.js uses a larger inner radius.">
              <Chart
                type="doughnut"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: '440px',
                  innerRadius: '78%',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts uses the new dedicated innerRadius and outerRadius options."
            >
              <Chart
                type="doughnut"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
                  innerRadius: '70%',
                  outerRadius: '91%',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Small inner radius                                                   */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Small Inner Radius"
          description="Both engines use a smaller center opening to create a thicker Doughnut ring."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart.js renders a thicker Doughnut ring.">
              <Chart
                type="doughnut"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: '440px',
                  innerRadius: '45%',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="ECharts renders the same thicker ring.">
              <Chart
                type="doughnut"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
                  innerRadius: '45%',
                  outerRadius: '90%',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Hidden legend                                                        */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Hidden Legend"
          description="The legend is disabled for both engines."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart.js legend display disabled.">
              <Chart
                type="doughnut"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: '440px',
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts uses the Doughnut showLegend convenience option."
            >
              <Chart
                type="doughnut"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
                  showLegend: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Custom tooltip                                                       */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Custom Tooltip"
          description="Both engines customize tooltip formatting while colors continue to come from the shared chart color API."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart.js custom Doughnut tooltip.">
              <Chart
                type="doughnut"
                engine="chart-1"
                data={revenueData}
                colors={customColors}
                effect="none"
                options={{
                  height: '440px',
                  plugins: {
                    tooltip: {
                      borderWidth: 2,
                      cornerRadius: 10,
                      padding: 14,
                      displayColors: true,
                      boxPadding: 6,
                      callbacks: {
                        label: (item: TooltipItem<'doughnut'>) => {
                          const value = typeof item.parsed === 'number' ? item.parsed : 0;

                          return `${item.label}: ${value.toLocaleString()}`;
                        },
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
              description="ECharts custom Doughnut tooltip with equivalent formatting."
            >
              <Chart
                type="doughnut"
                engine="chart-2"
                data={revenueData}
                colors={customColors}
                effect="none"
                options={{
                  height: 440,
                  tooltip: {
                    trigger: 'item',
                    confine: true,
                    borderWidth: 2,
                    padding: 14,
                    formatter: (item: CallbackDataParams) =>
                      `${String(item.marker ?? '')} ${String(item.name ?? '')}: <b>${Number(
                        item.value ?? 0,
                      ).toLocaleString()}</b> (${Number(item.percent ?? 0).toFixed(1)}%)`,
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Custom colors                                                        */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Custom Colors"
          description="Both engines receive the same shared colors object. No Doughnut-specific CSS variables are required."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js receives the shared chart palette through the colors prop."
            >
              <Chart
                type="doughnut"
                engine="chart-1"
                data={commonData}
                colors={customColors}
                effect="progressive-trace"
                options={{
                  height: '440px',
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts receives the exact same shared chart palette."
            >
              <Chart
                type="doughnut"
                engine="chart-2"
                data={commonData}
                colors={customColors}
                effect="progressive-trace"
                options={{
                  height: 440,
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Alternate palette                                                    */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Alternate Palette"
          description="The shared series palette can be replaced without changing either engine implementation."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js with an alternate shared series palette."
            >
              <Chart
                type="doughnut"
                engine="chart-1"
                data={commonData}
                colors={alternateColors}
                effect="none"
                options={{
                  height: '440px',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts with the same alternate shared series palette."
            >
              <Chart
                type="doughnut"
                engine="chart-2"
                data={commonData}
                colors={alternateColors}
                effect="none"
                options={{
                  height: 440,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);
