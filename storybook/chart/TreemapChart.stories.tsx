/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent, TooltipItem } from 'chart.js';

import { Chart } from '@/charts/Chart';
import type { ChartData, ChartEffect } from '@/charts/Chart.types';

const meta: Meta<typeof Chart> = {
  title: 'Components/Charts/TreemapChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Chart>;

const commonData: ChartData = {
  labels: [],
  series: [
    {
      label: 'Technology',
      data: [38, 24],
    },
    {
      label: 'Services',
      data: [18, 12, 8],
    },
  ],
};

const browserMarketData: ChartData = {
  labels: [],
  series: [
    {
      label: 'Chromium',
      data: [64, 14, 2],
    },
    {
      label: 'WebKit',
      data: [12],
    },
    {
      label: 'Gecko',
      data: [7],
    },
    {
      label: 'Other',
      data: [1],
    },
  ],
};

const departmentData: ChartData = {
  labels: [],
  series: [
    {
      label: 'Engineering',
      data: [320],
    },
    {
      label: 'Sales',
      data: [260],
    },
    {
      label: 'Marketing',
      data: [180],
    },
    {
      label: 'Customer Support',
      data: [140],
    },
    {
      label: 'Operations',
      data: [110],
    },
    {
      label: 'Human Resources',
      data: [70],
    },
    {
      label: 'Finance',
      data: [95],
    },
    {
      label: 'Legal',
      data: [45],
    },
  ],
};

const customColorData: ChartData = {
  labels: [],
  series: [
    {
      label: 'Enterprise',
      data: [42],
      color: '#e11d48',
    },
    {
      label: 'Business',
      data: [28],
      color: '#7c3aed',
    },
    {
      label: 'Professional',
      data: [18],
      color: '#0891b2',
    },
    {
      label: 'Starter',
      data: [12],
      color: '#16a34a',
    },
  ],
};

const regionalData: ChartData = {
  labels: [],
  series: [
    {
      label: 'North America',
      data: [28, 9],
    },
    {
      label: 'South America',
      data: [12, 6],
    },
    {
      label: 'Europe',
      data: [10, 14, 8],
    },
    {
      label: 'Asia',
      data: [21, 18, 11],
    },
    {
      label: 'Oceania',
      data: [7],
    },
    {
      label: 'Africa',
      data: [5],
    },
  ],
};

const smallValueData: ChartData = {
  labels: [],
  series: [
    {
      label: 'Inventory',
      data: [120, 82, 64, 34, 20, 12, 4],
    },
  ],
};

const effects: {
  effect: ChartEffect;
  title: string;
  description: string;
}[] = [
  {
    effect: 'none',
    title: 'None',
    description: 'Default treemap rendering without an additional effect.',
  },
  {
    effect: 'bounce',
    title: 'Bounce',
    description: 'Uses the shared bounce animation effect.',
  },
  {
    effect: 'wobble',
    title: 'Wobble',
    description: 'Uses the shared wobble animation effect.',
  },
  {
    effect: 'elastic',
    title: 'Elastic',
    description: 'Uses the shared elastic animation effect.',
  },
  {
    effect: 'progressive-trace',
    title: 'Progressive Trace',
    description: 'Progressively reveals the treemap rectangles.',
  },
  {
    effect: 'elastic-glide',
    title: 'Elastic Glide',
    description: 'Combines smooth movement with elastic easing.',
  },
  {
    effect: 'staggered-reveal',
    title: 'Staggered Reveal',
    description: 'Reveals treemap rectangles with staggered timing.',
  },
];

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
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH2 = css`
  margin-bottom: 12px;
  font-size: 1.875rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const sectionDescription = css`
  max-width: 880px;
  margin-bottom: 24px;
  font-size: 1rem;
  line-height: 1.6;
`;

const heroBox = css`
  padding: 32px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 16px;
`;

const chartCard = css`
  width: 100%;
  height: 100%;
  min-width: 0;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 14px;
`;

const chartShell = css`
  position: relative;
  width: 100%;
  min-width: 0;
  height: 540px;
  margin-top: 16px;
  overflow: hidden;

  > div {
    width: 100%;
    min-width: 0;
    height: 100%;
  }
`;

const largeChartShell = css`
  ${chartShell};
  height: 650px;
`;

const codePill = css`
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  padding: 6px 10px;
  overflow: hidden;
  border-radius: 999px;
  font-family: monospace;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const chartNamePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 5px 10px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const statBox = css`
  min-width: 140px;
  padding: 20px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 10px;
  text-align: center;
`;

const customChartVariables = css`
  --wci-chart-blue: #0cdd4e;
  --wci-chart-teal: #7c3aed;
  --wci-chart-green: #0891b2;
  --wci-chart-orange: #16a34a;
  --wci-chart-red: #ea580c;
  --wci-chart-purple: #9333ea;
  --wci-chart-magenta: #db2777;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #ca8a04;
  --wci-chart-axis-text: #131413;
  --wci-chart-axis-line: #475569;
  --wci-chart-grid: #cbd5e1;
  --wci-chart-tooltip-background: #111827;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #475569;
`;

const softChartVariables = css`
  --wci-chart-blue: #bfdbfe;
  --wci-chart-teal: #99f6e4;
  --wci-chart-green: #bbf7d0;
  --wci-chart-orange: #fed7aa;
  --wci-chart-red: #fecdd3;
  --wci-chart-purple: #ddd6fe;
  --wci-chart-magenta: #fbcfe8;
  --wci-chart-cyan: #cffafe;
  --wci-chart-yellow: #fde68a;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #94a3b8;
  --wci-chart-grid: #cbd5e1;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #334155;
  --wci-chart-tooltip-border: #cbd5e1;
`;

const darkChartVariables = css`
  --wci-chart-blue: #60a5fa;
  --wci-chart-teal: #2dd4bf;
  --wci-chart-green: #86efac;
  --wci-chart-orange: #fb923c;
  --wci-chart-red: #fb7185;
  --wci-chart-purple: #c084fc;
  --wci-chart-magenta: #f472b6;
  --wci-chart-cyan: #22d3ee;
  --wci-chart-yellow: #fbbf24;
  --wci-chart-axis-text: #f8fafc;
  --wci-chart-axis-line: #475569;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #020617;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #475569;
`;

interface PageIntroProps {
  readonly title: string;
  readonly description: string;
  readonly statValue?: string;
  readonly statLabel?: string;
  readonly secondaryStatValue?: string;
  readonly secondaryStatLabel?: string;
}

const PageIntro = ({
  title,
  description,
  statValue = 'treemap',
  statLabel = 'Chart Type',
  secondaryStatValue = 'auto',
  secondaryStatLabel = 'Default Engine',
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
            <Typography variant="p">{statValue}</Typography>
            <Typography variant="span">{statLabel}</Typography>
          </Box>

          <Box customStyles={statBox}>
            <Typography variant="p">{secondaryStatValue}</Typography>
            <Typography variant="span">{secondaryStatLabel}</Typography>
          </Box>
        </FlexLayout>
      </Box>
    </FlexItem>
  </FlexLayout>
);

interface SectionHeadingProps {
  readonly title: string;
  readonly description: string;
}

const SectionHeading = ({ title, description }: SectionHeadingProps) => (
  <>
    <Typography variant="h2" customStyles={titleH2}>
      {title}
    </Typography>
    <Typography variant="p" customStyles={sectionDescription}>
      {description}
    </Typography>
  </>
);

interface ChartCardProps {
  readonly chartName: 'Chart 1' | 'Chart 2';
  readonly description?: string;
  readonly api?: string;
  readonly large?: boolean;
  readonly children: ReactNode;
}

const ChartCard = ({ chartName, description, api, large = false, children }: ChartCardProps) => {
  return (
    <Box customStyles={chartCard}>
      <FlexLayout direction="column" gap="12px">
        <Typography variant="span" customStyles={chartNamePill}>
          {chartName}
        </Typography>

        {description ? (
          <Typography
            variant="p"
            customStyles={css`
              ${paragraphSmall};
              color: var(--wci-gray-700);
            `}
          >
            {description}
          </Typography>
        ) : null}

        {api ? (
          <Typography variant="span" customStyles={codePill}>
            {api}
          </Typography>
        ) : null}

        <div css={large ? largeChartShell : chartShell}>{children}</div>
      </FlexLayout>
    </Box>
  );
};

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

export const DefaultRendering: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Treemap Chart"
          description="ChartJS and ECharts receive the same numeric data through the shared Chart API."
          statValue="2"
          statLabel="Charts"
          secondaryStatValue="5"
          secondaryStatLabel="Rectangles"
        />

        <section css={pageSection}>
          <SectionHeading
            title="Default Rendering"
            description="Each numeric value becomes one treemap rectangle. Both adapters translate the shared data into their engine-specific format."
          />

          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="ChartJS renders the shared numeric treemap data."
                api='engine="chart-1"'
              >
                <Chart
                  type="treemap"
                  engine="chart-1"
                  data={commonData}
                  effect="progressive-trace"
                  options={{ boldLabels: true }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts renders the same shared numeric treemap data."
                api='engine="chart-2"'
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={commonData}
                  effect="progressive-trace"
                  options={{
                    boldLabels: true,
                    leafDepth: null,
                    showUpperLabels: false,
                    showBreadcrumb: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  ),
};

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
        statValue="2"
        statLabel="Charts"
        secondaryStatValue="1"
        secondaryStatLabel="Shared Effect"
      />

      <section css={pageSection}>
        <SectionHeading
          title={`${title} Comparison`}
          description="The same shared effect is passed to both chart engines."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description={`ChartJS using ${effect}.`}
              api={`effect="${effect}"`}
            >
              <Chart type="treemap" engine="chart-1" data={commonData} effect={effect} />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description={`ECharts using ${effect}.`}
              api={`effect="${effect}"`}
            >
              <Chart
                type="treemap"
                engine="chart-2"
                data={commonData}
                effect={effect}
                options={{
                  leafDepth: null,
                  showUpperLabels: false,
                  showBreadcrumb: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const Effects: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Treemap Effects"
          description="Shared animation effects supported by both Treemap engines."
          statValue="7"
          statLabel="Effects"
          secondaryStatValue="2"
          secondaryStatLabel="Engines"
        />

        {effects.map(({ effect, title, description }) => (
          <section key={effect} css={pageSection}>
            <SectionHeading title={title} description={description} />

            <ComparisonGrid>
              <ComparisonItem>
                <ChartCard
                  chartName="Chart 1"
                  description={`ChartJS using ${effect}.`}
                  api={`effect="${effect}"`}
                >
                  <Chart type="treemap" engine="chart-1" data={commonData} effect={effect} />
                </ChartCard>
              </ComparisonItem>

              <ComparisonItem>
                <ChartCard
                  chartName="Chart 2"
                  description={`ECharts using ${effect}.`}
                  api={`effect="${effect}"`}
                >
                  <Chart
                    type="treemap"
                    engine="chart-2"
                    data={commonData}
                    effect={effect}
                    options={{
                      leafDepth: null,
                      showUpperLabels: false,
                      showBreadcrumb: true,
                    }}
                  />
                </ChartCard>
              </ComparisonItem>
            </ComparisonGrid>
          </section>
        ))}
      </div>
    </main>
  ),
};

export const ProgressiveTraceEffect: Story = {
  render: () => (
    <EffectComparison
      title="Treemap Progressive Trace"
      description="Both Treemap engines use the shared progressive-trace effect."
      effect="progressive-trace"
    />
  ),
};

export const BounceEffect: Story = {
  render: () => (
    <EffectComparison
      title="Treemap Bounce"
      description="Both Treemap engines use the shared bounce effect."
      effect="bounce"
    />
  ),
};

export const WobbleEffect: Story = {
  render: () => (
    <EffectComparison
      title="Treemap Wobble"
      description="Both Treemap engines use the shared wobble effect."
      effect="wobble"
    />
  ),
};

export const ElasticEffect: Story = {
  render: () => (
    <EffectComparison
      title="Treemap Elastic"
      description="Both Treemap engines use the shared elastic effect."
      effect="elastic"
    />
  ),
};

export const ElasticGlideEffect: Story = {
  render: () => (
    <EffectComparison
      title="Treemap Elastic Glide"
      description="Both Treemap engines use the shared elastic-glide effect."
      effect="elastic-glide"
    />
  ),
};

export const StaggeredRevealEffect: Story = {
  render: () => (
    <EffectComparison
      title="Treemap Staggered Reveal"
      description="Both Treemap engines use the shared staggered-reveal effect."
      effect="staggered-reveal"
    />
  ),
};

export const Options: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Treemap Options"
          description="Comparison of the main options supported by the ChartJS and ECharts Treemap implementations."
          statValue="6"
          statLabel="Options"
          secondaryStatValue="2"
          secondaryStatLabel="Engines"
        />

        <section css={pageSection}>
          <SectionHeading
            title="Hidden Labels"
            description="Labels can be hidden while retaining tooltip interaction."
          />

          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="ChartJS with labels disabled."
                api="options.showLabels: false"
              >
                <Chart
                  type="treemap"
                  engine="chart-1"
                  data={browserMarketData}
                  effect="none"
                  options={{ showLabels: false }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts with labels disabled."
                api="options.showLabels: false"
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={browserMarketData}
                  effect="none"
                  options={{
                    showLabels: false,
                    showUpperLabels: false,
                    leafDepth: null,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>

        <section css={pageSection}>
          <SectionHeading
            title="Bold Labels"
            description="Both implementations use stronger typography for node labels."
          />

          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="ChartJS using bold labels."
                api="options.boldLabels: true"
              >
                <Chart
                  type="treemap"
                  engine="chart-1"
                  data={commonData}
                  effect="none"
                  options={{ boldLabels: true }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts using bold labels."
                api="options.boldLabels: true"
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={commonData}
                  effect="none"
                  options={{
                    boldLabels: true,
                    leafDepth: null,
                    showUpperLabels: false,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>

        <section css={pageSection}>
          <SectionHeading
            title="Value Formatting"
            description="Both implementations customize the value displayed in their tooltip."
          />

          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="ChartJS formats values as percentages."
                api="options.valueFormatter"
              >
                <Chart
                  type="treemap"
                  engine="chart-1"
                  data={browserMarketData}
                  effect="none"
                  options={{
                    minimumLabelValue: 7,
                    boldLabels: true,
                    valueFormatter: (value: number) => `${value}%`,
                  }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts appends a percentage suffix."
                api="options.valueSuffix"
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={browserMarketData}
                  effect="none"
                  options={{
                    valueSuffix: '%',
                    boldLabels: true,
                    leafDepth: null,
                    showUpperLabels: false,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>

        <section css={pageSection}>
          <SectionHeading
            title="Small Value Handling"
            description="Both engines provide a way to reduce visual noise for small values."
          />

          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="ChartJS hides labels below the minimum value."
                api="minimumLabelValue: 20"
              >
                <Chart
                  type="treemap"
                  engine="chart-1"
                  data={smallValueData}
                  effect="none"
                  options={{
                    minimumLabelValue: 20,
                    boldLabels: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts reduces nodes below visibleMin."
                api="visibleMin: 20"
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={smallValueData}
                  effect="none"
                  options={{
                    visibleMin: 20,
                    boldLabels: true,
                    leafDepth: null,
                    showUpperLabels: false,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>

        <section css={pageSection}>
          <SectionHeading
            title="ECharts Navigation"
            description="ECharts supports Treemap-specific breadcrumb, drill-down, and roaming behavior."
          />

          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="Move navigation without scale zoom."
                api="options.roam: move"
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={commonData}
                  effect="none"
                  options={{
                    roam: 'move',
                    nodeClick: 'zoomToNode',
                    showBreadcrumb: true,
                    leafDepth: 1,
                  }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="Disables node click and renders the complete hierarchy."
                api="options.nodeClick: false"
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={commonData}
                  effect="none"
                  options={{
                    roam: false,
                    nodeClick: false,
                    leafDepth: null,
                    showUpperLabels: false,
                    showBreadcrumb: false,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>

        <section css={pageSection}>
          <SectionHeading
            title="Click Handling"
            description="ChartJS supports application-level click handling while ECharts provides native Treemap node interaction."
          />

          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="Click a ChartJS rectangle to inspect its generated index."
                api="options.onClick"
              >
                <Chart
                  type="treemap"
                  engine="chart-1"
                  data={browserMarketData}
                  effect="none"
                  options={{
                    onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                      const selectedElement = elements[0];
                      if (!selectedElement) return;

                      alert(
                        [
                          'Treemap rectangle selected',
                          `Rectangle index: ${selectedElement.index}`,
                        ].join('\n'),
                      );
                    },
                  }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts uses native move and scale interaction."
                api="options.roam: true"
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={departmentData}
                  effect="none"
                  options={{
                    roam: true,
                    nodeClick: false,
                    leafDepth: null,
                    showUpperLabels: false,
                    showBreadcrumb: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  ),
};

export const CustomTooltip: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Treemap Custom Tooltip"
          description="Engine-specific tooltip configuration while using the same shared chart data."
          statValue="2"
          statLabel="Charts"
          secondaryStatValue="1"
          secondaryStatLabel="Dataset"
        />

        <section css={pageSection}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="ChartJS custom Treemap tooltip."
                api="options.plugins.tooltip"
              >
                <Chart
                  type="treemap"
                  engine="chart-1"
                  data={browserMarketData}
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
                        bodyColor: '#334155',
                        displayColors: true,
                        caretSize: 8,
                        callbacks: {
                          label: (item: TooltipItem<'treemap'>) => {
                            const raw = item.raw;

                            if (
                              !raw ||
                              typeof raw !== 'object' ||
                              !('v' in raw) ||
                              typeof raw.v !== 'number'
                            ) {
                              return '';
                            }

                            return `Value: ${raw.v}`;
                          },
                        },
                      },
                    },
                  }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts custom item tooltip."
                api="options.tooltip"
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={browserMarketData}
                  effect="none"
                  options={{
                    leafDepth: null,
                    showUpperLabels: false,
                    showBreadcrumb: true,
                    tooltip: {
                      trigger: 'item',
                      backgroundColor: '#ffffff',
                      borderColor: '#f5456e',
                      borderWidth: 2,
                      padding: 14,
                      textStyle: {
                        color: '#111827',
                        fontSize: 13,
                      },
                      valueFormatter: (value: unknown) => `Value: ${String(value)}`,
                    },
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  ),
};

export const Colors: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Treemap Colors"
          description="Series colors, shared color props, and the common --wci-chart-* CSS variable system."
          statValue="3"
          statLabel="Examples"
          secondaryStatValue="9"
          secondaryStatLabel="Palette Colors"
        />

        <section css={pageSection}>
          <SectionHeading
            title="Series Colors"
            description="Explicit colors defined on shared series are preserved by both adapters."
          />

          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="ChartJS using explicit shared series colors."
                api="data.series.color"
              >
                <Chart
                  type="treemap"
                  engine="chart-1"
                  data={customColorData}
                  effect="progressive-trace"
                  options={{ boldLabels: true }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts using the same shared series colors."
                api="data.series.color"
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={customColorData}
                  effect="progressive-trace"
                  options={{
                    boldLabels: true,
                    leafDepth: null,
                    showUpperLabels: false,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>

        <section css={pageSection}>
          <SectionHeading
            title="Colors API"
            description="Both implementations receive the same shared chart palette and semantic colors."
          />

          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                chartName="Chart 1"
                description="ChartJS using the shared colors prop."
                api="colors.series"
              >
                <Chart
                  type="treemap"
                  engine="chart-1"
                  data={commonData}
                  effect="none"
                  colors={{
                    series: ['#2563eb', '#0d9488', '#16a34a', '#ea580c', '#7c3aed'],
                    axisText: '#334155',
                    axisLine: '#475569',
                    grid: '#cbd5e1',
                    tooltipBackground: '#ffffff',
                    tooltipText: '#0f172a',
                    tooltipBorder: '#94a3b8',
                  }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                chartName="Chart 2"
                description="ECharts using the same shared colors prop."
                api="colors.series"
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={commonData}
                  effect="none"
                  colors={{
                    series: ['#2563eb', '#0d9488', '#16a34a', '#ea580c', '#7c3aed'],
                    axisText: '#334155',
                    axisLine: '#475569',
                    grid: '#cbd5e1',
                    tooltipBackground: '#ffffff',
                    tooltipText: '#0f172a',
                    tooltipBorder: '#94a3b8',
                  }}
                  options={{
                    leafDepth: null,
                    showUpperLabels: false,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>

        <section css={pageSection}>
          <SectionHeading
            title="Shared CSS Variables"
            description="Both engines consume the common --wci-chart-* variable system instead of Treemap-specific CSS variables."
          />

          <div css={customChartVariables}>
            <ComparisonGrid>
              <ComparisonItem>
                <ChartCard
                  chartName="Chart 1"
                  description="ChartJS using shared chart CSS variables."
                  api="--wci-chart-*"
                >
                  <Chart
                    type="treemap"
                    engine="chart-1"
                    data={commonData}
                    effect="progressive-trace"
                    options={{ boldLabels: true }}
                  />
                </ChartCard>
              </ComparisonItem>

              <ComparisonItem>
                <ChartCard
                  chartName="Chart 2"
                  description="ECharts using the same shared chart CSS variables."
                  api="--wci-chart-*"
                >
                  <Chart
                    type="treemap"
                    engine="chart-2"
                    data={commonData}
                    effect="progressive-trace"
                    options={{
                      boldLabels: true,
                      leafDepth: null,
                      showUpperLabels: false,
                    }}
                  />
                </ChartCard>
              </ComparisonItem>
            </ComparisonGrid>
          </div>
        </section>

        <section css={pageSection}>
          <SectionHeading
            title="Soft Palette"
            description="Both engines use the same soft shared chart palette."
          />

          <div css={softChartVariables}>
            <ComparisonGrid>
              <ComparisonItem>
                <ChartCard
                  chartName="Chart 1"
                  description="ChartJS using the soft shared palette."
                  api="--wci-chart-*"
                >
                  <Chart
                    type="treemap"
                    engine="chart-1"
                    data={browserMarketData}
                    effect="elastic"
                    options={{ boldLabels: true }}
                  />
                </ChartCard>
              </ComparisonItem>

              <ComparisonItem>
                <ChartCard
                  chartName="Chart 2"
                  description="ECharts using the same soft shared palette."
                  api="--wci-chart-*"
                >
                  <Chart
                    type="treemap"
                    engine="chart-2"
                    data={browserMarketData}
                    effect="elastic"
                    options={{
                      boldLabels: true,
                      leafDepth: null,
                      showUpperLabels: false,
                    }}
                  />
                </ChartCard>
              </ComparisonItem>
            </ComparisonGrid>
          </div>
        </section>

        <section css={pageSection}>
          <SectionHeading
            title="Dark Palette"
            description="Both Treemap engines use shared dark-surface chart variables."
          />

          <div css={darkChartVariables}>
            <ComparisonGrid>
              <ComparisonItem>
                <ChartCard
                  chartName="Chart 1"
                  description="ChartJS using the dark shared palette."
                  api="--wci-chart-*"
                >
                  <Chart
                    type="treemap"
                    engine="chart-1"
                    data={commonData}
                    effect="progressive-trace"
                    options={{
                      chartBackground: '#0f172a',
                      boldLabels: true,
                    }}
                  />
                </ChartCard>
              </ComparisonItem>

              <ComparisonItem>
                <ChartCard
                  chartName="Chart 2"
                  description="ECharts using the matching dark shared palette."
                  api="--wci-chart-*"
                >
                  <Chart
                    type="treemap"
                    engine="chart-2"
                    data={commonData}
                    effect="progressive-trace"
                    options={{
                      backgroundColor: '#0f172a',
                      boldLabels: true,
                      leafDepth: null,
                      showUpperLabels: false,
                    }}
                  />
                </ChartCard>
              </ComparisonItem>
            </ComparisonGrid>
          </div>
        </section>
      </div>
    </main>
  ),
};

export const LargeDataset: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Treemap Large Dataset"
          description="A larger regional dataset tests responsive rendering and small-value handling."
          statValue="2"
          statLabel="Charts"
          secondaryStatValue="6"
          secondaryStatLabel="Regions"
        />

        <section css={pageSection}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                large
                chartName="Chart 1"
                description="ChartJS filters labels below value six."
                api="minimumLabelValue: 6"
              >
                <Chart
                  type="treemap"
                  engine="chart-1"
                  data={regionalData}
                  effect="staggered-reveal"
                  options={{
                    height: 650,
                    minimumLabelValue: 6,
                    boldLabels: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                large
                chartName="Chart 2"
                description="ECharts reduces small-node visual noise."
                api="visibleMin: 6"
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={regionalData}
                  effect="staggered-reveal"
                  options={{
                    height: 650,
                    visibleMin: 6,
                    boldLabels: true,
                    leafDepth: null,
                    showUpperLabels: false,
                    showBreadcrumb: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  ),
};

export const CustomHeight: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Treemap Custom Height"
          description="Both Treemap engines render inside matching 650px chart containers."
          statValue="650"
          statLabel="Height"
          secondaryStatValue="2"
          secondaryStatLabel="Charts"
        />

        <section css={pageSection}>
          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard
                large
                chartName="Chart 1"
                description="ChartJS rendered at 650 pixels."
                api="options.height: 650"
              >
                <Chart
                  type="treemap"
                  engine="chart-1"
                  data={departmentData}
                  effect="none"
                  options={{
                    height: 650,
                    boldLabels: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard
                large
                chartName="Chart 2"
                description="ECharts rendered at the same height."
                api="options.height: 650"
              >
                <Chart
                  type="treemap"
                  engine="chart-2"
                  data={departmentData}
                  effect="none"
                  options={{
                    height: 650,
                    boldLabels: true,
                    leafDepth: null,
                    showUpperLabels: false,
                    showBreadcrumb: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  ),
};
