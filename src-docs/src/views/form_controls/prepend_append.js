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

import React, { Fragment, useState } from 'react';

import {
  OuiButtonEmpty,
  OuiButtonIcon,
  OuiFieldText,
  OuiIcon,
  OuiIconTip,
  OuiPopover,
  OuiSpacer,
  OuiSwitch,
  OuiText,
  OuiToolTip,
} from '../../../../src/components';

export default () => {
  const [isCompressed, setCompressed] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isReadOnly, setReadOnly] = useState(false);

  return (
    <Fragment>
      <OuiSwitch
        label="compressed"
        checked={isCompressed}
        onChange={(e) => setCompressed(e.target.checked)}
      />
      &emsp;
      <OuiSwitch
        label="disabled"
        checked={isDisabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      &emsp;
      <OuiSwitch
        label="readOnly"
        checked={isReadOnly}
        onChange={(e) => setReadOnly(e.target.checked)}
      />
      <OuiSpacer />
      <OuiFieldText
        placeholder="String & text in a tooltip"
        prepend="String"
        append={
          <OuiToolTip content="content">
            <OuiText size="s">Tooltip</OuiText>
          </OuiToolTip>
        }
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <OuiSpacer />
      <OuiFieldText
        placeholder="XS empty button in a popover & tooltip"
        prepend={
          <OuiPopover
            button={
              <OuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
                Popover
              </OuiButtonEmpty>
            }
            closePopover={() => {}}
          />
        }
        append={
          <OuiToolTip content="content">
            <OuiButtonEmpty size="xs">Tooltip</OuiButtonEmpty>
          </OuiToolTip>
        }
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <OuiSpacer />
      <OuiFieldText
        placeholder="XS empty buttons with icons"
        prepend={
          <OuiButtonEmpty
            role="button"
            size="xs"
            iconType="arrowDown"
            iconSide="right"
            aria-label="Calendar dropdown">
            <OuiIcon type="calendar" />
          </OuiButtonEmpty>
        }
        append={
          <OuiButtonEmpty size="xs" iconType="gear">
            Tooltip
          </OuiButtonEmpty>
        }
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <OuiSpacer />
      <OuiFieldText
        placeholder="Icon & button icon"
        prepend={<OuiIcon type="vector" />}
        append={<OuiButtonIcon iconType="gear" aria-label="Gear this" />}
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <OuiSpacer />
      <OuiFieldText
        placeholder="Icons in buttons and popovers and tooltips"
        prepend={[
          <OuiIcon type="vector" />,
          <OuiButtonIcon iconType="gear" aria-label="Gear this" />,
        ]}
        append={[
          <OuiPopover
            button={<OuiButtonIcon iconType="gear" aria-label="Gear this" />}
            closePopover={() => {}}
          />,
          <OuiIconTip content="content" />,
        ]}
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <OuiSpacer />
      <OuiFieldText
        placeholder="Icon button in popover & tooltip"
        append={
          <OuiPopover
            button={<OuiButtonIcon iconType="arrowDown" aria-label="Popover" />}
            closePopover={() => {}}
          />
        }
        prepend={
          <OuiToolTip content="content">
            <OuiButtonIcon iconType="gear" aria-label="Gear this" />
          </OuiToolTip>
        }
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <OuiSpacer />
      <OuiFieldText
        placeholder="Icon and string & string and icon button"
        prepend={[<OuiIcon type="vector" />, 'String']}
        append={[
          'String',
          <OuiButtonIcon iconType="gear" aria-label="Gear this" />,
        ]}
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
      <OuiSpacer />
      <OuiFieldText
        placeholder="String and button icon in tooltip & button icon in popover and string "
        prepend={[
          'String',
          <OuiToolTip content="content">
            <OuiButtonIcon iconType="gear" aria-label="Gear this" />
          </OuiToolTip>,
        ]}
        append={[
          <OuiPopover
            button={<OuiButtonIcon iconType="gear" aria-label="Gear this" />}
            closePopover={() => {}}
          />,
          'String',
        ]}
        compressed={isCompressed}
        disabled={isDisabled}
        readOnly={isReadOnly}
        aria-label="Use aria labels when no actual label is in use"
      />
    </Fragment>
  );
};
