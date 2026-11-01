/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { TreemapChart } from '@/components/echarts/components';
import type {
  TreemapChartData,
  TreemapChartEffect,
} from '@/components/echarts/components/treemap-chart/TreemapChart.types';

const meta: Meta<typeof TreemapChart> = {
  title: 'Components/ECharts/TreemapChart',
  component: TreemapChart,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TreemapChart>;

const mockData: TreemapChartData = {
  series: [
    {
      label: 'Market Hierarchy',
      data: [
        {
          name: 'Electronics',
          value: 100,
          children: [
            {
              name: 'Phones',
              value: 60,
              children: [
                { name: 'Android', value: 38 },
                { name: 'iPhone', value: 22 },
              ],
            },
            {
              name: 'Laptops',
              value: 40,
              children: [
                { name: 'Windows', value: 25 },
                { name: 'MacBook', value: 15 },
              ],
            },
          ],
        },
        {
          name: 'Furniture',
          value: 80,
          children: [
            {
              name: 'Tables',
              value: 50,
              children: [
                { name: 'Office Tables', value: 30 },
                { name: 'Dining Tables', value: 20 },
              ],
            },
            {
              name: 'Chairs',
              value: 30,
              children: [
                { name: 'Office Chairs', value: 18 },
                { name: 'Dining Chairs', value: 12 },
              ],
            },
          ],
        },
        {
          name: 'Office',
          value: 40,
          children: [
            { name: 'Paper', value: 25 },
            { name: 'Pens', value: 15 },
          ],
        },
        {
          name: 'Clothing',
          value: 65,
          children: [
            { name: 'Men', value: 35 },
            { name: 'Women', value: 30 },
          ],
        },
        {
          name: 'Groceries',
          value: 55,
          children: [
            { name: 'Vegetables', value: 20 },
            { name: 'Fruits', value: 18 },
            { name: 'Packaged Food', value: 17 },
          ],
        },
      ],
    },
  ],
};

const flatData: TreemapChartData = {
  series: [
    {
      label: 'Department Revenue',
      data: [
        { name: 'Engineering', value: 320 },
        { name: 'Sales', value: 260 },
        { name: 'Marketing', value: 180 },
        { name: 'Customer Support', value: 140 },
        { name: 'Operations', value: 110 },
        { name: 'Finance', value: 95 },
        { name: 'Human Resources', value: 70 },
        { name: 'Legal', value: 45 },
      ],
    },
  ],
};

const customItemColorData: TreemapChartData = {
  series: [
    {
      label: 'Regional Sales',
      data: [
        {
          name: 'North America',
          value: 180,
          color: '#e11d48',
          children: [
            { name: 'United States', value: 130 },
            { name: 'Canada', value: 50 },
          ],
        },
        {
          name: 'Europe',
          value: 150,
          color: '#7c3aed',
          children: [
            { name: 'Germany', value: 55 },
            { name: 'United Kingdom', value: 50 },
            { name: 'France', value: 45 },
          ],
        },
        {
          name: 'Asia',
          value: 210,
          color: '#0891b2',
          children: [
            { name: 'India', value: 85 },
            { name: 'China', value: 75 },
            { name: 'Japan', value: 50 },
          ],
        },
        {
          name: 'South America',
          value: 95,
          color: '#16a34a',
          children: [
            { name: 'Brazil', value: 60 },
            { name: 'Argentina', value: 35 },
          ],
        },
        {
          name: 'Oceania',
          value: 65,
          color: '#ea580c',
          children: [
            { name: 'Australia', value: 48 },
            { name: 'New Zealand', value: 17 },
          ],
        },
      ],
    },
  ],
};

const smallValueData: TreemapChartData = {
  series: [
    {
      label: 'Product Inventory',
      data: [
        { name: 'Electronics', value: 120 },
        { name: 'Furniture', value: 82 },
        { name: 'Clothing', value: 64 },
        { name: 'Books', value: 34 },
        { name: 'Accessories', value: 20 },
        { name: 'Stationery', value: 12 },
        { name: 'Other', value: 4 },
      ],
    },
  ],
};

const effects: {
  effect: TreemapChartEffect;
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
    description: 'Progressively reveals the treemap hierarchy.',
  },
  {
    effect: 'elastic-glide',
    title: 'Elastic Glide',
    description: 'Combines smooth movement with elastic easing.',
  },
  {
    effect: 'staggered-reveal',
    title: 'Staggered Reveal',
    description: 'Reveals treemap hierarchy items with staggered timing.',
  },
];

const pageContainer = css`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px;
`;

const section = css`
  margin-top: 40px;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 12px;
`;

const chartContainer = css`
  width: 100%;
  height: 650px;
`;

const comparisonChart = css`
  width: 100%;
  height: 500px;
`;

const customVariables = css`
  --wci-chart-blue: #2563eb;
  --wci-chart-teal: #0d9488;
  --wci-chart-green: #16a34a;
  --wci-chart-orange: #ea580c;
  --wci-chart-red: #dc2626;
  --wci-chart-purple: #7c3aed;
  --wci-chart-magenta: #db2777;
  --wci-chart-cyan: #0891b2;
  --wci-chart-yellow: #ca8a04;
  --wci-chart-axis-text: #334155;
  --wci-chart-axis-line: #475569;
  --wci-chart-grid: #cbd5e1;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #0f172a;
  --wci-chart-tooltip-border: #94a3b8;
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

const ChartCard = ({
  title,
  description,
  children,
}: {
  readonly title: string;
  readonly description: string;
  readonly children: ReactNode;
}) => (
  <Box customStyles={chartCard}>
    <FlexLayout direction="column" gap="16px" fullWidth>
      <Typography variant="h3">{title}</Typography>
      <Typography
        variant="p"
        customStyles={css`
          color: var(--wci-gray-700);
        `}
      >
        {description}
      </Typography>
      {children}
    </FlexLayout>
  </Box>
);

export const Default: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="ECharts Treemap"
          description="Hierarchical treemap using the shared chart color system, drill-down navigation, labels, breadcrumbs, and tooltips."
        />
        <div css={[section, chartContainer]}>
          <TreemapChart chartId="default-treemap" data={mockData} effect="none" />
        </div>
      </div>
    </main>
  ),
};

export const ChartComparison: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Treemap Chart Comparison"
          description="Comparison between hierarchical and flat treemap data structures."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Hierarchical"
                description="Nested parent and child nodes with drill-down navigation."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="hierarchical-comparison-treemap"
                    data={mockData}
                    effect="none"
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Flat"
                description="Independent categories displayed without nested hierarchy levels."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="flat-comparison-treemap"
                    data={flatData}
                    effect="none"
                    options={{
                      leafDepth: null,
                      showUpperLabels: false,
                      showBreadcrumb: false,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const Options: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Treemap Options"
          description="Examples of the main Treemap-specific options supported by the component."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Hidden Labels"
                description="Hides labels while preserving tooltip and hierarchy behavior."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="hidden-labels-treemap"
                    data={mockData}
                    effect="none"
                    options={{ showLabels: false }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Bold Labels"
                description="Uses bold typography for labels inside treemap nodes."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="bold-labels-treemap"
                    data={mockData}
                    effect="none"
                    options={{ boldLabels: true }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="No Breadcrumb"
                description="Hides breadcrumb navigation while retaining node drill-down."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="hidden-breadcrumb-treemap"
                    data={mockData}
                    effect="none"
                    options={{ showBreadcrumb: false }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="No Drill Down"
                description="Disables node click navigation and displays the complete hierarchy."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="no-drilldown-treemap"
                    data={mockData}
                    effect="none"
                    options={{
                      nodeClick: false,
                      leafDepth: null,
                      showBreadcrumb: false,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Leaf Depth"
                description="Controls the hierarchy depth initially visible in the treemap."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="leaf-depth-treemap"
                    data={mockData}
                    effect="none"
                    options={{
                      leafDepth: 2,
                      showBreadcrumb: true,
                      nodeClick: 'zoomToNode',
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Visible Minimum"
                description="Reduces visual noise by hiding nodes below the configured minimum value."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="visible-min-treemap"
                    data={smallValueData}
                    effect="none"
                    options={{
                      visibleMin: 20,
                      showUpperLabels: false,
                      showBreadcrumb: false,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const Roaming: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Treemap Roaming"
          description="Comparison of movement, scaling, and disabled treemap navigation."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 4 }}>
              <ChartCard title="Move" description="Allows canvas movement without scale zoom.">
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="move-treemap"
                    data={mockData}
                    effect="none"
                    options={{ roam: 'move' }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 4 }}>
              <ChartCard title="Scale" description="Allows scale zoom without canvas movement.">
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="scale-treemap"
                    data={mockData}
                    effect="none"
                    options={{ roam: 'scale' }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 4 }}>
              <ChartCard
                title="Disabled"
                description="Disables both movement and scale interaction."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="disabled-roam-treemap"
                    data={mockData}
                    effect="none"
                    options={{ roam: false }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const Effects: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Treemap Effects"
          description="All shared ECharts animation effects supported by the Treemap Chart."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            {effects.map(({ effect, title, description }) => (
              <FlexItem key={effect} columnSpan={{ default: 12, lg: 6 }}>
                <ChartCard title={title} description={description}>
                  <div css={comparisonChart}>
                    <TreemapChart
                      chartId={`effect-${effect}-treemap`}
                      data={mockData}
                      effect={effect}
                    />
                  </div>
                </ChartCard>
              </FlexItem>
            ))}
          </FlexLayout>
        </div>
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
          description="Examples using the new shared colors API, item-level colors, and shared chart CSS variables."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Colors API"
                description="Overrides the shared palette and semantic Treemap colors through the colors prop."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="colors-api-treemap"
                    data={mockData}
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
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Item Colors"
                description="Root hierarchy nodes provide explicit colors while descendants inherit their parent color."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="item-colors-treemap"
                    data={customItemColorData}
                    effect="none"
                    options={{ boldLabels: true }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12 }}>
              <ChartCard
                title="Shared CSS Variables"
                description="Overrides the common --wci-chart-* variables used across chart implementations."
              >
                <div css={[comparisonChart, customVariables]}>
                  <TreemapChart
                    chartId="shared-css-variables-treemap"
                    data={mockData}
                    effect="none"
                    options={{ boldLabels: true }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const CustomTooltip: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Custom Tooltip"
          description="Overrides the generated Treemap tooltip configuration through standard ECharts options."
        />
        <div css={[section, chartContainer]}>
          <TreemapChart
            chartId="custom-tooltip-treemap"
            data={mockData}
            effect="none"
            options={{
              tooltip: {
                trigger: 'item',
                backgroundColor: '#ffffff',
                borderColor: '#2563eb',
                borderWidth: 2,
                padding: 14,
                textStyle: {
                  color: '#111827',
                  fontSize: 13,
                },
                formatter: (params: unknown): string => {
                  if (typeof params !== 'object' || params === null || Array.isArray(params)) {
                    return '';
                  }

                  const record = params as Record<string, unknown>;
                  const name = typeof record['name'] === 'string' ? record['name'] : 'Treemap item';
                  const value =
                    typeof record['value'] === 'number' || typeof record['value'] === 'string'
                      ? String(record['value'])
                      : '';

                  return `<div style="font-size:14px;font-weight:700">${name}: ${value} units</div>`;
                },
              },
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const CustomSeriesOptions: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Custom Series Options"
          description="Overrides generated Treemap series styling while retaining the component defaults."
        />
        <div css={[section, chartContainer]}>
          <TreemapChart
            chartId="custom-series-treemap"
            data={mockData}
            effect="none"
            options={{
              series: [
                {
                  itemStyle: {
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    gapWidth: 8,
                    borderRadius: 8,
                  },
                  upperLabel: {
                    show: true,
                    height: 34,
                    color: '#ffffff',
                    backgroundColor: '#111827',
                    fontWeight: 'bold',
                  },
                  levels: [
                    {
                      itemStyle: {
                        borderColor: '#334155',
                        borderWidth: 6,
                        gapWidth: 10,
                      },
                      upperLabel: {
                        show: false,
                      },
                    },
                    {
                      itemStyle: {
                        borderColor: '#ffffff',
                        borderWidth: 3,
                        gapWidth: 6,
                      },
                    },
                    {
                      itemStyle: {
                        borderColor: '#ffffff',
                        borderWidth: 2,
                        gapWidth: 3,
                      },
                    },
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const ValueFormatting: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Treemap Value Formatting"
          description="Customizes the value suffix and drill-down indicator used by the generated Treemap configuration."
        />
        <div css={section}>
          <FlexLayout columns={12} gap={{ default: '24px', lg: '32px' }} wrap="wrap">
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Value Suffix"
                description="Uses a custom suffix for values displayed in the tooltip."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="value-suffix-treemap"
                    data={flatData}
                    effect="none"
                    options={{
                      valueSuffix: ' million USD',
                      leafDepth: null,
                      showUpperLabels: false,
                    }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
            <FlexItem columnSpan={{ default: 12, lg: 6 }}>
              <ChartCard
                title="Drill-Down Icon"
                description="Uses a custom icon for hierarchy nodes supporting drill-down."
              >
                <div css={comparisonChart}>
                  <TreemapChart
                    chartId="drill-icon-treemap"
                    data={mockData}
                    effect="none"
                    options={{ drillDownIcon: '→' }}
                  />
                </div>
              </ChartCard>
            </FlexItem>
          </FlexLayout>
        </div>
      </div>
    </main>
  ),
};

export const CustomAnimation: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Custom Animation"
          description="Overrides the default Treemap animation duration and easing through standard ECharts options."
        />
        <div css={[section, chartContainer]}>
          <TreemapChart
            chartId="custom-animation-treemap"
            data={mockData}
            effect="none"
            options={{
              animation: true,
              animationDuration: 2600,
              animationDurationUpdate: 1800,
              animationEasing: 'elasticOut',
              animationEasingUpdate: 'cubicInOut',
            }}
          />
        </div>
      </div>
    </main>
  ),
};

export const CustomHeight: Story = {
  render: () => (
    <main role="main">
      <div css={pageContainer}>
        <PageIntro
          title="Custom Height"
          description="Renders the Treemap inside a larger responsive container for deeper hierarchy exploration."
        />
        <div
          css={[
            section,
            css`
              width: 100%;
              height: 750px;
            `,
          ]}
        >
          <TreemapChart chartId="custom-height-treemap" data={mockData} effect="none" />
        </div>
      </div>
    </main>
  ),
};
