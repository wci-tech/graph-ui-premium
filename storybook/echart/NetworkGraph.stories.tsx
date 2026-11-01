/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { NetworkGraph } from '@/components/echarts/components';
import type {
  NetworkGraphData,
  NetworkGraphEffect,
} from '@/components/echarts/components/network-graph/NetworkGraph.types';

const meta: Meta<typeof NetworkGraph> = {
  title: 'components/echarts/NetworkGraph',
  component: NetworkGraph,
};

export default meta;

const mockData: NetworkGraphData = {
  series: [
    {
      label: 'Corporate Ecosystem',
      nodes: [
        { name: 'Main Hub', symbolSize: 60 },
        { name: 'Node A', symbolSize: 40 },
        { name: 'Node B', symbolSize: 40 },
        { name: 'Sub-Point 1', symbolSize: 20 },
        { name: 'Sub-Point 2', symbolSize: 20 },
        { name: 'Sub-Point 3', symbolSize: 20 },
        { name: 'Sub-Point 4', symbolSize: 20 },
      ],
      links: [
        { source: 'Main Hub', target: 'Node A' },
        { source: 'Main Hub', target: 'Node B' },
        { source: 'Node A', target: 'Sub-Point 1' },
        { source: 'Node A', target: 'Sub-Point 2' },
        { source: 'Node B', target: 'Sub-Point 3' },
        { source: 'Node B', target: 'Sub-Point 4' },
      ],
    },
  ],
};

const denseData: NetworkGraphData = {
  series: [
    {
      label: 'Infrastructure Mesh',
      nodes: [
        { name: 'Gateway', symbolSize: 64 },
        { name: 'Auth', symbolSize: 42 },
        { name: 'API', symbolSize: 48 },
        { name: 'Billing', symbolSize: 34 },
        { name: 'Search', symbolSize: 34 },
        { name: 'Database', symbolSize: 44 },
        { name: 'Cache', symbolSize: 30 },
        { name: 'Queue', symbolSize: 30 },
        { name: 'Worker A', symbolSize: 24 },
        { name: 'Worker B', symbolSize: 24 },
      ],
      links: [
        { source: 'Gateway', target: 'Auth' },
        { source: 'Gateway', target: 'API' },
        { source: 'API', target: 'Billing' },
        { source: 'API', target: 'Search' },
        { source: 'API', target: 'Database' },
        { source: 'Database', target: 'Cache' },
        { source: 'Billing', target: 'Queue' },
        { source: 'Queue', target: 'Worker A' },
        { source: 'Queue', target: 'Worker B' },
        { source: 'Search', target: 'Cache' },
      ],
    },
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
  padding: 32px;
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
  --wci-chart-blue: #0dd567;
  --wci-chart-teal: #2d5a27;
  --wci-chart-green: #0cbb2c;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #64748b;
  --wci-chart-grid: #e2e8f0;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #0f172a;
  --wci-chart-tooltip-border: #0dd567;
`;

const darkChartVariables = css`
  --wci-chart-blue: #f5456e;
  --wci-chart-teal: #3d9eff;
  --wci-chart-green: #22c55e;
  --wci-chart-axis-text: #f8fafc;
  --wci-chart-axis-line: #94a3b8;
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
            <NetworkGraph data={denseData} effect={effect} />
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
        title="Default ECharts Network Graph"
        description="Default force-directed network graph using the ECharts graph rendering pipeline."
      />
      <Box customStyles={heroBox}>
        <NetworkGraph data={mockData} effect="none" chartId="default-network" />
      </Box>
    </div>
  </main>
);

export const Physics = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Network Graph Physics"
        description="Customize force layout repulsion, gravity, edge length, friction, roam, and node dragging."
      />
      <Box customStyles={heroBox}>
        <div css={largeChartShell}>
          <NetworkGraph
            data={denseData}
            effect="none"
            options={{
              height: '520px',
              repulsion: 220,
              gravity: 0.12,
              edgeLength: [50, 130],
              friction: 0.55,
              roam: true,
              draggable: true,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);

export const CircularLayout = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Circular Network Layout"
        description="Customize the generated graph series using native ECharts series options."
      />
      <Box customStyles={heroBox}>
        <NetworkGraph
          data={mockData}
          effect="none"
          options={{
            series: [
              {
                layout: 'circular',
              },
            ],
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomTooltip = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Tooltip"
        description="Customize tooltip colors through the semantic colors API while keeping tooltip behavior in options."
      />
      <Box customStyles={heroBox}>
        <NetworkGraph
          data={denseData}
          effect="none"
          colors={{
            tooltipBackground: '#ffffff',
            tooltipText: '#475569',
            tooltipBorder: '#763d6c',
          }}
          options={{
            tooltip: {
              trigger: 'item',
              borderWidth: 1,
              textStyle: {
                fontSize: 13,
              },
              extraCssText: 'border-radius:8px;',
            },
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
        title="ECharts Network Graph Crosshair"
        description="The crosshair is disabled by default and appears only when options.crosshair is true."
      />
      <Box customStyles={heroBox}>
        <NetworkGraph
          data={denseData}
          effect="none"
          options={{
            height: '520px',
            crosshair: true,
            repulsion: 220,
            gravity: 0.12,
            edgeLength: [50, 130],
            friction: 0.55,
            roam: true,
            draggable: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Bounce adds a stronger animated entrance to the network graph."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Wobble introduces a subtle oscillating motion as the network graph enters."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Elastic adds a spring-like entrance to the network graph."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Progressive trace animates the network graph into view for dashboard storytelling."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Elastic glide provides a smooth spring-based transition when the network graph is updated."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Staggered reveal delays node animations to help users visually follow relationships."
  />
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ECharts Network Graph Custom Colors"
        description="Customize node, edge, label, and tooltip colors through the semantic colors API."
      />
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Palette"
            description="Overrides the graph palette and semantic text colors."
            api="colors"
          >
            <NetworkGraph
              data={denseData}
              effect="none"
              colors={{
                series: ['#0dd567', '#2d5a27', '#0cbb2c'],
                axisText: '#334155',
                axisLine: '#64748b',
                tooltipBackground: '#ffffff',
                tooltipText: '#0f172a',
                tooltipBorder: '#0dd567',
              }}
              options={{
                repulsion: 180,
                gravity: 0.18,
                edgeLength: [40, 120],
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Dark Palette"
            description="Uses the semantic colors API for a dark network presentation."
            api="colors.series"
          >
            <NetworkGraph
              data={denseData}
              effect="none"
              colors={{
                series: ['#f5456e', '#3d9eff', '#22c55e'],
                axisText: '#f8fafc',
                axisLine: '#94a3b8',
                tooltipBackground: '#0f172a',
                tooltipText: '#f8fafc',
                tooltipBorder: '#3d9eff',
              }}
              options={{
                isBoxVisible: false,
                height: '360px',
                repulsion: 180,
                gravity: 0.18,
                edgeLength: [40, 120],
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
        title="ECharts Network Graph Custom Styles"
        description="Override common semantic chart CSS variables through the Network Graph wrapper."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom CSS Variables"
            description="Overrides the shared semantic chart variables at the wrapper level."
            api="customStyles.wrapper"
          >
            <NetworkGraph
              data={denseData}
              effect="staggered-reveal"
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{
                repulsion: 180,
                gravity: 0.18,
                edgeLength: [40, 120],
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Dark CSS Variables"
            description="Overrides the same semantic variables for a dark graph surface."
            api="customStyles.wrapper"
          >
            <NetworkGraph
              data={denseData}
              effect="staggered-reveal"
              customStyles={{
                wrapper: darkChartVariables,
              }}
              options={{
                isBoxVisible: false,
                height: '360px',
                repulsion: 180,
                gravity: 0.18,
                edgeLength: [40, 120],
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const NodeRelationApi = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Network Graph Interaction"
        description="Use ECharts events to trigger actions for graph nodes and relationships."
      />
      <Box customStyles={heroBox}>
        <NetworkGraph
          data={mockData}
          effect="none"
          options={{
            onEvents: {
              click: (params: unknown) => {
                if (!params || typeof params !== 'object') return;
                const eventParams = params as {
                  dataType?: string;
                  name?: string;
                  data?: {
                    source?: string;
                    target?: string;
                  };
                };
                const message =
                  eventParams.dataType === 'node'
                    ? `Entity: ${eventParams.name ?? ''}`
                    : `Relation: ${eventParams.data?.source ?? ''} to ${
                        eventParams.data?.target ?? ''
                      }`;
                alert(`Network API: ${message}`);
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const LargeInteractiveGraph = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Large Interactive Network Graph"
        description="A larger network graph surface with stronger repulsion, roam, drag, and force layout tuning."
      />
      <Box customStyles={heroBox}>
        <div css={largeChartShell}>
          <NetworkGraph
            data={denseData}
            effect="staggered-reveal"
            options={{
              height: '520px',
              repulsion: 250,
              gravity: 0.12,
              edgeLength: [60, 150],
              friction: 0.55,
              roam: true,
              draggable: true,
            }}
          />
        </div>
      </Box>
    </div>
  </main>
);
