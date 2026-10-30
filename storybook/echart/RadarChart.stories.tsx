/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { RadarChart } from '@/components/echarts/components';
import type { RadarChartEffect } from '@/components/echarts/components/radar-chart/RadarChart.types';

const meta: Meta<typeof RadarChart> = {
  title: 'components/echarts/RadarChart',
  component: RadarChart,
};

export default meta;

const mockData = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
  series: [
    { label: 'Model X', data: [90, 70, 85, 95, 80] },
    { label: 'Model Y', data: [75, 95, 70, 80, 90] },
    { label: 'Model Z', data: [60, 80, 95, 70, 75] },
  ],
};

const extendedMockData = {
  labels: ['Performance', 'Security', 'Scalability', 'UX', 'Cost', 'Support'],
  series: [
    { label: 'Product A', data: [88, 92, 75, 84, 68, 90] },
    { label: 'Product B', data: [72, 80, 91, 78, 86, 74] },
    { label: 'Product C', data: [95, 70, 82, 88, 73, 81] },
  ],
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
  min-height: 470px;
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
  --wci-chart-axis-text: #763d6c;
  --wci-chart-axis-line: #f5456e;
  --wci-chart-grid: #fee2e2;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #0f172a;
  --wci-chart-tooltip-border: #f5456e;
`;

const darkChartVariables = css`
  --wci-chart-blue: #60a5fa;
  --wci-chart-teal: #2dd4bf;
  --wci-chart-green: #4ade80;
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
  readonly children: React.ReactNode;
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
  readonly effect: RadarChartEffect;
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
            <RadarChart
              data={mockData}
              effect={effect}
              options={{
                boldLabels: true,
                showLegend: true,
                backgroundColor: '#ffffff',
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
        title="Default ECharts Radar Chart"
        description="Default radar chart for comparing multiple values across several metrics."
      />

      <Box customStyles={heroBox}>
        <RadarChart
          chartId="default-echarts-radar"
          data={mockData}
          effect="none"
          options={{
            boldLabels: true,
            showLegend: true,
            backgroundColor: '#f8fafc',
          }}
        />
      </Box>
    </div>
  </main>
);

export const ExtendedMetrics = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Extended Metrics Radar"
        description="Radar chart with six comparison axes and three product datasets."
      />

      <Box customStyles={heroBox}>
        <RadarChart
          chartId="extended-echarts-radar"
          data={extendedMockData}
          effect="none"
          options={{
            boldLabels: true,
            showLegend: true,
            backgroundColor: '#ffffff',
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
        title="Custom Radar Colors"
        description="Customize radar series and shared chart tokens through the colors API."
      />

      <Box customStyles={heroBox}>
        <RadarChart
          chartId="custom-colors-echarts-radar"
          data={mockData}
          effect="none"
          colors={{
            series: ['#f5456e', '#3d9eff', '#59cc26'],
            axisText: '#475569',
            axisLine: '#cbd5e1',
            grid: '#e2e8f0',
            tooltipBackground: '#ffffff',
            tooltipText: '#0f172a',
            tooltipBorder: '#cbd5e1',
          }}
          options={{
            boldLabels: true,
            showLegend: true,
            backgroundColor: '#ffffff',
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
        title="ECharts Radar Crosshair"
        description="Radar chart with the optional crosshair interaction enabled."
      />

      <Box customStyles={heroBox}>
        <RadarChart
          chartId="echarts-radar-crosshair"
          data={mockData}
          effect="none"
          colors={{
            axisLine: '#763d6c',
            tooltipBackground: '#ffffff',
            tooltipText: '#0f172a',
            tooltipBorder: '#763d6c',
          }}
          options={{
            crosshair: true,
            boldLabels: true,
            boldLegends: true,
            showLegend: true,
            backgroundColor: '#ffffff',
          }}
        />
      </Box>
    </div>
  </main>
);

export const CircleRadar = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title="Circle Radar" description="Radar chart with circular split lines." />

      <Box customStyles={heroBox}>
        <RadarChart
          chartId="circle-echarts-radar"
          data={extendedMockData}
          effect="none"
          options={{
            radar: {
              shape: 'circle',
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const HiddenLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title="Hidden Labels" description="Radar chart with hidden axis names." />

      <Box customStyles={heroBox}>
        <RadarChart
          chartId="hidden-labels-echarts-radar"
          data={mockData}
          effect="none"
          options={{
            radar: {
              axisName: {
                show: false,
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const SplitAreaFill = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Split Area Fill"
        description="Radar chart with the radar split area fill enabled."
      />

      <Box customStyles={heroBox}>
        <RadarChart
          chartId="split-area-echarts-radar"
          data={mockData}
          effect="none"
          options={{
            radar: {
              splitArea: {
                show: true,
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const HiddenLegend = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Hidden Legend"
        description="Radar chart with the legend disabled through the direct Radar Chart API."
      />

      <Box customStyles={heroBox}>
        <RadarChart
          chartId="hidden-legend-echarts-radar"
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
        description="Radar chart with bold indicator labels and legend labels."
      />

      <Box customStyles={heroBox}>
        <RadarChart
          chartId="bold-labels-echarts-radar"
          data={mockData}
          effect="none"
          options={{
            boldLabels: true,
            boldLegends: true,
            showLegend: true,
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
        description="Radar chart with custom ECharts tooltip configuration."
      />

      <Box customStyles={heroBox}>
        <RadarChart
          chartId="custom-tooltip-echarts-radar"
          data={mockData}
          effect="none"
          options={{
            boldLabels: true,
            showLegend: true,
            tooltip: {
              backgroundColor: '#ffffff',
              borderColor: '#e2e8f0',
              borderWidth: 1,
              textStyle: {
                color: '#0f172a',
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectStory effect="bounce" title="Bounce Effect" description="Bounce radar animation." />
);

export const WobbleEffect = () => (
  <EffectStory effect="wobble" title="Wobble Effect" description="Wobble radar animation." />
);

export const ElasticEffect = () => (
  <EffectStory effect="elastic" title="Elastic Effect" description="Elastic radar animation." />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive radar reveal animation."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide radar animation."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered radar dataset reveal animation."
  />
);

export const CustomChartTokens = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Radar Custom Chart Tokens"
        description="Examples showing shared chart token overrides and custom chart surfaces."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Chart Tokens
      </Typography>

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Custom Chart Tokens"
            description="Overrides shared series, axis, grid, and tooltip tokens through the wrapper."
            api="customStyles.wrapper"
          >
            <RadarChart
              chartId="custom-tokens-echarts-radar"
              data={mockData}
              effect="none"
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{
                backgroundColor: '#fffbeb',
                boldLabels: true,
                showLegend: true,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Dark Surface"
            description="Radar chart rendered on a dark surface using shared chart tokens."
            api="customStyles.wrapper + options.backgroundColor"
          >
            <RadarChart
              chartId="dark-surface-echarts-radar"
              data={mockData}
              effect="none"
              customStyles={{
                wrapper: darkChartVariables,
              }}
              options={{
                backgroundColor: '#0f172a',
                boldLabels: true,
                boldLegends: true,
                showLegend: true,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
