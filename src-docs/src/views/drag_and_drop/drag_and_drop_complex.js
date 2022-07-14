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
  OuiDraggable,
  OuiDroppable,
  OuiButtonIcon,
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
  const [list, setList] = useState([1, 2]);
  const [list1, setList1] = useState(makeList(3));
  const [list2, setList2] = useState(makeList(3, 4));
  const lists = {
    COMPLEX_DROPPABLE_PARENT: list,
    COMPLEX_DROPPABLE_AREA_1: list1,
    COMPLEX_DROPPABLE_AREA_2: list2,
  };
  const actions = {
    COMPLEX_DROPPABLE_PARENT: setList,
    COMPLEX_DROPPABLE_AREA_1: setList1,
    COMPLEX_DROPPABLE_AREA_2: setList2,
  };
  const onDragEnd = ({ source, destination }) => {
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
      <OuiDroppable
        droppableId="COMPLEX_DROPPABLE_PARENT"
        type="MACRO"
        direction="horizontal"
        withPanel
        spacing="l"
        style={{ display: 'flex' }}>
        {list.map((did, didx) => (
          <OuiDraggable
            key={did}
            index={didx}
            draggableId={`COMPLEX_DRAGGABLE_${did}`}
            spacing="l"
            style={{ flex: '1 0 50%' }}
            disableInteractiveElementBlocking // Allows button to be drag handle
          >
            {(provided) => (
              <OuiPanel color="subdued" paddingSize="s">
                <OuiButtonIcon
                  iconType="grab"
                  aria-label="Drag Handle"
                  {...provided.dragHandleProps}
                />
                <OuiDroppable
                  droppableId={`COMPLEX_DROPPABLE_AREA_${did}`}
                  type="MICRO"
                  spacing="m"
                  style={{ flex: '1 0 50%' }}>
                  {lists[`COMPLEX_DROPPABLE_AREA_${did}`].map(
                    ({ content, id }, idx) => (
                      <OuiDraggable
                        key={id}
                        index={idx}
                        draggableId={id}
                        spacing="m">
                        <OuiPanel>{content}</OuiPanel>
                      </OuiDraggable>
                    )
                  )}
                </OuiDroppable>
              </OuiPanel>
            )}
          </OuiDraggable>
        ))}
      </OuiDroppable>
    </OuiDragDropContext>
  );
};
