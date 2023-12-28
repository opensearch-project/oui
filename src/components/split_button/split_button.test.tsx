/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React from 'react';
import { mount, render } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';

import { OuiSplitButton } from './split_button';

jest.mock('../portal', () => ({
  OuiPortal: ({ children }: any) => children,
}));

const options = ['Option #1', 'Option #2'];

describe('OuiSplitButton', () => {
  test('is rendered', () => {
    const component = render(<OuiSplitButton {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const component = render(<OuiSplitButton {...requiredProps} fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('options are rendered when select is open', async () => {
      const component = mount(<OuiSplitButton options={options} isOpen />);

      expect(component.find('button[aria-selected="false"]')).toHaveLength(2);
      expect(takeMountedSnapshot(component)).toMatchSnapshot();
    });

    test('selectedItem 0 is rendered', async () => {
      const component = mount(
        <OuiSplitButton options={options} selectedIndex="0" isOpen />
      );

      expect(component).toMatchSnapshot();
      const selected = component.find('button[aria-selected="true"]');
      expect(selected).toHaveLength(1);
      expect(selected.text()).toEqual('Option #1');
    });

    test('selectedItem last is rendered', async () => {
      const component = mount(
        <OuiSplitButton
          options={[...options, 'Option #3']}
          selectedIndex="2"
          isOpen
        />
      );

      const selected = component.find('button[aria-selected="true"]');
      expect(selected).toHaveLength(1);
      expect(selected.text()).toEqual('Option #3');
      expect(component).toMatchSnapshot();
    });
  });

  test('selection list is opened on drop-down button click', async () => {
    const component = mount(
      <OuiSplitButton options={options} selectedIndex="1" />
    );

    expect(component.find('button.ouiSplitButton__item')).toHaveLength(0);

    component.find('button.ouiSplitButtonControl--dropdown').simulate('click');

    component.update();

    expect(component.find('button.ouiSplitButton__item')).toHaveLength(2);

    expect(component).toMatchSnapshot();
  });

  test('onClick is called on Primary button click', async () => {
    const onClick = jest.fn();
    const component = mount(
      <OuiSplitButton onClick={onClick}>Test</OuiSplitButton>
    );

    component.find('button.ouiSplitButtonControl--primary').simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  test('onChange is called when an option is selected', async () => {
    const onChange = jest.fn();
    const component = mount(
      <OuiSplitButton
        options={options}
        isOpen
        selectedIndex="1"
        onChange={onChange}
      />
    );
    expect(component).toMatchSnapshot();
    const selected = component.find('button[aria-selected="false"]');
    expect(selected).toHaveLength(1);
    selected.simulate('click');

    expect(onChange).toHaveBeenCalledWith(0);
  });
});
