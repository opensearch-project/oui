/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { mount, render } from 'enzyme';
import { deprecated, getDeprecatedMessage } from './deprecated';

describe('deprecated', () => {
  const warning = 'This component is deprecated in favor of another.';

  it('should console warning', () => {
    console.warn = jest.fn();

    const Component = () => <div />;
    const DeprecatedComponent = deprecated(warning)(Component);
    mount(<DeprecatedComponent />);

    expect(console.warn).toHaveBeenCalledWith(getDeprecatedMessage(warning));
  });

  it('should render component', () => {
    console.warn = jest.fn();

    const Component = () => <div />;
    const DeprecatedComponent = deprecated(warning)(Component);

    const component = render(<DeprecatedComponent />);
    expect(component).toMatchSnapshot();
  });

  it('should properly name DeprecatedWrapper function', () => {
    const Component = () => <div />;
    const DeprecatedComponent = deprecated(warning)(Component);

    expect(DeprecatedComponent.name).toEqual('Component');
  });
});
