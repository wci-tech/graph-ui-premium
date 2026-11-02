/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts/Chart';
import type { ChartData, ChartEffect, ChartOptions } from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'Components/Charts/WaterfallChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Chart>;

const financialData: ChartData = {
  labels: ['Starting Revenue', 'New Sales', 'Operating Cost', 'Marketing', 'Taxes', 'Net Profit'],
  series: [
    {
      label: 'Amount',
      data: [1000, 400, -250, -150, -100, 900],
    },
  ],
};

const subtotalData: ChartData = {
  labels: [
    'Starting Revenue',
    'Online Sales',
    'Retail Sales',
    'Gross Revenue',
    'Operating Cost',
    'Taxes',
    'Net Profit',
  ],
  series: [
    {
      label: 'Revenue Breakdown',
      data: [1000, 300, 200, 1500, -350, -150, 1000],
    },
  ],
};

const startingTotalOnlyData: ChartData = {
  labels: ['Opening Balance', 'New Business', 'Expansion', 'Refunds', 'Operating Cost'],
  series: [
    {
      label: 'Balance',
      data: [750, 200, 150, -80, -170],
    },
  ],
};

const projectData: ChartData = {
  labels: [
    'Initial Estimate',
    'Feature Expansion',
    'Design Changes',
    'Infrastructure',
    'Optimisation',
    'Final Estimate',
  ],
  series: [
    {
      label: 'Project Cost',
      data: [700, 180, 90, -80, -40, 850],
    },
  ],
};

const denseData: ChartData = {
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
  series: [
    {
      label: 'Annual Cash Flow',
      data: [1000, 240, -120, 300, -160, 280, -140, 350, -180, 1470],
    },
  ],
};

const sharedEffects: {
  effect: ChartEffect;
  title: string;
  description: string;
}[] = [
  {
    effect: 'none',
    title: 'None',
    description: 'Default rendering without an additional animation effect.',
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
    description: 'Progressively reveals the Waterfall bars.',
  },
  {
    effect: 'elastic-glide',
    title: 'Elastic Glide',
    description: 'Combines smooth movement with elastic easing.',
  },
  {
    effect: 'staggered-reveal',
    title: 'Staggered Reveal',
    description: 'Reveals Waterfall bars sequentially.',
  },
];

const pageContainer = css`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;

  ${responsive.create({
    padding: {
      default: '20px',
      md: '32px',
      lg: '40px',
    },
  })}
`;

const section = css`
  margin-top: 48px;
`;

const comparisonRow = css`
  margin-top: 32px;
`;

const chartCard = css`
  width: 100%;
  height: 100%;
  min-width: 0;
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

const chartName = css`
  display: inline-flex;
  width: fit-content;
  padding: 5px 10px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const customVariables = css`
  --wci-chart-blue: #2563eb;
  --wci-chart-teal: #0d9488;
  --wci-chart-green: #16a34a;
  --wci-chart-orange: #ea580c;
  --wci-chart-red: #dc2626;
  --wci-chart-purple: #7c3aed;
  --wci-chart-magenta: #db2777;
  --wci-chart-cyan: #0891b2;
  --wci-chart-yellow: #ca8a04;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #64748b;
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

const SectionHeading = ({
  title,
  description,
}: {
  readonly title: string;
  readonly description: string;
}) => (
  <FlexLayout direction="column" gap="8px" fullWidth>
    <Typography variant="h2">{title}</Typography>
    <Typography variant="p">{description}</Typography>
  </FlexLayout>
);

const ChartCard = ({
  chart,
  description,
  children,
}: {
  readonly chart: 'Chart 1' | 'Chart 2';
  readonly description: string;
  readonly children: ReactNode;
}) => (
  <Box customStyles={chartCard}>
    <FlexLayout direction="column" gap="16px" fullWidth>
      <Typography variant="span" customStyles={chartName}>
        {chart}
      </Typography>
      <Typography variant="p">{description}</Typography>
      {children}
    </FlexLayout>
  </Box>
);

const ComparisonGrid = ({ children }: { readonly children: ReactNode }) => (
  <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap" fullWidth>
    {children}
  </FlexLayout>
);

const ComparisonItem = ({ children }: { readonly children: ReactNode }) => (
  <FlexItem columnSpan={{ default: 12, lg: 6 }}>{children}</FlexItem>
);

const EngineComparison = ({
  data = financialData,
  effect = 'none',
  options,
}: {
  readonly data?: ChartData;
  readonly effect?: ChartEffect;
  readonly options?: ChartOptions;
}) => {
  const chartProps = {
    type: 'waterfall' as const,
    data,
    effect,
    ...(options ? { options } : {}),
  };

  return (
    <ComparisonGrid>
      <ComparisonItem>
        <ChartCard
          chart="Chart 1"
          description="ChartJS Waterfall using the shared Chart component."
        >
          <div css={comparisonChart}>
            <Chart {...chartProps} engine="chart-1" />
          </div>
        </ChartCard>
      </ComparisonItem>
      <ComparisonItem>
        <ChartCard
          chart="Chart 2"
          description="ECharts Waterfall using the same shared data and options."
        >
          <div css={comparisonChart}>
            <Chart {...chartProps} engine="chart-2" />
          </div>
        </ChartCard>
      </ComparisonItem>
    </ComparisonGrid>
  );
};

export const Default: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Chart"
          description="Compare ChartJS and ECharts Waterfall implementations using the same shared Chart API."
        />
        <section css={section}>
          <SectionHeading
            title="Default Rendering"
            description="Both engines receive identical financial data and total indices."
          />
          <div css={comparisonRow}>
            <EngineComparison
              effect="none"
              options={{
                totalIndices: [0, 5],
                showDataLabels: true,
              }}
            />
          </div>
        </section>
      </div>
    </main>
  ),
};

export const AutoEngine: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Automatic Engine"
          description="Waterfall Chart rendered using the default auto engine resolution."
        />
        <div css={[section, chartContainer]}>
          <Chart
            type="waterfall"
            engine="auto"
            data={financialData}
            effect="progressive-trace"
            options={{
              totalIndices: [0, 5],
              showDataLabels: true,
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
          description="ChartJS and ECharts render the same financial Waterfall configuration."
        />
        <section css={section}>
          <EngineComparison
            effect="progressive-trace"
            options={{
              totalIndices: [0, 5],
              showDataLabels: true,
              boldLabels: true,
            }}
          />
        </section>
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
          description="Comparison of all shared Waterfall effects across ChartJS and ECharts."
        />
        {sharedEffects.map(({ effect, title, description }) => (
          <section key={effect} css={section}>
            <SectionHeading title={title} description={description} />
            <div css={comparisonRow}>
              <EngineComparison
                effect={effect}
                options={{
                  totalIndices: [0, 5],
                  showDataLabels: true,
                }}
              />
            </div>
          </section>
        ))}
      </div>
    </main>
  ),
};

export const DataScenarios: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Data Scenarios"
          description="Different Waterfall data structures rendered through the same shared Chart API."
        />
        <section css={section}>
          <SectionHeading
            title="Intermediate Subtotal"
            description="The opening value, gross revenue, and final value are treated as totals."
          />
          <div css={comparisonRow}>
            <EngineComparison
              data={subtotalData}
              effect="progressive-trace"
              options={{
                totalIndices: [0, 3, 6],
                showDataLabels: true,
              }}
            />
          </div>
        </section>
        <section css={section}>
          <SectionHeading
            title="Starting Total Only"
            description="Only the opening balance is interpreted as an absolute total."
          />
          <div css={comparisonRow}>
            <EngineComparison
              data={startingTotalOnlyData}
              effect="elastic"
              options={{
                totalIndices: [0],
                showDataLabels: true,
              }}
            />
          </div>
        </section>
        <section css={section}>
          <SectionHeading
            title="Project Cost"
            description="Shows positive project additions and negative optimisation changes."
          />
          <div css={comparisonRow}>
            <EngineComparison
              data={projectData}
              effect="bounce"
              options={{
                totalIndices: [0, 5],
                showDataLabels: true,
              }}
            />
          </div>
        </section>
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
          description="Compare visible, hidden, and bold Waterfall value labels."
        />
        <section css={section}>
          <SectionHeading
            title="Visible Labels"
            description="Displays values above each visible Waterfall bar."
          />
          <div css={comparisonRow}>
            <EngineComparison
              options={{
                totalIndices: [0, 5],
                showDataLabels: true,
              }}
            />
          </div>
        </section>
        <section css={section}>
          <SectionHeading
            title="Bold Labels"
            description="Displays Waterfall labels using bold typography."
          />
          <div css={comparisonRow}>
            <EngineComparison
              options={{
                totalIndices: [0, 5],
                showDataLabels: true,
                boldLabels: true,
              }}
            />
          </div>
        </section>
        <section css={section}>
          <SectionHeading
            title="Hidden Labels"
            description="Hides values from the visible Waterfall bars."
          />
          <div css={comparisonRow}>
            <EngineComparison
              options={{
                totalIndices: [0, 5],
                showDataLabels: false,
              }}
            />
          </div>
        </section>
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
          description="Total indices identify values that represent absolute totals instead of relative changes."
        />
        <section css={section}>
          <SectionHeading
            title="Opening and Closing Totals"
            description="The first and final values are interpreted as totals."
          />
          <div css={comparisonRow}>
            <EngineComparison
              options={{
                totalIndices: [0, 5],
                showDataLabels: true,
              }}
            />
          </div>
        </section>
        <section css={section}>
          <SectionHeading
            title="Intermediate Subtotal"
            description="Adds an intermediate total at Gross Revenue."
          />
          <div css={comparisonRow}>
            <EngineComparison
              data={subtotalData}
              options={{
                totalIndices: [0, 3, 6],
                showDataLabels: true,
              }}
            />
          </div>
        </section>
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
          description="Compare wider and narrower Waterfall bars across both chart engines."
        />
        <section css={section}>
          <SectionHeading
            title="Wide Bars"
            description="Both engines use a 52px Waterfall bar width."
          />
          <div css={comparisonRow}>
            <EngineComparison
              options={{
                totalIndices: [0, 5],
                barWidth: 52,
              }}
            />
          </div>
        </section>
        <section css={section}>
          <SectionHeading
            title="Narrow Bars"
            description="Both engines use a 32px Waterfall bar width."
          />
          <div css={comparisonRow}>
            <EngineComparison
              options={{
                totalIndices: [0, 5],
                barWidth: 32,
              }}
            />
          </div>
        </section>
      </div>
    </main>
  ),
};

export const Legend: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Legend"
          description="Compare visible, bold, and hidden Waterfall legends."
        />
        <section css={section}>
          <SectionHeading
            title="Visible Legend"
            description="Displays the Waterfall legend in both chart engines."
          />
          <div css={comparisonRow}>
            <EngineComparison
              options={{
                totalIndices: [0, 5],
                showLegend: true,
              }}
            />
          </div>
        </section>
        <section css={section}>
          <SectionHeading
            title="Bold Legend"
            description="Displays the legend using bold typography."
          />
          <div css={comparisonRow}>
            <EngineComparison
              options={{
                totalIndices: [0, 5],
                showLegend: true,
                boldLegends: true,
              }}
            />
          </div>
        </section>
        <section css={section}>
          <SectionHeading
            title="Hidden Legend"
            description="Explicitly disables the Waterfall legend."
          />
          <div css={comparisonRow}>
            <EngineComparison
              options={{
                totalIndices: [0, 5],
                showLegend: false,
              }}
            />
          </div>
        </section>
      </div>
    </main>
  ),
};

export const Crosshair: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Crosshair"
          description="Crosshair inspection is disabled by default and enabled only when options.crosshair is true."
        />
        <section css={section}>
          <SectionHeading
            title="Crosshair Disabled"
            description="Default Waterfall behavior without crosshair inspection."
          />
          <div css={comparisonRow}>
            <EngineComparison
              options={{
                totalIndices: [0, 5],
                crosshair: false,
              }}
            />
          </div>
        </section>
        <section css={section}>
          <SectionHeading
            title="Crosshair Enabled"
            description="Enables Waterfall crosshair inspection in both chart engines."
          />
          <div css={comparisonRow}>
            <EngineComparison
              options={{
                totalIndices: [0, 5],
                crosshair: true,
                boldLabels: true,
              }}
            />
          </div>
        </section>
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
          description="A ten-category Waterfall demonstrates dense labels and smaller bars."
        />
        <section css={section}>
          <EngineComparison
            data={denseData}
            effect="staggered-reveal"
            options={{
              totalIndices: [0, 9],
              showDataLabels: true,
              boldLabels: true,
              height: 540,
              barWidth: 32,
            }}
          />
        </section>
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
          description="Both chart engines use the shared chart palette and semantic chart tokens."
        />
        <section css={section}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chart="Chart 1"
                description="ChartJS using colors provided through the shared colors API."
              >
                <div css={comparisonChart}>
                  <Chart
                    type="waterfall"
                    engine="chart-1"
                    data={financialData}
                    effect="progressive-trace"
                    colors={{
                      series: ['#16a34a', '#dc2626', '#7c3aed'],
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
                      boldLabels: true,
                    }}
                  />
                </div>
              </ChartCard>
            </ComparisonItem>
            <ComparisonItem>
              <ChartCard
                chart="Chart 2"
                description="ECharts using the same colors provided through the shared colors API."
              >
                <div css={comparisonChart}>
                  <Chart
                    type="waterfall"
                    engine="chart-2"
                    data={financialData}
                    effect="progressive-trace"
                    colors={{
                      series: ['#16a34a', '#dc2626', '#7c3aed'],
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
                      boldLabels: true,
                    }}
                  />
                </div>
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  ),
};

export const SharedCssVariables: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Waterfall Shared CSS Variables"
          description="Both engines resolve colors from the same shared --wci-chart-* CSS variables."
        />
        <section css={section}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chart="Chart 1"
                description="ChartJS resolving the custom shared chart variables."
              >
                <div css={[comparisonChart, customVariables]}>
                  <Chart
                    type="waterfall"
                    engine="chart-1"
                    data={financialData}
                    effect="progressive-trace"
                    options={{
                      totalIndices: [0, 5],
                      showDataLabels: true,
                      boldLabels: true,
                    }}
                  />
                </div>
              </ChartCard>
            </ComparisonItem>
            <ComparisonItem>
              <ChartCard
                chart="Chart 2"
                description="ECharts resolving the same custom shared chart variables."
              >
                <div css={[comparisonChart, customVariables]}>
                  <Chart
                    type="waterfall"
                    engine="chart-2"
                    data={financialData}
                    effect="progressive-trace"
                    options={{
                      totalIndices: [0, 5],
                      showDataLabels: true,
                      boldLabels: true,
                    }}
                  />
                </div>
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
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
          description="Both Waterfall engines render inside equal 750px containers."
        />
        <section css={section}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard chart="Chart 1" description="ChartJS with a custom container height.">
                <div
                  css={css`
                    width: 100%;
                    height: 750px;
                  `}
                >
                  <Chart
                    type="waterfall"
                    engine="chart-1"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                    }}
                  />
                </div>
              </ChartCard>
            </ComparisonItem>
            <ComparisonItem>
              <ChartCard
                chart="Chart 2"
                description="ECharts with the same custom container height."
              >
                <div
                  css={css`
                    width: 100%;
                    height: 750px;
                  `}
                >
                  <Chart
                    type="waterfall"
                    engine="chart-2"
                    data={financialData}
                    effect="none"
                    options={{
                      totalIndices: [0, 5],
                    }}
                  />
                </div>
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  ),
};
