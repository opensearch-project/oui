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
  OuiDelayHide,
  OuiFlexItem,
  OuiCheckbox,
  OuiFormRow,
  OuiFieldNumber,
  OuiLoadingSpinner,
} from '../../../../src/components';

export default () => {
  const [minimumDuration, setDuration] = useState(3000);
  const [hide, setHide] = useState(false);

  const onChangeMinimumDuration = (event) => {
    setDuration(parseInt(event.target.value, 10));
  };

  const onChangeHide = (event) => {
    setHide(event.target.checked);
  };

  return (
    <Fragment>
      <OuiFlexItem>
        <OuiFormRow>
          <OuiCheckbox
            id="dummy-id"
            checked={hide}
            onChange={onChangeHide}
            label="Hide child"
          />
        </OuiFormRow>
        <OuiFormRow label="Minimum duration">
          <OuiFieldNumber
            value={minimumDuration}
            onChange={onChangeMinimumDuration}
          />
        </OuiFormRow>

        <OuiFormRow label="Child to render">
          <OuiDelayHide
            hide={hide}
            minimumDuration={minimumDuration}
            render={() => <OuiLoadingSpinner size="m" />}
          />
        </OuiFormRow>
      </OuiFlexItem>
    </Fragment>
  );
};
