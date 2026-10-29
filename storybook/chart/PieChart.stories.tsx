/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts/Chart';
import type { ChartData } from '@/charts/Chart.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/PieChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const CHART_HEIGHT = 650;

const commonData: ChartData = {
  labels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV', 'Other'],
  series: [
    {
      label: 'Traffic Sources',
      data: [38, 31, 16, 10, 5],
    },
  ],
};

const revenueData: ChartData = {
  labels: ['Enterprise', 'Consumer', 'Partners', 'Marketplace', 'Other'],
  series: [
    {
      label: 'Revenue',
      data: [38, 31, 16, 10, 5],
    },
  ],
};

const browserData: ChartData = {
  labels: ['Chrome', 'Safari', 'Edge', 'Firefox', 'Other'],
  series: [
    {
      label: 'Browser Usage',
      data: [62, 19, 9, 6, 4],
    },
  ],
};

const customColors: NonNullable<EngineRendererProps['colors']> = {
  series: [
    'var(--wci-chart-purple)',
    'var(--wci-chart-cyan)',
    'var(--wci-chart-green)',
    'var(--wci-chart-yellow)',
    'var(--wci-chart-red)',
  ],
  axisText: 'var(--wci-chart-purple)',
  axisLine: 'var(--wci-white)',
  tooltipBackground: 'var(--wci-black)',
  tooltipText: 'var(--wci-white)',
  tooltipBorder: 'var(--wci-chart-purple)',
};

const darkColors: NonNullable<EngineRendererProps['colors']> = {
  series: [
    'var(--wci-chart-red)',
    'var(--wci-chart-blue)',
    'var(--wci-chart-green)',
    'var(--wci-chart-orange)',
    'var(--wci-chart-yellow)',
  ],
  axisText: 'var(--wci-white)',
  axisLine: 'var(--wci-black)',
  tooltipBackground: 'var(--wci-black)',
  tooltipText: 'var(--wci-white)',
  tooltipBorder: 'var(--wci-white)',
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
  max-width: 920px;
  margin-bottom: 24px;
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
`;

const heroBox = css`
  padding: 32px;
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
  min-height: ${CHART_HEIGHT}px;
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
`;

const statLabelBlue = css`
  color: #0c4a6e;
`;

const statValueGreen = css`
  color: #013a28;
  font-size: 2rem;
  font-weight: 700;
`;

const statLabelGreen = css`
  color: #013a28;
`;

const darkSurface = css`
  border-radius: 12px;
  background: var(--wci-black);
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
  statValue = '2',
  statLabel = 'Charts',
  secondaryStatValue = '5',
  secondaryStatLabel = 'Segments',
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

      <Typography variant="p" customStyles={paragraphSmall}>
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

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Pie Chart"
        description="The same shared pie data is rendered using Chart 1 and Chart 2."
      />

      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines receive the same shared data while their adapters convert it to the required renderer format."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders the shared segment data using Chart.js."
            >
              <Chart
                type="pie"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders the same shared segment data using ECharts."
            >
              <Chart
                type="pie"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

type EffectComparisonProps = {
  readonly title: string;
  readonly description: string;
  readonly effect: ChartEffect;
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
          description="The same effect is applied to both Pie Chart engines."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders the selected Pie Chart animation."
            >
              <Chart
                type="pie"
                engine="chart-1"
                data={commonData}
                effect={effect}
                options={{
                  height: CHART_HEIGHT,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders the matching Pie Chart animation."
            >
              <Chart
                type="pie"
                engine="chart-2"
                data={commonData}
                effect={effect}
                options={{
                  height: CHART_HEIGHT,
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
    title="Pie Chart Reveal Effect"
    description="Pie segments progressively enter the chart."
    effect="progressive-trace"
  />
);

export const BounceEffect = () => (
  <EffectComparison
    title="Pie Chart Bounce Effect"
    description="Pie segments enter using a bounce animation."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Pie Chart Wobble Effect"
    description="Pie segments enter using a wobble animation."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Pie Chart Elastic Effect"
    description="Pie segments enter using elastic motion."
    effect="elastic"
  />
);

export const ElasticGlideEffect = () => (
  <EffectComparison
    title="Pie Chart Elastic Glide Effect"
    description="Pie segments enter using an elastic glide animation."
    effect="elastic-glide"
  />
);

export const StaggerEffect = () => (
  <EffectComparison
    title="Pie Chart Stagger Effect"
    description="Pie segments enter sequentially."
    effect="staggered-reveal"
  />
);

export const CustomOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Pie Chart Options"
        description="Crosshair, colors, labels, legends, backgrounds, tooltips, and combined Pie Chart configurations are compared."
        statValue="7"
        statLabel="Option Groups"
        secondaryStatValue="14"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Crosshair"
          description="The crosshair is disabled by default and enabled only when options.crosshair is true."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 enables its Pie Chart crosshair.">
              <Chart
                type="pie"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  crosshair: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 enables the corresponding Pie Chart crosshair."
            >
              <Chart
                type="pie"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  crosshair: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Custom Colors"
          description="Both engines receive the same shared color configuration through the Chart colors prop."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 maps the shared colors to its Pie Chart configuration."
            >
              <Chart
                type="pie"
                engine="chart-1"
                data={commonData}
                colors={customColors}
                effect="progressive-trace"
                options={{
                  height: CHART_HEIGHT,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 maps the same shared colors to its Pie Chart configuration."
            >
              <Chart
                type="pie"
                engine="chart-2"
                data={commonData}
                colors={customColors}
                effect="progressive-trace"
                options={{
                  height: CHART_HEIGHT,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Chart Background"
          description="Both engines use the shared chartBackground option."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders with a custom chart background."
            >
              <Chart
                type="pie"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  chartBackground: '#f8fafc',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders with the same custom chart background."
            >
              <Chart
                type="pie"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  chartBackground: '#f8fafc',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Bold Labels and Legends"
          description="Both engines render emphasized Pie Chart labels and legend text."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders bold labels and legend text."
            >
              <Chart
                type="pie"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders the corresponding bold labels and legend text."
            >
              <Chart
                type="pie"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Hidden Legend"
          description="Both engines hide their Pie Chart legends using their native renderer options."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 hides its legend using Chart.js options."
            >
              <Chart
                type="pie"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
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
              description="Chart 2 hides its legend using ECharts options."
            >
              <Chart
                type="pie"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  legend: {
                    show: false,
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Custom Tooltip"
          description="Both engines demonstrate their native tooltip configuration while shared tooltip colors come from the colors prop."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 uses Chart.js tooltip options.">
              <Chart
                type="pie"
                engine="chart-1"
                data={revenueData}
                colors={customColors}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  plugins: {
                    tooltip: {
                      enabled: true,
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 uses ECharts tooltip options.">
              <Chart
                type="pie"
                engine="chart-2"
                data={revenueData}
                colors={customColors}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  tooltip: {
                    trigger: 'item',
                    confine: true,
                    borderWidth: 2,
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Dark Presentation"
          description="Both engines use the same shared dark color configuration."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders the browser distribution using dark colors."
            >
              <Chart
                type="pie"
                engine="chart-1"
                data={browserData}
                colors={darkColors}
                effect="elastic"
                customStyles={{
                  container: darkSurface,
                }}
                options={{
                  height: CHART_HEIGHT,
                  chartBackground: 'var(--wci-black)',
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders the same browser distribution using dark colors."
            >
              <Chart
                type="pie"
                engine="chart-2"
                data={browserData}
                colors={darkColors}
                effect="elastic"
                customStyles={{
                  container: darkSurface,
                }}
                options={{
                  height: CHART_HEIGHT,
                  chartBackground: 'var(--wci-black)',
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Combined Options"
          description="Shared colors, crosshair, background, labels, legends, tooltip, and animation are combined."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 combines shared Pie Chart functionality with Chart.js renderer options."
            >
              <Chart
                type="pie"
                engine="chart-1"
                data={revenueData}
                colors={customColors}
                effect="staggered-reveal"
                options={{
                  height: CHART_HEIGHT,
                  chartBackground: '#f8fafc',
                  crosshair: true,
                  boldLabels: true,
                  boldLegends: true,
                  hoverOffset: 20,
                  elements: {
                    arc: {
                      borderRadius: 6,
                      spacing: 2,
                    },
                  },
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                      align: 'center',
                    },
                    tooltip: {
                      enabled: true,
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 combines the same shared functionality with ECharts renderer options."
            >
              <Chart
                type="pie"
                engine="chart-2"
                data={revenueData}
                colors={customColors}
                effect="staggered-reveal"
                options={{
                  height: CHART_HEIGHT,
                  chartBackground: '#f8fafc',
                  crosshair: true,
                  boldLabels: true,
                  boldLegends: true,
                  legend: {
                    show: true,
                    bottom: 0,
                    left: 'center',
                  },
                  series: [
                    {
                      radius: ['40%', '68%'],
                      center: ['50%', '46%'],
                      avoidLabelOverlap: true,
                      padAngle: 1,
                      itemStyle: {
                        borderRadius: 6,
                      },
                      label: {
                        show: true,
                        position: 'outside',
                        fontWeight: 'bold',
                        formatter: '{b}: {d}%',
                      },
                      labelLine: {
                        show: true,
                        length: 16,
                        length2: 10,
                      },
                      emphasis: {
                        scale: true,
                        scaleSize: 16,
                      },
                    },
                  ],
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);
