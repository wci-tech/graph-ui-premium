/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { GaugeMeter } from '@/components/chartjs/components/gauge-meter/GaugeMeter';
import type { GaugeMeterEffect } from '@/components/chartjs/components/gauge-meter/GaugeMeter.types';

const meta: Meta<typeof GaugeMeter> = {
  title: 'components/chartjs/GaugeMeter',
  component: GaugeMeter,
};

export default meta;

const mockData = {
  labels: ['Score', 'Remaining'],
  data: [711, 289],
};

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  margin-bottom: 16px;
  color: var(--wci-chart-axis-text);
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH2 = css`
  margin-bottom: 12px;
  padding: 16px;
  color: var(--wci-chart-axis-text);
  font-size: 1.875rem;
  font-weight: 600;
`;

const titleH3 = css`
  margin-bottom: 8px;
  color: var(--wci-chart-axis-text);
  font-size: 1.35rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  color: var(--wci-chart-axis-text);
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  color: var(--wci-chart-axis-text);
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

const codePill = css`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border: 1px solid var(--wci-chart-grid);
  border-radius: 999px;
  color: var(--wci-chart-axis-text);
  font-family: monospace;
  font-size: 12px;
`;

const customGaugeVariables = css`
  --wci-chart-blue: #2563eb;
  --wci-chart-teal: #06b6d4;
  --wci-chart-green: #10b981;
  --wci-chart-orange: #f59e0b;
  --wci-chart-red: #ef4444;
  --wci-chart-purple: #7c3aed;
  --wci-chart-magenta: #db2777;
  --wci-chart-cyan: #0891b2;
  --wci-chart-yellow: #eab308;

  --wci-chart-axis-text: #475569;
  --wci-chart-axis-line: #1e3a8a;
  --wci-chart-grid: #dbeafe;
  --wci-chart-tooltip-background: #ffffff;
  --wci-chart-tooltip-text: #172554;
  --wci-chart-tooltip-border: #dbeafe;
`;

const darkGaugeVariables = css`
  --wci-chart-blue: #3d9eff;
  --wci-chart-teal: #17ceca;
  --wci-chart-green: #59cc26;
  --wci-chart-orange: #ffae00;
  --wci-chart-red: #f5456e;
  --wci-chart-purple: #a78bfa;
  --wci-chart-magenta: #f472b6;
  --wci-chart-cyan: #22d3ee;
  --wci-chart-yellow: #facc15;

  --wci-chart-axis-text: #cbd5e1;
  --wci-chart-axis-line: #f8fafc;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #0f172a;
  --wci-chart-tooltip-text: #f8fafc;
  --wci-chart-tooltip-border: #475569;

  background-color: #0f172a;
`;

const softGaugeVariables = css`
  --wci-chart-blue: #fb7185;
  --wci-chart-teal: #fda4af;
  --wci-chart-green: #fecdd3;
  --wci-chart-orange: #f43f5e;
  --wci-chart-red: #e11d48;
  --wci-chart-purple: #c084fc;
  --wci-chart-magenta: #f472b6;
  --wci-chart-cyan: #67e8f9;
  --wci-chart-yellow: #fde047;

  --wci-chart-axis-text: #64748b;
  --wci-chart-axis-line: #be123c;
  --wci-chart-grid: #ffe4e6;
  --wci-chart-tooltip-background: #fff1f2;
  --wci-chart-tooltip-text: #881337;
  --wci-chart-tooltip-border: #fecdd3;
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
  readonly effect: GaugeMeterEffect;
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
            <GaugeMeter {...mockData} value={711} effect={effect} />
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
        title="Default ChartJS Gauge Meter"
        description="A semicircular score meter using the shared chart color tokens and typed Gauge Meter plugins."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter {...mockData} value={711} effect="none" />
      </Box>
    </div>
  </main>
);

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Gauge meter rendered with a bounce entrance animation."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Gauge meter rendered with a wobble entrance animation."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Gauge meter rendered with an elastic entrance animation."
  />
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Gauge meter rendered using a progressive trace animation."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Gauge meter rendered using an elastic glide animation."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Gauge meter rendered using a staggered reveal animation."
  />
);

export const HiddenBoundaryLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Gauge Without Boundary Labels"
        description="The gauge boundary labels are hidden."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          {...mockData}
          value={711}
          effect="none"
          options={{
            showBoundaryLabels: false,
          }}
        />
      </Box>
    </div>
  </main>
);

export const HiddenSegmentLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Gauge Without Segment Labels"
        description="Internal segment boundary values are hidden."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          {...mockData}
          value={711}
          effect="none"
          options={{
            showSegmentLabels: false,
          }}
        />
      </Box>
    </div>
  </main>
);

export const HiddenAllLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Gauge Without Scale Labels"
        description="Both boundary labels and segment labels are hidden."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          {...mockData}
          value={711}
          effect="none"
          options={{
            showBoundaryLabels: false,
            showSegmentLabels: false,
          }}
        />
      </Box>
    </div>
  </main>
);

export const ThinArc = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title="Thin Gauge Arc" description="A thinner gauge ring using a larger cutout." />

      <Box customStyles={heroBox}>
        <GaugeMeter
          {...mockData}
          value={711}
          effect="none"
          options={{
            cutout: '91%',
          }}
        />
      </Box>
    </div>
  </main>
);

export const ThickArc = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Thick Gauge Arc"
        description="A thicker gauge ring using a smaller cutout."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          {...mockData}
          value={711}
          effect="none"
          options={{
            cutout: '68%',
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomNeedleColor = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Needle Color"
        description="Gauge meter using a custom needle color through the colors API."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          {...mockData}
          value={711}
          effect="none"
          colors={{
            needle: '#dc2626',
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomScoreLabel = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Score Label"
        description="Gauge meter with a custom score label and score color."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          {...mockData}
          value={711}
          effect="none"
          colors={{
            score: '#2563eb',
          }}
          options={{
            label: 'CREDIT SCORE',
          }}
        />
      </Box>
    </div>
  </main>
);

export const PercentageUnit = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro title="Percentage Gauge" description="Gauge meter showing a percentage unit." />

      <Box customStyles={heroBox}>
        <GaugeMeter
          labels={['Progress']}
          data={[100]}
          value={75}
          effect="none"
          colors={{
            needle: '#3b82f6',
          }}
          options={{
            unit: '%',
            label: 'PROGRESS',
            showSegmentLabels: false,
          }}
        />
      </Box>
    </div>
  </main>
);

export const ProgressiveScale = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Progressive 0–100 Gauge"
        description="A ten-segment gauge with a value of 45."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          labels={Array.from({ length: 10 }, (_, index) => String((index + 1) * 10))}
          data={[10, 10, 10, 10, 10, 10, 10, 10, 10, 10]}
          value={45}
          effect="progressive-trace"
          colors={{
            needle: '#10b981',
            series: [
              '#f1f5f9',
              '#f1f5f9',
              '#f1f5f9',
              '#ef4444',
              '#f59e0b',
              '#3b82f6',
              '#10b981',
              '#f1f5f9',
              '#f1f5f9',
              '#f1f5f9',
            ],
          }}
          options={{
            label: 'AVERAGE',
          }}
        />
      </Box>
    </div>
  </main>
);

export const RiskLevel = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Risk Level Gauge"
        description="A four-segment gauge showing a risk score."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          labels={['Low', 'Moderate', 'High', 'Critical']}
          data={[250, 250, 250, 250]}
          value={543}
          effect="none"
          colors={{
            needle: '#ef4444',
          }}
          options={{
            label: 'RISK LEVEL',
            boldScore: true,
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomBoundaryColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Gauge Label Colors"
        description="Custom colors applied to the score, boundary labels, and segment labels."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          {...mockData}
          value={711}
          effect="none"
          colors={{
            score: '#1d4ed8',
          }}
          options={{
            label: 'PERFORMANCE',
            boundaryLabelColor: '#7c3aed',
            segmentLabelColor: '#dc2626',
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
        title="Custom Gauge Colors"
        description="Gauge meter using the typed colors API for the series, needle, score, and labels."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          {...mockData}
          value={711}
          effect="none"
          colors={{
            series: ['#4054d1', '#17ceca'],
            needle: '#26327d',
            label: '#64748b',
            score: '#4054d1',
            scoreLabel: '#64748b',
          }}
          options={{
            label: 'PERFORMANCE',
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
        title="ChartJS Gauge Meter Custom Styles"
        description="Gauge meter using shared chart CSS variables on different surfaces."
      />

      <Typography variant="h2" customStyles={titleH2}>
        Custom Styling
      </Typography>

      <FlexLayout
        columns={12}
        gap={{
          default: '24px',
          md: '32px',
        }}
        wrap="wrap"
      >
        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Custom Chart Variables"
            description="Overrides the shared chart palette and chart tokens through the Gauge Meter wrapper."
            api="customStyles.wrapper"
          >
            <GaugeMeter
              {...mockData}
              value={711}
              effect="none"
              customStyles={{
                wrapper: customGaugeVariables,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Dark Surface"
            description="Gauge meter rendered on a dark surface using shared chart color tokens."
            api="customStyles.wrapper"
          >
            <GaugeMeter
              {...mockData}
              value={711}
              effect="none"
              customStyles={{
                wrapper: darkGaugeVariables,
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem columnSpan={{ default: 12, md: 6 }}>
          <ChartCard
            title="Soft Palette"
            description="Gauge meter rendered with a custom soft palette using the shared chart variables."
            api="customStyles.wrapper"
          >
            <GaugeMeter
              {...mockData}
              value={711}
              effect="none"
              customStyles={{
                wrapper: softGaugeVariables,
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
