/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';

import { compactObject, useIntersectionObserver } from '@wci-tech/core-ui-premium';

import { ChartLoader } from '@/common/components/chart-loader';
import type { EngineRendererProps } from '@/engines/engine.types';

import { useChart } from './hooks/useChart';
import { useStyles } from './Chart.styles';
import type { ChartProps } from './Chart.types';

export const Chart = (props: ChartProps) => {
  const {
    options,
    type,
    engine = 'auto',
    showDownload = false,
    lazyLoadOnVisible = false,
    testId = 'chart-test-id',
  } = props;

  const styles = useStyles(options?.height);

  /*
   * Normal charts begin enabled immediately.
   *
   * Lazy-loaded charts begin disabled and are enabled permanently
   * after entering the viewport for the first time.
   */
  const [hasBeenVisible, setHasBeenVisible] = useState(!lazyLoadOnVisible);

  /*
   * Observe the chart container only until it becomes visible.
   *
   * Once hasBeenVisible becomes true, observation is no longer needed.
   */
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({
    enabled: lazyLoadOnVisible && !hasBeenVisible,
    triggerOnce: true,
    threshold: 0.25,
    rootMargin: '0px 0px -10% 0px',
  });

  /*
   * Latch the visible state.
   *
   * The chart remains mounted after its first viewport entry,
   * even if it later leaves the viewport.
   */
  useEffect(() => {
    if (!isInView || hasBeenVisible) {
      return;
    }

    setHasBeenVisible(true);
  }, [hasBeenVisible, isInView]);

  const shouldRender = !lazyLoadOnVisible || hasBeenVisible;

  /*
   * Engine loading is deferred until the chart is ready to render.
   *
   * Chart.js or ECharts will not be loaded for this chart instance
   * until lazy loading has been activated.
   */
  const { resolvedEngine, engineModule, isLoading } = useChart({
    engine,
    type,
    enabled: shouldRender,
  });

  /*
   * Render an unsupported-engine message when no registered engine
   * can render the requested chart type.
   */
  if (!resolvedEngine) {
    return (
      <div ref={ref} data-testid={testId} css={styles.root}>
        <div css={styles.message}>
          No chart engine supports "{type}" for engine "{engine}".
        </div>
      </div>
    );
  }

  /*
   * Before viewport entry, render only the correctly-sized container.
   *
   * This preserves the page layout without loading the chart engine.
   */
  if (!shouldRender) {
    return <div ref={ref} data-testid={testId} css={styles.root} />;
  }

  /*
   * Display the shared block-level ChartLoader while the selected
   * chart engine is being loaded.
   */
  if (isLoading || !engineModule) {
    return (
      <div ref={ref} data-testid={testId} css={styles.root}>
        <ChartLoader />
      </div>
    );
  }

  const EngineRenderer = engineModule.EngineRenderer;

  /*
   * lazyLoadOnVisible belongs only to the shared Chart wrapper.
   * Individual engine implementations do not need this prop.
   */
  const { lazyLoadOnVisible: _lazyLoadOnVisible, ...rendererProps } = props;

  const engineRendererProps = compactObject({
    ...rendererProps,
    showDownload,
    resolvedEngine,
  }) as unknown as EngineRendererProps;

  return (
    <div ref={ref} data-testid={testId} css={styles.root}>
      <EngineRenderer {...engineRendererProps} />
    </div>
  );
};

export default Chart;
