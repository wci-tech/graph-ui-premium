/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';

import { compactObject, useIntersectionObserver } from '@wci-tech/core-ui-premium';

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
   * renderWhenVisible charts begin disabled and are enabled
   * permanently after entering the viewport for the first time.
   */
  const [hasBeenVisible, setHasBeenVisible] = useState(!lazyLoadOnVisible);

  /*
   * Keep using the existing core-ui hook.
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
   * Latch visibility.
   *
   * We intentionally do not use isInView directly for rendering,
   * because after the chart has been activated it should remain mounted.
   */
  useEffect(() => {
    if (!isInView || hasBeenVisible) {
      return;
    }

    setHasBeenVisible(true);
  }, [hasBeenVisible, isInView]);

  const shouldRender = !lazyLoadOnVisible || hasBeenVisible;

  /*
   * Engine loading is also deferred.
   *
   * This is the important part:
   * ChartJS / ECharts will not even be loaded for this Chart instance
   * until its placeholder reaches the viewport.
   */
  const { resolvedEngine, engineModule, isLoading } = useChart({
    engine,
    type,
    enabled: shouldRender,
  });

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
   * Before viewport entry, render only the correctly-sized root.
   *
   * This preserves layout while preventing the real chart renderer
   * and its entrance animation from starting early.
   */
  if (!shouldRender) {
    return <div ref={ref} data-testid={testId} css={styles.root} />;
  }

  /*
   * Once visible, useChart begins loading the engine.
   */
  if (isLoading || !engineModule) {
    return (
      <div ref={ref} data-testid={testId} css={styles.root}>
        <div css={styles.message}>Loading chart...</div>
      </div>
    );
  }

  const EngineRenderer = engineModule.EngineRenderer;

  /*
   * renderWhenVisible belongs only to the shared Chart wrapper.
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
