/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { FunnelChart } from '@/components/chartjs/components/funnel-chart/FunnelChart';
import type {
  FunnelChartColors,
  FunnelChartEffect,
} from '@/components/chartjs/components/funnel-chart/FunnelChart.types';

const meta: Meta<typeof FunnelChart> = {
  title: 'components/ChartJS/FunnelChart',
  component: FunnelChart,
};

export default meta;

const mockData = {
  labels: ['Impressions', 'Clicks', 'Signups', 'Purchase', 'Retention'],
  data: [8000, 6000, 4000, 2000, 1000],
};

const alignmentData = {
  labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
  data: [0.7, 0.66, 0.61, 0.01],
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
  axisLine: '#000000',
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

const horizontalChartShell = css`
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

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Default ChartJS Funnel Chart"
        description="Default funnel chart using the shared chart color system with centered stage labels."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <FunnelChart {...mockData} effect="none" />
        </div>
      </Box>
    </div>
  </main>
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
            <FunnelChart {...mockData} effect={effect} />
          </div>
        </FlexLayout>
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
    description="Wobble animation gives the funnel chart a playful refresh."
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
    description="Staggered reveal animates the funnel stages progressively."
  />
);

export const HorizontalFunnel = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Horizontal ChartJS Funnel Chart"
        description="Use indexAxis to change the funnel orientation."
      />
      <Box customStyles={heroBox}>
        <div css={horizontalChartShell}>
          <FunnelChart
            {...mockData}
            effect="none"
            options={{
              indexAxis: 'x',
              align: 'center',
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
        title="ChartJS Funnel With Crosshair"
        description="Enable crosshair inspection while hovering over funnel stages."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <FunnelChart
            {...mockData}
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

export const FunnelAlignment = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Funnel Alignment"
        description="Compare center, left, and right funnel alignment."
      />
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Center Alignment"
            description="Default center funnel alignment."
            api='options.align="center"'
          >
            <FunnelChart
              {...alignmentData}
              effect="none"
              colors={softColors}
              options={{
                align: 'center',
                indexAxis: 'x',
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Left Alignment"
            description="Funnel segments align from the left edge."
            api='options.align="left"'
          >
            <FunnelChart
              {...alignmentData}
              effect="none"
              colors={softColors}
              options={{
                align: 'left',
                indexAxis: 'x',
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="Right Alignment"
            description="Funnel segments align from the right edge."
            api='options.align="right"'
          >
            <FunnelChart
              {...alignmentData}
              effect="none"
              colors={softColors}
              options={{
                align: 'right',
                indexAxis: 'x',
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
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
              {...mockData}
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
            description="Removes the legend when more chart space is required."
            api="options.showLegend=false"
          >
            <FunnelChart
              {...mockData}
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
        description="Use the chart-level options to emphasize labels and legend text."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <FunnelChart
            {...mockData}
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
        description="Override the shared chart palette and semantic chart tokens through the colors prop."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <FunnelChart {...mockData} effect="none" colors={customColors} />
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
        description="Customize Chart.js tooltip behavior while keeping the Funnel chart semantic color API."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <FunnelChart
            {...mockData}
            effect="none"
            colors={{
              tooltipBackground: '#ffffff',
              tooltipText: '#0f172a',
              tooltipBorder: '#ee1648',
            }}
            options={{
              plugins: {
                tooltip: {
                  enabled: true,
                  borderWidth: 1,
                },
              },
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Funnel Custom Styles"
        description="Use semantic chart colors for chart content and renderer custom styles for the surrounding surface."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Behavior
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, lg: 6 }}>
          <ChartCard
            title="Custom Palette"
            description="Overrides funnel segment colors through the colors API."
            api="colors.series"
          >
            <FunnelChart
              {...mockData}
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
            description="Dark funnel surface with a custom semantic palette and no chart box."
            api="rendererCustomStyles.container"
          >
            <FunnelChart
              {...mockData}
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
