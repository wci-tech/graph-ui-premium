/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import { LineChart } from '@/components/echarts/components';
import type {
  LineChartAppearance,
  LineChartData,
  LineChartEffect,
} from '@/components/echarts/components/line-chart/LineChart.types';

const meta: Meta<typeof LineChart> = {
  title: 'Components/ECharts/LineChart',
  component: LineChart,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LineChart>;

const mockData: LineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  series: [
    {
      label: 'Market Share',
      data: [150, 230, 224, 218, 135, 147, 260],
    },
  ],
};

const multiSeriesData: LineChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    {
      label: 'Revenue',
      data: [400, 600, 500, 900],
    },
    {
      label: 'Expenses',
      data: [300, 400, 450, 500],
    },
  ],
};

const threeSeriesData: LineChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    {
      label: 'Revenue',
      data: [400, 600, 500, 900],
    },
    {
      label: 'Expenses',
      data: [300, 400, 450, 500],
    },
    {
      label: 'Profit',
      data: [100, 200, 50, 400],
    },
  ],
};

const denseData: LineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    {
      label: 'Revenue',
      data: [320, 420, 380, 510, 490, 620, 590, 700, 680, 790, 760, 880],
    },
    {
      label: 'Expenses',
      data: [240, 280, 300, 330, 350, 390, 410, 430, 450, 470, 490, 510],
    },
  ],
};

const appearances: LineChartAppearance[] = ['solid', 'smooth', 'dashed', 'dotted', 'stepped'];

const effects: {
  effect: LineChartEffect;
  title: string;
  description: string;
}[] = [
  {
    effect: 'none',
    title: 'None',
    description: 'Default ECharts rendering without an additional animation effect.',
  },
  {
    effect: 'bounce',
    title: 'Bounce',
    description: 'Adds a stronger animated entrance to the Line Chart.',
  },
  {
    effect: 'wobble',
    title: 'Wobble',
    description: 'Adds a subtle back-and-forth entrance motion.',
  },
  {
    effect: 'elastic',
    title: 'Elastic',
    description: 'Adds a spring-like entrance while keeping focus on the line movement.',
  },
  {
    effect: 'progressive-trace',
    title: 'Progressive Trace',
    description: 'Progressively reveals the chart path for trend storytelling.',
  },
  {
    effect: 'elastic-glide',
    title: 'Elastic Glide',
    description: 'Combines a smooth transition with elastic motion.',
  },
  {
    effect: 'staggered-reveal',
    title: 'Staggered Reveal',
    description: 'Reveals plotted points progressively using staggered timing.',
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
    description={`ECharts Line Chart rendered using the ${appearance} appearance.`}
    api={`appearance="${appearance}"`}
  >
    <LineChart data={mockData} appearance={appearance} effect="none" />
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
    <LineChart data={mockData} appearance="smooth" effect={effect} />
  </ChartCard>
);

export const Default: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="ECharts Line Chart"
          description="Default ECharts Line Chart using the shared chart palette and semantic color tokens."
        />
        <div css={[section, chartContainer]}>
          <LineChart data={mockData} appearance="solid" effect="none" />
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
          description="Multiple Line Chart series automatically consume colors from the shared chart palette."
        />
        <div css={[section, chartContainer]}>
          <LineChart
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
          description="All supported ECharts Line Chart appearance configurations."
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
          description="All shared ECharts animation effects supported by the Line Chart."
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
          description="Examples of visible, hidden, and bold ECharts legends."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Visible Legend"
                description="Displays the series legend above the Line Chart."
                api="showLegend: true"
              >
                <LineChart
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
                description="Explicitly disables the series legend."
                api="showLegend: false"
              >
                <LineChart
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
        <PageIntro
          title="Line Chart Labels"
          description="Compare standard and bold ECharts axis labels."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Standard Labels"
                description="Uses the default axis label typography."
                api="boldLabels: false"
              >
                <LineChart
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
                description="Displays crosshair inspection lines while interacting with the chart."
                api="crosshair: true"
              >
                <LineChart
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

export const Colors: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Colors"
          description="Override the shared series palette and semantic ECharts colors through the colors API."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Shared Palette"
                description="Series automatically consume colors from the shared chart palette."
              >
                <LineChart
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
                description="Overrides series and semantic chart colors using the colors prop."
                api="colors"
              >
                <LineChart
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

export const SeriesColors: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Series Colors"
          description="Individual series can override their palette colors through color and pointColor."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            data={{
              labels: ['Q1', 'Q2', 'Q3', 'Q4'],
              series: [
                {
                  label: 'Revenue',
                  data: [400, 600, 500, 900],
                  color: '#7c3aed',
                  pointColor: '#9333ea',
                },
                {
                  label: 'Expenses',
                  data: [300, 400, 450, 500],
                  color: '#0d9488',
                  pointColor: '#14b8a6',
                },
              ],
            }}
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

export const CssVariableSeriesColors: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="CSS Variable Series Colors"
          description="Series color and pointColor can reference shared CSS variables."
        />
        <div css={[section, customChartVariables, chartContainer]}>
          <LineChart
            data={{
              labels: ['Q1', 'Q2', 'Q3', 'Q4'],
              series: [
                {
                  label: 'Revenue',
                  data: [400, 600, 500, 900],
                  color: 'var(--wci-chart-purple)',
                  pointColor: 'var(--wci-chart-magenta)',
                },
                {
                  label: 'Expenses',
                  data: [300, 400, 450, 500],
                  color: 'var(--wci-chart-teal)',
                  pointColor: 'var(--wci-chart-green)',
                },
              ],
            }}
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

export const PointRadius: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Point Radius"
          description="Customize the symbol size independently for each Line Chart series."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Small Points"
                description="Uses smaller data point symbols."
                api="pointRadius: 3"
              >
                <LineChart
                  data={{
                    ...mockData,
                    series: [
                      {
                        ...mockData.series[0]!,
                        pointRadius: 3,
                      },
                    ],
                  }}
                  appearance="smooth"
                  effect="none"
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Large Points"
                description="Uses larger data point symbols."
                api="pointRadius: 10"
              >
                <LineChart
                  data={{
                    ...mockData,
                    series: [
                      {
                        ...mockData.series[0]!,
                        pointRadius: 10,
                      },
                    ],
                  }}
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
          title="Line Chart Width"
          description="Customize the line width independently for each series."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Thin Line"
                description="Uses a thin line for the series."
                api="borderWidth: 1"
              >
                <LineChart
                  data={{
                    ...mockData,
                    series: [
                      {
                        ...mockData.series[0]!,
                        borderWidth: 1,
                      },
                    ],
                  }}
                  appearance="smooth"
                  effect="none"
                />
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Thick Line"
                description="Uses a stronger line width."
                api="borderWidth: 6"
              >
                <LineChart
                  data={{
                    ...mockData,
                    series: [
                      {
                        ...mockData.series[0]!,
                        borderWidth: 6,
                      },
                    ],
                  }}
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
          title="Shared Chart CSS Variables"
          description="Overrides the common --wci-chart-* variables used by the new ECharts Line Chart architecture."
        />
        <div css={[section, customChartVariables, chartContainer]}>
          <LineChart
            data={multiSeriesData}
            appearance="smooth"
            effect="progressive-trace"
            options={{
              showLegend: true,
              boldLabels: true,
              boldLegends: true,
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
          title="Custom Tooltip"
          description="Native ECharts tooltip options can override the generated Line Chart tooltip configuration."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            data={multiSeriesData}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
              tooltip: {
                trigger: 'axis',
                extraCssText: 'border-radius: 10px; padding: 12px;',
                formatter: (params: unknown) => {
                  const items = Array.isArray(params) ? params : [params];
                  const firstItem = items[0] as
                    | {
                        axisValueLabel?: string;
                        axisValue?: string;
                      }
                    | undefined;
                  const title = firstItem?.axisValueLabel ?? firstItem?.axisValue ?? '';
                  const rows = items
                    .map((item) => {
                      const point = item as {
                        marker?: string;
                        seriesName?: string;
                        value?: number;
                      };
                      return `${point.marker ?? ''}${point.seriesName ?? 'Value'}: ${
                        point.value ?? ''
                      }`;
                    })
                    .join('<br />');
                  return `<strong>${title}</strong><br />${rows}`;
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
          title="Right Y-Axis"
          description="Moves the y-axis to the right using the native ECharts yAxis position option."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            data={mockData}
            appearance="stepped"
            effect="none"
            options={{
              yAxis: {
                position: 'right',
              },
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const DataZoom: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Data Zoom"
          description="Native ECharts inside and slider zoom controls."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            data={denseData}
            appearance="smooth"
            effect="staggered-reveal"
            options={{
              showLegend: true,
              dataZoom: [
                {
                  type: 'inside',
                },
                {
                  type: 'slider',
                },
              ],
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const CustomAxis: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Custom Line Chart Axis"
          description="Native ECharts axis options can extend the generated Line Chart configuration."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            data={multiSeriesData}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
              yAxis: {
                min: 200,
                max: 1000,
                axisLabel: {
                  formatter: '${value}',
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
          title="Custom Series Options"
          description="Native ECharts series options are merged by index without replacing the generated Line Chart series."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            data={multiSeriesData}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
              series: [
                {
                  symbol: 'diamond',
                  symbolSize: 12,
                },
                {
                  symbol: 'rect',
                  symbolSize: 10,
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
          title="Custom ECharts Animation"
          description="Native ECharts animation settings can override the generated animation configuration."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            data={multiSeriesData}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
              animationDuration: 3000,
              animationEasing: 'elasticOut',
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
          description="Twelve months of multi-series data rendered with the shared palette."
        />
        <div css={[section, chartContainer]}>
          <LineChart
            data={denseData}
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

export const DownloadHidden: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Without Download"
          description="Hides the standard ECharts download control."
        />
        <div css={[section, chartContainer]}>
          <LineChart
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
          title="Download Placement"
          description="Changes the position of the standard ECharts download control."
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
