/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import type { Meta } from '@storybook/react';
import type { ActiveElement, ChartEvent, TooltipItem } from 'chart.js';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { BarChart } from '@/components/chartjs/components';
import type { BarChartEffect } from '@/components/chartjs/components/bar-chart/BarChart.types';

const meta: Meta<typeof BarChart> = {
  title: 'components/chartjs/BarChart',
  component: BarChart,
};

export default meta;

const mockData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],

  data: [
    {
      label: 'Market Data',
      data: [1200, 1900, 3000, 5000, 4200],
    },
  ],
};

const twoSeriesData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],

  data: [
    {
      label: 'Revenue',
      data: [1200, 1900, 3000, 5000],
    },
    {
      label: 'Forecast',
      data: [1000, 1700, 2600, 4500],
    },
  ],
};

const threeSeriesData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],

  data: [
    {
      label: 'Revenue',
      data: [1200, 1900, 3000, 5000],
    },
    {
      label: 'Forecast',
      data: [1000, 1700, 2600, 4500],
    },
    {
      label: 'Expenses',
      data: [700, 950, 1600, 2100],
    },
  ],
};

const fourSeriesData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],

  data: [
    {
      label: 'Revenue',
      data: [1200, 1900, 3000, 5000],
    },
    {
      label: 'Forecast',
      data: [1000, 1700, 2600, 4500],
    },
    {
      label: 'Expenses',
      data: [700, 950, 1600, 2100],
    },
    {
      label: 'Profit',
      data: [500, 950, 1400, 2900],
    },
  ],
};

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  margin-bottom: 16px;
  color: #424242;
  font-size: 2.5rem;
  font-weight: 700;
`;

const defaultChartWrapper = css`
  min-height: 500px;
  padding-top: 32px;
  box-sizing: border-box;
  overflow: visible;
`;

const titleH2 = css`
  margin-bottom: 12px;
  padding: 16px;
  color: var(--wci-black);
  font-size: 1.875rem;
  font-weight: 600;
`;

const titleH3 = css`
  margin-bottom: 8px;
  color: var(--wci-black);
  font-size: 1.35rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  color: var(--wci-text-body);
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  color: var(--wci-text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const heroBox = css`
  padding: 32px !important;
  border: 1px solid var(--wci-border-subtle);
  border-radius: 16px;
  background: var(--wci-surface-raised);
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border: 1px solid var(--wci-border-subtle);
  border-radius: 14px;
  background: var(--wci-surface-raised);
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

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Default ChartJS Bar Chart"
        description="Bar chart using the default WCI chart palette and semantic chart color tokens."
      />

      <Box customStyles={heroBox}>
        <BarChart
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

export const Horizontal = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Horizontal ChartJS Bar Chart"
        description="Bar chart rendered horizontally while continuing to use the default WCI chart palette."
      />

      <Box customStyles={heroBox}>
        <BarChart
          {...mockData}
          effect="none"
          options={{
            horizontal: true,
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
        title="ChartJS Bar Chart Color Palette"
        description="Multiple datasets automatically receive colors from the WCI chart palette without requiring a variant."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Automatic Series Colors
      </Typography>

      <Box customStyles={heroBox}>
        <BarChart
          {...fourSeriesData}
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
        title="ChartJS Bar Chart Custom Colors"
        description="Series, axes, grid, and tooltip colors can be overridden while remaining values continue using WCI chart defaults."
      />

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Custom Chart Colors"
            description="Overrides individual series and semantic chart colors through the public BarChart color API."
            api="data[].color + colors"
          >
            <BarChart
              labels={twoSeriesData.labels}
              data={[
                {
                  ...twoSeriesData.data[0],
                  color: 'var(--wci-chart-red)',
                },
                {
                  ...twoSeriesData.data[1],
                  color: 'var(--wci-chart-purple)',
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
                boldLegends: true,
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
        <BarChart
          {...fourSeriesData}
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

export const BarWidthOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Width Options"
        description="Consumers can control bar thickness using the barWidth option."
      />

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 4 }}>
          <ChartCard
            title="Thin Bars"
            description="Compact bars for dashboards with many categories."
            api="barWidth: 14"
          >
            <BarChart
              {...mockData}
              effect="none"
              options={{
                barWidth: 14,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 4 }}>
          <ChartCard
            title="Medium Bars"
            description="Balanced width for normal dashboard layouts."
            api="barWidth: 28"
          >
            <BarChart
              {...mockData}
              effect="none"
              options={{
                barWidth: 28,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 4 }}>
          <ChartCard
            title="Wide Bars"
            description="Wider bars for smaller datasets."
            api="barWidth: 48"
          >
            <BarChart
              {...mockData}
              effect="none"
              options={{
                barWidth: 48,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const WithCrosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Bar Chart With Crosshair"
        description="Bar chart with crosshair interaction enabled for precise value inspection."
      />

      <Box customStyles={heroBox}>
        <BarChart
          {...twoSeriesData}
          effect="none"
          options={{
            crosshair: true,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
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
        title="ChartJS Bar Chart Custom Tooltip"
        description="Bar chart with semantic tooltip colors and custom ChartJS tooltip behavior."
      />

      <Box customStyles={heroBox}>
        <BarChart
          {...twoSeriesData}
          effect="none"
          colors={{
            tooltipBackground: 'var(--wci-surface-raised)',
            tooltipText: 'var(--wci-text-body)',
            tooltipBorder: 'var(--wci-chart-blue)',
          }}
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,

            interaction: {
              mode: 'index',
              intersect: false,
            },

            plugins: {
              tooltip: {
                mode: 'index',
                intersect: false,

                borderWidth: 1,
                cornerRadius: 10,
                padding: 14,

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

                footerFont: {
                  size: 13,
                  weight: 'bold',
                },

                callbacks: {
                  title: (items: TooltipItem<'bar'>[]) => items[0]?.label ?? 'Category',

                  label: (item: TooltipItem<'bar'>) => {
                    const datasetLabel = item.dataset.label ?? 'Dataset';

                    const parsedValue =
                      typeof item.parsed.y === 'number' ? item.parsed.y : item.parsed.x;

                    const value = typeof parsedValue === 'number' ? parsedValue : 0;

                    return `${datasetLabel}: ${value.toLocaleString()}`;
                  },

                  footer: (items: TooltipItem<'bar'>[]) => {
                    const total = items.reduce((sum, item) => {
                      const parsedValue =
                        typeof item.parsed.y === 'number' ? item.parsed.y : item.parsed.x;

                      const value = typeof parsedValue === 'number' ? parsedValue : 0;

                      return sum + value;
                    }, 0);

                    return `Total: ${total.toLocaleString()}`;
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

export const TwoSeriesGrouped = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Two-Series Grouped Bar Chart"
        description="Two datasets displayed side by side for each quarter using automatic WCI series colors."
      />

      <Box customStyles={heroBox}>
        <BarChart
          {...twoSeriesData}
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

export const TwoSeriesStacked = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Two-Series Stacked Bar Chart"
        description="Two datasets stacked to display their combined quarterly totals."
      />

      <Box customStyles={heroBox}>
        <BarChart
          {...twoSeriesData}
          effect="none"
          options={{
            barWidth: 42,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,

            scales: {
              x: {
                stacked: true,
              },

              y: {
                stacked: true,
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const ThreeSeriesGrouped = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Three-Series Grouped Bar Chart"
        description="Three datasets displayed side by side using automatic colors from the WCI chart palette."
      />

      <Box customStyles={heroBox}>
        <BarChart
          {...threeSeriesData}
          effect="none"
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
            categoryPercentage: 0.85,
            barPercentage: 0.9,
          }}
        />
      </Box>
    </div>
  </main>
);

export const ThreeSeriesStacked = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Three-Series Stacked Bar Chart"
        description="Three datasets stacked to show total quarterly composition using automatic WCI series colors."
      />

      <Box customStyles={heroBox}>
        <BarChart
          {...threeSeriesData}
          effect="none"
          options={{
            barWidth: 46,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,

            scales: {
              x: {
                stacked: true,
              },

              y: {
                stacked: true,
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const HorizontalGrouped = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Horizontal Grouped Bar Chart"
        description="Multiple datasets grouped in a horizontal layout using the automatic WCI chart palette."
      />

      <Box customStyles={heroBox}>
        <BarChart
          {...threeSeriesData}
          effect="none"
          options={{
            horizontal: true,
            barWidth: 18,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const HorizontalStacked = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Horizontal Stacked Bar Chart"
        description="Multiple datasets stacked in a horizontal layout using the automatic WCI chart palette."
      />

      <Box customStyles={heroBox}>
        <BarChart
          {...threeSeriesData}
          effect="none"
          options={{
            horizontal: true,
            barWidth: 42,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,

            scales: {
              x: {
                stacked: true,
              },

              y: {
                stacked: true,
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const HighDensityFourSeries = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="High-Density Four-Series Bar Chart"
        description="Four grouped datasets rendered with narrow bars and automatic WCI palette colors for dense data comparison."
      />

      <Box customStyles={heroBox}>
        <BarChart
          {...fourSeriesData}
          effect="none"
          options={{
            barWidth: 14,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
            chartBackground: 'var(--wci-surface-raised)',

            scales: {
              y: {
                position: 'right',
              },
            },
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
  readonly effect: BarChartEffect;
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
            <BarChart {...mockData} effect={effect} />
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
    description="Bounce animation gives the bar chart a playful entrance motion. Use it for dashboards where the chart needs stronger visual emphasis."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble animation creates a subtle movement while the bars appear. It is useful for highlighting refreshed data."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic animation adds spring-like motion to the bar chart for a more dynamic entrance."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive trace reveals the bars over time for sequential data storytelling."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide combines smooth movement with a spring-style finish for a premium animated entrance."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered reveal animates bars in a delayed sequence, making multi-series comparisons easier to follow."
  />
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Bar Chart Custom Styles"
        description="Examples showing color customization through the BarChart color API, structural styling, click handling, and minimalist rendering."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Behavior
      </Typography>

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Colors and Interaction"
            description="Uses the BarChart color API for chart colors while customStyles remains responsible for structural styling."
            api="colors + customStyles + options.onClick"
          >
            <BarChart
              labels={threeSeriesData.labels}
              data={[
                {
                  ...threeSeriesData.data[0],
                  color: 'var(--wci-chart-orange)',
                },
                {
                  ...threeSeriesData.data[1],
                  color: 'var(--wci-chart-purple)',
                },
                {
                  ...threeSeriesData.data[2],
                  color: 'var(--wci-chart-cyan)',
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
                barWidth: 18,
                chartBackground: 'var(--wci-surface-raised)',
                boldLabels: true,
                boldLegends: true,

                onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                  const firstElement = elements[0];

                  if (!firstElement) {
                    return;
                  }

                  const { index, datasetIndex } = firstElement;

                  const quarter = threeSeriesData.labels[index];
                  const metric = threeSeriesData.data[datasetIndex]?.label;

                  alert(`API Call: Fetching details for ${quarter} - ${metric}`);
                },
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Horizontal Right Axis No Box"
            description="Horizontal chart with a top value axis and transparent wrapper."
            api="horizontal + isBoxVisible"
          >
            <BarChart
              {...twoSeriesData}
              effect="none"
              options={{
                horizontal: true,
                isBoxVisible: false,
                barWidth: 22,

                scales: {
                  x: {
                    position: 'top',
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
