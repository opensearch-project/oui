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
import { render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { requiredProps } from '../../test';
import { comboBoxKeys } from '../../services';

import { OuiComboBox } from './combo_box';

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
    const { container } = render(<OuiComboBox {...requiredProps} />);

    expect(container).toMatchSnapshot();
  });
});

describe('props', () => {
  test('options list is rendered', () => {
    const { container } = render(
      <OuiComboBox
        options={options}
        data-test-subj="alsoGetsAppliedToOptionsList"
      />
    );

    // Simulate opening the list by focusing the input
    const searchInput = container.querySelector(
      '[data-test-subj="comboBoxSearchInput"]'
    ) as HTMLInputElement;
    fireEvent.focus(searchInput);

    expect(container).toMatchSnapshot();
  });

  test('selectedOptions are rendered', () => {
    const { container } = render(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2], options[4]]}
      />
    );

    expect(container).toMatchSnapshot();
  });

  describe('isClearable=false disallows user from clearing input', () => {
    test('when no options are selected', () => {
      const { container } = render(
        <OuiComboBox options={options} isClearable={false} />
      );

      expect(container).toMatchSnapshot();
    });

    test('when options are selected', () => {
      const { container } = render(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2], options[4]]}
          isClearable={false}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('singleSelection', () => {
    test('is rendered', () => {
      const { container } = render(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          singleSelection={true}
        />
      );

      expect(container).toMatchSnapshot();
    });
    test('selects existing option when opened', () => {
      const { container } = render(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          singleSelection={true}
        />
      );

      // Open the list by focusing the input
      const searchInput = container.querySelector(
        '[data-test-subj="comboBoxSearchInput"]'
      ) as HTMLInputElement;
      fireEvent.focus(searchInput);

      expect(container).toMatchSnapshot();
    });
    test('prepend and append is rendered', () => {
      const { container } = render(
        <OuiComboBox
          options={options}
          singleSelection={true}
          prepend="String"
          append="String"
        />
      );

      // Open the list by focusing the input
      const searchInput = container.querySelector(
        '[data-test-subj="comboBoxSearchInput"]'
      ) as HTMLInputElement;
      fireEvent.focus(searchInput);

      expect(container).toMatchSnapshot();
    });
  });

  test('isDisabled is rendered', () => {
    const { container } = render(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2]]}
        isDisabled={true}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('full width is rendered', () => {
    const { container } = render(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2]]}
        fullWidth={true}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('delimiter is rendered', () => {
    const { container } = render(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2], options[3]]}
        delimiter=","
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('autoFocus is rendered', () => {
    const { container } = render(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2], options[3]]}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('icon is rendered', () => {
    const { container } = render(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2]]}
        icon={true}
      />
    );

    expect(container).toMatchSnapshot();

    const icon = container.querySelector('[data-test-subj="comboBoxIcon"]');
    expect(icon).toBeDefined();
    expect(icon?.getAttribute('data-ouiicon-type')).toBe('search');
  });

  test('custom icon is rendered', () => {
    const { container } = render(
      <OuiComboBox
        options={options}
        selectedOptions={[options[2]]}
        icon={'menu'}
      />
    );

    expect(container).toMatchSnapshot();

    const icon = container.querySelector('[data-test-subj="comboBoxIcon"]');
    expect(icon).toBeDefined();
    expect(icon?.getAttribute('data-ouiicon-type')).toBe('menu');
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
  const { container } = render(
    <OuiComboBox
      singleSelection={{ asPlainText: true }}
      options={options}
      selectedOptions={[options[1]]}
    />
  );

  const searchInput = container.querySelector(
    '[data-test-subj="comboBoxSearchInput"]'
  ) as HTMLInputElement;
  fireEvent.focus(searchInput);

  // Wait for the options list to render
  const checkedItems = container.querySelectorAll(
    '.ouiFilterSelectItem [data-ouiicon-type="check"]'
  );
  expect(checkedItems.length).toBe(1);
});

describe('behavior', () => {
  describe('hitting "Enter"', () => {
    test('calls the onCreateOption callback when there is input', async () => {
      const onCreateOptionHandler = jest.fn();

      const { container } = render(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          onCreateOption={onCreateOptionHandler}
        />
      );

      const searchInput = container.querySelector(
        '[data-test-subj="comboBoxSearchInput"]'
      ) as HTMLInputElement;

      // Set search value and focus
      fireEvent.change(searchInput, { target: { value: 'foo' } });
      fireEvent.focus(searchInput);
      fireEvent.keyDown(searchInput, { key: comboBoxKeys.ENTER });

      expect(onCreateOptionHandler).toHaveBeenCalledTimes(1);
      expect(onCreateOptionHandler).toHaveBeenNthCalledWith(1, 'foo', options);
    });

    test("doesn't the onCreateOption callback when there is no input", () => {
      const onCreateOptionHandler = jest.fn();

      const { container } = render(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          onCreateOption={onCreateOptionHandler}
        />
      );

      const searchInput = container.querySelector(
        '[data-test-subj="comboBoxSearchInput"]'
      ) as HTMLInputElement;
      fireEvent.focus(searchInput);
      fireEvent.keyDown(searchInput, { key: comboBoxKeys.ENTER });
      expect(onCreateOptionHandler).not.toHaveBeenCalled();
    });
  });

  describe('tabbing', () => {
    test("off the search input closes the options list if the user isn't navigating the options", () => {
      const onKeyDownWrapper = jest.fn();
      const { container } = render(
        <div onKeyDown={onKeyDownWrapper}>
          <OuiComboBox options={options} selectedOptions={[options[2]]} />
        </div>
      );

      const searchInput = container.querySelector(
        '[data-test-subj="comboBoxSearchInput"]'
      ) as HTMLInputElement;
      fireEvent.focus(searchInput);

      // Focusing the input should open the options list.
      expect(
        container.querySelector('[data-test-subj="comboBoxOptionsList"]')
      ).toBeDefined();

      // Tab backwards to take focus off the combo box.
      fireEvent.keyDown(searchInput, {
        key: comboBoxKeys.TAB,
        shiftKey: true,
      });

      // If the TAB keydown propagated to the wrapper, then a browser DOM would shift the focus
      expect(onKeyDownWrapper).toHaveBeenCalledTimes(1);
    });

    test('off the search input calls onCreateOption', () => {
      const onCreateOptionHandler = jest.fn();

      const { container } = render(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          onCreateOption={onCreateOptionHandler}
        />
      );

      const searchInput = container.querySelector(
        '[data-test-subj="comboBoxSearchInput"]'
      ) as HTMLInputElement;

      // Set search value and focus
      fireEvent.change(searchInput, { target: { value: 'foo' } });
      fireEvent.focus(searchInput);

      // React doesn't support `focusout` so we have to manually trigger it
      fireEvent.focusOut(searchInput);

      expect(onCreateOptionHandler).toHaveBeenCalledTimes(1);
      expect(onCreateOptionHandler).toHaveBeenNthCalledWith(1, 'foo', options);
    });

    test('off the search input does nothing if the user is navigating the options', () => {
      const onKeyDownWrapper = jest.fn();
      const { container } = render(
        <div onKeyDown={onKeyDownWrapper}>
          <OuiComboBox options={options} selectedOptions={[options[2]]} />
        </div>
      );

      const searchInput = container.querySelector(
        '[data-test-subj="comboBoxSearchInput"]'
      ) as HTMLInputElement;
      fireEvent.focus(searchInput);

      // Focusing the input should open the options list.
      expect(
        container.querySelector('[data-test-subj="comboBoxOptionsList"]')
      ).toBeDefined();

      // Navigate to an option.
      fireEvent.keyDown(searchInput, { key: comboBoxKeys.ARROW_DOWN });

      // Tab backwards to take focus off the combo box.
      fireEvent.keyDown(searchInput, {
        key: comboBoxKeys.TAB,
        shiftKey: true,
      });

      // If the TAB keydown did not bubble to the wrapper, then the tab event was prevented
      expect(onKeyDownWrapper.mock.calls.length).toBe(0);
    });
  });

  describe('clear button', () => {
    test('calls onChange callback with empty array', async () => {
      const onChangeHandler = jest.fn();
      const { container } = render(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          onChange={onChangeHandler}
        />
      );

      const user = userEvent.setup();
      const clearButton = container.querySelector(
        '[data-test-subj="comboBoxClearButton"]'
      ) as HTMLElement;
      await act(async () => {
        await user.click(clearButton);
      });

      expect(onChangeHandler).toHaveBeenCalledTimes(1);
      expect(onChangeHandler).toHaveBeenNthCalledWith(1, []);
    });

    test('focuses the input', async () => {
      const { container } = render(
        <OuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          onChange={() => {}}
        />
      );

      const user = userEvent.setup();
      const clearButton = container.querySelector(
        '[data-test-subj="comboBoxClearButton"]'
      ) as HTMLElement;
      await act(async () => {
        await user.click(clearButton);
      });

      const searchInput = container.querySelector(
        '[data-test-subj="comboBoxSearchInput"]'
      ) as HTMLInputElement;
      expect(document.activeElement).toBe(searchInput);
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
      const { container } = render(
        <OuiComboBox options={sortMatchesByOptions} sortMatchesBy="none" />
      );

      const searchInput = container.querySelector(
        '[data-test-subj="comboBoxSearchInput"]'
      ) as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'di' } });

      // Check the first matching option in the list
      const firstOption = container.querySelector(
        '[data-test-subj^="comboBoxOptionsList"] .ouiFilterSelectItem'
      );
      expect(firstOption?.textContent).toBe('Something is Disabled');
    });

    test('options "startsWith"', () => {
      const { container } = render(
        <OuiComboBox
          options={sortMatchesByOptions}
          sortMatchesBy="startsWith"
        />
      );

      const searchInput = container.querySelector(
        '[data-test-subj="comboBoxSearchInput"]'
      ) as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'di' } });

      // Check the first matching option in the list
      const firstOption = container.querySelector(
        '[data-test-subj^="comboBoxOptionsList"] .ouiFilterSelectItem'
      );
      expect(firstOption?.textContent).toBe('Dione');
    });
  });

  it('calls the inputRef prop with the input element', () => {
    const inputRefCallback = jest.fn();

    const { container } = render(
      <OuiComboBox options={options} inputRef={inputRefCallback} />
    );

    expect(inputRefCallback).toHaveBeenCalledTimes(1);
    const textboxInput = container.querySelector(
      'input[role="textbox"]'
    ) as HTMLInputElement;
    expect(textboxInput).toBe(inputRefCallback.mock.calls[0][0]);
  });
});
