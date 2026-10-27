/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts/Chart';
import type { ChartColors, ChartEffect, ChartGanttTask } from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/GanttChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type SharedGanttEffect = Extract<
  ChartEffect,
  | 'none'
  | 'bounce'
  | 'wobble'
  | 'elastic'
  | 'progressive-trace'
  | 'elastic-glide'
  | 'staggered-reveal'
>;

const commonTasks: ChartGanttTask[] = [
  {
    label: 'Requirement Analysis',
    start: '2026-01-01',
    end: '2026-01-15',
  },
  {
    label: 'System Design',
    start: '2026-01-12',
    end: '2026-01-25',
  },
  {
    label: 'Development Phase',
    start: '2026-01-20',
    end: '2026-03-01',
  },
  {
    label: 'Beta Testing',
    start: '2026-02-15',
    end: '2026-03-15',
  },
  {
    label: 'Final Deployment',
    start: '2026-03-10',
    end: '2026-03-20',
  },
];

const roadmapTasks: ChartGanttTask[] = [
  {
    label: 'Market Analysis',
    start: '2026-01-01',
    end: '2026-01-18',
  },
  {
    label: 'User Research',
    start: '2026-01-12',
    end: '2026-02-05',
  },
  {
    label: 'MVP Build',
    start: '2026-02-01',
    end: '2026-03-15',
  },
  {
    label: 'Beta Launch',
    start: '2026-03-10',
    end: '2026-04-01',
  },
  {
    label: 'General Release',
    start: '2026-03-28',
    end: '2026-04-20',
  },
];

const denseTasks: ChartGanttTask[] = [
  {
    label: 'Phase 1',
    start: '2026-01-01',
    end: '2026-01-08',
  },
  {
    label: 'Phase 2',
    start: '2026-01-05',
    end: '2026-01-14',
  },
  {
    label: 'Phase 3',
    start: '2026-01-11',
    end: '2026-01-21',
  },
  {
    label: 'Phase 4',
    start: '2026-01-18',
    end: '2026-01-30',
  },
  {
    label: 'Phase 5',
    start: '2026-01-26',
    end: '2026-02-08',
  },
  {
    label: 'Phase 6',
    start: '2026-02-04',
    end: '2026-02-18',
  },
  {
    label: 'Phase 7',
    start: '2026-02-14',
    end: '2026-03-01',
  },
  {
    label: 'Phase 8',
    start: '2026-02-25',
    end: '2026-03-14',
  },
  {
    label: 'Phase 9',
    start: '2026-03-10',
    end: '2026-03-28',
  },
  {
    label: 'Phase 10',
    start: '2026-03-24',
    end: '2026-04-12',
  },
  {
    label: 'Phase 11',
    start: '2026-04-08',
    end: '2026-04-28',
  },
  {
    label: 'Phase 12',
    start: '2026-04-24',
    end: '2026-05-16',
  },
];

const customTaskColors: ChartGanttTask[] = [
  {
    label: 'Requirement Analysis',
    start: '2026-01-01',
    end: '2026-01-15',
    color: 'var(--wci-chart-purple)',
  },
  {
    label: 'System Design',
    start: '2026-01-12',
    end: '2026-01-25',
  },
  {
    label: 'Development Phase',
    start: '2026-01-20',
    end: '2026-03-01',
    color: 'var(--wci-chart-green)',
  },
  {
    label: 'Beta Testing',
    start: '2026-02-15',
    end: '2026-03-15',
  },
  {
    label: 'Final Deployment',
    start: '2026-03-10',
    end: '2026-03-20',
    color: 'var(--wci-chart-orange)',
  },
];

const commonData = {
  labels: commonTasks.map((task) => task.label),
  series: [
    {
      label: 'Project Timeline',
      data: commonTasks,
    },
  ],
};

const roadmapData = {
  labels: roadmapTasks.map((task) => task.label),
  series: [
    {
      label: 'Product Roadmap',
      data: roadmapTasks,
    },
  ],
};

const denseData = {
  labels: denseTasks.map((task) => task.label),
  series: [
    {
      label: 'Project Phases',
      data: denseTasks,
    },
  ],
};

const taskColorData = {
  labels: customTaskColors.map((task) => task.label),
  series: [
    {
      label: 'Custom Tasks',
      data: customTaskColors,
    },
  ],
};

const customColors: ChartColors = {
  series: [
    'var(--wci-chart-purple)',
    'var(--wci-chart-teal)',
    'var(--wci-chart-green)',
    'var(--wci-chart-orange)',
    'var(--wci-chart-cyan)',
  ],
  axisText: 'var(--wci-chart-axis-text)',
  axisLine: 'var(--wci-chart-axis-line)',
  grid: 'var(--wci-chart-grid)',
  tooltipBackground: 'var(--wci-chart-tooltip-background)',
  tooltipText: 'var(--wci-chart-tooltip-text)',
  tooltipBorder: 'var(--wci-chart-tooltip-border)',
};

const alternateColors: ChartColors = {
  series: [
    'var(--wci-chart-magenta)',
    'var(--wci-chart-blue)',
    'var(--wci-chart-green)',
    'var(--wci-chart-yellow)',
    'var(--wci-chart-purple)',
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
  max-width: 860px;
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
  secondaryStatLabel = 'Tasks',
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

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Gantt Chart"
        description="The same project roadmap is displayed using Chart 1 and Chart 2."
      />

      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines display the same project tasks, date ranges, labels, colors, and timeline order."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js renders the project roadmap using horizontal timeline bars."
            >
              <Chart type="gantt" engine="chart-1" data={commonData} effect="none" />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts renders the same project roadmap using its timeline configuration."
            >
              <Chart type="gantt" engine="chart-2" data={commonData} effect="none" />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

const EffectComparison = ({
  title,
  description,
  effect,
}: {
  readonly title: string;
  readonly description: string;
  readonly effect: SharedGanttEffect;
}) => (
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
              description="Chart.js renders the selected Gantt effect."
            >
              <Chart type="gantt" engine="chart-1" data={commonData} effect={effect} />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts renders the equivalent Gantt effect."
            >
              <Chart type="gantt" engine="chart-2" data={commonData} effect={effect} />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const ProgressiveTraceEffect = () => (
  <EffectComparison
    title="Gantt Progressive Trace Effect"
    description="Timeline tasks progressively enter the chart."
    effect="progressive-trace"
  />
);

export const BounceEffect = () => (
  <EffectComparison
    title="Gantt Bounce Effect"
    description="Timeline tasks enter using a bounce animation."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Gantt Wobble Effect"
    description="Timeline tasks enter using a wobble animation."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Gantt Elastic Effect"
    description="Timeline tasks enter using elastic movement."
    effect="elastic"
  />
);

export const ElasticGlideEffect = () => (
  <EffectComparison
    title="Gantt Elastic Glide Effect"
    description="Timeline tasks enter using an elastic glide animation."
    effect="elastic-glide"
  />
);

export const StaggeredRevealEffect = () => (
  <EffectComparison
    title="Gantt Staggered Reveal Effect"
    description="Timeline tasks enter sequentially with controlled delays."
    effect="staggered-reveal"
  />
);

export const WeeklyTimeline = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Weekly Gantt Timeline"
        description="Both engines render the same roadmap using a weekly timeline."
      />

      <section css={pageSection}>
        <SectionHeading
          title="Weekly Timeline"
          description="The shared timeUnit option is passed to both Gantt implementations."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart.js uses a weekly time scale.">
              <Chart
                type="gantt"
                engine="chart-1"
                data={roadmapData}
                effect="none"
                options={{
                  timeUnit: 'week',
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts uses weekly formatted timeline labels."
            >
              <Chart
                type="gantt"
                engine="chart-2"
                data={roadmapData}
                effect="none"
                options={{
                  timeUnit: 'week',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const MonthlyTimeline = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Monthly Gantt Timeline"
        description="Dense project tasks are displayed using a broader monthly timeline scale."
        secondaryStatValue="12"
        secondaryStatLabel="Tasks"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Monthly Timeline"
          description="Both engines receive the same monthly Gantt configuration."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart.js uses a monthly time scale.">
              <Chart
                type="gantt"
                engine="chart-1"
                data={denseData}
                effect="none"
                options={{
                  timeUnit: 'month',
                  height: 600,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="ECharts uses monthly timeline formatting.">
              <Chart
                type="gantt"
                engine="chart-2"
                data={denseData}
                effect="none"
                options={{
                  timeUnit: 'month',
                  height: 600,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const TopTimelineAxis = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Top Timeline Axis"
        description="Engine-specific options move the timeline axis to the top."
      />

      <section css={pageSection}>
        <SectionHeading
          title="Top Timeline Axis"
          description="Chart.js and ECharts keep their native engine-specific axis configuration."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart.js positions its x-axis at the top.">
              <Chart
                type="gantt"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  scales: {
                    x: {
                      position: 'top',
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts positions its timeline axis at the top."
            >
              <Chart
                type="gantt"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  xAxis: {
                    position: 'top',
                    splitLine: {
                      show: true,
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

export const ZoomableTimeline = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Zoomable Gantt Timeline"
        description="Longer schedules use the navigation features provided by each chart engine."
        secondaryStatValue="12"
        secondaryStatLabel="Tasks"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Zoomable Timeline"
          description="Chart.js reduces timeline tick density while ECharts provides its native dataZoom slider."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js uses a weekly scale with fewer visible ticks."
            >
              <Chart
                type="gantt"
                engine="chart-1"
                data={denseData}
                effect="none"
                options={{
                  timeUnit: 'week',
                  height: 600,
                  scales: {
                    x: {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 8,
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
              description="ECharts uses its native timeline zoom slider."
            >
              <Chart
                type="gantt"
                engine="chart-2"
                data={denseData}
                effect="none"
                options={{
                  height: 600,
                  dataZoom: [
                    {
                      type: 'slider',
                      show: true,
                      bottom: '3%',
                      filterMode: 'weakFilter',
                    },
                  ],
                  grid: {
                    bottom: 72,
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

export const BoldLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bold Gantt Labels"
        description="Both engines receive the shared boldLabels option."
      />

      <section css={pageSection}>
        <SectionHeading
          title="Bold Labels"
          description="Task labels use stronger emphasis in both chart engines."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart.js renders bold task labels.">
              <Chart
                type="gantt"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="ECharts renders bold task labels.">
              <Chart
                type="gantt"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Gantt Tooltip"
        description="Tooltip colors use the shared colors API while engine-specific options control tooltip presentation."
      />

      <section css={pageSection}>
        <SectionHeading
          title="Custom Tooltip"
          description="Both engines use the same shared tooltip tokens without hard-coded tooltip colors."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js customizes tooltip layout while colors come from the shared chart tokens."
            >
              <Chart
                type="gantt"
                engine="chart-1"
                data={commonData}
                colors={customColors}
                effect="none"
                options={{
                  plugins: {
                    tooltip: {
                      borderWidth: 1,
                      displayColors: false,
                      cornerRadius: 10,
                      padding: 12,
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts customizes tooltip layout while colors come from the same shared chart tokens."
            >
              <Chart
                type="gantt"
                engine="chart-2"
                data={commonData}
                colors={customColors}
                effect="none"
                options={{
                  tooltip: {
                    borderWidth: 1,
                    padding: 12,
                    extraCssText: 'border-radius: 10px;',
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

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Gantt Colors"
        description="Both engines receive the same shared chart color configuration."
      />

      <section css={pageSection}>
        <SectionHeading
          title="Custom Colors"
          description="Series, axis, grid, and tooltip colors are supplied through the common Chart colors API."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js resolves the shared color tokens for its Canvas renderer."
            >
              <Chart
                type="gantt"
                engine="chart-1"
                data={commonData}
                colors={customColors}
                effect="progressive-trace"
                options={{
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts resolves the same shared color tokens for its renderer."
            >
              <Chart
                type="gantt"
                engine="chart-2"
                data={commonData}
                colors={customColors}
                effect="progressive-trace"
                options={{
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const AlternatePalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Alternate Gantt Palette"
        description="Both engines render the same alternate shared series palette."
      />

      <section css={pageSection}>
        <SectionHeading
          title="Alternate Palette"
          description="The shared Chart colors API keeps palette configuration independent of the rendering engine."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js uses the alternate shared palette."
            >
              <Chart
                type="gantt"
                engine="chart-1"
                data={commonData}
                colors={alternateColors}
                effect="none"
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts uses the same alternate shared palette."
            >
              <Chart
                type="gantt"
                engine="chart-2"
                data={commonData}
                colors={alternateColors}
                effect="none"
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const TaskLevelColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Task-Level Gantt Colors"
        description="Individual tasks override the shared series palette while the remaining tasks continue using default colors."
      />

      <section css={pageSection}>
        <SectionHeading
          title="Task-Level Colors"
          description="The same task-level color overrides are passed through both engine adapters."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js resolves task-level CSS color tokens before rendering."
            >
              <Chart type="gantt" engine="chart-1" data={taskColorData} effect="none" />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts resolves the same task-level CSS color tokens."
            >
              <Chart type="gantt" engine="chart-2" data={taskColorData} effect="none" />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);
