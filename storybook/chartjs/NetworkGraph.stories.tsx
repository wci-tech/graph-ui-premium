/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import { NetworkGraph } from '@/components/chartjs/components';
import type { NetworkGraphEffect } from '@/components/chartjs/components/network-graph/NetworkGraph.types';

const meta: Meta<typeof NetworkGraph> = {
  title: 'components/chartjs/NetworkGraph',
  component: NetworkGraph,
};

export default meta;

const simpleNetworkData = {
  nodes: [
    { id: '1', label: 'Central Hub', size: 25 },
    { id: '2', label: 'Node A', size: 15 },
    { id: '3', label: 'Node B', size: 15 },
    { id: '4', label: 'Node C', size: 15 },
  ],
  edges: [
    { from: '1', to: '2' },
    { from: '1', to: '3' },
    { from: '1', to: '4' },
  ],
};

const clusterNetworkData = {
  nodes: [
    { id: '1', label: 'Admin', size: 20 },
    { id: '2', label: 'User A', size: 12 },
    { id: '3', label: 'User B', size: 12 },
    { id: '4', label: 'Database', size: 18 },
    { id: '5', label: 'Server', size: 18 },
    { id: '6', label: 'Cache', size: 10 },
  ],
  edges: [
    { from: '1', to: '4' },
    { from: '1', to: '5' },
    { from: '4', to: '6' },
    { from: '5', to: '6' },
    { from: '2', to: '5' },
    { from: '3', to: '5' },
  ],
};

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  margin-bottom: 16px;
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH2 = css`
  margin-bottom: 12px;
  padding: 16px;
  font-size: 1.875rem;
  font-weight: 600;
`;

const titleH3 = css`
  margin-bottom: 8px;
  font-size: 1.35rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  font-size: 0.95rem;
  line-height: 1.5;
`;

const heroBox = css`
  padding: 40px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 16px;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 14px;
`;

const chartShell = css`
  width: 100%;
  min-height: 420px;
  margin-top: 20px;
`;

const largeChartShell = css`
  width: 100%;
  min-height: 540px;
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

const customChartVariables = css`
  --wci-chart-blue: #d4af37;
  --wci-chart-teal: #2d5a27;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #64748b;
  --wci-chart-grid: #e2e8f0;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #0f172a;
  --wci-chart-tooltip-border: #d4af37;
`;

const darkChartVariables = css`
  --wci-chart-blue: #f5456e;
  --wci-chart-teal: #3d9eff;
  --wci-chart-axis-text: #f8fafc;
  --wci-chart-axis-line: #64748b;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #0f172a;
  --wci-chart-tooltip-text: #f8fafc;
  --wci-chart-tooltip-border: #3d9eff;
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
            color: var(--wci-gray-700);
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

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Default ChartJS Network Graph"
        description="Default force-directed network graph using ChartJS and chartjs-chart-graph."
      />
      <Box customStyles={heroBox}>
        <NetworkGraph data={simpleNetworkData} effect="none" />
      </Box>
    </div>
  </main>
);

const EffectStory = ({
  effect,
  title,
  description,
}: {
  readonly effect: NetworkGraphEffect;
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
            <NetworkGraph data={clusterNetworkData} effect={effect} />
          </div>
        </FlexLayout>
      </Box>
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Bounce animation gives the network graph a playful entrance."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble animation gives the graph a subtle energetic refresh."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic animation adds spring-like movement to the graph nodes."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive trace reveals the network graph over time."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide adds a premium animated entrance."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered reveal animates graph nodes with delay."
  />
);

export const PhysicsAndInteraction = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Network Graph Physics and Interaction"
        description="Customize force simulation values and use Chart.js click handling for node actions."
      />
      <Box customStyles={heroBox}>
        <div css={largeChartShell}>
          <NetworkGraph
            data={clusterNetworkData}
            effect="none"
            options={{
              height: '500px',
              linkDistance: 70,
              manyBodyStrength: -80,
              simulationIterations: 700,
              onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                const firstElement = elements[0];

                if (!firstElement) return;

                const node = clusterNetworkData.nodes[firstElement.index];

                alert(`API Call: Navigating to ${node.label} ID: ${node.id}`);
              },
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
        title="Custom Tooltip"
        description="Customize the Chart.js tooltip configuration for network graph nodes."
      />
      <Box customStyles={heroBox}>
        <NetworkGraph
          data={clusterNetworkData}
          effect="none"
          options={{
            plugins: {
              tooltip: {
                enabled: true,
              },
            },
          }}
          colors={{
            tooltipBackground: '#ffffff',
            tooltipText: '#0f172a',
            tooltipBorder: '#763d6c',
          }}
        />
      </Box>
    </div>
  </main>
);

export const Crosshair = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Network Graph Crosshair"
        description="The crosshair is disabled by default and appears only when options.crosshair is true."
      />
      <Box customStyles={heroBox}>
        <NetworkGraph
          data={clusterNetworkData}
          effect="none"
          options={{
            crosshair: true,
            nodeRadius: 14,
            nodeHoverRadius: 18,
            linkDistance: 70,
            manyBodyStrength: -80,
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Network Graph Custom Colors"
        description="Customize network graph colors through the common semantic colors API."
      />
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Colors"
            description="Overrides node, edge, text, and tooltip colors through the colors API."
            api="colors"
          >
            <NetworkGraph
              data={clusterNetworkData}
              effect="none"
              colors={{
                series: ['#d4af37', '#2d5a27'],
                axisText: '#334155',
                axisLine: '#64748b',
                tooltipBackground: '#ffffff',
                tooltipText: '#0f172a',
                tooltipBorder: '#d4af37',
              }}
              options={{
                linkDistance: 80,
                manyBodyStrength: -90,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Multiple Series Colors"
            description="Uses the common chart series palette for network node and edge colors."
            api="colors.series"
          >
            <NetworkGraph
              data={clusterNetworkData}
              effect="none"
              colors={{
                series: ['#f5456e', '#3d9eff'],
                axisText: '#f8fafc',
                axisLine: '#64748b',
                tooltipBackground: '#0f172a',
                tooltipText: '#f8fafc',
                tooltipBorder: '#3d9eff',
              }}
              options={{
                height: '360px',
                linkDistance: 75,
                manyBodyStrength: -85,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Network Graph Custom Styles"
        description="Override the common chart CSS variables through customStyles without using chart variants."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom CSS Variables"
            description="Overrides semantic chart variables through the Network Graph wrapper."
            api="customStyles.wrapper"
          >
            <NetworkGraph
              data={clusterNetworkData}
              effect="none"
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{
                linkDistance: 80,
                manyBodyStrength: -90,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Dark Mesh Network"
            description="Dark network style using common semantic chart CSS variables."
            api="customStyles.wrapper"
          >
            <NetworkGraph
              data={clusterNetworkData}
              effect="none"
              customStyles={{
                wrapper: darkChartVariables,
              }}
              options={{
                isBoxVisible: false,
                height: '360px',
                linkDistance: 75,
                manyBodyStrength: -85,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
