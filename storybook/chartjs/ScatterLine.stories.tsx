/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent, TooltipItem } from 'chart.js';

import { ScatterLineChart } from '@/components/chartjs/components';
import type {
  ScatterLineChartDataset,
  ScatterLineChartEffect,
  ScatterLineChartPoint,
} from '@/components/chartjs/components/scatter-line-chart/ScatterLineChart.types';

const meta: Meta<typeof ScatterLineChart> = {
  title: 'components/chartjs/ScatterLineChart',
  component: ScatterLineChart,
};

export default meta;

const mockData: ScatterLineChartDataset[] = [
  {
    label: 'Observations',
    data: [
      { x: 10, y: 25 },
      { x: 15, y: 18 },
      { x: 20, y: 55 },
      { x: 25, y: 30 },
      { x: 30, y: 25 },
      { x: 35, y: 40 },
      { x: 40, y: 65 },
      { x: 45, y: 50 },
      { x: 50, y: 60 },
    ],
    pointRadius: 6,
    borderWidth: 2,
  },
  {
    label: 'Trend Line',
    data: [
      { x: 10, y: 20 },
      { x: 20, y: 32 },
      { x: 30, y: 44 },
      { x: 40, y: 46 },
      { x: 50, y: 68 },
    ],
    pointRadius: 4,
    borderWidth: 3,
  },
];

const customSeriesData: ScatterLineChartDataset[] = [
  {
    ...mockData[0],
    color: '#7c3aed',
    pointColor: '#a78bfa',
  },
  {
    ...mockData[1],
    color: '#0891b2',
    pointColor: '#22d3ee',
  },
];

const generateRegressionData = (count: number, noise: number): ScatterLineChartDataset[] => {
  const observations: ScatterLineChartPoint[] = Array.from({ length: count }, (_, index) => {
    const x = (index * 37) % 101;
    const normalizedNoise = ((index * 29) % 101) / 100 - 0.5;

    return {
      x,
      y: 10 + x * 0.8 + normalizedNoise * noise * 2,
    };
  }).sort((first, second) => first.x - second.x);

  const trend: ScatterLineChartPoint[] = Array.from({ length: 6 }, (_, index) => {
    const x = index * 20;

    return {
      x,
      y: 10 + x * 0.8,
    };
  });

  return [
    {
      label: 'Regression Observations',
      data: observations,
      pointRadius: 3,
      borderWidth: 1,
    },
    {
      label: 'Regression Trend',
      data: trend,
      pointRadius: 4,
      borderWidth: 3,
    },
  ];
};

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
}) => (
  <Box customStyles={chartCard}>
    <FlexLayout direction="column" gap="12px">
      <Typography variant="h3" customStyles={titleH3}>
        {title}
      </Typography>
      <Typography variant="p" customStyles={paragraphSmall}>
        {description}
      </Typography>
      <Typography variant="span" customStyles={codePill}>
        {api}
      </Typography>
      <div css={chartShell}>{children}</div>
    </FlexLayout>
  </Box>
);

const EffectStory = ({
  effect,
  title,
  description,
}: {
  readonly effect: ScatterLineChartEffect;
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
            <ScatterLineChart
              data={mockData}
              effect={effect}
              appearance="smooth"
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
        title="Default ChartJS Scatter Line Chart"
        description="Default scatter line chart using shared chart tokens and coordinate-based datasets."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          effect="none"
          appearance="smooth"
          options={{
            showLegend: true,
            boldLabels: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const Appearances = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Line Appearances"
        description="Compare basic and smooth Scatter Line appearances using the same coordinate data."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Appearances
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Basic"
            description="Straight connected scatter points using the basic appearance."
            api='appearance="basic"'
          >
            <ScatterLineChart
              data={mockData}
              appearance="basic"
              effect="none"
              options={{
                showLegend: true,
                boldLabels: true,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Smooth"
            description="Smooth connected scatter points using the smooth appearance."
            api='appearance="smooth"'
          >
            <ScatterLineChart
              data={mockData}
              appearance="smooth"
              effect="none"
              options={{
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

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Scatter Line Colors"
        description="Customize series, axes, grid, and tooltip colors through the Scatter Line colors API."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
          effect="none"
          colors={{
            series: ['#2563eb', '#db2777'],
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
        description="Individual datasets can override the shared series palette using line and point colors."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={customSeriesData}
          appearance="smooth"
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
        title="Scatter Line Crosshair"
        description="Enable the opt-in crosshair to inspect horizontal and vertical coordinate positions."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
          effect="progressive-trace"
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
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
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
                    const point = item.raw as ScatterLineChartPoint | undefined;
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
        title="Scatter Line Point Styles"
        description="Customize point shapes, point radius, and hover radius through Scatter Line options."
      />
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Rotated Rectangle Points"
            description="Scatter Line points rendered using the Chart.js rotated rectangle point style."
            api='pointStyle="rectRot"'
          >
            <ScatterLineChart
              data={mockData}
              appearance="smooth"
              effect="none"
              options={{
                pointStyle: 'rectRot',
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
            description="Scatter Line points rendered using the Chart.js triangle point style."
            api='pointStyle="triangle"'
          >
            <ScatterLineChart
              data={mockData}
              appearance="smooth"
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
        description="Scatter Line chart with the dataset legend disabled."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
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
        description="Scatter Line chart with bold axis labels and legend labels."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
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
    description="Bounce Scatter Line point animation."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble Scatter Line point animation."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic Scatter Line animation."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive Scatter Line reveal animation."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide Scatter Line reveal animation."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered Scatter Line point reveal animation."
  />
);

export const CustomChartTokens = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Scatter Line Custom Chart Tokens"
        description="Examples showing shared chart token overrides and custom chart surfaces."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Chart Tokens
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Chart Tokens"
            description="Overrides series, axis, grid, and tooltip tokens through the chart wrapper."
            api="customStyles.wrapper"
          >
            <ScatterLineChart
              data={mockData}
              appearance="smooth"
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
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Dark Chart Tokens"
            description="Scatter Line chart rendered using dark shared chart tokens."
            api="customStyles.wrapper"
          >
            <ScatterLineChart
              data={mockData}
              appearance="smooth"
              effect="none"
              customStyles={{
                wrapper: darkChartVariables,
              }}
              options={{
                chartBackground: '#0f172a',
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
        title="Scatter Line Click Handler"
        description="Click a Scatter Line point to access its dataset and coordinate information."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
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
        title="Custom Scatter Line Axes"
        description="Customize native Chart.js axis titles while shared chart tokens control default colors."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
          effect="none"
          options={{
            showLegend: true,
            boldLabels: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time Duration (s)',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Energy Output (kW)',
                },
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const RegressionClusterTest = () => {
  const moderateData = generateRegressionData(100, 8);
  const tightData = generateRegressionData(150, 4);
  const looseData = generateRegressionData(150, 20);

  return (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Regression Cluster Test"
          description="Deterministic regression datasets verify Scatter Line behavior at higher point densities."
        />
        <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
          <FlexItem columnSpan={{ default: 12 }}>
            <ChartCard
              title="Statistical Regression"
              description="100 observations with controlled variance around the regression trend."
              api="generateRegressionData(100, 8)"
            >
              <ScatterLineChart
                data={moderateData}
                appearance="smooth"
                effect="staggered-reveal"
                options={{
                  height: '500px',
                  showLegend: true,
                  boldLabels: true,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Independent Variable',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Dependent Variable',
                      },
                    },
                  },
                }}
              />
            </ChartCard>
          </FlexItem>
          <FlexItem columnSpan={{ default: 12, md: 6 }}>
            <ChartCard
              title="Tight Correlation"
              description="150 observations with low deterministic variance."
              api="generateRegressionData(150, 4)"
            >
              <ScatterLineChart
                data={tightData}
                appearance="smooth"
                effect="bounce"
                options={{
                  pointRadius: 4,
                  showLegend: true,
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </FlexItem>
          <FlexItem columnSpan={{ default: 12, md: 6 }}>
            <ChartCard
              title="Loose Correlation"
              description="150 observations with higher deterministic variance."
              api="generateRegressionData(150, 20)"
            >
              <ScatterLineChart
                data={looseData}
                appearance="smooth"
                effect="progressive-trace"
                options={{
                  pointRadius: 4,
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
};
