/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { mount, render } from 'enzyme';
import {
  deprecatedComponentWarning,
  useDeprecatedPropWarning,
} from './deprecated';

describe('deprecatedComponentWarning', () => {
  it('should console warning', () => {
    console.warn = jest.fn();

    const NewComponent = () => <div id="new-component" />;
    const ExampleComponent = () => <div id="example-component" />;
    ExampleComponent.displayName = 'Example';

    const Example = deprecatedComponentWarning({
      NewComponent,
      version: '2.0.0',
    })(ExampleComponent);

    mount(<Example />);

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      '[DEPRECATED] Example is deprecated in favor of NewComponent and will be removed in v2.0.0.'
    );
  });

  it('should render wrapped component', () => {
    console.warn = jest.fn();

    const NewComponent = () => <div id="new-component" />;
    const ExampleComponent = () => <div id="example-component" />;
    ExampleComponent.displayName = 'Example';

    const Example = deprecatedComponentWarning({
      NewComponent,
      version: '2.0.0',
    })(ExampleComponent);

    const component = render(<Example />);
    expect(component).toMatchSnapshot();
  });

  it('should properly name DeprecatedWrapper function', () => {
    const NewComponent = () => <div id="new-component" />;
    const ExampleComponent = () => <div id="example-component" />;
    ExampleComponent.displayName = 'Example';

    const Example = deprecatedComponentWarning({
      NewComponent,
      version: '2.0.0',
    })(ExampleComponent);

    expect(Example.name).toEqual('Example');
  });
});

describe('useDeprecatedPropWarning', () => {
  const ExampleComponent = ({ name }: { name?: string }) => {
    useDeprecatedPropWarning({
      deprecatedProp: name,
      deprecatedPropName: 'name',
      version: '2.0.0',
    });

    return <div>{name}</div>;
  };

  it('should console warning', () => {
    console.warn = jest.fn();

    mount(<ExampleComponent name="name" />);

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      '[DEPRECATED] The `name` prop is deprecated and will be removed in v2.0.0'
    );
  });

  it('should not console warning', () => {
    console.warn = jest.fn();

    mount(<ExampleComponent />);

    expect(console.warn).not.toHaveBeenCalled();
  });
});
