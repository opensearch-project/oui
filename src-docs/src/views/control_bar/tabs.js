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

import { OuiButton, OuiControlBar, OuiText } from '../../../../src/components';

export default () => {
  const [tabContent, setTabContent] = useState('');
  const [isDisplaying, setDisplay] = useState(false);
  const [contentIsVisible, setVisibility] = useState(false);

  const closeTheHatch = () => {
    setVisibility(false);
  };

  const tabOne = () => {
    setVisibility(true);

    setTabContent(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    );
  };

  const tabTwo = () => {
    setVisibility(true);

    setTabContent(
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
    );
  };

  const toggleDisplay = () => {
    setVisibility(false);

    setDisplay(!isDisplaying);
  };

  const controls = [
    {
      controlType: 'tab',
      id: 'tab_1',
      label: 'Tab 1',
      onClick: tabOne,
    },
    {
      controlType: 'tab',
      id: 'tab_2',
      label: 'Tab 2',
      onClick: tabTwo,
    },
    {
      controlType: 'button',
      id: 'notifications',
      label: 'Notifications',
      onClick: () => {},
      color: 'danger',
      iconType: 'bell',
      'data-test-subj': 'look',
    },
    {
      controlType: 'button',
      id: 'close',
      label: 'Close',
      fill: true,
      onClick: closeTheHatch,
      className: 'customClassName',
      color: 'primary',
    },
  ];

  let display;

  if (isDisplaying) {
    display = (
      <OuiControlBar
        controls={controls}
        size="m"
        showContent={contentIsVisible}
        showOnMobile>
        {tabContent !== '' && (
          <div style={{ padding: '1rem' }}>
            <OuiText>{tabContent}</OuiText>
          </div>
        )}
      </OuiControlBar>
    );
  }

  return (
    <div>
      <OuiButton onClick={toggleDisplay}>Toggle tabs example</OuiButton>
      {display}
    </div>
  );
};
