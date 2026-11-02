/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';
import type { TooltipItem } from 'chart.js';

import { Chart } from '@/charts/Chart';
import type { ChartAppearance, ChartData, ChartEffect, ChartOptions } from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'Components/Charts/LineChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Chart>;

const commonData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  series: [
    {
      label: 'Performance',
      data: [30, 45, 35, 60, 50, 80, 72],
    },
  ],
};

const multiSeriesData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  series: [
    {
      label: 'Revenue',
      data: [40, 60, 50, 90, 76, 98, 87],
    },
    {
      label: 'Expenses',
      data: [30, 40, 45, 50, 54, 61, 59],
    },
  ],
};

const threeSeriesData: ChartData = {
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

const largeData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    {
      label: 'Monthly Revenue',
      data: [
        120_000, 145_000, 138_000, 172_000, 165_000, 194_000, 210_000, 205_000, 228_000, 245_000,
        262_000, 290_000,
      ],
    },
  ],
};

const appearances: ChartAppearance[] = ['solid', 'smooth', 'dashed', 'dotted', 'stepped'];

const effects: {
  effect: ChartEffect;
  title: string;
  description: string;
}[] = [
  {
    effect: 'none',
    title: 'None',
    description: 'Standard line rendering without an additional animation effect.',
  },
  {
    effect: 'bounce',
    title: 'Bounce',
    description: 'Adds a bounce entrance to both chart engines.',
  },
  {
    effect: 'wobble',
    title: 'Wobble',
    description: 'Adds a subtle wobble entrance to both chart engines.',
  },
  {
    effect: 'elastic',
    title: 'Elastic',
    description: 'Adds spring-like motion to the line entrance.',
  },
  {
    effect: 'progressive-trace',
    title: 'Progressive Trace',
    description: 'Progressively reveals the line path.',
  },
  {
    effect: 'elastic-glide',
    title: 'Elastic Glide',
    description: 'Combines elastic movement with a smooth transition.',
  },
  {
    effect: 'staggered-reveal',
    title: 'Staggered Reveal',
    description: 'Reveals chart points progressively.',
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

const pageSection = css`
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

const chartShell = css`
  width: 100%;
  height: 500px;
  min-width: 0;

  > div {
    width: 100%;
    min-width: 0;
  }
`;

const heroChart = css`
  width: 100%;
  height: 650px;
`;

const chartNamePill = css`
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
  chartName,
  description,
  api,
  children,
}: {
  readonly chartName: 'Chart 1' | 'Chart 2';
  readonly description: string;
  readonly api?: string;
  readonly children: ReactNode;
}) => (
  <Box customStyles={chartCard}>
    <FlexLayout direction="column" gap="16px" fullWidth>
      <Typography variant="span" customStyles={chartNamePill}>
        {chartName}
      </Typography>
      <Typography variant="p">{description}</Typography>
      {api ? (
        <Typography variant="span" customStyles={codePill}>
          {api}
        </Typography>
      ) : null}
      <div css={chartShell}>{children}</div>
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
  data = commonData,
  appearance = 'smooth',
  effect = 'none',
  options,
  customStyles,
  chart1Description = 'ChartJS Line Chart using the shared Chart API.',
  chart2Description = 'ECharts Line Chart using the same shared Chart API.',
}: {
  readonly data?: ChartData;
  readonly appearance?: ChartAppearance;
  readonly effect?: ChartEffect;
  readonly options?: ChartOptions;
  readonly customStyles?: { container?: ReturnType<typeof css> };
  readonly chart1Description?: string;
  readonly chart2Description?: string;
}) => {
  const sharedProps = {
    type: 'line' as const,
    data,
    appearance,
    effect,
    ...(options !== undefined ? { options } : {}),
    ...(customStyles !== undefined ? { customStyles } : {}),
  };

  return (
    <ComparisonGrid>
      <ComparisonItem>
        <ChartCard chartName="Chart 1" description={chart1Description}>
          <Chart {...sharedProps} engine="chart-1" />
        </ChartCard>
      </ComparisonItem>
      <ComparisonItem>
        <ChartCard chartName="Chart 2" description={chart2Description}>
          <Chart {...sharedProps} engine="chart-2" />
        </ChartCard>
      </ComparisonItem>
    </ComparisonGrid>
  );
};

const AppearanceComparison = ({ appearance }: { readonly appearance: ChartAppearance }) => (
  <section css={pageSection}>
    <SectionHeading
      title={`${appearance.charAt(0).toUpperCase()}${appearance.slice(1)} Appearance`}
      description={`ChartJS and ECharts render the same dataset using the ${appearance} appearance.`}
    />
    <div css={pageSection}>
      <EngineComparison appearance={appearance} />
    </div>
  </section>
);

const EffectComparison = ({
  effect,
  title,
  description,
}: {
  readonly effect: ChartEffect;
  readonly title: string;
  readonly description: string;
}) => (
  <section css={pageSection}>
    <SectionHeading title={title} description={description} />
    <div css={pageSection}>
      <EngineComparison effect={effect} />
    </div>
  </section>
);

export const DefaultRendering: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart"
          description="The same line-series data rendered through ChartJS and ECharts using the shared Chart API."
        />
        <section css={pageSection}>
          <SectionHeading
            title="Default Rendering"
            description="Chart 1 and Chart 2 receive identical data, appearance, and effect props."
          />
          <div css={pageSection}>
            <EngineComparison appearance="solid" />
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
          title="Automatic Line Chart Engine"
          description="The shared Chart component selects the appropriate renderer when engine is auto."
        />
        <div css={[pageSection, heroChart]}>
          <Chart type="line" engine="auto" data={commonData} appearance="smooth" effect="none" />
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
          description="Both rendering engines receive the same multi-series dataset and shared legend option."
        />
        <section css={pageSection}>
          <EngineComparison
            data={threeSeriesData}
            options={{
              showLegend: true,
            }}
          />
        </section>
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
          description="Solid, smooth, dashed, dotted, and stepped appearances compared across ChartJS and ECharts."
        />
        {appearances.map((appearance) => (
          <AppearanceComparison key={appearance} appearance={appearance} />
        ))}
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
          description="Shared animation effects applied to both rendering engines."
        />
        {effects.map(({ effect, title, description }) => (
          <EffectComparison
            key={effect}
            effect={effect}
            title={`${title} Effect`}
            description={description}
          />
        ))}
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
          description="Shared legend options are passed through the Chart API to both engines."
        />
        <section css={pageSection}>
          <SectionHeading
            title="Visible Legend"
            description="Both engines display their series legend."
          />
          <div css={pageSection}>
            <EngineComparison
              data={multiSeriesData}
              options={{
                showLegend: true,
              }}
            />
          </div>
        </section>
        <section css={pageSection}>
          <SectionHeading
            title="Hidden Legend"
            description="Both engines explicitly hide their series legend."
          />
          <div css={pageSection}>
            <EngineComparison
              data={multiSeriesData}
              options={{
                showLegend: false,
              }}
            />
          </div>
        </section>
      </div>
    </main>
  ),
};

export const BoldLabelsAndLegends: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Bold Labels and Legends"
          description="Shared options enable emphasized axis and legend typography in both engines."
        />
        <section css={pageSection}>
          <EngineComparison
            data={multiSeriesData}
            options={{
              showLegend: true,
              boldLabels: true,
              boldLegends: true,
            }}
          />
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
          title="Line Chart Crosshair"
          description="Crosshair is disabled by default and enabled only when options.crosshair is true."
        />
        <section css={pageSection}>
          <SectionHeading
            title="Crosshair Disabled"
            description="Default rendering does not enable the crosshair."
          />
          <div css={pageSection}>
            <EngineComparison
              options={{
                crosshair: false,
              }}
            />
          </div>
        </section>
        <section css={pageSection}>
          <SectionHeading
            title="Crosshair Enabled"
            description="Both engines enable their corresponding crosshair implementation."
          />
          <div css={pageSection}>
            <EngineComparison
              options={{
                crosshair: true,
                showLegend: true,
              }}
            />
          </div>
        </section>
      </div>
    </main>
  ),
};

export const SharedColors: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Line Chart Colors"
          description="The shared colors API provides the same semantic palette to ChartJS and ECharts."
        />
        <section css={pageSection}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="ChartJS consumes the shared series and semantic chart colors."
                api="colors"
              >
                <Chart
                  type="line"
                  engine="chart-1"
                  data={threeSeriesData}
                  appearance="smooth"
                  effect="none"
                  colors={{
                    series: ['#7c3aed', '#0d9488', '#e11d48'],
                    axisText: '#334155',
                    axisLine: '#64748b',
                    grid: '#cbd5e1',
                    tooltipBackground: '#ffffff',
                    tooltipText: '#0f172a',
                    tooltipBorder: '#94a3b8',
                  }}
                  options={{
                    showLegend: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts consumes exactly the same shared color configuration."
                api="colors"
              >
                <Chart
                  type="line"
                  engine="chart-2"
                  data={threeSeriesData}
                  appearance="smooth"
                  effect="none"
                  colors={{
                    series: ['#7c3aed', '#0d9488', '#e11d48'],
                    axisText: '#334155',
                    axisLine: '#64748b',
                    grid: '#cbd5e1',
                    tooltipBackground: '#ffffff',
                    tooltipText: '#0f172a',
                    tooltipBorder: '#94a3b8',
                  }}
                  options={{
                    showLegend: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  ),
};

export const SeriesColors: Story = {
  render: () => {
    const data: ChartData = {
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
    };

    return (
      <main role="main">
        <div css={pageContainer}>
          <PageIntro
            title="Per-Series Colors"
            description="Each series can override the shared palette through color and pointColor."
          />
          <section css={pageSection}>
            <EngineComparison
              data={data}
              options={{
                showLegend: true,
              }}
            />
          </section>
        </div>
      </main>
    );
  },
};

export const SeriesConfiguration: Story = {
  render: () => {
    const data: ChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      series: [
        {
          label: 'Revenue',
          data: [40, 60, 50, 90, 76, 98, 87],
          pointRadius: 8,
          borderWidth: 4,
        },
        {
          label: 'Expenses',
          data: [30, 40, 45, 50, 54, 61, 59],
          pointRadius: 4,
          borderWidth: 2,
        },
      ],
    };

    return (
      <main role="main">
        <div css={pageContainer}>
          <PageIntro
            title="Series Configuration"
            description="Point radius and border width are defined at the shared series-data level."
          />
          <section css={pageSection}>
            <EngineComparison
              data={data}
              options={{
                showLegend: true,
              }}
            />
          </section>
        </div>
      </main>
    );
  },
};

export const SharedCssVariables: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Shared Chart CSS Variables"
          description="Both engines resolve the same --wci-chart-* CSS variables."
        />
        <section css={pageSection}>
          <EngineComparison
            data={multiSeriesData}
            effect="progressive-trace"
            customStyles={{
              container: customVariables,
            }}
            options={{
              showLegend: true,
              boldLabels: true,
            }}
          />
        </section>
      </div>
    </main>
  ),
};

export const ChartJSOptions: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="ChartJS Line Options"
          description="Engine-specific ChartJS configuration remains available through options."
        />
        <section css={pageSection}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="ChartJS uses native plugin and scale configuration."
                api="options.plugins / options.scales"
              >
                <Chart
                  type="line"
                  engine="chart-1"
                  data={largeData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    showLegend: true,
                    plugins: {
                      tooltip: {
                        enabled: true,
                        backgroundColor: '#ffffff',
                        borderColor: '#3b82f6',
                        borderWidth: 2,
                        titleColor: '#0f172a',
                        bodyColor: '#475569',
                        displayColors: true,
                        cornerRadius: 10,
                        padding: 14,
                        callbacks: {
                          title: (items: TooltipItem<'line'>[]): string => items[0]?.label ?? '',
                          label: (item: TooltipItem<'line'>): string => {
                            const name = item.dataset.label ?? 'Value';
                            return `${name}: $${Number(item.parsed.y).toLocaleString()}`;
                          },
                          footer: (): string => 'Monthly total',
                        },
                      },
                    },
                  }}
                />
              </ChartCard>
            </ComparisonItem>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts renders the same dataset with its default generated configuration."
              >
                <Chart
                  type="line"
                  engine="chart-2"
                  data={largeData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    showLegend: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  ),
};

export const EChartsOptions: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="ECharts Line Options"
          description="Engine-specific ECharts configuration remains available through options."
        />
        <section css={pageSection}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="ChartJS renders the shared configuration."
              >
                <Chart
                  type="line"
                  engine="chart-1"
                  data={largeData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    showLegend: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts adds native tooltip and dataZoom configuration."
                api="options.tooltip / options.dataZoom"
              >
                <Chart
                  type="line"
                  engine="chart-2"
                  data={largeData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    showLegend: true,
                    grid: {
                      bottom: 90,
                    },
                    tooltip: {
                      trigger: 'axis',
                      confine: true,
                      backgroundColor: '#ffffff',
                      borderColor: '#3b82f6',
                      borderWidth: 2,
                      padding: 14,
                      textStyle: {
                        color: '#475569',
                      },
                    },
                    dataZoom: [
                      {
                        type: 'inside',
                        start: 15,
                        end: 85,
                      },
                      {
                        type: 'slider',
                        start: 15,
                        end: 85,
                        bottom: 20,
                      },
                    ],
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
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
          description="Native engine options move the value axis to the right side."
        />
        <section css={pageSection}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard chartName="Chart 1" description="ChartJS moves its y scale to the right.">
                <Chart
                  type="line"
                  engine="chart-1"
                  data={commonData}
                  appearance="stepped"
                  effect="none"
                  options={{
                    scales: {
                      y: {
                        position: 'right',
                      },
                    },
                  }}
                />
              </ChartCard>
            </ComparisonItem>
            <ComparisonItem>
              <ChartCard chartName="Chart 2" description="ECharts moves its yAxis to the right.">
                <Chart
                  type="line"
                  engine="chart-2"
                  data={commonData}
                  appearance="stepped"
                  effect="none"
                  options={{
                    yAxis: {
                      position: 'right',
                    },
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  ),
};

export const HiddenGrid: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Hidden Grid"
          description="Native engine configuration hides chart grid lines."
        />
        <section css={pageSection}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard chartName="Chart 1" description="ChartJS disables x and y grid rendering.">
                <Chart
                  type="line"
                  engine="chart-1"
                  data={commonData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        grid: {
                          display: false,
                        },
                      },
                    },
                  }}
                />
              </ChartCard>
            </ComparisonItem>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts disables xAxis and yAxis split lines."
              >
                <Chart
                  type="line"
                  engine="chart-2"
                  data={commonData}
                  appearance="smooth"
                  effect="none"
                  options={{
                    xAxis: {
                      splitLine: {
                        show: false,
                      },
                    },
                    yAxis: {
                      splitLine: {
                        show: false,
                      },
                    },
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  ),
};

export const LargeDataset: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Large Line Dataset"
          description="A twelve-month dataset rendered through both chart engines."
        />
        <section css={pageSection}>
          <EngineComparison
            data={largeData}
            effect="progressive-trace"
            options={{
              showLegend: true,
            }}
          />
        </section>
      </div>
    </main>
  ),
};

export const DownloadHidden: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Download Hidden"
          description="The shared showDownload prop hides download controls for both engines."
        />
        <section css={pageSection}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard chartName="Chart 1" description="ChartJS download control hidden.">
                <Chart
                  type="line"
                  engine="chart-1"
                  data={commonData}
                  appearance="smooth"
                  effect="none"
                  showDownload={false}
                />
              </ChartCard>
            </ComparisonItem>
            <ComparisonItem>
              <ChartCard chartName="Chart 2" description="ECharts download control hidden.">
                <Chart
                  type="line"
                  engine="chart-2"
                  data={commonData}
                  appearance="smooth"
                  effect="none"
                  showDownload={false}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
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
          description="Both engines use the shared downloadPlacement API."
        />
        <section css={pageSection}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="ChartJS download control positioned at the top-left."
                api='downloadPlacement="top-left"'
              >
                <Chart
                  type="line"
                  engine="chart-1"
                  data={commonData}
                  appearance="smooth"
                  effect="none"
                  downloadPlacement="top-left"
                />
              </ChartCard>
            </ComparisonItem>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts download control positioned at the top-left."
                api='downloadPlacement="top-left"'
              >
                <Chart
                  type="line"
                  engine="chart-2"
                  data={commonData}
                  appearance="smooth"
                  effect="none"
                  downloadPlacement="top-left"
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  ),
};
