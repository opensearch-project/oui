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
import html from 'html';
import { render } from '../../../../src/services/react_dom';

const renderTarget = document.createElement('div');
export function renderToHtml(ComponentReference, props = {}) {
  // If there's a failure, just return an empty string. The actual component itself should
  // trip an error boundary in the UI when it fails.
  try {
    // Create the React element, render it and get its HTML, then format it prettily.
    // the .html() call below renders the contents of the first node, so wrap everything in a div
    const element = <ComponentReference {...props} />;

    return {
      render() {
        const root = render(element, renderTarget);
        const htmlString = renderTarget.innerHTML;
        const result = htmlString;
        root.unmount();

        return html.prettyPrint(result, {
          indent_size: 2,
          unformatted: [], // Expand all tags, including spans
        });
      },
    };
  } catch (e) {
    return '';
  }
}
