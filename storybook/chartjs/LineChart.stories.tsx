/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';
import type { TooltipItem } from 'chart.js';

import LineChart from '@/components/chartjs/components/line-chart/LineChart';
import type {
  LineChartAppearance,
  LineChartDataset,
  LineChartEffect,
} from '@/components/chartjs/components/line-chart/LineChart.types';

const meta: Meta<typeof LineChart> = {
  title: 'Components/ChartJS/LineChart',
  component: LineChart,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LineChart>;

const mockLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const mockData: LineChartDataset[] = [
  {
    label: 'Performance Metrics',
    data: [30, 45, 35, 60, 50, 80, 72],
  },
];

const multiSeriesData: LineChartDataset[] = [
  {
    label: 'Revenue',
    data: [400, 600, 500, 900, 760, 980, 870],
  },
  {
    label: 'Expenses',
    data: [300, 400, 450, 500, 540, 610, 590],
  },
];

const threeSeriesData: LineChartDataset[] = [
  {
    label: 'Revenue',
    data: [400, 600, 500, 900, 760, 980, 870],
  },
  {
    label: 'Expenses',
    data: [300, 400, 450, 500, 540, 610, 590],
  },
  {
    label: 'Profit',
    data: [100, 200, 50, 400, 220, 370, 280],
  },
];

const denseLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const denseData: LineChartDataset[] = [
  {
    label: 'Monthly Revenue',
    data: [320, 420, 380, 510, 490, 620, 590, 700, 680, 790, 760, 880],
  },
  {
    label: 'Monthly Expenses',
    data: [240, 280, 300, 330, 350, 390, 410, 430, 450, 470, 490, 510],
  },
];

const appearances: LineChartAppearance[] = ['solid', 'smooth', 'dashed', 'dotted', 'stepped'];

const effects: {
  effect: LineChartEffect;
  title: string;
  description: string;
}[] = [
  {
    effect: 'none',
    title: 'None',
    description: 'Default Line Chart rendering without an additional animation effect.',
  },
  {
    effect: 'bounce',
    title: 'Bounce',
    description: 'Adds a stronger animated entrance to the Line Chart.',
  },
  {
    effect: 'wobble',
    title: 'Wobble',
    description: 'Adds a playful wobble animation while preserving chart readability.',
  },
  {
    effect: 'elastic',
    title: 'Elastic',
    description: 'Uses a spring-like animation for trend storytelling.',
  },
  {
    effect: 'progressive-trace',
    title: 'Progressive Trace',
    description: 'Progressively reveals the line path following the data sequence.',
  },
  {
    effect: 'elastic-glide',
    title: 'Elastic Glide',
    description: 'Combines smooth movement with elastic easing.',
  },
  {
    effect: 'staggered-reveal',
    title: 'Staggered Reveal',
    description: 'Reveals chart elements progressively using staggered timing.',
  },
];

const pageContainer = css`
  width: 100%;
  max-width: 1440px;
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

const codePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 5px 10px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 999px;
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
`;

const customChartVariables = css`
  --wci-chart-blue: #e11d48;
  --wci-chart-teal: #7c3aed;
  --wci-chart-green: #16a34a;
  --wci-chart-orange: #f97316;
  --wci-chart-red: #dc2626;
  --wci-chart-purple: #9333ea;
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

const ChartCard = ({
  title,
  description,
  api,
  children,
}: {
  readonly title: string;
  readonly description: string;
  readonly api?: string;
  readonly children: ReactNode;
}) => (
  <Box customStyles={chartCard}>
    <FlexLayout direction="column" gap="16px" fullWidth>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="p">{description}</Typography>
      {api ? (
        <Typography variant="span" customStyles={codePill}>
          {api}
        </Typography>
      ) : null}
      <div css={comparisonChart}>{children}</div>
    </FlexLayout>
  </Box>
);

const AppearanceCard = ({ appearance }: { readonly appearance: LineChartAppearance }) => (
  <ChartCard
    title={`${appearance.charAt(0).toUpperCase()}${appearance.slice(1)}`}
    description={`Line Chart rendered using the ${appearance} appearance.`}
    api={`appearance="${appearance}"`}
  >
    <LineChart labels={mockLabels} data={mockData} appearance={appearance} effect="none" />
  </ChartCard>
);

const EffectCard = ({
  effect,
  title,
  description,
}: {
  readonly effect: LineChartEffect;
  readonly title: string;
  readonly description: string;
}) => (
  <ChartCard title={title} description={description} api={`effect="${effect}"`}>
    <LineChart labels={mockLabels} data={mockData} appearance="smooth" effect={effect} />
  </ChartCard>
);

export const Default: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="ChartJS Line Chart"
          description="Default Line Chart using the shared chart color system and the new ChartJS architecture."
        />
        <div css={[section, chartContainer]}>
          <LineChart labels={mockLabels} data={mockData} appearance="solid" effect="none" />
        </div>
      </div>
    </main>
  ),
};

export const MultiSeries: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Multi-Series Line Chart"
          description="Multiple datasets automatically consume colors from the shared chart palette."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            labels={mockLabels}
            data={threeSeriesData}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const Appearances: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Appearances"
          description="All supported Line Chart appearance configurations."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            {appearances.map((appearance) => (
              <FlexItem key={appearance} columnSpan={{ default: 12, lg: 6 }}>
                <AppearanceCard appearance={appearance} />
              </FlexItem>
            ))}
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
          title="Line Chart Effects"
          description="All shared ChartJS animation effects supported by the Line Chart."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            {effects.map(({ effect, title, description }) => (
              <FlexItem key={effect} columnSpan={{ default: 12, lg: 6 }}>
                <EffectCard effect={effect} title={title} description={description} />
              </FlexItem>
            ))}
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const Legend: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Legend"
          description="Examples of visible, hidden, and bold Line Chart legends."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Visible Legend"
                description="Displays the dataset legend above the chart."
                api="showLegend: true"
              >
                <LineChart
                  labels={mockLabels}
                  data={multiSeriesData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    showLegend: true,
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Bold Legend"
                description="Displays the legend using bold typography."
                api="boldLegends: true"
              >
                <LineChart
                  labels={mockLabels}
                  data={multiSeriesData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    showLegend: true,
                    boldLegends: true,
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Hidden Legend"
                description="Explicitly disables the dataset legend."
                api="showLegend: false"
              >
                <LineChart
                  labels={mockLabels}
                  data={multiSeriesData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    showLegend: false,
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

export const Labels: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro title="Line Chart Labels" description="Compare standard and bold axis labels." />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Standard Labels"
                description="Default axis label typography."
                api="boldLabels: false"
              >
                <LineChart
                  labels={mockLabels}
                  data={mockData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    boldLabels: false,
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Bold Labels"
                description="Uses bold typography for x-axis and y-axis labels."
                api="boldLabels: true"
              >
                <LineChart
                  labels={mockLabels}
                  data={mockData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    boldLabels: true,
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

export const Crosshair: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Crosshair"
          description="Crosshair is disabled by default and enabled only when options.crosshair is true."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Crosshair Disabled"
                description="Default Line Chart without crosshair inspection."
                api="crosshair: false"
              >
                <LineChart
                  labels={mockLabels}
                  data={mockData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    crosshair: false,
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Crosshair Enabled"
                description="Displays horizontal and vertical inspection lines on hover."
                api="crosshair: true"
              >
                <LineChart
                  labels={mockLabels}
                  data={mockData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    crosshair: true,
                    showLegend: true,
                    boldLabels: true,
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

export const CustomTooltip: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Custom Tooltip"
          description="Standard ChartJS tooltip options can override the generated Line Chart tooltip configuration."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            labels={mockLabels}
            data={multiSeriesData}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
              plugins: {
                tooltip: {
                  displayColors: false,
                  cornerRadius: 10,
                  padding: 12,
                  callbacks: {
                    title: (items: TooltipItem<'line'>[]) => items[0]?.label ?? '',
                    label: (item: TooltipItem<'line'>) => {
                      const dataset = item.dataset.label ?? 'Value';
                      const value = item.parsed.y;

                      return `${dataset}: ${value}`;
                    },
                    footer: () => 'Performance overview',
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

export const Colors: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Colors"
          description="Override the shared palette and semantic chart tokens using the colors API."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Default Shared Palette"
                description="Datasets automatically use the shared chart color palette."
              >
                <LineChart
                  labels={mockLabels}
                  data={threeSeriesData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    showLegend: true,
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Colors API"
                description="Overrides series and semantic chart colors through the colors prop."
                api="colors"
              >
                <LineChart
                  labels={mockLabels}
                  data={threeSeriesData}
                  appearance="smooth"
                  effect="none"
                  colors={{
                    series: ['#7c3aed', '#0d9488', '#e11d48'],
                    axisText: '#334155',
                    axisLine: '#94a3b8',
                    grid: '#cbd5e1',
                    tooltipBackground: '#ffffff',
                    tooltipText: '#0f172a',
                    tooltipBorder: '#94a3b8',
                  }}
                  options={{
                    showLegend: true,
                    boldLabels: true,
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

export const DatasetColors: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Dataset Colors"
          description="Individual datasets can override their palette color using color and pointColor."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            labels={mockLabels}
            data={[
              {
                label: 'Revenue',
                data: [400, 600, 500, 900, 760, 980, 870],
                color: '#7c3aed',
                pointColor: '#9333ea',
              },
              {
                label: 'Expenses',
                data: [300, 400, 450, 500, 540, 610, 590],
                color: '#0d9488',
                pointColor: '#14b8a6',
              },
            ]}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const DatasetAppearances: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Dataset Appearances"
          description="Each dataset can override the chart-level appearance independently."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            labels={mockLabels}
            data={[
              {
                label: 'Smooth Revenue',
                data: [400, 600, 500, 900, 760, 980, 870],
                appearance: 'smooth',
              },
              {
                label: 'Dashed Expenses',
                data: [300, 400, 450, 500, 540, 610, 590],
                appearance: 'dashed',
              },
              {
                label: 'Stepped Profit',
                data: [100, 200, 50, 400, 220, 370, 280],
                appearance: 'stepped',
              },
            ]}
            appearance="solid"
            effect="none"
            options={{
              showLegend: true,
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const PointOptions: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Point Options"
          description="Dataset-level point radius and hover radius customization."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Small Points"
                description="Uses smaller data points while retaining the standard hover interaction."
                api="pointRadius: 3"
              >
                <LineChart
                  labels={mockLabels}
                  data={[
                    {
                      label: 'Performance',
                      data: [30, 45, 35, 60, 50, 80, 72],
                      pointRadius: 3,
                      pointHoverRadius: 6,
                    },
                  ]}
                  appearance="smooth"
                  effect="none"
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Large Points"
                description="Uses larger data points and a larger hover radius."
                api="pointRadius: 8"
              >
                <LineChart
                  labels={mockLabels}
                  data={[
                    {
                      label: 'Performance',
                      data: [30, 45, 35, 60, 50, 80, 72],
                      pointRadius: 8,
                      pointHoverRadius: 12,
                    },
                  ]}
                  appearance="smooth"
                  effect="none"
                />
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const BorderWidth: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Border Width"
          description="Dataset-level line width customization."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Thin Line"
                description="Uses a thin dataset border."
                api="borderWidth: 1"
              >
                <LineChart
                  labels={mockLabels}
                  data={[
                    {
                      label: 'Performance',
                      data: [30, 45, 35, 60, 50, 80, 72],
                      borderWidth: 1,
                    },
                  ]}
                  appearance="smooth"
                  effect="none"
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Thick Line"
                description="Uses a stronger dataset border."
                api="borderWidth: 6"
              >
                <LineChart
                  labels={mockLabels}
                  data={[
                    {
                      label: 'Performance',
                      data: [30, 45, 35, 60, 50, 80, 72],
                      borderWidth: 6,
                    },
                  ]}
                  appearance="smooth"
                  effect="none"
                />
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const SharedCssVariables: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Shared CSS Variables"
          description="Overrides the common --wci-chart-* variables used by the new Line Chart architecture."
        />
        <div css={[section, customChartVariables, chartContainer]}>
          <LineChart
            labels={mockLabels}
            data={multiSeriesData}
            appearance="smooth"
            effect="progressive-trace"
            options={{
              showLegend: true,
              boldLabels: true,
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const CssVariableDatasetColors: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="CSS Variable Dataset Colors"
          description="Dataset color and pointColor can reference CSS variables and are resolved by the Line Chart."
        />
        <div css={[section, customChartVariables, chartContainer]}>
          <LineChart
            labels={mockLabels}
            data={[
              {
                label: 'Revenue',
                data: [400, 600, 500, 900, 760, 980, 870],
                color: 'var(--wci-chart-purple)',
                pointColor: 'var(--wci-chart-magenta)',
              },
              {
                label: 'Expenses',
                data: [300, 400, 450, 500, 540, 610, 590],
                color: 'var(--wci-chart-teal)',
                pointColor: 'var(--wci-chart-green)',
              },
            ]}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
            }}
          />
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
          title="Dense Line Chart"
          description="Twelve months of multi-series data rendered using the shared palette."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            labels={denseLabels}
            data={denseData}
            appearance="smooth"
            effect="staggered-reveal"
            options={{
              showLegend: true,
              boldLabels: true,
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const CustomScales: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Custom Scales"
          description="Standard ChartJS scale configuration can override generated scale options."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            labels={mockLabels}
            data={multiSeriesData}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
              scales: {
                y: {
                  beginAtZero: false,
                  suggestedMin: 200,
                  suggestedMax: 1100,
                },
              },
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const RightYAxis: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Right-Side Y Axis"
          description="Moves the generated y-axis to the right using standard ChartJS scale options."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            labels={mockLabels}
            data={mockData}
            appearance="smooth"
            effect="none"
            options={{
              boldLabels: true,
              scales: {
                y: {
                  position: 'right',
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
          title="Line Chart Custom Height"
          description="Controls the chart wrapper height using the shared options.height API."
        />
        <div css={section}>
          <LineChart
            labels={mockLabels}
            data={multiSeriesData}
            appearance="smooth"
            effect="none"
            options={{
              height: 700,
              showLegend: true,
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const BoxVisibility: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Box Visibility"
          description="Controls the Line Chart wrapper border-radius behavior through isBoxVisible."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Box Visible"
                description="Uses the default rounded chart wrapper."
                api="isBoxVisible: true"
              >
                <LineChart
                  labels={mockLabels}
                  data={mockData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    isBoxVisible: true,
                  }}
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Box Hidden"
                description="Removes the wrapper border radius."
                api="isBoxVisible: false"
              >
                <LineChart
                  labels={mockLabels}
                  data={mockData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    isBoxVisible: false,
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

export const DownloadHidden: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Without Download"
          description="Hides the standard chart download control."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            labels={mockLabels}
            data={multiSeriesData}
            appearance="smooth"
            effect="none"
            showDownload={false}
            options={{
              showLegend: true,
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const DownloadPlacement: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Download Placement"
          description="Changes the position of the standard chart download control."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Top Left"
                description="Positions the download control at the top-left."
                api='downloadPlacement="top-left"'
              >
                <LineChart
                  labels={mockLabels}
                  data={mockData}
                  appearance="smooth"
                  effect="none"
                  downloadPlacement="top-left"
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Bottom Right"
                description="Positions the download control at the bottom-right."
                api='downloadPlacement="bottom-right"'
              >
                <LineChart
                  labels={mockLabels}
                  data={mockData}
                  appearance="smooth"
                  effect="none"
                  downloadPlacement="bottom-right"
                />
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};
