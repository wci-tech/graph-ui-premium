import type { GaugeMeterProps } from '../GaugeMeter.types';

export type BaseGaugeMeterProps =
  GaugeMeterProps & {
    readonly 'data-testid'?: string;
  };