/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import GanttChart from '@/components/chartjs/components/gantt-chart/GanttChart';
import type {
  GanttChartColors,
  GanttChartEffect,
  GanttChartProps,
} from '@/components/chartjs/components/gantt-chart/GanttChart.types';

const meta: Meta<typeof GanttChart> = {
  title: 'components/chartjs/GanttChart',
  component: GanttChart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const mockData: GanttChartProps['data'] = [
  {
    label: 'Planning',
    start: '2024-03-01',
    end: '2024-03-08',
  },
  {
    label: 'Design',
    start: '2024-03-06',
    end: '2024-03-18',
  },
  {
    label: 'Development',
    start: '2024-03-15',
    end: '2024-04-05',
  },
  {
    label: 'Testing',
    start: '2024-04-01',
    end: '2024-04-14',
  },
  {
    label: 'Release',
    start: '2024-04-12',
    end: '2024-04-20',
  },
];

const denseProjectData: GanttChartProps['data'] = [
  {
    label: 'Phase 1',
    start: '2024-03-01',
    end: '2024-03-07',
  },
  {
    label: 'Phase 2',
    start: '2024-03-04',
    end: '2024-03-12',
  },
  {
    label: 'Phase 3',
    start: '2024-03-09',
    end: '2024-03-18',
  },
  {
    label: 'Phase 4',
    start: '2024-03-14',
    end: '2024-03-24',
  },
  {
    label: 'Phase 5',
    start: '2024-03-20',
    end: '2024-03-30',
  },
  {
    label: 'Phase 6',
    start: '2024-03-25',
    end: '2024-04-05',
  },
  {
    label: 'Phase 7',
    start: '2024-04-01',
    end: '2024-04-12',
  },
  {
    label: 'Phase 8',
    start: '2024-04-08',
    end: '2024-04-18',
  },
  {
    label: 'Phase 9',
    start: '2024-04-15',
    end: '2024-04-26',
  },
  {
    label: 'Phase 10',
    start: '2024-04-22',
    end: '2024-05-03',
  },
  {
    label: 'Phase 11',
    start: '2024-04-29',
    end: '2024-05-10',
  },
  {
    label: 'Phase 12',
    start: '2024-05-06',
    end: '2024-05-17',
  },
];

const customColorData: GanttChartProps['data'] = [
  {
    label: 'Discovery',
    start: '2024-03-01',
    end: '2024-03-08',
  },
  {
    label: 'Wireframe',
    start: '2024-03-07',
    end: '2024-03-18',
  },
  {
    label: 'Build',
    start: '2024-03-16',
    end: '2024-04-04',
  },
  {
    label: 'QA',
    start: '2024-04-01',
    end: '2024-04-12',
  },
  {
    label: 'Launch',
    start: '2024-04-11',
    end: '2024-04-19',
  },
];

const customColors: GanttChartColors = {
  series: [
    'var(--wci-chart-purple)',
    'var(--wci-chart-teal)',
    'var(--wci-chart-red)',
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

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const titleH2 = css`
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 12px;
  padding: 16px;
`;

const titleH3 = css`
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const paragraph = css`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const paragraphSmall = css`
  font-size: 0.95rem;
  line-height: 1.5;
`;

const heroBox = css`
  padding: 32px !important;
  border-radius: 16px;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border-radius: 14px;
`;

const chartShell = css`
  width: 100%;
  min-height: 460px;
  margin-top: 20px;
`;

const codePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-family: monospace;
  font-size: 12px;
`;

interface PageIntroProps {
  readonly title: string;
  readonly description: string;
}

const PageIntro = ({ title, description }: PageIntroProps) => (
  <FlexLayout direction="column" gap="8px" fullWidth>
    <Typography variant="h1" customStyles={titleH1}>
      {title}
    </Typography>

    <Typography variant="p" customStyles={paragraph}>
      {description}
    </Typography>
  </FlexLayout>
);

interface ChartCardProps {
  readonly title: string;
  readonly description: string;
  readonly children: ReactNode;
}

const ChartCard = ({ title, description, children }: ChartCardProps) => {
  return (
    <Box customStyles={chartCard}>
      <FlexLayout direction="column" gap="12px">
        <Typography variant="h3" customStyles={titleH3}>
          {title}
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

interface EffectStoryProps {
  readonly effect: GanttChartEffect;
  readonly title: string;
  readonly description: string;
}

const EffectStory = ({ effect, title, description }: EffectStoryProps) => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title={title} description={description} />

      <Box customStyles={heroBox}>
        <FlexLayout direction="column" gap="16px">
          <Typography variant="h2" customStyles={titleH2}>
            {title}
          </Typography>

          <Typography variant="span" customStyles={codePill}>
            effect="{effect}"
          </Typography>

          <div css={chartShell}>
            <GanttChart data={mockData} effect={effect} />
          </div>
        </FlexLayout>
      </Box>
    </div>
  </main>
);

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Default ChartJS Gantt Chart"
        description="Default timeline chart using the shared chart color tokens."
      />

      <Box customStyles={heroBox}>
        <GanttChart data={mockData} effect="none" />
      </Box>
    </div>
  </main>
);

export const CustomPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Gantt Custom Palette"
        description="Custom timeline palette using the shared chart color API."
      />

      <Box customStyles={heroBox}>
        <GanttChart data={mockData} colors={customColors} effect="none" />
      </Box>
    </div>
  </main>
);

export const AlternatePalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Gantt Alternate Palette"
        description="Alternative series palette using shared WCI chart tokens."
      />

      <Box customStyles={heroBox}>
        <GanttChart data={mockData} colors={alternateColors} effect="none" />
      </Box>
    </div>
  </main>
);

export const WeeklyTimeline = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title="Weekly Timeline" description="Gantt chart using a weekly time scale." />

      <Box customStyles={heroBox}>
        <GanttChart
          data={mockData}
          effect="none"
          options={{
            timeUnit: 'week',
          }}
        />
      </Box>
    </div>
  </main>
);

export const MonthlyTimeline = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Monthly Timeline"
        description="Dense project timeline using a monthly time scale."
      />

      <Box customStyles={heroBox}>
        <GanttChart
          data={denseProjectData}
          effect="none"
          options={{
            timeUnit: 'month',
            height: 600,
          }}
        />
      </Box>
    </div>
  </main>
);

export const BoldLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title="Bold Timeline Labels" description="Gantt chart with bold axis labels." />

      <Box customStyles={heroBox}>
        <GanttChart
          data={mockData}
          effect="none"
          options={{
            boldLabels: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Tooltip"
        description="Custom tooltip behavior while tooltip colors continue to use the shared chart color tokens."
      />

      <Box customStyles={heroBox}>
        <GanttChart
          data={mockData}
          colors={customColors}
          effect="none"
          options={{
            plugins: {
              tooltip: {
                displayColors: false,
                cornerRadius: 10,
                padding: 12,
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Bounce animation gives the timeline a dynamic entrance."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble animation gives the timeline a playful refresh."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic animation adds spring-like movement to the timeline."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive trace reveals timeline bars over time."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide adds a smooth animated entrance."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered reveal animates each timeline row with delay."
  />
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Gantt Customization"
        description="Examples using the colors API, chart options, time scale configuration, and task-level color overrides."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Behavior
      </Typography>

      <FlexLayout
        columns={12}
        gap={{
          default: '24px',
          md: '32px',
        }}
        wrap="wrap"
      >
        <FlexItem
          columnSpan={{
            default: 12,
          }}
        >
          <ChartCard
            title="Custom Colors"
            description="Overrides timeline, axis, grid, and tooltip colors through the chart colors API."
          >
            <GanttChart
              data={customColorData}
              colors={customColors}
              effect="none"
              options={{
                timeUnit: 'day',
                boldLabels: true,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
          }}
        >
          <ChartCard
            title="Alternate Palette"
            description="Uses another shared-token series palette without chart-specific CSS variables."
          >
            <GanttChart
              data={mockData}
              colors={alternateColors}
              effect="none"
              options={{
                boldLabels: true,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
          }}
        >
          <ChartCard
            title="Task-Level Colors"
            description="Individual tasks can override the palette while the remaining tasks continue using the shared series colors."
          >
            <GanttChart
              data={[
                {
                  label: 'Planning',
                  start: '2024-03-01',
                  end: '2024-03-08',
                  color: 'var(--wci-chart-purple)',
                },
                {
                  label: 'Design',
                  start: '2024-03-06',
                  end: '2024-03-18',
                },
                {
                  label: 'Development',
                  start: '2024-03-15',
                  end: '2024-04-05',
                  color: 'var(--wci-chart-green)',
                },
                {
                  label: 'Testing',
                  start: '2024-04-01',
                  end: '2024-04-14',
                },
                {
                  label: 'Release',
                  start: '2024-04-12',
                  end: '2024-04-20',
                  color: 'var(--wci-chart-orange)',
                },
              ]}
              effect="none"
            />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
          }}
        >
          <ChartCard
            title="Custom Height"
            description="Adjusts the chart height while preserving the default Gantt configuration."
          >
            <GanttChart
              data={denseProjectData}
              effect="none"
              options={{
                height: 600,
                timeUnit: 'week',
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
