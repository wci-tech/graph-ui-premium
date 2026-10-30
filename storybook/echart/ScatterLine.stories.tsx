/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { ScatterLineChart } from '@/components/echarts/components';
import type {
  ScatterLineChartData,
  ScatterLineChartEffect,
  ScatterLineChartPoint,
} from '@/components/echarts/components/scatter-line-chart/ScatterLineChart.types';

const meta: Meta<typeof ScatterLineChart> = {
  title: 'components/echarts/ScatterLineChart',
  component: ScatterLineChart,
};

export default meta;

const mockData: ScatterLineChartData = {
  series: [
    {
      label: 'Observations',
      data: [
        [10, 25],
        [15, 18],
        [20, 55],
        [25, 30],
        [30, 25],
        [35, 40],
        [40, 65],
        [45, 50],
        [50, 60],
      ],
      pointRadius: 12,
      borderWidth: 3,
    },
    {
      label: 'Trend Line',
      data: [
        [10, 20],
        [20, 32],
        [30, 44],
        [40, 56],
        [50, 68],
      ],
      pointRadius: 8,
      borderWidth: 4,
    },
  ],
};

const customSeriesData: ScatterLineChartData = {
  series: [
    {
      ...mockData.series[0],
      color: '#7c3aed',
      pointColor: '#a78bfa',
    },
    {
      ...mockData.series[1],
      color: '#0891b2',
      pointColor: '#22d3ee',
    },
  ],
};

const generateRegressionData = (count: number, noise = 5): ScatterLineChartData => {
  const scatterPoints: ScatterLineChartPoint[] = Array.from({ length: count }, (_, index) => {
    const x = (index * 37) % 101;
    const normalizedNoise = ((index * 29) % 101) / 100 - 0.5;

    return [x, 10 + x * 0.8 + normalizedNoise * noise * 2] as const;
  }).sort((first, second) => first[0] - second[0]);

  return {
    series: [
      {
        label: 'Regression Observations',
        data: scatterPoints,
        pointRadius: 8,
        borderWidth: 4,
      },
    ],
  };
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
  --wci-chart-axis-line: #94a3b8;
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
              appearance="smooth"
              effect={effect}
              options={{
                height: 430,
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
        title="Default ECharts Scatter Line Chart"
        description="Default scatter line chart using shared chart tokens and tuple-based coordinate data."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
          effect="none"
          options={{
            height: 430,
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
        title="ECharts Scatter Line Appearances"
        description="Compare basic and smooth line interpolation using the same Scatter Line data."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Appearances
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Basic"
            description="Straight line segments connect the coordinate points."
            api='appearance="basic"'
          >
            <ScatterLineChart
              data={mockData}
              appearance="basic"
              effect="none"
              options={{
                height: 430,
                showLegend: true,
                boldLabels: true,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Smooth"
            description="Smooth interpolation connects the coordinate points."
            api='appearance="smooth"'
          >
            <ScatterLineChart
              data={mockData}
              appearance="smooth"
              effect="none"
              options={{
                height: 430,
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
            height: 430,
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
        description="Individual series can override the resolved shared palette for line and point colors."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={customSeriesData}
          appearance="smooth"
          effect="none"
          options={{
            height: 430,
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
        description="Crosshair interaction is opt-in and enabled only when options.crosshair is true."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
          effect="none"
          options={{
            height: 430,
            crosshair: true,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
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
        description="Native ECharts tooltip options can override the generated Scatter Line tooltip configuration."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
          effect="none"
          options={{
            height: 430,
            showLegend: true,
            tooltip: {
              trigger: 'axis',
              backgroundColor: '#ffffff',
              borderColor: '#e2e8f0',
              borderWidth: 1,
              textStyle: {
                color: '#475569',
              },
              axisPointer: {
                type: 'cross',
              },
              formatter: (params: unknown) => {
                const items = Array.isArray(params) ? params : [params];

                return items
                  .map((item) => {
                    const tooltipItem = item as {
                      readonly seriesName?: string;
                      readonly value?: readonly [number, number];
                    };
                    const label = tooltipItem.seriesName ?? 'Dataset';
                    const point = tooltipItem.value;

                    return point ? `${label}: <b>[${point[0]}, ${point[1]}]</b>` : label;
                  })
                  .join('<br/>');
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const PointSizes = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Line Point Sizes"
        description="Configure point sizes independently for each Scatter Line series."
      />
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Small Points"
            description="Compact points for dense Scatter Line datasets."
            api="pointRadius: 6"
          >
            <ScatterLineChart
              data={{
                series: mockData.series.map((series) => ({
                  ...series,
                  pointRadius: 6,
                })),
              }}
              appearance="smooth"
              effect="none"
              options={{
                height: 430,
                showLegend: true,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Large Points"
            description="Larger points for stronger coordinate emphasis."
            api="pointRadius: 14"
          >
            <ScatterLineChart
              data={{
                series: mockData.series.map((series) => ({
                  ...series,
                  pointRadius: 14,
                })),
              }}
              appearance="smooth"
              effect="none"
              options={{
                height: 430,
                showLegend: true,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const LineWidths = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Line Widths"
        description="Configure the connecting line width independently for each series."
      />
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Thin Lines"
            description="Thin connecting lines for lightweight data visualization."
            api="borderWidth: 1"
          >
            <ScatterLineChart
              data={{
                series: mockData.series.map((series) => ({
                  ...series,
                  borderWidth: 1,
                })),
              }}
              appearance="smooth"
              effect="none"
              options={{
                height: 430,
                showLegend: true,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Thick Lines"
            description="Thicker connecting lines for stronger visual emphasis."
            api="borderWidth: 5"
          >
            <ScatterLineChart
              data={{
                series: mockData.series.map((series) => ({
                  ...series,
                  borderWidth: 5,
                })),
              }}
              appearance="smooth"
              effect="none"
              options={{
                height: 430,
                showLegend: true,
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
        description="Disable the Scatter Line legend while preserving the complete chart visualization."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
          effect="none"
          options={{
            height: 430,
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
        description="Emphasize Scatter Line axis labels and legend labels."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
          effect="none"
          options={{
            height: 430,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const DataZoom = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Line Data Zoom"
        description="Inside and slider zoom controls for dense regression exploration."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={generateRegressionData(120, 12)}
          appearance="smooth"
          effect="none"
          options={{
            height: 430,
            showLegend: true,
            dataZoom: [{ type: 'inside' }, { type: 'slider' }],
          }}
        />
      </Box>
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectStory effect="bounce" title="Bounce Effect" description="Bounce Scatter Line animation." />
);

export const WobbleEffect = () => (
  <EffectStory effect="wobble" title="Wobble Effect" description="Wobble Scatter Line animation." />
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
    description="Staggered Scatter Line reveal animation."
  />
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Scatter Line Custom Styles"
        description="Customize Scatter Line charts using the shared WCI chart CSS variables."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Chart Tokens"
            description="Overrides series, axis, grid, and tooltip colors through shared chart tokens."
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
                height: 430,
                showLegend: true,
                boldLabels: true,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Dark Chart Tokens"
            description="Scatter Line chart rendered using shared dark chart tokens."
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
                height: 430,
                backgroundColor: '#0f172a',
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

export const CustomAxes = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Scatter Line Axes"
        description="Customize native ECharts axis titles while shared chart tokens control default axis colors."
      />
      <Box customStyles={heroBox}>
        <ScatterLineChart
          data={mockData}
          appearance="smooth"
          effect="none"
          options={{
            height: 430,
            showLegend: true,
            boldLabels: true,
            xAxis: {
              name: 'Time Duration (s)',
              nameLocation: 'middle',
              nameGap: 30,
            },
            yAxis: {
              name: 'Energy Output (kW)',
              nameLocation: 'middle',
              nameGap: 45,
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
                  height: 500,
                  showLegend: true,
                  boldLabels: true,
                  dataZoom: [{ type: 'inside' }, { type: 'slider' }],
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
                  height: 430,
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
                effect="staggered-reveal"
                options={{
                  height: 430,
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
