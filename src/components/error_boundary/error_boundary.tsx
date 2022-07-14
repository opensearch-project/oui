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

import React, { Component, HTMLAttributes, ReactNode } from 'react';
import { CommonProps } from '../common';
import PropTypes from 'prop-types';

import { OuiText } from '../text';

interface OuiErrorBoundaryState {
  hasError: boolean;
  error?: string;
}

export type OuiErrorBoundaryProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * ReactNode to render as this component's content
     */
    children: ReactNode;
  };

export class OuiErrorBoundary extends Component<
  OuiErrorBoundaryProps,
  OuiErrorBoundaryState
> {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props: OuiErrorBoundaryProps) {
    super(props);

    const errorState: OuiErrorBoundaryState = {
      hasError: false,
      error: undefined,
    };

    this.state = errorState;
  }

  componentDidCatch({ message, stack }: Error) {
    // Display fallback UI
    // Only Chrome includes the `message` property as part of `stack`.
    // For consistency, rebuild the full error text from the Error subparts.
    const idx = stack?.indexOf(message) || -1;
    const stackStr = idx > -1 ? stack?.substr(idx + message.length + 1) : stack;
    const error = `Error: ${message}
${stackStr}`;
    this.setState({
      hasError: true,
      error,
    });
  }

  render() {
    const { children, ...rest } = this.props;

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="ouiErrorBoundary" {...rest}>
          <div className="ouiErrorBoundary__text">
            <OuiText size="xs">
              <h1>Error</h1>
              <pre className="ouiErrorBoundary__stack">
                <p>{this.state.error}</p>
              </pre>
            </OuiText>
          </div>
        </div>
      );
    }

    return children;
  }
}
