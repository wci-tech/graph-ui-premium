/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { WaterfallChart } from '@/components/echarts/components';
import type {
  WaterfallChartData,
  WaterfallChartEffect,
} from '@/components/echarts/components/waterfall-chart/WaterfallChart.types';

const meta: Meta<typeof WaterfallChart> = {
  title: 'Components/ECharts/WaterfallChart',
  component: WaterfallChart,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WaterfallChart>;

const financialData: WaterfallChartData = {
  labels: ['Starting Revenue', 'New Sales', 'Operating Cost', 'Marketing', 'Taxes', 'Net Profit'],
  data: [1000, 400, -250, -150, -100, 900],
};

const subtotalData: WaterfallChartData = {
  labels: [
    'Starting Revenue',
    'Online Sales',
    'Retail Sales',
    'Gross Revenue',
    'Operating Cost',
    'Taxes',
    'Net Profit',
  ],
  data: [1000, 300, 200, 1500, -350, -150, 1000],
};

const cashFlowData: WaterfallChartData = {
  labels: [
    'Opening',
    'Jan Sales',
    'Jan Cost',
    'Feb Sales',
    'Feb Cost',
    'Mar Sales',
    'Mar Cost',
    'Apr Sales',
    'Apr Cost',
    'Closing',
  ],
  data: [1000, 240, -120, 300, -160, 280, -140, 350, -180, 1470],
};

const effects: {
  effect: WaterfallChartEffect;
  title: string;
  description: string;
}[] = [
  {
    effect: 'none',
    title: 'None',
    description: 'Default Waterfall rendering without an additional animation effect.',
  },
  {
    effect: 'bounce',
    title: 'Bounce',
    description: 'Uses the shared bounce animation effect.',
  },
  {
    effect: 'wobble',
    title: 'Wobble',
    description: 'Uses the shared wobble animation effect.',
  },
  {
    effect: 'elastic',
    title: 'Elastic',
    description: 'Uses the shared elastic animation effect.',
  },
  {
    effect: 'progressive-trace',
    title: 'Progressive Trace',
    description: 'Progressively reveals the Waterfall chart.',
  },
  {
    effect: 'elastic-glide',
    title: 'Elastic Glide',
    description: 'Combines smooth movement with elastic easing.',
  },
  {
    effect: 'staggered-reveal',
    title: 'Staggered Reveal',
    description: 'Reveals the Waterfall bars with staggered timing.',
  },
];

const pageContainer = css`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px;
`;

const section = css`
  margin-top: 40px;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 12px;
`;

const chartContainer = css`
  width: 100%;
  height: 650px;
`;

const comparisonChart = css`
  width: 100%;
  height: 500px;
`;

const customVariables = css`
  --wci-chart-blue: #7c3aed;
  --wci-chart-teal: #0d9488;
  --wci-chart-green: #0891b2;
  --wci-chart-orange: #ea580c;
  --wci-chart-red: #e11d48;
  --wci-chart-purple: #9333ea;
  --wci-chart-magenta: #db2777;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #ca8a04;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #94a3b8;
  --wci-chart-grid: #cbd5e1;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #0f172a;
  --wci-chart-tooltip-border: #94a3b8;
`;

const PageIntro = ({
  title,
  description,
}: {
  readonly title: string;
  readonly description: string;
}) => (
  <FlexLayout direction="column" gap="8px" fullWidth>
    <Typography variant="h1">{title}</Typography>
    <Typography variant="p">{description}</Typography>
  </FlexLayout>
);

const ChartCard = ({
  title,
  description,
  children,
}: {
  readonly title: string;
  readonly description: string;
  readonly children: ReactNode;
}) => (
  <Box customStyles={chartCard}>
    <FlexLayout direction="column" gap="16px" fullWidth>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="p">{description}</Typography>
      {children}
    </FlexLayout>
  </Box>
);

export const Default: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="ECharts Waterfall"
          description="Waterfall chart showing positive changes, negative changes, and total values using the shared chart color system."
        />
        <div css={[section, chartContainer]}>
          <WaterfallChart
            chartId="default-waterfall"
            data={financialData}
            effect="none"
            options={{
              totalIndices: [0, 5],
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const ChartComparison: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Chart Comparison"
          description="Comparison between a standard financial Waterfall and a Waterfall containing an intermediate subtotal."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Standard Waterfall"
                description="Shows an opening total, relative positive and negative changes, and a final total."
              >
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="standard-comparison-waterfall"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Waterfall With Subtotal"
                description="Adds an intermediate absolute subtotal before continuing with relative changes."
              >
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="subtotal-comparison-waterfall"
                    data={subtotalData}
                    effect="none"
                    options={{
                      totalIndices: [0, 3, 6],
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const Options: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Options"
          description="Examples of the main Waterfall-specific options supported by the component."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Hidden Data Labels"
                description="Hides the value labels displayed above the Waterfall bars."
              >
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="hidden-labels-waterfall"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                      showDataLabels: false,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Bold Labels"
                description="Uses bold typography for axis labels and Waterfall value labels."
              >
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="bold-labels-waterfall"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                      boldLabels: true,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard title="Visible Legend" description="Displays the Waterfall series legend.">
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="visible-legend-waterfall"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                      showLegend: true,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Bold Legend"
                description="Displays the Waterfall legend using bold typography."
              >
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="bold-legend-waterfall"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                      showLegend: true,
                      boldLegends: true,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Custom Bar Width"
                description="Changes the width and maximum width of the visible Waterfall bars."
              >
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="bar-width-waterfall"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                      barWidth: 64,
                      barMaxWidth: 64,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Crosshair"
                description="Enables the opt-in Waterfall crosshair axis pointer."
              >
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="crosshair-waterfall"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                      crosshair: true,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const TotalIndices: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Total Indices"
          description="Controls which entries are interpreted as absolute totals instead of relative changes."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Opening and Closing Totals"
                description="The first and final values are treated as absolute totals."
              >
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="opening-closing-waterfall"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Subtotal"
                description="The first, intermediate, and final values are interpreted as absolute totals."
              >
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="subtotal-waterfall"
                    data={subtotalData}
                    effect="none"
                    options={{
                      totalIndices: [0, 3, 6],
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const Effects: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Effects"
          description="All shared ECharts animation effects supported by the Waterfall Chart."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            {effects.map(({ effect, title, description }) => (
              <FlexItem key={effect} columnSpan={{ default: 12, lg: 6 }}>
                <ChartCard title={title} description={description}>
                  <div css={comparisonChart}>
                    <WaterfallChart
                      chartId={`effect-${effect}-waterfall`}
                      data={financialData}
                      effect={effect}
                      options={{
                        totalIndices: [0, 5],
                      }}
                    />
                  </div>
                </ChartCard>
              </FlexItem>
            ))}
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const Colors: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Colors"
          description="Examples using the shared colors API and common chart CSS variables."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Colors API"
                description="Overrides the shared series palette and semantic chart colors through the colors prop."
              >
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="colors-api-waterfall"
                    data={financialData}
                    effect="none"
                    colors={{
                      series: ['#7c3aed', '#0d9488', '#0891b2', '#ea580c', '#e11d48'],
                      axisText: '#334155',
                      axisLine: '#94a3b8',
                      grid: '#cbd5e1',
                      tooltipBackground: '#ffffff',
                      tooltipText: '#0f172a',
                      tooltipBorder: '#94a3b8',
                    }}
                    options={{
                      totalIndices: [0, 5],
                      boldLabels: true,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Shared CSS Variables"
                description="Overrides the common --wci-chart-* variables used by the Waterfall Chart."
              >
                <div css={[comparisonChart, customVariables]}>
                  <WaterfallChart
                    chartId="shared-css-waterfall"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                      boldLabels: true,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const LegendPositions: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Legend Positions"
          description="Examples of standard ECharts legend positioning overrides."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Top Legend"
                description="Positions the Waterfall legend above the plotting area."
              >
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="top-legend-waterfall"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                      showLegend: true,
                      legend: {
                        top: 0,
                      },
                      grid: {
                        top: '16%',
                      },
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Right Legend"
                description="Positions the Waterfall legend vertically on the right side."
              >
                <div css={comparisonChart}>
                  <WaterfallChart
                    chartId="right-legend-waterfall"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                      showLegend: true,
                      legend: {
                        orient: 'vertical',
                        right: 0,
                        top: 'middle',
                      },
                      grid: {
                        right: '16%',
                      },
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const ZoomControl: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Zoom Control"
          description="Adds inside and slider zoom controls for Waterfall charts containing many categories."
        />
        <div css={[section, chartContainer]}>
          <WaterfallChart
            chartId="zoom-waterfall"
            data={cashFlowData}
            effect="none"
            options={{
              totalIndices: [0, 9],
              dataZoom: [
                {
                  type: 'inside',
                },
                {
                  type: 'slider',
                },
              ],
              grid: {
                bottom: '18%',
              },
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const CustomTooltip: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Custom Tooltip"
          description="Overrides the generated Waterfall tooltip configuration using standard ECharts options."
        />
        <div css={[section, chartContainer]}>
          <WaterfallChart
            chartId="custom-tooltip-waterfall"
            data={financialData}
            effect="none"
            options={{
              totalIndices: [0, 5],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow',
                },
                backgroundColor: '#ffffff',
                borderColor: '#7c3aed',
                borderWidth: 2,
                padding: 14,
                textStyle: {
                  color: '#111827',
                  fontSize: 13,
                },
              },
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const CustomSeriesOptions: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Custom Series Options"
          description="Overrides the generated ECharts Waterfall series configuration."
        />
        <div css={[section, chartContainer]}>
          <WaterfallChart
            chartId="custom-series-waterfall"
            data={financialData}
            effect="none"
            options={{
              totalIndices: [0, 5],
              series: [
                {
                  id: 'waterfall-helper-series',
                  type: 'bar',
                  itemStyle: {
                    color: 'transparent',
                    borderColor: 'transparent',
                  },
                },
                {
                  id: 'waterfall-value-series',
                  type: 'bar',
                  barWidth: 56,
                  barMaxWidth: 56,
                  itemStyle: {
                    borderRadius: 8,
                  },
                  label: {
                    show: true,
                    position: 'top',
                    fontWeight: 'bold',
                  },
                },
              ],
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const CustomAnimation: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Custom Animation"
          description="Overrides the default Waterfall animation duration and easing using standard ECharts options."
        />
        <div css={[section, chartContainer]}>
          <WaterfallChart
            chartId="custom-animation-waterfall"
            data={financialData}
            effect="none"
            options={{
              totalIndices: [0, 5],
              animation: true,
              animationDuration: 2600,
              animationDurationUpdate: 1800,
              animationEasing: 'elasticOut',
              animationEasingUpdate: 'cubicInOut',
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const CustomHeight: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Custom Height"
          description="Renders the Waterfall Chart inside a larger responsive chart container."
        />
        <div
          css={[
            section,
            css`
              width: 100%;
              height: 750px;
            `,
          ]}
        >
          <WaterfallChart
            chartId="custom-height-waterfall"
            data={financialData}
            effect="none"
            options={{
              totalIndices: [0, 5],
            }}
          />
        </div>
      </div>
    </main>
  ),
};
