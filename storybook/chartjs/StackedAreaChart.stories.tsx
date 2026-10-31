/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent, TooltipItem } from 'chart.js';

import { StackedAreaChart } from '@/components/chartjs/components';
import type {
  StackedAreaChartDataset,
  StackedAreaChartEffect,
} from '@/components/chartjs/components/stacked-area-chart/StackedAreaChart.types';

const meta: Meta<typeof StackedAreaChart> = {
  title: 'components/ChartJS/StackedAreaChart',
  component: StackedAreaChart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const data: StackedAreaChartDataset[] = [
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
];

const coloredData: StackedAreaChartDataset[] = [
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
];

const STACKED_AREA_EFFECTS = [
  'none',
  'bounce',
  'wobble',
  'elastic',
  'progressive-trace',
  'elastic-glide',
  'staggered-reveal',
] as const satisfies readonly StackedAreaChartEffect[];

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

interface ChartCardProps {
  readonly title: string;
  readonly description: string;
  readonly api: string;
  readonly children: ReactNode;
  readonly dark?: boolean;
}

const PageIntro = ({
  title,
  description,
  statValue = '1',
  statLabel = 'Chart',
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

const ChartCard = ({ title, description, api, children, dark = false }: ChartCardProps) => (
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

const EffectStory = ({
  effect,
  title,
  description,
}: {
  readonly effect: StackedAreaChartEffect;
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
      <section css={pageSection}>
        <ChartCard title={title} description={description} api={`effect="${effect}"`}>
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect={effect}
            options={{
              showLegend: true,
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Area Chart"
        description="Default ChartJS stacked area rendering using the common WCI chart palette and the direct renderer API."
      />
      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="The direct ChartJS Stacked Area component receives labels and normalized numeric datasets."
        />
        <ChartCard
          title="Default"
          description="Default smooth stacked area chart with five cumulative series."
          api="<StackedAreaChart labels={labels} data={data} />"
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const Appearances = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Area Appearances"
        description="ChartJS Stacked Area supports basic and smooth line interpolation."
        secondaryStatValue="2"
        secondaryStatLabel="Appearances"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Basic"
          description="Basic appearance renders straight line segments without interpolation."
        />
        <ChartCard
          title="Basic Appearance"
          description="Straight stacked area lines with smoothing disabled."
          api='appearance="basic"'
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="basic"
            effect="none"
            options={{
              showLegend: true,
            }}
          />
        </ChartCard>
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Smooth"
          description="Smooth appearance applies curved interpolation to every stacked dataset."
        />
        <ChartCard
          title="Smooth Appearance"
          description="Smooth stacked area curves for trend-focused visualization."
          api='appearance="smooth"'
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const WithCrosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Area Crosshair"
        description="Crosshair interaction is opt-in and enabled only when options.crosshair is true."
        secondaryStatValue="1"
        secondaryStatLabel="Option"
      />
      <section css={pageSection}>
        <ChartCard
          title="Crosshair"
          description="Move across the chart to inspect values using the ChartJS crosshair plugin."
          api="options.crosshair: true"
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect="none"
            options={{
              crosshair: true,
              showLegend: true,
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Bounce motion is resolved through the Stacked Area effect registry."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble motion adds subtle movement during the chart entrance."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic motion adds a spring-style entrance to the stacked series."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressively reveals the stacked datasets across the chart."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Combines smooth movement with an elastic finish."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Reveals the stacked datasets sequentially."
  />
);

export const AllEffects = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Area Effects"
        description="All supported Stacked Area effects resolved by the ChartJS effect registry."
        statValue={String(STACKED_AREA_EFFECTS.length)}
        statLabel="Effects"
        secondaryStatValue="1"
        secondaryStatLabel="Engine"
      />
      {STACKED_AREA_EFFECTS.map((effect) => (
        <section key={effect} css={pageSection}>
          <SectionHeading
            title={effect}
            description={`ChartJS Stacked Area rendered with the ${effect} effect.`}
          />
          <ChartCard
            title={`${effect} Effect`}
            description={`ChartJS Stacked Area using the ${effect} effect.`}
            api={`effect="${effect}"`}
          >
            <StackedAreaChart
              labels={labels}
              data={data}
              appearance="smooth"
              effect={effect}
              options={{
                showLegend: true,
              }}
            />
          </ChartCard>
        </section>
      ))}
    </div>
  </main>
);

export const HiddenLegend = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Area Hidden Legend"
        description="Legend visibility is controlled through the normalized showLegend option."
        secondaryStatValue="1"
        secondaryStatLabel="Option"
      />
      <section css={pageSection}>
        <ChartCard
          title="Hidden Legend"
          description="Compact Stacked Area rendering without the ChartJS legend."
          api="options.showLegend: false"
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: false,
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const LegendRight = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Area Legend Position"
        description="Native ChartJS legend options remain available through the options contract."
        secondaryStatValue="1"
        secondaryStatLabel="Option"
      />
      <section css={pageSection}>
        <ChartCard
          title="Legend Right"
          description="Positions the ChartJS legend on the right side."
          api="options.plugins.legend.position"
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
              plugins: {
                legend: {
                  position: 'right',
                },
              },
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const BoldLabelsAndLegends = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Area Typography"
        description="Axis labels and legend text can use stronger typography through normalized options."
        secondaryStatValue="2"
        secondaryStatLabel="Options"
      />
      <section css={pageSection}>
        <ChartCard
          title="Bold Labels and Legends"
          description="Applies stronger typography to axis labels and legend text."
          api="boldLabels + boldLegends"
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
              boldLabels: true,
              boldLegends: true,
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Area Custom Tooltip"
        description="Native ChartJS tooltip callbacks remain available through options.plugins.tooltip."
        secondaryStatValue="1"
        secondaryStatLabel="Tooltip"
      />
      <section css={pageSection}>
        <ChartCard
          title="Custom Tooltip"
          description="Custom ChartJS tooltip typography, spacing, and label formatting."
          api="options.plugins.tooltip"
        >
          <StackedAreaChart
            labels={labels}
            data={data}
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
        title="ChartJS Stacked Area Click Handling"
        description="Native ChartJS click events remain available through the Stacked Area options."
        secondaryStatValue="1"
        secondaryStatLabel="Event"
      />
      <section css={pageSection}>
        <ChartCard
          title="Click Handling"
          description="Click a stacked area point to access its dataset, label, and value."
          api="options.onClick"
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
              onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                const firstElement = elements[0];

                if (!firstElement) {
                  return;
                }

                const dataset = data[firstElement.datasetIndex];
                const label = labels[firstElement.index];
                const value = dataset?.data[firstElement.index];

                alert(
                  `API Call: Fetching ${dataset?.label} details for ${label}\nValue: ${String(value ?? '')}`,
                );
              },
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const CustomSeriesColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Area Series Colors"
        description="Dataset-level line, point, radius, and border overrides are supported by the direct ChartJS API."
        secondaryStatValue="5"
        secondaryStatLabel="Series"
      />
      <section css={pageSection}>
        <ChartCard
          title="Custom Series Colors"
          description="Each dataset provides its own line and point styling."
          api="data[].color + pointColor"
        >
          <StackedAreaChart
            labels={labels}
            data={coloredData}
            appearance="smooth"
            effect="none"
            options={{
              showLegend: true,
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const SoftPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Area Soft Palette"
        description="The direct renderer consumes the common WCI chart CSS variable palette."
        secondaryStatValue="1"
        secondaryStatLabel="Palette"
      />
      <section css={pageSection}>
        <ChartCard
          title="Soft Palette"
          description="Soft colors using the common --wci-chart-* variables."
          api="rendererCustomStyles.container"
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect="none"
            rendererCustomStyles={{
              container: softChartVariables,
            }}
            options={{
              showLegend: true,
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Area Custom Styles"
        description="Common chart CSS variables are applied through rendererCustomStyles without chart-specific variable names."
        secondaryStatValue="2"
        secondaryStatLabel="Examples"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Custom CSS Variables"
          description="Override the common chart series palette and semantic tokens at the renderer container."
        />
        <ChartCard
          title="Custom Palette"
          description="Custom series, axis, grid, and tooltip colors using the shared WCI chart token contract."
          api="rendererCustomStyles.container"
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect="none"
            rendererCustomStyles={{
              container: customChartVariables,
            }}
            options={{
              showLegend: true,
              boldLabels: true,
            }}
          />
        </ChartCard>
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Dark Surface"
          description="The same common chart variables support a dark renderer surface."
        />
        <ChartCard
          title="Dark Palette"
          description="Dark Stacked Area rendering using shared chart semantic tokens."
          api="rendererCustomStyles.container"
          dark
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect="none"
            rendererCustomStyles={{
              container: darkChartVariables,
            }}
            options={{
              showLegend: true,
              boldLabels: true,
              boldLegends: true,
              chartBackground: '#0f172a',
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const ShowDownload = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Area Download"
        description="Download controls are supported directly by the ChartJS Stacked Area renderer."
        secondaryStatValue="2"
        secondaryStatLabel="Examples"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Default Placement"
          description="Enable the renderer download control through showDownload."
        />
        <ChartCard
          title="Download"
          description="Chart download control enabled with the default placement."
          api="showDownload"
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect="none"
            showDownload
            options={{
              showLegend: true,
            }}
          />
        </ChartCard>
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Custom Placement"
          description="The download control supports the shared placement contract."
        />
        <ChartCard
          title="Bottom Left"
          description="Download action positioned at the bottom left."
          api='downloadPlacement="bottom-left"'
        >
          <StackedAreaChart
            labels={labels}
            data={data}
            appearance="smooth"
            effect="none"
            showDownload
            downloadPlacement="bottom-left"
            options={{
              showLegend: true,
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);
