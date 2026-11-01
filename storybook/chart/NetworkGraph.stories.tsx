/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';

import { Chart } from '@/charts/Chart';
import type { ChartData, ChartEffect } from '@/engines/engine.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/NetworkGraph',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type SharedNetworkEffect = Extract<
  ChartEffect,
  | 'none'
  | 'bounce'
  | 'wobble'
  | 'elastic'
  | 'progressive-trace'
  | 'elastic-glide'
  | 'staggered-reveal'
>;

const simpleData: ChartData = {
  labels: [],
  series: [],
  nodes: [
    { id: 'hub', label: 'Central Hub', size: 26 },
    { id: 'analytics', label: 'Analytics', size: 18 },
    { id: 'billing', label: 'Billing', size: 18 },
    { id: 'identity', label: 'Identity', size: 18 },
    { id: 'storage', label: 'Storage', size: 18 },
  ],
  edges: [
    { from: 'hub', to: 'analytics' },
    { from: 'hub', to: 'billing' },
    { from: 'hub', to: 'identity' },
    { from: 'hub', to: 'storage' },
  ],
};

const clusterData: ChartData = {
  labels: [],
  series: [],
  nodes: [
    { id: 'gateway', label: 'API Gateway', size: 26 },
    { id: 'auth', label: 'Authentication', size: 19 },
    { id: 'profile', label: 'Profiles', size: 18 },
    { id: 'orders', label: 'Orders', size: 20 },
    { id: 'payments', label: 'Payments', size: 20 },
    { id: 'inventory', label: 'Inventory', size: 18 },
    { id: 'notifications', label: 'Notifications', size: 17 },
    { id: 'database', label: 'Database', size: 23 },
    { id: 'cache', label: 'Cache', size: 16 },
  ],
  edges: [
    { from: 'gateway', to: 'auth' },
    { from: 'gateway', to: 'profile' },
    { from: 'gateway', to: 'orders' },
    { from: 'gateway', to: 'payments' },
    { from: 'gateway', to: 'inventory' },
    { from: 'gateway', to: 'notifications' },
    { from: 'auth', to: 'database' },
    { from: 'profile', to: 'database' },
    { from: 'orders', to: 'database' },
    { from: 'payments', to: 'database' },
    { from: 'inventory', to: 'database' },
    { from: 'database', to: 'cache' },
  ],
};

const coloredData: ChartData = {
  labels: [],
  series: [],
  nodes: [
    { id: 'gateway', label: 'API Gateway', size: 26, color: '#7c3aed' },
    { id: 'auth', label: 'Authentication', size: 19, color: '#0891b2' },
    { id: 'profile', label: 'Profiles', size: 18, color: '#16a34a' },
    { id: 'orders', label: 'Orders', size: 20, color: '#f59e0b' },
    { id: 'payments', label: 'Payments', size: 20, color: '#e11d48' },
    { id: 'database', label: 'Database', size: 23, color: '#334155' },
  ],
  edges: [
    { from: 'gateway', to: 'auth' },
    { from: 'gateway', to: 'profile' },
    { from: 'gateway', to: 'orders' },
    { from: 'gateway', to: 'payments' },
    { from: 'auth', to: 'database' },
    { from: 'profile', to: 'database' },
    { from: 'orders', to: 'database' },
    { from: 'payments', to: 'database' },
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
  max-width: 920px;
  margin-bottom: 24px;
  font-size: 1rem;
  line-height: 1.6;
`;

const heroBox = css`
  padding: 32px !important;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 16px;
`;

const chartCard = css`
  width: 100%;
  height: 100%;
  min-width: 0;
  padding: 24px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 14px;
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

const customVariables = css`
  --wci-chart-blue: #7c3aed;
  --wci-chart-teal: #ea6906;
  --wci-chart-green: #0dba44;
  --wci-chart-axis-text: #0f5ac4;
  --wci-chart-axis-line: #475569;
  --wci-chart-grid: #e2e8f0;
  --wci-chart-tooltip-background: #111827;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #475569;
`;

const secondaryVariables = css`
  --wci-chart-blue: #16a34a;
  --wci-chart-teal: #f59e0b;
  --wci-chart-green: #334155;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #334155;
  --wci-chart-grid: #e2e8f0;
  --wci-chart-tooltip-background: #111827;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #334155;
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
  secondaryStatValue = '9',
  secondaryStatLabel = 'Nodes',
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

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Network Graph"
        description="The same network data is rendered through Chart 1 and Chart 2 using the shared Chart API."
        secondaryStatValue="5"
        secondaryStatLabel="Nodes"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines receive the same public network data and adapt it internally for their renderer."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders the shared network data with Chart.js."
              api='engine="chart-1"'
            >
              <Chart type="network" engine="chart-1" data={simpleData} effect="none" />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders the same network data with ECharts."
              api='engine="chart-2"'
            >
              <Chart type="network" engine="chart-2" data={simpleData} effect="none" />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
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
  readonly effect: SharedNetworkEffect;
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
          description="The same effect is applied to both engines through the shared Chart API."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders the selected network effect."
              api={`effect="${effect}"`}
            >
              <Chart type="network" engine="chart-1" data={clusterData} effect={effect} />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders the equivalent network effect."
              api={`effect="${effect}"`}
            >
              <Chart type="network" engine="chart-2" data={clusterData} effect={effect} />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const RevealEffect = () => (
  <EffectComparison
    title="Network Reveal Effect"
    description="Nodes and connections progressively enter the graph."
    effect="progressive-trace"
  />
);

export const BounceEffect = () => (
  <EffectComparison
    title="Network Bounce Effect"
    description="Network nodes enter using bounce motion."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Network Wobble Effect"
    description="Network nodes enter using wobble motion."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Network Elastic Effect"
    description="Network nodes enter using elastic movement."
    effect="elastic"
  />
);

export const ElasticGlideEffect = () => (
  <EffectComparison
    title="Network Elastic Glide Effect"
    description="Network nodes use an elastic glide entrance."
    effect="elastic-glide"
  />
);

export const StaggeredRevealEffect = () => (
  <EffectComparison
    title="Network Staggered Reveal"
    description="Network nodes enter sequentially."
    effect="staggered-reveal"
  />
);

export const Crosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Network Graph Crosshair"
        description="Crosshair is disabled by default and enabled explicitly through options.crosshair."
        secondaryStatValue="1"
        secondaryStatLabel="Option"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Crosshair"
          description="Both engines enable their network crosshair only when options.crosshair is true."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 positions the crosshair through the hovered node."
              api="options.crosshair: true"
            >
              <Chart
                type="network"
                engine="chart-1"
                data={clusterData}
                effect="none"
                options={{
                  crosshair: true,
                  nodeRadius: 14,
                  nodeHoverRadius: 19,
                  linkDistance: 70,
                  manyBodyStrength: -80,
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 displays the ECharts network crosshair."
              api="options.crosshair: true"
            >
              <Chart
                type="network"
                engine="chart-2"
                data={clusterData}
                effect="none"
                options={{
                  crosshair: true,
                  repulsion: 220,
                  gravity: 0.12,
                  edgeLength: [50, 130],
                  friction: 0.55,
                  roam: true,
                  draggable: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Network Graph Tooltip"
        description="Both engines use the shared semantic tooltip colors while retaining renderer-specific tooltip options."
      />
      <section css={pageSection}>
        <SectionHeading
          title="Custom Tooltip"
          description="Semantic tooltip colors are passed through the shared colors API."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 receives semantic colors with Chart.js tooltip options."
              api="colors + options.plugins.tooltip"
            >
              <Chart
                type="network"
                engine="chart-1"
                data={clusterData}
                effect="none"
                colors={{
                  tooltipBackground: '#ffffff',
                  tooltipText: '#475569',
                  tooltipBorder: '#763d6c',
                }}
                options={{
                  plugins: {
                    tooltip: {
                      enabled: true,
                      borderWidth: 2,
                      displayColors: false,
                      cornerRadius: 10,
                      padding: 14,
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 receives the same semantic colors with ECharts tooltip options."
              api="colors + options.tooltip"
            >
              <Chart
                type="network"
                engine="chart-2"
                data={clusterData}
                effect="none"
                colors={{
                  tooltipBackground: '#ffffff',
                  tooltipText: '#475569',
                  tooltipBorder: '#763d6c',
                }}
                options={{
                  tooltip: {
                    trigger: 'item',
                    confine: true,
                    borderWidth: 2,
                    padding: 14,
                    extraCssText: 'border-radius:10px;box-shadow:0 10px 25px rgba(15,23,42,0.14);',
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const NodeSize = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Network Graph Node Size"
        description="Compare node sizing controls across Chart 1 and Chart 2."
      />
      <section css={pageSection}>
        <SectionHeading title="Node Size" description="Both charts render larger graph nodes." />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 uses nodeRadius and nodeHoverRadius."
              api="options.nodeRadius + nodeHoverRadius"
            >
              <Chart
                type="network"
                engine="chart-1"
                data={clusterData}
                effect="none"
                options={{
                  nodeRadius: 18,
                  nodeHoverRadius: 24,
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 overrides the generated graph symbol size."
              api="options.series[0].symbolSize"
            >
              <Chart
                type="network"
                engine="chart-2"
                data={clusterData}
                effect="none"
                options={{
                  series: [
                    {
                      symbolSize: 52,
                      emphasis: {
                        scale: 1.25,
                      },
                    },
                  ],
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const EdgeStyling = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Network Graph Edge Styling"
        description="Compare graph connection styling across both engines."
      />
      <section css={pageSection}>
        <SectionHeading
          title="Edge Styling"
          description="Both charts use thicker graph connections."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 increases edge width."
              api="options.edgeWidth"
            >
              <Chart
                type="network"
                engine="chart-1"
                data={clusterData}
                effect="none"
                options={{
                  edgeWidth: 4,
                  linkDistance: 75,
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 customizes line width, opacity, curvature, and style."
              api="options.series[0].lineStyle"
            >
              <Chart
                type="network"
                engine="chart-2"
                data={clusterData}
                effect="none"
                options={{
                  series: [
                    {
                      lineStyle: {
                        width: 4,
                        opacity: 0.85,
                        curveness: 0.1,
                        type: 'dashed',
                      },
                    },
                  ],
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const StaticPresentation = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Static Network Graph"
        description="Interactive movement is reduced for presentation-focused network graphs."
      />
      <section css={pageSection}>
        <SectionHeading
          title="Static Presentation"
          description="Renderer-specific interaction options can still be supplied through the shared options API."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 disables hover events and tooltips."
              api="options.events: []"
            >
              <Chart
                type="network"
                engine="chart-1"
                data={clusterData}
                effect="none"
                options={{
                  events: [],
                  plugins: {
                    tooltip: {
                      enabled: false,
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 disables roaming, dragging, and tooltip display."
              api="options.roam: false"
            >
              <Chart
                type="network"
                engine="chart-2"
                data={clusterData}
                effect="none"
                options={{
                  roam: false,
                  draggable: false,
                  tooltip: {
                    show: false,
                  },
                  series: [
                    {
                      silent: true,
                    },
                  ],
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const NodeLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Network Graph Labels"
        description="Compare node label controls across both renderers."
      />
      <section css={pageSection}>
        <SectionHeading
          title="Node Labels"
          description="Both charts display node names directly on the network."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 displays node names through datalabels."
              api="options.plugins.datalabels"
            >
              <Chart
                type="network"
                engine="chart-1"
                data={clusterData}
                effect="none"
                options={{
                  nodeRadius: 16,
                  nodeHoverRadius: 21,
                  plugins: {
                    datalabels: {
                      display: true,
                      align: 'right',
                      offset: 6,
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 places bold labels below each node."
              api="options.series[0].label"
            >
              <Chart
                type="network"
                engine="chart-2"
                data={clusterData}
                effect="none"
                options={{
                  series: [
                    {
                      label: {
                        show: true,
                        position: 'bottom',
                        distance: 8,
                        fontSize: 12,
                        fontWeight: 'bold',
                      },
                    },
                  ],
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const IndividualNodeColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Individual Node Colors"
        description="The shared network data exposes node colors and each adapter maps them to its renderer."
      />
      <section css={pageSection}>
        <SectionHeading
          title="Individual Node Colors"
          description="Both engines receive exactly the same public node color data."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 receives per-node colors through the shared data API."
              api="data.nodes[].color"
            >
              <Chart
                type="network"
                engine="chart-1"
                data={coloredData}
                effect="none"
                options={{
                  nodeRadius: 16,
                  nodeHoverRadius: 21,
                  edgeWidth: 3,
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 receives the same per-node colors through its adapter."
              api="data.nodes[].color"
            >
              <Chart
                type="network"
                engine="chart-2"
                data={coloredData}
                effect="none"
                options={{
                  repulsion: 260,
                  edgeLength: [60, 130],
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Network Graph Colors"
        description="Both renderers consume the same semantic chart color API."
      />
      <section css={pageSection}>
        <SectionHeading
          title="Custom Colors"
          description="The same series and semantic token colors are passed to both engines."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 resolves the shared semantic colors for Canvas rendering."
              api="colors"
            >
              <Chart
                type="network"
                engine="chart-1"
                data={clusterData}
                effect="none"
                colors={{
                  series: ['#7c3aed', '#ea6906', '#0dba44'],
                  axisText: '#334155',
                  axisLine: '#64748b',
                  tooltipBackground: '#111827',
                  tooltipText: '#ffffff',
                  tooltipBorder: '#475569',
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 consumes the same semantic color values."
              api="colors"
            >
              <Chart
                type="network"
                engine="chart-2"
                data={clusterData}
                effect="none"
                colors={{
                  series: ['#7c3aed', '#ea6906', '#0dba44'],
                  axisText: '#334155',
                  axisLine: '#64748b',
                  tooltipBackground: '#111827',
                  tooltipText: '#ffffff',
                  tooltipBorder: '#475569',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const CustomCssVariables = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Network Graph CSS Variables"
        description="Both engines resolve the same common semantic chart CSS variables."
      />
      <section css={pageSection}>
        <SectionHeading
          title="Custom CSS Variables"
          description="The common --wci-chart-* variables are applied through customStyles.container."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 resolves common semantic variables before Canvas rendering."
              api="customStyles.container"
            >
              <Chart
                type="network"
                engine="chart-1"
                data={clusterData}
                effect="progressive-trace"
                customStyles={{
                  container: customVariables,
                }}
                options={{
                  nodeRadius: 15,
                  nodeHoverRadius: 20,
                  edgeWidth: 3,
                  linkDistance: 80,
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 resolves the same common semantic variables."
              api="customStyles.container"
            >
              <Chart
                type="network"
                engine="chart-2"
                data={clusterData}
                effect="progressive-trace"
                customStyles={{
                  container: customVariables,
                }}
                options={{
                  repulsion: 230,
                  gravity: 0.12,
                  edgeLength: [55, 125],
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const AlternateCssVariables = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Alternate Network Palette"
        description="A second semantic CSS variable palette is shared by both engines."
      />
      <section css={pageSection}>
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 receives the alternate semantic palette."
              api="customStyles.container"
            >
              <Chart
                type="network"
                engine="chart-1"
                data={clusterData}
                effect="none"
                customStyles={{
                  container: secondaryVariables,
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 receives the same alternate semantic palette."
              api="customStyles.container"
            >
              <Chart
                type="network"
                engine="chart-2"
                data={clusterData}
                effect="none"
                customStyles={{
                  container: secondaryVariables,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);
