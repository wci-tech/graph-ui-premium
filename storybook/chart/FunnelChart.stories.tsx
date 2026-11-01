/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, responsive, Typography } from '@wci-tech/core-ui-premium';
import type { CallbackDataParams } from 'echarts/types/dist/shared';

import { Chart } from '@/charts/Chart';
import type { ChartColors, ChartData } from '@/charts/Chart.types';

const meta: Meta<typeof Chart> = {
  title: 'components/Charts/FunnelChart',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const commonData: ChartData = {
  labels: ['Awareness', 'Interest', 'Decision', 'Action', 'Retention'],
  series: [
    {
      label: 'Sales Pipeline',
      data: [100, 80, 60, 40, 20],
    },
  ],
};

const salesData: ChartData = {
  labels: ['Leads', 'Qualified', 'Proposal', 'Negotiation', 'Closed'],
  series: [
    {
      label: 'Sales Conversion',
      data: [12_000, 7_200, 4_300, 2_100, 900],
    },
  ],
};

const alignmentData: ChartData = {
  labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
  series: [
    {
      label: 'Conversion',
      data: [70, 66, 61, 10],
    },
  ],
};

const customColors: ChartColors = {
  series: ['#e11d48', '#7c3aed', '#0ea5e9', '#f59e0b', '#10b981'],
  axisText: '#334155',
  axisLine: '#f8fafc',
  grid: '#e2e8f0',
  tooltipBackground: '#1e293b',
  tooltipText: '#f8fafc',
  tooltipBorder: '#94a3b8',
};

const tooltipColors: ChartColors = {
  tooltipBackground: '#ffffff',
  tooltipText: '#475569',
  tooltipBorder: '#f5456e',
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
  max-width: 880px;
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
  secondaryStatValue = '5',
  secondaryStatLabel = 'Stages',
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
  children,
}: {
  readonly chartName: 'Chart 1' | 'Chart 2';
  readonly description: string;
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
      <div css={chartShell}>{children}</div>
    </FlexLayout>
  </Box>
);

const ComparisonGrid = ({ children }: { readonly children: ReactNode }) => (
  <FlexLayout
    direction="column"
    padding={{ default: 0 }}
    gap={{
      default: '24px',
      md: '32px',
    }}
    fullWidth
  >
    {children}
  </FlexLayout>
);

const ComparisonItem = ({ children }: { readonly children: ReactNode }) => (
  <FlexItem columnSpan={{ default: 12 }}>{children}</FlexItem>
);

export const DefaultRendering = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Funnel Chart"
        description="The same funnel-stage data is displayed using Chart 1 and Chart 2."
      />
      <section css={pageSection}>
        <SectionHeading
          title="Default Rendering"
          description="Both charts display the same five conversion stages using their default funnel presentation."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders the shared funnel data using Chart.js."
            >
              <Chart
                type="funnel"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: 650,
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders the same shared funnel data using ECharts."
            >
              <Chart
                type="funnel"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 650,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

type SharedFunnelEffect =
  | 'none'
  | 'bounce'
  | 'wobble'
  | 'elastic'
  | 'progressive-trace'
  | 'staggered-reveal';

const EffectComparison = ({
  title,
  description,
  effect,
}: {
  readonly title: string;
  readonly description: string;
  readonly effect: SharedFunnelEffect;
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
          description="The same shared effect is applied to Chart 1 and Chart 2."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 renders the selected funnel animation."
            >
              <Chart
                type="funnel"
                engine="chart-1"
                data={commonData}
                effect={effect}
                options={{
                  height: 650,
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 renders the equivalent funnel animation."
            >
              <Chart
                type="funnel"
                engine="chart-2"
                data={commonData}
                effect={effect}
                options={{
                  height: 650,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
    </div>
  </main>
);

export const RevealEffect = () => (
  <EffectComparison
    title="Funnel Reveal Effect"
    description="Funnel stages progressively enter the chart."
    effect="progressive-trace"
  />
);

export const BounceEffect = () => (
  <EffectComparison
    title="Funnel Bounce Effect"
    description="Funnel stages enter using a bounce animation."
    effect="bounce"
  />
);

export const WobbleEffect = () => (
  <EffectComparison
    title="Funnel Wobble Effect"
    description="Funnel stages enter using a wobble animation."
    effect="wobble"
  />
);

export const ElasticEffect = () => (
  <EffectComparison
    title="Funnel Elastic Effect"
    description="Funnel stages enter using elastic motion."
    effect="elastic"
  />
);

export const StaggerEffect = () => (
  <EffectComparison
    title="Funnel Stagger Effect"
    description="Funnel stages enter sequentially with controlled delays."
    effect="staggered-reveal"
  />
);

export const CustomOptions = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Funnel Chart Options"
        description="Orientation, alignment, sorting, tooltip, crosshair, labels, legends, and colors are compared across Chart 1 and Chart 2."
        statValue="8"
        statLabel="Option Groups"
        secondaryStatValue="16"
        secondaryStatLabel="Examples"
      />
      <section css={pageSection}>
        <SectionHeading
          title="Horizontal and Ascending"
          description="Chart 1 uses a horizontal funnel while Chart 2 uses ascending sort for a pyramid-style presentation."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 horizontal funnel with centered alignment."
            >
              <Chart
                type="funnel"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: 650,
                  indexAxis: 'x',
                  align: 'center',
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 ascending funnel rendered as a pyramid."
            >
              <Chart
                type="funnel"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 650,
                  sort: 'ascending',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Left Alignment"
          description="The funnel stages align toward the left side in both charts."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 horizontal funnel with left alignment."
            >
              <Chart
                type="funnel"
                engine="chart-1"
                data={alignmentData}
                effect="none"
                options={{
                  height: 650,
                  indexAxis: 'x',
                  align: 'left',
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 using left funnel alignment.">
              <Chart
                type="funnel"
                engine="chart-2"
                data={alignmentData}
                effect="none"
                options={{
                  height: 650,
                  funnelAlign: 'left',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Right Alignment"
          description="The funnel stages align toward the right side in both charts."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 horizontal funnel with right alignment."
            >
              <Chart
                type="funnel"
                engine="chart-1"
                data={alignmentData}
                effect="none"
                options={{
                  height: 650,
                  indexAxis: 'x',
                  align: 'right',
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 using right funnel alignment.">
              <Chart
                type="funnel"
                engine="chart-2"
                data={alignmentData}
                effect="none"
                options={{
                  height: 650,
                  funnelAlign: 'right',
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Custom Tooltip"
          description="Both charts use the shared semantic tooltip color API."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 custom funnel tooltip.">
              <Chart
                type="funnel"
                engine="chart-1"
                data={salesData}
                colors={tooltipColors}
                effect="none"
                options={{
                  height: 650,
                  plugins: {
                    tooltip: {
                      enabled: true,
                      borderWidth: 2,
                      cornerRadius: 10,
                      padding: 14,
                      displayColors: true,
                    },
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 custom funnel tooltip with matching semantic colors."
            >
              <Chart
                type="funnel"
                engine="chart-2"
                data={salesData}
                colors={tooltipColors}
                effect="none"
                options={{
                  height: 650,
                  tooltip: {
                    trigger: 'item',
                    confine: true,
                    borderWidth: 2,
                    padding: 14,
                    extraCssText:
                      'border-radius: 10px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.14);',
                    formatter: (item: CallbackDataParams) =>
                      `${String(item.marker ?? '')} ${String(item.name ?? '')}: <b>${Number(
                        item.value ?? 0,
                      ).toLocaleString()}</b>`,
                  },
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Crosshair"
          description="Crosshair inspection is disabled by default and enabled only through options.crosshair."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 with crosshair enabled.">
              <Chart
                type="funnel"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: 650,
                  crosshair: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 with crosshair enabled.">
              <Chart
                type="funnel"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 650,
                  crosshair: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Bold Labels"
          description="Both charts display emphasized funnel stage labels."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 with bold center labels.">
              <Chart
                type="funnel"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: 650,
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 with bold inside labels.">
              <Chart
                type="funnel"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 650,
                  boldLabels: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Hidden Legend"
          description="Both chart engines render the funnel with the legend disabled."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard chartName="Chart 1" description="Chart 1 with its legend hidden.">
              <Chart
                type="funnel"
                engine="chart-1"
                data={commonData}
                effect="none"
                options={{
                  height: 650,
                  showLegend: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard chartName="Chart 2" description="Chart 2 with its legend hidden.">
              <Chart
                type="funnel"
                engine="chart-2"
                data={commonData}
                effect="none"
                options={{
                  height: 650,
                  showLegend: false,
                }}
              />
            </ChartCard>
          </ComparisonItem>
        </ComparisonGrid>
      </section>
      <section css={pageSection}>
        <SectionHeading
          title="Custom Colors"
          description="Both engines receive the same shared semantic chart color configuration."
        />
        <ComparisonGrid>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 1"
              description="Chart 1 using the shared Funnel color configuration."
            >
              <Chart
                type="funnel"
                engine="chart-1"
                data={commonData}
                colors={customColors}
                effect="progressive-trace"
                options={{
                  height: 650,
                  boldLabels: true,
                  crosshair: true,
                  showLegend: true,
                }}
              />
            </ChartCard>
          </ComparisonItem>
          <ComparisonItem>
            <ChartCard
              chartName="Chart 2"
              description="Chart 2 using the same shared Funnel color configuration."
            >
              <Chart
                type="funnel"
                engine="chart-2"
                data={commonData}
                colors={customColors}
                effect="progressive-trace"
                options={{
                  height: 650,
                  boldLabels: true,
                  crosshair: true,
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
