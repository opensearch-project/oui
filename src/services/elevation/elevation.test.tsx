/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { mount } from 'enzyme';
import { OuiElevationProvider } from './elevation_provider';
import { useElevation } from './use_elevation';

// Helper component that exposes the hook result via a callback
function TestConsumer({
  isEnabled,
  onResult,
}: {
  isEnabled?: boolean;
  onResult: (result: ReturnType<typeof useElevation>) => void;
}) {
  const result = useElevation(
    isEnabled !== undefined ? { isEnabled } : undefined
  );
  onResult(result);
  return <div data-z-index={result.style.zIndex ?? 'none'} />;
}

describe('useElevation', () => {
  describe('within OuiElevationProvider', () => {
    it('assigns z-index starting at 90 when isEnabled defaults to true', () => {
      let result: ReturnType<typeof useElevation> | undefined;

      mount(
        <OuiElevationProvider>
          <TestConsumer onResult={(r) => (result = r)} />
        </OuiElevationProvider>
      );

      expect(result).toBeDefined();
      expect(result!.style).toEqual({ zIndex: 90 });
    });

    it('assigns incrementing z-index values for multiple overlays', () => {
      const results: Array<ReturnType<typeof useElevation>> = [];

      mount(
        <OuiElevationProvider>
          <TestConsumer onResult={(r) => results.push(r)} />
          <TestConsumer onResult={(r) => results.push(r)} />
          <TestConsumer onResult={(r) => results.push(r)} />
        </OuiElevationProvider>
      );

      // Each render may call onResult multiple times; take the last result per consumer
      // With 3 consumers, we expect z-indices 90, 100, 110
      expect(results[0].style).toEqual({ zIndex: 90 });
      expect(results[1].style).toEqual({ zIndex: 100 });
      expect(results[2].style).toEqual({ zIndex: 110 });
    });

    it('returns empty style when isEnabled is false', () => {
      let result: ReturnType<typeof useElevation> | undefined;

      mount(
        <OuiElevationProvider>
          <TestConsumer isEnabled={false} onResult={(r) => (result = r)} />
        </OuiElevationProvider>
      );

      expect(result).toBeDefined();
      expect(result!.style).toEqual({});
    });

    it('calls unregister on unmount', () => {
      const unregisterSpy = jest.fn();
      const registerSpy = jest.fn(() => 90);

      // Use a custom provider to spy on register/unregister
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { ElevationContext } = require('./elevation_context');

      const component = mount(
        <ElevationContext.Provider
          value={{ register: registerSpy, unregister: unregisterSpy }}>
          <TestConsumer onResult={() => {}} />
        </ElevationContext.Provider>
      );

      expect(registerSpy).toHaveBeenCalledTimes(1);
      expect(unregisterSpy).not.toHaveBeenCalled();

      component.unmount();

      expect(unregisterSpy).toHaveBeenCalledTimes(1);
      expect(unregisterSpy).toHaveBeenCalledWith(90);
    });
  });

  describe('outside OuiElevationProvider', () => {
    it('returns empty style and emits console.warn', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      let result: ReturnType<typeof useElevation> | undefined;

      mount(<TestConsumer onResult={(r) => (result = r)} />);

      expect(result).toBeDefined();
      expect(result!.style).toEqual({});
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('No ElevationProvider found')
      );

      warnSpy.mockRestore();
    });
  });
});

describe('OuiElevationProvider', () => {
  it('renders children', () => {
    const component = mount(
      <OuiElevationProvider>
        <div id="test-child">Hello</div>
      </OuiElevationProvider>
    );

    expect(component.find('#test-child').text()).toBe('Hello');
  });
});
