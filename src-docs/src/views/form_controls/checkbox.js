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

import { OuiCheckbox, OuiSpacer } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setindeterminate] = useState(true);

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  const onChangeIndeterminate = () => {
    setindeterminate(!indeterminate);
  };

  return (
    <Fragment>
      <OuiCheckbox
        id={htmlIdGenerator()()}
        label="I am a checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
      />

      <OuiSpacer size="m" />

      <OuiCheckbox
        id={htmlIdGenerator()()}
        label="I am an indeterminate checkbox"
        indeterminate={indeterminate}
        onChange={() => onChangeIndeterminate()}
      />

      <OuiSpacer size="m" />

      <OuiCheckbox
        id={htmlIdGenerator()()}
        label="I am a disabled checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
        disabled
      />

      <OuiSpacer size="m" />

      <OuiCheckbox
        id={htmlIdGenerator()()}
        label="I am a compressed checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
        compressed
      />
    </Fragment>
  );
};
