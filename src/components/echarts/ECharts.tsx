/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { compactObject, Icon, PopOver, Typography } from '@wci-tech/core-ui-premium';

import { useECharts } from './hooks/useECharts';
import { DOWNLOAD_ITEMS } from './utils/ECharts.constants';
import { useStyles } from './ECharts.styles';
import type { DownloadFormat, EChartsProps } from './ECharts.types';

export const ECharts = ({
  options,
  chartId,
  ariaLable,
  downloadText,
  showDownload = true,
  downloadPlacement = 'top-right',
  customStyles = {},
}: EChartsProps) => {
  const styles = useStyles();

  const { chartRef, handleDownload } = useECharts(
    compactObject({
      options,
      chartId,
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
              aria-label={ariaLable || 'Download chart'}
              css={[styles.labelWrapper, customStyles.downloadLabel]}
            >
              <Typography variant="span">{downloadText || 'Download'}</Typography>

              <Icon
                name="arrowDown"
                color="black"
                customStyles={css([customStyles.downloadIcon])}
              />
            </div>
          </PopOver>
        </div>
      ) : null}

      <div css={[styles.chartWrapper(options?.height), customStyles.chartWrapper]}>
        <div ref={chartRef} css={[styles.chart, customStyles.chart]} />
      </div>
    </div>
  );
};

export default ECharts;
