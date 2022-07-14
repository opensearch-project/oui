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

import { OuiMarkdownFormat } from '../../../../src';

const markdownContent = `Beyond Remark's base syntax, **OuiMarkdownFormat** bundles these abilities by default:

\`:smile:\` we support emojis :smile:!

\`!{tooltip[anchor text](Tooltip content)}\` syntax can render !{tooltip[tooltips like this](I am Jack's helpful tooltip content)}

We also support checkboxes so that

\`\`\`
- [ ] Checkboxes
- [x] Can be filled
- [ ] Or empty
\`\`\`

turns into

- [ ] Checkboxes
- [x] Can be filled
- [ ] Or empty

Note that you'll need to use *OuiMarkdownEditor* to make those checkboxes dynamic.
`;

export default () => {
  return <OuiMarkdownFormat>{markdownContent}</OuiMarkdownFormat>;
};
