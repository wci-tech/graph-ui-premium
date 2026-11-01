/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import { TreemapChart } from '@/components/chartjs/components';
import type {
  TreemapChartEffect,
  TreemapChartItem,
} from '@/components/chartjs/components/treemap-chart/TreemapChart.types';

const meta: Meta<typeof TreemapChart> = {
  title: 'components/chartjs/TreemapChart',
  component: TreemapChart,
};

export default meta;

const mockData: TreemapChartItem[] = [
  { label: 'Cloud Services', value: 38, group: 'Technology' },
  { label: 'Hardware', value: 24, group: 'Technology' },
  { label: 'Consulting', value: 18, group: 'Services' },
  { label: 'Support', value: 12, group: 'Services' },
  { label: 'Training', value: 8, group: 'Services' },
];

const browserMarketData: TreemapChartItem[] = [
  { label: 'Chrome', value: 64, group: 'Chromium' },
  { label: 'Edge', value: 14, group: 'Chromium' },
  { label: 'Safari', value: 12, group: 'WebKit' },
  { label: 'Firefox', value: 7, group: 'Gecko' },
  { label: 'Opera', value: 2, group: 'Chromium' },
  { label: 'Other', value: 1, group: 'Other' },
];

const customColorData: TreemapChartItem[] = [
  { label: 'Enterprise', value: 42, group: 'Customers', color: '#e11d48' },
  { label: 'Business', value: 28, group: 'Customers', color: '#7c3aed' },
  { label: 'Professional', value: 18, group: 'Customers', color: '#0891b2' },
  { label: 'Starter', value: 12, group: 'Customers', color: '#16a34a' },
];

const largeDataset: TreemapChartItem[] = [
  { label: 'United States', value: 28, group: 'North America' },
  { label: 'Canada', value: 9, group: 'North America' },
  { label: 'Brazil', value: 12, group: 'South America' },
  { label: 'Argentina', value: 6, group: 'South America' },
  { label: 'United Kingdom', value: 10, group: 'Europe' },
  { label: 'Germany', value: 14, group: 'Europe' },
  { label: 'France', value: 8, group: 'Europe' },
  { label: 'India', value: 21, group: 'Asia' },
  { label: 'China', value: 18, group: 'Asia' },
  { label: 'Japan', value: 11, group: 'Asia' },
  { label: 'Australia', value: 7, group: 'Oceania' },
  { label: 'South Africa', value: 5, group: 'Africa' },
];

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
  padding: 32px !important;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 16px;
`;

const chartCard = css`
  width: 100%;
  height: 100%;
  padding: 24px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 14px;
`;

const chartShell = css`
  width: 100%;
  min-height: 450px;
  margin-top: 20px;
`;

const codePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 999px;
  font-family: monospace;
  font-size: 12px;
`;

const customChartVariables = css`
  --wci-chart-blue: #e11d48;
  --wci-chart-teal: #7c3aed;
  --wci-chart-green: #0891b2;
  --wci-chart-orange: #16a34a;
  --wci-chart-red: #ea580c;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #64748b;
  --wci-chart-grid: #e2e8f0;
  --wci-chart-tooltip-background: #111827;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #475569;
`;

const darkChartVariables = css`
  --wci-chart-blue: #fb7185;
  --wci-chart-teal: #60a5fa;
  --wci-chart-green: #86efac;
  --wci-chart-orange: #fbbf24;
  --wci-chart-red: #fb923c;
  --wci-chart-axis-text: #f8fafc;
  --wci-chart-axis-line: #94a3b8;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #f8fafc;
  --wci-chart-tooltip-text: #0f172a;
  --wci-chart-tooltip-border: #94a3b8;
`;

const softChartVariables = css`
  --wci-chart-blue: #fecdd3;
  --wci-chart-teal: #bfdbfe;
  --wci-chart-green: #bbf7d0;
  --wci-chart-orange: #fde68a;
  --wci-chart-red: #fed7aa;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #64748b;
  --wci-chart-grid: #e2e8f0;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #334155;
  --wci-chart-tooltip-border: #cbd5e1;
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
  readonly children: ReactNode;
}) => (
  <Box customStyles={chartCard}>
    <FlexLayout direction="column" gap="12px">
      <Typography variant="h3" customStyles={titleH3}>
        {title}
      </Typography>
      <Typography variant="p" customStyles={paragraphSmall}>
        {description}
      </Typography>
      <Typography variant="span" customStyles={codePill}>
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
  readonly effect: TreemapChartEffect;
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
            <TreemapChart data={mockData} effect={effect} />
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
        title="Default ChartJS Treemap Chart"
        description="Default treemap using the shared semantic chart palette with rectangle sizes based on item values."
      />
      <Box customStyles={heroBox}>
        <TreemapChart data={mockData} effect="none" />
      </Box>
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Treemap Bounce Effect"
    description="Bounce adds an animated entrance to the treemap."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Treemap Wobble Effect"
    description="Wobble adds subtle movement while the treemap appears."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Treemap Elastic Effect"
    description="Elastic gives the treemap a spring-style entrance."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Treemap Progressive Trace Effect"
    description="Progressive trace reveals the treemap over time."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Treemap Elastic Glide Effect"
    description="Elastic glide combines smooth movement with a spring-style finish."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Treemap Staggered Reveal Effect"
    description="Staggered reveal animates the treemap in sequence."
  />
);

export const HiddenLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Hidden Labels"
        description="Disable rectangle labels for a clean visual-only treemap."
      />
      <Box customStyles={heroBox}>
        <TreemapChart data={browserMarketData} effect="none" options={{ showLabels: false }} />
      </Box>
    </div>
  </main>
);

export const MinimumLabelValue = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Minimum Label Value"
        description="Display labels only when an item's value meets the configured minimum."
      />
      <Box customStyles={heroBox}>
        <TreemapChart
          data={browserMarketData}
          effect="none"
          options={{
            minimumLabelValue: 8,
            valueFormatter: (value) => `${value}%`,
          }}
        />
      </Box>
    </div>
  </main>
);

export const HiddenTooltipValue = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Hidden Tooltip Value"
        description="Display the item and group in the tooltip while hiding the value line."
      />
      <Box customStyles={heroBox}>
        <TreemapChart data={mockData} effect="none" options={{ showTooltipValue: false }} />
      </Box>
    </div>
  </main>
);

export const VisibleLegend = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Visible Legend"
        description="Enable the ChartJS dataset legend and customize its font weight."
      />
      <Box customStyles={heroBox}>
        <TreemapChart
          data={mockData}
          effect="none"
          options={{
            showLegend: true,
            boldLegends: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomSpacing = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Custom Spacing"
        description="Render treemap rectangles with increased spacing, border width, and rounded corners."
      />
      <Box customStyles={heroBox}>
        <TreemapChart
          data={browserMarketData}
          effect="none"
          options={{
            spacing: 6,
            borderWidth: 3,
            borderRadius: 10,
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomValueFormatter = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Value Formatter"
        description="Format values as percentages in rectangle labels and tooltips."
      />
      <Box customStyles={heroBox}>
        <TreemapChart
          data={browserMarketData}
          effect="none"
          options={{
            valueFormatter: (value) => `${value}%`,
            boldLabels: true,
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
        title="ChartJS Treemap Custom Tooltip"
        description="Customize tooltip colors through the semantic colors API and behavior through ChartJS options."
      />
      <Box customStyles={heroBox}>
        <TreemapChart
          data={browserMarketData}
          effect="none"
          colors={{
            tooltipBackground: '#ffffff',
            tooltipText: '#334155',
            tooltipBorder: '#f5456e',
          }}
          options={{
            valueFormatter: (value) => `${value}%`,
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
              },
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const ClickHandling = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Click Handling"
        description="Click a treemap rectangle to trigger application or API behavior."
      />
      <Box customStyles={heroBox}>
        <TreemapChart
          data={browserMarketData}
          effect="none"
          options={{
            onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
              const firstElement = elements[0];
              if (!firstElement) return;
              const selectedItem = browserMarketData[firstElement.index];
              if (!selectedItem) return;
              alert(
                `API Call: Fetching ${selectedItem.label} details\nValue: ${selectedItem.value}%`,
              );
            },
          }}
        />
      </Box>
    </div>
  </main>
);

export const ItemColorOverrides = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Item Colors"
        description="Each item can override the shared series palette by providing its own color."
      />
      <Box customStyles={heroBox}>
        <TreemapChart
          data={customColorData}
          effect="none"
          options={{
            boldLabels: true,
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
        title="ChartJS Treemap Custom Colors"
        description="Override the shared semantic chart palette through the colors API."
      />
      <Box customStyles={heroBox}>
        <TreemapChart
          data={browserMarketData}
          effect="none"
          colors={{
            series: ['#e11d48', '#7c3aed', '#0891b2', '#16a34a', '#ea580c'],
            axisText: '#334155',
            axisLine: '#64748b',
            grid: '#e2e8f0',
            tooltipBackground: '#111827',
            tooltipText: '#ffffff',
            tooltipBorder: '#475569',
          }}
          options={{
            boldLabels: true,
            valueFormatter: (value) => `${value}%`,
          }}
        />
      </Box>
    </div>
  </main>
);

export const SoftPalette = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Soft Palette"
        description="Override the shared semantic CSS variables with a softer treemap palette."
      />
      <Box customStyles={heroBox}>
        <TreemapChart
          data={browserMarketData}
          effect="none"
          customStyles={{
            wrapper: softChartVariables,
          }}
          options={{
            boldLabels: true,
            valueFormatter: (value) => `${value}%`,
          }}
        />
      </Box>
    </div>
  </main>
);

export const TransparentChartBox = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Transparent Box"
        description="Disable the internal chart box background, radius, and padding."
      />
      <Box customStyles={heroBox}>
        <TreemapChart data={mockData} effect="none" options={{ isBoxVisible: false }} />
      </Box>
    </div>
  </main>
);

export const CustomHeight = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Custom Height"
        description="Render the treemap with a custom responsive wrapper height."
      />
      <Box customStyles={heroBox}>
        <TreemapChart data={largeDataset} effect="none" options={{ height: '600px' }} />
      </Box>
    </div>
  </main>
);

export const LargeDataset = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Large Dataset"
        description="Render multiple regions and countries while filtering labels by minimum value."
      />
      <Box customStyles={heroBox}>
        <TreemapChart
          data={largeDataset}
          effect="none"
          options={{
            height: '600px',
            minimumLabelValue: 6,
            boldLabels: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomStyles = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Custom Styles"
        description="Examples using shared semantic CSS variables, custom colors, item overrides, and rectangle options."
      />
      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling and Behavior
      </Typography>
      <FlexLayout columns={12} gap={{ default: '24px', md: '32px' }} wrap="wrap">
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom CSS Variables"
            description="Overrides the common semantic chart variables at the wrapper level."
            api="customStyles.wrapper"
          >
            <TreemapChart
              data={browserMarketData}
              effect="none"
              customStyles={{
                wrapper: customChartVariables,
              }}
              options={{
                boldLabels: true,
                valueFormatter: (value) => `${value}%`,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Dark CSS Variables"
            description="Uses the shared semantic chart variables on a dark chart surface."
            api="customStyles.wrapper"
          >
            <TreemapChart
              data={browserMarketData}
              effect="none"
              customStyles={{
                wrapper: darkChartVariables,
              }}
              options={{
                chartBackground: '#0f172a',
                boldLabels: true,
                valueFormatter: (value) => `${value}%`,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Item Color Overrides"
            description="Item-level colors take priority over the shared series palette."
            api="data[].color"
          >
            <TreemapChart
              data={customColorData}
              effect="none"
              options={{
                boldLabels: true,
              }}
            />
          </ChartCard>
        </FlexItem>
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Rectangle Spacing"
            description="Customize spacing, border width, and border radius while preserving labels and tooltips."
            api="options.spacing + options.borderRadius"
          >
            <TreemapChart
              data={browserMarketData}
              effect="none"
              options={{
                spacing: 8,
                borderWidth: 3,
                borderRadius: 12,
                height: '500px',
                boldLabels: true,
                valueFormatter: (value) => `${value}%`,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);

export const CustomTestId = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="ChartJS Treemap Custom Test ID"
        description="Provide a custom test identifier for Cypress and Testing Library."
      />
      <Box customStyles={heroBox}>
        <TreemapChart data={mockData} effect="none" testId="custom-treemap-chart-test-id" />
      </Box>
    </div>
  </main>
);
