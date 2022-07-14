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

import React, { FunctionComponent, useState, createContext } from 'react';
import {
  DragDropContext,
  DragDropContextProps,
  DropResult,
  DragStart,
  ResponderProvided,
} from 'react-beautiful-dnd';

// export interface OuiDragDropContextProps extends DragDropContextProps {}

type OuiDraggingType = string | null;

export interface OuiDragDropContextProps {
  isDraggingType: OuiDraggingType;
}

export const OuiDragDropContextContext = createContext<OuiDragDropContextProps>(
  {
    isDraggingType: null,
  }
);

export const OuiDragDropContext: FunctionComponent<DragDropContextProps> = ({
  onBeforeDragStart,
  onDragStart,
  onDragUpdate,
  onDragEnd,
  children,
  ...rest
}) => {
  const [isDraggingType, setIsDraggingType] = useState<OuiDraggingType>(null);
  const ouiOnDragStart = (
    start: DragStart,
    provided: ResponderProvided
  ): void => {
    setIsDraggingType(start.type);
    if (onDragStart) {
      onDragStart(start, provided);
    }
  };
  const ouiOnDragEnd = (
    result: DropResult,
    provided: ResponderProvided
  ): void => {
    setIsDraggingType(null);
    if (onDragEnd) {
      onDragEnd(result, provided);
    }
  };
  return (
    <DragDropContext
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={ouiOnDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={ouiOnDragEnd}
      {...rest}>
      <OuiDragDropContextContext.Provider
        value={{
          isDraggingType,
        }}>
        {children}
      </OuiDragDropContextContext.Provider>
    </DragDropContext>
  );
};
