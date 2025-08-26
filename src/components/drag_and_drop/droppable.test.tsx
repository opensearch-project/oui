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
import { render } from '@testing-library/react';
import { resetServerContext } from 'react-beautiful-dnd';

import { requiredProps } from '../../test/required_props';

import { OuiDragDropContext, OuiDroppable } from './';
import { OuiDroppableContext } from './droppable';

// Mock react-beautiful-dnd to avoid portal issues in tests
jest.mock('react-beautiful-dnd', () => {
  const originalModule = jest.requireActual('react-beautiful-dnd');
  return {
    ...originalModule,
    Droppable: ({ children, droppableId }: any) => {
      const provided = {
        droppableProps: {
          'data-rbd-droppable-id': droppableId,
          'data-rbd-droppable-context-id': 'test',
        },
        innerRef: () => {},
        placeholder: <div className="placeholder" />,
      };
      const snapshot = {
        isDraggingOver: false,
        draggingOverWith: null,
        draggingFromThisWith: null,
        isUsingPlaceholder: false,
      };
      return children(provided, snapshot);
    },
    DragDropContext: ({ children }: any) => children,
  };
});

describe('OuiDroppable', () => {
  afterEach(() => {
    resetServerContext();
  });

  test('is rendered', () => {
    const handler = jest.fn();
    const { container } = render(
      <OuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <OuiDroppable droppableId="testDroppable">{() => <div />}</OuiDroppable>
      </OuiDragDropContext>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can be given ReactElement children', () => {
    const handler = jest.fn();
    const { container } = render(
      <OuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <OuiDroppable droppableId="testDroppable">
          <div />
        </OuiDroppable>
      </OuiDragDropContext>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can be given multiple ReactElement children', () => {
    const handler = jest.fn();
    const { container } = render(
      <OuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <OuiDroppable droppableId="testDroppable">
          <div />
          <div />
          <div />
        </OuiDroppable>
      </OuiDragDropContext>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('custom behavior', () => {
    describe('cloneDraggables', () => {
      test('sets `cloneItems` on proprietary context', () => {
        const handler = jest.fn();
        const { getByTestId } = render(
          <OuiDragDropContext onDragEnd={handler} {...requiredProps}>
            <OuiDroppable droppableId="testDroppable" cloneDraggables={true}>
              <OuiDroppableContext.Consumer>
                {({ cloneItems }) => (
                  <div data-test-subj="child">
                    {cloneItems ? 'true' : 'false'}
                  </div>
                )}
              </OuiDroppableContext.Consumer>
            </OuiDroppable>
          </OuiDragDropContext>
        );

        expect(getByTestId('child')).toHaveTextContent('true');
      });

      test('sets `isDropDisabled`', () => {
        const handler = jest.fn();
        const { container } = render(
          <OuiDragDropContext onDragEnd={handler} {...requiredProps}>
            <OuiDroppable droppableId="testDroppable" cloneDraggables={true}>
              <OuiDroppableContext.Consumer>
                {({ cloneItems }) => (
                  <div data-test-subj="child">
                    {cloneItems ? 'true' : 'false'}
                  </div>
                )}
              </OuiDroppableContext.Consumer>
            </OuiDroppable>
          </OuiDragDropContext>
        );

        expect(
          container.querySelector('.ouiDroppable--isDisabled')
        ).toBeInTheDocument();
      });
    });
  });
});
