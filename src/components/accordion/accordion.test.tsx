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

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { OuiAccordion } from './accordion';

let id = 0;
const getId = () => `${id++}`;

describe('OuiAccordion', () => {
  test('is rendered', () => {
    const component = render(<OuiAccordion id={getId()} {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('buttonContentClassName', () => {
      it('is rendered', () => {
        const component = render(
          <OuiAccordion
            id={getId()}
            buttonContentClassName="button content class name"
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('buttonContent', () => {
      it('is rendered', () => {
        const component = render(
          <OuiAccordion
            id={getId()}
            buttonContent={<div>Button content</div>}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('buttonProps', () => {
      it('is rendered', () => {
        const component = render(
          <OuiAccordion id={getId()} buttonProps={requiredProps} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('extraAction', () => {
      it('is rendered', () => {
        const component = render(
          <OuiAccordion
            id={getId()}
            extraAction={<button>Extra action</button>}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('initialIsOpen', () => {
      it('is rendered', () => {
        const component = render(
          <OuiAccordion id={getId()} initialIsOpen={true}>
            <p>You can see me.</p>
          </OuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('arrowDisplay', () => {
      it('right is rendered', () => {
        const component = render(
          <OuiAccordion id={getId()} arrowDisplay="right">
            <p>You can see me.</p>
          </OuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });

      it('none is rendered', () => {
        const component = render(
          <OuiAccordion id={getId()} arrowDisplay="none">
            <p>You can see me.</p>
          </OuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('forceState', () => {
      it('is rendered', () => {
        const component = render(
          <OuiAccordion id={getId()} forceState="closed">
            <p>You can not see me</p>
          </OuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });

      it('accepts and calls an optional callback on click', () => {
        const onToggleHandler = jest.fn();
        const component = mount(
          <OuiAccordion
            id={getId()}
            onToggle={onToggleHandler}
            forceState="closed"
          />
        );

        component.find('button').simulate('click');
        expect(onToggleHandler).toBeCalled();
        expect(onToggleHandler).toBeCalledWith(true);
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const component = render(
          <OuiAccordion id={getId()} isLoading>
            <p>You can see me.</p>
          </OuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isLoadingMessage', () => {
      it('is rendered', () => {
        const component = render(
          <OuiAccordion id={getId()} isLoadingMessage="Please wait" isLoading>
            <p>You can&apos;t see me.</p>
          </OuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('behavior', () => {
    it('opens when clicked once', () => {
      const component = mount(<OuiAccordion id={getId()} />);

      component.find('button').simulate('click');

      expect(component).toMatchSnapshot();
    });

    it('closes when clicked twice', () => {
      const component = mount(<OuiAccordion id={getId()} />);

      component.find('button').simulate('click');
      component.find('button').simulate('click');

      expect(component).toMatchSnapshot();
    });

    it('accepts and calls an optional callback on open and close', () => {
      const onToggleHandler = jest.fn();
      const component = mount(
        <OuiAccordion id={getId()} onToggle={onToggleHandler} />
      );

      component.find('button').simulate('click');
      expect(onToggleHandler).toBeCalled();
      expect(onToggleHandler).toBeCalledWith(true);

      component.find('button').simulate('click');
      expect(onToggleHandler).toBeCalled();
      expect(onToggleHandler).toBeCalledWith(false);
    });

    it('moves focus to the content when expanded', () => {
      const component = mount<OuiAccordion>(<OuiAccordion id={getId()} />);
      const accordionClass = component.instance();
      const childWrapper = accordionClass.childWrapper;

      expect(childWrapper).not.toBeFalsy();
      expect(childWrapper).not.toBe(document.activeElement);

      // click button
      component.find('button').simulate('click');

      expect(childWrapper).toBe(document.activeElement);
    });
  });
});
