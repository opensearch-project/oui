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

/**
 * NOTE: We can't test this component because Enzyme doesn't support rendering
 * into portals.
 */

import { Component, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ExclusiveUnion, keysOf } from '../common';

interface InsertPositionsMap {
  after: InsertPosition;
  before: InsertPosition;
}

export const insertPositions: InsertPositionsMap = {
  after: 'afterend',
  before: 'beforebegin',
};

export const INSERT_POSITIONS: OuiPortalInsertPosition[] = keysOf(
  insertPositions
);

type OuiPortalInsertPosition = keyof typeof insertPositions;
export type OuiPortalInsert = ExclusiveUnion<
  { root: HTMLElement },
  { sibling: HTMLElement; position: OuiPortalInsertPosition }
>;

export interface OuiPortalProps {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  insert?: OuiPortalInsert;
  portalRef?: (ref: HTMLElement | null) => void;
}

export class OuiPortal extends Component<OuiPortalProps> {
  portalNode: HTMLElement;
  constructor(props: OuiPortalProps) {
    super(props);

    const { insert } = this.props;

    this.portalNode = document.createElement('div');

    // no insertion defined, append to body
    if (insert == null) {
      document.body.appendChild(this.portalNode);
      return;
    }

    const { root, sibling, position } = insert;

    // inserting within an element
    if (root) {
      this.portalNode = root;
      return;
    }

    // inserting before or after an element
    if (sibling && position) {
      sibling.insertAdjacentElement(insertPositions[position], this.portalNode);
    }
  }

  componentDidMount() {
    this.updatePortalRef(this.portalNode);
  }

  componentWillUnmount() {
    if (this.portalNode.parentNode) {
      this.portalNode.parentNode.removeChild(this.portalNode);
    }
    this.updatePortalRef(null);
  }

  updatePortalRef(ref: HTMLElement | null) {
    if (this.props.portalRef) {
      this.props.portalRef(ref);
    }
  }

  render() {
    return createPortal(this.props.children, this.portalNode);
  }
}
