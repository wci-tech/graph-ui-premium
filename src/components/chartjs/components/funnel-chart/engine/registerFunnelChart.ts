import { Chart as ChartJSAuto } from 'chart.js/auto';
import {
  FunnelController,
  TrapezoidElement,
} from 'chartjs-chart-funnel';

let isRegistered = false;

export const registerFunnelChart = (): void => {
  if (isRegistered) return;

  ChartJSAuto.register(
    FunnelController,
    TrapezoidElement,
  );

  isRegistered = true;
};