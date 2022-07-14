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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  OuiFlexItem,
  OuiText,
  OuiSplitPanel,
} from '../../../../src/components';

const typeToClassNameMap = {
  do: 'guideRule__example--do',
  dont: 'guideRule__example--dont',
};

const typeToSubtitleTextMap = {
  do: 'Do',
  dont: 'Don’t',
};

export const GuideRuleExample = ({
  children,
  className,
  type,
  text,
  minHeight,
  style,
  panelProps,
  panelStyles,
  panelDisplay = 'flex',
  panelColor,
  ...rest
}) => {
  const classes = classNames(
    'guideRule__example',
    typeToClassNameMap[type],
    className
  );

  const styles = { ...style, minHeight };

  if (type && !panelColor) {
    panelColor = type === 'do' ? 'success' : 'danger';
  }

  const doOrDont = type && typeToSubtitleTextMap[type];

  return (
    <OuiFlexItem>
      <OuiSplitPanel.Outer
        className={classes}
        style={styles}
        hasShadow={false}
        borderRadius="none"
        color="transparent"
        hasBorder={false}
        {...rest}>
        <figure>
          <OuiSplitPanel.Inner
            className={classNames('guideRule__example__panel', {
              'guideRule__example__panel--flex': panelDisplay === 'flex',
            })}
            style={panelStyles}
            color={panelColor}
            {...panelProps}>
            {children}
          </OuiSplitPanel.Inner>
          <OuiSplitPanel.Inner color="transparent">
            <OuiText color={type === 'do' ? 'success' : 'danger'} size="s">
              <p>
                {doOrDont && <strong>{doOrDont}.</strong>} {text}
              </p>
            </OuiText>
          </OuiSplitPanel.Inner>
        </figure>
      </OuiSplitPanel.Outer>
    </OuiFlexItem>
  );
};

GuideRuleExample.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
  type: PropTypes.string.isRequired,
  text: PropTypes.node,
  minHeight: PropTypes.number,
  panelProps: PropTypes.any,
};

GuideRuleExample.defaultProps = {
  type: 'do',
};
