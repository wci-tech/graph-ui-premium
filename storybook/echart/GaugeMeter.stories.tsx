/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import { Box, FlexItem, FlexLayout, Typography } from '@wci-tech/core-ui-premium';

import { GaugeMeter } from '@/components/echarts/components';
import type { GaugeMeterEffect } from '@/components/echarts/components/gauge-meter/GaugeMeter.types';

const meta: Meta<typeof GaugeMeter> = {
  title: 'components/echarts/GaugeMeter',
  component: GaugeMeter,
};

export default meta;

const mockLabels = ['Performance'];
const mockData = [75];

const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

const titleH1 = css`
  margin-bottom: 16px;
  color: #1e293b;
  font-size: 2.5rem;
  font-weight: 700;
`;

const titleH2 = css`
  margin-bottom: 12px;
  padding: 16px;
  color: #1e293b;
  font-size: 1.875rem;
  font-weight: 600;
`;

const titleH3 = css`
  margin-bottom: 8px;
  color: #1e293b;
  font-size: 1.35rem;
  font-weight: 600;
`;

const paragraph = css`
  margin-bottom: 24px;
  color: #475569;
  font-size: 1.125rem;
  line-height: 1.6;
`;

const paragraphSmall = css`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const heroBox = css`
  padding: 32px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #f8fafc;
`;

const chartCard = css`
  height: 100%;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 10px 25px rgb(15 23 42 / 6%);
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
  border-radius: 999px;
  background: #f1f5f9;
  color: #334155;
  font-family: monospace;
  font-size: 12px;
`;

const customGaugeVariables = css`
  --wci-chart-blue: #2563eb;
  --wci-chart-teal: #60a5fa;
  --wci-chart-green: #22c55e;
  --wci-chart-orange: #f59e0b;
  --wci-chart-red: #ef4444;
  --wci-chart-purple: #8b5cf6;
  --wci-chart-magenta: #ec4899;
  --wci-chart-cyan: #06b6d4;
  --wci-chart-yellow: #eab308;

  --wci-chart-axis-text: #475569;
  --wci-chart-axis-line: #1d4ed8;
  --wci-chart-grid: #dbeafe;
  --wci-chart-tooltip-background: #111827;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #334155;
`;

const darkGaugeVariables = css`
  --wci-chart-blue: #73c0de;
  --wci-chart-teal: #38bdf8;
  --wci-chart-green: #4ade80;
  --wci-chart-orange: #fb923c;
  --wci-chart-red: #f87171;
  --wci-chart-purple: #a78bfa;
  --wci-chart-magenta: #f472b6;
  --wci-chart-cyan: #22d3ee;
  --wci-chart-yellow: #facc15;

  --wci-chart-axis-text: #cbd5e1;
  --wci-chart-axis-line: #f8fafc;
  --wci-chart-grid: #334155;
  --wci-chart-tooltip-background: #020617;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #475569;
`;

const softGaugeVariables = css`
  --wci-chart-blue: #fb7185;
  --wci-chart-teal: #fda4af;
  --wci-chart-green: #86efac;
  --wci-chart-orange: #fdba74;
  --wci-chart-red: #f87171;
  --wci-chart-purple: #c4b5fd;
  --wci-chart-magenta: #f9a8d4;
  --wci-chart-cyan: #67e8f9;
  --wci-chart-yellow: #fde047;

  --wci-chart-axis-text: #64748b;
  --wci-chart-axis-line: #be123c;
  --wci-chart-grid: #ffe4e6;
  --wci-chart-tooltip-background: #881337;
  --wci-chart-tooltip-text: #ffffff;
  --wci-chart-tooltip-border: #fda4af;
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
            <GaugeMeter
              labels={mockLabels}
              data={mockData}
              value={75}
              effect={effect}
              options={{
                height: 420,
              }}
            />
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
        title="Default ECharts Gauge Meter"
        description="Default ECharts gauge meter using segmented colors, pointer, anchor, axis labels, and animated detail value."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          labels={mockLabels}
          data={mockData}
          value={75}
          effect="none"
          options={{
            height: 420,
          }}
        />
      </Box>
    </div>
  </main>
);

export const ProgressiveTraceEffect = () => (
  <EffectStory
    effect="progressive-trace"
    title="Progressive Trace Effect"
    description="Gauge meter reveals its current value with a smooth animated transition."
  />
);

export const BounceEffect = () => (
  <EffectStory
    effect="bounce"
    title="Bounce Effect"
    description="Gauge meter uses a bounce easing when entering."
  />
);

export const WobbleEffect = () => (
  <EffectStory
    effect="wobble"
    title="Wobble Effect"
    description="Gauge meter uses a subtle wobble-style entrance animation."
  />
);

export const ElasticEffect = () => (
  <EffectStory
    effect="elastic"
    title="Elastic Effect"
    description="Gauge meter uses a spring-like elastic animation."
  />
);

export const ElasticGlideEffect = () => (
  <EffectStory
    effect="elastic-glide"
    title="Elastic Glide Effect"
    description="Gauge meter smoothly glides into place with an elastic transition."
  />
);

export const StaggeredRevealEffect = () => (
  <EffectStory
    effect="staggered-reveal"
    title="Staggered Reveal Effect"
    description="Gauge meter applies a delayed animated transition."
  />
);

export const HalfGauge = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Minimal Half Gauge"
        description="Gauge meter displayed as a compact semicircle."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          labels={['Completion']}
          data={[45]}
          value={45}
          options={{
            height: 420,
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '68%'],
            radius: '95%',
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomMaximum = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Maximum Gauge"
        description="Speed gauge configured with a maximum value of 240 km/h."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          labels={['Speed']}
          data={[180]}
          value={180}
          options={{
            height: 420,
            min: 0,
            max: 240,
            unit: ' km/h',
            label: 'Vehicle Speed',
          }}
        />
      </Box>
    </div>
  </main>
);

export const StageColors = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Gauge Stage Colors"
        description="Gauge meter uses multiple series colors to create threshold stages."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          labels={['Low', 'Medium', 'High']}
          data={[30, 40, 30]}
          value={55}
          colors={{
            series: ['#ee6666', '#fac858', '#91cc75'],
          }}
          options={{
            height: 420,
            max: 100,
            label: 'Risk Score',
          }}
        />
      </Box>
    </div>
  </main>
);

export const HiddenAxisLabels = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Gauge Without Axis Labels"
        description="Gauge meter rendered without numeric axis labels, ticks, and split lines."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          labels={mockLabels}
          data={mockData}
          value={75}
          options={{
            height: 420,
            showBoundaryLabels: false,
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomPointer = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Gauge Pointer"
        description="Gauge meter with a longer and thinner pointer."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          labels={mockLabels}
          data={mockData}
          value={75}
          colors={{
            needle: '#dc2626',
          }}
          options={{
            height: 420,
            pointerLength: '88%',
            pointerWidth: 6,
          }}
        />
      </Box>
    </div>
  </main>
);

export const CustomValue = () => (
  <main role="main">
    <div css={pageContainer}>
      <PageIntro
        title="Custom Gauge Value"
        description="Gauge meter value can be controlled independently from the segment data."
      />

      <Box customStyles={heroBox}>
        <GaugeMeter
          labels={['Performance']}
          data={[25, 25, 25, 25]}
          value={68}
          options={{
            height: 420,
            min: 0,
            max: 100,
            label: 'Performance',
            unit: '%',
            boldScore: true,
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
        title="ECharts Gauge Meter Custom Styles"
        description="Gauge meter using shared chart CSS variables on custom light, dark, and soft surfaces."
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
        <FlexItem
          columnSpan={{
            default: 12,
            md: 6,
          }}
        >
          <ChartCard
            title="Custom CSS Variables"
            description="Overrides series, pointer, axis, label, score, and tooltip colors through shared chart tokens."
            api="customStyles.wrapper"
          >
            <GaugeMeter
              labels={mockLabels}
              data={mockData}
              value={75}
              effect="none"
              customStyles={{
                wrapper: customGaugeVariables,
              }}
              options={{
                height: 420,
                backgroundColor: '#eff6ff',
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
            md: 6,
          }}
        >
          <ChartCard
            title="Dark Surface"
            description="Gauge meter rendered on a dark background using shared chart CSS variables."
            api="customStyles.wrapper + options.backgroundColor"
          >
            <GaugeMeter
              labels={['Performance']}
              data={[70]}
              value={70}
              effect="none"
              customStyles={{
                wrapper: darkGaugeVariables,
              }}
              options={{
                height: 420,
                backgroundColor: '#0f172a',
              }}
            />
          </ChartCard>
        </FlexItem>

        <FlexItem
          columnSpan={{
            default: 12,
            md: 6,
          }}
        >
          <ChartCard
            title="Soft Palette"
            description="Gauge meter using a soft rose palette through the shared chart CSS variables."
            api="customStyles.wrapper"
          >
            <GaugeMeter
              labels={['Satisfaction']}
              data={[88]}
              value={88}
              effect="none"
              customStyles={{
                wrapper: softGaugeVariables,
              }}
              options={{
                height: 420,
                backgroundColor: '#fff1f2',
              }}
            />
          </ChartCard>
        </FlexItem>
      </FlexLayout>
    </div>
  </main>
);
