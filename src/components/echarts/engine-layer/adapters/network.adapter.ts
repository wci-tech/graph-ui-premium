import { compactObject } from '@wci-tech/core-ui-premium';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type {
    NetworkGraphColors,
    NetworkGraphData,
    NetworkGraphOptions,
    NetworkGraphProps,
} from '@/components/echarts/components/network-graph/NetworkGraph.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';

const NETWORK_GRAPH_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies EChartsEffect[];

const isNetworkGraphEffect = (
    effect: ChartEffect | undefined,
): effect is EChartsEffect =>
    effect !== undefined && (NETWORK_GRAPH_EFFECTS as ChartEffect[]).includes(effect);

const resolveEffect = (effect: ChartEffect | undefined): EChartsEffect | undefined =>
    isNetworkGraphEffect(effect) ? effect : undefined;

const resolveColors = (
    colors: EngineRendererProps['colors'],
): NetworkGraphColors | undefined => {
    if (!colors) return undefined;
    return compactObject({
        series: colors.series ? Array.from(colors.series) : undefined,
        axisText: colors.axisText,
        axisLine: colors.axisLine,
        grid: colors.grid,
        tooltipBackground: colors.tooltipBackground,
        tooltipText: colors.tooltipText,
        tooltipBorder: colors.tooltipBorder,
    });
};

const resolveData = (data: EngineRendererProps['data']): NetworkGraphData => ({
    series: [
        {
            label: data.series[0]?.label ?? 'Network',
            nodes: (data.nodes ?? []).map((node) =>
                compactObject({
                    id: node.id,
                    name: node.label,
                    symbolSize: node.size,
                    color: node.color,
                }),
            ),
            links: (data.edges ?? []).map((edge) =>
                compactObject({
                    source: edge.from,
                    target: edge.to,
                }),
            ),
        },
    ],
});

export const adaptEChartsNetworkGraphProps = (
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