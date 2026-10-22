import '@testing-library/jest-dom/vitest';

import { vi } from 'vitest';

class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserverMock,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  canvas: document.createElement('canvas'),
  save: vi.fn(),
  restore: vi.fn(),
  clearRect: vi.fn(),
  fillRect: vi.fn(),
  strokeRect: vi.fn(),
  beginPath: vi.fn(),
  closePath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  bezierCurveTo: vi.fn(),
  quadraticCurveTo: vi.fn(),
  arc: vi.fn(),
  rect: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  clip: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  scale: vi.fn(),
  setTransform: vi.fn(),
  resetTransform: vi.fn(),
  measureText: vi.fn(() => ({ width: 100 })),
  createLinearGradient: vi.fn(() => ({
    addColorStop: vi.fn(),
  })),
  createRadialGradient: vi.fn(() => ({
    addColorStop: vi.fn(),
  })),
})) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// import '@testing-library/jest-dom/vitest';

// import { vi } from 'vitest';

// class ResizeObserverMock {
//   observe = vi.fn();
//   unobserve = vi.fn();
//   disconnect = vi.fn();
// }

// Object.defineProperty(window, 'ResizeObserver', {
//   writable: true,
//   configurable: true,
//   value: ResizeObserverMock,
// });

// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   configurable: true,
//   value: vi.fn().mockImplementation((query: string) => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: vi.fn(),
//     removeListener: vi.fn(),
//     addEventListener: vi.fn(),
//     removeEventListener: vi.fn(),
//     dispatchEvent: vi.fn(),
//   })),
// });

// HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
//   canvas: document.createElement('canvas'),
//   save: vi.fn(),
//   restore: vi.fn(),
//   clearRect: vi.fn(),
//   fillRect: vi.fn(),
//   strokeRect: vi.fn(),
//   beginPath: vi.fn(),
//   closePath: vi.fn(),
//   moveTo: vi.fn(),
//   lineTo: vi.fn(),
//   bezierCurveTo: vi.fn(),
//   quadraticCurveTo: vi.fn(),
//   arc: vi.fn(),
//   rect: vi.fn(),
//   fill: vi.fn(),
//   stroke: vi.fn(),
//   clip: vi.fn(),
//   translate: vi.fn(),
//   rotate: vi.fn(),
//   scale: vi.fn(),
//   setTransform: vi.fn(),
//   resetTransform: vi.fn(),
//   measureText: vi.fn(() => ({ width: 100 })),
//   createLinearGradient: vi.fn(() => ({
//     addColorStop: vi.fn(),
//   })),
//   createRadialGradient: vi.fn(() => ({
//     addColorStop: vi.fn(),
//   })),
// })) as unknown as typeof HTMLCanvasElement.prototype.getContext;
