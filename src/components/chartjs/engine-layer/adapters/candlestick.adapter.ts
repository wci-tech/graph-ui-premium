import { compactObject } from '@wci-tech/core-ui-premium';

import { toCandlestickSeriesData } from '@/common/utils/adaptersHelper.utils';
import type {
    CandlestickChartColors,
    CandlestickChartEffect,
    CandlestickChartOptions,
    CandlestickChartProps,
} from '@/components/chartjs/components/candlestick-chart/CandlestickChart.types';
import type {
    ChartCandlestickColors,
    EngineRendererProps,
} from '@/engines/engine.types';



type CandlestickEngineRendererProps = Extract<
    EngineRendererProps,
    { readonly type: 'candlestick' }
>;

const CANDLESTICK_EFFECTS = new Set<CandlestickChartEffect>([
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
]);

const resolveEffect = (
    effect: CandlestickEngineRendererProps['effect'],
): CandlestickChartEffect =>
    effect &&
        CANDLESTICK_EFFECTS.has(
            effect as CandlestickChartEffect,
        )
        ? (effect as CandlestickChartEffect)
        : 'none';

const resolveData = (
    data: CandlestickEngineRendererProps['data'],
): CandlestickChartProps['data'] =>
    data.series.flatMap((seriesItem) =>
        toCandlestickSeriesData(seriesItem.data),
    );

const resolveColors = (
    colors: ChartCandlestickColors | undefined,
): CandlestickChartColors | undefined => {
    if (!colors) {
        return undefined;
    }

    return compactObject({
        up: colors.up,
        down: colors.down,
        unchanged: colors.unchanged,
        volumeUp: colors.volumeUp,
        volumeDown: colors.volumeDown,
        axisText: colors.axisText,
        axisLine: colors.axisLine,
        grid: colors.grid,
        crosshair: colors.crosshair,
        crosshairLabelBackground:
            colors.crosshairLabelBackground,
        crosshairLabelText:
            colors.crosshairLabelText,
        tooltipBackground:
            colors.tooltipBackground,
        tooltipText: colors.tooltipText,
        tooltipBorder: colors.tooltipBorder,
    });
};

const resolveOptions = (
    options: CandlestickEngineRendererProps['options'],
): CandlestickChartOptions | undefined =>
    options as CandlestickChartOptions | undefined;

export const adaptChartJSCandlestickProps = (
    props: CandlestickEngineRendererProps,
): CandlestickChartProps =>
    compactObject({
        data: resolveData(props.data),
        colors: resolveColors(props.colors),
        options: resolveOptions(props.options),
        effect: resolveEffect(props.effect),
        showDownload: props.showDownload,
        downloadPlacement: props.downloadPlacement,
        rendererCustomStyles: props.customStyles,
        className: props.className,
        testId: props.testId,
    });