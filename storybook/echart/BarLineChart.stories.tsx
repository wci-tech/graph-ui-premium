/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { CallbackDataParams } from 'echarts/types/dist/shared';

import { BarLineChart } from '@/components/echarts/components';
import type {
  BarLineChartData,
  BarLineChartEffect,
} from '@/components/echarts/components/bar-line-chart/BarLineChart.types';

const meta: Meta<typeof BarLineChart> = {
  title: 'components/echarts/BarLineChart',
  component: BarLineChart,
};

export default meta;

const mockData: BarLineChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    {
      label: 'Actual Sales',
      type: 'bar',
      data: [450, 620, 380, 810, 540, 900, 720],
    },
    {
      label: 'Market Trend',
      type: 'line',
      data: [430, 580, 420, 760, 590, 850, 760],
    },
  ],
};

const areaFillData: BarLineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  series: [
    {
      label: 'Revenue',
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110, 130],
    },
    {
      label: 'Forecast',
      type: 'line',
      data: [100, 180, 140, 90, 80, 100, 120],
      fill: true,
    },
  ],
};

const splitYAxisData: BarLineChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    {
      label: 'Sales',
      type: 'bar',
      data: [450, 620, 380, 810, 540, 900, 720],
    },
    {
      label: 'Trend %',
      type: 'line',
      data: [12, 18, 15, 24, 21, 30, 26],
      yAxisIndex: 1,
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
  --wci-chart-green: #16a34a;
  --wci-chart-red: #dc2626;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #92400e;
  --wci-chart-grid: #fde68a;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #475569;
  --wci-chart-tooltip-border: #92400e;
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
              data={mockData}
              effect={effect}
              options={{
                barWidth: 44,
                touchBarTop: true,
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
        title="Default ECharts Bar Line Chart"
        description="Default mixed ECharts chart with bars, a smooth line, and trend points."
      />
      <Box customStyles={heroBox}>
        <BarLineChart data={mockData} effect="none" />
      </Box>
    </div>
  </main>
);

export const Basic = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Basic ECharts Bar Line Chart"
        description="Mixed bar and line chart using straight line segments with the basic appearance."
      />
      <Box customStyles={heroBox}>
        <BarLineChart data={mockData} appearance="basic" effect="none" />
      </Box>
    </div>
  </main>
);

export const Smooth = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Smooth ECharts Bar Line Chart"
        description="Mixed bar and line chart using smooth line interpolation."
      />
      <Box customStyles={heroBox}>
        <BarLineChart data={mockData} appearance="smooth" effect="none" />
      </Box>
    </div>
  </main>
);

export const TrendPoints = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Chart Trend Points"
        description="Line points use increase, decrease, and neutral semantic chart colors."
      />
      <Box customStyles={heroBox}>
        <BarLineChart data={mockData} effect="none" showTrendPoints />
      </Box>
    </div>
  </main>
);

export const WithoutTrendPoints = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Chart Without Trend Points"
        description="Trend coloring is disabled and line points use the line series color."
      />
      <Box customStyles={heroBox}>
        <BarLineChart data={mockData} effect="none" showTrendPoints={false} />
      </Box>
    </div>
  </main>
);

export const TouchingBarTops = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Line Points Touching Bar Tops"
        description="Line values are aligned with the corresponding bar values when touchBarTop is enabled."
      />
      <Box customStyles={heroBox}>
        <BarLineChart
          data={mockData}
          effect="none"
          options={{
            touchBarTop: true,
            barWidth: 44,
          }}
        />
      </Box>
    </div>
  </main>
);

export const OriginalLineValues = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Original Line Values"
        description="Disabling touchBarTop preserves the original values supplied by the line series."
      />
      <Box customStyles={heroBox}>
        <BarLineChart
          data={mockData}
          effect="none"
          options={{
            touchBarTop: false,
            barWidth: 44,
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
        description="Control the mixed-chart bar width through options.barWidth."
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
          <ChartCard title="Thin Bars" description="Compact 20-pixel bars." api="barWidth: 20">
            <BarLineChart
              data={mockData}
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
          <ChartCard title="Default Bars" description="Default 44-pixel bars." api="barWidth: 44">
            <BarLineChart
              data={mockData}
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
          <ChartCard title="Wide Bars" description="Wide 64-pixel bars." api="barWidth: 64">
            <BarLineChart
              data={mockData}
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
        description="Enables the ECharts crosshair when options.crosshair is true."
      />
      <Box customStyles={heroBox}>
        <BarLineChart
          data={mockData}
          effect="none"
          options={{
            crosshair: true,
            barWidth: 44,
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
        description="Custom tooltip showing the category and values from both bar and line series."
      />
      <Box customStyles={heroBox}>
        <BarLineChart
          data={mockData}
          effect="none"
          options={{
            barWidth: 44,
            tooltip: {
              trigger: 'axis',
              backgroundColor: '#ffffff',
              borderColor: '#763d6c',
              borderWidth: 2,
              padding: 14,
              textStyle: {
                color: '#475569',
              },
              formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
                const items = Array.isArray(params) ? params : [params];

                const category = items[0]?.name ?? 'Category';

                const rows = items
                  .map((item) => {
                    const value = typeof item.value === 'number' ? item.value : 0;

                    return `
                      <div style="display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:6px;">
                        <span>
                          ${item.marker ?? ''}
                          ${item.seriesName ?? 'Series'}
                        </span>
                        <strong>
                          ${value.toLocaleString()}
                        </strong>
                      </div>
                    `;
                  })
                  .join('');

                return `
                  <div style="min-width:180px;">
                    <div style="color:#0f172a;font-size:14px;font-weight:700;margin-bottom:8px;">
                      ${category}
                    </div>
                    ${rows}
                  </div>
                `;
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
        description="Combines custom tooltip styling with the ECharts crosshair interaction."
      />
      <Box customStyles={heroBox}>
        <BarLineChart
          data={mockData}
          effect="none"
          options={{
            crosshair: true,
            barWidth: 44,
            tooltip: {
              trigger: 'axis',
              backgroundColor: '#0f172a',
              borderColor: '#64bdd1',
              borderWidth: 2,
              padding: 14,
              textStyle: {
                color: '#f8fafc',
              },
              axisPointer: {
                type: 'cross',
                lineStyle: {
                  color: '#64bdd1',
                  width: 1,
                },
                crossStyle: {
                  color: '#64bdd1',
                  width: 1,
                },
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const SplitYAxis = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Chart Split Y-Axis"
        description="Uses separate value axes for the bar and line series."
      />
      <Box customStyles={heroBox}>
        <BarLineChart
          data={splitYAxisData}
          effect="none"
          options={{
            touchBarTop: false,
            yAxis: [
              {
                type: 'value',
                name: 'Sales',
              },
              {
                type: 'value',
                name: 'Trend %',
                position: 'right',
              },
            ],
          }}
        />
      </Box>
    </div>
  </main>
);

export const LineAreaFill = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Chart Area Fill"
        description="Line series can use fill=true to render a gradient area beneath the line."
      />
      <Box customStyles={heroBox}>
        <BarLineChart
          data={areaFillData}
          effect="progressive-trace"
          options={{
            touchBarTop: false,
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
    description="Bar and line series enter using a pronounced bounce easing motion."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Bar and line series enter using a back-and-forth wobble motion."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Bar and line series enter using an elastic easing motion."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Bar and line series reveal progressively across the mixed chart."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Bar and line series animate with an elastic glide transition."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Bar and line series reveal sequentially using staggered animation delays."
  />
);

export const CustomSeriesColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bar Line Chart Custom Colors"
        description="Consumer-provided series colors override the default chart color palette."
      />
      <Box customStyles={heroBox}>
        <BarLineChart
          data={mockData}
          effect="none"
          colors={{
            series: ['#2d5a27', '#d4af37'],
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
        title="ECharts Bar Line Chart Custom Styles"
        description="Override every chart color through shared CSS variables or the colors API."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Colors
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
            description="Overrides the complete shared chart palette including series, axes, grid, trend points, and tooltip colors."
            api="customStyles.wrapper"
          >
            <BarLineChart
              data={mockData}
              effect="none"
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{
                barWidth: 36,
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
              data={mockData}
              effect="none"
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
            description="Overrides individual bar and line colors directly from the series data."
            api="series.color"
          >
            <BarLineChart
              data={{
                ...mockData,
                series: [
                  {
                    ...mockData.series[0],
                    color: '#0369a1',
                  },
                  {
                    ...mockData.series[1],
                    color: '#c026d3',
                  },
                ],
              }}
              effect="none"
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
            title="Native ECharts Options"
            description="Native ECharts options override generated layout and visual configuration while chart colors continue to come from the colors API."
            api="colors + options"
          >
            <BarLineChart
              data={mockData}
              effect="none"
              colors={{
                series: ['#0f766e', '#c2410c', '#7e22ce'],
                axisText: '#0eda15',
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
                backgroundColor: '#fafaf9',
                legend: {
                  top: 16,
                  textStyle: {
                    color: '#292524',
                  },
                },
                grid: {
                  left: 24,
                  right: 24,
                  top: 56,
                  bottom: 16,
                  containLabel: true,
                },
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
