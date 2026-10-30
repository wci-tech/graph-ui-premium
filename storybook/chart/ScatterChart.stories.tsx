/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import {
  Box,
  compactObject,
  FlexItem,
  FlexLayout,
  responsive,
  Typography,
} from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts/Chart';
import type {
  ChartCustomStyles,
  ChartData,
  ChartEffect,
  ChartOptions,
} from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/ScatterChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type SharedScatterEffect = Extract<
  ChartEffect,
  | 'none'
  | 'bounce'
  | 'wobble'
  | 'elastic'
  | 'progressive-trace'
  | 'elastic-glide'
  | 'staggered-reveal'
>;

interface ScatterComparisonProps {
  readonly data: ChartData;
  readonly effect?: SharedScatterEffect;
  readonly options?: ChartOptions;
  readonly customStyles?: ChartCustomStyles;
}

const SCATTER_EFFECTS: readonly SharedScatterEffect[] = [
  'bounce',
  'wobble',
  'elastic',
  'progressive-trace',
  'elastic-glide',
  'staggered-reveal',
  'none',
];

const scatterData: ChartData = {
  labels: [],
  series: [
    {
      label: 'Performance A',
      data: [
        { x: 10, y: 20 },
        { x: 15, y: 10 },
        { x: 20, y: 30 },
        { x: 25, y: 25 },
        { x: 30, y: 40 },
      ],
    },
    {
      label: 'Performance B',
      data: [
        { x: 12, y: 15 },
        { x: 18, y: 25 },
        { x: 22, y: 10 },
        { x: 28, y: 35 },
        { x: 35, y: 30 },
      ],
    },
  ],
};

const extendedScatterData: ChartData = {
  labels: [],
  series: [
    {
      label: 'Performance A',
      data: [
        { x: 5, y: 12 },
        { x: 10, y: 30 },
        { x: 15, y: 22 },
        { x: 20, y: 46 },
        { x: 25, y: 35 },
        { x: 30, y: 58 },
        { x: 35, y: 42 },
        { x: 40, y: 70 },
      ],
    },
    {
      label: 'Performance B',
      data: [
        { x: 6, y: 25 },
        { x: 11, y: 18 },
        { x: 16, y: 38 },
        { x: 21, y: 28 },
        { x: 26, y: 52 },
        { x: 31, y: 44 },
        { x: 36, y: 63 },
        { x: 41, y: 54 },
      ],
    },
  ],
};

const coloredScatterData: ChartData = {
  labels: [],
  series: [
    {
      label: 'Performance A',
      color: '#7c3aed',
      data: [
        { x: 10, y: 20 },
        { x: 15, y: 10 },
        { x: 20, y: 30 },
        { x: 25, y: 25 },
        { x: 30, y: 40 },
      ],
    },
    {
      label: 'Performance B',
      color: '#0891b2',
      data: [
        { x: 12, y: 15 },
        { x: 18, y: 25 },
        { x: 22, y: 10 },
        { x: 28, y: 35 },
        { x: 35, y: 30 },
      ],
    },
  ],
};

const sizedScatterData: ChartData = {
  labels: [],
  series: [
    {
      label: 'Performance A',
      pointRadius: 6,
      data: [
        { x: 10, y: 20 },
        { x: 15, y: 10 },
        { x: 20, y: 30 },
        { x: 25, y: 25 },
        { x: 30, y: 40 },
      ],
    },
    {
      label: 'Performance B',
      pointRadius: 14,
      data: [
        { x: 12, y: 15 },
        { x: 18, y: 25 },
        { x: 22, y: 10 },
        { x: 28, y: 35 },
        { x: 35, y: 30 },
      ],
    },
  ],
};

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

const customVariables = css`
  --wci-chart-blue: #7c3aed;
  --wci-chart-teal: #0891b2;
  --wci-chart-green: #16a34a;
  --wci-chart-orange: #f97316;
  --wci-chart-red: #dc2626;
  --wci-chart-purple: #9333ea;
  --wci-chart-magenta: #db2777;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #eab308;

  --wci-chart-axis-text: #0dba44;
  --wci-chart-axis-line: #f97316;
  --wci-chart-grid: #cbd5e1;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #111827;
  --wci-chart-tooltip-border: #475569;
`;

type PageIntroProps = {
  readonly title: string;
  readonly description: string;
  readonly statValue?: string;
  readonly statLabel?: string;
  readonly secondaryStatValue?: string;
  readonly secondaryStatLabel?: string;
};

const PageIntro = ({
  title,
  description,
  statValue = '2',
  statLabel = 'Charts',
  secondaryStatValue = '2',
  secondaryStatLabel = 'Series',
}: PageIntroProps) => (
  <FlexLayout
    direction={{
      default: 'column',
      md: 'row',
    }}
    columns={12}
    padding={{ default: 0 }}
    gap={{
      default: '32px',
      md: '60px',
    }}
    fullWidth
  >
    <FlexItem
      columnSpan={{
        default: 12,
        md: 7,
      }}
    >
      <Typography variant="h1" customStyles={titleH1}>
        {title}
      </Typography>

      <Typography variant="p" customStyles={paragraph}>
        {description}
      </Typography>
    </FlexItem>

    <FlexItem
      columnSpan={{
        default: 12,
        md: 5,
      }}
    >
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
}: {
  readonly chartName: 'Chart 1' | 'Chart 2';
  readonly description: string;
  readonly api: string;
  readonly children: ReactNode;
}) => (
  <Box customStyles={chartCard}>
    <FlexLayout direction="column" gap="12px">
      <Typography variant="span" customStyles={chartNamePill}>
        {chartName}
      </Typography>

      <Typography variant="p" customStyles={paragraphSmall}>
        {description}
      </Typography>

      <Typography variant="span" customStyles={paragraphSmall}>
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
    gap={{
      default: '24px',
      md: '32px',
    }}
    wrap="wrap"
    fullWidth
  >
    {children}
  </FlexLayout>
);

const ComparisonItem = ({ children }: { readonly children: ReactNode }) => (
  <FlexItem
    columnSpan={{
      default: 12,
      lg: 6,
    }}
  >
    {children}
  </FlexItem>
);

const ScatterComparison = ({
  data,
  effect = 'none',
  options,
  customStyles,
}: ScatterComparisonProps) => {
  const sharedProps = compactObject({
    type: 'scatter' as const,
    data,
    effect,
    customStyles,
    options: {
      height: 650,
      ...options,
    },
  });

  return (
    <ComparisonGrid>
      <ComparisonItem>
        <ChartCard
          chartName="Chart 1"
          description="Chart.js renderer using normalized shared scatter data."
          api='engine="chart-1"'
        >
          <Chart {...sharedProps} engine="chart-1" />
        </ChartCard>
      </ComparisonItem>

      <ComparisonItem>
        <ChartCard
          chartName="Chart 2"
          description="ECharts renderer using the same normalized shared scatter data."
          api='engine="chart-2"'
        >
          <Chart {...sharedProps} engine="chart-2" />
        </ChartCard>
      </ComparisonItem>
    </ComparisonGrid>
  );
};

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Chart"
        description="The same normalized scatter data is rendered by Chart 1 and Chart 2."
        secondaryStatValue="10"
        secondaryStatLabel="Points"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines receive the same shared x/y point structure. Their adapters convert that data into the renderer-specific format."
        />

        <ScatterComparison
          data={scatterData}
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
  readonly effect: SharedScatterEffect;
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
          description="The same shared effect is resolved independently by Chart 1 and Chart 2."
        />

        <ScatterComparison
          data={extendedScatterData}
          effect={effect}
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
    title="Scatter Bounce Effect"
    description="Scatter points enter using bounce motion."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Scatter Wobble Effect"
    description="Scatter points enter using wobble motion."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Scatter Elastic Effect"
    description="Scatter points enter using elastic movement."
    effect="elastic"
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectComparison
    title="Scatter Progressive Trace"
    description="Scatter points progressively reveal across the plot."
    effect="progressive-trace"
  />
);

export const ElasticGlideEffect = () => (
  <EffectComparison
    title="Scatter Elastic Glide"
    description="Scatter points enter using the shared elastic glide effect."
    effect="elastic-glide"
  />
);

export const StaggeredRevealEffect = () => (
  <EffectComparison
    title="Scatter Staggered Reveal"
    description="Scatter points enter sequentially."
    effect="staggered-reveal"
  />
);

export const AllEffects = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Chart Effects"
        description="All shared Scatter Chart effects are compared across Chart 1 and Chart 2."
        statValue={String(SCATTER_EFFECTS.length)}
        statLabel="Effects"
        secondaryStatValue={String(SCATTER_EFFECTS.length * 2)}
        secondaryStatLabel="Charts"
      />

      {SCATTER_EFFECTS.map((effect) => (
        <section key={effect} css={pageSection}>
          <SectionHeading
            title={effect}
            description={`Comparison of the ${effect} effect across both Scatter Chart engines.`}
          />

          <ScatterComparison
            data={extendedScatterData}
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

export const CommonOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Chart Options"
        description="Common Scatter Chart options are applied to the same normalized data across both engines."
        statValue="6"
        statLabel="Option Groups"
        secondaryStatValue="12"
        secondaryStatLabel="Examples"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Legend"
          description="Both Scatter Chart engines display the series legend."
        />

        <ScatterComparison
          data={scatterData}
          options={{
            showLegend: true,
          }}
        />
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Hidden Legend"
          description="The shared showLegend option hides the legend in both Scatter Chart engines."
        />

        <ScatterComparison
          data={scatterData}
          options={{
            showLegend: false,
          }}
        />
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Crosshair"
          description="The crosshair is disabled by default and enabled only when options.crosshair is true."
        />

        <ScatterComparison
          data={extendedScatterData}
          options={{
            crosshair: true,
            showLegend: true,
          }}
        />
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Bold Labels and Legends"
          description="Both engines apply bold axis and legend labels through the shared Scatter Chart options."
        />

        <ScatterComparison
          data={extendedScatterData}
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
          }}
        />
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Custom Series Colors"
          description="Series-level colors override the default shared Scatter Chart palette in both engines."
        />

        <ScatterComparison
          data={coloredScatterData}
          options={{
            showLegend: true,
          }}
        />
      </section>

      <section css={pageSection}>
        <SectionHeading
          title="Point Radius"
          description="Series-level pointRadius is normalized through the shared Chart data and respected by both renderers."
        />

        <ScatterComparison
          data={sizedScatterData}
          options={{
            showLegend: true,
          }}
        />
      </section>
    </div>
  </main>
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Chart Colors"
        description="The shared colors API supplies the same series and chart token colors to both Scatter Chart engines."
        statValue="7"
        statLabel="Color Tokens"
        secondaryStatValue="2"
        secondaryStatLabel="Charts"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Custom Colors"
          description="Both engines receive the same normalized colors configuration."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 resolves the shared Scatter Chart colors."
              api="colors"
            >
              <Chart
                type="scatter"
                engine="chart-1"
                data={scatterData}
                effect="none"
                colors={{
                  series: ['#2563eb', '#db2777'],
                  axisText: '#334155',
                  axisLine: '#64748b',
                  grid: '#e2e8f0',
                  tooltipBackground: '#ffffff',
                  tooltipText: '#0f172a',
                  tooltipBorder: '#cbd5e1',
                }}
                options={{
                  height: 650,
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 resolves the same shared Scatter Chart colors."
              api="colors"
            >
              <Chart
                type="scatter"
                engine="chart-2"
                data={scatterData}
                effect="none"
                colors={{
                  series: ['#2563eb', '#db2777'],
                  axisText: '#334155',
                  axisLine: '#64748b',
                  grid: '#e2e8f0',
                  tooltipBackground: '#ffffff',
                  tooltipText: '#0f172a',
                  tooltipBorder: '#cbd5e1',
                }}
                options={{
                  height: 650,
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const CustomChartTokens = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Scatter Chart CSS Tokens"
        description="Shared WCI chart CSS variables customize both Scatter Chart engines from the outer Chart container."
        statValue="1"
        statLabel="Token System"
        secondaryStatValue="2"
        secondaryStatLabel="Charts"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Shared Chart Tokens"
          description="Both engines resolve the same shared series, axis, grid, and tooltip CSS variables."
        />

        <ScatterComparison
          data={extendedScatterData}
          customStyles={{
            container: customVariables,
          }}
          options={{
            showLegend: true,
            boldLabels: true,
            boldLegends: true,
            crosshair: true,
          }}
        />
      </section>
    </div>
  </main>
);
