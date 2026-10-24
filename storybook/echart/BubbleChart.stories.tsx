/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { BubbleChart } from '@/components/echarts/components';
import type {
  BubbleChartData,
  BubbleChartEffect,
} from '@/components/echarts/components/bubble-chart/BubbleChart.types';

const meta: Meta<typeof BubbleChart> = {
  title: 'components/echarts/BubbleChart',
  component: BubbleChart,
};

export default meta;

const mockData: BubbleChartData = {
  series: [
    {
      label: 'Market Segment A',
      data: [
        [10, 80, 40],
        [20, 70, 60],
        [35, 60, 20],
        [50, 40, 80],
        [70, 90, 50],
      ],
    },
    {
      label: 'Market Segment B',
      data: [
        [15, 40, 30],
        [25, 30, 50],
        [40, 85, 40],
        [60, 20, 70],
        [80, 50, 25],
      ],
    },
  ],
};

const denseData: BubbleChartData = {
  series: [
    ...(mockData.series ?? []),
    {
      label: 'Market Segment C',
      data: [
        [12, 35, 18],
        [32, 45, 36],
        [52, 75, 54],
        [72, 30, 28],
      ],
    },
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
  color: #1e293b;
  margin-bottom: 16px;
`;

const titleH2 = css`
  font-size: 1.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
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
  min-height: 420px;
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
  --wci-chart-blue: #2563eb;
  --wci-chart-teal: #0d9488;
  --wci-chart-green: #16a34a;
  --wci-chart-orange: #ea580c;
  --wci-chart-red: #dc2626;
  --wci-chart-purple: #9333ea;
  --wci-chart-magenta: #db2777;
  --wci-chart-cyan: #0891b2;
  --wci-chart-yellow: #ca8a04;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #7c3aed;
  --wci-chart-grid: #cbd5e1;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #0f172a;
  --wci-chart-tooltip-border: #7c3aed;
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
  readonly effect: BubbleChartEffect;
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
            <BubbleChart data={mockData} effect={effect} />
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
        title="Default ECharts Bubble Chart"
        description="Default bubble chart using shared chart color tokens, numerical X/Y axes, and bubble size from the third data value."
      />
      <Box customStyles={heroBox}>
        <BubbleChart
          data={mockData}
          effect="none"
          options={{
            showLegend: true,
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
    description="Bounce entrance animation for bubble series."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble entrance animation that adds dynamic motion to bubble series."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic entrance animation that gives bubble series a spring-like motion."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressively reveals the bubble series to emphasize chart data on entry."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Combines elastic motion with a smooth transition for bubble series."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Reveals bubble data points with staggered animation timing."
  />
);

export const WithCrosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Bubble Chart With Crosshair"
        description="Cross-axis inspection is enabled when options.crosshair is true."
      />
      <Box customStyles={heroBox}>
        <BubbleChart
          chartId="bubble-chart-crosshair"
          data={mockData}
          effect="staggered-reveal"
          options={{
            crosshair: true,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
            xAxisTitle: 'Market Share (%)',
            yAxisTitle: 'Growth Rate (%)',
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
        title="ECharts Bubble Chart Custom Tooltip"
        description="Customizes tooltip behavior and layout while chart colors continue to come from the shared color system."
      />
      <Box customStyles={heroBox}>
        <BubbleChart
          chartId="bubble-chart-custom-tooltip"
          data={mockData}
          effect="staggered-reveal"
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
            tooltip: {
              trigger: 'item',
              borderWidth: 2,
              padding: 14,
              textStyle: {
                fontSize: 13,
              },
              extraCssText: 'border-radius: 10px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.14);',
            },
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
        title="ECharts Bubble Chart Custom Colors"
        description="Overrides every color exposed by the BubbleChart colors API."
      />
      <Box customStyles={heroBox}>
        <BubbleChart
          data={denseData}
          effect="none"
          colors={{
            series: ['#7c3aed', '#f97316', '#0891b2'],
            axisText: '#1e293b',
            axisLine: '#9333ea',
            grid: '#d8b4fe',
            tooltipBackground: '#faf5ff',
            tooltipText: '#581c87',
            tooltipBorder: '#7e22ce',
          }}
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
            xAxisTitle: 'Market Share (%)',
            yAxisTitle: 'Growth Rate (%)',
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Bubble Chart Custom Styles"
        description="Examples showing complete shared chart token overrides, colors API customization, chart surfaces, crosshair behavior, and bubble scaling."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Advanced Options
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Complete CSS Variable Override"
            description="Overrides the complete shared series palette together with axis, grid, and tooltip colors."
            api="customStyles.wrapper"
          >
            <BubbleChart
              data={denseData}
              effect="staggered-reveal"
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{
                showLegend: true,
                boldLabels: true,
                boldLegends: true,
                xAxisTitle: 'Market Share (%)',
                yAxisTitle: 'Growth Rate (%)',
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Complete Colors API Override"
            description="Overrides every color exposed through the BubbleChart colors prop."
            api="colors"
          >
            <BubbleChart
              data={denseData}
              effect="none"
              colors={{
                series: ['#be123c', '#0369a1', '#15803d'],
                axisText: '#312e81',
                axisLine: '#be185d',
                grid: '#fbcfe8',
                tooltipBackground: '#fff1f2',
                tooltipText: '#881337',
                tooltipBorder: '#e11d48',
              }}
              options={{
                showLegend: true,
                boldLabels: true,
                boldLegends: true,
                xAxisTitle: 'Market Share (%)',
                yAxisTitle: 'Growth Rate (%)',
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Dark Background"
            description="Bubble chart rendered on a dark ECharts surface while chart-specific colors are supplied through the colors API."
            api="options.backgroundColor"
          >
            <BubbleChart
              data={mockData}
              effect="staggered-reveal"
              colors={{
                series: ['#38bdf8', '#a78bfa'],
                axisText: '#e2e8f0',
                axisLine: '#64748b',
                grid: '#334155',
                tooltipBackground: '#1e293b',
                tooltipText: '#f8fafc',
                tooltipBorder: '#64748b',
              }}
              options={{
                backgroundColor: '#0f172a',
                showLegend: true,
                textStyle: {
                  color: '#f8fafc',
                },
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Crosshair Pointer"
            description="Enables the BubbleChart crosshair behavior with axis titles and bold labels."
            api="options.crosshair"
          >
            <BubbleChart
              data={mockData}
              effect="staggered-reveal"
              options={{
                crosshair: true,
                showLegend: true,
                boldLabels: true,
                boldLegends: true,
                xAxisTitle: 'Market Share (%)',
                yAxisTitle: 'Growth Rate (%)',
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Massive Scaling"
            description="Uses sizeMultiplier to increase bubble size while retaining the shared color system."
            api="data.sizeMultiplier"
          >
            <BubbleChart
              data={{
                ...mockData,
                sizeMultiplier: 12,
              }}
              effect="staggered-reveal"
              options={{
                showLegend: true,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
