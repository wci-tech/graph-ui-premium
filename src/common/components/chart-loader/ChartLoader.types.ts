import type {
    LoaderProps,
    StyleType,
} from '@wci-tech/core-ui-premium';

export interface ChartLoaderCustomStyles {
    readonly wrapper?: StyleType;
}

export interface ChartLoaderProps
    extends Omit<LoaderProps, 'loading'> {
    readonly loading?: boolean;
    readonly customChartLoaderStyles?: ChartLoaderCustomStyles;
    readonly testId?: string;
    readonly ariaLable?: string;
}