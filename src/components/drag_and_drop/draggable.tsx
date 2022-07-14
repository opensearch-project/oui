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
  Fragment,
  FunctionComponent,
  ReactElement,
  cloneElement,
  useContext,
} from 'react';
import { Draggable, DraggableProps } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { OuiDroppableContext } from './droppable';

const spacingToClassNameMap = {
  none: null,
  s: 'ouiDraggable--s',
  m: 'ouiDraggable--m',
  l: 'ouiDraggable--l',
};

export type OuiDraggableSpacing = keyof typeof spacingToClassNameMap;

export interface OuiDraggableProps
  extends CommonProps,
    Omit<DraggableProps, 'children'> {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactElement | DraggableProps['children'];
  className?: string;
  /**
   * Whether the `children` will provide and set up its own drag handle
   */
  customDragHandle?: boolean;
  /**
   * Whether the item is currently in a position to be removed
   */
  isRemovable?: boolean;
  /**
   * Adds padding to the draggable item
   */
  spacing?: OuiDraggableSpacing;
  style?: CSSProperties;
}

export const OuiDraggable: FunctionComponent<OuiDraggableProps> = ({
  customDragHandle = false,
  draggableId,
  isDragDisabled = false,
  isRemovable = false,
  index,
  children,
  className,
  spacing = 'none',
  style,
  'data-test-subj': dataTestSubj = 'draggable',
  ...rest
}) => {
  const { cloneItems } = useContext(OuiDroppableContext);

  return (
    <Draggable
      draggableId={draggableId}
      index={index}
      isDragDisabled={isDragDisabled}
      {...rest}>
      {(provided, snapshot, rubric) => {
        const classes = classNames(
          'ouiDraggable',
          {
            'ouiDraggable--hasClone': cloneItems,
            'ouiDraggable--hasCustomDragHandle': customDragHandle,
            'ouiDraggable--isDragging': snapshot.isDragging,
            'ouiDraggable--withoutDropAnimation': isRemovable,
          },
          spacingToClassNameMap[spacing],
          className
        );
        const childClasses = classNames('ouiDraggable__item', {
          'ouiDraggable__item--hasCustomDragHandle': customDragHandle,
          'ouiDraggable__item--isDisabled': isDragDisabled,
          'ouiDraggable__item--isDragging': snapshot.isDragging,
          'ouiDraggable__item--isDropAnimating': snapshot.isDropAnimating,
        });
        const DraggableElement =
          typeof children === 'function'
            ? children(provided, snapshot, rubric)
            : (children as ReactElement); // as specified by `DraggableProps`
        return (
          <Fragment>
            <div
              {...provided.draggableProps}
              {...(!customDragHandle ? provided.dragHandleProps : {})}
              ref={provided.innerRef}
              data-test-subj={dataTestSubj}
              className={classes}
              style={{ ...style, ...provided.draggableProps.style }}>
              {cloneElement(DraggableElement, {
                className: classNames(
                  DraggableElement.props.className,
                  childClasses
                ),
              })}
            </div>
            {cloneItems && snapshot.isDragging && (
              <div className={classNames(classes, 'ouiDraggable--clone')}>
                {DraggableElement}
              </div>
            )}
          </Fragment>
        );
      }}
    </Draggable>
  );
};
