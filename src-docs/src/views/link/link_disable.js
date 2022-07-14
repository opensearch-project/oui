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
import {
  OuiLink,
  OuiSwitch,
  OuiSpacer,
  OuiTextColor,
} from '../../../../src/components';

export const LinkDisable = () => {
  const [disableLink, setDisableLink] = useState(true);

  return (
    <div>
      <OuiSwitch
        label="Disable links"
        checked={disableLink}
        onChange={() => setDisableLink(!disableLink)}
      />
      <OuiSpacer size="m" />
      <p>
        This{' '}
        <OuiLink color="accent" disabled={disableLink} onClick={() => {}}>
          paragraph
        </OuiLink>{' '}
        has two{disableLink ? ' disabled ' : ' enabled '}
        <OuiLink color="warning" disabled={disableLink} onClick={() => {}}>
          links
        </OuiLink>{' '}
        in it.
      </p>
      <OuiSpacer size="m" />
      <OuiTextColor color="accent">
        When links are disabled, they inherit the{' '}
        <OuiLink color="success" disabled={disableLink} onClick={() => {}}>
          color
        </OuiLink>{' '}
        of surrounding text.
      </OuiTextColor>
    </div>
  );
};
