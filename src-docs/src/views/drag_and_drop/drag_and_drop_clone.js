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
  OuiButtonIcon,
  OuiDragDropContext,
  OuiFlexGroup,
  OuiFlexItem,
  OuiDraggable,
  OuiDroppable,
  OuiIcon,
  OuiPanel,
  ouiDragDropCopy,
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
  const [isItemRemovable, setIsItemRemovable] = useState(false);
  const [list1, setList1] = useState(makeList(3));
  const [list2, setList2] = useState([]);
  const lists = { DROPPABLE_AREA_COPY_1: list1, DROPPABLE_AREA_COPY_2: list2 };
  const actions = {
    DROPPABLE_AREA_COPY_1: setList1,
    DROPPABLE_AREA_COPY_2: setList2,
  };
  const remove = (droppableId, index) => {
    const list = Array.from(lists[droppableId]);
    list.splice(index, 1);

    actions[droppableId](list);
  };
  const onDragUpdate = ({ source, destination }) => {
    const shouldRemove =
      !destination && source.droppableId === 'DROPPABLE_AREA_COPY_2';
    setIsItemRemovable(shouldRemove);
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
        const result = ouiDragDropCopy(
          lists[sourceId],
          lists[destinationId],
          source,
          destination,
          {
            property: 'id',
            modifier: makeId,
          }
        );

        actions[sourceId](result[sourceId]);
        actions[destinationId](result[destinationId]);
      }
    } else if (!destination && source.droppableId === 'DROPPABLE_AREA_COPY_2') {
      remove(source.droppableId, source.index);
    }
  };
  return (
    <OuiDragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <OuiFlexGroup>
        <OuiFlexItem style={{ width: '50%' }}>
          <OuiDroppable
            droppableId="DROPPABLE_AREA_COPY_1"
            cloneDraggables={true}
            spacing="l"
            grow>
            {list1.map(({ content, id }, idx) => (
              <OuiDraggable key={id} index={idx} draggableId={id} spacing="l">
                <OuiPanel>{content}</OuiPanel>
              </OuiDraggable>
            ))}
          </OuiDroppable>
        </OuiFlexItem>
        <OuiFlexItem style={{ width: '50%' }}>
          <OuiDroppable droppableId="DROPPABLE_AREA_COPY_2" withPanel grow>
            {list2.length ? (
              list2.map(({ content, id }, idx) => (
                <OuiDraggable
                  key={id}
                  index={idx}
                  draggableId={id}
                  spacing="l"
                  isRemovable={isItemRemovable}>
                  <OuiPanel>
                    <OuiFlexGroup gutterSize="none" alignItems="center">
                      <OuiFlexItem>{content}</OuiFlexItem>
                      <OuiFlexItem grow={false}>
                        {isItemRemovable ? (
                          <OuiIcon type="trash" color="danger" />
                        ) : (
                          <OuiButtonIcon
                            iconType="cross"
                            aria-label="Remove"
                            onClick={() => remove('DROPPABLE_AREA_COPY_2', idx)}
                          />
                        )}
                      </OuiFlexItem>
                    </OuiFlexGroup>
                  </OuiPanel>
                </OuiDraggable>
              ))
            ) : (
              <OuiFlexGroup
                alignItems="center"
                justifyContent="spaceAround"
                gutterSize="none"
                style={{ height: '100%' }}>
                <OuiFlexItem grow={false}>Drop Items Here</OuiFlexItem>
              </OuiFlexGroup>
            )}
          </OuiDroppable>
        </OuiFlexItem>
      </OuiFlexGroup>
    </OuiDragDropContext>
  );
};
