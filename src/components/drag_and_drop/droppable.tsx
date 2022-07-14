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

import React, {
  CSSProperties,
  FunctionComponent,
  ReactElement,
  useContext,
} from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { OuiDragDropContextContext } from './drag_drop_context';

const spacingToClassNameMap = {
  none: null,
  s: 'ouiDroppable--s',
  m: 'ouiDroppable--m',
  l: 'ouiDroppable--l',
};

export type OuiDroppableSpacing = keyof typeof spacingToClassNameMap;

export interface OuiDroppableProps
  extends CommonProps,
    Omit<DroppableProps, 'children'> {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactElement | ReactElement[] | DroppableProps['children'];
  className?: string;
  /**
   * Makes its items immutable. Dragging creates cloned items that can be dropped elsewhere.
   */
  cloneDraggables?: boolean;
  style?: CSSProperties;
  /**
   * Adds padding to the droppable area
   */
  spacing?: OuiDroppableSpacing;
  /**
   * Adds an OuiPanel style to the droppable area
   */
  withPanel?: boolean;
  /**
   * Allow the panel to flex-grow?
   */
  grow?: boolean;
}

export const OuiDroppableContext = React.createContext({
  cloneItems: false,
});

export const OuiDroppable: FunctionComponent<OuiDroppableProps> = ({
  droppableId,
  direction,
  isDropDisabled = false,
  children,
  className,
  cloneDraggables = false,
  spacing = 'none',
  style,
  type = 'OUI_DEFAULT',
  withPanel = false,
  grow = false,
  'data-test-subj': dataTestSubj = 'droppable',
  ...rest
}) => {
  const { isDraggingType } = useContext(OuiDragDropContextContext);
  const dropIsDisabled: boolean = cloneDraggables ? true : isDropDisabled;
  return (
    <Droppable
      isDropDisabled={dropIsDisabled}
      droppableId={droppableId}
      direction={direction}
      type={type}
      {...rest}>
      {(provided, snapshot) => {
        const classes = classNames(
          'ouiDroppable',
          {
            'ouiDroppable--isDisabled': dropIsDisabled,
            'ouiDroppable--isDraggingOver': snapshot.isDraggingOver,
            'ouiDroppable--isDraggingType': isDraggingType === type,
            'ouiDroppable--withPanel': withPanel,
            'ouiDroppable--grow': grow,
            'ouiDroppable--noGrow': !grow,
          },
          spacingToClassNameMap[spacing],
          className
        );
        const placeholderClasses = classNames('ouiDroppable__placeholder', {
          'ouiDroppable__placeholder--isHidden': cloneDraggables,
        });
        const DroppableElement =
          typeof children === 'function'
            ? children(provided, snapshot)
            : children;
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={style}
            data-test-subj={dataTestSubj}
            className={classes}>
            <OuiDroppableContext.Provider
              value={{
                cloneItems: cloneDraggables,
              }}>
              {DroppableElement}
            </OuiDroppableContext.Provider>
            <div className={placeholderClasses}>{provided.placeholder}</div>
          </div>
        );
      }}
    </Droppable>
  );
};
