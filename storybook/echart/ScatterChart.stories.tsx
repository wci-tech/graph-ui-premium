/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { ReactNode } from 'react';

import { ScatterChart } from '@/components/echarts/components';
import type {
  ScatterChartData,
  ScatterChartEffect,
  ScatterChartPoint,
} from '@/components/echarts/components/scatter-chart/ScatterChart.types';

const meta: Meta<typeof ScatterChart> = {
  title: 'components/echarts/ScatterChart',
  component: ScatterChart,
};

export default meta;

const mockData: ScatterChartData = {
  series: [
    {
      label: 'Performance A',
      data: [
        [10, 20],
        [15, 10],
        [20, 30],
        [25, 25],
        [30, 40],
      ],
    },
    {
      label: 'Performance B',
      data: [
        [12, 15],
        [18, 25],
        [22, 10],
        [28, 35],
        [35, 30],
      ],
    },
  ],
};

const createDeterministicPoints = (
  count: number,
  xOffset: number,
  yOffset: number,
): ScatterChartPoint[] =>
  Array.from({ length: count }, (_, index) => [
    (index * 17 + xOffset) % 100,
    (index * 29 + yOffset) % 100,
  ]);

const generateHighDensityData = (count: number): ScatterChartData => ({
  series: [
    {
      label: 'Sensor Cluster Alpha',
      data: createDeterministicPoints(count, 7, 13),
      pointRadius: 5,
    },
    {
      label: 'Sensor Cluster Beta',
      data: createDeterministicPoints(count, 31, 47),
      pointRadius: 5,
    },
  ],
});

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
`;

const titleH2 = css`
  font-size: 1.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
  padding: 16px;
`;

const titleH3 = css`
  font-size: 1.35rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`;

const paragraph = css`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 24px;
  color: #475569;
`;

const paragraphSmall = css`
  font-size: 0.95rem;
  line-height: 1.5;
  color: #64748b;
`;

const heroBox = css`
  padding: 32px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
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
  --wci-chart-axis-text: #111827;
  --wci-chart-axis-line: #92400e;
  --wci-chart-grid: #fde68a;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #111827;
  --wci-chart-tooltip-border: #d97706;
`;

const darkChartVariables = css`
  --wci-chart-blue: #38bdf8;
  --wci-chart-teal: #a78bfa;
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
                height: 430,
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
        title="Default ECharts Scatter Chart"
        description="Default scatter chart using shared chart tokens and coordinate-based data points."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          options={{
            height: 430,
            backgroundColor: '#f8fafc',
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
        description="Override the default series and chart token colors through the Scatter Chart colors API."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          colors={{
            series: ['#2563eb', '#db2777'],
            axisText: '#334155',
            axisLine: '#64748b',
            grid: '#e2e8f0',
            tooltipBackground: '#ffffff',
            tooltipText: '#0f172a',
            tooltipBorder: '#cbd5e1',
          }}
          effect="none"
          options={{
            height: 430,
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
        title="Dataset Scatter Colors"
        description="Each scatter series can provide its own color and override the shared series palette."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={{
            series: [
              {
                ...mockData.series[0]!,
                color: '#7c3aed',
              },
              {
                ...mockData.series[1]!,
                color: '#ea580c',
              },
            ],
          }}
          effect="none"
          options={{
            height: 430,
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
        title="ECharts Scatter Crosshair"
        description="Enable the opt-in crosshair to inspect horizontal and vertical values across the scatter plot."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="staggered-reveal"
          options={{
            height: 430,
            crosshair: true,
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
        description="Customize the ECharts tooltip while preserving the Scatter Chart data model."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          options={{
            height: 430,
            tooltip: {
              trigger: 'item',
              backgroundColor: '#ffffff',
              borderColor: '#e2e8f0',
              borderWidth: 1,
              textStyle: {
                color: '#475569',
              },
              formatter: (params: unknown) => {
                const item = params as {
                  readonly seriesName?: string;
                  readonly value?: readonly [number, number];
                };

                const label = item.seriesName ?? 'Dataset';
                const point = item.value;

                return point ? `${label}<br/>X: <b>${point[0]}</b>, Y: <b>${point[1]}</b>` : label;
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
        title="Scatter Point Sizes"
        description="Configure point radius independently for each scatter series."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Point Radius
      </Typography>

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Small Points"
            description="Scatter series rendered with a smaller point radius."
            api="pointRadius: 6"
          >
            <ScatterChart
              data={{
                series: mockData.series.map((item) => ({
                  ...item,
                  pointRadius: 6,
                })),
              }}
              effect="none"
              options={{
                height: 430,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Large Points"
            description="Scatter series rendered with a larger point radius."
            api="pointRadius: 18"
          >
            <ScatterChart
              data={{
                series: mockData.series.map((item) => ({
                  ...item,
                  pointRadius: 18,
                })),
              }}
              effect="none"
              options={{
                height: 430,
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
        title="Hidden Scatter Legend"
        description="Hide the Scatter Chart legend while keeping multiple data series visible."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          options={{
            height: 430,
            showLegend: false,
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
        description="Enable bold axis labels and legend labels through Scatter Chart options."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          options={{
            height: 430,
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
        title="Scatter Data Zoom"
        description="Use ECharts inside and slider zoom controls to explore dense scatter data."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={generateHighDensityData(120)}
          effect="none"
          options={{
            height: 430,
            dataZoom: [
              {
                type: 'inside',
              },
              {
                type: 'slider',
              },
            ],
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
    description="Elastic glide animation for scatter points."
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
        title="ECharts Scatter Chart Tokens"
        description="Override the shared WCI chart CSS variables used by the Scatter Chart."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Shared Chart Tokens
      </Typography>

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Chart Tokens"
            description="Overrides the shared series, axis, grid, and tooltip chart tokens."
            api="customStyles.wrapper"
          >
            <ScatterChart
              data={mockData}
              effect="none"
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{
                height: 430,
                backgroundColor: '#fffbeb',
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Dark Surface"
            description="Shared chart tokens adapted for a dark Scatter Chart surface."
            api="customStyles.wrapper + backgroundColor"
          >
            <ScatterChart
              data={mockData}
              effect="none"
              customStyles={{
                wrapper: darkChartVariables,
              }}
              options={{
                height: 430,
                backgroundColor: '#0f172a',
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const VisualMap = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Visual Map"
        description="Use native ECharts visual map options for additional scatter point visualization."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          options={{
            height: 430,
            visualMap: {
              show: false,
              min: 0,
              max: 40,
              inRange: {
                symbolSize: [8, 34],
              },
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
        description="Override native ECharts x-axis and y-axis configuration through the options API."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={mockData}
          effect="none"
          options={{
            height: 430,
            xAxis: {
              name: 'Performance X',
              min: 0,
              max: 40,
            },
            yAxis: {
              name: 'Performance Y',
              min: 0,
              max: 50,
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const HighDensityStressTest = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="High Density Scatter Stress Test"
        description="Tests 240 deterministic points with staggered reveal, smaller points, and data zoom."
      />

      <Box customStyles={heroBox}>
        <ScatterChart
          data={generateHighDensityData(120)}
          effect="staggered-reveal"
          options={{
            height: 430,
            dataZoom: [
              {
                type: 'inside',
              },
              {
                type: 'slider',
              },
            ],
          }}
        />
      </Box>
    </div>
  </main>
);
