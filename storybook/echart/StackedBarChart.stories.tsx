/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { StackedBarChart } from '@/components/echarts/components';
import type {
  StackedBarChartColors,
  StackedBarChartEffect,
} from '@/components/echarts/components/stacked-bar-chart/StackedBarChart.types';

const meta: Meta<typeof StackedBarChart> = {
  title: 'components/ECharts/StackedBarChart',
  component: StackedBarChart,
};

export default meta;

const mockData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    {
      label: 'Direct',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      label: 'Email',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      label: 'Search',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      label: 'Social',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      label: 'Ads',
      data: [60, 80, 110, 130, 140, 160, 190],
    },
  ],
};

const customColors: StackedBarChartColors = {
  series: ['#1d13b1', '#0ec134', '#f60934', '#ffae00', '#ff784d'],
  axisText: '#111827',
  axisLine: '#cbd5e1',
  grid: '#e2e8f0',
  tooltipBackground: '#ffffff',
  tooltipText: '#111827',
  tooltipBorder: '#e2e8f0',
};

const softColors: StackedBarChartColors = {
  series: ['#fecdd3', '#bfdbfe', '#bbf7d0', '#fde68a', '#fed7aa'],
  axisText: '#334155',
  axisLine: '#cbd5e1',
  grid: '#e2e8f0',
  tooltipBackground: '#ffffff',
  tooltipText: '#334155',
  tooltipBorder: '#e2e8f0',
};

const darkColors: StackedBarChartColors = {
  series: ['#fb7185', '#60a5fa', '#86efac', '#fbbf24', '#fb923c'],
  axisText: '#f8fafc',
  axisLine: '#475569',
  grid: '#334155',
  tooltipBackground: '#020617',
  tooltipText: '#ffffff',
  tooltipBorder: '#334155',
};

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  margin-bottom: 16px;
  color: var(--wci-chart-axis-text);
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH2 = css`
  margin-bottom: 12px;
  padding: 16px 0;
  color: var(--wci-chart-axis-text);
  font-size: 1.875rem;
  font-weight: 600;
`;

const titleH3 = css`
  margin-bottom: 8px;
  color: var(--wci-chart-axis-text);
  font-size: 1.35rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  color: var(--wci-chart-axis-text);
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  color: var(--wci-chart-axis-text);
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
  width: 100%;
  min-height: 650px;
  margin-top: 20px;
`;

const codePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border: 1px solid var(--wci-chart-axis-line);
  border-radius: 999px;
  color: var(--wci-chart-axis-text);
  font-family: monospace;
  font-size: 12px;
`;

const darkSurface = css`
  background: #0f172a;
`;

const transparentSurface = css`
  background: transparent;
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
  readonly children: React.ReactNode;
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
  readonly effect: StackedBarChartEffect;
  readonly title: string;
  readonly description: string;
}) => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title={title} description={description} />
      <Box customStyles={heroBox}>
        <FlexLayout direction="column" gap="16px">
          <Typography variant="span" customStyles={codePill}>
            effect="{effect}"
          </Typography>
          <div css={chartShell}>
            <StackedBarChart data={mockData} effect={effect} />
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
        title="Default ECharts Stacked Bar Chart"
        description="Default vertical stacked bar chart using the shared WCI chart color system."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart data={mockData} effect="none" />
        </div>
      </Box>
    </div>
  </main>
);

export const Horizontal = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Horizontal ECharts Stacked Bar Chart"
        description="Horizontal stacked bars with category labels on the Y axis and values on the X axis."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart
            data={mockData}
            effect="none"
            options={{
              horizontal: true,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const WithCrosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Bar Crosshair"
        description="Enables the opt-in crosshair axis pointer."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart
            data={mockData}
            effect="none"
            options={{
              crosshair: true,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Uses the bounce animation effect for the stacked bar chart."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Uses the wobble animation effect for the stacked bar chart."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Uses the elastic animation effect for the stacked bar chart."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressively reveals the stacked bar chart."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Uses the elastic glide animation effect for the stacked bar chart."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Reveals the stacked bar series using a staggered animation."
  />
);

export const AllEffects = () => {
  const effects: readonly StackedBarChartEffect[] = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
  ];

  return (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Stacked Bar Effects"
          description="Comparison of all supported ECharts stacked bar animation effects."
        />
        <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
          {effects.map((effect) => (
            <FlexItem key={effect} columnSpan={{ default: 12 }}>
              <ChartCard
                title={effect}
                description={`Stacked bar chart using the ${effect} effect.`}
                api={`effect="${effect}"`}
              >
                <StackedBarChart data={mockData} effect={effect} />
              </ChartCard>
            </FlexItem>
          ))}
        </FlexLayout>
      </div>
    </main>
  );
};

export const HiddenLegend = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Hidden Legend"
        description="Hides the legend using the stacked bar options API."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart
            data={mockData}
            effect="none"
            options={{
              showLegend: false,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const BoldLabelsAndLegends = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bold Labels and Legends"
        description="Uses bold axis labels and legend text."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart
            data={mockData}
            effect="none"
            options={{
              boldLabels: true,
              boldLegends: true,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const CustomBarWidth = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Bar Width"
        description="Controls the width and maximum width of each stacked bar."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart
            data={mockData}
            effect="none"
            options={{
              barWidth: 32,
              maxBarWidth: 32,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const CustomStackId = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Stack ID"
        description="Uses a custom stack identifier for all stacked bar series."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart
            data={mockData}
            effect="none"
            options={{
              stackId: 'traffic',
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Tooltip"
        description="Customizes tooltip formatting while preserving stacked bar behavior."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart
            data={mockData}
            effect="none"
            options={{
              tooltip: {
                trigger: 'axis',
                padding: 14,
                valueFormatter: (value: unknown) => `${String(value)} visits`,
              },
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const ZoomControl = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Zoom Control"
        description="Adds inside and slider zoom controls to the stacked bar chart."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart
            data={mockData}
            effect="none"
            options={{
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
      </Box>
    </div>
  </main>
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Colors"
        description="Overrides the shared stacked bar color configuration through the colors prop."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart data={mockData} colors={customColors} effect="none" />
        </div>
      </Box>
    </div>
  </main>
);

export const SoftPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Soft Palette"
        description="Uses a softer palette through the new colors API."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart data={mockData} colors={softColors} effect="none" />
        </div>
      </Box>
    </div>
  </main>
);

export const DatasetColorOverrides = () => {
  const data = {
    ...mockData,
    series: mockData.series.map((series, index) => ({
      ...series,
      color: ['#6366f1', '#14b8a6', '#22c55e', '#f59e0b', '#ef4444'][index],
    })),
  };

  return (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Dataset Color Overrides"
          description="Individual series colors take precedence over the shared series palette."
        />
        <Box customStyles={heroBox}>
          <div css={chartShell}>
            <StackedBarChart data={data} effect="none" />
          </div>
        </Box>
      </div>
    </main>
  );
};

export const RoundedBars = () => {
  const data = {
    ...mockData,
    series: mockData.series.map((series, index) => ({
      ...series,
      ...(index === mockData.series.length - 1 ? { borderRadius: 12 } : {}),
    })),
  };

  return (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Rounded Terminal Segment"
          description="Uses the dataset borderRadius API to round the terminal stacked series."
        />
        <Box customStyles={heroBox}>
          <div css={chartShell}>
            <StackedBarChart data={data} effect="none" />
          </div>
        </Box>
      </div>
    </main>
  );
};

export const HorizontalRoundedBars = () => {
  const data = {
    ...mockData,
    series: mockData.series.map((series, index) => ({
      ...series,
      ...(index === mockData.series.length - 1 ? { borderRadius: 12 } : {}),
    })),
  };

  return (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Horizontal Rounded Stacked Bar"
          description="Uses the same terminal-series radius API with horizontal stacked bars."
        />
        <Box customStyles={heroBox}>
          <div css={chartShell}>
            <StackedBarChart
              data={data}
              effect="none"
              options={{
                horizontal: true,
              }}
            />
          </div>
        </Box>
      </div>
    </main>
  );
};

export const DarkSurface = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Dark Surface"
        description="Uses the colors API together with renderer container styling for a dark chart surface."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart
            data={mockData}
            colors={darkColors}
            effect="none"
            rendererCustomStyles={{
              container: darkSurface,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const TransparentChartBox = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Transparent Chart Container"
        description="Applies a transparent renderer container without changing chart data or behavior."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart
            data={mockData}
            effect="none"
            rendererCustomStyles={{
              container: transparentSurface,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const CustomHeight = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Height"
        description="Controls chart height through renderer container styles."
      />
      <Box customStyles={heroBox}>
        <StackedBarChart
          data={mockData}
          effect="none"
          rendererCustomStyles={{
            container: css`
              min-height: 760px;
            `,
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
        title="Stacked Bar Customization"
        description="Examples of the current colors, renderer styles, horizontal layout, and dataset APIs."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Behavior
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Custom Colors"
            description="Overrides series, axis, grid, and tooltip colors through the colors prop."
            api="colors"
          >
            <StackedBarChart data={mockData} colors={customColors} effect="none" />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Dark Surface"
            description="Combines semantic chart colors with renderer container styling."
            api="colors + rendererCustomStyles.container"
          >
            <StackedBarChart
              data={mockData}
              colors={darkColors}
              effect="none"
              rendererCustomStyles={{
                container: darkSurface,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Horizontal"
            description="Switches category and value axes through the horizontal option."
            api="options.horizontal"
          >
            <StackedBarChart
              data={mockData}
              effect="none"
              options={{
                horizontal: true,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Crosshair"
            description="Enables the crosshair only when explicitly requested."
            api="options.crosshair"
          >
            <StackedBarChart
              data={mockData}
              effect="none"
              options={{
                crosshair: true,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const WithoutDownload = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title="Without Download" description="Disables the chart download control." />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart data={mockData} effect="none" showDownload={false} />
        </div>
      </Box>
    </div>
  </main>
);

export const CustomTestId = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Test ID"
        description="Provides a custom data-testid for automated testing."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <StackedBarChart
            data={mockData}
            effect="none"
            testId="custom-echarts-stacked-bar-chart"
          />
        </div>
      </Box>
    </div>
  </main>
);
