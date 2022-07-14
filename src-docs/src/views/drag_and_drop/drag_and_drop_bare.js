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
  const [list] = useState(makeList(3));

  const onDragEnd = ({ source, destination }) => {
    console.log(source, destination);
  };

  return (
    <OuiDragDropContext onDragEnd={onDragEnd}>
      <OuiDroppable droppableId="DROPPABLE_AREA_BARE">
        {list.map(({ content, id }, idx) => (
          <OuiDraggable key={id} index={idx} draggableId={id}>
            {() => <div>{content}</div>}
          </OuiDraggable>
        ))}
      </OuiDroppable>
    </OuiDragDropContext>
  );
};
