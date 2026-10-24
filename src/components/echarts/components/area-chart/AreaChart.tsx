import type { FC } from 'react';

import { AreaChartEngine } from './engine/AreaChartEngine';
import type { AreaChartProps } from './AreaChart.types';

export const AreaChart: FC<AreaChartProps> = (props) => <AreaChartEngine {...props} />;

export default AreaChart;
