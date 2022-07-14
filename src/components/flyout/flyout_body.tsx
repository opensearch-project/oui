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

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type OuiFlyoutBodyProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> &
    CommonProps & {
      /**
       * Use to display a banner at the top of the body. It is suggested to use `OuiCallOut` for it.
       */
      banner?: ReactNode;
    }
>;

export const OuiFlyoutBody: OuiFlyoutBodyProps = ({
  children,
  className,
  banner,
  ...rest
}) => {
  const classes = classNames('ouiFlyoutBody', className);
  const overflowClasses = classNames('ouiFlyoutBody__overflow', {
    'ouiFlyoutBody__overflow--hasBanner': banner,
  });

  return (
    <div className={classes} {...rest}>
      <div tabIndex={0} className={overflowClasses}>
        {banner && <div className="ouiFlyoutBody__banner">{banner}</div>}
        <div className="ouiFlyoutBody__overflowContent">{children}</div>
      </div>
    </div>
  );
};
