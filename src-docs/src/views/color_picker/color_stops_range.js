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

import { OuiColorStops, OuiFormRow } from '../../../../src/components';

export default () => {
  const [emptyColorStops, setEmptyColorStops] = useState([]);

  const handleEmptyChange = (colorStops) => {
    setEmptyColorStops(colorStops);
  };

  const [emptyColorStops2, setEmptyColorStops2] = useState([]);

  const handleEmptyChange2 = (colorStops) => {
    setEmptyColorStops2(colorStops);
  };

  const [emptyColorStops3, setEmptyColorStops3] = useState([]);

  const handleEmptyChange3 = (colorStops) => {
    setEmptyColorStops3(colorStops);
  };

  const [singleColorStops, setSingleColorStops] = useState([
    { stop: 10, color: '#D36086' },
  ]);

  const handleSingleChange = (colorStops) => {
    setSingleColorStops(colorStops);
  };

  const [singleColorStops2, setSingleColorStops2] = useState([
    { stop: 10, color: '#D36086' },
  ]);

  const handleSingleChange2 = (colorStops) => {
    setSingleColorStops2(colorStops);
  };

  const [singleColorStops3, setSingleColorStops3] = useState([
    { stop: 10, color: '#D36086' },
  ]);

  const handleSingleChange3 = (colorStops) => {
    setSingleColorStops3(colorStops);
  };

  return (
    <React.Fragment>
      <OuiFormRow label="Empty array without `min` or `max`">
        <OuiColorStops
          label="Empty start"
          onChange={handleEmptyChange2}
          colorStops={emptyColorStops2}
          stopType="fixed"
        />
      </OuiFormRow>
      <OuiFormRow label="Empty array with `min` defined">
        <OuiColorStops
          label="Empty start"
          onChange={handleEmptyChange}
          colorStops={emptyColorStops}
          min={0}
          stopType="fixed"
        />
      </OuiFormRow>
      <OuiFormRow label="Empty array with `max` defined">
        <OuiColorStops
          label="Empty start"
          onChange={handleEmptyChange3}
          colorStops={emptyColorStops3}
          max={100}
          stopType="fixed"
        />
      </OuiFormRow>
      <OuiFormRow label="Single stop without `min` or `max`">
        <OuiColorStops
          label="Single start"
          onChange={handleSingleChange}
          colorStops={singleColorStops}
          stopType="fixed"
        />
      </OuiFormRow>
      <OuiFormRow label="Single stop with `min` defined">
        <OuiColorStops
          label="Single start"
          onChange={handleSingleChange2}
          colorStops={singleColorStops2}
          min={0}
          stopType="fixed"
        />
      </OuiFormRow>
      <OuiFormRow label="Single stop with `max` defined">
        <OuiColorStops
          label="Single start"
          onChange={handleSingleChange3}
          colorStops={singleColorStops3}
          max={100}
          stopType="fixed"
        />
      </OuiFormRow>
    </React.Fragment>
  );
};
