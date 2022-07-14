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
  OuiPopoverTitle,
  OuiFlexItem,
  OuiFlexGroup,
  OuiPopover,
  OuiSelect,
  OuiFieldNumber,
  OuiExpression,
} from '../../../../src/components';

// Rise the popovers above GuidePageSideNav
const POPOVER_STYLE = { zIndex: '200' };

export default () => {
  const [example1, setExample1] = useState({
    isOpen: false,
    value: 'count()',
  });

  const [example2, setExample2] = useState({
    value: 100,
    description: 'Is above',
  });

  const openExample1 = () => {
    setExample1({
      ...example1,
      isOpen: true,
    });
    setExample2({
      ...example2,
      isOpen: false,
    });
  };

  const closeExample1 = () => {
    setExample1({
      ...example1,
      isOpen: false,
    });
  };

  const openExample2 = () => {
    setExample1({
      ...example1,
      isOpen: false,
    });
    setExample2({
      ...example2,
      isOpen: true,
    });
  };

  const closeExample2 = () => {
    setExample2({
      ...example2,
      isOpen: false,
    });
  };

  const changeExample1 = (event) => {
    setExample1({
      ...example1,
      value: event.target.value,
    });
  };

  const changeExample2Value = (e) => {
    const sanitizedValue = parseInt(e.target.value, 10);
    setExample2({
      ...example2,
      value: isNaN(sanitizedValue) ? '' : sanitizedValue,
    });
  };

  const changeExample2Description = (event) => {
    setExample2({
      ...example2,
      description: event.target.value,
    });
  };

  const renderPopover1 = () => (
    <div style={POPOVER_STYLE}>
      <OuiPopoverTitle>When</OuiPopoverTitle>
      <OuiSelect
        compressed
        value={example1.value}
        onChange={changeExample1}
        options={[
          { value: 'count()', text: 'count()' },
          { value: 'average()', text: 'average()' },
          { value: 'sum()', text: 'sum()' },
          { value: 'median()', text: 'median()' },
          { value: 'min()', text: 'min()' },
          { value: 'max()', text: 'max()' },
        ]}
      />
    </div>
  );

  const renderPopover2 = () => (
    <div style={POPOVER_STYLE}>
      <OuiFlexGroup gutterSize="s">
        <OuiFlexItem grow={false} style={{ width: 150 }}>
          <OuiSelect
            compressed
            value={example2.description}
            onChange={changeExample2Description}
            options={[
              { value: 'Is above', text: 'Is above' },
              { value: 'Is below', text: 'Is below' },
              { value: 'Is exactly', text: 'Is exactly' },
            ]}
          />
        </OuiFlexItem>

        <OuiFlexItem grow={false} style={{ width: 100 }}>
          <OuiFieldNumber
            compressed
            value={example2.value}
            onChange={changeExample2Value}
          />
        </OuiFlexItem>
      </OuiFlexGroup>
    </div>
  );

  return (
    <OuiFlexGroup gutterSize="s">
      <OuiFlexItem grow={false}>
        <OuiPopover
          id="popover1"
          button={
            <OuiExpression
              description="when"
              value={example1.value}
              isActive={example1.isOpen}
              onClick={openExample1}
            />
          }
          isOpen={example1.isOpen}
          closePopover={closeExample1}
          panelPaddingSize="s"
          anchorPosition="downLeft">
          {renderPopover1()}
        </OuiPopover>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiPopover
          id="popover2"
          panelPaddingSize="s"
          button={
            <OuiExpression
              description={example2.description}
              value={example2.value}
              isActive={example2.isOpen}
              onClick={openExample2}
            />
          }
          isOpen={example2.isOpen}
          closePopover={closeExample2}
          anchorPosition="downLeft">
          {renderPopover2()}
        </OuiPopover>
      </OuiFlexItem>
    </OuiFlexGroup>
  );
};
