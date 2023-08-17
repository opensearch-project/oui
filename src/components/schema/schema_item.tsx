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

import React, { FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { OuiButtonIcon, OuiButtonIconPropsForButton } from '../button';
import { OuiToolTip, OuiToolTipProps } from '../tool_tip';
import { IconType } from '../icon';
import { OuiToken } from '../token';

export interface Action extends OuiButtonIconPropsForButton {
  tooltip?: Omit<OuiToolTipProps, 'children'>;
}

/**
 * Props for the OuiSchemaItem component.
 * @public
 */
export type OuiSchemaItemProps = CommonProps & {
  /** The icon type to display. */
  iconType?: IconType;
  /** The label to display. */
  label: string;
  /** An array of actions to display. Limit 2 */
  actions?: Action[];
  /** Whether the item is compressed. */
  compressed?: boolean;
  /** Whether the item is displayed with a panel. */
  withPanel?: boolean;
};

/**
 * A component that displays a schema item.
 * @public
 */
export const OuiSchemaItem: FunctionComponent<OuiSchemaItemProps> = ({
  className,
  iconType,
  label,
  actions = [],
  compressed,
  withPanel,
  ...rest
}) => {
  const classes = classNames(
    'ouiSchemaItem',
    {
      'ouiSchemaItem--compressed': compressed,
      'ouiSchemaItem--withPanel': withPanel,
    },
    className
  );

  const filteredActions = actions.slice(0, 2);

  return (
    <div className={classes} {...rest}>
      {iconType && (
        <OuiToken
          className="ouiSchemaItem__icon"
          iconType={iconType}
          size={compressed ? 'xs' : 's'}
        />
      )}
      <div className="ouiSchemaItem__label">{label}</div>
      <div className="ouiSchemaItem__actions">
        {filteredActions.map(({ tooltip, ...action }, index) =>
          tooltip ? (
            <OuiToolTip key={index} {...tooltip}>
              <OuiButtonIcon
                key={index}
                {...action}
                size={compressed ? 'xs' : 's'}
              />
            </OuiToolTip>
          ) : (
            <OuiButtonIcon
              key={index}
              {...action}
              size={compressed ? 'xs' : 's'}
            />
          )
        )}
      </div>
    </div>
  );
};
