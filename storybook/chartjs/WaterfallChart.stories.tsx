/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent, TooltipItem } from 'chart.js';

import { WaterfallChart } from '@/components/chartjs/components';
import type { WaterfallChartEffect } from '@/components/chartjs/components/waterfall-chart/WaterfallChart.types';

const meta: Meta<typeof WaterfallChart> = {
  title: 'Components/ChartJS/WaterfallChart',
  component: WaterfallChart,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WaterfallChart>;

const financialData = {
  labels: ['Starting Revenue', 'New Sales', 'Operating Cost', 'Marketing', 'Taxes', 'Net Profit'],
  data: [1000, 400, -250, -150, -100, 900],
};

const subtotalData = {
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

const denseData = {
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

const startingTotalOnlyData = {
  labels: ['Opening Balance', 'New Business', 'Expansion', 'Refunds', 'Operating Cost'],
  data: [750, 200, 150, -80, -170],
};

const effects: {
  effect: WaterfallChartEffect;
  title: string;
  description: string;
}[] = [
  {
    effect: 'none',
    title: 'None',
    description: 'Default waterfall rendering without an additional effect.',
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
    description: 'Progressively reveals the waterfall bars.',
  },
  {
    effect: 'elastic-glide',
    title: 'Elastic Glide',
    description: 'Combines smooth movement with elastic easing.',
  },
  {
    effect: 'staggered-reveal',
    title: 'Staggered Reveal',
    description: 'Reveals waterfall bars with staggered timing.',
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

const titleH1 = css`
  margin-bottom: 16px;
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH3 = css`
  margin-bottom: 8px;
  font-size: 1.35rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const chartCard = css`
  width: 100%;
  height: 100%;
  padding: 24px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 14px;
`;

const chartShell = css`
  width: 100%;
  height: 500px;
  margin-top: 16px;
`;

const largeChartShell = css`
  width: 100%;
  height: 650px;
  margin-top: 16px;
`;

const codePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 999px;
  font-family: monospace;
  font-size: 12px;
`;

const customChartVariables = css`
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
  --wci-chart-axis-line: #64748b;
  --wci-chart-grid: #cbd5e1;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #0f172a;
  --wci-chart-tooltip-border: #94a3b8;
`;

const softChartVariables = css`
  --wci-chart-blue: #c4b5fd;
  --wci-chart-teal: #99f6e4;
  --wci-chart-green: #86efac;
  --wci-chart-orange: #fed7aa;
  --wci-chart-red: #fda4af;
  --wci-chart-purple: #ddd6fe;
  --wci-chart-magenta: #fbcfe8;
  --wci-chart-cyan: #a5f3fc;
  --wci-chart-yellow: #fde68a;
  --wci-chart-axis-text: #64748b;
  --wci-chart-axis-line: #94a3b8;
  --wci-chart-grid: #e2e8f0;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #334155;
  --wci-chart-tooltip-border: #cbd5e1;
`;

const darkChartVariables = css`
  --wci-chart-blue: #a78bfa;
  --wci-chart-teal: #2dd4bf;
  --wci-chart-green: #34d399;
  --wci-chart-orange: #fb923c;
  --wci-chart-red: #fb7185;
  --wci-chart-purple: #c084fc;
  --wci-chart-magenta: #f472b6;
  --wci-chart-cyan: #22d3ee;
  --wci-chart-yellow: #fbbf24;
  --wci-chart-axis-text: #f8fafc;
  --wci-chart-axis-line: #475569;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #020617;
  --wci-chart-tooltip-text: #ffffff;
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
  large = false,
  children,
}: {
  readonly title: string;
  readonly description: string;
  readonly api: string;
  readonly large?: boolean;
  readonly children: ReactNode;
}) => {
  return (
    <Box customStyles={chartCard}>
      <FlexLayout direction="column" gap="12px" fullWidth>
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
        <div css={large ? largeChartShell : chartShell}>{children}</div>
      </FlexLayout>
    </Box>
  );
};

const EffectStory = ({
  effect,
  title,
  description,
}: {
  readonly effect: WaterfallChartEffect;
  readonly title: string;
  readonly description: string;
}) => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title={title} description={description} />
      <div css={[section, chartShell]}>
        <WaterfallChart
          {...financialData}
          effect={effect}
          options={{
            totalIndices: [0, 5],
          }}
        />
      </div>
    </div>
  </main>
);

export const Default: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="ChartJS Waterfall Chart"
          description="Displays positive changes, negative changes, and total values using the shared chart color system."
        />
        <div css={[section, chartShell]}>
          <WaterfallChart
            {...financialData}
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

export const WithCrosshair: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall With Crosshair"
          description="Crosshair is disabled by default and enabled only when options.crosshair is true."
        />
        <div css={[section, chartShell]}>
          <WaterfallChart
            {...financialData}
            effect="none"
            options={{
              totalIndices: [0, 5],
              crosshair: true,
            }}
          />
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
          description="All shared ChartJS animation effects supported by the Waterfall Chart."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            {effects.map(({ effect, title, description }) => (
              <FlexItem key={effect} columnSpan={{ default: 12, lg: 6 }}>
                <ChartCard title={title} description={description} api={`effect="${effect}"`}>
                  <WaterfallChart
                    {...financialData}
                    effect={effect}
                    options={{
                      totalIndices: [0, 5],
                    }}
                  />
                </ChartCard>
              </FlexItem>
            ))}
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const BounceEffect: Story = {
  render: () => (
    <EffectStory
      effect="bounce"
      title="Waterfall Bounce Effect"
      description="Bounce animation gives the waterfall bars an animated entrance."
    />
  ),
};

export const WobbleEffect: Story = {
  render: () => (
    <EffectStory
      effect="wobble"
      title="Waterfall Wobble Effect"
      description="Wobble adds subtle movement while the waterfall bars appear."
    />
  ),
};

export const ElasticEffect: Story = {
  render: () => (
    <EffectStory
      effect="elastic"
      title="Waterfall Elastic Effect"
      description="Elastic creates a spring-style waterfall entrance."
    />
  ),
};

export const ProgressiveTraceEffect: Story = {
  render: () => (
    <EffectStory
      effect="progressive-trace"
      title="Waterfall Progressive Trace Effect"
      description="Progressively reveals the waterfall bars across the chart."
    />
  ),
};

export const ElasticGlideEffect: Story = {
  render: () => (
    <EffectStory
      effect="elastic-glide"
      title="Waterfall Elastic Glide Effect"
      description="Combines smooth movement with an elastic finish."
    />
  ),
};

export const StaggeredRevealEffect: Story = {
  render: () => (
    <EffectStory
      effect="staggered-reveal"
      title="Waterfall Staggered Reveal Effect"
      description="Reveals each waterfall bar sequentially."
    />
  ),
};

export const Legends: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Legends"
          description="Examples of visible, hidden, and positioned ChartJS legends."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Legend Top"
                description="Displays the waterfall dataset legend above the chart."
                api="showLegend: true"
              >
                <WaterfallChart
                  {...financialData}
                  effect="none"
                  options={{
                    totalIndices: [0, 5],
                    showLegend: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Legend Right"
                description="Positions the waterfall legend on the right side."
                api="legend.position: right"
              >
                <WaterfallChart
                  {...financialData}
                  effect="none"
                  options={{
                    totalIndices: [0, 5],
                    showLegend: true,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Hidden Legend"
                description="Explicitly hides the legend for compact dashboard layouts."
                api="showLegend: false"
              >
                <WaterfallChart
                  {...financialData}
                  effect="none"
                  options={{
                    totalIndices: [0, 5],
                    showLegend: false,
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Bold Legend"
                description="Uses stronger typography for the legend labels."
                api="boldLegends: true"
              >
                <WaterfallChart
                  {...financialData}
                  effect="none"
                  options={{
                    totalIndices: [0, 5],
                    showLegend: true,
                    boldLegends: true,
                  }}
                />
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const BarWidth: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Bar Width"
          description="Uses the new barWidth and barMaxWidth options instead of dataset-level sizing overrides."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Fixed Width"
                description="Sets an explicit width for every waterfall bar."
                api="barWidth: 56"
              >
                <WaterfallChart
                  {...financialData}
                  effect="none"
                  options={{
                    totalIndices: [0, 5],
                    barWidth: 56,
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Maximum Width"
                description="Limits responsive waterfall bars to a maximum width."
                api="barMaxWidth: 28"
              >
                <WaterfallChart
                  {...financialData}
                  effect="none"
                  options={{
                    totalIndices: [0, 5],
                    barMaxWidth: 28,
                  }}
                />
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
          description="Controls which values are treated as absolute total or subtotal bars."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Subtotal"
                description="Starting revenue, gross revenue, and net profit are absolute total bars."
                api="totalIndices: [0, 3, 6]"
              >
                <WaterfallChart
                  {...subtotalData}
                  effect="none"
                  options={{
                    totalIndices: [0, 3, 6],
                    showDataLabels: true,
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Starting Total Only"
                description="Only the first value is absolute; remaining values are relative changes."
                api="totalIndices: [0]"
              >
                <WaterfallChart
                  {...startingTotalOnlyData}
                  effect="none"
                  options={{
                    totalIndices: [0],
                    showDataLabels: true,
                  }}
                />
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const DataLabels: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Data Labels"
          description="Controls data-label visibility and label typography."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Visible Labels"
                description="Displays waterfall values directly on the bars."
                api="showDataLabels: true"
              >
                <WaterfallChart
                  {...financialData}
                  effect="none"
                  options={{
                    totalIndices: [0, 5],
                    showDataLabels: true,
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Bold Axis Labels"
                description="Uses bold typography for axis labels."
                api="boldLabels: true"
              >
                <WaterfallChart
                  {...financialData}
                  effect="none"
                  options={{
                    totalIndices: [0, 5],
                    boldLabels: true,
                    showDataLabels: true,
                  }}
                />
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const DenseData: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Dense Data"
          description="A higher-density waterfall chart using additional monthly changes and a larger chart height."
        />
        <div css={[section, largeChartShell]}>
          <WaterfallChart
            {...denseData}
            effect="none"
            options={{
              totalIndices: [0, 9],
              height: 650,
              barMaxWidth: 40,
              showDataLabels: true,
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
          description="Overrides tooltip presentation while preserving the generated waterfall change and running-total label."
        />
        <div css={[section, chartShell]}>
          <WaterfallChart
            {...financialData}
            effect="none"
            options={{
              totalIndices: [0, 5],
              plugins: {
                tooltip: {
                  backgroundColor: '#ffffff',
                  borderColor: '#7c3aed',
                  borderWidth: 2,
                  cornerRadius: 10,
                  padding: 14,
                  titleColor: '#111827',
                  bodyColor: '#334155',
                  displayColors: false,
                  callbacks: {
                    afterLabel: (context: TooltipItem<'bar'>) =>
                      `Category index: ${context.dataIndex}`,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const ClickHandling: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Click Handling"
          description="Click a waterfall bar to trigger application or API behavior."
        />
        <div css={[section, chartShell]}>
          <WaterfallChart
            {...financialData}
            effect="none"
            options={{
              totalIndices: [0, 5],
              onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                const selectedElement = elements[0];

                if (!selectedElement) return;

                const label = financialData.labels[selectedElement.index];
                const value = financialData.data[selectedElement.index];

                alert(`API Call: Fetching breakdown for ${label}\nValue: ${value}`);
              },
            }}
          />
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
          description="Examples using the new shared colors API and common --wci-chart-* CSS variables."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Colors API"
                description="Overrides the shared palette and semantic chart colors through the colors prop."
                api="colors.series"
              >
                <WaterfallChart
                  {...financialData}
                  effect="none"
                  colors={{
                    series: ['#7c3aed', '#0d9488', '#0891b2', '#ea580c', '#e11d48', '#9333ea'],
                    axisText: '#334155',
                    axisLine: '#64748b',
                    grid: '#cbd5e1',
                    tooltipBackground: '#ffffff',
                    tooltipText: '#0f172a',
                    tooltipBorder: '#94a3b8',
                  }}
                  options={{
                    totalIndices: [0, 5],
                    showDataLabels: true,
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Shared CSS Variables"
                description="Overrides the common chart variables consumed by the Waterfall component."
                api="--wci-chart-*"
              >
                <div css={customChartVariables}>
                  <WaterfallChart
                    {...financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                      showDataLabels: true,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Soft Palette"
                description="Uses a softer shared palette without Waterfall-specific variables."
                api="--wci-chart-*"
              >
                <div css={softChartVariables}>
                  <WaterfallChart
                    {...financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                      showDataLabels: true,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Dark Surface"
                description="Uses shared dark chart variables with a dark drawing surface."
                api="chartBackground + --wci-chart-*"
              >
                <div css={darkChartVariables}>
                  <WaterfallChart
                    {...financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                      chartBackground: '#0f172a',
                      boldLabels: true,
                      showDataLabels: true,
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

export const CustomChartOptions: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Custom ChartJS Options"
          description="Standard ChartJS options are merged with the generated Waterfall configuration."
        />
        <div css={[section, chartShell]}>
          <WaterfallChart
            {...financialData}
            effect="none"
            options={{
              totalIndices: [0, 5],
              boldLabels: true,
              showDataLabels: true,
              layout: {
                padding: {
                  top: 12,
                  right: 20,
                  bottom: 24,
                  left: 12,
                },
              },
              scales: {
                x: {
                  offset: true,
                  ticks: {
                    padding: 12,
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    padding: 8,
                  },
                },
              },
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
          description="Renders the Waterfall Chart inside a larger 650px chart area."
        />
        <div css={[section, largeChartShell]}>
          <WaterfallChart
            {...financialData}
            effect="none"
            options={{
              totalIndices: [0, 5],
              height: 650,
              showDataLabels: true,
            }}
          />
        </div>
      </div>
    </main>
  ),
};
