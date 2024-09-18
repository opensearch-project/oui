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
  OuiButtonEmpty,
  OuiPopover,
  OuiSpacer,
} from '../../../../src/components';

export const DisplayBreadCrumbsToggles = ({
  canResponsive,
  canTruncate,
  canHideLastBreadCrumb,
  canHideTrailingSeparator,
  canDisableTrailingLink,
  children,
  spacerSize,
}) => {
  const [responsive, setResponsive] = useState(false);
  const [truncate, setTruncate] = useState(true);
  const [hideLastBreadCrumb, setHideLastBreadCrumb] = useState(false);
  const [hideTrailingSeparator, setHideTrailingSeparator] = useState(false);
  const [disableTrailingLink, setDisableTrailingLink] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const canProps = {};
  if (canResponsive) canProps.responsive = responsive;
  if (canTruncate) canProps.truncate = truncate;
  if (canHideLastBreadCrumb) canProps.hideLastBreadCrumb = hideLastBreadCrumb;
  if (canHideTrailingSeparator)
    canProps.hideTrailingSeparator = hideTrailingSeparator;
  if (canDisableTrailingLink)
    canProps.disableTrailingLink = disableTrailingLink;

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
            {canResponsive && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label="responsive"
                  checked={responsive}
                  onChange={(e) => setResponsive(e.target.checked)}
                />
              </OuiFlexItem>
            )}
            {canTruncate && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label="truncate"
                  checked={truncate}
                  onChange={(e) => setTruncate(e.target.checked)}
                />
              </OuiFlexItem>
            )}
            {canHideLastBreadCrumb && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label="hideLastBreadCrumb"
                  checked={hideLastBreadCrumb}
                  onChange={(e) => setHideLastBreadCrumb(e.target.checked)}
                />
              </OuiFlexItem>
            )}
            {canHideTrailingSeparator && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label="hideTrailingSeparator"
                  checked={hideTrailingSeparator}
                  onChange={(e) => setHideTrailingSeparator(e.target.checked)}
                />
              </OuiFlexItem>
            )}
            {canDisableTrailingLink && (
              <OuiFlexItem grow={false}>
                <OuiSwitch
                  compressed
                  label="disableTrailingLink"
                  checked={disableTrailingLink}
                  onChange={(e) => setDisableTrailingLink(e.target.checked)}
                />
              </OuiFlexItem>
            )}
          </OuiFlexGroup>
        </div>
      </OuiPopover>
    </Fragment>
  );
};

DisplayBreadCrumbsToggles.propTypes = {
  canResponsive: PropTypes.bool,
  canTruncate: PropTypes.bool,
  canHideLastBreadCrumb: PropTypes.bool,
  canHideTrailingSeparator: PropTypes.bool,
  canDisableTrailingLink: PropTypes.bool,
  spacerSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']),
};

DisplayBreadCrumbsToggles.defaultProps = {
  canResponsive: true,
  canTruncate: true,
  canHideLastBreadCrumb: false,
  canHideTrailingSeparator: false,
  canDisableTrailingLink: false,
  spacerSize: 'l',
};
