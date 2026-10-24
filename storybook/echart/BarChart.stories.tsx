/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { BarChart } from '@/components/echarts/components';
import type {
  BarChartData,
  BarChartEffect,
} from '@/components/echarts/components/bar-chart/BarChart.types';

const meta: Meta<typeof BarChart> = {
  title: 'components/echarts/BarChart',
  component: BarChart,
};

export default meta;

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

const mockData: BarChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      label: 'Monthly Revenue',
      data: [1200, 1900, 3000, 5000, 4200, 3800],
    },
  ],
};

const multiSeriesData: BarChartData = {
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

const threeSeriesData: BarChartData = {
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

const stackedSeriesData: BarChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    {
      label: 'Revenue',
      data: [400, 600, 500, 900],
      stack: 'total',
    },
    {
      label: 'Expenses',
      data: [300, 400, 450, 500],
      stack: 'total',
    },
    {
      label: 'Profit',
      data: [100, 200, 50, 400],
      stack: 'total',
    },
  ],
};

const customSeriesData: BarChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    {
      label: 'Revenue',
      data: [400, 600, 500, 900],
      color: '#763d6c',
    },
    {
      label: 'Expenses',
      data: [300, 400, 450, 500],
      color: '#64bdd1',
    },
    {
      label: 'Profit',
      data: [100, 200, 50, 400],
      color: '#316851',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Styles                                                                      */
/* -------------------------------------------------------------------------- */

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  margin-bottom: 16px;
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH2 = css`
  margin-bottom: 12px;
  font-size: 1.875rem;
  font-weight: 600;
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
  font-size: 0.95rem;
  line-height: 1.5;
`;

const heroBox = css`
  padding: 32px;
  border: 1px solid var(--wci-chart-axis-line);
  border-radius: 16px;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border: 1px solid var(--wci-chart-axis-line);
  border-radius: 14px;
`;

const chartShell = css`
  position: relative;
  width: 100%;
  height: 580px;
  min-height: 420px;
  margin-top: 20px;
`;

const codePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-family: monospace;
  font-size: 12px;
`;

const customWrapperStyles = css`
  padding: 16px;
  border: 1px solid var(--wci-chart-axis-line);
  border-radius: 12px;
`;

/* -------------------------------------------------------------------------- */
/* Shared components                                                           */
/* -------------------------------------------------------------------------- */

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
            <BarChart chartId={`bar-chart-${effect}`} data={mockData} effect={effect} />
          </div>
        </FlexLayout>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Default                                                                     */
/* -------------------------------------------------------------------------- */

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Default ECharts Bar Chart"
        description="Default ECharts bar chart using the WCI chart color tokens."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <BarChart chartId="default-bar-chart" data={mockData} effect="none" />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Colors                                                                      */
/* -------------------------------------------------------------------------- */

export const AutomaticColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Automatic Bar Chart Colors"
        description="Multiple series automatically use the shared WCI chart color palette."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <BarChart
            chartId="automatic-colors-bar-chart"
            data={threeSeriesData}
            effect="staggered-reveal"
          />
        </div>
      </Box>
    </div>
  </main>
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Bar Chart Colors"
        description="Chart-level color overrides replace the automatic WCI chart palette."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <BarChart
            chartId="custom-colors-bar-chart"
            data={threeSeriesData}
            effect="staggered-reveal"
            colors={{
              series: ['#763d6c', '#64bdd1', '#316851'],
              axisText: '#475569',
              axisLine: '#cbd5e1',
              grid: '#e2e8f0',
              tooltipBackground: '#ffffff',
              tooltipText: '#0f172a',
              tooltipBorder: '#cbd5e1',
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const DatasetColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Dataset Bar Colors"
        description="Individual series colors override the automatically assigned chart palette."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <BarChart
            chartId="dataset-colors-bar-chart"
            data={customSeriesData}
            effect="staggered-reveal"
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Horizontal                                                                  */
/* -------------------------------------------------------------------------- */

export const HorizontalBar = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Horizontal ECharts Bar Chart"
        description="Monthly revenue rendered using a horizontal bar layout."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <BarChart
            chartId="horizontal-bar-chart"
            data={mockData}
            effect="staggered-reveal"
            options={{
              horizontal: true,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Bar width                                                                   */
/* -------------------------------------------------------------------------- */

export const BarWidthOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Bar Width Options"
        description="Control bar thickness through options.barWidth."
      />

      <FlexLayout
        columns={12}
        gap={{
          default: '24px',
          md: '32px',
        }}
        wrap="wrap"
      >
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard title="Thin Bars" description="Compact 20-pixel bars." api="barWidth: 20">
            <BarChart
              chartId="thin-bar-chart"
              data={mockData}
              effect="progressive-trace"
              options={{
                barWidth: 20,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard title="Default Bars" description="Default bar width." api="default barWidth">
            <BarChart
              chartId="default-width-bar-chart"
              data={mockData}
              effect="progressive-trace"
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard title="Wide Bars" description="Wide 64-pixel bars." api="barWidth: 64">
            <BarChart
              chartId="wide-bar-chart"
              data={mockData}
              effect="progressive-trace"
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

/* -------------------------------------------------------------------------- */
/* Crosshair                                                                   */
/* -------------------------------------------------------------------------- */

export const WithCrosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Bar Chart With Crosshair"
        description="Cross-axis inspection enabled for the bar chart."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <BarChart
            chartId="bar-chart-crosshair"
            data={mockData}
            effect="progressive-trace"
            options={{
              crosshair: true,
              barWidth: 40,

              tooltip: {
                trigger: 'axis',

                axisPointer: {
                  type: 'cross',
                  snap: true,

                  crossStyle: {
                    color: '#64748b',
                    width: 1,
                    type: 'dashed',
                  },

                  lineStyle: {
                    color: '#64748b',
                    width: 1,
                    type: 'dashed',
                  },

                  label: {
                    show: true,
                    color: '#ffffff',
                    backgroundColor: '#334155',
                  },

                  shadowStyle: {
                    color: 'transparent',
                    opacity: 0,
                  },
                },
              },
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Custom tooltip                                                              */
/* -------------------------------------------------------------------------- */

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Bar Chart Custom Tooltip"
        description="Custom tooltip with formatted series values and a combined total."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <BarChart
            chartId="bar-chart-custom-tooltip"
            data={multiSeriesData}
            effect="staggered-reveal"
            options={{
              barWidth: 28,

              tooltip: {
                trigger: 'axis',
                backgroundColor: '#ffffff',
                borderColor: '#763d6c',
                borderWidth: 2,
                padding: 14,

                textStyle: {
                  color: '#475569',
                  fontSize: 13,
                },

                extraCssText:
                  'border-radius: 10px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.14);',

                axisPointer: {
                  type: 'line',

                  lineStyle: {
                    color: '#94a3b8',
                    width: 1,
                    type: 'dashed',
                  },

                  shadowStyle: {
                    color: 'transparent',
                    opacity: 0,
                  },
                },

                formatter: (params) => {
                  const items = Array.isArray(params) ? params : [params];

                  const firstItem = items[0];

                  const category =
                    firstItem && 'axisValueLabel' in firstItem
                      ? String(firstItem.axisValueLabel ?? 'Category')
                      : 'Category';

                  const rows = items.map((item) => {
                    const seriesName =
                      'seriesName' in item ? String(item.seriesName ?? 'Series') : 'Series';

                    const marker = 'marker' in item ? String(item.marker ?? '') : '';

                    const rawValue = 'value' in item ? item.value : 0;

                    const value = typeof rawValue === 'number' ? rawValue : Number(rawValue) || 0;

                    return {
                      value,

                      html: `
                        <div
                          style="
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            gap: 24px;
                            margin-top: 7px;
                          "
                        >
                          <span>
                            ${marker}
                            ${seriesName}
                          </span>

                          <strong
                            style="
                              color: #0f172a;
                            "
                          >
                            ${value.toLocaleString()}
                          </strong>
                        </div>
                      `,
                    };
                  });

                  const total = rows.reduce((sum, row) => sum + row.value, 0);

                  return `
                    <div style="min-width: 190px;">
                      <div
                        style="
                          margin-bottom: 8px;
                          color: #0f172a;
                          font-size: 14px;
                          font-weight: 700;
                        "
                      >
                        ${category}
                      </div>

                      ${rows.map((row) => row.html).join('')}

                      <div
                        style="
                          display: flex;
                          justify-content: space-between;
                          gap: 24px;
                          margin-top: 10px;
                          padding-top: 9px;
                          border-top: 1px solid #e2e8f0;
                          color: #0f172a;
                          font-weight: 700;
                        "
                      >
                        <span>Total</span>
                        <span>
                          ${total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  `;
                },
              },
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Multi-series                                                                */
/* -------------------------------------------------------------------------- */

export const MultiBarGrouped = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Grouped Multi Bar Chart"
        description="Revenue, expenses, and profit displayed side by side for each quarter."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <BarChart
            chartId="grouped-multi-bar-chart"
            data={threeSeriesData}
            effect="staggered-reveal"
            options={{
              barWidth: 24,

              legend: {
                show: true,
                top: 8,
              },

              tooltip: {
                trigger: 'axis',

                axisPointer: {
                  type: 'line',

                  shadowStyle: {
                    color: 'transparent',
                    opacity: 0,
                  },
                },
              },
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const MultiBarStacked = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Stacked Multi Bar Chart"
        description="Revenue, expenses, and profit stacked into combined quarterly totals."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <BarChart
            chartId="stacked-multi-bar-chart"
            data={stackedSeriesData}
            effect="staggered-reveal"
            options={{
              barWidth: 54,

              legend: {
                show: true,
                top: 8,
              },

              tooltip: {
                trigger: 'axis',

                axisPointer: {
                  type: 'line',

                  shadowStyle: {
                    color: 'transparent',
                    opacity: 0,
                  },
                },
              },
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const HorizontalMultiBar = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Horizontal Multi Bar Chart"
        description="Multiple series rendered as grouped horizontal bars."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <BarChart
            chartId="horizontal-multi-bar-chart"
            data={threeSeriesData}
            effect="staggered-reveal"
            options={{
              horizontal: true,
              barWidth: 18,

              legend: {
                show: true,
                top: 8,
              },
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Effects                                                                     */
/* -------------------------------------------------------------------------- */

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Bars enter using a pronounced bounce easing motion."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Bars enter with a softer back-and-forth easing motion."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Bars enter using an elastic easing motion."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Bars reveal progressively from the value-axis baseline."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Bars animate using an elastic entry with a smooth update transition."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Bars reveal sequentially using a staggered animation delay."
  />
);

/* -------------------------------------------------------------------------- */
/* Custom styles                                                               */
/* -------------------------------------------------------------------------- */

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Bar Chart Custom Styles"
        description="Structural custom styles and native ECharts option overrides."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Advanced Options
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
            title="Custom Wrapper"
            description="Applies structural styles through customStyles.wrapper."
            api="customStyles.wrapper"
          >
            <BarChart
              chartId="custom-wrapper-bar-chart"
              data={mockData}
              effect="progressive-trace"
              customStyles={{
                wrapper: customWrapperStyles,
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
            title="Custom Chart Colors"
            description="Overrides chart colors through the colors API."
            api="colors"
          >
            <BarChart
              chartId="custom-chart-colors"
              data={mockData}
              effect="progressive-trace"
              colors={{
                series: ['#06b6d4'],
                axisText: '#475569',
                axisLine: '#94a3b8',
                grid: '#e2e8f0',
                tooltipBackground: '#ffffff',
                tooltipText: '#0f172a',
                tooltipBorder: '#94a3b8',
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
            title="Right Y-Axis"
            description="Moves the value axis to the right side."
            api="options.yAxis.position"
          >
            <BarChart
              chartId="right-axis-bar-chart"
              data={mockData}
              effect="progressive-trace"
              options={{
                yAxis: {
                  position: 'right',
                },
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
            title="Horizontal No Grid"
            description="Horizontal chart with value grid lines hidden."
            api="options.horizontal"
          >
            <BarChart
              chartId="horizontal-no-grid-bar-chart"
              data={mockData}
              effect="staggered-reveal"
              options={{
                horizontal: true,

                xAxis: {
                  splitLine: {
                    show: false,
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
