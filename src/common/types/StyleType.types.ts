import { type CSSObject, type SerializedStyles } from '@emotion/react';

type StyleType = CSSObject | SerializedStyles | ReadonlyArray<CSSObject | SerializedStyles>;

export type { StyleType };
