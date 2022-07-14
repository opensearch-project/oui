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

import React, { useCallback, useState, useRef } from 'react';

import {
  OuiMarkdownEditor,
  OuiSpacer,
  OuiCodeBlock,
  OuiButton,
  OuiFormErrorText,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const initialContent = `## Errors

The tooltip is empty and will error

!{tooltip[]()}
`;

export default () => {
  const errorElementId = useRef(htmlIdGenerator()());
  const [value, setValue] = useState(initialContent);
  const [messages, setMessages] = useState([]);
  const [ast, setAst] = useState(null);
  const [isAstShowing, setIsAstShowing] = useState(false);
  const onParse = useCallback((err, { messages, ast }) => {
    setMessages(err ? [err] : messages);
    setAst(JSON.stringify(ast, null, 2));
  }, []);
  return (
    <>
      <OuiMarkdownEditor
        aria-label="OUI markdown editor demo"
        aria-describedby={errorElementId.current}
        value={value}
        onChange={setValue}
        height={400}
        onParse={onParse}
        errors={messages}
      />
      <OuiSpacer size="s" />

      <OuiFormErrorText
        id={errorElementId.current}
        className="ouiFormRow__text">
        Utilize error text or{' '}
        <strong>
          <a href="/#/forms/form-validation">OuiFormRow</a>
        </strong>{' '}
        for more permanent error feedback
      </OuiFormErrorText>

      <div className="oui-textRight">
        <OuiButton
          size="s"
          iconType={isAstShowing ? 'eyeClosed' : 'eye'}
          onClick={() => setIsAstShowing(!isAstShowing)}
          fill={isAstShowing}>
          {isAstShowing ? 'Hide editor AST' : 'Show editor AST'}
        </OuiButton>
      </div>

      {isAstShowing && <OuiCodeBlock language="json">{ast}</OuiCodeBlock>}
    </>
  );
};
