/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent, TooltipItem } from 'chart.js';

import { Chart } from '@/charts';
import type {
  ChartCustomStyles,
  ChartData,
  ChartEffect,
  ChartOptions,
  DownloadPlacement,
} from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/StackedAreaChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const STACKED_AREA_EFFECTS = [
  'none',
  'bounce',
  'wobble',
  'elastic',
  'progressive-trace',
  'elastic-glide',
  'staggered-reveal',
] as const satisfies readonly ChartEffect[];

const stackedAreaData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      label: 'Cloud Services',
      data: [30, 45, 60, 55, 70, 95],
    },
    {
      label: 'Hardware Sales',
      data: [20, 30, 25, 40, 35, 50],
    },
    {
      label: 'Consulting',
      data: [15, 20, 25, 20, 30, 40],
    },
    {
      label: 'Support',
      data: [10, 12, 18, 16, 22, 28],
    },
    {
      label: 'Training',
      data: [5, 8, 10, 14, 18, 24],
    },
  ],
};

const coloredStackedAreaData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      label: 'Cloud Services',
      data: [30, 45, 60, 55, 70, 95],
      color: '#7c3aed',
      pointColor: '#a78bfa',
      pointRadius: 6,
      borderWidth: 3,
    },
    {
      label: 'Hardware Sales',
      data: [20, 30, 25, 40, 35, 50],
      color: '#0891b2',
      pointColor: '#22d3ee',
      pointRadius: 6,
      borderWidth: 3,
    },
    {
      label: 'Consulting',
      data: [15, 20, 25, 20, 30, 40],
      color: '#16a34a',
      pointColor: '#4ade80',
      pointRadius: 6,
      borderWidth: 3,
    },
    {
      label: 'Support',
      data: [10, 12, 18, 16, 22, 28],
      color: '#f97316',
      pointColor: '#fb923c',
      pointRadius: 6,
      borderWidth: 3,
    },
    {
      label: 'Training',
      data: [5, 8, 10, 14, 18, 24],
      color: '#ef4444',
      pointColor: '#f87171',
      pointRadius: 6,
      borderWidth: 3,
    },
  ],
};

const customChartVariables = css`
  --wci-chart-blue: #7c3aed;
  --wci-chart-teal: #0891b2;
  --wci-chart-green: #16a34a;
  --wci-chart-orange: #f97316;
  --wci-chart-red: #ef4444;
  --wci-chart-purple: #8b5cf6;
  --wci-chart-magenta: #d946ef;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #eab308;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #94a3b8;
  --wci-chart-grid: #cbd5e1;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #111827;
  --wci-chart-tooltip-border: #94a3b8;
`;

const darkChartVariables = css`
  --wci-chart-blue: #38bdf8;
  --wci-chart-teal: #a78bfa;
  --wci-chart-green: #4ade80;
  --wci-chart-orange: #fb923c;
  --wci-chart-red: #f87171;
  --wci-chart-purple: #c084fc;
  --wci-chart-magenta: #e879f9;
  --wci-chart-cyan: #22d3ee;
  --wci-chart-yellow: #facc15;
  --wci-chart-axis-text: #f8fafc;
  --wci-chart-axis-line: #94a3b8;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #020617;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #475569;
`;

const softChartVariables = css`
  --wci-chart-blue: #93c5fd;
  --wci-chart-teal: #99f6e4;
  --wci-chart-green: #86efac;
  --wci-chart-orange: #fdba74;
  --wci-chart-red: #fca5a5;
  --wci-chart-purple: #c4b5fd;
  --wci-chart-magenta: #f0abfc;
  --wci-chart-cyan: #a5f3fc;
  --wci-chart-yellow: #fde047;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #cbd5e1;
  --wci-chart-grid: #e2e8f0;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #334155;
  --wci-chart-tooltip-border: #cbd5e1;
`;

const pageContainer = css`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  ${responsive.create({
    padding: {
      default: '20px',
      md: '32px',
      lg: '40px',
    },
  })}
`;

const pageSection = css`
  margin-top: 56px;
`;

const titleH1 = css`
  margin-bottom: 16px;
  color: #1e293b;
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH2 = css`
  margin-bottom: 12px;
  color: #1e293b;
  font-size: 1.875rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  color: #475569;
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const sectionDescription = css`
  max-width: 920px;
  margin-bottom: 24px;
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
`;

const heroBox = css`
  padding: 32px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #f8fafc;
`;

const chartCard = css`
  width: 100%;
  height: 100%;
  min-width: 0;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 10px 25px rgb(15 23 42 / 6%);
`;

const chartShell = css`
  position: relative;
  width: 100%;
  min-width: 0;
  margin-top: 16px;

  > div {
    width: 100%;
    min-width: 0;
  }
`;

const chartNamePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 5px 10px;
  border: 1px solid #dbeafe;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const statBox = css`
  min-width: 140px;
  padding: 20px;
  border: 1px solid #bae6fd;
  border-radius: 10px;
  background: #f0f9ff;
  text-align: center;
`;

const statBoxGreen = css`
  min-width: 140px;
  padding: 20px;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  background: #f0fdf4;
  text-align: center;
`;

const statValueBlue = css`
  color: #0369a1;
  font-size: 2rem;
  font-weight: 700;
`;

const statLabelBlue = css`
  color: #0c4a6e;
`;

const statValueGreen = css`
  color: #013a28;
  font-size: 2rem;
  font-weight: 700;
`;

const statLabelGreen = css`
  color: #013a28;
`;

const darkCard = css`
  background: #0f172a;
`;

const darkText = css`
  color: #cbd5e1;
`;

interface PageIntroProps {
  readonly title: string;
  readonly description: string;
  readonly statValue?: string;
  readonly statLabel?: string;
  readonly secondaryStatValue?: string;
  readonly secondaryStatLabel?: string;
}

interface StackedAreaComparisonProps {
  readonly data?: ChartData;
  readonly appearance?: 'basic' | 'smooth';
  readonly effect?: ChartEffect;
  readonly options?: ChartOptions;
  readonly customStyles?: ChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly chart1Description: string;
  readonly chart2Description: string;
  readonly api: string;
  readonly dark?: boolean;
}

const PageIntro = ({
  title,
  description,
  statValue = '2',
  statLabel = 'Charts',
  secondaryStatValue = '5',
  secondaryStatLabel = 'Series',
}: PageIntroProps) => (
  <FlexLayout
    direction={{ default: 'column', md: 'row' }}
    columns={12}
    padding={{ default: 0 }}
    gap={{ default: '32px', md: '60px' }}
    fullWidth
  >
    <FlexItem columnSpan={{ default: 12, md: 7 }}>
      <Typography variant="h1" customStyles={titleH1}>
        {title}
      </Typography>
      <Typography variant="p" customStyles={paragraph}>
        {description}
      </Typography>
    </FlexItem>
    <FlexItem columnSpan={{ default: 12, md: 5 }}>
      <Box customStyles={heroBox}>
        <FlexLayout direction="row" gap="16px" wrap="wrap" justifyContent="center">
          <Box customStyles={statBox}>
            <Typography variant="p" customStyles={statValueBlue}>
              {statValue}
            </Typography>
            <Typography variant="span" customStyles={statLabelBlue}>
              {statLabel}
            </Typography>
          </Box>
          <Box customStyles={statBoxGreen}>
            <Typography variant="p" customStyles={statValueGreen}>
              {secondaryStatValue}
            </Typography>
            <Typography variant="span" customStyles={statLabelGreen}>
              {secondaryStatLabel}
            </Typography>
          </Box>
        </FlexLayout>
      </Box>
    </FlexItem>
  </FlexLayout>
);

const SectionHeading = ({
  title,
  description,
}: {
  readonly title: string;
  readonly description: string;
}) => (
  <>
    <Typography variant="h2" customStyles={titleH2}>
      {title}
    </Typography>
    <Typography variant="p" customStyles={sectionDescription}>
      {description}
    </Typography>
  </>
);

const ChartCard = ({
  chartName,
  description,
  api,
  children,
  dark = false,
}: {
  readonly chartName: 'Chart 1' | 'Chart 2';
  readonly description: string;
  readonly api: string;
  readonly children: ReactNode;
  readonly dark?: boolean;
}) => (
  <Box customStyles={css([chartCard, dark ? darkCard : undefined])}>
    <FlexLayout direction="column" gap="12px">
      <Typography variant="span" customStyles={chartNamePill}>
        {chartName}
      </Typography>
      <Typography
        variant="p"
        customStyles={dark ? css([paragraphSmall, darkText]) : paragraphSmall}
      >
        {description}
      </Typography>
      <Typography
        variant="span"
        customStyles={dark ? css([paragraphSmall, darkText]) : paragraphSmall}
      >
        {api}
      </Typography>
      <div css={chartShell}>{children}</div>
    </FlexLayout>
  </Box>
);

const ComparisonGrid = ({ children }: { readonly children: ReactNode }) => (
  <FlexLayout
    padding={{ default: 0 }}
    columns={12}
    gap={{ default: '24px', md: '32px' }}
    wrap="wrap"
    fullWidth
  >
    {children}
  </FlexLayout>
);

const ComparisonItem = ({ children }: { readonly children: ReactNode }) => (
  <FlexItem columnSpan={{ default: 12, lg: 6 }}>{children}</FlexItem>
);

const StackedAreaComparison = ({
  data = stackedAreaData,
  appearance = 'smooth',
  effect = 'none',
  options,
  customStyles,
  showDownload,
  downloadPlacement,
  chart1Description,
  chart2Description,
  api,
  dark = false,
}: StackedAreaComparisonProps) => {
  const sharedProps = {
    data,
    appearance,
    effect,
    ...(options !== undefined ? { options } : {}),
    ...(customStyles !== undefined ? { customStyles } : {}),
    ...(showDownload !== undefined ? { showDownload } : {}),
    ...(downloadPlacement !== undefined ? { downloadPlacement } : {}),
  };

  return (
    <ComparisonGrid>
      <ComparisonItem>
        <ChartCard chartName="Chart 1" description={chart1Description} api={api} dark={dark}>
          <Chart type="stacked-area" engine="chart-1" {...sharedProps} />
        </ChartCard>
      </ComparisonItem>
      <ComparisonItem>
        <ChartCard chartName="Chart 2" description={chart2Description} api={api} dark={dark}>
          <Chart type="stacked-area" engine="chart-2" {...sharedProps} />
        </ChartCard>
      </ComparisonItem>
    </ComparisonGrid>
  );
};

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Area Chart"
        description="The same normalized stacked area data is rendered side by side using Chart 1 and Chart 2."
      />
      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines receive the same normalized ChartData and resolve stacked series through their engine adapters."
        />
        <StackedAreaComparison
          chart1Description="Chart 1 renders the normalized stacked area data through the Chart.js adapter."
          chart2Description="Chart 2 renders the same normalized stacked area data through the ECharts adapter."
          api='type="stacked-area"'
          options={{
            showLegend: true,
          }}
        />
      </section>
    </div>
  </main>
);

export const Appearances = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Area Chart Appearances"
        description="Basic and smooth appearances are normalized through the shared Chart API."
        secondaryStatValue="2"
        secondaryStatLabel="Appearances"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Basic Appearance"
          description="Both engines render straight line segments across the stacked area series."
        />
        <StackedAreaComparison
          appearance="basic"
          chart1Description="Chart 1 renders the basic stacked area appearance."
          chart2Description="Chart 2 renders the matching basic stacked area appearance."
          api='appearance="basic"'
          options={{
            showLegend: true,
          }}
        />
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Smooth Appearance"
          description="Both engines render smooth interpolation across the stacked area series."
        />
        <StackedAreaComparison
          appearance="smooth"
          chart1Description="Chart 1 renders the smooth stacked area appearance."
          chart2Description="Chart 2 renders the matching smooth stacked area appearance."
          api='appearance="smooth"'
          options={{
            showLegend: true,
          }}
        />
      </section>
    </div>
  </main>
);

const EffectComparison = ({
  title,
  description,
  effect,
}: {
  readonly title: string;
  readonly description: string;
  readonly effect: ChartEffect;
}) => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title={title}
        description={description}
        secondaryStatValue="1"
        secondaryStatLabel="Shared Effect"
      />
      <section css={pageSection}>
        <SectionHeading
          title={`${title} Comparison`}
          description="The same shared effect is resolved independently by both stacked area engines."
        />
        <StackedAreaComparison
          effect={effect}
          chart1Description="Chart 1 renders the selected stacked area animation."
          chart2Description="Chart 2 renders the corresponding stacked area animation."
          api={`effect="${effect}"`}
          options={{
            showLegend: true,
          }}
        />
      </section>
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectComparison
    title="Stacked Area Bounce Effect"
    description="Stacked area series enter using bounce motion."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Stacked Area Wobble Effect"
    description="Stacked area series enter using wobble motion."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Stacked Area Elastic Effect"
    description="Stacked area series enter using elastic movement."
    effect="elastic"
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectComparison
    title="Stacked Area Progressive Trace"
    description="Stacked area series progressively reveal across the chart."
    effect="progressive-trace"
  />
);

export const ElasticGlideEffect = () => (
  <EffectComparison
    title="Stacked Area Elastic Glide"
    description="Stacked area series enter using elastic glide motion."
    effect="elastic-glide"
  />
);

export const StaggeredRevealEffect = () => (
  <EffectComparison
    title="Stacked Area Staggered Reveal"
    description="Stacked area series enter sequentially."
    effect="staggered-reveal"
  />
);

export const AllEffects = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Area Chart Effects"
        description="All supported stacked area effects are compared across Chart 1 and Chart 2."
        statValue={String(STACKED_AREA_EFFECTS.length)}
        statLabel="Effects"
        secondaryStatValue={String(STACKED_AREA_EFFECTS.length * 2)}
        secondaryStatLabel="Charts"
      />
      {STACKED_AREA_EFFECTS.map((effect) => (
        <section key={effect} css={pageSection}>
          <SectionHeading
            title={effect}
            description={`Comparison of the ${effect} effect across both stacked area engines.`}
          />
          <StackedAreaComparison
            effect={effect}
            chart1Description={`Chart 1 using ${effect}.`}
            chart2Description={`Chart 2 using ${effect}.`}
            api={`effect="${effect}"`}
            options={{
              showLegend: true,
            }}
          />
        </section>
      ))}
    </div>
  </main>
);

export const CommonOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Area Chart Options"
        description="Common stacked area behavior is normalized through the shared Chart API and compared across both engines."
        statValue="6"
        statLabel="Option Groups"
        secondaryStatValue="12"
        secondaryStatLabel="Examples"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Hidden Legend"
          description="Both engines hide their stacked area legends through the shared showLegend option."
        />
        <StackedAreaComparison
          chart1Description="Chart 1 legend hidden."
          chart2Description="Chart 2 legend hidden."
          api="options.showLegend: false"
          options={{
            showLegend: false,
          }}
        />
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Bold Labels and Legends"
          description="Both engines use stronger axis and legend typography."
        />
        <StackedAreaComparison
          chart1Description="Chart 1 with bold axis and legend typography."
          chart2Description="Chart 2 with matching bold axis and legend typography."
          api="boldLabels + boldLegends"
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
          }}
        />
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Crosshair"
          description="Crosshair interaction remains opt-in and is enabled only when options.crosshair is true."
        />
        <StackedAreaComparison
          chart1Description="Chart 1 stacked area crosshair enabled."
          chart2Description="Chart 2 stacked area crosshair enabled."
          api="options.crosshair: true"
          options={{
            crosshair: true,
            showLegend: true,
          }}
        />
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Custom Series Colors"
          description="Series-level color overrides are normalized and forwarded through each engine adapter."
        />
        <StackedAreaComparison
          data={coloredStackedAreaData}
          chart1Description="Chart 1 receives normalized line and point colors."
          chart2Description="Chart 2 receives the same normalized series colors."
          api="data.series[].color + pointColor"
          options={{
            showLegend: true,
          }}
        />
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Soft Palette"
          description="Both engines resolve the same shared WCI chart CSS variables."
        />
        <StackedAreaComparison
          chart1Description="Chart 1 resolves the shared soft chart palette."
          chart2Description="Chart 2 resolves the same shared soft chart palette."
          api="customStyles.container"
          customStyles={{
            container: softChartVariables,
          }}
          options={{
            showLegend: true,
          }}
        />
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Custom CSS Variables"
          description="Shared chart palette and semantic tokens can be overridden without engine-specific variables."
        />
        <StackedAreaComparison
          chart1Description="Chart 1 resolves shared WCI chart tokens."
          chart2Description="Chart 2 resolves the same shared WCI chart tokens."
          api="customStyles.container"
          customStyles={{
            container: customChartVariables,
          }}
          options={{
            showLegend: true,
            boldLabels: true,
          }}
        />
      </section>
    </div>
  </main>
);

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Area Custom Tooltip"
        description="Native Chart.js tooltip overrides can be passed through the shared options API."
        secondaryStatValue="1"
        secondaryStatLabel="Chart 1 Example"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Chart.js Tooltip"
          description="This example is Chart 1 specific because its callback receives native Chart.js TooltipItem data."
        />
        <ChartCard
          chartName="Chart 1"
          description="Chart 1 with a custom native Chart.js tooltip callback."
          api="options.plugins.tooltip"
        >
          <Chart
            type="stacked-area"
            engine="chart-1"
            data={stackedAreaData}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
              plugins: {
                tooltip: {
                  borderWidth: 2,
                  cornerRadius: 10,
                  padding: 14,
                  titleFont: {
                    size: 15,
                    weight: 'bold',
                  },
                  bodyFont: {
                    size: 13,
                  },
                  displayColors: true,
                  caretSize: 8,
                  callbacks: {
                    label: (context: TooltipItem<'line'>) => {
                      const datasetLabel = context.dataset.label ?? 'Dataset';
                      return `${datasetLabel}: ${context.formattedValue}`;
                    },
                    afterBody: () => 'Total is shown in footer by default.',
                  },
                },
              },
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const ClickHandling = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Area Click Handling"
        description="Native Chart.js click handling remains available when Chart 1 is selected."
        secondaryStatValue="1"
        secondaryStatLabel="Chart 1 Example"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Chart.js Click Event"
          description="Click a Chart 1 stacked area point to access its normalized series and label data."
        />
        <ChartCard
          chartName="Chart 1"
          description="Chart 1 exposes its native Chart.js click event through options."
          api="options.onClick"
        >
          <Chart
            type="stacked-area"
            engine="chart-1"
            data={stackedAreaData}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
              onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                const firstElement = elements[0];

                if (!firstElement) {
                  return;
                }

                const series = stackedAreaData.series[firstElement.datasetIndex];
                const label = stackedAreaData.labels[firstElement.index];
                const seriesData = series?.data;
                const value = Array.isArray(seriesData)
                  ? seriesData[firstElement.index]
                  : undefined;

                alert(
                  `API Call: Fetching ${series?.label} details for ${label}\nValue: ${String(value ?? '')}`,
                );
              },
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const DarkTheme = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Area Dark Theme"
        description="Both stacked area engines use the same shared dark chart tokens."
        secondaryStatValue="1"
        secondaryStatLabel="Theme"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Dark Surface"
          description="The same shared dark chart variables are applied to Chart 1 and Chart 2."
        />
        <StackedAreaComparison
          chart1Description="Chart 1 using shared dark chart tokens."
          chart2Description="Chart 2 using the same shared dark chart tokens."
          api="customStyles.container"
          customStyles={{
            container: darkChartVariables,
          }}
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
            chartBackground: '#0f172a',
          }}
          dark
        />
      </section>
    </div>
  </main>
);

export const ShowDownload = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Stacked Area Download"
        description="Both stacked area engines use the shared Chart download controls."
        secondaryStatValue="1"
        secondaryStatLabel="Control"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Show Download"
          description="The shared download action is enabled for both stacked area engines."
        />
        <StackedAreaComparison
          chart1Description="Chart 1 download control enabled."
          chart2Description="Chart 2 download control enabled."
          api="showDownload"
          showDownload
          options={{
            showLegend: true,
          }}
        />
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Download Placement"
          description="The same download placement is applied to both stacked area engines."
        />
        <StackedAreaComparison
          chart1Description="Chart 1 download action positioned at bottom left."
          chart2Description="Chart 2 download action positioned at bottom left."
          api='downloadPlacement="bottom-left"'
          showDownload
          downloadPlacement="bottom-left"
          options={{
            showLegend: true,
          }}
        />
      </section>
    </div>
  </main>
);
