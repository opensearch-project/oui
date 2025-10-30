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
import { OuiDragDropContext, OuiDraggable, OuiDroppable } from './';

// Mock react-beautiful-dnd to avoid portal issues in tests
jest.mock('react-beautiful-dnd', () => {
  const originalModule = jest.requireActual('react-beautiful-dnd');
  return {
    ...originalModule,
    Draggable: ({ children, draggableId, index }: any) => {
      const provided = {
        draggableProps: {
          'data-rbd-draggable-context-id': 'test',
          'data-rbd-draggable-id': draggableId,
        },
        dragHandleProps: {
          'data-rbd-drag-handle-draggable-id': draggableId,
          'data-rbd-drag-handle-context-id': 'test',
          'aria-describedby': 'rbd-hidden-text-test-hidden',
          role: 'button',
          tabIndex: 0,
        },
        innerRef: () => {},
      };
      const snapshot = {
        isDragging: false,
        isDropAnimating: false,
        dropAnimation: null,
        draggingOver: null,
        combineWith: null,
        combineTargetFor: null,
        mode: null,
      };
      const rubric = {
        draggableId,
        type: 'OUI_DEFAULT',
        source: { index, droppableId: 'testDroppable' },
      };
      return children(provided, snapshot, rubric);
    },
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

describe('OuiDraggable', () => {
  beforeEach(() => {
    resetServerContext(); // resets react-beautiful-dnd's internal instance counter which affects snapshots
  });

  test('is rendered', () => {
    const handler = jest.fn();

    const { container } = render(
      <OuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <OuiDroppable droppableId="testDroppable">
          <OuiDraggable draggableId="testDraggable" index={0}>
            {() => <div>Hello</div>}
          </OuiDraggable>
        </OuiDroppable>
      </OuiDragDropContext>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('can be given ReactElement children', () => {
    const handler = jest.fn();

    const { container } = render(
      <OuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <OuiDroppable droppableId="testDroppable">
          <OuiDraggable draggableId="testDraggable" index={0}>
            <div>Hello</div>
          </OuiDraggable>
        </OuiDroppable>
      </OuiDragDropContext>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
