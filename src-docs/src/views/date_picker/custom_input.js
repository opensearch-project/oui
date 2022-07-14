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

import PropTypes from 'prop-types';

import moment from 'moment';

import { OuiDatePicker, OuiButton } from '../../../../src/components';

// Should be a component because the date picker does some ref stuff behind the scenes
// eslint-disable-next-line react/prefer-stateless-function

const ExampleCustomInput = ({ onClick, value }) => {
  return (
    <OuiButton className="example-custom-input" onClick={onClick}>
      {value}
    </OuiButton>
  );
};

ExampleCustomInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

// eslint-disable-next-line react/no-multi-comp
export default () => {
  const [startDate, setStartDate] = useState(moment());

  return (
    <OuiDatePicker
      selected={startDate}
      onChange={setStartDate}
      customInput={<ExampleCustomInput />}
    />
  );
};
