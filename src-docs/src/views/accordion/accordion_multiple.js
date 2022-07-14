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

import React from 'react';

import {
  OuiAccordion,
  OuiText,
  OuiSpacer,
  OuiPanel,
} from '../../../../src/components';

export default () => (
  <div>
    <OuiAccordion
      id="accordion3"
      buttonContent="An accordion with padding applied through props"
      paddingSize="l">
      <OuiText size="s">
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
      </OuiText>
    </OuiAccordion>

    <OuiSpacer />

    <OuiAccordion
      id="accordion4"
      buttonContent="A second accordion with padding and a very long title that should truncate because of oui-textTruncate"
      buttonContentClassName="oui-textTruncate"
      paddingSize="l">
      <OuiText size="s">
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
      </OuiText>
    </OuiAccordion>

    <OuiSpacer />

    <OuiAccordion
      id="accordion5"
      buttonContent="A third accordion with a nested accordion"
      paddingSize="m">
      <OuiText size="s">
        <p>
          This content area will grow to accommodate when the accordion below
          opens
        </p>
      </OuiText>
      <OuiSpacer />
      <OuiAccordion id="accordion6" buttonContent="A fourth nested accordion">
        <OuiPanel color="subdued">
          Any content inside of <strong>OuiAccordion</strong> will appear here.
        </OuiPanel>
      </OuiAccordion>
    </OuiAccordion>
  </div>
);
