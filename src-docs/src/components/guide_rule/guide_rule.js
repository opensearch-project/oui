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
import { OuiFlexGroup } from '../../../../src/components';

import { GuideRuleDescription } from './guide_rule_description';

export const GuideRule = ({
  children,
  className,
  heading,
  description,
  ...rest
}) => {
  const classes = classNames(
    'guideRule',
    {
      'guideRule--hasHeading': heading,
      'guideRule--hasDescription': description,
    },
    className
  );

  let descriptionNode;

  if (description) {
    descriptionNode = (
      <GuideRuleDescription heading={heading} description={description} />
    );
  }

  return (
    <div className={classes} {...rest}>
      {descriptionNode}

      <OuiFlexGroup className="guideRule__exampleRow" gutterSize="xl" wrap>
        {children}
      </OuiFlexGroup>
    </div>
  );
};

GuideRule.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};
