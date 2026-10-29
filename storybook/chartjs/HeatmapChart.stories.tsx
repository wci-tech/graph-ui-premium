/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { TooltipItem } from 'chart.js';

import HeatmapChart from '@/components/chartjs/components/heatmap-chart/HeatmapChart';
import type {
  HeatmapChartEffect,
  HeatmapPoint,
} from '@/components/chartjs/components/heatmap-chart/HeatmapChart.types';

const meta: Meta<typeof HeatmapChart> = {
  title: 'components/chartjs/HeatmapChart',
  component: HeatmapChart,
};

export default meta;

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const yLabels = ['Morning', 'Afternoon', 'Evening'];

const heatmapData: HeatmapPoint[] = [
  { x: 'Mon', y: 'Morning', v: 20 },
  { x: 'Mon', y: 'Afternoon', v: 45 },
  { x: 'Mon', y: 'Evening', v: 80 },
  { x: 'Tue', y: 'Morning', v: 35 },
  { x: 'Tue', y: 'Afternoon', v: 55 },
  { x: 'Tue', y: 'Evening', v: 90 },
  { x: 'Wed', y: 'Morning', v: 10 },
  { x: 'Wed', y: 'Afternoon', v: 40 },
  { x: 'Wed', y: 'Evening', v: 70 },
  { x: 'Thu', y: 'Morning', v: 25 },
  { x: 'Thu', y: 'Afternoon', v: 60 },
  { x: 'Thu', y: 'Evening', v: 95 },
  { x: 'Fri', y: 'Morning', v: 15 },
  { x: 'Fri', y: 'Afternoon', v: 50 },
  { x: 'Fri', y: 'Evening', v: 85 },
];

const mockData = {
  xLabels,
  yLabels,
  data: heatmapData,
};

const timeScaleXLabels = [
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
  'Jan 12',
  'Jan 26',
  'Feb 09',
  'Feb 23',
  'Mar 09',
  'Mar 23',
  'Apr 06',
  'Apr 20',
  'May 04',
  'May 18',
  'Jun 01',
  'Jun 15',
  'Jun 29',
];

const timeScaleYLabels = ['Su', 'Fr', 'We', 'Mo'];

const timeScaleData: HeatmapPoint[] = timeScaleYLabels.flatMap((yLabel, yIndex) =>
  timeScaleXLabels.map((xLabel, xIndex) => ({
    x: xLabel,
    y: yLabel,
    v: ((xIndex * 13 + yIndex * 21) % 95) + 5,
  })),
);

const timeScaleMockData = {
  xLabels: timeScaleXLabels,
  yLabels: timeScaleYLabels,
  data: timeScaleData,
};

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  margin-bottom: 16px;
  color: #1e293b;
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH2 = css`
  margin-bottom: 12px;
  padding: 16px;
  color: #1e293b;
  font-size: 1.875rem;
  font-weight: 600;
`;

const titleH3 = css`
  margin-bottom: 8px;
  color: #1e293b;
  font-size: 1.35rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  color: #475569;
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const heroBox = css`
  padding: 32px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #f8fafc;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 10px 25px rgb(15 23 42 / 6%);
`;

const chartShell = css`
  width: 100%;
  min-height: 430px;
  margin-top: 20px;
`;

const codePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #334155;
  font-family: monospace;
  font-size: 12px;
`;

const customChartVariables = css`
  --wci-chart-blue: #f5456e;
  --wci-chart-teal: #3d9eff;
  --wci-chart-green: #59cc26;
  --wci-chart-orange: #ffae00;
  --wci-chart-red: #ff784d;
  --wci-chart-purple: #8b5cf6;
  --wci-chart-magenta: #ec4899;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #eab308;

  --wci-chart-axis-text: #475569;
  --wci-chart-axis-line: #f5456e;
  --wci-chart-grid: #fee2e2;
  --wci-chart-tooltip-background: #111827;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #334155;
`;

const darkChartVariables = css`
  --wci-chart-blue: #3d9eff;
  --wci-chart-teal: #22d3ee;
  --wci-chart-green: #59cc26;
  --wci-chart-orange: #ffae00;
  --wci-chart-red: #f5456e;
  --wci-chart-purple: #a78bfa;
  --wci-chart-magenta: #f472b6;
  --wci-chart-cyan: #67e8f9;
  --wci-chart-yellow: #facc15;

  --wci-chart-axis-text: #f8fafc;
  --wci-chart-axis-line: #cbd5e1;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #020617;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #475569;
`;

/* -------------------------------------------------------------------------- */
/* Shared components                                                          */
/* -------------------------------------------------------------------------- */

const PageIntro = ({
  title,
  description,
}: {
  readonly title: string;
  readonly description: string;
}) => (
  <FlexLayout direction="column" gap="8px" fullWidth>
    <Typography variant="h1" customStyles={titleH1}>
      {title}
    </Typography>

    <Typography variant="p" customStyles={paragraph}>
      {description}
    </Typography>
  </FlexLayout>
);

const ChartCard = ({
  title,
  description,
  api,
  children,
}: {
  readonly title: string;
  readonly description: string;
  readonly api: string;
  readonly children: ReactNode;
}) => {
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

        <Typography variant="span" customStyles={codePill}>
          {api}
        </Typography>

        <div css={chartShell}>{children}</div>
      </FlexLayout>
    </Box>
  );
};

const EffectStory = ({
  effect,
  title,
  description,
}: {
  readonly effect: HeatmapChartEffect;
  readonly title: string;
  readonly description: string;
}) => (
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
            <HeatmapChart
              {...mockData}
              effect={effect}
              options={{
                showLabels: true,
                boldLabels: true,
                usePalette: true,
              }}
            />
          </div>
        </FlexLayout>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Default                                                                    */
/* -------------------------------------------------------------------------- */

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Default ChartJS Heatmap Chart"
        description="Default matrix heatmap using the shared chart color tokens and value-based opacity."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          {...mockData}
          effect="none"
          options={{
            enableHover: true,
            showLabels: true,
            boldLabels: true,
            chartBackground: '#f8fafc',
          }}
        />
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Color modes                                                                */
/* -------------------------------------------------------------------------- */

export const ColorModes = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Heatmap Color Modes"
        description="Heatmap supports single-color density and multi-color palette rendering without chart variants."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Color Modes
      </Typography>

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Density Heatmap"
            description="Uses the first series color with value-based opacity."
            api="options.usePalette=false"
          >
            <HeatmapChart
              {...mockData}
              effect="none"
              colors={{
                series: ['#4054d1'],
              }}
              options={{
                showLabels: true,
                boldLabels: true,
                usePalette: false,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Palette Heatmap"
            description="Maps values across the configured shared series palette."
            api="options.usePalette=true"
          >
            <HeatmapChart
              {...mockData}
              effect="none"
              colors={{
                series: ['#4054d1', '#17ceca', '#59cc26', '#ffae00', '#f5456e'],
              }}
              options={{
                showLabels: true,
                boldLabels: true,
                usePalette: true,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Crosshair                                                                  */
/* -------------------------------------------------------------------------- */

export const Crosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Heatmap Crosshair"
        description="The crosshair is disabled by default and appears only when options.crosshair is true."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          {...mockData}
          effect="none"
          customStyles={{
            wrapper: customChartVariables,
          }}
          options={{
            showLabels: true,
            boldLabels: true,
            enableHover: true,
            usePalette: true,
            crosshair: true,
            chartBackground: '#f8fafc',
          }}
        />
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Time scale                                                                 */
/* -------------------------------------------------------------------------- */

export const TimeScale = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Time Scale Heatmap"
        description="Compact timeline-style heatmap inspired by contribution activity charts."
      />

      <Box customStyles={heroBox}>
        <FlexLayout direction="column" gap="16px">
          <Typography variant="h2" customStyles={titleH2}>
            On Time Scale
          </Typography>

          <div css={chartShell}>
            <HeatmapChart
              {...timeScaleMockData}
              effect="none"
              options={{
                showLabels: false,
                enableHover: true,
                usePalette: true,
                chartBackground: '#ffffff',
                cellGap: 2,
                cellBorderRadius: 2,
                height: '260px',
                plugins: {
                  tooltip: {
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    titleColor: '#0f172a',
                    bodyColor: '#475569',
                    displayColors: false,
                    cornerRadius: 10,
                    padding: 12,
                    callbacks: {
                      title: (items: TooltipItem<'matrix'>[]) => {
                        const point = items[0]?.raw as HeatmapPoint | undefined;
                        return point ? `${point.x} • ${point.y}` : '';
                      },
                      label: (item: TooltipItem<'matrix'>) => {
                        const point = item.raw as HeatmapPoint | undefined;
                        return point ? `Activity: ${point.v}%` : '';
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      maxRotation: 0,
                      autoSkip: true,
                      maxTicksLimit: 14,
                    },
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    position: 'right',
                    ticks: {
                      autoSkip: false,
                    },
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>
        </FlexLayout>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Variable cell size                                                         */
/* -------------------------------------------------------------------------- */

export const VariableCellSize = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Variable Cell Size"
        description="Cells grow and shrink based on their value while keeping the matrix layout consistent."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          {...mockData}
          effect="none"
          options={{
            showLabels: true,
            boldLabels: true,
            usePalette: true,
            cellSizeMode: 'value',
            cellMinSizeRatio: 0.42,
            cellGap: 8,
            cellBorderRadius: 10,
          }}
        />
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Custom tooltip                                                             */
/* -------------------------------------------------------------------------- */

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Tooltip"
        description="Heatmap with a custom tooltip presentation and value formatter."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          {...mockData}
          effect="none"
          options={{
            showLabels: true,
            boldLabels: true,
            usePalette: true,
            plugins: {
              tooltip: {
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                titleColor: '#0f172a',
                bodyColor: '#475569',
                displayColors: false,
                cornerRadius: 10,
                padding: 12,
                callbacks: {
                  title: (items: TooltipItem<'matrix'>[]) => {
                    const point = items[0]?.raw as HeatmapPoint | undefined;
                    return point ? `${point.x} • ${point.y}` : '';
                  },
                  label: (item: TooltipItem<'matrix'>) => {
                    const point = item.raw as HeatmapPoint | undefined;
                    return point ? `Intensity: ${point.v}%` : '';
                  },
                },
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Effects                                                                    */
/* -------------------------------------------------------------------------- */

export const BounceEffect = () => (
  <EffectStory effect="bounce" title="Bounce Effect" description="Bounce matrix animation." />
);

export const WobbleEffect = () => (
  <EffectStory effect="wobble" title="Wobble Effect" description="Wobble matrix animation." />
);

export const ElasticEffect = () => (
  <EffectStory effect="elastic" title="Elastic Effect" description="Elastic matrix animation." />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive heatmap reveal animation."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide heatmap reveal animation."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered matrix cell reveal animation."
  />
);

/* -------------------------------------------------------------------------- */
/* Custom styles                                                              */
/* -------------------------------------------------------------------------- */

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Heatmap Custom Styles"
        description="Heatmap examples using shared chart CSS variables on custom light and dark surfaces."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Behavior
      </Typography>

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom CSS Variables"
            description="Overrides series, axis, grid, and tooltip colors through the shared chart tokens."
            api="customStyles.wrapper"
          >
            <HeatmapChart
              {...mockData}
              effect="none"
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{
                chartBackground: '#fffbeb',
                boldLabels: true,
                showLabels: true,
                usePalette: true,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Dark Surface"
            description="Heatmap rendered on a dark chart background using the same shared chart token contract."
            api="customStyles.wrapper + options.chartBackground"
          >
            <HeatmapChart
              {...mockData}
              effect="none"
              customStyles={{
                wrapper: darkChartVariables,
              }}
              options={{
                chartBackground: '#0f172a',
                boldLabels: true,
                showLabels: true,
                usePalette: true,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
