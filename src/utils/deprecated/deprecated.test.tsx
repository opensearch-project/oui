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

    const ExampleComponent = () => <div id="example-component" />;
    ExampleComponent.displayName = 'Example';

    const Example = deprecatedComponentWarning({
      newComponentName: 'NewComponent',
      version: '2.0.0',
    })(ExampleComponent);

    const component = mount(<Example />);
    component.setProps({ name: 'new' });

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      '[DEPRECATED] Example is deprecated in favor of NewComponent and will be removed in v2.0.0.'
    );
  });

  it('should render wrapped component', () => {
    console.warn = jest.fn();

    const ExampleComponent = () => <div id="example-component" />;
    ExampleComponent.displayName = 'Example';

    const Example = deprecatedComponentWarning({
      newComponentName: 'New Component',
      version: '2.0.0',
    })(ExampleComponent);

    const component = render(<Example />);
    expect(component).toMatchSnapshot();
  });

  it('should properly name DeprecatedWrapper function', () => {
    const ExampleComponent = () => <div id="example-component" />;
    ExampleComponent.displayName = 'Example';

    const Example = deprecatedComponentWarning({
      newComponentName: 'New Component',
      version: '2.0.0',
    })(ExampleComponent);

    expect(Example.name).toEqual('Example');
  });
});

describe('useDeprecatedPropWarning', () => {
  const ExampleComponent = ({ name, age }: { name?: string; age?: number }) => {
    useDeprecatedPropWarning({
      props: { name, age },
      version: '2.0.0',
    });

    return (
      <div>
        {name} {age}
      </div>
    );
  };

  it('should console 1 warning without repetition', () => {
    console.warn = jest.fn();

    const component = mount(<ExampleComponent name="name" />);
    component.setProps({ name: 'new name' });

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      '[DEPRECATED] The `name` prop is deprecated and will be removed in v2.0.0'
    );
  });

  it('should console 2 warning without repetition', () => {
    console.warn = jest.fn();

    const component = mount(<ExampleComponent name="name" age={21} />);
    component.setProps({ name: 'new name', age: 22 });

    const results = [
      '[DEPRECATED] The `name` prop is deprecated and will be removed in v2.0.0',
      '[DEPRECATED] The `age` prop is deprecated and will be removed in v2.0.0',
    ];

    expect(console.warn).toHaveBeenCalledTimes(2);
    results.forEach((item) => expect(console.warn).toHaveBeenCalledWith(item));
  });

  it('should not console warning', () => {
    console.warn = jest.fn();

    mount(<ExampleComponent />);

    expect(console.warn).not.toHaveBeenCalled();
  });
});
