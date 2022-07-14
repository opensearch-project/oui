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

import { OuiCodeEditor } from '../../../../src/components';

import 'brace/mode/less';
import 'brace/theme/github';

export default () => {
  const value = '<p>This code is read only</p>';

  return (
    <OuiCodeEditor
      mode="less"
      theme="github"
      width="100%"
      value={value}
      setOptions={{ fontSize: '14px' }}
      isReadOnly
      aria-label="Read only code editor"
    />
  );
};
