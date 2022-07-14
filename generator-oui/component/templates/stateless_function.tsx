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

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type <%= componentName %>Props = HTMLAttributes<HTMLDivElement> & CommonProps & {

};

export const <%= componentName %>: FunctionComponent<<%= componentName %>Props> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('<%= cssClassName %>', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
