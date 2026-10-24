/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent, TooltipItem } from 'chart.js';

import { BarLineChart } from '@/components/chartjs/components';
import type { BarLineChartEffect } from '@/components/chartjs/components/bar-line-chart/BarLineChart.types';

const meta: Meta<typeof BarLineChart> = {
  title: 'components/chartjs/BarLineChart',
  component: BarLineChart,
};

export default meta;

const mockData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  data: [
    {
      label: 'Revenue',
      data: [450, 650, 950, 1150, 1050],
      type: 'bar' as const,
    },
    {
      label: 'Forecast',
      data: [420, 700, 900, 1200, 1100],
      type: 'line' as const,
    },
  ],
};

const singlePointData = {
  labels: ['Mar'],
  data: [
    {
      label: 'Revenue',
      data: [950],
      type: 'bar' as const,
    },
    {
      label: 'Forecast',
      data: [950],
      type: 'line' as const,
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
  color: #1e293b;
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH2 = css`
  margin-bottom: 12px;
  padding: 16px;
  color: #1e293b;
  font-size: 1.875rem;
  font-weight: 600;
`;

const titleH3 = css`
  margin-bottom: 8px;
  color: #1e293b;
  font-size: 1.35rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  color: #475569;
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const heroBox = css`
  padding: 32px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #f8fafc;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #ffffff;
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
  --wci-chart-blue: #2d5a27;
  --wci-chart-teal: #d4af37;
  --wci-chart-axis-text: #111827;
  --wci-chart-axis-line: #92400e;
  --wci-chart-grid: #fde68a;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #111827;
  --wci-chart-tooltip-border: #92400e;
  --wci-chart-green: #16a34a;
  --wci-chart-red: #dc2626;
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
  readonly effect: BarLineChartEffect;
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
            <BarLineChart
              {...mockData}
              effect={effect}
              showTrendPoints
              options={{
                barWidth: 44,
              }}
            />
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
        title="Default ChartJS Bar Line Chart"
        description="Mixed bar and line chart using the default smooth appearance."
      />

      <Box customStyles={heroBox}>
        <BarLineChart {...mockData} effect="none" />
      </Box>
    </div>
  </main>
);

export const Basic = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Basic ChartJS Bar Line Chart"
        description="Mixed bar and line chart using straight line segments with the basic appearance."
      />

      <Box customStyles={heroBox}>
        <BarLineChart {...mockData} appearance="basic" effect="none" />
      </Box>
    </div>
  </main>
);

export const Smooth = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Smooth ChartJS Bar Line Chart"
        description="Mixed bar and line chart using smooth line interpolation."
      />

      <Box customStyles={heroBox}>
        <BarLineChart {...mockData} appearance="smooth" effect="none" />
      </Box>
    </div>
  </main>
);

export const TrendPoints = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Bar Line Trend Points"
        description="Mixed bar-line chart with increase, decrease, and neutral trend points."
      />

      <Box customStyles={heroBox}>
        <BarLineChart
          {...mockData}
          effect="none"
          showTrendPoints
          options={{
            barWidth: 44,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const WithoutTrendPoints = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Chart Without Trend Points"
        description="Mixed chart with trend-point coloring disabled."
      />

      <Box customStyles={heroBox}>
        <BarLineChart {...mockData} effect="none" showTrendPoints={false} />
      </Box>
    </div>
  </main>
);

export const RightAxis = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Bar Line Right Axis"
        description="Mixed bar-line chart with the value axis positioned on the right side."
      />

      <Box customStyles={heroBox}>
        <BarLineChart
          {...mockData}
          effect="none"
          options={{
            barWidth: 44,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
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

export const BarWidthOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Chart Width Options"
        description="Control the mixed chart bar width through options.barWidth."
      />

      <FlexLayout
        columns={12}
        gap={{
          default: '24px',
          md: '32px',
        }}
        wrap="wrap"
      >
        <FlexItem
          columnSpan={{
            default: 12,
            md: 4,
          }}
        >
          <ChartCard title="Thin Bar" description="Compact 20-pixel bar width." api="barWidth: 20">
            <BarLineChart
              {...mockData}
              effect="none"
              options={{
                barWidth: 20,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
            md: 4,
          }}
        >
          <ChartCard
            title="Default Bar"
            description="Default 44-pixel bar width."
            api="barWidth: 44"
          >
            <BarLineChart
              {...mockData}
              effect="none"
              options={{
                barWidth: 44,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
            md: 4,
          }}
        >
          <ChartCard title="Wide Bar" description="Wide 64-pixel bar width." api="barWidth: 64">
            <BarLineChart
              {...mockData}
              effect="none"
              options={{
                barWidth: 64,
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
        title="Bar Line Chart With Crosshair"
        description="The crosshair is enabled when options.crosshair is true."
      />

      <Box customStyles={heroBox}>
        <BarLineChart
          {...mockData}
          effect="none"
          showTrendPoints
          options={{
            crosshair: true,
            barWidth: 44,
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
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
        title="Bar Line Chart Custom Tooltip"
        description="Custom tooltip showing both bar and line values with a combined category total."
      />

      <Box customStyles={heroBox}>
        <BarLineChart
          {...mockData}
          effect="none"
          showTrendPoints
          options={{
            barWidth: 44,
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
                backgroundColor: '#ffffff',
                borderColor: '#763d6c',
                borderWidth: 2,
                titleColor: '#0f172a',
                bodyColor: '#475569',
                footerColor: '#0f172a',
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
                  title: (items: TooltipItem<'bar' | 'line'>[]) => items[0]?.label ?? 'Category',
                  label: (item: TooltipItem<'bar' | 'line'>) => {
                    const datasetLabel = item.dataset.label ?? 'Dataset';

                    const parsedValue =
                      typeof item.parsed.y === 'number' ? item.parsed.y : item.parsed.x;

                    const value = typeof parsedValue === 'number' ? parsedValue : 0;

                    return `${datasetLabel}: ${value.toLocaleString()}`;
                  },
                  footer: (items: TooltipItem<'bar' | 'line'>[]) => {
                    const total = items.reduce((sum, item) => {
                      const parsedValue =
                        typeof item.parsed.y === 'number' ? item.parsed.y : item.parsed.x;

                      const value = typeof parsedValue === 'number' ? parsedValue : 0;

                      return sum + value;
                    }, 0);

                    return `Combined: ${total.toLocaleString()}`;
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

export const CustomTooltipWithCrosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Tooltip With Crosshair"
        description="Mixed bar-line chart combining a custom tooltip with the crosshair interaction."
      />

      <Box customStyles={heroBox}>
        <BarLineChart
          {...mockData}
          effect="none"
          showTrendPoints
          options={{
            crosshair: true,
            barWidth: 44,
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
                backgroundColor: '#0f172a',
                borderColor: '#64bdd1',
                borderWidth: 2,
                titleColor: '#f8fafc',
                bodyColor: '#cbd5e1',
                footerColor: '#f8fafc',
                cornerRadius: 10,
                padding: 14,
                displayColors: true,
                caretSize: 8,
                caretPadding: 10,
                callbacks: {
                  label: (item: TooltipItem<'bar' | 'line'>) => {
                    const datasetLabel = item.dataset.label ?? 'Dataset';

                    const parsedValue =
                      typeof item.parsed.y === 'number' ? item.parsed.y : item.parsed.x;

                    const value = typeof parsedValue === 'number' ? parsedValue : 0;

                    return `${datasetLabel}: ₹${value.toLocaleString()}`;
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

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Bounce animation for the mixed bar-line chart."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble animation for refreshed mixed chart datasets."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic spring-like animation for mixed charts."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive animation for dashboard storytelling."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide animation for chart transitions."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered animation across the mixed chart datasets."
  />
);

export const SingleDataPoint = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Single Data Point"
        description="Single category mixed chart with one bar and one line point."
      />

      <FlexLayout
        columns={12}
        gap={{
          default: '24px',
          md: '32px',
        }}
        wrap="wrap"
      >
        <FlexItem
          columnSpan={{
            default: 12,
            md: 6,
          }}
        >
          <ChartCard
            title="March Only"
            description="Single March value without trend coloring."
            api="showTrendPoints={false}"
          >
            <BarLineChart {...singlePointData} effect="none" showTrendPoints={false} />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
            md: 6,
          }}
        >
          <ChartCard
            title="March Trend Point"
            description="Single March value with a neutral trend point."
            api="showTrendPoints"
          >
            <BarLineChart {...singlePointData} effect="none" showTrendPoints />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Bar Line Chart Custom Styles"
        description="Override every chart color through shared CSS variables, the colors API, per-series colors, and native Chart.js options."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Behavior
      </Typography>

      <FlexLayout
        columns={12}
        gap={{
          default: '24px',
          md: '32px',
        }}
        wrap="wrap"
      >
        <FlexItem
          columnSpan={{
            default: 12,
            md: 6,
          }}
        >
          <ChartCard
            title="Custom CSS Variables"
            description="Overrides the complete shared chart palette including series, trend points, axes, grid, and tooltip colors."
            api="customStyles.wrapper"
          >
            <BarLineChart
              {...mockData}
              effect="none"
              showTrendPoints
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{
                barWidth: 36,
                boldLabels: true,
                boldLegends: true,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
            md: 6,
          }}
        >
          <ChartCard
            title="Custom Colors API"
            description="Overrides every exposed BarLineChart color including series, axes, grid, trend states, and tooltip colors."
            api="colors"
          >
            <BarLineChart
              {...mockData}
              effect="none"
              showTrendPoints
              colors={{
                series: ['#7c3aed', '#f97316', '#0891b2', '#db2777'],
                axisText: '#1e293b',
                axisLine: '#9333ea',
                grid: '#d8b4fe',
                tooltipBackground: '#faf5ff',
                tooltipText: '#581c87',
                tooltipBorder: '#7e22ce',
                trendUp: '#15803d',
                trendDown: '#b91c1c',
                trendNeutral: '#475569',
              }}
              options={{
                barWidth: 36,
                boldLabels: true,
                boldLegends: true,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
            md: 6,
          }}
        >
          <ChartCard
            title="Per-Series Colors"
            description="Overrides individual bar and line colors directly from each dataset while keeping semantic chart colors configurable."
            api="data[].color"
          >
            <BarLineChart
              labels={mockData.labels}
              data={mockData.data.map((dataset, index) => ({
                ...dataset,
                color: index === 0 ? '#0369a1' : '#c026d3',
              }))}
              effect="none"
              showTrendPoints
              colors={{
                axisText: '#334155',
                axisLine: '#64748b',
                grid: '#cbd5e1',
                tooltipBackground: '#ffffff',
                tooltipText: '#0f172a',
                tooltipBorder: '#94a3b8',
                trendUp: '#16a34a',
                trendDown: '#dc2626',
                trendNeutral: '#64748b',
              }}
              options={{
                barWidth: 36,
                boldLabels: true,
                boldLegends: true,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
            md: 6,
          }}
        >
          <ChartCard
            title="Native Chart.js Options"
            description="Combines the complete colors API with native Chart.js configuration and click handling."
            api="colors + options"
          >
            <BarLineChart
              {...mockData}
              effect="none"
              showTrendPoints
              colors={{
                series: ['#0f766e', '#c2410c', '#7e22ce'],
                axisText: '#292524',
                axisLine: '#78716c',
                grid: '#d6d3d1',
                tooltipBackground: '#fffbeb',
                tooltipText: '#422006',
                tooltipBorder: '#d97706',
                trendUp: '#15803d',
                trendDown: '#be123c',
                trendNeutral: '#57534e',
              }}
              options={{
                barWidth: 44,
                isBoxVisible: false,
                boldLabels: true,
                boldLegends: true,
                scales: {
                  x: {
                    ticks: {
                      padding: 12,
                    },
                  },
                  y: {
                    position: 'right',
                    ticks: {
                      padding: 12,
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                  tooltip: {
                    padding: 14,
                  },
                },
                onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                  const firstElement = elements[0];

                  if (!firstElement) {
                    return;
                  }

                  const month = mockData.labels[firstElement.index];

                  const dataset = mockData.data[firstElement.datasetIndex];

                  const label = dataset?.label ?? 'Dataset';

                  alert(`API Call: Fetching table for ${month} - ${label}`);
                },
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
