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

import React, { useCallback, useState } from 'react';

import {
  OuiMarkdownEditor,
  OuiSpacer,
  OuiCodeBlock,
  OuiButton,
} from '../../../../src/components';

const initialContent = `## Hello world!

Basic "github flavored" markdown will work as you'd expect.

The editor also ships with some built in plugins. For example it can handle checkboxes. Notice how they toggle state even in the preview mode.

- [ ] Checkboxes
- [x] Can be filled
- [ ] Or empty
`;

const dropHandlers = [
  {
    supportedFiles: ['.jpg', '.jpeg'],
    accepts: (itemType) => itemType === 'image/jpeg',
    getFormattingForItem: (item) => {
      // fake an upload
      return new Promise((resolve) => {
        setTimeout(() => {
          const url = URL.createObjectURL(item);
          resolve({
            text: `![${item.name}](${url})`,
            config: { block: true },
          });
        }, 1000);
      });
    },
  },
];

export default () => {
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
        value={value}
        onChange={setValue}
        height={400}
        onParse={onParse}
        errors={messages}
        dropHandlers={dropHandlers}
      />
      <OuiSpacer size="s" />
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
