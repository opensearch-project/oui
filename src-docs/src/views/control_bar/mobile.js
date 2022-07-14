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

import { OuiButton, OuiControlBar } from '../../../../src/components';

export default () => {
  const [isDisplaying, setDisplay] = useState(false);

  const toggleDisplay = () => {
    setDisplay(!isDisplaying);
  };

  const controls = [
    {
      controlType: 'icon',
      id: 'icon',
      iconType: 'folderClosed',
      'aria-label': 'folder',
      className: 'oui-hideFor--m oui-hideFor--l oui-hideFor--xl',
    },
    {
      controlType: 'breadcrumbs',
      id: 'current_file_path',
      className: 'oui-hideFor--s oui-hideFor--xs',
      breadcrumbs: [
        {
          text: 'src',
        },
        {
          text: 'components',
        },
      ],
    },
    {
      controlType: 'spacer',
    },
    {
      controlType: 'icon',
      id: 'github_icon',
      iconType: 'logoGithub',
      'aria-label': 'Github',
    },
    {
      controlType: 'text',
      id: 'github_text',
      text: 'Open in Github',
    },
  ];

  let display;

  if (isDisplaying) {
    display = <OuiControlBar controls={controls} showOnMobile />;
  }

  return (
    <div>
      <OuiButton onClick={toggleDisplay}>Toggle mobile example</OuiButton>
      {display}
    </div>
  );
};
