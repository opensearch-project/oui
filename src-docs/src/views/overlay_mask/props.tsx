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

import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps } from '../../../../src/components/common';

interface OuiOverlayMaskInterface extends CommonProps {
  /**
   * Function that applies to clicking the mask itself and not the children
   */
  onClick?: () => void;
  /**
   * ReactNode to render as this component's children
   */
  children?: ReactNode;
  /**
   * Should the mask visually sit above or below the OuiHeader (controlled by z-index)
   */
  headerZindexLocation?: 'above' | 'below';
}

export const OuiOverlayMaskProps: FunctionComponent<OuiOverlayMaskInterface> = () => (
  <div />
);
