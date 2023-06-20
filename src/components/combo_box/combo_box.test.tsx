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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { ReactNode } from 'react';
import { shallow, render, mount } from 'enzyme';
import {
  requiredProps,
  findTestSubject,
  takeMountedSnapshot,
} from '../../test';
import { comboBoxKeys } from '../../services';

import { OuiComboBox, OuiComboBoxProps } from './combo_box';

jest.mock('../portal', () => ({
  OuiPortal: ({ children }: { children: ReactNode }) => children,
}));

interface TitanOption {
  'data-test-subj'?: 'titanOption';
  label: string;
}
const options: TitanOption[] = [
  {
    'data-test-subj': 'titanOption',
    label: 'Titan',
  },
  {
    label: 'Enceladus',
  },
  {
    label: 'Mimas',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Iapetus',
  },
  {
    label: 'Phoebe',
  },
  {
    label: 'Rhea',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
  {
    label: 'Tethys',
  },
  {
    label: 'Hyperion',
  },
];

describe('OuiComboBox', () => {
  test('is rendered', () => {
    const component = render(<OuiComboBox {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

describe('props', () => {
  test('options list is rendered', () => {
    const component = mount(
      <OuiComboBox
        options={options}
        data-test-subj="alsoGetsAppliedToOptionsList"
      />
    );

    component.setState({ isListOpen: true });
    expect(takeMountedSnapshot(component)).toMatchSnapshot();
  });

  test('selectedOptions are rendered', () => {
    const component = shallow(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2], options[4]]}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('isClearable=false disallows user from clearing input', () => {
    test('when no options are selected', () => {
      const component = shallow(
        <OuiComboBox options={options} isClearable={false} />
      );

      expect(component).toMatchSnapshot();
    });

    test('when options are selected', () => {
      const component = shallow(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2], options[4]]}
          isClearable={false}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('singleSelection', () => {
    test('is rendered', () => {
      const component = shallow(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          singleSelection={true}
        />
      );

      expect(component).toMatchSnapshot();
    });
    test('selects existing option when opened', () => {
      const component = shallow(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          singleSelection={true}
        />
      );

      component.setState({ isListOpen: true });
      expect(component).toMatchSnapshot();
    });
    test('prepend and append is rendered', () => {
      const component = shallow(
        <OuiComboBox
          options={options}
          singleSelection={true}
          prepend="String"
          append="String"
        />
      );

      component.setState({ isListOpen: true });
      expect(component).toMatchSnapshot();
    });
  });

  test('isDisabled is rendered', () => {
    const component = shallow(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2]]}
        isDisabled={true}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('full width is rendered', () => {
    const component = shallow(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2]]}
        fullWidth={true}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('delimiter is rendered', () => {
    const component = shallow(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2], options[3]]}
        delimiter=","
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('autoFocus is rendered', () => {
    const component = shallow(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2], options[3]]}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('icon is rendered', () => {
    const component = mount(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2]]}
        icon={true}
      />
    );

    expect(component).toMatchSnapshot();

    const icon = findTestSubject(component, 'comboBoxIcon');
    expect(icon).toBeDefined();
    expect(icon.render().attr('data-ouiicon-type')).toBe('search');
  });

  test('custom icon is rendered', () => {
    const component = mount(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2]]}
        icon={'menu'}
      />
    );

    expect(component).toMatchSnapshot();

    const icon = findTestSubject(component, 'comboBoxIcon');
    expect(icon).toBeDefined();
    expect(icon.render().attr('data-ouiicon-type')).toBe('menu');
  });
});

test('does not show multiple checkmarks with duplicate labels', () => {
  const options = [
    {
      label: 'Titan',
      key: 'titan1',
    },
    {
      label: 'Titan',
      key: 'titan2',
    },
    {
      label: 'Tethys',
    },
  ];
  const component = mount(
    <OuiComboBox
      singleSelection={{ asPlainText: true }}
      options={options}
      selectedOptions={[options[1]]}
    />
  );

  const searchInput = findTestSubject(component, 'comboBoxSearchInput');
  searchInput.simulate('focus');

  expect(component.find('OuiFilterSelectItem[checked="on"]').length).toBe(1);
});

describe('behavior', () => {
  describe('hitting "Enter"', () => {
    test('calls the onCreateOption callback when there is input', () => {
      const onCreateOptionHandler = jest.fn();

      const component = mount(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          onCreateOption={onCreateOptionHandler}
        />
      );

      component.setState({ searchValue: 'foo' });
      const searchInput = findTestSubject(component, 'comboBoxSearchInput');
      searchInput.simulate('focus');
      searchInput.simulate('keyDown', { key: comboBoxKeys.ENTER });
      expect(onCreateOptionHandler).toHaveBeenCalledTimes(1);
      expect(onCreateOptionHandler).toHaveBeenNthCalledWith(1, 'foo', options);
    });

    test("doesn't the onCreateOption callback when there is no input", () => {
      const onCreateOptionHandler = jest.fn();

      const component = mount(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          onCreateOption={onCreateOptionHandler}
        />
      );

      const searchInput = findTestSubject(component, 'comboBoxSearchInput');
      searchInput.simulate('focus');
      searchInput.simulate('keyDown', { key: comboBoxKeys.ENTER });
      expect(onCreateOptionHandler).not.toHaveBeenCalled();
    });
  });

  describe('tabbing', () => {
    test("off the search input closes the options list if the user isn't navigating the options", () => {
      const onKeyDownWrapper = jest.fn();
      const component = mount(
        <div onKeyDown={onKeyDownWrapper}>
          <OuiComboBox options={options} selectedOptions={[options[2]]} />
        </div>
      );

      const searchInput = findTestSubject(component, 'comboBoxSearchInput');
      searchInput.simulate('focus');

      // Focusing the input should open the options list.
      expect(findTestSubject(component, 'comboBoxOptionsList')).toBeDefined();

      // Tab backwards to take focus off the combo box.
      searchInput.simulate('keyDown', {
        key: comboBoxKeys.TAB,
        shiftKey: true,
      });

      // If the TAB keydown propagated to the wrapper, then a browser DOM would shift the focus
      expect(onKeyDownWrapper).toHaveBeenCalledTimes(1);
    });

    test('off the search input calls onCreateOption', () => {
      const onCreateOptionHandler = jest.fn();

      const component = mount(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          onCreateOption={onCreateOptionHandler}
        />
      );

      component.setState({ searchValue: 'foo' });
      const searchInput = findTestSubject(component, 'comboBoxSearchInput');
      searchInput.simulate('focus');

      const searchInputNode = searchInput.getDOMNode();
      // React doesn't support `focusout` so we have to manually trigger it
      searchInputNode.dispatchEvent(
        new FocusEvent('focusout', { bubbles: true })
      );

      expect(onCreateOptionHandler).toHaveBeenCalledTimes(1);
      expect(onCreateOptionHandler).toHaveBeenNthCalledWith(1, 'foo', options);
    });

    test('off the search input does nothing if the user is navigating the options', () => {
      const onKeyDownWrapper = jest.fn();
      const component = mount(
        <div onKeyDown={onKeyDownWrapper}>
          <OuiComboBox options={options} selectedOptions={[options[2]]} />
        </div>
      );

      const searchInput = findTestSubject(component, 'comboBoxSearchInput');
      searchInput.simulate('focus');

      // Focusing the input should open the options list.
      expect(findTestSubject(component, 'comboBoxOptionsList')).toBeDefined();

      // Navigate to an option.
      searchInput.simulate('keyDown', { key: comboBoxKeys.ARROW_DOWN });

      // Tab backwards to take focus off the combo box.
      searchInput.simulate('keyDown', {
        key: comboBoxKeys.TAB,
        shiftKey: true,
      });

      // If the TAB keydown did not bubble to the wrapper, then the tab event was prevented
      expect(onKeyDownWrapper.mock.calls.length).toBe(0);
    });
  });

  describe('clear button', () => {
    test('calls onChange callback with empty array', () => {
      const onChangeHandler = jest.fn();
      const component = mount(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          onChange={onChangeHandler}
        />
      );

      findTestSubject(component, 'comboBoxClearButton').simulate('click');
      expect(onChangeHandler).toHaveBeenCalledTimes(1);
      expect(onChangeHandler).toHaveBeenNthCalledWith(1, []);
    });

    test('focuses the input', () => {
      const component = mount(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          onChange={() => {}}
        />
      );

      findTestSubject(component, 'comboBoxClearButton').simulate('click');
      expect(
        findTestSubject(component, 'comboBoxSearchInput').getDOMNode()
      ).toBe(document.activeElement);
    });
  });

  describe('sortMatchesBy', () => {
    const sortMatchesByOptions = [
      {
        label: 'Something is Disabled',
      },
      ...options,
    ];
    test('options "none"', () => {
      const component = mount<
        OuiComboBox<TitanOption>,
        OuiComboBoxProps<TitanOption>,
        { matchingOptions: TitanOption[] }
      >(<OuiComboBox options={sortMatchesByOptions} sortMatchesBy="none" />);

      findTestSubject(component, 'comboBoxSearchInput').simulate('change', {
        target: { value: 'di' },
      });

      expect(component.state('matchingOptions')[0].label).toBe(
        'Something is Disabled'
      );
    });

    test('options "startsWith"', () => {
      const component = mount<
        OuiComboBox<TitanOption>,
        OuiComboBoxProps<TitanOption>,
        { matchingOptions: TitanOption[] }
      >(
        <OuiComboBox
          options={sortMatchesByOptions}
          sortMatchesBy="startsWith"
        />
      );

      findTestSubject(component, 'comboBoxSearchInput').simulate('change', {
        target: { value: 'di' },
      });

      expect(component.state('matchingOptions')[0].label).toBe('Dione');
    });
  });

  it('calls the inputRef prop with the input element', () => {
    const inputRefCallback = jest.fn();

    const component = mount<
      OuiComboBox<TitanOption>,
      OuiComboBoxProps<TitanOption>,
      { matchingOptions: TitanOption[] }
    >(<OuiComboBox options={options} inputRef={inputRefCallback} />);

    expect(inputRefCallback).toHaveBeenCalledTimes(1);
    expect(component.find('input[role="textbox"]').getDOMNode()).toBe(
      inputRefCallback.mock.calls[0][0]
    );
  });
});
