/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// A keydown handler that acts on Enter or Escape must ignore keys pressed while an IME composition
// is active (Korean, Japanese, Chinese): that key only commits or cancels the composed text, and
// Chrome follows up with a second, non-composing keydown for the same key. The check is
// `isComposingKeyboardEvent` from src/services. Handlers on elements where no composition can be
// active (buttons, rows, number inputs) opt out with an eslint-disable comment that says why.

const KEY_OBJECTS = new Set(['keys', 'cascadingMenuKeys', 'comboBoxKeys']);
const KEY_NAMES = new Set(['ENTER', 'ESCAPE']);
const KEY_STRINGS = new Set(['Enter', 'Escape']);
const GUARD = 'isComposingKeyboardEvent';

const isKeyRef = (node) =>
  node &&
  ((node.type === 'MemberExpression' &&
    node.object.type === 'Identifier' &&
    KEY_OBJECTS.has(node.object.name) &&
    node.property.type === 'Identifier' &&
    KEY_NAMES.has(node.property.name)) ||
    (node.type === 'Literal' && KEY_STRINGS.has(node.value)));

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require an IME composition check in functions that act on Enter or Escape',
    },
  },
  create(context) {
    // One frame per function: does it compare against Enter/Escape, and does it call the guard?
    const stack = [];
    const enter = () => stack.push({ keyNodes: [], guarded: false });
    const exit = () => {
      const frame = stack.pop();
      if (frame.guarded || !frame.keyNodes.length) return;
      // Unresolved comparisons move to the enclosing function: a guard anywhere there covers them
      if (stack.length) {
        stack[stack.length - 1].keyNodes.push(...frame.keyNodes);
        return;
      }
      {
        frame.keyNodes.forEach((node) =>
          context.report({
            node,
            message: `Handlers that act on Enter or Escape must ignore IME composition: call ${GUARD}(event) first, or disable this rule with the reason no composition can happen here.`,
          })
        );
      }
    };
    const top = () => stack[stack.length - 1];
    return {
      FunctionDeclaration: enter,
      FunctionExpression: enter,
      ArrowFunctionExpression: enter,
      'FunctionDeclaration:exit': exit,
      'FunctionExpression:exit': exit,
      'ArrowFunctionExpression:exit': exit,
      BinaryExpression(node) {
        if (
          !stack.length ||
          !['===', '==', '!==', '!='].includes(node.operator)
        )
          return;
        const keyNode = [node.left, node.right].find(isKeyRef);
        if (keyNode) top().keyNodes.push(node);
      },
      SwitchCase(node) {
        if (stack.length && isKeyRef(node.test)) top().keyNodes.push(node);
      },
      CallExpression(node) {
        if (
          stack.length &&
          node.callee.type === 'Identifier' &&
          node.callee.name === GUARD
        ) {
          top().guarded = true;
        }
      },
    };
  },
};
