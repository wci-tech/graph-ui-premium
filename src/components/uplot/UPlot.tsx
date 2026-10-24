/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { compactObject, Icon, PopOver, Typography } from '@wci-tech/core-ui-premium';

import { useUPlot } from './hooks/useUPlot';
import { DEFAULT_UPLOT_HEIGHT, DOWNLOAD_ITEMS } from './utils/UPlot.constants';
import { useStyles } from './UPlot.styles';
import type { DownloadFormat, UPlotRendererProps } from './UPlot.types';

import 'uplot/dist/uPlot.min.css';

export const UPlot = ({
  data,
  options,
  showDownload: showDownloadProp,
  downloadPlacement = 'top-right',
  customStyles = {},
}: UPlotRendererProps) => {
  const height = options?.height ?? DEFAULT_UPLOT_HEIGHT;

  /*
   * Top-level prop has priority.
   *
   * options.showDownload remains supported for
   * backwards compatibility.
   */
  const showDownload = showDownloadProp ?? options?.showDownload ?? true;

  const styles = useStyles(height);

  const { chartRef, hoverInfo, handleDownload } = useUPlot(
    compactObject({
      data,
      options,
    }),
  );

  return (
    <div css={[styles.root, customStyles.container]}>
      {showDownload ? (
        <div css={[styles.downloadWrapper(downloadPlacement), customStyles.downloadWrapper]}>
          <PopOver
            items={DOWNLOAD_ITEMS}
            trigger="click"
            placement="bottom-end"
            effect="slide"
            onSelect={(id) => handleDownload(id as DownloadFormat)}
            customStyles={{
              trigger: css([styles.downloadTrigger, customStyles.downloadTrigger]),
              dropdown: css([styles.downloadMenu, customStyles.downloadMenu]),
            }}
          >
            <div
              tabIndex={0}
              role="button"
              aria-label="Download chart"
              css={[styles.labelWrapper, customStyles.downloadLabel]}
            >
              <Typography variant="span">Download</Typography>

              <Icon name="arrowDown" color="black" />
            </div>
          </PopOver>
        </div>
      ) : null}

      <div css={[styles.chartWrapper, customStyles.chartWrapper]}>
        <div ref={chartRef} css={[styles.chart, customStyles.chart]} />
      </div>

      {hoverInfo ? (
        <div css={styles.hoverInfo}>
          <div>
            <strong>Time:</strong> {hoverInfo.time}
          </div>

          {hoverInfo.series.map((seriesItem, index) => (
            <div key={`${seriesItem.label}-${index}`} css={styles.hoverSeries}>
              <span css={styles.hoverMarker(seriesItem.color)} />

              <span>
                <strong>{seriesItem.label}:</strong> {seriesItem.value}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default UPlot;
