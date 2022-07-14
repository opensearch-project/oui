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

const componentNames = ['OuiButton', 'OuiButtonEmpty', 'OuiLink', 'OuiBadge'];

module.exports = {
  meta: {
    fixable: null,
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (
          node.name.type !== 'JSXIdentifier' ||
          !componentNames.includes(node.name.name)
        ) {
          return;
        }

        const hasHref = node.attributes.some(
          attr => attr.type === 'JSXAttribute' && attr.name.name === 'href'
        );
        const hasOnClick = node.attributes.some(
          attr => attr.type === 'JSXAttribute' && attr.name.name === 'onClick'
        );

        if (hasHref && hasOnClick) {
          context.report(
            node,
            `<${node.name.name}> accepts either \`href\` or \`onClick\`, not both.`
          );
        }
      },
    };
  },
};
