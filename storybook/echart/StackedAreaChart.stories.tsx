/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts';
import type {
  ChartCustomStyles,
  ChartData,
  ChartEffect,
  ChartOptions,
  DownloadPlacement,
} from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/echarts/StackedAreaChart',
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
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    {
      label: 'Direct',
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
      label: 'Email',
      data: [90, 120, 150, 180, 160, 200, 240],
    },
    {
      label: 'Ads',
      data: [60, 80, 110, 130, 140, 160, 190],
    },
  ],
};

const customSeriesData: ChartData = {
  labels: stackedAreaData.labels,
  series: [
    {
      label: 'Direct',
      data: [120, 132, 101, 134, 90, 230, 210],
      color: '#7c3aed',
      pointColor: '#a78bfa',
      pointRadius: 6,
      borderWidth: 3,
    },
    {
      label: 'Search',
      data: [220, 182, 191, 234, 290, 330, 310],
      color: '#0891b2',
      pointColor: '#22d3ee',
      pointRadius: 6,
      borderWidth: 3,
    },
    {
      label: 'Social',
      data: [150, 232, 201, 154, 190, 330, 410],
      color: '#16a34a',
      pointColor: '#4ade80',
      pointRadius: 6,
      borderWidth: 3,
    },
    {
      label: 'Email',
      data: [90, 120, 150, 180, 160, 200, 240],
      color: '#f97316',
      pointColor: '#fb923c',
      pointRadius: 6,
      borderWidth: 3,
    },
    {
      label: 'Ads',
      data: [60, 80, 110, 130, 140, 160, 190],
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

const section = css`
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
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const sectionDescription = css`
  max-width: 900px;
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

const darkChartCard = css`
  border-color: #334155;
  background: #0f172a;
`;

const darkTitle = css`
  color: #f8fafc;
`;

const darkDescription = css`
  color: #cbd5e1;
`;

const chartShell = css`
  position: relative;
  width: 100%;
  min-width: 0;
  min-height: 650px;
  margin-top: 16px;

  > div {
    width: 100%;
    min-width: 0;
  }
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

const darkCodePill = css`
  background: #1e293b;
  color: #e2e8f0;
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

interface PageIntroProps {
  readonly title: string;
  readonly description: string;
  readonly statValue?: string;
  readonly statLabel?: string;
  readonly secondaryStatValue?: string;
  readonly secondaryStatLabel?: string;
}

interface StackedAreaExampleProps {
  readonly title: string;
  readonly description: string;
  readonly api: string;
  readonly data?: ChartData;
  readonly appearance?: 'basic' | 'smooth';
  readonly effect?: ChartEffect;
  readonly options?: ChartOptions;
  readonly customStyles?: ChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly dark?: boolean;
}

const PageIntro = ({
  title,
  description,
  statValue = '1',
  statLabel = 'Engine',
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
  title,
  description,
  api,
  children,
  dark = false,
}: {
  readonly title: string;
  readonly description: string;
  readonly api: string;
  readonly children: ReactNode;
  readonly dark?: boolean;
}) => (
  <Box customStyles={css([chartCard, dark ? darkChartCard : undefined])}>
    <FlexLayout direction="column" gap="12px">
      <Typography variant="h3" customStyles={dark ? css([titleH3, darkTitle]) : titleH3}>
        {title}
      </Typography>
      <Typography
        variant="p"
        customStyles={dark ? css([paragraphSmall, darkDescription]) : paragraphSmall}
      >
        {description}
      </Typography>
      <Typography variant="span" customStyles={dark ? css([codePill, darkCodePill]) : codePill}>
        {api}
      </Typography>
      <div css={chartShell}>{children}</div>
    </FlexLayout>
  </Box>
);

const StackedAreaExample = ({
  title,
  description,
  api,
  data = stackedAreaData,
  appearance = 'smooth',
  effect = 'none',
  options,
  customStyles,
  showDownload,
  downloadPlacement,
  dark = false,
}: StackedAreaExampleProps) => {
  const chartProps = {
    data,
    appearance,
    effect,
    ...(options !== undefined ? { options } : {}),
    ...(customStyles !== undefined ? { customStyles } : {}),
    ...(showDownload !== undefined ? { showDownload } : {}),
    ...(downloadPlacement !== undefined ? { downloadPlacement } : {}),
  };

  return (
    <ChartCard title={title} description={description} api={api} dark={dark}>
      <Chart type="stacked-area" engine="chart-2" {...chartProps} />
    </ChartCard>
  );
};

const EffectStory = ({
  effect,
  title,
  description,
}: {
  readonly effect: ChartEffect;
  readonly title: string;
  readonly description: string;
}) => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title={title}
        description={description}
        secondaryStatValue="1"
        secondaryStatLabel="Effect"
      />
      <section css={section}>
        <StackedAreaExample
          title={title}
          description={description}
          api={`effect="${effect}"`}
          effect={effect}
          options={{
            showLegend: true,
          }}
        />
      </section>
    </div>
  </main>
);

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Stacked Area Chart"
        description="Stacked Area rendered through the shared Chart API using the ECharts engine and normalized ChartData."
      />
      <section css={section}>
        <SectionHeading
          title="Default Rendering"
          description="The ECharts adapter converts normalized chart data into the direct Stacked Area renderer contract."
        />
        <StackedAreaExample
          title="Default"
          description="Default smooth stacked area rendering using the shared chart palette."
          api='type="stacked-area" engine="chart-2"'
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
        title="ECharts Stacked Area Appearances"
        description="Stacked Area supports basic and smooth appearances through the shared Chart API."
        secondaryStatValue="2"
        secondaryStatLabel="Appearances"
      />
      <section css={section}>
        <SectionHeading
          title="Basic"
          description="Basic appearance disables smoothing and renders straight line segments."
        />
        <StackedAreaExample
          title="Basic Appearance"
          description="Straight stacked area lines with smoothing disabled."
          api='appearance="basic"'
          appearance="basic"
          options={{
            showLegend: true,
          }}
        />
      </section>
      <section css={section}>
        <SectionHeading
          title="Smooth"
          description="Smooth appearance provides curved interpolation across each stacked series."
        />
        <StackedAreaExample
          title="Smooth Appearance"
          description="Smooth stacked area lines for trend-focused dashboard visualization."
          api='appearance="smooth"'
          appearance="smooth"
          options={{
            showLegend: true,
          }}
        />
      </section>
    </div>
  </main>
);

export const Effects = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Stacked Area Effects"
        description="All supported Stacked Area effects resolved by the effect-only registry."
        statValue={String(STACKED_AREA_EFFECTS.length)}
        statLabel="Effects"
        secondaryStatValue="1"
        secondaryStatLabel="Engine"
      />
      {STACKED_AREA_EFFECTS.map((effect) => (
        <section key={effect} css={section}>
          <SectionHeading
            title={effect}
            description={`Stacked Area rendered with the ${effect} effect.`}
          />
          <StackedAreaExample
            title={`${effect} Effect`}
            description={`ECharts Stacked Area using the ${effect} effect.`}
            api={`effect="${effect}"`}
            effect={effect}
            options={{
              showLegend: true,
            }}
          />
        </section>
      ))}
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Uses bounce motion for the Stacked Area entrance."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Adds wobble motion to the Stacked Area entrance."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Uses elastic motion for a spring-like Stacked Area entrance."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressively reveals the Stacked Area series."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Combines smooth glide motion with an elastic finish."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Reveals the stacked series sequentially."
  />
);

export const Options = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Stacked Area Options"
        description="Shared options and native ECharts overrides remain available through the normalized options API."
        statValue="6"
        statLabel="Examples"
        secondaryStatValue="1"
        secondaryStatLabel="Engine"
      />
      <section css={section}>
        <SectionHeading
          title="Hidden Legend"
          description="Hide the legend using the normalized showLegend option."
        />
        <StackedAreaExample
          title="Hidden Legend"
          description="Compact Stacked Area rendering without a legend."
          api="options.showLegend: false"
          options={{
            showLegend: false,
          }}
        />
      </section>
      <section css={section}>
        <SectionHeading
          title="Crosshair"
          description="Crosshair remains opt-in and is enabled only when options.crosshair is true."
        />
        <StackedAreaExample
          title="Crosshair"
          description="Axis crosshair enabled for interactive value inspection."
          api="options.crosshair: true"
          options={{
            crosshair: true,
            showLegend: true,
          }}
        />
      </section>
      <section css={section}>
        <SectionHeading
          title="Bold Labels and Legends"
          description="Use normalized typography options without modifying native ECharts axis configuration."
        />
        <StackedAreaExample
          title="Bold Typography"
          description="Bold axis labels and legend text."
          api="boldLabels + boldLegends"
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
          }}
        />
      </section>
      <section css={section}>
        <SectionHeading
          title="Zoom Control"
          description="Native ECharts dataZoom remains available through options."
        />
        <StackedAreaExample
          title="Data Zoom"
          description="Inside and slider zoom controls for larger datasets."
          api="options.dataZoom"
          options={{
            showLegend: true,
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
      </section>
      <section css={section}>
        <SectionHeading
          title="Area Opacity"
          description="Native series overrides are merged with generated Stacked Area series configuration."
        />
        <StackedAreaExample
          title="Full Opacity Sharp"
          description="Basic appearance with stronger area opacity."
          api="options.series[].areaStyle"
          appearance="basic"
          options={{
            showLegend: true,
            series: stackedAreaData.series.map(() => ({
              areaStyle: {
                opacity: 0.8,
              },
            })),
          }}
        />
      </section>
      <section css={section}>
        <SectionHeading
          title="Custom Series Data"
          description="Series-level color, point color, radius, and border width are normalized through ChartData."
        />
        <StackedAreaExample
          title="Series Overrides"
          description="Each series provides its own visual overrides through normalized data."
          api="data.series[]"
          data={customSeriesData}
          options={{
            showLegend: true,
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
        title="ECharts Stacked Area Custom Tooltip"
        description="Native ECharts tooltip overrides are merged with the generated Stacked Area tooltip configuration."
        secondaryStatValue="1"
        secondaryStatLabel="Tooltip"
      />
      <section css={section}>
        <StackedAreaExample
          title="Custom Tooltip"
          description="Custom tooltip border, padding, typography, and value formatting."
          api="options.tooltip"
          options={{
            showLegend: true,
            tooltip: {
              borderWidth: 2,
              padding: 14,
              textStyle: {
                fontSize: 13,
              },
              valueFormatter: (value: unknown) => `${String(value)} visits`,
            },
          }}
        />
      </section>
    </div>
  </main>
);

export const SharedCssVariables = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Stacked Area CSS Variables"
        description="Stacked Area now consumes the common WCI chart palette and semantic tokens instead of chart-specific variables."
        statValue="3"
        statLabel="Palettes"
        secondaryStatValue="1"
        secondaryStatLabel="Token System"
      />
      <section css={section}>
        <SectionHeading
          title="Custom Palette"
          description="Override common chart series and semantic tokens at the shared Chart container."
        />
        <StackedAreaExample
          title="Custom CSS Variables"
          description="Custom palette using the shared --wci-chart-* variables."
          api="customStyles.container"
          customStyles={{
            container: customChartVariables,
          }}
          options={{
            showLegend: true,
          }}
        />
      </section>
      <section css={section}>
        <SectionHeading
          title="Soft Palette"
          description="A softer palette using the same shared chart token contract."
        />
        <StackedAreaExample
          title="Soft Palette"
          description="Soft series colors while retaining the common semantic token structure."
          api="customStyles.container"
          customStyles={{
            container: softChartVariables,
          }}
          options={{
            showLegend: true,
          }}
        />
      </section>
      <section css={section}>
        <SectionHeading
          title="Dark Palette"
          description="Dark surfaces use the same common series and semantic chart variables."
        />
        <StackedAreaExample
          title="Dark Surface"
          description="Dark Stacked Area rendering using shared chart tokens."
          api="customStyles.container"
          customStyles={{
            container: darkChartVariables,
          }}
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
            backgroundColor: '#0f172a',
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
        title="ECharts Stacked Area Download"
        description="Download behavior is exposed through the shared Chart API."
        secondaryStatValue="2"
        secondaryStatLabel="Examples"
      />
      <section css={section}>
        <SectionHeading
          title="Default Placement"
          description="Enable the shared download control using showDownload."
        />
        <StackedAreaExample
          title="Download"
          description="Download control enabled with the default placement."
          api="showDownload"
          showDownload
          options={{
            showLegend: true,
          }}
        />
      </section>
      <section css={section}>
        <SectionHeading
          title="Custom Placement"
          description="Move the shared download control using downloadPlacement."
        />
        <StackedAreaExample
          title="Bottom Left"
          description="Download control positioned at the bottom left."
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
