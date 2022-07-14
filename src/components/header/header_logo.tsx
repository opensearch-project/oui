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
  FunctionComponent,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { OuiIcon, IconType } from '../icon';
import { CommonProps } from '../common';
import { getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';

export type OuiHeaderLogoProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    rel?: string;
    target?: string;
    iconType?: IconType;
    iconTitle?: string;
    /**
     * ReactNode to render as this component's content
     */
    children?: ReactNode;
  };

export const OuiHeaderLogo: FunctionComponent<OuiHeaderLogoProps> = ({
  iconType = 'logoElastic',
  iconTitle = 'Elastic',
  href,
  rel,
  target,
  children,
  className,
  ...rest
}) => {
  const classes = classNames('ouiHeaderLogo', className);
  const secureRel = getSecureRelForTarget({ href, rel, target });
  const isHrefValid = !href || validateHref(href);
  return (
    <a
      href={isHrefValid ? href : ''}
      rel={secureRel}
      target={target}
      className={classes}
      {...rest}>
      <OuiIcon
        aria-label={iconTitle}
        className="ouiHeaderLogo__icon"
        size="l"
        type={iconType}
      />

      {children && <span className="ouiHeaderLogo__text">{children}</span>}
    </a>
  );
};
