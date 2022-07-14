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

import React, { useState, useEffect } from 'react';

import {
  OuiButton,
  OuiFlexGroup,
  OuiFlexItem,
  OuiProgress,
  OuiText,
} from '../../../../src/components';

export default () => {
  const [value, setValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  let timer;
  const progress = (value) => {
    if (value > 100) {
      setValue(100);
    } else {
      setValue(value);
      const diff = Math.round(Math.random() * 10);
      timer = setTimeout(() => progress(value + diff), 250);
    }
  };
  const toggleProgress = () => {
    const currentState = showProgress;

    if (!currentState) {
      timer = setTimeout(() => progress(0), 250);
    } else {
      clearTimeout(timer);
      setValue(0);
    }
    setShowProgress(!showProgress);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  return (
    <OuiFlexGroup alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButton size="s" onClick={toggleProgress}>
          Toggle progress
        </OuiButton>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiText>
          <p>{value}</p>
        </OuiText>
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiProgress value={value} max={100} size="xs" />
      </OuiFlexItem>
    </OuiFlexGroup>
  );
};
