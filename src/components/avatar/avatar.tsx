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

import React, { HTMLAttributes, FunctionComponent, CSSProperties } from 'react';
import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import classNames from 'classnames';

import { isColorDark, hexToRgb, isValidHex } from '../../services/color';
import { ouiPaletteColorBlindBehindText, toInitials } from '../../services';
import { IconType, OuiIcon, IconSize, IconColor } from '../icon';

const sizeToClassNameMap = {
  s: 'ouiAvatar--s',
  m: 'ouiAvatar--m',
  l: 'ouiAvatar--l',
  xl: 'ouiAvatar--xl',
};

export const SIZES = keysOf(sizeToClassNameMap);
export type OuiAvatarSize = keyof typeof sizeToClassNameMap;

const typeToClassNameMap = {
  space: 'ouiAvatar--space',
  user: 'ouiAvatar--user',
};

export const TYPES = keysOf(typeToClassNameMap);
export type OuiAvatarType = keyof typeof typeToClassNameMap;

/**
 * The avatar can only display one type of content,
 * initials, or image, or iconType
 */
type _OuiAvatarContent = ExclusiveUnion<
  ExclusiveUnion<
    {
      /**
       * Custom initials (max 2 characters).
       * By default will take the first character (of each word).
       */
      initials?: string;

      /**
       * Specify how many characters to show (1 or 2).
       * By default, will show based on number of words (max first 2).
       */
      initialsLength?: 1 | 2;
    },
    {
      /**
       * Path to an image to display instead of initials
       */
      imageUrl: string;
    }
  >,
  {
    /**
     * Any OUI glyph, logo or custom icon to display instead of initials
     */
    iconType: IconType;
    /**
     * Manually change icon size
     */
    iconSize?: IconSize;
    /**
     * Manually change icon color
     */
    iconColor?: IconColor | null;
  }
>;

export type OuiAvatarProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> &
  CommonProps &
  _OuiAvatarContent & {
    /**
     * Full name of avatar for title attribute and calculating initial if not provided
     */
    name: string;

    /**
     * Accepts hex values like `#FFFFFF`, `#000` otherwise a viz palette color will be assigned.
     * Or pass `'plain'` for an empty shade or `null` to remove entirely and the text/icon color will `inherit`
     */
    color?: string | 'plain' | null;

    /**
     * The type of avatar mainly controlling the shape.
     * `user` = circle
     * `space` = rounded square
     */
    type?: OuiAvatarType;
    size?: OuiAvatarSize;

    /**
     * Grays out the avatar to simulate being disabled
     */
    isDisabled?: boolean;
  };

export const OuiAvatar: FunctionComponent<OuiAvatarProps> = ({
  className,
  color,
  imageUrl,
  initials,
  initialsLength,
  iconType,
  iconSize,
  iconColor,
  name,
  size = 'm',
  type = 'user',
  isDisabled = false,
  style,
  ...rest
}) => {
  const visColors = ouiPaletteColorBlindBehindText();

  const classes = classNames(
    'ouiAvatar',
    sizeToClassNameMap[size],
    typeToClassNameMap[type],
    {
      'ouiAvatar-isDisabled': isDisabled,
      'ouiAvatar--plain': color === 'plain',
    },
    className
  );

  checkValidInitials(initials);

  const avatarStyle: CSSProperties = style || {};
  let iconCustomColor = iconColor;

  const isNamedColor = color === 'plain' || color === null;
  if (!isNamedColor) {
    checkValidColor(color);

    const assignedColor =
      color || visColors[Math.floor(name.length % visColors.length)];
    const textColor = isColorDark(...hexToRgb(assignedColor))
      ? '#FFFFFF'
      : '#000000';

    avatarStyle.backgroundColor = assignedColor;
    avatarStyle.color = textColor;

    // Allow consumers to let the icons keep their default color (like app icons)
    // when passing `iconColor = null`, otherwise continue to pass on `iconColor` or adjust with textColor
    iconCustomColor = iconColor || iconColor === null ? iconColor : textColor;
  }

  if (imageUrl) {
    avatarStyle.backgroundImage = `url(${imageUrl})`;
  }

  let content;
  if (!imageUrl && !iconType) {
    // Create the initials
    const calculatedInitials = toInitials(name, initialsLength, initials);
    content = <span aria-hidden="true">{calculatedInitials}</span>;
  } else if (iconType) {
    content = (
      <OuiIcon
        className="ouiAvatar__icon"
        size={iconSize || size}
        type={iconType}
        aria-label={name}
        color={iconCustomColor === null ? undefined : iconCustomColor}
      />
    );
  }

  return (
    <div
      className={classes}
      style={avatarStyle}
      aria-label={name}
      title={name}
      {...rest}>
      {content}
    </div>
  );
};

// TODO: Migrate to a service
export const checkValidColor = (color: OuiAvatarProps['color']) => {
  const validHex = (color && isValidHex(color)) || color === 'plain';
  if (color && !validHex) {
    throw new Error(
      'OuiAvatar needs to pass a valid color. This can either be a three ' +
        'or six character hex value'
    );
  }
};

function checkValidInitials(initials: OuiAvatarProps['initials']) {
  // Must be a string of 1 or 2 characters
  if (initials && initials.length > 2) {
    console.warn(
      'OuiAvatar only accepts a max of 2 characters for the initials as a string. It is displaying only the first 2 characters.'
    );
  }
}
