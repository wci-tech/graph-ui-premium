/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import GanttChart from '@/components/echarts/components/gantt-chart/GanttChart';
import type {
  GanttChartColors,
  GanttChartEffect,
  GanttChartProps,
  GanttChartTask,
} from '@/components/echarts/components/gantt-chart/GanttChart.types';

const meta: Meta<typeof GanttChart> = {
  title: 'components/echarts/GanttChart',
  component: GanttChart,
};

export default meta;

/* -------------------------------------------------------------------------- */
/* Data helpers                                                                */
/* -------------------------------------------------------------------------- */

const createTask = (label: string, start: string, end: string, color?: string): GanttChartTask => ({
  label,
  start: +new Date(start),
  end: +new Date(end),
  ...(color ? { color } : {}),
});

const generateGanttData = (baseColor?: string): GanttChartProps['data'] => [
  createTask('Requirement Analysis', '2026-01-01', '2026-01-15', baseColor),
  createTask('System Design', '2026-01-12', '2026-01-25', baseColor),
  createTask('Development Phase', '2026-01-20', '2026-03-01'),
  createTask('Beta Testing', '2026-02-15', '2026-03-15'),
  createTask('Final Deployment', '2026-03-10', '2026-03-20'),
];

const customTaskData: GanttChartProps['data'] = [
  createTask('Requirement Analysis', '2026-01-01', '2026-01-15', 'var(--wci-chart-purple)'),
  createTask('System Design', '2026-01-12', '2026-01-25'),
  createTask('Development Phase', '2026-01-20', '2026-03-01', 'var(--wci-chart-green)'),
  createTask('Beta Testing', '2026-02-15', '2026-03-15'),
  createTask('Final Deployment', '2026-03-10', '2026-03-20', 'var(--wci-chart-orange)'),
];

/* -------------------------------------------------------------------------- */
/* Colors                                                                      */
/* -------------------------------------------------------------------------- */

const customColors: GanttChartColors = {
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

const alternateColors: GanttChartColors = {
  series: [
    'var(--wci-chart-magenta)',
    'var(--wci-chart-blue)',
    'var(--wci-chart-green)',
    'var(--wci-chart-yellow)',
    'var(--wci-chart-purple)',
  ],
};

/* -------------------------------------------------------------------------- */
/* Styles                                                                      */
/* -------------------------------------------------------------------------- */

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const heroBox = css`
  padding: 32px;
  border-radius: 16px;
`;

const chartContainer = css`
  width: 100%;
  min-height: 460px;
`;

/* -------------------------------------------------------------------------- */
/* Shared components                                                           */
/* -------------------------------------------------------------------------- */

interface PageIntroProps {
  readonly title: string;
  readonly description: string;
}

const PageIntro = ({ title, description }: PageIntroProps) => (
  <FlexLayout direction="column" gap="8px" fullWidth>
    <Typography variant="h1">{title}</Typography>

    <Typography variant="p">{description}</Typography>
  </FlexLayout>
);

interface EffectStoryProps {
  readonly effect: GanttChartEffect;
  readonly title: string;
}

const EffectStory = ({ effect, title }: EffectStoryProps) => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title={title} description={`Gantt chart using ${effect} animation.`} />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart data={generateGanttData()} effect={effect} />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Default                                                                     */
/* -------------------------------------------------------------------------- */

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Default ECharts Gantt Chart"
        description="Default Gantt chart using the shared chart color tokens and stacked timeline rendering."
      />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart chartId="default-gantt" data={generateGanttData()} effect="none" />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Custom palette                                                              */
/* -------------------------------------------------------------------------- */

export const CustomPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Palette"
        description="Gantt chart using the shared chart colors API."
      />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart
            chartId="custom-palette-gantt"
            data={generateGanttData()}
            colors={customColors}
            effect="none"
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Alternate palette                                                           */
/* -------------------------------------------------------------------------- */

export const AlternatePalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Alternate Palette"
        description="Gantt chart using an alternative shared-token series palette."
      />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart
            chartId="alternate-palette-gantt"
            data={generateGanttData()}
            colors={alternateColors}
            effect="none"
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Top axis                                                                    */
/* -------------------------------------------------------------------------- */

export const TopAxisScaling = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title="Top Axis Scaling" description="Move the timeline axis to the top." />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart
            chartId="top-axis-gantt"
            data={generateGanttData()}
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
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Zoom                                                                        */
/* -------------------------------------------------------------------------- */

export const ZoomableTimeline = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Zoomable Timeline"
        description="Enable the ECharts dataZoom slider for dense project roadmaps."
      />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart
            chartId="gantt-zoom"
            data={generateGanttData()}
            effect="none"
            options={{
              dataZoom: [
                {
                  type: 'slider',
                  show: true,
                  bottom: '5%',
                  filterMode: 'weakFilter',
                },
              ],
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Monthly timeline                                                            */
/* -------------------------------------------------------------------------- */

export const MonthlyTimeline = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Monthly Timeline"
        description="Gantt chart using monthly timeline label formatting."
      />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart
            chartId="monthly-gantt"
            data={generateGanttData()}
            effect="none"
            options={{
              timeUnit: 'month',
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Bold labels                                                                 */
/* -------------------------------------------------------------------------- */

export const BoldLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title="Bold Labels" description="Gantt chart with bold task labels." />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart
            chartId="bold-labels-gantt"
            data={generateGanttData()}
            effect="none"
            options={{
              boldLabels: true,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Custom tooltip                                                              */
/* -------------------------------------------------------------------------- */

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Tooltip"
        description="Custom tooltip behavior while colors are resolved through the shared chart color API."
      />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart
            chartId="custom-tooltip-gantt"
            data={generateGanttData()}
            colors={customColors}
            effect="none"
            options={{
              tooltip: {
                borderWidth: 1,
                extraCssText: 'border-radius: 8px;',
              },
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Crosshair                                                                   */
/* -------------------------------------------------------------------------- */

export const Crosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title="Crosshair" description="Gantt chart with a crosshair axis pointer." />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart
            chartId="crosshair-gantt"
            data={generateGanttData()}
            effect="none"
            options={{
              tooltip: {
                axisPointer: {
                  type: 'cross',
                },
              },
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Toolbox                                                                     */
/* -------------------------------------------------------------------------- */

export const Toolbox = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title="Toolbox" description="Gantt chart with ECharts toolbox functionality." />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart
            chartId="toolbox-gantt"
            data={generateGanttData()}
            effect="none"
            options={{
              toolbox: {
                show: true,
                feature: {
                  dataView: {
                    show: true,
                    readOnly: true,
                  },
                  restore: {
                    show: true,
                  },
                  saveAsImage: {
                    show: true,
                  },
                },
              },
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Task-level colors                                                           */
/* -------------------------------------------------------------------------- */

export const TaskLevelColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Task-Level Colors"
        description="Individual tasks can override the default series palette using shared chart color tokens."
      />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart chartId="task-colors-gantt" data={customTaskData} effect="none" />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Single task color                                                           */
/* -------------------------------------------------------------------------- */

export const SingleTaskColor = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Single Task Color"
        description="Apply the same shared chart color token to selected Gantt tasks."
      />

      <Box customStyles={heroBox}>
        <div css={chartContainer}>
          <GanttChart
            chartId="single-color-gantt"
            data={generateGanttData('var(--wci-chart-purple)')}
            effect="none"
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Effects                                                                     */
/* -------------------------------------------------------------------------- */

export const BounceEffect = () => <EffectStory effect="bounce" title="Bounce Effect" />;

export const WobbleEffect = () => <EffectStory effect="wobble" title="Wobble Effect" />;

export const ElasticEffect = () => <EffectStory effect="elastic" title="Elastic Effect" />;

export const ProgressiveTraceEffect = () => (
  <EffectStory effect="progressive-trace" title="Progressive Trace Effect" />
);

export const ElasticGlideEffect = () => (
  <EffectStory effect="elastic-glide" title="Elastic Glide Effect" />
);

export const StaggeredRevealEffect = () => (
  <EffectStory effect="staggered-reveal" title="Staggered Reveal Effect" />
);

/* -------------------------------------------------------------------------- */
/* Custom configuration                                                       */
/* -------------------------------------------------------------------------- */

export const CustomConfiguration = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Gantt Configuration"
        description="Examples combining the new colors API with ECharts-specific timeline options."
      />

      <FlexLayout columns={12} gap="24px" wrap="wrap">
        <FlexItem
          columnSpan={{
            default: 12,
          }}
        >
          <Box customStyles={heroBox}>
            <div css={chartContainer}>
              <GanttChart
                chartId="custom-config-gantt"
                data={generateGanttData()}
                colors={customColors}
                effect="none"
                options={{
                  timeUnit: 'week',
                  boldLabels: true,
                  xAxis: {
                    position: 'top',
                  },
                }}
              />
            </div>
          </Box>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
          }}
        >
          <Box customStyles={heroBox}>
            <div css={chartContainer}>
              <GanttChart
                chartId="custom-zoom-gantt"
                data={customTaskData}
                colors={alternateColors}
                effect="none"
                options={{
                  timeUnit: 'month',
                  dataZoom: [
                    {
                      type: 'slider',
                      show: true,
                      bottom: '5%',
                      filterMode: 'weakFilter',
                    },
                  ],
                }}
              />
            </div>
          </Box>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
