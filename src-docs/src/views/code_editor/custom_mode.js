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
import 'brace/mode/text';
import 'brace/theme/github';

const TextMode = window.ace.acequire('ace/mode/text').Mode;
class MyCustomAceMode extends TextMode {
  // Your custom mode definition goes here.
  // See https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode
}

export default () => {
  const [value, updateValue] = useState('');

  const onChange = (value) => {
    updateValue(value);
  };

  return (
    <OuiCodeEditor
      mode={new MyCustomAceMode()}
      aria-label="Custom mode code editor"
      theme="github"
      width="100%"
      value={value}
      onChange={onChange}
      setOptions={{ fontSize: '14px' }}
    />
  );
};
