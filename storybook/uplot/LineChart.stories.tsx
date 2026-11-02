/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { LineChart } from '@/components/uplot/components/line-chart/LineChart';
import type { LineChartEffect } from '@/components/uplot/components/line-chart/LineChart.types';

const meta: Meta<typeof LineChart> = {
  title: 'components/uplot/LineChart',
  component: LineChart,
};

export default meta;

const mockData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      label: 'Performance Metrics',
      data: [10, 40, 25, 70, 55, 90],
    },
  ],
};

const multiSeriesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      label: 'Revenue',
      data: [30, 45, 35, 60, 55, 80],
    },
    {
      label: 'Forecast',
      data: [25, 40, 40, 50, 60, 70],
    },
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
  color: #1e293b;
  margin-bottom: 16px;
`;

const titleH2 = css`
  font-size: 1.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
`;

const titleH3 = css`
  font-size: 1.35rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`;

const paragraph = css`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 24px;
  color: #475569;
`;

const paragraphSmall = css`
  font-size: 0.95rem;
  line-height: 1.5;
  color: #64748b;
`;

const heroBox = css`
  padding: 32px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
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
  --wci-chart-blue: #e11d48;
  --wci-chart-teal: #7c3aed;
  --wci-chart-axis-text: #f97316;
  --wci-chart-grid: #84cc16;
  --wci-chart-point-fill: #ffffff;
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
  readonly effect: LineChartEffect;
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
            <LineChart
              data={multiSeriesData}
              appearance="smooth"
              effect={effect}
              options={{ height: 420 }}
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
        title="Default uPlot Line Chart"
        description="Default uPlot line chart using the shared CSS-variable palette, solid appearance, and lightweight rendering pipeline."
      />

      <Box customStyles={heroBox}>
        <LineChart data={mockData} appearance="solid" effect="none" options={{ height: 400 }} />
      </Box>
    </div>
  </main>
);

export const Appearances = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="uPlot Line Chart Appearances"
        description="Compare solid, smooth, and stepped line appearances using the same shared data and CSS-variable color system."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Line Appearances
      </Typography>

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Solid Line"
            description="Standard line rendering with direct connections between data points."
            api='appearance="solid"'
          >
            <LineChart data={mockData} appearance="solid" effect="none" options={{ height: 360 }} />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Smooth Line"
            description="Smooth line rendering for a softer visual transition between data points."
            api='appearance="smooth"'
          >
            <LineChart
              data={mockData}
              appearance="smooth"
              effect="none"
              options={{ height: 360 }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Stepped Line"
            description="Stepped rendering for discrete value transitions between data points."
            api='appearance="stepped"'
          >
            <LineChart
              data={mockData}
              appearance="stepped"
              effect="none"
              options={{ height: 360 }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Smooth Multi-Series"
            description="Multiple datasets automatically consume colors from the shared chart palette."
            api='appearance="smooth"'
          >
            <LineChart
              data={multiSeriesData}
              appearance="smooth"
              effect="none"
              options={{ height: 360 }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const FadeInEffect = () => (
  <EffectStory
    effect="fade-in"
    title="Fade In Effect"
    description="Fade in gives the uPlot chart a lightweight entrance animation while preserving rendering performance."
  />
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="uPlot Line Chart Custom Styles"
        description="Examples showing shared CSS-variable overrides, explicit series colors, and high-density rendering."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Advanced Usage
      </Typography>

      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom CSS Variables"
            description="Overrides palette, axis, grid, and point colors through wrapper-level shared chart CSS variables."
            api="customStyles.wrapper"
          >
            <LineChart
              data={multiSeriesData}
              appearance="smooth"
              effect="fade-in"
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{ height: 360 }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Explicit Series Color"
            description="An explicit series color takes precedence over the shared CSS-variable palette."
            api="series.color"
          >
            <LineChart
              data={{
                labels: mockData.labels,
                series: [
                  {
                    label: 'Custom Gold',
                    data: [10, 40, 25, 70, 55, 90],
                    color: '#d4af37',
                  },
                ],
              }}
              appearance="solid"
              effect="none"
              options={{ height: 360 }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12 }}>
          <ChartCard
            title="High Density Performance"
            description="uPlot is optimized for large datasets. This example renders 60,000 points in a single chart."
            api="60,000 points"
          >
            <LineChart
              data={{
                labels: Array.from({ length: 60000 }, (_, index) => index.toString()),
                series: [
                  {
                    label: 'Sensor Data',
                    data: Array.from({ length: 60000 }, () => Math.random() * 100),
                  },
                ],
              }}
              appearance="solid"
              effect="none"
              options={{ height: 500 }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
