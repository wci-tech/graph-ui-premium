/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { DoughnutChart } from '@/components/echarts/components';
import type {
  DoughnutChartColors,
  DoughnutChartData,
  DoughnutChartEffect,
} from '@/components/echarts/components/doughnut-chart/DoughnutChart.types';

const meta: Meta<typeof DoughnutChart> = {
  title: 'components/echarts/DoughnutChart',
  component: DoughnutChart,
};

export default meta;

const mockData: DoughnutChartData = {
  labels: ['Desktop', 'Mobile', 'Tablet', 'Other', 'TV'],
  series: [
    {
      label: 'Device Traffic',
      data: [45, 22, 16, 10, 7],
    },
  ],
};

const customColors: DoughnutChartColors = {
  series: [
    'var(--wci-chart-purple)',
    'var(--wci-chart-blue)',
    'var(--wci-chart-green)',
    'var(--wci-chart-orange)',
    'var(--wci-chart-red)',
  ],
  legendText: 'var(--wci-chart-axis-text)',
  border: 'var(--wci-chart-tooltip-background)',
  tooltipBackground: 'var(--wci-chart-tooltip-background)',
  tooltipText: 'var(--wci-chart-tooltip-text)',
  tooltipBorder: 'var(--wci-chart-tooltip-border)',
};

const alternateColors: DoughnutChartColors = {
  series: [
    'var(--wci-chart-magenta)',
    'var(--wci-chart-cyan)',
    'var(--wci-chart-yellow)',
    'var(--wci-chart-teal)',
    'var(--wci-chart-purple)',
  ],
};

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const titleH2 = css`
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 12px;
  padding: 16px;
`;

const titleH3 = css`
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const paragraph = css`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const paragraphSmall = css`
  font-size: 0.95rem;
  line-height: 1.5;
`;

const heroBox = css`
  padding: 32px !important;
  border-radius: 16px;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border-radius: 14px;
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
  font-family: monospace;
  font-size: 12px;
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
  readonly effect: DoughnutChartEffect;
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
            <DoughnutChart
              data={mockData}
              effect={effect}
              options={{
                height: 420,
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
        title="Default ECharts Doughnut Chart"
        description="Default ECharts doughnut chart using the shared chart color palette and token system."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          data={mockData}
          effect="none"
          options={{
            height: 420,
          }}
        />
      </Box>
    </div>
  </main>
);

export const ColorPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Doughnut Color Palette"
        description="Doughnut segments can use the shared chart color tokens through the colors API."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Shared Chart Palette
      </Typography>
      <Box customStyles={heroBox}>
        <DoughnutChart
          data={mockData}
          colors={customColors}
          effect="none"
          options={{
            height: 420,
          }}
        />
      </Box>
    </div>
  </main>
);

export const DoughnutProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressively reveals the doughnut chart for a smooth first-load animation."
  />
);

export const DoughnutBounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Adds a bounce entrance animation to emphasize the doughnut chart."
  />
);

export const DoughnutWobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Applies a playful wobble animation as the doughnut chart appears."
  />
);

export const DoughnutElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Creates a spring-like entrance animation for the doughnut chart."
  />
);

export const DoughnutElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Combines a smooth glide with an elastic finish for the doughnut chart."
  />
);

export const DoughnutStaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Animates the doughnut chart with a staggered reveal sequence."
  />
);

export const LegendRight = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Doughnut Legend Right"
        description="Doughnut chart with a vertical legend positioned on the right side."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          data={mockData}
          effect="none"
          options={{
            height: 420,
            legend: {
              show: true,
              orient: 'vertical',
              right: '5%',
              top: 'center',
            },
            series: [
              {
                center: ['38%', '50%'],
              },
            ],
          }}
        />
      </Box>
    </div>
  </main>
);

export const LargeHole = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Doughnut Large Hole"
        description="Doughnut chart using the dedicated innerRadius and outerRadius options for a thinner ring."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          data={mockData}
          effect="none"
          options={{
            height: 420,
            innerRadius: '70%',
            outerRadius: '88%',
          }}
        />
      </Box>
    </div>
  </main>
);

export const SmallHole = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Doughnut Small Hole"
        description="Doughnut chart using a smaller inner radius for a thicker ring."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          data={mockData}
          effect="none"
          options={{
            height: 420,
            innerRadius: '42%',
            outerRadius: '88%',
          }}
        />
      </Box>
    </div>
  </main>
);

export const RoundedCorners = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Doughnut Rounded Corners"
        description="Doughnut chart overriding the generated series item style with softer rounded segment edges."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          data={mockData}
          effect="none"
          options={{
            height: 420,
            series: [
              {
                itemStyle: {
                  borderRadius: 18,
                },
              },
            ],
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
        title="ECharts Doughnut Custom Tooltip"
        description="Doughnut chart using the colors API for tooltip tokens with a custom ECharts tooltip formatter."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          data={mockData}
          colors={customColors}
          effect="none"
          options={{
            height: 420,
            tooltip: {
              formatter: '{b}<br/>Value: <b>{c}</b><br/>Share: {d}%',
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const AlternatePalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Doughnut Alternate Palette"
        description="Doughnut chart using an alternate selection of shared chart color tokens."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          data={mockData}
          colors={alternateColors}
          effect="none"
          options={{
            height: 420,
          }}
        />
      </Box>
    </div>
  </main>
);

export const HiddenLegend = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Doughnut Hidden Legend"
        description="Doughnut chart with the legend disabled through the chart convenience option."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          data={mockData}
          effect="none"
          options={{
            height: 420,
            showLegend: false,
          }}
        />
      </Box>
    </div>
  </main>
);

export const BoldLegend = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Doughnut Bold Legend"
        description="Doughnut chart with bold legend labels using the chart convenience option."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          data={mockData}
          effect="none"
          options={{
            height: 420,
            boldLabels: true,
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
        title="ECharts Doughnut Custom Styles"
        description="Examples showing the new colors API, legend configuration, custom radii, tooltip configuration, and ECharts series overrides."
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
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Colors"
            description="Overrides segment, legend, border, and tooltip colors through the colors API."
            api="colors"
          >
            <DoughnutChart
              data={mockData}
              colors={customColors}
              effect="none"
              options={{
                height: 420,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Alternate Palette"
            description="Uses another selection of shared chart tokens without defining Doughnut-specific CSS variables."
            api="colors.series"
          >
            <DoughnutChart
              data={mockData}
              colors={alternateColors}
              effect="none"
              options={{
                height: 420,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Radius"
            description="Uses the dedicated radius API instead of manually overriding the generated ECharts series radius."
            api="options.innerRadius + options.outerRadius"
          >
            <DoughnutChart
              data={mockData}
              effect="none"
              options={{
                height: 420,
                innerRadius: '72%',
                outerRadius: '90%',
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Legend Right"
            description="Uses standard ECharts legend and series overrides while preserving the generated Doughnut configuration."
            api="options.legend + options.series"
          >
            <DoughnutChart
              data={mockData}
              effect="none"
              options={{
                height: 420,
                legend: {
                  show: true,
                  orient: 'vertical',
                  right: '5%',
                  top: 'center',
                },
                series: [
                  {
                    center: ['38%', '50%'],
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
