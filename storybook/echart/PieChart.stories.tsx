/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { PieChart } from '@/components/echarts/components';
import type {
  PieChartColors,
  PieChartEffect,
} from '@/components/echarts/components/pie-chart/PieChart.types';

const meta: Meta<typeof PieChart> = {
  title: 'components/echarts/PieChart',
  component: PieChart,
};

export default meta;

const mockData = {
  labels: ['Chrome', 'Safari', 'Edge', 'Firefox', 'Other'],
  data: [45, 25, 15, 10, 5],
};

const revenueData = {
  labels: ['Search Engine', 'Direct', 'Email', 'Union Ads', 'Video Ads'],
  data: [1048, 735, 580, 484, 300],
};

const customColors: PieChartColors = {
  series: [
    'var(--wci-chart-purple)',
    'var(--wci-chart-cyan)',
    'var(--wci-chart-green)',
    'var(--wci-chart-yellow)',
    'var(--wci-chart-blue)',
  ],
  label: 'var(--wci-chart-purple)',
  border: 'var(--wci-white)',
  crosshair: 'var(--wci-chart-purple)',
  tooltipBackground: 'var(--wci-black)',
  tooltipText: 'var(--wci-white)',
  tooltipBorder: 'var(--wci-chart-purple)',
};

const softColors: PieChartColors = {
  series: [
    'var(--wci-chart-red)',
    'var(--wci-chart-blue)',
    'var(--wci-chart-green)',
    'var(--wci-chart-yellow)',
    'var(--wci-chart-orange)',
  ],
  label: 'var(--wci-text-primary)',
  border: 'var(--wci-white)',
  crosshair: 'var(--wci-chart-purple)',
  tooltipBackground: 'var(--wci-overlay-white-10)',
  tooltipText: 'var(--wci-black)',
  tooltipBorder: 'var(--wci-chart-purple)',
};

const darkColors: PieChartColors = {
  series: [
    'var(--wci-chart-red)',
    'var(--wci-chart-blue)',
    'var(--wci-chart-green)',
    'var(--wci-chart-orange)',
    'var(--wci-chart-yellow)',
  ],
  label: 'var(--wci-white)',
  border: 'var(--wci-black)',
  crosshair: 'var(--wci-white)',
  tooltipBackground: 'var(--wci-black)',
  tooltipText: 'var(--wci-white)',
  tooltipBorder: 'var(--wci-white)',
};

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  margin-bottom: 16px;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--wci-text-primary);
`;

const titleH2 = css`
  margin-bottom: 12px;
  padding: 16px;
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--wci-text-primary);
`;

const titleH3 = css`
  margin-bottom: 8px;
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--wci-text-primary);
`;

const paragraph = css`
  margin-bottom: 24px;
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--wci-text-secondary);
`;

const paragraphSmall = css`
  font-size: 0.95rem;
  line-height: 1.5;
`;

const heroBox = css`
  padding: 32px;
  border: 1px solid var(--wci-border-color);
  border-radius: 16px;
  background: var(--wci-background-primary);
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border: 1px solid var(--wci-border-color);
  border-radius: 14px;
  background: var(--wci-background-primary);
  box-shadow: 0 10px 25px rgb(15 23 42 / 6%);
`;

const chartShell = css`
  width: 100%;
  height: 650px;
  margin-top: 20px;
`;

const codePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--wci-background-secondary);
  color: var(--wci-text-primary);
  font-family: monospace;
  font-size: 12px;
`;

const darkSurface = css`
  background: var(--wci-black);
`;

interface PageIntroProps {
  readonly title: string;
  readonly description: string;
}

interface ChartCardProps {
  readonly title: string;
  readonly description: string;
  readonly api: string;
  readonly children: ReactNode;
}

interface EffectStoryProps {
  readonly effect: PieChartEffect;
  readonly title: string;
  readonly description: string;
}

const PageIntro = ({ title, description }: PageIntroProps) => (
  <FlexLayout direction="column" gap="8px" fullWidth>
    <Typography variant="h1" customStyles={titleH1}>
      {title}
    </Typography>
    <Typography variant="p" customStyles={paragraph}>
      {description}
    </Typography>
  </FlexLayout>
);

const ChartCard = ({ title, description, api, children }: ChartCardProps) => {
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

const EffectStory = ({ effect, title, description }: EffectStoryProps) => (
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
            <PieChart data={mockData} effect={effect} options={{ height: 650 }} />
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
        title="Default ECharts Pie Chart"
        description="Default ECharts pie chart using the shared chart color system with outside labels."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart data={mockData} effect="none" options={{ height: 650 }} />
        </div>
      </Box>
    </div>
  </main>
);

export const Crosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Pie Crosshair"
        description="The crosshair is displayed only when the crosshair option is explicitly enabled."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart
            data={mockData}
            effect="none"
            colors={customColors}
            options={{
              height: 650,
              crosshair: true,
              boldLabels: true,
              boldLegends: true,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const ColorPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Pie Color Palette"
        description="Pie segments use normalized chart colors supplied through the colors API."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Color Palette
      </Typography>
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart data={mockData} effect="none" colors={customColors} options={{ height: 650 }} />
        </div>
      </Box>
    </div>
  </main>
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressively draws the pie chart into view for a smooth first-load animation."
  />
);

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Pie segments animate into place with a lively bounce effect."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Pie segments enter with a subtle wobble for added visual emphasis."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Pie segments animate with a smooth spring-like elastic motion."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Pie segments glide smoothly into position with a soft elastic finish."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Pie segments are revealed one after another to guide the user's attention."
  />
);

export const LegendTop = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Pie Legend Top"
        description="Pie chart with the legend positioned at the top."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart
            data={mockData}
            effect="none"
            options={{
              height: 650,
              legend: {
                show: true,
                top: 0,
                left: 'center',
              },
              series: [
                {
                  center: ['50%', '55%'],
                },
              ],
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const HiddenLegend = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Pie Hidden Legend"
        description="Pie chart with the legend hidden."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart
            data={mockData}
            effect="none"
            options={{
              height: 650,
              legend: {
                show: false,
              },
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const RoundedCorners = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Pie Rounded Corners"
        description="Pie chart with softer rounded segment edges."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart
            data={mockData}
            effect="none"
            options={{
              height: 650,
              series: [
                {
                  itemStyle: {
                    borderRadius: 18,
                  },
                },
              ],
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
        title="ECharts Pie Custom Tooltip"
        description="Pie chart with a custom tooltip formatter while colors remain controlled through the normalized colors API."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart
            data={revenueData}
            effect="none"
            colors={customColors}
            options={{
              height: 650,
              tooltip: {
                formatter: '{b}<br/>Value: <b>{c}</b><br/>Share: {d}%',
              },
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const SoftPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Pie Soft Palette"
        description="Pie chart using an alternate palette through the normalized colors API."
      />
      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart data={mockData} effect="none" colors={softColors} options={{ height: 650 }} />
        </div>
      </Box>
    </div>
  </main>
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Pie Custom Styles"
        description="Examples showing custom chart colors, backgrounds, labels, borders, and renderer behavior."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Behavior
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Colors"
            description="Overrides pie segments, labels, borders, crosshair, and tooltip colors through the colors API."
            api="colors"
          >
            <PieChart
              data={mockData}
              effect="none"
              colors={customColors}
              options={{
                height: 650,
                chartBackground: 'var(--wci-background-secondary)',
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Dark Surface"
            description="Pie chart rendered on a dark surface with chart colors supplied through the colors API."
            api="colors + customStyles.wrapper"
          >
            <PieChart
              data={mockData}
              effect="none"
              colors={darkColors}
              customStyles={{
                wrapper: darkSurface,
              }}
              options={{
                height: 650,
                chartBackground: 'var(--wci-black)',
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
