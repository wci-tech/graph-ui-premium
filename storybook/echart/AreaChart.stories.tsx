/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';

import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import AreaChart from '@/components/echarts/components/area-chart/AreaChart';

import type {
  AreaChartData,
  AreaChartEffect,
} from '@/components/echarts/components/area-chart/AreaChart.types';

const meta: Meta<typeof AreaChart> = {
  title: 'components/echarts/AreaChart',

  component: AreaChart,
};

export default meta;

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

const mockData: AreaChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],

  series: [
    {
      label: 'Organic Traffic',

      data: [420, 450, 300, 780, 520, 950, 800],
    },
  ],
};

const multiSeriesData: AreaChartData = {
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

const customSeriesData: AreaChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

  series: [
    {
      label: 'Revenue',

      data: [320, 460, 410, 680, 590, 820],

      color: 'var(--wci-chart-purple)',

      pointColor: 'var(--wci-chart-magenta)',

      pointRadius: 7,

      borderWidth: 4,
    },

    {
      label: 'Forecast',

      data: [280, 400, 450, 570, 640, 760],

      color: 'var(--wci-chart-teal)',

      pointColor: 'var(--wci-chart-cyan)',

      pointRadius: 6,

      borderWidth: 3,
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
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--wci-gray-900);
  margin-bottom: 16px;
`;

const titleH2 = css`
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--wci-gray-900);
  margin-bottom: 12px;
`;

const titleH3 = css`
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--wci-gray-900);
  margin-bottom: 8px;
`;

const paragraph = css`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 24px;
  color: var(--wci-gray-700);
`;

const paragraphSmall = css`
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--wci-gray-700);
`;

const heroBox = css`
  padding: 32px;
  border-radius: 16px;
  background: var(--wci-gray-50);
  border: 1px solid var(--wci-gray-200);
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border-radius: 14px;
  background: var(--wci-gray-50);
  border: 1px solid var(--wci-gray-200);
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
  background: var(--wci-gray-100);
  color: var(--wci-gray-800);
  font-family: monospace;
  font-size: 12px;
`;

const customWrapper = css`
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--wci-chart-axis-line);
`;

const darkChartWrapper = css`
  padding: 20px;
  border-radius: 16px;
  background: #12151f;
`;

/* -------------------------------------------------------------------------- */
/* Shared presentation                                                         */
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
  readonly children: ReactNode;
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

const EffectStory = ({
  effect,
  title,
  description,
}: {
  readonly effect: AreaChartEffect;
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
            <AreaChart data={mockData} appearance="smooth" effect={effect} />
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
        title="Default ECharts Area Chart"
        description="Default area chart using the graph color palette, smooth appearance, and standard ECharts rendering."
      />

      <Box customStyles={heroBox}>
        <AreaChart data={mockData} appearance="smooth" effect="none" />
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Appearances                                                                 */
/* -------------------------------------------------------------------------- */

export const Appearances = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Area Chart Appearances"
        description="Compare the basic and smooth line appearances using the same area chart data."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Appearances
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
            title="Basic"
            description="Uses straight line segments between each data point."
            api='appearance="basic"'
          >
            <AreaChart data={mockData} appearance="basic" effect="none" />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
            md: 6,
          }}
        >
          <ChartCard
            title="Smooth"
            description="Uses smooth line interpolation between each data point."
            api='appearance="smooth"'
          >
            <AreaChart data={mockData} appearance="smooth" effect="none" />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Multiple Series                                                             */
/* -------------------------------------------------------------------------- */

export const MultipleSeries = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Area Chart Multiple Series"
        description="Multiple series automatically receive colors from the shared graph palette."
      />

      <Box customStyles={heroBox}>
        <AreaChart data={multiSeriesData} appearance="smooth" effect="none" />
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Series Colors                                                               */
/* -------------------------------------------------------------------------- */

export const CustomSeriesColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Area Chart Series Colors"
        description="Override individual line and point colors directly from each series while keeping the default graph palette as the fallback."
      />

      <Box customStyles={heroBox}>
        <AreaChart data={customSeriesData} appearance="smooth" effect="none" />
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Chart Color Configuration                                                   */
/* -------------------------------------------------------------------------- */

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Area Chart Color Configuration"
        description="Override the chart palette and semantic chart colors while preserving root graph variables as defaults."
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
            title="Custom Series Palette"
            description="Overrides the automatic series palette at the chart level."
            api="colors.series"
          >
            <AreaChart
              data={multiSeriesData}
              appearance="smooth"
              effect="none"
              colors={{
                series: ['var(--wci-chart-purple)', 'var(--wci-chart-orange)'],
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
            title="Semantic Colors"
            description="Overrides axis, grid, and tooltip colors through the AreaChart color API."
            api="colors.axisText / colors.grid / colors.tooltip*"
          >
            <AreaChart
              data={multiSeriesData}
              appearance="smooth"
              effect="none"
              colors={{
                axisText: 'var(--wci-chart-purple)',

                axisLine: 'var(--wci-chart-cyan)',

                grid: 'var(--wci-chart-teal)',

                tooltipBackground: 'var(--wci-chart-tooltip-background)',

                tooltipText: 'var(--wci-chart-tooltip-text)',

                tooltipBorder: 'var(--wci-chart-purple)',
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Color Precedence                                                            */
/* -------------------------------------------------------------------------- */

export const ColorPrecedence = () => {
  const data: AreaChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

    series: [
      {
        label: 'Revenue',

        data: [300, 450, 400, 620, 580, 760],

        color: 'var(--wci-chart-red)',
      },

      {
        label: 'Forecast',

        data: [250, 390, 430, 540, 610, 700],
      },
    ],
  };

  return (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="ECharts Area Chart Color Precedence"
          description="Series-level colors override chart-level palette colors, while series without an explicit color continue using the chart palette."
        />

        <Box customStyles={heroBox}>
          <AreaChart
            data={data}
            appearance="smooth"
            effect="none"
            colors={{
              series: ['var(--wci-chart-purple)', 'var(--wci-chart-teal)'],
            }}
          />
        </Box>
      </div>
    </main>
  );
};

/* -------------------------------------------------------------------------- */
/* Crosshair                                                                   */
/* -------------------------------------------------------------------------- */

export const WithCrosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Area Chart With Crosshair"
        description="Enable a cross-axis pointer for precise category and value inspection."
      />

      <Box customStyles={heroBox}>
        <AreaChart
          data={mockData}
          appearance="smooth"
          effect="none"
          options={{
            crosshair: true,

            tooltip: {
              trigger: 'axis',

              axisPointer: {
                type: 'cross',

                snap: true,

                crossStyle: {
                  color: 'var(--wci-chart-axis-text)',

                  width: 1,

                  type: 'dashed',
                },

                lineStyle: {
                  color: 'var(--wci-chart-axis-text)',

                  width: 1,

                  type: 'dashed',
                },

                label: {
                  show: true,

                  color: 'var(--wci-chart-tooltip-text)',

                  backgroundColor: 'var(--wci-chart-tooltip-background)',
                },
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Custom Tooltip                                                              */
/* -------------------------------------------------------------------------- */

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Area Chart Custom Tooltip"
        description="Customize native ECharts tooltip behavior through the advanced options API."
      />

      <Box customStyles={heroBox}>
        <AreaChart
          data={mockData}
          appearance="smooth"
          effect="none"
          colors={{
            tooltipBackground: 'var(--wci-chart-tooltip-background)',

            tooltipText: 'var(--wci-chart-tooltip-text)',

            tooltipBorder: 'var(--wci-chart-purple)',
          }}
          options={{
            tooltip: {
              borderWidth: 2,

              padding: 14,

              textStyle: {
                fontSize: 13,
              },

              extraCssText: 'border-radius: 10px;',

              axisPointer: {
                type: 'line',

                lineStyle: {
                  width: 1,

                  type: 'dashed',
                },
              },
            },
          }}
        />
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
    description="Bounce gives the area chart a pronounced entrance animation that helps the visualization stand out on first render."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble adds a subtle back-and-forth motion to the area chart for a more expressive animated entrance."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic gives the area chart a spring-like entrance while keeping the animation focused on the line and filled area."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive trace reveals the area chart gradually across the plotted data, making it useful for trend storytelling."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide combines a spring-like entrance with a smooth transition for a refined area chart animation."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered reveal delays the animation across plotted points so users can visually follow the area chart data sequence."
  />
);

/* -------------------------------------------------------------------------- */
/* Custom Styles                                                               */
/* -------------------------------------------------------------------------- */

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Area Chart Custom Styles"
        description="Use customStyles for structural presentation while chart colors are controlled through data, colors, and advanced ECharts options."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling
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
            description="Structural wrapper styling remains separate from chart color configuration."
            api="customStyles.wrapper"
          >
            <AreaChart
              data={mockData}
              appearance="smooth"
              effect="staggered-reveal"
              customStyles={{
                wrapper: customWrapper,
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
            title="Dark Surface"
            description="The chart can be placed on a custom visual surface while semantic colors are supplied through the color API."
            api="customStyles.wrapper + colors"
          >
            <AreaChart
              data={mockData}
              appearance="smooth"
              effect="staggered-reveal"
              customStyles={{
                wrapper: darkChartWrapper,
              }}
              colors={{
                axisText: 'var(--wci-gray-100)',

                axisLine: 'var(--wci-gray-600)',

                grid: 'var(--wci-gray-700)',

                tooltipBackground: 'var(--wci-chart-tooltip-background)',

                tooltipText: 'var(--wci-chart-tooltip-text)',

                tooltipBorder: 'var(--wci-chart-tooltip-border)',
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
          }}
        >
          <ChartCard
            title="Data Zoom"
            description="Interactive ECharts data zoom remains available through the advanced options API."
            api="options.dataZoom"
          >
            <AreaChart
              data={mockData}
              appearance="smooth"
              effect="staggered-reveal"
              options={{
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
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Download                                                                    */
/* -------------------------------------------------------------------------- */

export const WithDownload = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Area Chart Download"
        description="Enable the shared chart download control and choose its placement."
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
            title="Top Right"
            description="Displays the download action in the top-right position."
            api='showDownload downloadPlacement="top-right"'
          >
            <AreaChart
              data={mockData}
              appearance="smooth"
              effect="none"
              showDownload
              downloadPlacement="top-right"
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
            title="Bottom Right"
            description="Displays the download action in the bottom-right position."
            api='showDownload downloadPlacement="bottom-right"'
          >
            <AreaChart
              data={mockData}
              appearance="smooth"
              effect="none"
              showDownload
              downloadPlacement="bottom-right"
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
