/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import type {
  FunnelChartColors,
  FunnelChartEffect,
} from '@/components/echarts/components/funnel-chart/FunnelChart.types';
import { FunnelChart } from '@/components/echarts/components';

const meta: Meta<typeof FunnelChart> = {
  title: 'components/ECharts/FunnelChart',
  component: FunnelChart,
};

export default meta;

const mockData = {
  labels: ['Awareness', 'Interest', 'Decision', 'Action', 'Retention'],
  series: [
    {
      label: 'Sales Pipeline',
      data: [100, 80, 60, 40, 20],
    },
  ],
};

const customColors: FunnelChartColors = {
  series: ['#13c34d', '#1619c7', '#089ab7', '#d61414', '#cd0ec7'],
  axisText: '#334155',
  axisLine: '#ffffff',
  grid: '#e2e8f0',
  tooltipBackground: '#ffffff',
  tooltipText: '#0f172a',
  tooltipBorder: '#cbd5e1',
};

const softColors: FunnelChartColors = {
  series: ['#f5456e', '#3d9eff', '#59cc26', '#ffae00', '#ff784d'],
  axisText: '#475569',
  axisLine: '#ffffff',
  grid: '#e2e8f0',
  tooltipBackground: '#ffffff',
  tooltipText: '#0f172a',
  tooltipBorder: '#cbd5e1',
};

const darkColors: FunnelChartColors = {
  series: ['#f5456e', '#3d9eff', '#59cc26', '#ffae00', '#ff784d'],
  axisText: '#e2e8f0',
  axisLine: '#12151f',
  grid: '#334155',
  tooltipBackground: '#12151f',
  tooltipText: '#ffffff',
  tooltipBorder: '#475569',
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
  padding: 32px;
  border-radius: 16px;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border-radius: 14px;
`;

const chartShell = css`
  width: 100%;
  min-height: 650px;
`;

const codePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-family: monospace;
  font-size: 12px;
`;

const customSurface = css`
  padding: 24px;
  border-radius: 16px;
  background: #fffbeb;
`;

const darkSurface = css`
  padding: 24px;
  border-radius: 16px;
  background: #12151f;
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
  readonly effect: FunnelChartEffect;
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
            <FunnelChart data={mockData} effect={effect} />
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
        title="Default ECharts Funnel Chart"
        description="Default funnel chart using the shared semantic chart color system."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <FunnelChart data={mockData} effect="none" />
        </div>
      </Box>
    </div>
  </main>
);

export const WithCrosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Funnel With Crosshair"
        description="Enable pointer crosshair inspection through the chart-level crosshair option."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <FunnelChart
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

export const PyramidAscending = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Pyramid Ascending"
        description="Use ascending sort to render the funnel values from smallest to largest."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <FunnelChart
            data={mockData}
            effect="none"
            options={{
              sort: 'ascending',
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const FunnelAlignment = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Funnel Alignment"
        description="Compare center, left, and right funnel alignment using the chart-level funnelAlign option."
      />
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Center Alignment"
            description="Default center funnel alignment."
            api='options.funnelAlign="center"'
          >
            <FunnelChart
              data={mockData}
              effect="none"
              colors={softColors}
              options={{
                funnelAlign: 'center',
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Left Alignment"
            description="Align funnel stages toward the left side."
            api='options.funnelAlign="left"'
          >
            <FunnelChart
              data={mockData}
              effect="none"
              colors={softColors}
              options={{
                funnelAlign: 'left',
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Right Alignment"
            description="Align funnel stages toward the right side."
            api='options.funnelAlign="right"'
          >
            <FunnelChart
              data={mockData}
              effect="none"
              colors={softColors}
              options={{
                funnelAlign: 'right',
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const FunnelGap = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Funnel Stage Gap"
        description="Control the spacing between funnel stages using the gap option."
      />
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, lg: 6 }}>
          <ChartCard
            title="Compact Funnel"
            description="Removes spacing between funnel stages."
            api="options.gap=0"
          >
            <FunnelChart
              data={mockData}
              effect="none"
              options={{
                gap: 0,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, lg: 6 }}>
          <ChartCard
            title="Spaced Funnel"
            description="Adds more visual separation between stages."
            api="options.gap=12"
          >
            <FunnelChart
              data={mockData}
              effect="none"
              options={{
                gap: 12,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const FunnelSize = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Funnel Size Range"
        description="Control the minimum and maximum funnel segment width."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <FunnelChart
            data={mockData}
            effect="none"
            options={{
              minSize: '20%',
              maxSize: '90%',
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const LegendVisibility = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Funnel Legend"
        description="Control legend visibility through the chart-level showLegend option."
      />
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, lg: 6 }}>
          <ChartCard
            title="Legend Visible"
            description="Displays the funnel stage legend."
            api="options.showLegend=true"
          >
            <FunnelChart
              data={mockData}
              effect="none"
              options={{
                showLegend: true,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, lg: 6 }}>
          <ChartCard
            title="Legend Hidden"
            description="Removes the legend to provide more space for the funnel."
            api="options.showLegend=false"
          >
            <FunnelChart
              data={mockData}
              effect="none"
              options={{
                showLegend: false,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const BoldLabelsAndLegends = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bold Funnel Labels and Legends"
        description="Use chart-level options to emphasize funnel labels and legend text."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <FunnelChart
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

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Funnel Colors"
        description="Override funnel segment colors and semantic chart tokens through the colors prop."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <FunnelChart data={mockData} effect="none" colors={customColors} />
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
        description="Customize ECharts tooltip behavior while using semantic colors for tooltip styling."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <FunnelChart
            data={mockData}
            effect="none"
            colors={{
              tooltipBackground: '#ffffff',
              tooltipText: '#0f172a',
              tooltipBorder: '#e2e8f0',
            }}
            options={{
              tooltip: {
                trigger: 'item',
                borderWidth: 1,
                padding: 12,
                formatter: '{b}: <b>{c}</b>',
              },
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
    description="Bounce animation gives the funnel chart a dynamic entrance."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble animation gives the funnel chart a playful entrance."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic animation adds spring-like movement to the funnel chart."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive trace reveals the funnel stages over time."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide gives the funnel chart a smooth animated entrance."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered reveal progressively animates the funnel stages."
  />
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Funnel Custom Styles"
        description="Use semantic chart colors for chart content and renderer custom styles for the surrounding surface."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Behavior
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, lg: 6 }}>
          <ChartCard
            title="Custom Palette"
            description="Overrides funnel segment colors through the semantic colors API."
            api="colors.series"
          >
            <FunnelChart
              data={mockData}
              effect="none"
              colors={customColors}
              options={{
                boldLabels: true,
              }}
              rendererCustomStyles={{
                container: customSurface,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, lg: 6 }}>
          <ChartCard
            title="Dark Executive"
            description="Dark funnel surface using semantic chart colors and renderer styling."
            api="rendererCustomStyles.container"
          >
            <FunnelChart
              data={mockData}
              effect="none"
              colors={darkColors}
              options={{
                isBoxVisible: false,
                boldLabels: true,
                boldLegends: true,
              }}
              rendererCustomStyles={{
                container: darkSurface,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
