/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';
import type { TooltipItem } from 'chart.js';
import type { CallbackDataParams } from 'echarts/types/dist/shared';

import { Chart } from '@/charts/Chart';
import type { ChartHeatmapPoint } from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/HeatmapChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type SharedHeatmapEffect =
  | 'none'
  | 'bounce'
  | 'wobble'
  | 'elastic'
  | 'progressive-trace'
  | 'elastic-glide'
  | 'staggered-reveal';

const CHART_HEIGHT = 650;

const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const yLabels = ['Morning', 'Afternoon', 'Evening'];

const values = [
  [20, 35, 10, 25, 15],
  [45, 55, 40, 60, 50],
  [80, 90, 70, 95, 85],
] as const;

const heatmapPoints: ChartHeatmapPoint[] = yLabels.flatMap((yLabel, yIndex) =>
  xLabels.map((xLabel, xIndex) => ({
    x: xLabel,
    y: yLabel,
    v: values[yIndex]?.[xIndex] ?? 0,
  })),
);

const heatmapData = {
  labels: xLabels,
  series: [
    {
      label: 'Server Load',
      data: heatmapPoints,
    },
  ],
};

const timelineXLabels = [
  'Jun 30',
  'Jul 14',
  'Jul 28',
  'Aug 11',
  'Aug 25',
  'Sep 08',
  'Sep 22',
  'Oct 06',
  'Oct 20',
  'Nov 03',
  'Nov 17',
  'Dec 01',
  'Dec 15',
  'Dec 29',
];

const timelineYLabels = ['Su', 'Fr', 'We', 'Mo'];

const timelinePoints: ChartHeatmapPoint[] = timelineYLabels.flatMap((yLabel, yIndex) =>
  timelineXLabels.map((xLabel, xIndex) => ({
    x: xLabel,
    y: yLabel,
    v: ((xIndex * 13 + yIndex * 21) % 95) + 5,
  })),
);

const timelineData = {
  labels: timelineXLabels,
  series: [
    {
      label: 'Activity',
      data: timelinePoints,
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

const customChartVariables = css`
  --wci-chart-blue: #7c3aed;
  --wci-chart-teal: #0891b2;
  --wci-chart-green: #16a34a;
  --wci-chart-orange: #f59e0b;
  --wci-chart-red: #e11d48;
  --wci-chart-purple: #8b5cf6;
  --wci-chart-magenta: #ec4899;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #eab308;
  --wci-chart-axis-text: #475569;
  --wci-chart-axis-line: #64748b;
  --wci-chart-grid: #ddd6fe;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #334155;
  --wci-chart-tooltip-border: #cbd5e1;
`;

const darkChartVariables = css`
  --wci-chart-blue: #38bdf8;
  --wci-chart-teal: #22d3ee;
  --wci-chart-green: #4ade80;
  --wci-chart-orange: #fb923c;
  --wci-chart-red: #f43f5e;
  --wci-chart-purple: #a78bfa;
  --wci-chart-magenta: #f472b6;
  --wci-chart-cyan: #67e8f9;
  --wci-chart-yellow: #fbbf24;
  --wci-chart-axis-text: #f8fafc;
  --wci-chart-axis-line: #cbd5e1;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #020617;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #475569;
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
  secondaryStatValue = '15',
  secondaryStatLabel = 'Cells',
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
        title="Heatmap Chart"
        description="The same shared heatmap data is rendered using Chart 1 and Chart 2."
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
              description="Chart 1 renders the shared heatmap points using Chart.js matrix cells."
            >
              <Chart
                type="heatmap"
                engine="chart-1"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  enableHover: true,
                  showLabels: true,
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 converts the same shared points to ECharts heatmap coordinates."
            >
              <Chart
                type="heatmap"
                engine="chart-2"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
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
  readonly effect: SharedHeatmapEffect;
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
          description="The same effect is applied to both heatmap engines."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders the selected matrix animation."
            >
              <Chart
                type="heatmap"
                engine="chart-1"
                data={heatmapData}
                effect={effect}
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders the matching heatmap animation."
            >
              <Chart
                type="heatmap"
                engine="chart-2"
                data={heatmapData}
                effect={effect}
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
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
    title="Heatmap Reveal Effect"
    description="Heatmap cells progressively enter the chart."
    effect="progressive-trace"
  />
);

export const BounceEffect = () => (
  <EffectComparison
    title="Heatmap Bounce Effect"
    description="Heatmap cells enter using a bounce animation."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Heatmap Wobble Effect"
    description="Heatmap cells enter using a wobble animation."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Heatmap Elastic Effect"
    description="Heatmap cells enter using elastic motion."
    effect="elastic"
  />
);

export const ElasticGlideEffect = () => (
  <EffectComparison
    title="Heatmap Elastic Glide Effect"
    description="Heatmap cells enter using an elastic glide animation."
    effect="elastic-glide"
  />
);

export const StaggerEffect = () => (
  <EffectComparison
    title="Heatmap Stagger Effect"
    description="Heatmap cells enter sequentially."
    effect="staggered-reveal"
  />
);

export const CustomOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Heatmap Chart Options"
        description="Labels, cell sizing, tooltips, crosshair, hover behavior, spacing, colors, timelines, and backgrounds are compared."
        statValue="9"
        statLabel="Option Groups"
        secondaryStatValue="18"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Internal Labels"
          description="Both charts render the numeric heatmap value inside every cell."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 renders matrix datalabels.">
              <Chart
                type="heatmap"
                engine="chart-1"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders native ECharts heatmap labels."
            >
              <Chart
                type="heatmap"
                engine="chart-2"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Hidden Labels"
          description="Both charts hide values inside the heatmap cells."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 hides matrix datalabels.">
              <Chart
                type="heatmap"
                engine="chart-1"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 hides heatmap series labels.">
              <Chart
                type="heatmap"
                engine="chart-2"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Variable Cell Size"
          description="Cell width and height scale according to the heatmap value."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 scales matrix rectangles using their values."
            >
              <Chart
                type="heatmap"
                engine="chart-1"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  boldLabels: true,
                  cellSizeMode: 'value',
                  cellMinSizeRatio: 0.42,
                  cellGap: 8,
                  cellBorderRadius: 10,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 scales heatmap cells using the same value-based sizing options."
            >
              <Chart
                type="heatmap"
                engine="chart-2"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  boldLabels: true,
                  cellSizeMode: 'value',
                  cellMinSizeRatio: 0.42,
                  cellGap: 8,
                  cellBorderRadius: 10,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Custom Tooltip"
          description="Both engines demonstrate their native tooltip customization APIs."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 uses Chart.js tooltip callbacks.">
              <Chart
                type="heatmap"
                engine="chart-1"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  plugins: {
                    tooltip: {
                      enabled: true,
                      backgroundColor: '#ffffff',
                      borderColor: '#f5456e',
                      borderWidth: 2,
                      titleColor: '#0f172a',
                      bodyColor: '#475569',
                      displayColors: false,
                      cornerRadius: 10,
                      padding: 14,
                      callbacks: {
                        title: (items: TooltipItem<'matrix'>[]) => {
                          const point = items[0]?.raw as ChartHeatmapPoint | undefined;
                          return point ? `${point.x} • ${point.y}` : '';
                        },
                        label: (item: TooltipItem<'matrix'>) => {
                          const point = item.raw as ChartHeatmapPoint | undefined;
                          return point ? `Intensity: ${point.v}%` : '';
                        },
                      },
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 uses an ECharts tooltip formatter.">
              <Chart
                type="heatmap"
                engine="chart-2"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  tooltip: {
                    trigger: 'item',
                    confine: true,
                    backgroundColor: '#ffffff',
                    borderColor: '#f5456e',
                    borderWidth: 2,
                    padding: 14,
                    textStyle: {
                      color: '#475569',
                    },
                    extraCssText:
                      'border-radius: 10px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.14);',
                    formatter: (item: CallbackDataParams) => {
                      const value = Array.isArray(item.value) ? item.value : [];
                      const xIndex = Number(value[0] ?? 0);
                      const yIndex = Number(value[1] ?? 0);
                      const heatValue = Number(value[2] ?? 0);

                      return `${String(item.marker ?? '')} ${xLabels[xIndex] ?? xIndex} / ${
                        yLabels[yIndex] ?? yIndex
                      }: <b>${heatValue}%</b>`;
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
          description="The crosshair is disabled by default and enabled only when options.crosshair is true."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 centers its crosshair on the hovered matrix cell."
            >
              <Chart
                type="heatmap"
                engine="chart-1"
                data={heatmapData}
                effect="none"
                customStyles={{
                  container: customChartVariables,
                }}
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  boldLabels: true,
                  enableHover: true,
                  crosshair: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 enables the corresponding heatmap crosshair behavior."
            >
              <Chart
                type="heatmap"
                engine="chart-2"
                data={heatmapData}
                effect="none"
                customStyles={{
                  container: customChartVariables,
                }}
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  crosshair: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Hover Disabled"
          description="Tooltip and pointer interaction are disabled for a static heatmap presentation."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 disables hover interaction.">
              <Chart
                type="heatmap"
                engine="chart-1"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  enableHover: false,
                  crosshair: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 disables tooltip interaction.">
              <Chart
                type="heatmap"
                engine="chart-2"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  crosshair: false,
                  tooltip: {
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
          title="Cell Spacing and Shape"
          description="Both charts use matching gaps and rounded heatmap cells."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 applies a larger cell gap and radius."
            >
              <Chart
                type="heatmap"
                engine="chart-1"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  boldLabels: true,
                  cellGap: 12,
                  cellBorderRadius: 14,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 applies the same cell gap and radius."
            >
              <Chart
                type="heatmap"
                engine="chart-2"
                data={heatmapData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  cellGap: 12,
                  cellBorderRadius: 14,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Timeline Heatmap"
          description="Both charts consume the same contribution-style activity data across multiple dates."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 auto-skips dense timeline labels.">
              <Chart
                type="heatmap"
                engine="chart-1"
                data={timelineData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: false,
                  enableHover: true,
                  cellGap: 3,
                  cellBorderRadius: 3,
                  scales: {
                    x: {
                      ticks: {
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 8,
                      },
                    },
                    y: {
                      position: 'right',
                      ticks: {
                        autoSkip: false,
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
              description="Chart 2 converts the same shared points and uses interval-based labels."
            >
              <Chart
                type="heatmap"
                engine="chart-2"
                data={timelineData}
                effect="none"
                options={{
                  height: CHART_HEIGHT,
                  showLabels: false,
                  xAxis: {
                    axisLabel: {
                      interval: 1,
                      rotate: 0,
                    },
                  },
                  yAxis: {
                    position: 'right',
                  },
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
              description="Chart 1 maps values through the supplied shared series colors."
            >
              <Chart
                type="heatmap"
                engine="chart-1"
                data={heatmapData}
                effect="none"
                colors={{
                  series: ['#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8', '#1e3a8a'],
                }}
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  usePalette: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 uses the same shared series colors for its visual map."
            >
              <Chart
                type="heatmap"
                engine="chart-2"
                data={heatmapData}
                effect="none"
                colors={{
                  series: ['#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8', '#1e3a8a'],
                }}
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Custom Chart Tokens"
          description="Both engines use the same shared chart palette, axis, grid, tooltip, and crosshair CSS variables."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 resolves the common chart tokens through customStyles.container."
            >
              <Chart
                type="heatmap"
                engine="chart-1"
                data={heatmapData}
                effect="progressive-trace"
                customStyles={{
                  container: customChartVariables,
                }}
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                  boldLabels: true,
                  usePalette: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 resolves the same common chart tokens."
            >
              <Chart
                type="heatmap"
                engine="chart-2"
                data={heatmapData}
                effect="progressive-trace"
                customStyles={{
                  container: customChartVariables,
                }}
                options={{
                  height: CHART_HEIGHT,
                  showLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Custom Background"
          description="Both charts render on a dark surface using the shared dark chart tokens."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 uses chartBackground with shared dark chart tokens."
            >
              <Chart
                type="heatmap"
                engine="chart-1"
                data={heatmapData}
                effect="elastic"
                customStyles={{
                  container: darkChartVariables,
                }}
                options={{
                  height: CHART_HEIGHT,
                  chartBackground: '#0f172a',
                  showLabels: true,
                  boldLabels: true,
                  usePalette: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 uses backgroundColor with the same shared dark chart tokens."
            >
              <Chart
                type="heatmap"
                engine="chart-2"
                data={heatmapData}
                effect="elastic"
                customStyles={{
                  container: darkChartVariables,
                }}
                options={{
                  height: CHART_HEIGHT,
                  backgroundColor: '#0f172a',
                  showLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);
