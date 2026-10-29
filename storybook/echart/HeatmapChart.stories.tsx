/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import HeatmapChart from '@/components/echarts/components/heatmap-chart/HeatmapChart';
import type {
  HeatmapChartEffect,
  HeatmapChartPoint,
} from '@/components/echarts/components/heatmap-chart/HeatmapChart.types';

const meta: Meta<typeof HeatmapChart> = {
  title: 'components/echarts/HeatmapChart',
  component: HeatmapChart,
};

export default meta;

const hours = ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'];
const days = ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun'];

const generateHeatmapData = () => {
  const heatmapData: HeatmapChartPoint[] = [];

  for (let hourIndex = 0; hourIndex < hours.length; hourIndex += 1) {
    for (let dayIndex = 0; dayIndex < days.length; dayIndex += 1) {
      heatmapData.push([hourIndex, dayIndex, ((hourIndex * 13 + dayIndex * 17) % 95) + 5]);
    }
  }

  return {
    xLabels: hours,
    yLabels: days,
    series: [
      {
        label: 'Server Load',
        data: heatmapData,
      },
    ],
  };
};

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const heroBox = css`
  padding: 32px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #f8fafc;
`;

const darkHeroBox = css`
  padding: 32px;
  border: 1px solid #334155;
  border-radius: 16px;
  background: #0f172a;
`;

const customChartVariables = css`
  --wci-chart-blue: #f5456e;
  --wci-chart-teal: #3d9eff;
  --wci-chart-green: #59cc26;
  --wci-chart-orange: #ffae00;
  --wci-chart-red: #ff784d;
  --wci-chart-purple: #8b5cf6;
  --wci-chart-magenta: #ec4899;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #eab308;
  --wci-chart-axis-text: #475569;
  --wci-chart-axis-line: #f5456e;
  --wci-chart-grid: #fee2e2;
  --wci-chart-tooltip-background: #111827;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #334155;
`;

const darkChartVariables = css`
  --wci-chart-blue: #3d9eff;
  --wci-chart-teal: #22d3ee;
  --wci-chart-green: #59cc26;
  --wci-chart-orange: #ffae00;
  --wci-chart-red: #f5456e;
  --wci-chart-purple: #a78bfa;
  --wci-chart-magenta: #f472b6;
  --wci-chart-cyan: #67e8f9;
  --wci-chart-yellow: #facc15;
  --wci-chart-axis-text: #f8fafc;
  --wci-chart-axis-line: #cbd5e1;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #020617;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #475569;
`;

const PageIntro = ({
  title,
  description,
}: {
  readonly title: string;
  readonly description: string;
}) => (
  <FlexLayout direction="column" gap="8px" fullWidth>
    <Typography variant="h1">{title}</Typography>
    <Typography variant="p">{description}</Typography>
  </FlexLayout>
);

const EffectStory = ({
  effect,
  title,
}: {
  readonly effect: HeatmapChartEffect;
  readonly title: string;
}) => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title={title} description={`Heatmap chart using ${effect} animation.`} />

      <Box customStyles={heroBox}>
        <HeatmapChart chartId={`heatmap-${effect}`} data={generateHeatmapData()} effect={effect} />
      </Box>
    </div>
  </main>
);

export const Default = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Default ECharts Heatmap Chart"
        description="Default ECharts heatmap using the shared chart color palette."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart chartId="default-heatmap" data={generateHeatmapData()} effect="none" />
      </Box>
    </div>
  </main>
);

export const CustomColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Colors"
        description="Override the default shared chart palette through the colors prop."
      />

      <FlexLayout columns={12} gap="24px" wrap="wrap">
        <FlexItem columnSpan={{ default: 12 }}>
          <Box customStyles={heroBox}>
            <Typography variant="h3">Single Color Scale</Typography>

            <HeatmapChart
              chartId="heatmap-single-color"
              data={generateHeatmapData()}
              colors={{
                series: ['#3d9eff'],
              }}
            />
          </Box>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12 }}>
          <Box customStyles={heroBox}>
            <Typography variant="h3">Custom Palette</Typography>

            <HeatmapChart
              chartId="heatmap-custom-palette"
              data={generateHeatmapData()}
              colors={{
                series: ['#316851', '#59cc26', '#fac858', '#ff784d', '#b3444d'],
              }}
            />
          </Box>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const WithInternalLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="With Internal Labels"
        description="Show values directly inside each heatmap cell."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          chartId="heatmap-internal-labels"
          data={generateHeatmapData()}
          options={{
            showLabels: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const BoldInternalLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Bold Internal Labels"
        description="Display heatmap values with bold cell labels."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          chartId="heatmap-bold-labels"
          data={generateHeatmapData()}
          options={{
            showLabels: true,
            boldLabels: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const VariableCellSize = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Variable Cell Size"
        description="Heatmap cells grow and shrink based on their values."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          chartId="heatmap-variable-cell-size"
          data={generateHeatmapData()}
          options={{
            cellSizeMode: 'value',
            cellMinSizeRatio: 0.42,
          }}
        />
      </Box>
    </div>
  </main>
);

export const CellAppearance = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Cell Appearance"
        description="Customize the spacing and border radius of heatmap cells."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          chartId="heatmap-cell-appearance"
          data={generateHeatmapData()}
          options={{
            cellGap: 5,
            cellBorderRadius: 8,
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
        title="ECharts Heatmap Crosshair"
        description="The crosshair is disabled by default and enabled only when options.crosshair is true."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          chartId="heatmap-crosshair"
          data={generateHeatmapData()}
          customStyles={{
            wrapper: customChartVariables,
          }}
          options={{
            crosshair: true,
            showLabels: true,
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
        description="Override the generated tooltip configuration through chart options."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          chartId="heatmap-custom-tooltip"
          data={generateHeatmapData()}
          options={{
            tooltip: {
              backgroundColor: '#ffffff',
              borderColor: '#e2e8f0',
              borderWidth: 1,
              textStyle: {
                color: '#0f172a',
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const PiecewiseScale = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Piecewise Scale"
        description="Use a categorical visual map for idle, normal, and critical states."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          chartId="heatmap-piecewise"
          data={generateHeatmapData()}
          options={{
            visualMap: {
              type: 'piecewise',
              pieces: [
                { min: 80, label: 'Critical', color: '#b3444d' },
                { min: 40, max: 79, label: 'Normal', color: '#fac858' },
                { max: 39, label: 'Idle', color: '#316851' },
              ],
              orient: 'horizontal',
              bottom: '0%',
              left: 'center',
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const VisualMapTop = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Visual Map Top"
        description="Move the heatmap visual map to the top of the chart."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          chartId="heatmap-visual-map-top"
          data={generateHeatmapData()}
          options={{
            visualMap: {
              top: '5%',
              orient: 'horizontal',
              left: 'center',
            },
            grid: {
              top: '25%',
              bottom: '8%',
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomChartTokens = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Chart Tokens"
        description="Customize the heatmap using the shared chart CSS variables."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          chartId="heatmap-custom-tokens"
          data={generateHeatmapData()}
          customStyles={{
            wrapper: customChartVariables,
          }}
          options={{
            showLabels: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomColorsProp = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Colors Prop"
        description="Override palette and semantic chart colors directly through the colors prop."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          chartId="heatmap-colors-prop"
          data={generateHeatmapData()}
          colors={{
            series: ['#2563eb', '#06b6d4', '#22c55e', '#eab308', '#ef4444'],
            axisText: '#334155',
            axisLine: '#64748b',
            grid: '#e2e8f0',
            tooltipBackground: '#0f172a',
            tooltipText: '#ffffff',
            tooltipBorder: '#334155',
          }}
          options={{
            showLabels: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const DarkCustomTokens = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Dark Custom Tokens"
        description="Apply a dark heatmap presentation using the shared chart CSS variables."
      />

      <Box customStyles={darkHeroBox}>
        <HeatmapChart
          chartId="heatmap-dark"
          data={generateHeatmapData()}
          customStyles={{
            wrapper: darkChartVariables,
          }}
          options={{
            showLabels: true,
            backgroundColor: '#0f172a',
          }}
        />
      </Box>
    </div>
  </main>
);

export const BounceEffect = () => <EffectStory effect="bounce" title="Bounce Effect" />;

export const WobbleEffect = () => <EffectStory effect="wobble" title="Wobble Effect" />;

export const ElasticEffect = () => <EffectStory effect="elastic" title="Elastic Effect" />;

export const ProgressiveTraceEffect = () => (
  <EffectStory effect="progressive-trace" title="Progressive Trace Effect" />
);

export const ElasticGlideEffect = () => (
  <EffectStory effect="elastic-glide" title="Elastic Glide Effect" />
);

export const StaggeredRevealEffect = () => (
  <EffectStory effect="staggered-reveal" title="Staggered Reveal Effect" />
);

export const CombinedCustomization = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Combined Customization"
        description="Combine shared chart tokens, labels, crosshair, cell styling, and animation."
      />

      <Box customStyles={heroBox}>
        <HeatmapChart
          chartId="heatmap-combined"
          data={generateHeatmapData()}
          effect="progressive-trace"
          customStyles={{
            wrapper: customChartVariables,
          }}
          options={{
            showLabels: true,
            boldLabels: true,
            crosshair: true,
            cellGap: 4,
            cellBorderRadius: 6,
          }}
        />
      </Box>
    </div>
  </main>
);
