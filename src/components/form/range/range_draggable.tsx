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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { useMouseMove } from '../../../services';

export interface OuiRangeDraggableProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  min: number;
  max: number;
  value: number[];
  disabled?: boolean;
  compressed?: boolean;
  showTicks?: boolean;
  lowerPosition: string;
  upperPosition: string;
  onChange: (x: number, isFirstInteraction?: boolean) => void;
}

export const OuiRangeDraggable: FunctionComponent<OuiRangeDraggableProps> = ({
  className,
  showTicks,
  lowerPosition,
  upperPosition,
  compressed,
  onChange,
  min,
  max,
  disabled,
  value,
  ...rest
}) => {
  const outerStyle: React.CSSProperties = {
    left: `calc(${lowerPosition})`,
    right: `calc(100% - ${upperPosition} - 16px)`,
  };

  const classes = classNames(
    'ouiRangeDraggable',
    {
      'ouiRangeDraggable--hasTicks': showTicks,
      'ouiRangeDraggable--compressed': compressed,
      'ouiRangeDraggable--disabled': disabled,
    },
    className
  );

  const handleChange = (
    { x }: { x: number; y: number },
    isFirstInteraction?: boolean
  ) => {
    if (disabled) return;
    onChange(x, isFirstInteraction);
  };

  const [handleMouseDown, handleInteraction] = useMouseMove(handleChange);

  const commonProps = {
    className: classes,
    role: 'slider',
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': value[0],
    'aria-valuetext': `${value[0]}, ${value[1]}`,
    'aria-disabled': !!disabled,
    tabIndex: !!disabled ? -1 : 0,
  };

  return (
    <div style={outerStyle} {...commonProps} {...rest}>
      <div
        className="ouiRangeDraggle__inner"
        onMouseDown={handleMouseDown}
        onTouchStart={handleInteraction}
        onTouchMove={handleInteraction}
      />
    </div>
  );
};
