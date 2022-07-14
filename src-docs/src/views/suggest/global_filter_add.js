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

import React, { useState } from 'react';

import {
  OuiButtonEmpty,
  OuiPopover,
  OuiPopoverTitle,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

import GlobalFilterForm from './global_filter_form';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  return (
    <OuiPopover
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      button={
        <OuiButtonEmpty onClick={togglePopover} size="xs">
          + Add filter
        </OuiButtonEmpty>
      }
      anchorPosition="downCenter">
      <OuiPopoverTitle>
        <OuiFlexGroup alignItems="baseline">
          <OuiFlexItem>Add a filter</OuiFlexItem>
          <OuiFlexItem grow={false}>
            {/* This button should open a modal */}
            <OuiButtonEmpty flush="right" size="xs">
              Edit as Query DSL
            </OuiButtonEmpty>
          </OuiFlexItem>
        </OuiFlexGroup>
      </OuiPopoverTitle>

      <GlobalFilterForm
        style={{ width: 400 }}
        onAdd={togglePopover}
        onCancel={togglePopover}
      />
    </OuiPopover>
  );
};
