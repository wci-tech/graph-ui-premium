import { Chart } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

let isRegistered = false;

/**
 * Registers the Chart.js matrix controller and element once.
 */
export const registerHeatmapChart = (): void => {
  if (isRegistered) {
    return;
  }

  Chart.register(MatrixController, MatrixElement);
  isRegistered = true;
};