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

import React, {
  Component,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type <%= componentName %>Props = HTMLAttributes<HTMLDivElement> & CommonProps & {

};

export class <%= componentName %> extends Component<<%= componentName %>Props> {
  constructor(props: <%= componentName %>Props) {
    super(props);
  }

  render() {
    const {
      children,
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      '<%= cssClassName %>',
      className
    );

    return (
      <div
        className={classes}
        {...rest}
      >
        {children}
      </div>
    );
  }
}
