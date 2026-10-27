import { BarElement, CategoryScale, LinearScale, TimeScale } from 'chart.js';
import { Chart as ChartJSAuto } from 'chart.js/auto';

import 'chartjs-adapter-date-fns';

let isRegistered = false;

export const registerGanttChart = () => {
  if (isRegistered) return;

  ChartJSAuto.register(TimeScale, CategoryScale, LinearScale, BarElement);

  isRegistered = true;
};
