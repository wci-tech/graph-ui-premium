/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { compactObject, Icon, PopOver, Typography } from '@wci-tech/core-ui-premium';

import { useChartjs } from './hooks/useChartjs';
import { DOWNLOAD_ITEMS } from './utils/ChartJS.constants';
import { useStyles } from './ChartJS.styles';
import type { ChartjsProps, DownloadFormat } from './ChartJS.types';

export const Chartjs = ({
  type,
  data,
  options,
  plugins = [],
  showDownload = true,
  downloadPlacement = 'top-right',
  customStyles = {},
}: ChartjsProps) => {
  const styles = useStyles();

  const { canvasRef, handleDownload } = useChartjs(
    compactObject({
      type,
      data,
      options,
      plugins,
    }),
  );

  return (
    <div css={[styles.container, customStyles.container]}>
      {showDownload ? (
        <div css={[styles.downloadWrapper(downloadPlacement), customStyles.downloadWrapper]}>
          <PopOver
            items={DOWNLOAD_ITEMS}
            trigger="click"
            placement="bottom-start"
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

      <div css={[styles.wrapper(options?.height), customStyles.chartWrapper]}>
        <div css={styles.canvasWrapper}>
          <canvas ref={canvasRef} css={[styles.canvas, customStyles.chart]} />
        </div>
      </div>
    </div>
  );
};

export default Chartjs;
