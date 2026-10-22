import { createRef } from 'react';

import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useClickOutside } from '@/components/chartjs/hooks/useClickOutside';

describe('useClickOutside', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls onClickOutside when clicking outside the referenced element', () => {
    const ref = createRef<HTMLDivElement>();
    const onClickOutside = vi.fn();

    const container = document.createElement('div');
    const insideElement = document.createElement('button');
    const outsideElement = document.createElement('button');

    container.appendChild(insideElement);
    document.body.append(container, outsideElement);

    ref.current = container;

    renderHook(() => useClickOutside(ref, onClickOutside));

    outsideElement.dispatchEvent(
      new MouseEvent('mousedown', {
        bubbles: true,
      }),
    );

    expect(onClickOutside).toHaveBeenCalledTimes(1);

    document.body.innerHTML = '';
  });

  it('does not call onClickOutside when clicking inside the referenced element', () => {
    const ref = createRef<HTMLDivElement>();
    const onClickOutside = vi.fn();

    const container = document.createElement('div');
    const insideElement = document.createElement('button');

    container.appendChild(insideElement);
    document.body.appendChild(container);

    ref.current = container;

    renderHook(() => useClickOutside(ref, onClickOutside));

    insideElement.dispatchEvent(
      new MouseEvent('mousedown', {
        bubbles: true,
      }),
    );

    expect(onClickOutside).not.toHaveBeenCalled();

    document.body.innerHTML = '';
  });

  it('does not call onClickOutside when the ref is null', () => {
    const ref = createRef<HTMLDivElement>();
    const onClickOutside = vi.fn();

    renderHook(() => useClickOutside(ref, onClickOutside));

    document.dispatchEvent(
      new MouseEvent('mousedown', {
        bubbles: true,
      }),
    );

    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('does not call onClickOutside when the event target is not a Node', () => {
    const ref = createRef<HTMLDivElement>();
    const onClickOutside = vi.fn();

    ref.current = document.createElement('div');

    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

    renderHook(() => useClickOutside(ref, onClickOutside));

    const handler = addEventListenerSpy.mock.calls[0]?.[1] as EventListener;

    handler({
      target: 'not-a-node',
    } as unknown as MouseEvent);

    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('removes the event listener on unmount', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const ref = createRef<HTMLDivElement>();
    const onClickOutside = vi.fn();

    const { unmount } = renderHook(() => useClickOutside(ref, onClickOutside));

    const handler = addEventListenerSpy.mock.calls[0]?.[1];

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', handler);
  });

  it('re-registers the listener when the callback changes', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const ref = createRef<HTMLDivElement>();

    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    const { rerender } = renderHook(({ callback }) => useClickOutside(ref, callback), {
      initialProps: {
        callback: firstCallback,
      },
    });

    rerender({
      callback: secondCallback,
    });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
  });
});
