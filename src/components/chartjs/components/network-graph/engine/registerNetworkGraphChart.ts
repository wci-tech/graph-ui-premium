import { Chart as ChartJSAuto } from 'chart.js/auto';
import { EdgeLine, ForceDirectedGraphController } from 'chartjs-chart-graph';

let isRegistered = false;

export const registerNetworkGraphChart = () => {
  if (isRegistered) {
    return;
  }
  ChartJSAuto.register(
    ForceDirectedGraphController,
    EdgeLine,
  );
  isRegistered = true;
};