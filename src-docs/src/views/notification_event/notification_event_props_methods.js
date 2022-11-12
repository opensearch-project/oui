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
import { OuiPanel } from '../../../../src/components/panel';
import { OuiBadge } from '../../../../src/components/badge';
import { OuiButtonIcon } from '../../../../src/components/button';
import { OuiIcon } from '../../../../src/components/icon';

const CircleIndicator = ({ name }) => (
  <span className="guideDemo__notificationEventCircleIndicator">{name}</span>
);

export default () => {
  return (
    <OuiPanel
      paddingSize="s"
      className="guideDemo__highlightGrid"
      style={{ maxWidth: '540px' }}>
      <div className="guideDemo__notificationEvent">
        <div className="guideDemo__notificationEventTopRow">
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="A" />
            <OuiButtonIcon
              iconType="dot"
              className="ouiNotificationEventReadButton"
              aria-hidden="true"
            />
          </div>

          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="B" />
            <OuiIcon
              type="logoOUI"
              className="guideDemo__notificationEventIcon"
            />
          </div>

          <div className="guideDemo__notificationEventBadge  guideDemo__notificationEventHighlight">
            <CircleIndicator name="C" />
            <OuiBadge
              className="ouiNotificationEventMeta__badge"
              color="hollow">
              type: severity
            </OuiBadge>
          </div>

          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="D" />
            time
          </div>

          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="E" />
            <OuiButtonIcon
              aria-hidden="true"
              iconType="boxesVertical"
              color="subdued"
            />
          </div>
        </div>
        <div className="guideDemo__notificationEventSections">
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="F" /> <span>title</span>
          </div>
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="G" /> <span>messages</span>
          </div>
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="G" /> <span>primaryAction</span>
          </div>
        </div>
      </div>
    </OuiPanel>
  );
};
