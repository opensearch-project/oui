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

import React, { useState, Fragment } from 'react';

import { OuiSelectable } from '../../../../src/components/selectable';
import { OuiSwitch } from '../../../../src/components/form/switch';
import { OuiSpacer } from '../../../../src/components/spacer';

export default () => {
  const [useCustomMessage, setUseCustomMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emptyMessage = 'No custom tags created';
  const loadingMessage = "Hey, I'm loading here!";

  return (
    <Fragment>
      <OuiSwitch
        label="Custom message"
        onChange={(e) => setUseCustomMessage(e.target.checked)}
        checked={useCustomMessage}
      />
      &emsp;
      <OuiSwitch
        label="Show loading"
        onChange={(e) => setIsLoading(e.target.checked)}
        checked={isLoading}
      />
      <OuiSpacer />
      <OuiSelectable
        aria-label="Messaging example"
        options={[]}
        style={{ width: 300 }}
        listProps={{ bordered: true }}
        isLoading={isLoading}
        loadingMessage={useCustomMessage ? loadingMessage : undefined}
        emptyMessage={useCustomMessage ? emptyMessage : undefined}>
        {(list) => list}
      </OuiSelectable>
    </Fragment>
  );
};
