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

import React, { cloneElement, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  OuiFlexGroup,
  OuiSwitch,
  OuiFlexItem,
  OuiToolTip,
  OuiIcon,
  OuiButtonEmpty,
  OuiPopover,
  OuiSpacer,
} from '../../../../src/components';

export const DisplayToggles = ({
  canIsDisabled,
  canDisabled,
  canReadOnly,
  canLoading,
  canCompressed,
  canFullWidth,
  canPrepend,
  canAppend,
  canInvalid,
  children,
  extras,
  spacerSize,
}) => {
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [prepend, setPrepend] = useState(false);
  const [append, setAppend] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const canProps = {};
  if (canDisabled) canProps.disabled = disabled;
  if (canIsDisabled) canProps.isDisabled = disabled;
  if (canReadOnly) canProps.readOnly = readOnly;
  if (canLoading) canProps.isLoading = loading;
  if (canFullWidth) canProps.fullWidth = fullWidth;
  if (canCompressed) canProps.compressed = compressed;
  if (canPrepend && prepend) canProps.prepend = 'Prepend';
  if (canAppend && append) canProps.append = 'Append';
  if (canInvalid) canProps.isInvalid = invalid;

  return (
    <Fragment>
      {cloneElement(children, canProps)}
      <OuiSpacer size={spacerSize} />
      <OuiPopover
        panelPaddingSize="s"
        isOpen={isPopoverOpen}
        closePopover={() => {
          setIsPopoverOpen(false);
        }}
        button={
          <OuiButtonEmpty
            iconType="controlsHorizontal"
            size="xs"
            onClick={() => {
              setIsPopoverOpen(!isPopoverOpen);
            }}>
            Display toggles
          </OuiButtonEmpty>
        }>
        <div>
          <OuiFlexGroup
            wrap={true}
            direction="column"
            gutterSize="s"
            responsive={false}>
            {(canDisabled || canIsDisabled) && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label={'disabled'}
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
              </OuiFlexItem>
            )}
            {canReadOnly && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label={'readOnly'}
                  checked={readOnly}
                  onChange={(e) => setReadOnly(e.target.checked)}
                />
              </OuiFlexItem>
            )}
            {canLoading && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label={'loading'}
                  checked={loading}
                  onChange={(e) => setLoading(e.target.checked)}
                />
              </OuiFlexItem>
            )}
            {canInvalid && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label={'invalid'}
                  checked={invalid}
                  onChange={(e) => setInvalid(e.target.checked)}
                />
              </OuiFlexItem>
            )}
            {canFullWidth && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label={'fullWidth'}
                  checked={fullWidth}
                  onChange={(e) => setFullWidth(e.target.checked)}
                />
              </OuiFlexItem>
            )}
            {canCompressed && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label={
                    <span>
                      compressed{' '}
                      <OuiToolTip content="Compressed usages are very specific. Click to view full compressed documentation">
                        <a href="/#/forms/compressed-forms">
                          <OuiIcon type="help" />
                        </a>
                      </OuiToolTip>
                    </span>
                  }
                  checked={compressed}
                  onChange={(e) => setCompressed(e.target.checked)}
                />
              </OuiFlexItem>
            )}
            {canPrepend && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label={'prepend'}
                  checked={prepend}
                  onChange={(e) => setPrepend(e.target.checked)}
                />
              </OuiFlexItem>
            )}
            {canAppend && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label={'append'}
                  checked={append}
                  onChange={(e) => setAppend(e.target.checked)}
                />
              </OuiFlexItem>
            )}
            {extras &&
              extras.map((extra, index) => {
                return (
                  <OuiFlexItem key={index} grow={false}>
                    {extra}
                  </OuiFlexItem>
                );
              })}
          </OuiFlexGroup>
        </div>
      </OuiPopover>
    </Fragment>
  );
};

DisplayToggles.propTypes = {
  canIsDisabled: PropTypes.bool,
  canDisabled: PropTypes.bool,
  canReadOnly: PropTypes.bool,
  canLoading: PropTypes.bool,
  canCompressed: PropTypes.bool,
  canFullWidth: PropTypes.bool,
  canPrepend: PropTypes.bool,
  canAppend: PropTypes.bool,
  canInvalid: PropTypes.bool,
  extras: PropTypes.arrayOf(PropTypes.node),
  spacerSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']),
};

DisplayToggles.defaultProps = {
  canIsDisabled: false,
  canDisabled: true,
  canReadOnly: true,
  canLoading: true,
  canCompressed: true,
  canFullWidth: true,
  canInvalid: true,
  canPrepend: false,
  canAppend: false,
  spacerSize: 'l',
};
