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

import {
  OuiIcon,
  OuiToolTip,
  OuiLink,
  OuiText,
  OuiFieldText,
  OuiSpacer,
  OuiButton,
} from '../../../../src/components';

export default () => (
  <div>
    <OuiText>
      <p>
        This tooltip appears on the{' '}
        <OuiToolTip position="top" content="Here is some tooltip text">
          <OuiLink href="#">top</OuiLink>
        </OuiToolTip>
      </p>

      <p>
        This tooltip appears on the{' '}
        <OuiToolTip
          position="left"
          title="Tooltip titles are optional"
          content="Here is some tooltip text. Lets add some more content to see how it wraps.">
          <OuiLink href="#">left</OuiLink>
        </OuiToolTip>{' '}
        and includes the optional title.
      </p>

      <p>
        This tooltip appears on the{' '}
        <OuiToolTip position="right" content="Here is some tooltip text">
          <OuiLink href="#">right</OuiLink>
        </OuiToolTip>
      </p>

      <p>
        This tooltip has a long delay because it might be in a repeatable
        component{' '}
        <OuiToolTip delay="long" content="Here is some tooltip text">
          <OuiLink href="#">wink</OuiLink>
        </OuiToolTip>
      </p>

      <p>
        This tooltip appears on the bottom of this icon:{' '}
        <OuiToolTip position="bottom" content="Here is some tooltip text">
          <OuiIcon tabIndex="0" type="alert" />
        </OuiToolTip>
      </p>
    </OuiText>

    <OuiSpacer />

    <p>
      <OuiToolTip
        position="top"
        content="Here is some tooltip text"
        display="block">
        <OuiButton fullWidth>
          I am a block level tooltip, applied to a button with fullWidth
        </OuiButton>
      </OuiToolTip>
    </p>

    <OuiSpacer />

    <OuiToolTip position="right" content="Works on anything">
      <OuiFieldText
        placeholder="Hover over me"
        aria-label="ToolTip appears on hover"
      />
    </OuiToolTip>

    <OuiSpacer />

    <OuiToolTip
      position="top"
      content={
        <p>
          Works on any kind of element &mdash; buttons, inputs, you name it!
        </p>
      }>
      <OuiButton onClick={() => {}}>Hover me</OuiButton>
    </OuiToolTip>
  </div>
);
