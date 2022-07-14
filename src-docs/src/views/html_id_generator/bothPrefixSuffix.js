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

export const PrefixSufix = () => {
  const [prefix, setPrefix] = useState('Some');
  const [suffix, setSuffix] = useState('Id');
  const [customId, setCustomId] = useState(htmlIdGenerator('Some')('Id'));

  const onPrefixChange = (e) => {
    const prefix = e.target.value;
    setPrefix(prefix);
    setCustomId(htmlIdGenerator(prefix)(suffix));
  };

  const onSuffixChange = (e) => {
    const suffix = e.target.value;
    setSuffix(suffix);
    setCustomId(htmlIdGenerator(prefix)(suffix));
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
              onChange={onPrefixChange}
              placeholder="Enter prefix"
            />
          </OuiFormRow>
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiFormRow label="Suffix">
            <OuiFieldText
              value={suffix}
              onChange={onSuffixChange}
              placeholder="Enter suffix"
            />
          </OuiFormRow>
        </OuiFlexItem>
      </OuiFlexGroup>
      <OuiSpacer size="xl" />
      <OuiCode>{customId} </OuiCode>
    </Fragment>
  );
};
