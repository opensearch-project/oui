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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent, useState } from 'react';
import { OuiAccordion } from '../accordion';
import { htmlIdGenerator } from '../../services';
import { useOuiI18n } from '../i18n';
import { OuiText } from '../text';

export type OuiNotificationEventMessagesProps = {
  /*
   * An array of strings that get individually wrapped in `<p>` tags
   */
  messages: string[];
  /**
   * A unique, human-friendly name for the event to be used in aria attributes (e.g. "alert-critical-01", "cloud-no-severity-12", etc..).
   */
  eventName: string;
};

export const OuiNotificationEventMessages: FunctionComponent<OuiNotificationEventMessagesProps> = ({
  messages,
  eventName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesLength = messages.length;

  const accordionButtonText = useOuiI18n(
    'ouiNotificationEventMessages.accordionButtonText',
    '+ {messagesLength} more',
    { messagesLength: messagesLength - 1 }
  );

  const accordionAriaLabelButtonText = useOuiI18n(
    'ouiNotificationEventMessages.accordionAriaLabelButtonText',
    '+ {messagesLength} messages for {eventName}',
    {
      messagesLength: messagesLength - 1,
      eventName,
    }
  );

  const accordionHideText = useOuiI18n(
    'ouiNotificationEventMessages.accordionHideText',
    'hide'
  );

  const buttonContentText = isOpen
    ? `${accordionButtonText} (${accordionHideText})`
    : accordionButtonText;

  return (
    <div className="ouiNotificationEventMessages">
      {messages && messagesLength === 1 ? (
        <OuiText size="s" color="subdued">
          <p>{messages}</p>
        </OuiText>
      ) : (
        <>
          <OuiText size="s" color="subdued">
            <p>{messages[0]}</p>
          </OuiText>

          <OuiAccordion
            onToggle={setIsOpen}
            buttonProps={{ 'aria-label': accordionAriaLabelButtonText }}
            id={htmlIdGenerator('ouiNotificationEventMessagesAccordion')()}
            className="ouiNotificationEventMessages__accordion"
            buttonContent={buttonContentText}
            buttonClassName="ouiNotificationEventMessages__accordionButton"
            arrowDisplay="none">
            <div className="ouiNotificationEventMessages__accordionContent">
              {messages
                .map((notification, index) => (
                  <OuiText size="s" key={index} color="subdued">
                    <p>{notification}</p>
                  </OuiText>
                ))
                .slice(1)}
            </div>
          </OuiAccordion>
        </>
      )}
    </div>
  );
};
