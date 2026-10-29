/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import { PieChart } from '@/components/chartjs/components/pie-chart/PieChart';
import type {
  PieChartColors,
  PieChartEffect,
} from '@/components/chartjs/components/pie-chart/PieChart.types';

const meta: Meta<typeof PieChart> = {
  title: 'components/chartjs/PieChart',
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
  series: ['#f5456e', '#3d9eff', '#59cc26', '#ffae00', '#ff784d'],
  label: '#334155',
  border: '#ffffff',
  crosshair: '#64748b',
  tooltipBackground: '#ffffff',
  tooltipText: '#111827',
  tooltipBorder: '#e2e8f0',
};

const darkColors: PieChartColors = {
  series: ['#f5456e', '#3d9eff', '#59cc26', '#ffae00', '#ff784d'],
  label: '#f8fafc',
  border: '#0f172a',
  crosshair: '#94a3b8',
  tooltipBackground: '#1e293b',
  tooltipText: '#f8fafc',
  tooltipBorder: '#475569',
};

const softColors: PieChartColors = {
  series: ['#fb7185', '#60a5fa', '#86efac', '#fbbf24', '#fb923c'],
  label: '#334155',
  border: '#ffffff',
  crosshair: '#64748b',
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
  height: 650px;
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

const darkSurface = css`
  background-color: #0f172a;
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
            color: var() (--wci-gray-700);
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
  readonly effect: PieChartEffect;
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
            <PieChart {...mockData} effect={effect} />
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
        title="Default ChartJS Pie Chart"
        description="Default pie chart using the resolved ChartJS Pie configuration with bottom legend and no crosshair."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart {...mockData} effect="none" />
        </div>
      </Box>
    </div>
  </main>
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Pie Custom Colors"
        description="Pie chart with explicit series, label, border, crosshair, and tooltip colors."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart {...mockData} effect="none" colors={customColors} />
        </div>
      </Box>
    </div>
  </main>
);

export const SoftPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Pie Soft Palette"
        description="Pie chart using a softer custom series palette through the colors API."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart {...mockData} effect="none" colors={softColors} />
        </div>
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
    description="Progressive chart reveal animation."
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
    description="Staggered reveal animation."
  />
);

export const LegendRight = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Pie Legend Right"
        description="Pie chart with the legend positioned on the right side."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart
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
        </div>
      </Box>
    </div>
  </main>
);

export const LegendTop = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Pie Legend Top"
        description="Pie chart with the legend positioned at the top."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart
            {...mockData}
            effect="none"
            options={{
              plugins: {
                legend: {
                  position: 'top',
                },
              },
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
        title="ChartJS Pie Hidden Legend"
        description="Pie chart with the legend disabled."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart
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
        </div>
      </Box>
    </div>
  </main>
);

export const BoldLegends = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Pie Bold Legends"
        description="Pie chart with bold legend labels enabled through the Pie Chart options."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart
            {...mockData}
            effect="none"
            options={{
              boldLegends: true,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const Crosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Pie Crosshair"
        description="Crosshair is opt-in and renders only when options.crosshair is true."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart
            {...mockData}
            effect="none"
            colors={customColors}
            options={{
              crosshair: true,
              boldLegends: true,
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
        title="ChartJS Pie Custom Tooltip"
        description="Pie chart with customized ChartJS tooltip behavior and styling."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart
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
                    label: (context: { parsed?: number }) => `Total Visits: ${context.parsed ?? 0}`,
                    afterLabel: () => 'Growth: +18.4%',
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

export const ClickHandling = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Pie Click Handling"
        description="Click a pie segment to trigger custom interaction behavior."
      />

      <Box customStyles={heroBox}>
        <div css={chartShell}>
          <PieChart
            {...mockData}
            effect="none"
            options={{
              onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                const firstElement = elements[0];

                if (!firstElement) return;

                const label = mockData.labels[firstElement.index];
                const value = mockData.data[firstElement.index];

                alert(`API Call for ${label}\nValue: ${value}\nStatus: Fetching details...`);
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
        title="ChartJS Pie Custom Styles"
        description="Examples combining the current colors API, chart options, and custom wrapper styling."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Behavior
      </Typography>

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Colors"
            description="Overrides series, label, border, crosshair, and tooltip colors through the Pie Chart colors API."
            api="colors"
          >
            <PieChart
              {...mockData}
              effect="none"
              colors={customColors}
              options={{
                boldLegends: true,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Dark Surface"
            description="Pie chart rendered on a custom dark wrapper with matching Pie Chart colors."
            api="colors + customStyles.wrapper"
          >
            <PieChart
              {...mockData}
              effect="none"
              colors={darkColors}
              customStyles={{
                wrapper: darkSurface,
              }}
              options={{
                boldLegends: true,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
