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

import React, { useState } from 'react';
import {
  OuiDragDropContext,
  OuiFlexGroup,
  OuiFlexItem,
  OuiDraggable,
  OuiDroppable,
  OuiIcon,
  OuiPanel,
  ouiDragDropMove,
  ouiDragDropReorder,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const makeId = htmlIdGenerator();

const makeList = (number, start = 1) =>
  Array.from({ length: number }, (v, k) => k + start).map((el) => {
    return {
      content: `Item ${el}`,
      id: makeId(),
    };
  });

export default () => {
  const [list1, setList1] = useState(makeList(3));
  const [list2, setList2] = useState(makeList(3, 4));
  const onDragEnd = ({ source, destination }) => {
    const lists = { DROPPABLE_AREA_1: list1, DROPPABLE_AREA_2: list2 };
    const actions = { DROPPABLE_AREA_1: setList1, DROPPABLE_AREA_2: setList2 };
    if (source && destination) {
      if (source.droppableId === destination.droppableId) {
        const items = ouiDragDropReorder(
          lists[destination.droppableId],
          source.index,
          destination.index
        );

        actions[destination.droppableId](items);
      } else {
        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;
        const result = ouiDragDropMove(
          lists[sourceId],
          lists[destinationId],
          source,
          destination
        );

        actions[sourceId](result[sourceId]);
        actions[destinationId](result[destinationId]);
      }
    }
  };
  return (
    <OuiDragDropContext onDragEnd={onDragEnd}>
      <OuiFlexGroup>
        <OuiFlexItem>
          <OuiDroppable
            droppableId="DROPPABLE_AREA_1"
            spacing="m"
            withPanel
            grow={false}>
            {list1.length > 0 ? (
              list1.map(({ content, id }, idx) => (
                <OuiDraggable spacing="m" key={id} index={idx} draggableId={id}>
                  {(provided, state) => (
                    <OuiPanel>
                      {content}
                      {state.isDragging && ' ✨'}
                    </OuiPanel>
                  )}
                </OuiDraggable>
              ))
            ) : (
              <OuiFlexGroup
                alignItems="center"
                justifyContent="spaceAround"
                gutterSize="none"
                style={{ height: '100%' }}>
                <OuiFlexItem grow={false}>
                  <OuiIcon type="faceSad" />
                </OuiFlexItem>
              </OuiFlexGroup>
            )}
          </OuiDroppable>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiDroppable
            droppableId="DROPPABLE_AREA_2"
            spacing="m"
            withPanel
            grow={false}>
            {list2.length > 0 ? (
              list2.map(({ content, id }, idx) => (
                <OuiDraggable spacing="m" key={id} index={idx} draggableId={id}>
                  {(provided, state) => (
                    <OuiPanel>
                      {content}
                      {state.isDragging && ' ✨'}
                    </OuiPanel>
                  )}
                </OuiDraggable>
              ))
            ) : (
              <OuiFlexGroup
                alignItems="center"
                justifyContent="spaceAround"
                gutterSize="none"
                style={{ height: '100%' }}>
                <OuiFlexItem grow={false}>
                  <OuiIcon type="faceSad" />
                </OuiFlexItem>
              </OuiFlexGroup>
            )}
          </OuiDroppable>
        </OuiFlexItem>
      </OuiFlexGroup>
    </OuiDragDropContext>
  );
};
