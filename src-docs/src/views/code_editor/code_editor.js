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

import { OuiCodeEditor } from '../../../../src/components';
import 'brace/theme/github';
import 'brace/mode/javascript';
import 'brace/snippets/javascript';
import 'brace/ext/language_tools';

export default () => {
  const [value, updateValue] = useState('');

  const onChange = (value) => {
    updateValue(value);
  };

  return (
    <OuiCodeEditor
      mode="javascript"
      theme="github"
      width="100%"
      value={value}
      onChange={onChange}
      setOptions={{
        fontSize: '14px',
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
      }}
      onBlur={() => {}}
      aria-label="Code Editor"
    />
  );
};
