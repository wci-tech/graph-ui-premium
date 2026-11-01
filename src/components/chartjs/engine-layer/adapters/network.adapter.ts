import { compactObject } from '@wci-tech/core-ui-premium';

import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
    NetworkGraphColors,
    NetworkGraphData,
    NetworkGraphOptions,
    NetworkGraphProps,
} from '@/components/chartjs/components/network-graph/NetworkGraph.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';

const NETWORK_GRAPH_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies ChartJSEffect[];

const isNetworkGraphEffect = (
    effect: ChartEffect | undefined,
): effect is ChartJSEffect =>
    effect !== undefined && (NETWORK_GRAPH_EFFECTS as ChartEffect[]).includes(effect);

const resolveEffect = (effect: ChartEffect | undefined): ChartJSEffect | undefined =>
    isNetworkGraphEffect(effect) ? effect : undefined;

const resolveColors = (
    colors: EngineRendererProps['colors'],
): NetworkGraphColors | undefined => {
    if (!colors) return undefined;
    return compactObject({
        series: colors.series,
        axisText: colors.axisText,
        axisLine: colors.axisLine,
        grid: colors.grid,
        tooltipBackground: colors.tooltipBackground,
        tooltipText: colors.tooltipText,
        tooltipBorder: colors.tooltipBorder,
    });
};

const resolveData = (data: EngineRendererProps['data']): NetworkGraphData => ({
    nodes: (data.nodes ?? []).map((node) =>
        compactObject({
            id: node.id,
            label: node.label,
            size: node.size,
            color: node.color,
        }),
    ),
    edges: (data.edges ?? []).map((edge) =>
        compactObject({
            from: edge.from,
            to: edge.to,
            color: edge.color,
        }),
    ),
});

export const adaptChartJSNetworkGraphProps = (
    props: EngineRendererProps,
): NetworkGraphProps => {
    const {
        data,
        colors,
        effect,
        options,
        showDownload,
        downloadPlacement,
        customStyles,
        className,
        testId,
    } = props;

    return compactObject({
        data: resolveData(data),
        colors: resolveColors(colors),
        effect: resolveEffect(effect),
        options: options as NetworkGraphOptions | undefined,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });
};