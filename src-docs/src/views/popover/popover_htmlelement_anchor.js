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

/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect } from 'react';

import { render } from '../../../../src/services/react_dom';

import { OuiWrappingPopover } from '../../../../src/components';

const PopoverApp = (props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    props.anchor.addEventListener('click', onButtonClick);
    return () => props.anchor.removeEventListener('click', onButtonClick);
  }, [props.anchor]);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  return (
    <OuiWrappingPopover
      button={props.anchor}
      isOpen={isPopoverOpen}
      closePopover={closePopover}>
      <div>Normal JSX content populates the popover.</div>
    </OuiWrappingPopover>
  );
};

export default () => {
  useEffect(() => {
    const thisAnchor = document.querySelector('#popoverAnchorButton');

    // `container` can be created here or use an existing DOM element
    // the popover DOM is positioned independently of where the container exists
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = render(<PopoverApp anchor={thisAnchor} />, container);

    return () => {
      root.unmount();
    };
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
  <button id="popoverAnchorButton" class="ouiButton ouiButton--primary">
    <span class="ouiButton__content">This is an HTML button</span>
  </button>
        `,
      }}
    />
  );
};
