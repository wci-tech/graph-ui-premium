/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import type { Meta } from '@storybook/react';
import type { ActiveElement, ChartEvent, TooltipItem } from 'chart.js';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { AreaChart } from '@/components/chartjs/components';
import type { AreaChartEffect } from '@/components/chartjs/components/area-chart/AreaChart.types';

const meta: Meta<typeof AreaChart> = {
  title: 'components/chartjs/AreaChart',
  component: AreaChart,
};

export default meta;

const mockData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  data: [
    {
      label: 'Revenue 2026',
      data: [30, 45, 35, 60, 55, 80],
    },
    {
      label: 'Forecast',
      data: [25, 40, 40, 50, 60, 70],
    },
  ],
};

const multiSeriesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  data: [
    {
      label: 'Revenue',
      data: [30, 45, 35, 60, 55, 80],
    },
    {
      label: 'Forecast',
      data: [25, 40, 40, 50, 60, 70],
    },
    {
      label: 'Profit',
      data: [18, 28, 32, 42, 50, 62],
    },
    {
      label: 'Expenses',
      data: [20, 25, 30, 34, 40, 45],
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
  color: #424242;
  margin-bottom: 16px;
`;

const defaultChartWrapper = css`
  min-height: 500px;
  padding-top: 32px;
  box-sizing: border-box;
  overflow: visible;
`;

const titleH2 = css`
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--wci-text-primary);
  margin-bottom: 12px;
  padding: 16px;
`;

const titleH3 = css`
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--wci-text-primary);
  margin-bottom: 8px;
`;

const paragraph = css`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 24px;
  color: var(--wci-text-body);
`;

const paragraphSmall = css`
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--wci-text-muted);
`;

const heroBox = css`
  padding: 32px !important;
  border-radius: 16px;
  background: var(--wci-surface-raised);
  border: 1px solid var(--wci-border-subtle);
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border-radius: 14px;
  background: var(--wci-surface-raised);
  border: 1px solid var(--wci-border-subtle);
  box-shadow: 0 10px 25px var(--wci-overlay-subtle);
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
  background: var(--wci-background-surface);
  color: var(--wci-text-body);
  font-family: monospace;
  font-size: 12px;
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
};

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Default ChartJS Area Chart"
        description="Area chart using the default WCI chart palette and semantic chart color tokens."
      />

      <Box customStyles={heroBox}>
        <AreaChart
          {...mockData}
          effect="none"
          showDownload={false}
          customStyles={{
            wrapper: defaultChartWrapper,
          }}
        />
      </Box>
    </div>
  </main>
);

export const Basic = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Basic ChartJS Area Chart"
        description="Area chart using straight line segments with the basic appearance and the default WCI chart palette."
      />

      <Box customStyles={heroBox}>
        <AreaChart
          {...mockData}
          appearance="basic"
          effect="none"
          options={{
            showLegend: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const ColorPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Area Chart Color Palette"
        description="Multiple datasets automatically receive colors from the WCI chart palette without requiring a variant."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Automatic Series Colors
      </Typography>

      <Box customStyles={heroBox}>
        <AreaChart
          {...multiSeriesData}
          effect="none"
          options={{
            showLegend: true,
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
        title="ChartJS Area Chart Custom Colors"
        description="Series, points, axes, grid, and tooltip colors can be overridden while the remaining values continue using WCI chart defaults."
      />

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Custom Chart Colors"
            description="Overrides individual series and semantic chart colors through the public AreaChart color API."
            api="data[].color + data[].pointColor + colors"
          >
            <AreaChart
              labels={mockData.labels}
              data={[
                {
                  ...mockData.data[0],
                  color: 'var(--wci-chart-red)',
                  pointColor: 'var(--wci-chart-red-default)',
                },
                {
                  ...mockData.data[1],
                  color: 'var(--wci-chart-purple)',
                  pointColor: 'var(--wci-chart-purple-default)',
                },
              ]}
              colors={{
                axisText: 'var(--wci-chart-axis-text)',
                axisLine: 'var(--wci-chart-axis-line)',
                grid: 'var(--wci-chart-grid)',
                tooltipBackground: 'var(--wci-chart-tooltip-background)',
                tooltipText: 'var(--wci-chart-tooltip-text)',
                tooltipBorder: 'var(--wci-chart-tooltip-border)',
              }}
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

export const CustomSeriesPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Series Palette"
        description="The complete automatic series palette can be replaced while preserving semantic axis, grid, legend, and tooltip defaults."
      />

      <Box customStyles={heroBox}>
        <AreaChart
          {...multiSeriesData}
          effect="none"
          colors={{
            series: [
              'var(--wci-chart-purple)',
              'var(--wci-chart-magenta)',
              'var(--wci-chart-cyan)',
              'var(--wci-chart-yellow)',
            ],
          }}
          options={{
            showLegend: true,
          }}
        />
      </Box>
    </div>
  </main>
);

const EffectStory = ({
  effect,
  title,
  description,
}: {
  readonly effect: AreaChartEffect;
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
            <AreaChart {...mockData} effect={effect} />
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
    description="Bounce animation gives the area chart a playful entrance motion. Use it for dashboards where the chart needs stronger visual emphasis."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble animation creates a subtle horizontal movement while the chart appears. It is useful for highlighting a refreshed dataset."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic animation adds spring-like motion to the area chart. Use it when the chart needs a more dynamic interaction feel."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive trace reveals the area chart over time, making it ideal for revenue, trend, or forecast storytelling."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide combines smooth movement with a spring-style finish for a premium animated chart entrance."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered reveal animates chart series with a delayed sequence, making multi-series comparisons easier to follow."
  />
);

export const WithCrosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Area Chart With Crosshair"
        description="Area chart with crosshair interaction enabled for precise value inspection."
      />

      <Box customStyles={heroBox}>
        <AreaChart
          {...mockData}
          effect="none"
          options={{
            crosshair: true,
            showLegend: true,
            boldLabels: true,
            chartBackground: 'var(--wci-surface-raised)',
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
        title="ChartJS Area Chart Custom Tooltip"
        description="Area chart with semantic tooltip colors and custom ChartJS tooltip behavior."
      />

      <Box customStyles={heroBox}>
        <AreaChart
          {...mockData}
          effect="none"
          colors={{
            tooltipBackground: 'var(--wci-surface-raised)',
            tooltipText: 'var(--wci-text-body)',
            tooltipBorder: 'var(--wci-chart-blue)',
          }}
          options={{
            showLegend: true,
            boldLabels: true,

            plugins: {
              tooltip: {
                borderWidth: 1,
                cornerRadius: 10,
                padding: 12,

                displayColors: true,
                caretSize: 8,
                caretPadding: 10,

                titleFont: {
                  size: 14,
                  weight: 'bold',
                },

                bodyFont: {
                  size: 13,
                },

                callbacks: {
                  label: (item: TooltipItem<'line'>) => {
                    const datasetLabel = item.dataset.label ?? 'Dataset';
                    const value = item.formattedValue;
                    const month = item.label;

                    return `${datasetLabel} in ${month}: ${value}`;
                  },

                  footer: (items: TooltipItem<'line'>[]) => {
                    const total = items.reduce((sum, item) => {
                      const value = typeof item.parsed.y === 'number' ? item.parsed.y : 0;

                      return sum + value;
                    }, 0);

                    return `Total: ${total}`;
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

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Area Chart Custom Styles"
        description="Examples showing structural customization, click handling, and minimalist stacked rendering."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Behavior
      </Typography>

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Colors and Interaction"
            description="Uses the AreaChart color API for chart colors while customStyles remains responsible for structural styling."
            api="colors + customStyles + options.onClick"
          >
            <AreaChart
              labels={mockData.labels}
              data={[
                {
                  ...mockData.data[0],
                  color: 'var(--wci-chart-orange)',
                  pointColor: 'var(--wci-chart-orange-default)',
                },
                {
                  ...mockData.data[1],
                  color: 'var(--wci-chart-purple)',
                  pointColor: 'var(--wci-chart-purple-default)',
                },
              ]}
              effect="none"
              colors={{
                axisText: 'yellow',
                axisLine: 'orange',
                grid: 'red',
                tooltipBackground: 'var(--wci-chart-tooltip-background)',
                tooltipText: 'var(--wci-chart-tooltip-text)',
                tooltipBorder: 'var(--wci-chart-tooltip-border)',
              }}
              customStyles={{
                wrapper: defaultChartWrapper,
              }}
              options={{
                chartBackground: 'var(--wci-surface-raised)',
                boldLabels: true,

                onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                  const firstElement = elements[0];

                  if (!firstElement) {
                    return;
                  }

                  const datasetIndex = firstElement.datasetIndex;
                  const index = firstElement.index;

                  const label = mockData.data[datasetIndex]?.label;
                  const month = mockData.labels[index];

                  alert(`API Call: Fetching ${label} details for ${month}`);
                },
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Minimalist Stacked View"
            description="A compact stacked chart with hidden y-axis and simplified grid rendering."
            api="options.scales"
          >
            <AreaChart
              {...mockData}
              options={{
                isBoxVisible: false,

                scales: {
                  y: {
                    stacked: true,
                    display: false,
                  },

                  x: {
                    grid: {
                      display: false,
                    },
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
