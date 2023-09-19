/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { FC } from 'react';
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

  it('should console custom warning', () => {
    console.warn = jest.fn();

    const ExampleComponent = () => <div id="example-component" />;
    ExampleComponent.displayName = 'Example';

    const Example = deprecatedComponentWarning({
      getMessage: (componentName) => `Custom message for \`${componentName}\`.`,
    })(ExampleComponent);

    const component = mount(<Example />);
    component.setProps({ name: 'new' });

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      '[DEPRECATED] Custom message for `Example`.'
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
  interface IExampleComponent {
    name?: string;
    age?: number;
    version?: string;
    getMessage?: (propName: string) => string;
  }

  const ExampleDefaultMessageComponent: FC<IExampleComponent> = ({
    name,
    age,
    version,
  }) => {
    useDeprecatedPropWarning({ props: { name, age }, version });

    return <div />;
  };

  const ExampleCustomMessageComponent: FC<IExampleComponent> = ({
    name,
    age,
    getMessage,
  }) => {
    useDeprecatedPropWarning({ props: { name, age }, getMessage });

    return <div />;
  };

  it('should console 1 warning without repetition', () => {
    console.warn = jest.fn();

    const component = mount(<ExampleDefaultMessageComponent name="name" />);
    component.setProps({ name: 'new name' });

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      '[DEPRECATED] The `name` prop is deprecated and will be removed.'
    );
  });

  it('should console 2 warning without repetition', () => {
    console.warn = jest.fn();

    const component = mount(
      <ExampleDefaultMessageComponent name="name" age={21} />
    );
    component.setProps({ name: 'new name', age: 22 });

    const results = [
      '[DEPRECATED] The `name` prop is deprecated and will be removed.',
      '[DEPRECATED] The `age` prop is deprecated and will be removed.',
    ];

    expect(console.warn).toHaveBeenCalledTimes(2);
    results.forEach((item) => expect(console.warn).toHaveBeenCalledWith(item));
  });

  it('should console warning with version', () => {
    console.warn = jest.fn();

    mount(<ExampleDefaultMessageComponent name="name" version="2.0.0" />);

    expect(console.warn).toHaveBeenCalledWith(
      '[DEPRECATED] The `name` prop is deprecated and will be removed in v2.0.0.'
    );
  });

  it('should console warning with custom message', () => {
    console.warn = jest.fn();

    mount(
      <ExampleCustomMessageComponent
        name="name"
        getMessage={(propName: string) => `Custom message: \`${propName}\`.`}
      />
    );

    expect(console.warn).toHaveBeenCalledWith(
      '[DEPRECATED] Custom message: `name`.'
    );
  });

  it('should not console warning', () => {
    console.warn = jest.fn();

    mount(<ExampleDefaultMessageComponent />);

    expect(console.warn).not.toHaveBeenCalled();
  });
});
