/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent, TooltipItem } from 'chart.js';

import { ScatterChart } from '@/components/chartjs/components';
import type {
  ScatterChartDataset,
  ScatterChartEffect,
  ScatterChartPoint,
} from '@/components/chartjs/components/scatter-chart/ScatterChart.types';

const meta: Meta<typeof ScatterChart> = {
  title: 'components/chartjs/ScatterChart',
  component: ScatterChart,
};

export default meta;

const mockData: ScatterChartDataset[] = [
  {
    label: 'Performance A',
    data: [
      { x: 10, y: 20 },
      { x: 15, y: 10 },
      { x: 20, y: 30 },
      { x: 25, y: 25 },
      { x: 30, y: 40 },
    ],
  },
  {
    label: 'Performance B',
    data: [
      { x: 12, y: 15 },
      { x: 18, y: 25 },
      { x: 22, y: 10 },
      { x: 28, y: 35 },
      { x: 35, y: 30 },
    ],
  },
];

const customSeriesData: ScatterChartDataset[] = [
  {
    label: 'Enterprise',
    data: [
      { x: 8, y: 18 },
      { x: 14, y: 28 },
      { x: 20, y: 22 },
      { x: 26, y: 38 },
      { x: 34, y: 32 },
    ],
    color: '#d4af37',
    pointRadius: 7,
  },
  {
    label: 'Consumer',
    data: [
      { x: 10, y: 12 },
      { x: 16, y: 20 },
      { x: 24, y: 16 },
      { x: 30, y: 30 },
      { x: 38, y: 26 },
    ],
    color: '#2d5a27',
    pointRadius: 7,
  },
];

const generateHighDensityData = (count: number): ScatterChartDataset[] => [
  {
    label: 'Sensor Cluster Alpha',
    data: Array.from({ length: count }, (_, index) => ({
      x: (index * 17) % 100,
      y: (index * 29 + 11) % 100,
    })),
  },
  {
    label: 'Sensor Cluster Beta',
    data: Array.from({ length: count }, (_, index) => ({
      x: (index * 23 + 7) % 100,
      y: (index * 31 + 19) % 100,
    })),
  },
];

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
  --wci-chart-blue: #d4af37;
  --wci-chart-teal: #2d5a27;
  --wci-chart-green: #3d9eff;
  --wci-chart-orange: #f97316;
  --wci-chart-red: #ef4444;
  --wci-chart-purple: #8b5cf6;
  --wci-chart-magenta: #d946ef;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #eab308;
  --wci-chart-axis-text: #111827;
  --wci-chart-axis-line: #92400e;
  --wci-chart-grid: #fde68a;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #111827;
  --wci-chart-tooltip-border: #d4af37;
`;

const darkChartVariables = css`
  --wci-chart-blue: #38bdf8;
  --wci-chart-teal: #a78bfa;
  --wci-chart-green: #4ade80;
  --wci-chart-orange: #fb923c;
  --wci-chart-red: #f87171;
  --wci-chart-purple: #c084fc;
  --wci-chart-magenta: #e879f9;
  --wci-chart-cyan: #22d3ee;
  --wci-chart-yellow: #facc15;
  --wci-chart-axis-text: #f8fafc;
  --wci-chart-axis-line: #64748b;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #1e293b;
  --wci-chart-tooltip-text: #f8fafc;
  --wci-chart-tooltip-border: #475569;
`;

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
            color: var(--wci-gary-700);
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
  readonly effect: ScatterChartEffect;
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
            <ScatterChart
              data={mockData}
              effect={effect}
              options={{
                showLegend: true,
                boldLabels: true,
              }}
            />
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
        title="Default ChartJS Scatter Chart"
        description="Default scatter chart using shared chart tokens and coordinate-based datasets."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          options={{
            showLegend: true,
            boldLabels: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Scatter Colors"
        description="Customize series, axes, grid, and tooltip colors through the Scatter Chart colors API."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          colors={{
            series: ['#d4af37', '#2d5a27'],
            axisText: '#475569',
            axisLine: '#cbd5e1',
            grid: '#e2e8f0',
            tooltipBackground: '#ffffff',
            tooltipText: '#0f172a',
            tooltipBorder: '#cbd5e1',
          }}
          options={{
            showLegend: true,
            boldLabels: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const DatasetColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Dataset Colors"
        description="Individual datasets can override the shared series palette through the dataset color property."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={customSeriesData}
          effect="none"
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const WithCrosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Chart Crosshair"
        description="Hover over a scatter point to inspect its horizontal and vertical position using the opt-in crosshair."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="progressive-trace"
          colors={{
            axisLine: '#64748b',
          }}
          options={{
            crosshair: true,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
            interaction: {
              mode: 'nearest',
              intersect: true,
              axis: 'xy',
            },
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
        description="Custom Chart.js tooltip configuration with coordinate-based labels."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          options={{
            showLegend: true,
            boldLabels: true,
            plugins: {
              tooltip: {
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                titleColor: '#0f172a',
                bodyColor: '#475569',
                displayColors: true,
                cornerRadius: 10,
                padding: 12,
                callbacks: {
                  label: (item: TooltipItem<'scatter'>) => {
                    const point = item.raw as ScatterChartPoint | undefined;
                    const datasetLabel = item.dataset.label ?? 'Dataset';

                    return point ? `${datasetLabel}: X ${point.x}, Y ${point.y}` : datasetLabel;
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

export const PointStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Point Styles"
        description="Customize point shapes, point radius, and hover radius through Scatter Chart options."
      />

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Star Points"
            description="Scatter points rendered using the Chart.js star point style."
            api='pointStyle="star"'
          >
            <ScatterChart
              data={mockData}
              effect="none"
              options={{
                pointStyle: 'star',
                pointRadius: 7,
                pointHoverRadius: 10,
                showLegend: true,
                boldLabels: true,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Triangle Points"
            description="Scatter points rendered using the Chart.js triangle point style."
            api='pointStyle="triangle"'
          >
            <ScatterChart
              data={mockData}
              effect="none"
              options={{
                pointStyle: 'triangle',
                pointRadius: 7,
                pointHoverRadius: 10,
                showLegend: true,
                boldLabels: true,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const HiddenLegend = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Hidden Legend"
        description="Scatter chart with the dataset legend disabled."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          options={{
            showLegend: false,
            boldLabels: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const BoldLabelsAndLegends = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bold Labels and Legends"
        description="Scatter chart with bold axis labels and legend labels."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
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
    description="Bounce scatter point animation."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble scatter point animation."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic scatter point animation."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive scatter point reveal animation."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide scatter point animation."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered scatter point reveal animation."
  />
);

export const CustomChartTokens = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Scatter Custom Chart Tokens"
        description="Examples showing shared chart token overrides and custom chart surfaces."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Chart Tokens
      </Typography>

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Custom Chart Tokens"
            description="Overrides series, axis, grid, and tooltip tokens through the chart wrapper."
            api="customStyles.wrapper"
          >
            <ScatterChart
              data={mockData}
              effect="none"
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{
                showLegend: true,
                boldLabels: true,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Dark Chart Tokens"
            description="Scatter chart rendered using dark shared chart tokens."
            api="customStyles.wrapper"
          >
            <ScatterChart
              data={mockData}
              effect="none"
              customStyles={{
                wrapper: darkChartVariables,
              }}
              options={{
                showLegend: true,
                boldLabels: true,
                boldLegends: true,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const ClickHandler = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Chart Click Handler"
        description="Click a scatter point to access its dataset and coordinate information."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          options={{
            showLegend: true,
            boldLabels: true,
            onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
              const firstElement = elements[0];

              if (!firstElement) return;

              const dataset = mockData[firstElement.datasetIndex];
              const point = dataset?.data[firstElement.index];

              if (!dataset || !point) return;

              alert(
                `API Call: Fetching details for ${dataset.label} at Coordinates [X: ${point.x}, Y: ${point.y}]`,
              );
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomAxes = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Scatter Axes"
        description="Customize native Chart.js scatter axis titles while shared chart tokens continue to control default colors."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          options={{
            showLegend: true,
            boldLabels: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'X-Axis Frequency',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Y-Axis Amplitude',
                },
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const HighDensityStressTest = () => {
  const densityData = generateHighDensityData(50);

  return (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="High Density Scatter Stress Test"
          description="Testing 100 deterministic points with staggered reveal and smaller point radius."
        />

        <Box customStyles={heroBox}>
          <ScatterChart
            data={densityData}
            effect="staggered-reveal"
            options={{
              isBoxVisible: true,
              pointRadius: 4,
              pointHoverRadius: 7,
              boldLabels: true,
              showLegend: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'X-Axis Frequency',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Y-Axis Amplitude',
                  },
                },
              },
            }}
          />
        </Box>
      </div>
    </main>
  );
};
