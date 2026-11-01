/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent, TooltipItem } from 'chart.js';

import { StackedBarChart } from '@/components/chartjs/components';
import type {
  StackedBarChartDataset,
  StackedBarChartEffect,
} from '@/components/chartjs/components/stacked-bar-chart/StackedBarChart.types';

const meta: Meta<typeof StackedBarChart> = {
  title: 'components/ChartJS/StackedBarChart',
  component: StackedBarChart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const data: StackedBarChartDataset[] = [
  { label: 'Cloud Services', data: [30, 45, 60, 55, 70, 95] },
  { label: 'Hardware Sales', data: [20, 30, 25, 40, 35, 50] },
  { label: 'Consulting', data: [15, 20, 25, 20, 30, 40] },
  { label: 'Support', data: [10, 12, 18, 16, 22, 28] },
  { label: 'Training', data: [5, 8, 10, 14, 18, 24] },
];

const customPaletteLabels = ['Q1', 'Q2', 'Q3', 'Q4'];

const customPaletteData: StackedBarChartDataset[] = [
  { label: 'Product A', data: [120, 180, 220, 260], color: '#e11d48' },
  { label: 'Product B', data: [90, 130, 160, 210], color: '#7c3aed' },
  { label: 'Product C', data: [60, 95, 120, 150], color: '#0891b2' },
];

const STACKED_BAR_EFFECTS = [
  'none',
  'bounce',
  'wobble',
  'elastic',
  'progressive-trace',
  'elastic-glide',
  'staggered-reveal',
] as const satisfies readonly StackedBarChartEffect[];

const customChartVariables = css`
  --wci-chart-blue: #f5456e;
  --wci-chart-teal: #3d9eff;
  --wci-chart-green: #59cc26;
  --wci-chart-orange: #ffae00;
  --wci-chart-red: #ff784d;
  --wci-chart-purple: #8b5cf6;
  --wci-chart-magenta: #d946ef;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #eab308;
  --wci-chart-axis-text: #111827;
  --wci-chart-axis-line: #94a3b8;
  --wci-chart-grid: #cbd5e1;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #111827;
  --wci-chart-tooltip-border: #cbd5e1;
`;

const softChartVariables = css`
  --wci-chart-blue: #fecdd3;
  --wci-chart-teal: #bfdbfe;
  --wci-chart-green: #bbf7d0;
  --wci-chart-orange: #fde68a;
  --wci-chart-red: #fed7aa;
  --wci-chart-purple: #ddd6fe;
  --wci-chart-magenta: #f5d0fe;
  --wci-chart-cyan: #cffafe;
  --wci-chart-yellow: #fef08a;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #cbd5e1;
  --wci-chart-grid: #e2e8f0;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #334155;
  --wci-chart-tooltip-border: #cbd5e1;
`;

const darkChartVariables = css`
  --wci-chart-blue: #fb7185;
  --wci-chart-teal: #60a5fa;
  --wci-chart-green: #86efac;
  --wci-chart-orange: #fbbf24;
  --wci-chart-red: #fb923c;
  --wci-chart-purple: #c084fc;
  --wci-chart-magenta: #e879f9;
  --wci-chart-cyan: #22d3ee;
  --wci-chart-yellow: #facc15;
  --wci-chart-axis-text: #f8fafc;
  --wci-chart-axis-line: #64748b;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #020617;
  --wci-chart-tooltip-text: #f8fafc;
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
  readonly effect: StackedBarChartEffect;
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
          <StackedBarChart
            labels={labels}
            data={data}
            effect={effect}
            options={{ showLegend: true }}
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
        title="ChartJS Stacked Bar Chart"
        description="Default ChartJS stacked bar rendering using the common WCI chart palette and direct renderer API."
      />
      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="The direct ChartJS component receives category labels and numeric datasets while handling stacking internally."
        />
        <ChartCard
          title="Default"
          description="Default vertical stacked bar chart with five cumulative datasets."
          api="<StackedBarChart labels={labels} data={data} />"
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            options={{ showLegend: true }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const Horizontal = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Horizontal ChartJS Stacked Bar"
        description="Switch the category and value axes while preserving stacking and indexed interaction."
        secondaryStatValue="1"
        secondaryStatLabel="Option"
      />
      <section css={pageSection}>
        <ChartCard
          title="Horizontal"
          description="Categories are rendered on the Y axis and stacked values on the X axis."
          api="options.horizontal: true"
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            options={{
              horizontal: true,
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
        title="ChartJS Stacked Bar Crosshair"
        description="Crosshair interaction remains opt-in and is enabled only when options.crosshair is true."
        secondaryStatValue="1"
        secondaryStatLabel="Option"
      />
      <section css={pageSection}>
        <ChartCard
          title="Crosshair"
          description="Move across the chart to inspect stacked categories using the ChartJS crosshair plugin."
          api="options.crosshair: true"
        >
          <StackedBarChart
            labels={labels}
            data={data}
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
    description="Bounce motion is resolved through the Stacked Bar effect registry."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble adds subtle movement while the stacked datasets enter."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic motion adds a spring-style entrance to the stacked bars."
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
    description="Reveals the stacked bar datasets sequentially."
  />
);

export const AllEffects = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Bar Effects"
        description="All supported Stacked Bar effects resolved through the ChartJS effect registry."
        statValue={String(STACKED_BAR_EFFECTS.length)}
        statLabel="Effects"
        secondaryStatValue="1"
        secondaryStatLabel="Engine"
      />
      {STACKED_BAR_EFFECTS.map((effect) => (
        <section key={effect} css={pageSection}>
          <ChartCard
            title={`${effect} Effect`}
            description={`ChartJS Stacked Bar rendered with the ${effect} effect.`}
            api={`effect="${effect}"`}
          >
            <StackedBarChart
              labels={labels}
              data={data}
              effect={effect}
              options={{ showLegend: true }}
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
        title="ChartJS Stacked Bar Hidden Legend"
        description="Legend visibility is controlled through the normalized showLegend option."
        secondaryStatValue="1"
        secondaryStatLabel="Option"
      />
      <section css={pageSection}>
        <ChartCard
          title="Hidden Legend"
          description="Compact stacked bar rendering without the ChartJS legend."
          api="options.showLegend: false"
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            options={{ showLegend: false }}
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
        title="ChartJS Stacked Bar Legend Position"
        description="Native ChartJS legend configuration remains available through options.plugins.legend."
        secondaryStatValue="1"
        secondaryStatLabel="Option"
      />
      <section css={pageSection}>
        <ChartCard
          title="Legend Right"
          description="Positions the ChartJS legend on the right side."
          api="options.plugins.legend.position"
        >
          <StackedBarChart
            labels={labels}
            data={data}
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

export const HiddenDataLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Bar Data Labels"
        description="Data labels can be disabled independently from the legend and tooltip."
        secondaryStatValue="1"
        secondaryStatLabel="Option"
      />
      <section css={pageSection}>
        <ChartCard
          title="Hidden Data Labels"
          description="Removes numeric values from inside individual stacked segments."
          api="options.showDataLabels: false"
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            options={{
              showLegend: true,
              showDataLabels: false,
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
        title="ChartJS Stacked Bar Typography"
        description="Axis labels and legend text can use stronger typography through normalized options."
        secondaryStatValue="2"
        secondaryStatLabel="Options"
      />
      <section css={pageSection}>
        <ChartCard
          title="Bold Labels and Legends"
          description="Applies bold typography to both axis labels and legend labels."
          api="boldLabels + boldLegends"
        >
          <StackedBarChart
            labels={labels}
            data={data}
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

export const CustomBarWidth = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Bar Width"
        description="Bar thickness can be controlled without changing the underlying stacking behavior."
        secondaryStatValue="2"
        secondaryStatLabel="Options"
      />
      <section css={pageSection}>
        <ChartCard
          title="Custom Bar Width"
          description="Uses explicit bar thickness and maximum width options."
          api="barWidth + maxBarWidth"
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            options={{
              showLegend: true,
              barWidth: 36,
              maxBarWidth: 44,
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
        title="ChartJS Stacked Bar Custom Tooltip"
        description="Native ChartJS tooltip callbacks remain available while the component preserves indexed stacked interaction."
        secondaryStatValue="1"
        secondaryStatLabel="Tooltip"
      />
      <section css={pageSection}>
        <ChartCard
          title="Custom Tooltip"
          description="Customizes tooltip typography, spacing, labels, and the stack total."
          api="options.plugins.tooltip"
        >
          <StackedBarChart
            labels={labels}
            data={data}
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
                    label: (context: TooltipItem<'bar'>) => {
                      const datasetLabel = context.dataset.label ?? 'Dataset';
                      return `${datasetLabel}: ${context.formattedValue}`;
                    },
                    footer: (items: TooltipItem<'bar'>[]) => {
                      const total = items.reduce((sum, item) => {
                        const raw = item.raw;

                        if (typeof raw === 'number') return sum + raw;

                        if (raw && typeof raw === 'object') {
                          if ('y' in raw && typeof raw.y === 'number') return sum + raw.y;
                          if ('x' in raw && typeof raw.x === 'number') return sum + raw.x;
                        }

                        return sum;
                      }, 0);

                      return `Total: ${total}`;
                    },
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
        title="ChartJS Stacked Bar Click Handling"
        description="Native ChartJS click events remain available through the Stacked Bar options."
        secondaryStatValue="1"
        secondaryStatLabel="Event"
      />
      <section css={pageSection}>
        <ChartCard
          title="Click Handling"
          description="Click a stacked segment to access its dataset, category, and value."
          api="options.onClick"
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            options={{
              showLegend: true,
              onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                const firstElement = elements[0];

                if (!firstElement) return;

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

export const DatasetColorOverrides = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Bar Dataset Colors"
        description="Individual datasets can override their corresponding common palette color."
        secondaryStatValue="3"
        secondaryStatLabel="Series"
      />
      <section css={pageSection}>
        <ChartCard
          title="Dataset Color Overrides"
          description="Each dataset supplies its own color while retaining the standard Stacked Bar behavior."
          api="data[].color"
        >
          <StackedBarChart
            labels={customPaletteLabels}
            data={customPaletteData}
            effect="none"
            options={{ showLegend: true }}
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
        title="ChartJS Stacked Bar Soft Palette"
        description="The renderer consumes the shared WCI chart CSS variable palette."
        secondaryStatValue="1"
        secondaryStatLabel="Palette"
      />
      <section css={pageSection}>
        <ChartCard
          title="Soft Palette"
          description="Soft colors using the common --wci-chart-* variables."
          api="rendererCustomStyles.container"
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            rendererCustomStyles={{
              container: softChartVariables,
            }}
            options={{ showLegend: true }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const TransparentChartBox = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Bar Transparent Box"
        description="The internal wrapper box can be disabled without changing chart colors or data."
        secondaryStatValue="1"
        secondaryStatLabel="Option"
      />
      <section css={pageSection}>
        <ChartCard
          title="Transparent Box"
          description="Removes the internal chart wrapper box treatment."
          api="options.isBoxVisible: false"
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            options={{
              isBoxVisible: false,
              showLegend: true,
            }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const CustomHeight = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Bar Custom Height"
        description="The direct renderer supports an explicit responsive wrapper height."
        secondaryStatValue="1"
        secondaryStatLabel="Option"
      />
      <section css={pageSection}>
        <ChartCard
          title="Custom Height"
          description="Overrides the default Stacked Bar wrapper height."
          api="options.height: 560px"
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            options={{
              height: '560px',
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
        title="ChartJS Stacked Bar Custom Styles"
        description="Common chart CSS variables support custom palettes and dark renderer surfaces without chart-specific color variables."
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
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            rendererCustomStyles={{
              container: customChartVariables,
            }}
            options={{
              boldLabels: true,
              showLegend: true,
            }}
          />
        </ChartCard>
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Dark Surface"
          description="The same shared chart variables can be used on a dark renderer surface."
        />
        <ChartCard
          title="Dark Palette"
          description="Dark Stacked Bar rendering using shared chart semantic tokens."
          api="rendererCustomStyles.container"
          dark
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            rendererCustomStyles={{
              container: css`
                ${darkChartVariables};
                background: #0f172a;
              `,
            }}
            options={{
              boldLabels: true,
              boldLegends: true,
              showLegend: true,
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
        title="ChartJS Stacked Bar Download"
        description="Download controls are supported directly by the ChartJS Stacked Bar renderer."
        secondaryStatValue="2"
        secondaryStatLabel="Examples"
      />
      <section css={pageSection}>
        <ChartCard
          title="Default Placement"
          description="Enables the renderer download control using its default placement."
          api="showDownload"
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            showDownload
            options={{ showLegend: true }}
          />
        </ChartCard>
      </section>
      <section css={pageSection}>
        <ChartCard
          title="Bottom Left"
          description="Positions the download action at the bottom left."
          api='downloadPlacement="bottom-left"'
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            showDownload
            downloadPlacement="bottom-left"
            options={{ showLegend: true }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);

export const CustomTestId = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Stacked Bar Custom Test ID"
        description="Custom test identifiers remain available for Cypress and Testing Library."
        secondaryStatValue="1"
        secondaryStatLabel="Test ID"
      />
      <section css={pageSection}>
        <ChartCard
          title="Custom Test ID"
          description="Overrides the default Stacked Bar test identifier."
          api='testId="custom-stacked-bar-chart-test-id"'
        >
          <StackedBarChart
            labels={labels}
            data={data}
            effect="none"
            testId="custom-stacked-bar-chart-test-id"
            options={{ showLegend: true }}
          />
        </ChartCard>
      </section>
    </div>
  </main>
);
