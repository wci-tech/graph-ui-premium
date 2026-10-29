/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts/Chart';
import type { ChartData, ChartEffect } from '@/charts/Chart.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/GaugeMeterChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const commonData: ChartData = {
  labels: ['Score', 'Remaining'],
  series: [
    {
      label: 'Score',
      data: [711, 289],
    },
  ],
};

const percentageData: ChartData = {
  labels: ['Progress', 'Remaining'],
  series: [
    {
      label: 'Progress',
      data: [75, 25],
    },
  ],
};

const riskData: ChartData = {
  labels: ['Low', 'Moderate', 'High', 'Critical'],
  series: [
    {
      label: 'Risk Score',
      data: [250, 250, 250, 250],
    },
  ],
};

const progressiveData: ChartData = {
  labels: [
    '0–10',
    '10–20',
    '20–30',
    '30–40',
    '40–50',
    '50–60',
    '60–70',
    '70–80',
    '80–90',
    '90–100',
  ],
  series: [
    {
      label: 'Progressive Score',
      data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    },
  ],
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
  margin-top: 16px;

  > div {
    width: 100%;
    min-width: 0;
  }
`;

const chartShellDark = css`
  position: relative;
  width: 100%;
  min-width: 0;
  margin-top: 16px;
  overflow: hidden;
  border-radius: 12px;
  background: #0f172a;

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

const customGaugeMeterVariables = css`
  --wci-chart-blue: #2563eb;
  --wci-chart-teal: #60a5fa;
  --wci-chart-green: #22c55e;
  --wci-chart-orange: #f59e0b;
  --wci-chart-red: #ef4444;
  --wci-chart-purple: #8b5cf6;
  --wci-chart-magenta: #ec4899;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #eab308;

  --wci-chart-axis-text: #475569;
  --wci-chart-axis-line: #1e3a8a;
  --wci-chart-grid: #dbeafe;
  --wci-chart-tooltip-background: #111827;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #334155;
`;

const darkGaugeMeterVariables = css`
  --wci-chart-blue: #0ce445;
  --wci-chart-teal: #38bdf8;
  --wci-chart-green: #22c55e;
  --wci-chart-orange: #ffae00;
  --wci-chart-red: #ef4444;
  --wci-chart-purple: #a78bfa;
  --wci-chart-magenta: #f472b6;
  --wci-chart-cyan: #22d3ee;
  --wci-chart-yellow: #facc15;

  --wci-chart-axis-text: #cbd5e1;
  --wci-chart-axis-line: #f8fafc;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #020617;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #475569;
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
  secondaryStatValue = '1',
  secondaryStatLabel = 'Gauge',
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
            color: var(wci-gray-700);
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
        title="Gauge Meter Chart"
        description="The same score is rendered with Chart 1 and Chart 2 using the shared Gauge Meter API."
        secondaryStatValue="711"
        secondaryStatLabel="Current Score"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both charts display a value of 711 within a total range of 0 to 1000."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 renders the gauge using Chart.js.">
              <Chart
                type="gauge"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
                  value: 711,
                  min: 0,
                  max: 1000,
                  label: 'Score',
                  boldScore: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders the same shared configuration using ECharts."
            >
              <Chart
                type="gauge"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
                  value: 711,
                  min: 0,
                  max: 1000,
                  label: 'Score',
                  boldScore: true,
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

type SharedGaugeEffect = Extract<
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
  readonly effect: SharedGaugeEffect;
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
          description="The same shared animation name and Gauge Meter options are passed to Chart 1 and Chart 2."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders the selected Gauge Meter animation."
            >
              <Chart
                type="gauge"
                engine="chart-1"
                data={commonData}
                effect={effect}
                options={{
                  height: 440,
                  value: 711,
                  min: 0,
                  max: 1000,
                  label: 'Score',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 resolves the same shared Gauge Meter effect."
            >
              <Chart
                type="gauge"
                engine="chart-2"
                data={commonData}
                effect={effect}
                options={{
                  height: 440,
                  value: 711,
                  min: 0,
                  max: 1000,
                  label: 'Score',
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
    title="Gauge Reveal Effect"
    description="The current gauge value progressively enters the chart."
    effect="progressive-trace"
  />
);

export const BounceEffect = () => (
  <EffectComparison
    title="Gauge Bounce Effect"
    description="The gauge enters using a bounce animation."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Gauge Wobble Effect"
    description="The gauge enters using a wobble-style animation."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Gauge Elastic Effect"
    description="The gauge enters using spring-like elastic motion."
    effect="elastic"
  />
);

export const ElasticGlideEffect = () => (
  <EffectComparison
    title="Gauge Elastic Glide Effect"
    description="The gauge enters using a smooth elastic glide."
    effect="elastic-glide"
  />
);

export const StaggeredRevealEffect = () => (
  <EffectComparison
    title="Gauge Staggered Reveal Effect"
    description="Gauge elements enter using controlled sequential timing."
    effect="staggered-reveal"
  />
);

/* -------------------------------------------------------------------------- */
/* Custom options                                                             */
/* -------------------------------------------------------------------------- */

export const CustomOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Gauge Meter Options"
        description="Gauge values, units, labels, pointer styling, scale visibility, colors, and backgrounds are compared through the shared Chart API."
        statValue="7"
        statLabel="Option Groups"
        secondaryStatValue="14"
        secondaryStatLabel="Examples"
      />

      {/* -------------------------------------------------------------------- */}
      {/* Percentage gauge                                                     */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Percentage Gauge"
          description="Both charts display a progress value of 75 within a range of 0 to 100."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 displays the percentage using the shared unit option."
            >
              <Chart
                type="gauge"
                engine="chart-1"
                data={percentageData}
                effect="none"
                options={{
                  height: 440,
                  value: 75,
                  min: 0,
                  max: 100,
                  unit: '%',
                  label: 'PROGRESS',
                  showSegmentLabels: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 displays the same percentage using the shared Gauge Meter options."
            >
              <Chart
                type="gauge"
                engine="chart-2"
                data={percentageData}
                effect="none"
                options={{
                  height: 440,
                  value: 75,
                  min: 0,
                  max: 100,
                  unit: '%',
                  label: 'PROGRESS',
                  showSegmentLabels: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Hidden labels                                                        */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Hidden Scale Labels"
          description="Both charts hide their boundary and scale labels through the shared option."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 hides boundary and segment labels.">
              <Chart
                type="gauge"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
                  value: 711,
                  min: 0,
                  max: 1000,
                  label: 'Score',
                  showBoundaryLabels: false,
                  showSegmentLabels: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 resolves the same option to its axis labels, ticks, and split lines."
            >
              <Chart
                type="gauge"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
                  value: 711,
                  min: 0,
                  max: 1000,
                  label: 'Score',
                  showBoundaryLabels: false,
                  showSegmentLabels: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Thin gauge                                                           */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Thin Gauge Arc"
          description="Each engine uses its supported shared option to create a thinner gauge arc."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 increases the doughnut cutout to create a thinner arc."
            >
              <Chart
                type="gauge"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
                  value: 711,
                  label: 'THIN ARC',
                  cutout: '91%',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 reduces its native gauge axis-line width."
            >
              <Chart
                type="gauge"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
                  value: 711,
                  min: 0,
                  max: 1000,
                  label: 'THIN ARC',
                  axisLineWidth: 10,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Thick gauge                                                          */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Thick Gauge Arc"
          description="Each engine uses its supported shared option to create a more prominent gauge arc."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 decreases the doughnut cutout to create a thicker arc."
            >
              <Chart
                type="gauge"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
                  value: 711,
                  label: 'THICK ARC',
                  cutout: '68%',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 increases its native gauge axis-line width."
            >
              <Chart
                type="gauge"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 440,
                  value: 711,
                  min: 0,
                  max: 1000,
                  label: 'THICK ARC',
                  axisLineWidth: 32,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Custom pointer                                                       */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Custom Pointer"
          description="Both charts resolve the shared axis-line color as the Gauge Meter needle color."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 applies the custom shared needle color."
            >
              <Chart
                type="gauge"
                engine="chart-1"
                data={commonData}
                colors={{
                  axisLine: '#dc2626',
                }}
                effect="none"
                options={{
                  height: 440,
                  value: 711,
                  label: 'CUSTOM NEEDLE',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 uses the same color and custom pointer dimensions."
            >
              <Chart
                type="gauge"
                engine="chart-2"
                data={commonData}
                colors={{
                  axisLine: '#dc2626',
                }}
                effect="none"
                options={{
                  height: 440,
                  value: 711,
                  min: 0,
                  max: 1000,
                  label: 'CUSTOM NEEDLE',
                  pointerLength: '88%',
                  pointerWidth: 6,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Custom score labels                                                  */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Custom Score Label"
          description="Both charts use the shared axis-text color for gauge labels and score text."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 uses the shared text color and bold score option."
            >
              <Chart
                type="gauge"
                engine="chart-1"
                data={commonData}
                colors={{
                  axisText: '#1d4ed8',
                }}
                effect="none"
                options={{
                  height: 440,
                  value: 711,
                  label: 'Score',
                  boldScore: true,
                  boundaryLabelColor: '#1d4ed8',
                  segmentLabelColor: '#1d4ed8',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 resolves the same shared text color to its title, value, and scale labels."
            >
              <Chart
                type="gauge"
                engine="chart-2"
                data={commonData}
                colors={{
                  axisText: '#1d4ed8',
                }}
                effect="none"
                options={{
                  height: 440,
                  value: 711,
                  min: 0,
                  max: 1000,
                  label: 'Score',
                  boldScore: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Progressive scale                                                    */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Progressive Scale"
          description="Both charts display a value of 45 across a 0-to-100 range using the same segment palette."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders ten equal segments using the shared series colors."
            >
              <Chart
                type="gauge"
                engine="chart-1"
                data={progressiveData}
                colors={{
                  series: [
                    '#f1f5f9',
                    '#f1f5f9',
                    '#f1f5f9',
                    '#ef4444',
                    '#f59e0b',
                    '#3b82f6',
                    '#10b981',
                    '#f1f5f9',
                    '#f1f5f9',
                    '#f1f5f9',
                  ],
                  axisLine: '#10b981',
                }}
                effect="progressive-trace"
                options={{
                  height: 440,
                  value: 45,
                  min: 0,
                  max: 100,
                  label: 'AVERAGE',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 uses the same segment data and shared series colors."
            >
              <Chart
                type="gauge"
                engine="chart-2"
                data={progressiveData}
                colors={{
                  series: [
                    '#f1f5f9',
                    '#f1f5f9',
                    '#f1f5f9',
                    '#ef4444',
                    '#f59e0b',
                    '#3b82f6',
                    '#10b981',
                    '#f1f5f9',
                    '#f1f5f9',
                    '#f1f5f9',
                  ],
                  axisLine: '#10b981',
                }}
                effect="progressive-trace"
                options={{
                  height: 440,
                  value: 45,
                  min: 0,
                  max: 100,
                  label: 'AVERAGE',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Risk level                                                           */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Risk Level Gauge"
          description="Both charts display a risk value of 543 across a range of 0 to 1000."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 uses four equal risk segments and a bold score."
            >
              <Chart
                type="gauge"
                engine="chart-1"
                data={riskData}
                colors={{
                  series: ['#10b981', '#facc15', '#f97316', '#ef4444'],
                  axisLine: '#ef4444',
                }}
                effect="none"
                options={{
                  height: 440,
                  value: 543,
                  min: 0,
                  max: 1000,
                  label: 'RISK LEVEL',
                  boldScore: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 uses the same green, yellow, orange, and red risk segments."
            >
              <Chart
                type="gauge"
                engine="chart-2"
                data={riskData}
                colors={{
                  series: ['#10b981', '#facc15', '#f97316', '#ef4444'],
                  axisLine: '#ef4444',
                }}
                effect="none"
                options={{
                  height: 440,
                  value: 543,
                  min: 0,
                  max: 1000,
                  label: 'RISK LEVEL',
                  boldScore: true,
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
          title="Custom CSS Variables"
          description="Both charts inherit the same shared chart palette and semantic chart tokens."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 resolves its Gauge Meter colors from shared chart CSS variables."
            >
              <Chart
                type="gauge"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                customStyles={{
                  container: customGaugeMeterVariables,
                }}
                options={{
                  height: 440,
                  value: 711,
                  min: 0,
                  max: 1000,
                  label: 'CUSTOM PALETTE',
                  boldScore: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 resolves the same shared chart CSS variables."
            >
              <Chart
                type="gauge"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                customStyles={{
                  container: customGaugeMeterVariables,
                }}
                options={{
                  height: 440,
                  value: 711,
                  min: 0,
                  max: 1000,
                  label: 'CUSTOM PALETTE',
                  boldScore: true,
                  backgroundColor: '#eff6ff',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Dark background                                                      */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Dark Background"
          description="Both charts use the same shared chart tokens on a dark surface."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 uses the shared dark Gauge Meter palette."
            >
              <div css={chartShellDark}>
                <Chart
                  type="gauge"
                  engine="chart-1"
                  data={commonData}
                  effect="none"
                  customStyles={{
                    container: darkGaugeMeterVariables,
                  }}
                  options={{
                    height: 440,
                    value: 711,
                    min: 0,
                    max: 1000,
                    label: 'DARK GAUGE',
                    boldScore: true,
                    chartBackground: '#0f172a',
                  }}
                />
              </div>
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 uses the same shared dark Gauge Meter palette."
            >
              <div css={chartShellDark}>
                <Chart
                  type="gauge"
                  engine="chart-2"
                  data={commonData}
                  effect="none"
                  customStyles={{
                    container: darkGaugeMeterVariables,
                  }}
                  options={{
                    height: 440,
                    value: 711,
                    min: 0,
                    max: 1000,
                    label: 'DARK GAUGE',
                    boldScore: true,
                    backgroundColor: '#0f172a',
                  }}
                />
              </div>
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);
