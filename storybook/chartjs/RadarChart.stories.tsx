/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { TooltipItem } from 'chart.js';

import RadarChart from '@/components/chartjs/components/radar-chart/RadarChart';
import type { RadarChartEffect } from '@/components/chartjs/components/radar-chart/RadarChart.types';

const meta: Meta<typeof RadarChart> = {
  title: 'components/chartjs/RadarChart',
  component: RadarChart,
};

export default meta;

const mockData = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
  data: [
    { label: 'Model X', data: [90, 70, 85, 95, 80] },
    { label: 'Model Y', data: [75, 95, 70, 80, 90] },
    { label: 'Model Z', data: [60, 80, 95, 70, 75] },
  ],
};

const extendedMockData = {
  labels: ['Performance', 'Security', 'Scalability', 'UX', 'Cost', 'Support'],
  data: [
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
              {...mockData}
              effect={effect}
              options={{
                boldLabels: true,
                showLegend: true,
                chartBackground: '#ffffff',
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
        title="Default ChartJS Radar Chart"
        description="Default radar chart for comparing multiple values across several metrics."
      />
      <Box customStyles={heroBox}>
        <RadarChart
          {...mockData}
          effect="none"
          options={{
            boldLabels: true,
            showLegend: true,
            chartBackground: '#f8fafc',
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
          {...extendedMockData}
          effect="none"
          options={{
            boldLabels: true,
            showLegend: true,
            chartBackground: '#ffffff',
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
        description="Customize radar series and chart tokens through the colors API."
      />
      <Box customStyles={heroBox}>
        <RadarChart
          {...mockData}
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
            chartBackground: '#ffffff',
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
        description="Custom radar tooltip formatting and presentation."
      />
      <Box customStyles={heroBox}>
        <RadarChart
          {...mockData}
          effect="none"
          options={{
            boldLabels: true,
            showLegend: true,
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
                  label: (item: TooltipItem<'radar'>) => {
                    const datasetLabel = item.dataset.label ?? 'Dataset';

                    return `${datasetLabel}: ${item.formattedValue}%`;
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

export const CustomClickHandler = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Click Handler"
        description="Click any radar point to trigger a custom callback."
      />
      <Box customStyles={heroBox}>
        <RadarChart
          {...mockData}
          effect="none"
          options={{
            chartBackground: '#f8fafc',
            boldLabels: true,
            showLegend: true,
            onClick: (_, elements) => {
              if (!elements.length) return;

              const element = elements[0];

              if (!element) return;

              const { index, datasetIndex } = element;
              const attribute = mockData.labels[index];
              const model = mockData.data[datasetIndex]?.label;
              const value = mockData.data[datasetIndex]?.data[index];

              alert(`API Call: Detailed metrics for ${model} - ${attribute}: ${value}`);
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
    description="Progressive radar line reveal animation."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide radar reveal animation."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered radar dataset reveal animation."
  />
);

export const WithCrosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Radar Chart Crosshair"
        description="Hover over a radar point to inspect its position using the crosshair."
      />
      <Box customStyles={heroBox}>
        <RadarChart
          {...mockData}
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
            chartBackground: '#ffffff',
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

export const CustomChartTokens = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Radar Custom Chart Tokens"
        description="Override shared chart tokens through the Radar Chart wrapper."
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
              {...mockData}
              effect="none"
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{
                chartBackground: '#fffbeb',
                boldLabels: true,
                showLegend: true,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Dark Surface"
            description="Radar chart rendered on a dark surface using shared dark chart tokens."
            api="customStyles.wrapper + options.chartBackground"
          >
            <RadarChart
              {...mockData}
              effect="none"
              customStyles={{
                wrapper: darkChartVariables,
              }}
              options={{
                chartBackground: '#0f172a',
                boldLabels: true,
                showLegend: true,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
