/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';
import type { TooltipItem } from 'chart.js';
import type { CallbackDataParams } from 'echarts/types/dist/shared';

import { Chart } from '@/charts/Chart';
import type { ChartData, ChartEffect } from '@/charts/Chart.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/RadarChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

/* -------------------------------------------------------------------------- */
/* Shared source data                                                         */
/* -------------------------------------------------------------------------- */

const commonData: ChartData = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
  series: [
    {
      label: 'Model X',
      data: [90, 70, 85, 95, 80],
    },
    {
      label: 'Model Y',
      data: [75, 95, 70, 80, 90],
    },
    {
      label: 'Model Z',
      data: [60, 80, 95, 70, 75],
    },
  ],
};

const singleSeriesData: ChartData = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
  series: [
    {
      label: 'Model X',
      data: [90, 70, 85, 95, 80],
    },
  ],
};

const extendedData: ChartData = {
  labels: ['Performance', 'Security', 'Scalability', 'User Experience', 'Cost', 'Support'],
  series: [
    {
      label: 'Product A',
      data: [88, 92, 75, 84, 68, 90],
    },
    {
      label: 'Product B',
      data: [72, 80, 91, 78, 86, 74],
    },
    {
      label: 'Product C',
      data: [95, 70, 82, 88, 73, 81],
    },
  ],
};

const customColorData: ChartData = {
  labels: ['Performance', 'Security', 'Scalability', 'User Experience', 'Cost', 'Support'],
  series: [
    {
      label: 'Enterprise',
      data: [92, 88, 84, 72, 64, 90],
      color: '#d4af37',
    },
    {
      label: 'Consumer',
      data: [76, 74, 80, 94, 88, 70],
      color: '#2d5a27',
    },
    {
      label: 'Startup',
      data: [84, 68, 92, 86, 95, 66],
      color: '#3d9eff',
    },
  ],
};

const denseData: ChartData = {
  labels: [
    'Performance',
    'Security',
    'Scalability',
    'User Experience',
    'Cost',
    'Support',
    'Availability',
    'Integration',
  ],
  series: [
    {
      label: 'Platform A',
      data: [90, 88, 78, 84, 65, 92, 86, 74],
    },
    {
      label: 'Platform B',
      data: [76, 95, 90, 72, 82, 70, 94, 88],
    },
    {
      label: 'Platform C',
      data: [84, 74, 86, 94, 90, 78, 72, 96],
    },
    {
      label: 'Platform D',
      data: [68, 82, 74, 88, 96, 84, 90, 76],
    },
  ],
};

const highValueData: ChartData = {
  labels: ['Revenue', 'Retention', 'Acquisition', 'Engagement', 'Conversion'],
  series: [
    {
      label: 'Current Year',
      data: [135, 118, 142, 126, 132],
    },
    {
      label: 'Previous Year',
      data: [105, 96, 114, 102, 108],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

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
  max-width: 820px;
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
  min-height: 650px;
  margin-top: 16px;
  overflow: hidden;

  > div {
    width: 100%;
    min-width: 0;
    min-height: 650px;
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
  text-align: center;
`;

const statLabelBlue = css`
  color: #0c4a6e;
  text-align: center;
`;

const statValueGreen = css`
  color: #013a28;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

const statLabelGreen = css`
  color: #013a28;
  text-align: center;
`;

const customChartTokens = css`
  --wci-chart-blue: #d4af37;
  --wci-chart-teal: #2d5a27;
  --wci-chart-green: #3d9eff;
  --wci-chart-orange: #f97316;
  --wci-chart-red: #ef4444;
  --wci-chart-purple: #8b5cf6;
  --wci-chart-magenta: #d946ef;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #eab308;

  --wci-chart-axis-text: #475569;
  --wci-chart-axis-line: #20d71d;
  --wci-chart-grid: #14da35;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #0f172a;
  --wci-chart-tooltip-border: #763d6c;
`;

/* -------------------------------------------------------------------------- */
/* Shared presentation components                                             */
/* -------------------------------------------------------------------------- */

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
  statValue = 'radar',
  statLabel = 'Chart Type',
  secondaryStatValue = 'auto',
  secondaryStatLabel = 'Default',
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

type SectionHeadingProps = {
  readonly title: string;
  readonly description: string;
};

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

type ChartCardProps = {
  readonly chartName: 'Chart 1' | 'Chart 2';
  readonly description?: string;
  readonly children?: ReactNode;
};

const ChartCard = ({ chartName, description, children }: ChartCardProps) => {
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

        <div css={chartShell}>{children}</div>
      </FlexLayout>
    </Box>
  );
};

type ComparisonGridProps = {
  readonly children: ReactNode;
};

const ComparisonGrid = ({ children }: ComparisonGridProps) => (
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

type ComparisonItemProps = {
  readonly children: ReactNode;
};

const ComparisonItem = ({ children }: ComparisonItemProps) => (
  <FlexItem
    columnSpan={{
      default: 12,
      lg: 6,
    }}
  >
    {children}
  </FlexItem>
);

/* -------------------------------------------------------------------------- */
/* Default rendering                                                          */
/* -------------------------------------------------------------------------- */

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Radar Chart"
        description="The same multi-metric radar dataset is displayed using Chart 1 and Chart 2 with matching labels, series, and shared chart tokens."
        statValue="2"
        statLabel="Charts"
        secondaryStatValue="3"
        secondaryStatLabel="Series"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both engines receive exactly the same normalized ChartData while each adapter maps the data to its native radar implementation."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart.js radar chart using the shared normalized data."
            >
              <Chart
                type="radar"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="ECharts radar chart using the same shared normalized data."
            >
              <Chart
                type="radar"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  radar: {
                    radius: '75%',
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

/* -------------------------------------------------------------------------- */
/* Extended metrics                                                           */
/* -------------------------------------------------------------------------- */

export const ExtendedMetrics = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Extended Radar Metrics"
        description="Six shared metrics compare label positioning, polygon layout, and multi-series overlap across both engines."
        statValue="6"
        statLabel="Metrics"
        secondaryStatValue="3"
        secondaryStatLabel="Series"
      />

      <section css={pageSection}>
        <SectionHeading
          title="Extended Metric Comparison"
          description="Both charts receive the same six labels and three product datasets."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 rendering six radar axes.">
              <Chart
                type="radar"
                engine="chart-1"
                data={extendedData}
                effect="progressive-trace"
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 rendering the same six radar axes.">
              <Chart
                type="radar"
                engine="chart-2"
                data={extendedData}
                effect="progressive-trace"
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

/* -------------------------------------------------------------------------- */
/* Effects                                                                    */
/* -------------------------------------------------------------------------- */

type SharedRadarEffect = Extract<
  ChartEffect,
  | 'none'
  | 'bounce'
  | 'wobble'
  | 'elastic'
  | 'progressive-trace'
  | 'elastic-glide'
  | 'staggered-reveal'
>;

type RadarEffectComparisonProps = {
  readonly title: string;
  readonly description: string;
  readonly chart1Description: string;
  readonly chart2Description: string;
  readonly effect: SharedRadarEffect;
  readonly useMultipleSeries?: boolean;
};

const RadarEffectComparison = ({
  title,
  description,
  chart1Description,
  chart2Description,
  effect,
  useMultipleSeries = false,
}: RadarEffectComparisonProps) => {
  const data = useMultipleSeries ? commonData : singleSeriesData;

  return (
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
            description="The same shared effect is passed through the Chart abstraction to both radar engines."
          />

          <ComparisonGrid>
            <ComparisonItem>
              <ChartCard chartName="Chart 1" description={chart1Description}>
                <Chart
                  type="radar"
                  engine="chart-1"
                  data={data}
                  effect={effect}
                  options={{
                    height: 650,
                    showLegend: useMultipleSeries,
                    boldLabels: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>

            <ComparisonItem>
              <ChartCard chartName="Chart 2" description={chart2Description}>
                <Chart
                  type="radar"
                  engine="chart-2"
                  data={data}
                  effect={effect}
                  options={{
                    height: 650,
                    showLegend: useMultipleSeries,
                    boldLabels: true,
                  }}
                />
              </ChartCard>
            </ComparisonItem>
          </ComparisonGrid>
        </section>
      </div>
    </main>
  );
};

export const ProgressiveTraceEffect = () => (
  <RadarEffectComparison
    title="Progressive Trace Effect"
    description="Both engines progressively reveal the radar dataset."
    chart1Description="Chart 1 progressively traces the radar dataset."
    chart2Description="Chart 2 applies its corresponding progressive trace animation."
    effect="progressive-trace"
  />
);

export const BounceEffect = () => (
  <RadarEffectComparison
    title="Bounce Effect"
    description="Both engines introduce the radar data using bounce motion."
    chart1Description="Chart 1 renders the radar dataset with bounce motion."
    chart2Description="Chart 2 renders the radar dataset with bounce motion."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <RadarEffectComparison
    title="Wobble Effect"
    description="Both engines introduce the radar data using wobble motion."
    chart1Description="Chart 1 renders the radar dataset with wobble motion."
    chart2Description="Chart 2 renders the radar dataset with wobble motion."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <RadarEffectComparison
    title="Elastic Effect"
    description="Both engines introduce the radar data using elastic motion."
    chart1Description="Chart 1 renders the radar dataset with elastic motion."
    chart2Description="Chart 2 renders the radar dataset with elastic motion."
    effect="elastic"
  />
);

export const ElasticGlideEffect = () => (
  <RadarEffectComparison
    title="Elastic Glide Effect"
    description="Both engines render the radar dataset using elastic glide motion."
    chart1Description="Chart 1 applies elastic glide motion."
    chart2Description="Chart 2 applies its corresponding elastic glide animation."
    effect="elastic-glide"
  />
);

export const StaggeredRevealEffect = () => (
  <RadarEffectComparison
    title="Staggered Reveal Effect"
    description="Both engines reveal multiple radar datasets in a staggered sequence."
    chart1Description="Chart 1 applies staggered reveal to the radar datasets."
    chart2Description="Chart 2 applies staggered reveal to the radar datasets."
    effect="staggered-reveal"
    useMultipleSeries
  />
);

export const NoEffect = () => (
  <RadarEffectComparison
    title="No Effect"
    description="Both engines render without an additional named effect."
    chart1Description="Chart 1 rendered without an additional effect."
    chart2Description="Chart 2 rendered without an additional effect."
    effect="none"
    useMultipleSeries
  />
);

/* -------------------------------------------------------------------------- */
/* Custom options                                                             */
/* -------------------------------------------------------------------------- */

export const CustomOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Radar Chart Options"
        description="Tooltip, crosshair, legend, series colors, scale, dense-data, and shared chart-token options are compared across both engines."
        statValue="7"
        statLabel="Option Groups"
        secondaryStatValue="14"
        secondaryStatLabel="Examples"
      />

      {/* -------------------------------------------------------------------- */}
      {/* Custom tooltip                                                       */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Custom Tooltip"
          description="Each engine can receive its native tooltip configuration through the shared options object."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 custom tooltip using Chart.js tooltip callbacks."
            >
              <Chart
                type="radar"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  plugins: {
                    tooltip: {
                      enabled: true,
                      position: 'nearest',
                      backgroundColor: '#ffffff',
                      borderColor: '#763d6c',
                      borderWidth: 2,
                      titleColor: '#0f172a',
                      bodyColor: '#475569',
                      footerColor: '#0f172a',
                      cornerRadius: 10,
                      padding: 14,
                      displayColors: true,
                      boxPadding: 6,
                      caretSize: 8,
                      caretPadding: 12,
                      callbacks: {
                        title: (items: TooltipItem<'radar'>[]) => items[0]?.label ?? 'Radar Metric',
                        label: (item: TooltipItem<'radar'>) => {
                          const datasetLabel = item.dataset.label ?? 'Dataset';

                          return `${datasetLabel}: ${item.formattedValue}`;
                        },
                        footer: (items: TooltipItem<'radar'>[]) => {
                          const label = items[0]?.label ?? 'Metric';

                          return `Metric: ${label}`;
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
              description="Chart 2 custom tooltip using the native ECharts formatter."
            >
              <Chart
                type="radar"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  tooltip: {
                    show: true,
                    trigger: 'item',
                    confine: true,
                    backgroundColor: '#ffffff',
                    borderColor: '#763d6c',
                    borderWidth: 2,
                    padding: 14,
                    textStyle: {
                      color: '#475569',
                      fontSize: 13,
                    },
                    extraCssText:
                      'border-radius: 10px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.14);',
                    formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
                      const item = Array.isArray(params) ? params[0] : params;

                      if (!item) return '';

                      const rawData = item.data;

                      const values =
                        typeof rawData === 'object' &&
                        rawData !== null &&
                        'value' in rawData &&
                        Array.isArray(rawData.value)
                          ? rawData.value
                          : Array.isArray(rawData)
                            ? rawData
                            : [];

                      const rows = commonData.labels
                        .map(
                          (label, index) => `
                            <div
                              style="
                                display: flex;
                                justify-content: space-between;
                                gap: 24px;
                                margin-top: 7px;
                              "
                            >
                              <span>${label}</span>
                              <strong style="color: #0f172a;">
                                ${Number(values[index] ?? 0).toLocaleString()}
                              </strong>
                            </div>
                          `,
                        )
                        .join('');

                      return `
                        <div style="min-width: 220px;">
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              margin-bottom: 10px;
                              color: #0f172a;
                              font-size: 14px;
                              font-weight: 700;
                            "
                          >
                            ${String(item.marker ?? '')}

                            <span style="margin-left: 6px;">
                              ${String(item.name ?? item.seriesName ?? 'Dataset')}
                            </span>
                          </div>

                          ${rows}
                        </div>
                      `;
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Crosshair                                                            */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Crosshair"
          description="Crosshair behavior is disabled by default and enabled only when options.crosshair is true."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 with Radar crosshair enabled.">
              <Chart
                type="radar"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                colors={{
                  axisLine: '#64748b',
                }}
                options={{
                  height: 650,
                  crosshair: true,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  interaction: {
                    mode: 'nearest',
                    intersect: true,
                    axis: 'xy',
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 with Radar crosshair enabled.">
              <Chart
                type="radar"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                colors={{
                  axisLine: '#64748b',
                  tooltipBackground: '#ffffff',
                  tooltipText: '#0f172a',
                  tooltipBorder: '#64748b',
                }}
                options={{
                  height: 650,
                  crosshair: true,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Hidden legend                                                        */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Hidden Legend"
          description="Both charts hide the legend while preserving radar labels and dataset rendering."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 with its legend disabled.">
              <Chart
                type="radar"
                engine="chart-1"
                data={singleSeriesData}
                effect="progressive-trace"
                options={{
                  height: 650,
                  showLegend: false,
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 with its legend disabled.">
              <Chart
                type="radar"
                engine="chart-2"
                data={singleSeriesData}
                effect="progressive-trace"
                options={{
                  height: 650,
                  showLegend: false,
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Custom series colors                                                 */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Custom Series Colors"
          description="Each radar dataset declares its own color in the normalized ChartData and both adapters preserve it."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 rendering the shared dataset colors."
            >
              <Chart
                type="radar"
                engine="chart-1"
                data={customColorData}
                effect="progressive-trace"
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 rendering the same shared dataset colors."
            >
              <Chart
                type="radar"
                engine="chart-2"
                data={customColorData}
                effect="progressive-trace"
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Colors API                                                           */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Colors API"
          description="The shared colors API overrides series, axis, grid, and tooltip colors without chart-specific variants."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using shared Radar color overrides."
            >
              <Chart
                type="radar"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                colors={{
                  series: ['#d4af37', '#2d5a27', '#3d9eff'],
                  axisText: '#475569',
                  axisLine: '#cbd5e1',
                  grid: '#e2e8f0',
                  tooltipBackground: '#ffffff',
                  tooltipText: '#0f172a',
                  tooltipBorder: '#cbd5e1',
                }}
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 using exactly the same shared Radar color overrides."
            >
              <Chart
                type="radar"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                colors={{
                  series: ['#d4af37', '#2d5a27', '#3d9eff'],
                  axisText: '#475569',
                  axisLine: '#cbd5e1',
                  grid: '#e2e8f0',
                  tooltipBackground: '#ffffff',
                  tooltipText: '#0f172a',
                  tooltipBorder: '#cbd5e1',
                }}
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Custom scale maximum                                                 */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Custom Scale Maximum"
          description="Values above 100 are displayed using each engine's native radar scale configuration."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 sets the radial scale maximum to 160."
            >
              <Chart
                type="radar"
                engine="chart-1"
                data={highValueData}
                effect="progressive-trace"
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  scales: {
                    r: {
                      min: 0,
                      max: 160,
                      ticks: {
                        stepSize: 40,
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
              description="Chart 2 sets each radar indicator maximum to 160."
            >
              <Chart
                type="radar"
                engine="chart-2"
                data={highValueData}
                effect="progressive-trace"
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  radar: {
                    splitNumber: 4,
                    indicator: highValueData.labels.map((label) => ({
                      name: label,
                      min: 0,
                      max: 160,
                    })),
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Dense data                                                           */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Dense Multiple-Series Data"
          description="Eight metric axes and four datasets compare label spacing, overlap, legend handling, and available plot area."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 rendering eight radar metrics and four datasets."
            >
              <Chart
                type="radar"
                engine="chart-1"
                data={denseData}
                effect="staggered-reveal"
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  scales: {
                    r: {
                      pointLabels: {
                        padding: 12,
                        font: {
                          size: 12,
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
              description="Chart 2 rendering the same eight radar metrics and four datasets."
            >
              <Chart
                type="radar"
                engine="chart-2"
                data={denseData}
                effect="staggered-reveal"
                options={{
                  height: 650,
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                  radar: {
                    radius: '64%',
                    axisName: {
                      fontSize: 12,
                    },
                  },
                  legend: {
                    bottom: 0,
                    itemGap: 14,
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Custom chart tokens                                                  */}
      {/* -------------------------------------------------------------------- */}

      <section css={pageSection}>
        <SectionHeading
          title="Custom Chart Tokens"
          description="Both engines receive the same shared chart CSS variables through customStyles.container."
        />

        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using shared chart token overrides."
            >
              <Chart
                type="radar"
                engine="chart-1"
                data={commonData}
                effect="progressive-trace"
                customStyles={{
                  container: customChartTokens,
                  chart: css`
                    border-radius: 12px;
                  `,
                }}
                options={{
                  height: 650,
                  chartBackground: '#fffbeb',
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>

          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 using exactly the same shared chart token overrides."
            >
              <Chart
                type="radar"
                engine="chart-2"
                data={commonData}
                effect="progressive-trace"
                customStyles={{
                  container: customChartTokens,
                  chart: css`
                    border-radius: 12px;
                    overflow: hidden;
                  `,
                }}
                options={{
                  height: 650,
                  chartBackground: '#fffbeb',
                  showLegend: true,
                  boldLabels: true,
                  boldLegends: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);
