/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts';
import type {
  ChartData,
  ChartEffect,
  ChartOptions,
  ChartCustomStyles,
  DownloadPlacement,
} from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/ScatterLineChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const SCATTER_LINE_EFFECTS = [
  'none',
  'bounce',
  'wobble',
  'elastic',
  'progressive-trace',
  'elastic-glide',
  'staggered-reveal',
] as const satisfies readonly ChartEffect[];

const scatterLineData: ChartData = {
  labels: [],
  series: [
    {
      label: 'Observations',
      data: [
        { x: 10, y: 25 },
        { x: 15, y: 18 },
        { x: 20, y: 55 },
        { x: 25, y: 30 },
        { x: 30, y: 25 },
        { x: 35, y: 40 },
        { x: 40, y: 65 },
        { x: 45, y: 50 },
        { x: 50, y: 60 },
      ],
      pointRadius: 6,
      borderWidth: 2,
    },
    {
      label: 'Trend Line',
      data: [
        { x: 10, y: 20 },
        { x: 20, y: 32 },
        { x: 30, y: 44 },
        { x: 40, y: 56 },
        { x: 50, y: 68 },
      ],
      pointRadius: 4,
      borderWidth: 3,
    },
  ],
};

const coloredScatterLineData: ChartData = {
  labels: [],
  series: [
    {
      label: 'Observations',
      data: [
        { x: 10, y: 25 },
        { x: 15, y: 18 },
        { x: 20, y: 55 },
        { x: 25, y: 30 },
        { x: 30, y: 25 },
        { x: 35, y: 40 },
        { x: 40, y: 65 },
        { x: 45, y: 50 },
        { x: 50, y: 60 },
      ],
      color: '#7c3aed',
      pointColor: '#a78bfa',
      pointRadius: 6,
      borderWidth: 2,
    },
    {
      label: 'Trend Line',
      data: [
        { x: 10, y: 20 },
        { x: 20, y: 32 },
        { x: 30, y: 44 },
        { x: 40, y: 56 },
        { x: 50, y: 68 },
      ],
      color: '#0891b2',
      pointColor: '#22d3ee',
      pointRadius: 4,
      borderWidth: 3,
    },
  ],
};

const customVariables = css`
  --wci-chart-blue: #7c3aed;
  --wci-chart-teal: #0891b2;
  --wci-chart-green: #16a34a;
  --wci-chart-orange: #f97316;
  --wci-chart-red: #ef4444;
  --wci-chart-purple: #8b5cf6;
  --wci-chart-magenta: #d946ef;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #eab308;
  --wci-chart-axis-text: #0dba44;
  --wci-chart-axis-line: #f97316;
  --wci-chart-grid: #cbd5e1;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #111827;
  --wci-chart-tooltip-border: #94a3b8;
`;

const darkVariables = css`
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

interface ScatterLineComparisonProps {
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
  secondaryStatValue = '2',
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

const ScatterLineComparison = ({
  data = scatterLineData,
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
}: ScatterLineComparisonProps) => {
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
          <Chart type="scatter-line" engine="chart-1" {...sharedProps} />
        </ChartCard>
      </ComparisonItem>
      <ComparisonItem>
        <ChartCard chartName="Chart 2" description={chart2Description} api={api} dark={dark}>
          <Chart type="scatter-line" engine="chart-2" {...sharedProps} />
        </ChartCard>
      </ComparisonItem>
    </ComparisonGrid>
  );
};

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Line Chart"
        description="The same normalized Scatter Line data is rendered side by side using Chart 1 and Chart 2."
        secondaryStatValue="14"
        secondaryStatLabel="Points"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines receive the same normalized ChartData and resolve it through their Scatter Line adapters."
        />
        <ScatterLineComparison
          chart1Description="Chart 1 renders normalized coordinate points through the Chart.js adapter."
          chart2Description="Chart 2 renders the same normalized coordinate points through the ECharts adapter."
          api='type="scatter-line"'
          options={{
            showLegend: true,
            boldLabels: true,
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
        title="Scatter Line Chart Appearances"
        description="Basic and smooth appearances are normalized through the shared Chart API."
        secondaryStatValue="2"
        secondaryStatLabel="Appearances"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Basic Appearance"
          description="Both engines render straight line segments between Scatter Line points."
        />
        <ScatterLineComparison
          appearance="basic"
          chart1Description="Chart 1 resolves the basic Scatter Line appearance."
          chart2Description="Chart 2 resolves the matching basic Scatter Line appearance."
          api='appearance="basic"'
          options={{
            showLegend: true,
          }}
        />
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Smooth Appearance"
          description="Both engines render smooth interpolation between Scatter Line points."
        />
        <ScatterLineComparison
          appearance="smooth"
          chart1Description="Chart 1 resolves the smooth Scatter Line appearance."
          chart2Description="Chart 2 resolves the matching smooth Scatter Line appearance."
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
          description="The same shared effect is resolved independently by both Scatter Line engines."
        />
        <ScatterLineComparison
          effect={effect}
          chart1Description="Chart 1 renders the selected Scatter Line animation."
          chart2Description="Chart 2 renders the corresponding Scatter Line animation."
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
    title="Scatter Line Bounce Effect"
    description="Scatter Line values enter using bounce motion."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Scatter Line Wobble Effect"
    description="Scatter Line values enter using wobble motion."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Scatter Line Elastic Effect"
    description="Scatter Line values enter using elastic movement."
    effect="elastic"
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectComparison
    title="Scatter Line Progressive Trace"
    description="Scatter Line values progressively reveal across the chart."
    effect="progressive-trace"
  />
);

export const ElasticGlideEffect = () => (
  <EffectComparison
    title="Scatter Line Elastic Glide"
    description="Scatter Line values enter using elastic glide motion."
    effect="elastic-glide"
  />
);

export const StaggeredRevealEffect = () => (
  <EffectComparison
    title="Scatter Line Staggered Reveal"
    description="Scatter Line points enter sequentially."
    effect="staggered-reveal"
  />
);

export const AllEffects = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Line Chart Effects"
        description="All supported Scatter Line effects are compared across Chart 1 and Chart 2."
        statValue={String(SCATTER_LINE_EFFECTS.length)}
        statLabel="Effects"
        secondaryStatValue={String(SCATTER_LINE_EFFECTS.length * 2)}
        secondaryStatLabel="Charts"
      />
      {SCATTER_LINE_EFFECTS.map((effect) => (
        <section key={effect} css={pageSection}>
          <SectionHeading
            title={effect}
            description={`Comparison of the ${effect} effect across both Scatter Line engines.`}
          />
          <ScatterLineComparison
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
        title="Scatter Line Chart Options"
        description="Common Scatter Line behavior is normalized through the shared Chart API and compared across both engines."
        statValue="5"
        statLabel="Option Groups"
        secondaryStatValue="10"
        secondaryStatLabel="Examples"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Legend"
          description="Both engines display their Scatter Line series legend."
        />
        <ScatterLineComparison
          chart1Description="Chart 1 legend enabled."
          chart2Description="Chart 2 legend enabled."
          api="options.showLegend: true"
          options={{
            showLegend: true,
          }}
        />
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Bold Labels and Legends"
          description="Both engines use stronger axis and legend typography."
        />
        <ScatterLineComparison
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
          description="Crosshair interaction is opt-in and enabled only when options.crosshair is true."
        />
        <ScatterLineComparison
          chart1Description="Chart 1 Scatter Line crosshair enabled."
          chart2Description="Chart 2 Scatter Line crosshair enabled."
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
          description="Normalized series colors are forwarded to each engine through its Scatter Line adapter."
        />
        <ScatterLineComparison
          data={coloredScatterLineData}
          chart1Description="Chart 1 receives normalized line and point colors."
          chart2Description="Chart 2 receives the same normalized line and point colors."
          api="data.series[].color + pointColor"
          options={{
            showLegend: true,
          }}
        />
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Custom CSS Variables"
          description="Both engines resolve the same shared WCI chart CSS variables."
        />
        <ScatterLineComparison
          chart1Description="Chart 1 resolves the shared WCI chart tokens."
          chart2Description="Chart 2 resolves the same shared WCI chart tokens."
          api="customStyles.container"
          customStyles={{
            container: customVariables,
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

export const DarkTheme = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Line Dark Theme"
        description="Both Scatter Line engines use the same shared dark chart tokens."
        secondaryStatValue="1"
        secondaryStatLabel="Theme"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Dark Surface"
          description="The same dark chart variables are applied to Chart 1 and Chart 2."
        />
        <ScatterLineComparison
          chart1Description="Chart 1 using shared dark chart tokens."
          chart2Description="Chart 2 using the same shared dark chart tokens."
          api="customStyles.container"
          customStyles={{
            container: darkVariables,
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
        title="Scatter Line Download"
        description="Both Scatter Line engines use the shared Chart download controls."
        secondaryStatValue="1"
        secondaryStatLabel="Control"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Show Download"
          description="The shared download action is enabled for both Scatter Line engines."
        />
        <ScatterLineComparison
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
          description="The same download placement is applied to both Scatter Line engines."
        />
        <ScatterLineComparison
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
