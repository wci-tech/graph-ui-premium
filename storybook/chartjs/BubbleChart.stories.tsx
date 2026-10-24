/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import { BubbleChart } from '@/components/chartjs/components';
import type {
  BubbleChartDataset,
  BubbleChartEffect,
} from '@/components/chartjs/components/bubble-chart/BubbleChart.types';

const meta: Meta<typeof BubbleChart> = {
  title: 'components/chartjs/BubbleChart',
  component: BubbleChart,
};

export default meta;

const mockData: BubbleChartDataset[] = [
  {
    label: 'Market Segment A',
    data: [
      { x: 10, y: 80, r: 18 },
      { x: 20, y: 70, r: 24 },
      { x: 35, y: 60, r: 12 },
      { x: 50, y: 40, r: 30 },
      { x: 70, y: 90, r: 22 },
    ],
  },
  {
    label: 'Market Segment B',
    data: [
      { x: 15, y: 40, r: 14 },
      { x: 25, y: 30, r: 20 },
      { x: 40, y: 85, r: 18 },
      { x: 60, y: 20, r: 26 },
      { x: 80, y: 50, r: 16 },
    ],
  },
];

const denseData: BubbleChartDataset[] = [
  ...mockData,
  {
    label: 'Market Segment C',
    data: [
      { x: 12, y: 35, r: 10 },
      { x: 32, y: 45, r: 16 },
      { x: 52, y: 75, r: 24 },
      { x: 72, y: 30, r: 18 },
    ],
  },
];

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

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Default ChartJS Bubble Chart"
        description="Default bubble chart using shared chart color tokens and the standard ChartJS rendering pipeline."
      />
      <Box customStyles={heroBox}>
        <BubbleChart data={mockData} effect="none" />
      </Box>
    </div>
  </main>
);

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

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Bounce animation gives the bubble chart a playful entrance motion."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble animation creates a subtle energetic entrance for refreshed bubble data."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic animation adds spring-like motion to the bubble chart."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive trace reveals bubbles over time for dashboard storytelling."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide adds a premium animated entrance to the bubble chart."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered reveal animates bubbles with a delayed sequence."
  />
);

export const WithCrosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Bubble Chart With Crosshair"
        description="Crosshair interaction is enabled when options.crosshair is true."
      />
      <Box customStyles={heroBox}>
        <BubbleChart
          data={mockData}
          effect="none"
          options={{
            crosshair: true,
            boldLabels: true,
            boldLegends: true,
            showLegend: true,
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
        title="ChartJS Bubble Chart Custom Tooltip"
        description="Custom tooltip displaying bubble data with custom layout and presentation options."
      />
      <Box customStyles={heroBox}>
        <BubbleChart
          data={mockData}
          effect="none"
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
            xAxisTitle: 'Market Share (%)',
            yAxisTitle: 'Growth Rate (%)',
            interaction: {
              mode: 'nearest',
              intersect: true,
            },
            plugins: {
              tooltip: {
                mode: 'nearest',
                intersect: true,
                borderWidth: 2,
                cornerRadius: 10,
                padding: 14,
                displayColors: true,
                boxPadding: 6,
                caretSize: 8,
                caretPadding: 20,
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomSeriesColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Bubble Chart Custom Colors"
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
        title="ChartJS Bubble Chart Custom Styles"
        description="Examples showing complete shared chart color token overrides, custom chart behavior, and transparent rendering."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Behavior
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Complete CSS Variable Override"
            description="Overrides the full chart palette, axis, grid, and tooltip color tokens through wrapper CSS variables."
            api="customStyles.wrapper"
          >
            <BubbleChart
              data={denseData}
              effect="none"
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{
                showLegend: true,
                boldLabels: true,
                boldLegends: true,
                xAxisTitle: 'Market Share (%)',
                yAxisTitle: 'Growth Rate (%)',
                onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                  const firstElement = elements[0];

                  if (!firstElement) {
                    return;
                  }

                  const dataset = denseData[firstElement.datasetIndex];
                  const point = dataset?.data[firstElement.index];

                  if (!dataset || !point) {
                    return;
                  }

                  alert(
                    `API Call: Fetching details for ${dataset.label}\nCoordinates: (${point.x}, ${point.y})\nRadius: ${point.r}`,
                  );
                },
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Colors API Override"
            description="Overrides every color currently exposed by BubbleChart through the colors prop."
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
            title="Right Axis No Box"
            description="Bubble chart with the y-axis on the right and the wrapper box disabled."
            api="options.scales.y.position"
          >
            <BubbleChart
              data={denseData}
              effect="none"
              options={{
                isBoxVisible: false,
                showLegend: true,
                boldLabels: true,
                scales: {
                  y: {
                    position: 'right',
                  },
                },
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
