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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { requiredProps } from '../../test/required_props';
import { OuiMarkdownEditor } from './markdown_editor';
import * as MarkdownTooltip from './plugins/markdown_tooltip';
import MarkdownActions from './markdown_actions';

// Mock document.execCommand since it's not available in JSDOM
Object.defineProperty(document, 'execCommand', {
  value: jest.fn(() => false), // Return false to trigger fallback behavior
  writable: true,
});

describe('OuiMarkdownEditor', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiMarkdownEditor
        editorId="editorId"
        value=""
        onChange={() => null}
        {...requiredProps}
      />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('height', () => {
      test('is rendered with a custom size', () => {
        const { container } = render(
          <OuiMarkdownEditor
            editorId="editorId"
            height={400}
            value=""
            onChange={() => null}
            {...requiredProps}
          />
        );

        expect(container).toMatchSnapshot();
      });

      test('is rendered in full mode', () => {
        const { container } = render(
          <OuiMarkdownEditor
            editorId="editorId"
            height="full"
            value=""
            onChange={() => null}
            {...requiredProps}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('maxHeight', () => {
      test('is rendered with a custom size', () => {
        const { container } = render(
          <OuiMarkdownEditor
            editorId="editorId"
            maxHeight={600}
            value=""
            onChange={() => null}
            {...requiredProps}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('autoExpandPreview', () => {
      test('is rendered with false', () => {
        const { container } = render(
          <OuiMarkdownEditor
            editorId="editorId"
            autoExpandPreview={false}
            value=""
            onChange={() => null}
            {...requiredProps}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });
  });

  test('is preview rendered', async () => {
    render(
      <OuiMarkdownEditor
        editorId="editorId"
        value="## Hello world"
        onChange={() => null}
        {...requiredProps}
      />
    );

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /preview/i }));
    });

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Hello world',
    });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Hello world');
  });

  test('fires onChange on text area change', async () => {
    const testProps = {
      editorId: 'editorId',
      value: 'Hello',
      onChange: jest.fn(),
    };

    render(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

    const textarea = screen.getByRole('textbox');

    // Use fireEvent directly for more control
    // This is more similar to how Enzyme's simulate works
    fireEvent.change(textarea, { target: { value: 'New value' } });

    // Verify onChange was called
    expect(testProps.onChange).toHaveBeenCalled();
  });

  describe('render markdown error', () => {
    test('fires onParse with messages if there is an error in markdown', () => {
      const testMessage = [
        {
          message: 'No tooltip text found',
          name: '1:18',
          reason: 'No tooltip text found',
          line: 1,
          column: 18,
          location: { start: expect.any(Object), end: expect.any(Object) },
          source: null,
          ruleId: null,
          fatal: null,
        },
      ];
      const testProps = {
        editorId: 'editorId',
        value: '!{tooltip[hello]()}',
        onChange: jest.fn(),
        onParse: jest.fn(),
      };

      render(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

      expect(testProps.onParse).toHaveBeenCalledTimes(1);
      expect(testProps.onParse).toBeCalledWith(null, {
        ast: expect.anything(),
        messages: testMessage,
      });
    });

    test('render error if markdown has error', () => {
      const testMessage = [
        {
          message: 'No tooltip text found',
          name: '1:18',
          reason: 'No tooltip text found',
        },
      ];
      const testProps = {
        editorId: 'editorId',
        value: '!{tooltip[hello]()}',
        onChange: jest.fn(),
        errors: testMessage,
      };

      render(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

      expect(
        screen.getByRole('button', { name: 'Show errors' })
      ).toBeInTheDocument();
    });

    test('does not render error if error messages are empty', () => {
      const testProps = {
        editorId: 'editorId',
        value: '!{tooltip[hello](hello)}',
        onChange: jest.fn(),
        errors: [],
      };

      render(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

      expect(
        screen.queryByRole('button', { name: 'Show errors' })
      ).not.toBeInTheDocument();
    });
  });

  describe('markdown actions', () => {
    const toolbarPlugins = [MarkdownTooltip.plugin];
    const markdownActions = new MarkdownActions('editorId', toolbarPlugins);

    it('do calls apply style for a correct plugin with immediate formatting', () => {
      markdownActions.applyStyle = jest.fn();
      markdownActions.do('mdBold');

      expect(markdownActions.applyStyle).toHaveBeenCalledTimes(1);
    });
  });

  describe('toolbar actions', () => {
    const testProps = {
      editorId: 'editorId',
      value: 'Hello',
      onChange: jest.fn(),
    };

    beforeEach(() => {
      // Reset the onChange mock
      testProps.onChange.mockClear();
    });

    it('bold selected text on bold icon click', async () => {
      render(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      // Select all text
      textarea.setSelectionRange(0, testProps.value.length);

      const user = userEvent.setup();
      await act(async () => {
        await user.click(screen.getByRole('button', { name: 'Bold' }));
      });

      // Check that onChange was called with the formatted text
      expect(testProps.onChange).toHaveBeenCalledWith(`**${testProps.value}**`);
    });

    it('italicize selected text on italic icon click', async () => {
      render(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      textarea.setSelectionRange(0, testProps.value.length);

      const user = userEvent.setup();
      await act(async () => {
        await user.click(screen.getByRole('button', { name: 'Italic' }));
      });

      expect(testProps.onChange).toHaveBeenCalledWith(`_${testProps.value}_`);
    });

    it('convert selected text to unordered list on unordered list icon click', async () => {
      render(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      textarea.setSelectionRange(0, testProps.value.length);

      const user = userEvent.setup();
      await act(async () => {
        await user.click(
          screen.getByRole('button', { name: 'Unordered list' })
        );
      });

      expect(testProps.onChange).toHaveBeenCalledWith(`- ${testProps.value}`);
    });

    it('convert selected text to ordered list on ordered list icon click', async () => {
      render(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      textarea.setSelectionRange(0, testProps.value.length);

      const user = userEvent.setup();
      await act(async () => {
        await user.click(screen.getByRole('button', { name: 'Ordered list' }));
      });

      expect(testProps.onChange).toHaveBeenCalledWith(`1. ${testProps.value}`);
    });

    it('convert selected text task list on tasklist icon click', async () => {
      render(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      textarea.setSelectionRange(0, testProps.value.length);

      const user = userEvent.setup();
      await act(async () => {
        await user.click(screen.getByRole('button', { name: 'Task list' }));
      });

      expect(testProps.onChange).toHaveBeenCalledWith(
        `- [ ] ${testProps.value}`
      );
    });

    it('convert selected text to quote on quote icon click', async () => {
      render(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      textarea.setSelectionRange(0, testProps.value.length);

      const user = userEvent.setup();
      await act(async () => {
        await user.click(screen.getByRole('button', { name: 'Quote' }));
      });

      expect(testProps.onChange).toHaveBeenCalledWith(`> ${testProps.value}`);
    });

    it('convert selected text to code on code icon click', async () => {
      render(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      textarea.setSelectionRange(0, testProps.value.length);

      const user = userEvent.setup();
      await act(async () => {
        await user.click(screen.getByRole('button', { name: 'Code' }));
      });

      expect(testProps.onChange).toHaveBeenCalledWith(`\`${testProps.value}\``);
    });

    it('selected text will have a tooltip on tooltip icon click', async () => {
      render(<OuiMarkdownEditor {...testProps} {...requiredProps} />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      textarea.setSelectionRange(0, testProps.value.length);

      const user = userEvent.setup();
      await act(async () => {
        await user.click(screen.getByRole('button', { name: 'Tooltip' }));
      });

      expect(testProps.onChange).toHaveBeenCalledWith(
        `!{tooltip[${testProps.value}]()}`
      );
    });
  });
});
