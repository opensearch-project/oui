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

import React, { Fragment } from 'react';

import {
  OuiText,
  OuiTitle,
  OuiSpacer,
  OuiDescriptionList,
  OuiHorizontalRule,
  OuiCodeBlock,
  OuiCode,
  OuiLink,
} from '../../../../src/components';

import { Link } from 'react-router-dom';

const pluginSnippet = `<OuiMarkdownEditor
  uiPlugin={myPluginUI}
  parsingPluginList={myPluginParsingList}
  processingPluginList={myPluginProcessingList}
  {..otherProps}
/>

<!-- Note that the format component does not need a UI prop. -->
<OuiMarkdownFormat
  parsingPluginList={myPluginParsingList}
  processingPluginList={myPluginProcessingList}
/>
`;

const uiPluginSnippet = `const myPluginUI = {
  name: 'myPlugin',
  button: {
    label: 'Chart',
    iconType: 'visArea',
  },
  helpText: (<div>A node that explains how the syntax works</div>),
  editor: function editor({ node, onSave, onCancel }) { return ('something'); },
}; `;

const pluginConcepts = [
  {
    title: 'uiPlugin',
    description: (
      <span>
        Provides the <strong>UI</strong> for the button in the toolbar as well
        as any modals or extra UI that provides content to the editor.
      </span>
    ),
  },
  {
    title: 'parsingPluginList',
    description: (
      <span>
        Provides the logic to identify the new syntax and parse it into an{' '}
        <strong>AST node</strong>.
      </span>
    ),
  },
  {
    title: 'processingPluginList',
    description: (
      <span>
        Provides the logic to process the new <strong>AST node</strong> into a{' '}
        <strong>React node</strong>.
      </span>
    ),
  },
];

const uiPluginConcepts = [
  {
    title: 'name',
    description: (
      <span>
        The name of your plugin. Use the <strong>button.label</strong> listed
        below if you need a more friendly display name. The button can be
        ommitted if you wish the user to only utilize syntax to author the
        content.
      </span>
    ),
  },
  {
    title: 'button',
    description: (
      <span>
        Takes a <strong>label</strong> and an <strong>icon type</strong>. This
        forms the button that appear in the toolbar. Clicking the button will
        trigger either the <strong>editor</strong> or <strong>formatter</strong>
        .
      </span>
    ),
  },
  {
    title: 'editor',
    description: (
      <span>
        Provides UI controls (like an interactive modal) for how to build the
        inital content. <strong>Must exist if formatting does not</strong>.
      </span>
    ),
  },
  {
    title: 'formatting',
    description: (
      <span>
        If no <strong>editor</strong> is provided, this is an object defining
        how the plugins markdown tag is styled.
      </span>
    ),
  },
  {
    title: 'helpText',
    description: (
      <span>
        Contains a React node. Should contain some information and an example
        for how to utlize the syntax. Appears when the markdown icon is clicked
        on the bottom of the editor.
      </span>
    ),
  },
];

export const MarkdownPluginExample = {
  title: 'Markdown plugins',
  beta: true,
  intro: (
    <OuiText>
      <p>
        Both{' '}
        <strong>
          <Link to="/editors-syntax/markdown-editor/">OuiMarkdownEditor</Link>
        </strong>{' '}
        and{' '}
        <strong>
          <Link to="/editors-syntax/markdown-format/">OuiMarkdownFormat</Link>
        </strong>{' '}
        utilize the same underlying plugin architecture to transform string
        based syntax into React components. At a high level{' '}
        <OuiLink href="https://www.npmjs.com/package/unified" target="_blank">
          Unified JS
        </OuiLink>{' '}
        is used in combination with{' '}
        <OuiLink
          href="https://www.npmjs.com/package/remark-parse"
          target="_blank">
          Remark
        </OuiLink>{' '}
        to provide OUI&apos;s markdown components, which are separated into a{' '}
        <strong>parsing</strong> and <strong>processing</strong> layer. These
        two concepts are kept distinct in OUI components to provide concrete
        locations for your plugins to be injected, be it editing or rendering.
        Finally you provide <strong>UI</strong> to the component to handle
        interactions with the editor.
      </p>
      <p>
        In addition to running the full pipeline,{' '}
        <strong>OuiMarkdownEditor</strong> uses just the parsing configuration
        to determine the input&apos;s validity, provide messages back to the
        application, and allow the toolbar buttons to interact with existing
        markdown tags.
      </p>
    </OuiText>
  ),

  sections: [
    {
      wrapText: false,
      text: (
        <>
          <OuiTitle>
            <h2>Plugin development</h2>
          </OuiTitle>
          <OuiSpacer size="m" />
          <OuiText>
            <p>
              An <strong>OuiMarkdown plugin</strong> is comprised of three major
              pieces, which are passed searpately as props.
            </p>
          </OuiText>
          <OuiSpacer />
          <OuiCodeBlock size="s" language="html">
            {pluginSnippet}
          </OuiCodeBlock>
          <OuiSpacer />
          <OuiDescriptionList
            compressed
            listItems={pluginConcepts}
            type="responsiveColumn"
            titleProps={{ style: { width: '20%' } }}
            descriptionProps={{ style: { width: '80%' } }}
          />
          <OuiHorizontalRule margin="xl" />
          <OuiTitle>
            <h3>uiPlugin</h3>
          </OuiTitle>
          <OuiSpacer />
          <OuiCodeBlock size="s" language="javascript">
            {uiPluginSnippet}
          </OuiCodeBlock>
          <OuiSpacer />
          <OuiDescriptionList
            compressed
            listItems={uiPluginConcepts}
            type="responsiveColumn"
            titleProps={{ style: { width: '20%' } }}
            descriptionProps={{ style: { width: '80%' } }}
          />
          <OuiHorizontalRule margin="xl" />
          <OuiTitle>
            <h3>parsingPluginList</h3>
          </OuiTitle>
          <OuiSpacer />
          <OuiText>
            <Fragment>
              <p>
                <a
                  href="https://www.npmjs.com/package/remark-parse"
                  target="_blank">
                  Remark-parse
                </a>{' '}
                is used to parse the input text into markdown AST nodes. Its
                documentation for{' '}
                <a
                  href="https://www.npmjs.com/package/remark-parse#extending-the-parser"
                  target="_blank">
                  writing parsers
                </a>{' '}
                is under the Extending the Parser section, but highlights are
                included below.
              </p>

              <p>
                A parser is comprised of three pieces. There is a wrapping
                function which is provided to remark-parse and injects the
                parser, the parser method itself, and a locator function if the
                markdown tag is inline.
              </p>

              <p>
                The parsing method is called at locations where its markdown
                down might be found at. The method is responsible for
                determining if the location is a valid tag, process the tag, and
                mark report the result.
              </p>

              <h4>Inline vs block</h4>
              <p>
                Inline tags are allowed at any point in text, and will be
                rendered somewhere within a <OuiCode>{'<p>'}</OuiCode> element.
                For better performance, inline parsers must provide a locate
                method which reports the location where their next tag might be
                found. They are not allowed to span multiple lines of the input.
              </p>

              <p>
                Block tags are rendered inside <OuiCode>{'<span>'}</OuiCode>{' '}
                elements, and do not have a locate method. They can consume as
                much input text as desired, across multiple lines.
              </p>
            </Fragment>
          </OuiText>
          <OuiSpacer />
          <OuiCodeBlock
            size="s"
            language="javascript">{`// example plugin parser
function EmojiMarkdownParser() {
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.inlineTokenizers;
  const methods = Parser.prototype.inlineMethods;

  const emojiMap = {
    wave: '👋',
    smile: '😀',
    plane: '🛩',
  };
  const emojiNames = Object.keys(emojiMap);

  // function to parse a matching string
  function tokenizeEmoji(eat, value, silent) {
    const tokenMatch = value.match(/^:(.*?):/);

    if (!tokenMatch) return false; // no match
    const [, emojiName] = tokenMatch;

    // ensure we know this one
    if (emojiNames.indexOf(emojiName) === -1) return false;

    if (silent) {
      return true;
    }

    // must consume the exact & entire match string
    return eat(\`:\${emojiName}:\`)({
      type: 'emojiPlugin',
      emoji: emojiMap[emojiName], // configuration is passed to the renderer
    });
  }

  // function to detect where the next emoji match might be found
  tokenizeEmoji.locator = (value, fromIndex) => {
    return value.indexOf(':', fromIndex);
  };

  // define the emoji plugin and inject it just before the existing text plugin
  tokenizers.emoji = tokenizeEmoji;
  methods.splice(methods.indexOf('text'), 0, 'emoji');
}

// add the parser for \`emojiPlugin\`
const parsingList = getDefaultOuiMarkdownParsingPlugins();
parsingList.push(EmojiMarkdownParser);`}</OuiCodeBlock>
          <OuiHorizontalRule margin="xl" />
          <OuiTitle>
            <h3>processingPluginList</h3>
          </OuiTitle>
          <OuiSpacer />
          <OuiText>
            <p>
              After parsing the input into an AST, the nodes need to be
              transformed into React elements. This is performed by a list of
              processors, the default set converts remark AST into rehype and
              then into React. Plugins need to define themselves within this
              transformation process, identifying with the same type its parser
              uses in its <OuiCode>eat</OuiCode> call.
            </p>
          </OuiText>
          <OuiSpacer />
          <OuiCodeBlock
            size="s"
            language="javascript">{`// example plugin processor

// receives the configuration from the parser and renders
const EmojiMarkdownRenderer = ({ emoji }) => {
  return <span>{emoji}</span>;
};

// add the renderer for \`emojiPlugin\`
const processingList = getDefaultOuiMarkdownProcessingPlugins();
processingList[1][1].components.emojiPlugin = EmojiMarkdownRenderer;`}</OuiCodeBlock>
          ),
        </>
      ),
    },
  ],
};
