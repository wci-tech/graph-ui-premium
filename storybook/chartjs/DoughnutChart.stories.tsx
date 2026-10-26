/** @jsxImportSource @emotion/react */
import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import { DoughnutChart } from '@/components/chartjs/components/doughnut-chart/DoughnutChart';
import type {
  DoughnutChartColors,
  DoughnutChartEffect,
} from '@/components/chartjs/components/doughnut-chart/DoughnutChart.types';

const meta: Meta<typeof DoughnutChart> = {
  title: 'components/chartjs/DoughnutChart',
  component: DoughnutChart,
};

export default meta;

const mockData = {
  labels: ['Desktop', 'Mobile', 'Tablet', 'Other', 'TV'],
  data: [45, 22, 16, 10, 7],
};

const revenueData = {
  labels: ['Search Engine', 'Direct', 'Email', 'Union Ads', 'Video Ads'],
  data: [1048, 735, 580, 484, 300],
};

const customColors: DoughnutChartColors = {
  series: ['#3d148e', '#3d9eff', '#59cc26', '#ffae00', '#ff784d'],
  border: '#ffffff',
  legendText: '#f5456e',
  tooltipBackground: '#ffffff',
  tooltipText: '#111827',
  tooltipBorder: '#f5456e',
};

const darkColors: DoughnutChartColors = {
  series: ['#f5456e', '#3d9eff', '#59cc26', '#ffae00', '#ff784d'],
  border: '#0f172a',
  legendText: '#f8fafc',
  tooltipBackground: '#020617',
  tooltipText: '#f8fafc',
  tooltipBorder: '#475569',
};

const softColors: DoughnutChartColors = {
  series: ['#fb7185', '#60a5fa', '#86efac', '#fbbf24', '#fb923c'],
  border: '#ffffff',
  legendText: '#334155',
  tooltipBackground: '#ffffff',
  tooltipText: '#334155',
  tooltipBorder: '#e2e8f0',
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

const customChartStyles = css`
  border-radius: 12px;
`;

const darkChartStyles = css`
  overflow: hidden;
  border-radius: 12px;
  background: #0f172a;
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
            <DoughnutChart {...mockData} effect={effect} />
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
        title="Default ChartJS Doughnut Chart"
        description="Default doughnut chart using the shared chart palette and token system with no chart-specific color variables."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart {...mockData} effect="none" />
      </Box>
    </div>
  </main>
);

export const ColorPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Doughnut Color Palette"
        description="Customize segment, legend, border, and tooltip colors through the Doughnut colors API."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Color Palette
      </Typography>
      <Box customStyles={heroBox}>
        <DoughnutChart {...mockData} colors={customColors} effect="none" />
      </Box>
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectStory effect="bounce" title="Bounce Effect" description="Bounce entrance animation." />
);

export const WobbleEffect = () => (
  <EffectStory effect="wobble" title="Wobble Effect" description="Wobble entrance animation." />
);

export const ElasticEffect = () => (
  <EffectStory effect="elastic" title="Elastic Effect" description="Elastic entrance animation." />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive doughnut chart reveal animation."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide entrance animation."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered doughnut segment reveal animation."
  />
);

export const LegendRight = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Doughnut Legend Right"
        description="Doughnut chart with the legend positioned on the right side."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          {...mockData}
          effect="none"
          options={{
            plugins: {
              legend: {
                position: 'right',
              },
            },
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
        title="ChartJS Doughnut Large Hole"
        description="Doughnut chart with a larger center cutout for a thinner ring."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          {...mockData}
          effect="none"
          options={{
            innerRadius: '78%',
          }}
        />
      </Box>
    </div>
  </main>
);

export const SmallerHole = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Doughnut Smaller Hole"
        description="Doughnut chart with a smaller center cutout for a thicker ring."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          {...mockData}
          effect="none"
          options={{
            innerRadius: '45%',
          }}
        />
      </Box>
    </div>
  </main>
);

export const SoftPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Doughnut Soft Palette"
        description="Doughnut chart using a softer color palette through the colors prop."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart {...mockData} colors={softColors} effect="none" />
      </Box>
    </div>
  </main>
);

export const HiddenLegend = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Doughnut Hidden Legend"
        description="Doughnut chart with the legend hidden."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          {...mockData}
          effect="none"
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
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
        title="ChartJS Doughnut Bold Legend"
        description="Doughnut chart using bold legend labels through the chart options."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          {...mockData}
          effect="none"
          options={{
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
        title="ChartJS Doughnut Custom Tooltip"
        description="Doughnut chart with customized tooltip styling and callbacks."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          {...revenueData}
          effect="none"
          options={{
            plugins: {
              tooltip: {
                backgroundColor: '#ffffff',
                borderColor: '#f5456e',
                borderWidth: 2,
                cornerRadius: 10,
                padding: 14,
                titleColor: '#111827',
                titleFont: {
                  size: 15,
                  weight: 'bold',
                },
                bodyColor: '#000000',
                bodyFont: {
                  size: 13,
                },
                displayColors: false,
                caretSize: 8,
                callbacks: {
                  label: (context: { parsed?: number }) => `Total Visits : ${context.parsed ?? 0}`,
                  afterLabel: () => 'Growth: +18.4%',
                },
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const ClickHandling = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Doughnut Click Handling"
        description="Click a doughnut segment to trigger consumer-defined behavior."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart
          {...mockData}
          effect="none"
          options={{
            chartBackground: '#f1f5f9',
            onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
              const firstElement = elements[0];

              if (!firstElement) {
                return;
              }

              const label = mockData.labels[firstElement.index];
              const value = mockData.data[firstElement.index];

              alert(`API Call for ${label}\nValue: ${value}\nStatus: Fetching details...`);
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const Download = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Doughnut Download"
        description="Doughnut chart with the shared chart download control enabled."
      />
      <Box customStyles={heroBox}>
        <DoughnutChart {...mockData} effect="none" showDownload downloadPlacement="top-right" />
      </Box>
    </div>
  </main>
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Doughnut Custom Styles"
        description="Examples combining the new colors API, custom inner radius, legend styling, chart backgrounds, and wrapper styles."
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
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Color Palette"
            description="Segment, border, legend, and tooltip colors are configured through the new colors prop."
            api="colors + options + customStyles.wrapper"
          >
            <DoughnutChart
              {...mockData}
              colors={customColors}
              effect="staggered-reveal"
              customStyles={{
                wrapper: customChartStyles,
              }}
              options={{
                chartBackground: '#fffbeb',
                boldLegends: true,
                innerRadius: '65%',
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Dark Trading Surface"
            description="Dark chart surface using the colors prop instead of Doughnut-specific CSS variables."
            api="colors + options.chartBackground + customStyles.wrapper"
          >
            <DoughnutChart
              {...mockData}
              colors={darkColors}
              effect="staggered-reveal"
              customStyles={{
                wrapper: darkChartStyles,
              }}
              options={{
                chartBackground: '#0f172a',
                innerRadius: '68%',
                boldLegends: true,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
