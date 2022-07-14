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

import React, { useState, Fragment } from 'react';

import {
  OuiFieldText,
  OuiFlexGroup,
  OuiFlexItem,
  OuiSpacer,
  OuiCode,
  OuiFormRow,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export const HtmlIdGeneratorPrefix = () => {
  const [prefix, setPrefix] = useState('Id');
  const [customId, setCustomId] = useState(htmlIdGenerator('Id')());

  const onSearchChange = (e) => {
    const prefix = e.target.value;
    setPrefix(prefix);
    setCustomId(htmlIdGenerator(prefix)());
  };

  return (
    <Fragment>
      <OuiFlexGroup
        justifyContent="flexStart"
        gutterSize="m"
        alignItems="center">
        <OuiFlexItem grow={false}>
          <OuiFormRow label="Prefix">
            <OuiFieldText
              value={prefix}
              onChange={onSearchChange}
              placeholder="Enter prefix"
            />
          </OuiFormRow>
        </OuiFlexItem>
      </OuiFlexGroup>
      <OuiSpacer size="xl" />
      <OuiCode>{customId} </OuiCode>
    </Fragment>
  );
};
