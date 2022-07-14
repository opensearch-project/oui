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

import React, {
  FunctionComponent,
  HTMLAttributes,
  useState,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../common';
import { OuiOverlayMask } from '../overlay_mask';

import { OuiIcon } from '../icon';

import { useOuiI18n } from '../i18n';

import { OuiFocusTrap } from '../focus_trap';

import { keys } from '../../services';
import { useInnerText } from '../inner_text';

type ImageSize = 's' | 'm' | 'l' | 'xl' | 'fullWidth' | 'original';
type Floats = 'left' | 'right';
type Margins = 's' | 'm' | 'l' | 'xl';

const sizeToClassNameMap: { [size in ImageSize]: string } = {
  s: 'ouiImage--small',
  m: 'ouiImage--medium',
  l: 'ouiImage--large',
  xl: 'ouiImage--xlarge',
  fullWidth: 'ouiImage--fullWidth',
  original: 'ouiImage--original',
};

const marginToClassNameMap: { [margin in Margins]: string } = {
  s: 'ouiImage--marginSmall',
  m: 'ouiImage--marginMedium',
  l: 'ouiImage--marginLarge',
  xl: 'ouiImage--marginXlarge',
};

const floatToClassNameMap: { [float in Floats]: string } = {
  left: 'ouiImage--floatLeft',
  right: 'ouiImage--floatRight',
};

export const SIZES = Object.keys(sizeToClassNameMap);

type FullScreenIconColor = 'light' | 'dark';

const fullScreenIconColorMap: { [color in FullScreenIconColor]: string } = {
  light: 'ghost',
  dark: 'default',
};

type _OuiImageSrcOrUrl = ExclusiveUnion<
  {
    /**
     * Requires either `src` or `url` but defaults to using `src` if both are provided
     */
    src: string;
  },
  {
    url: string;
  }
>;

export type OuiImageProps = CommonProps &
  _OuiImageSrcOrUrl &
  HTMLAttributes<HTMLImageElement> & {
    /**
     * Separate from the caption is a title on the alt tag itself.
     * This one is required for accessibility.
     */
    alt: string;
    /**
     * Accepts `s` / `m` / `l` / `xl` / `original` / `fullWidth` / or a CSS size of `number` or `string`.
     * `fullWidth` will set the figure to stretch to 100% of its container.
     * `string` and `number` types will max both the width or height, whichever is greater.
     */
    size?: ImageSize | number | string;
    /**
     * Changes the color of the icon that floats above the image when it can be clicked to fullscreen.
     * The default value of `light` is fine unless your image has a white background, in which case you should change it to `dark`.
     */
    fullScreenIconColor?: FullScreenIconColor;
    /**
     * Provides the visible caption to the image
     */
    caption?: ReactNode;
    /**
     * When set to `true` (default) will apply a slight shadow to the image
     */
    hasShadow?: boolean;
    /**
     * When set to `true` will make the image clickable to a larger version
     */
    allowFullScreen?: boolean;
    /**
     * Float the image to the left or right. Useful in large text blocks.
     */
    float?: Floats;
    /**
     * Margin around the image.
     */
    margin?: Margins;
  };

export const OuiImage: FunctionComponent<OuiImageProps> = ({
  className,
  url,
  src,
  size = 'original',
  caption,
  hasShadow,
  allowFullScreen,
  fullScreenIconColor = 'light',
  alt,
  style,
  float,
  margin,
  ...rest
}) => {
  const [isFullScreenActive, setIsFullScreenActive] = useState(false);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      closeFullScreen();
    }
  };

  const closeFullScreen = () => {
    setIsFullScreenActive(false);
  };

  const openFullScreen = () => {
    setIsFullScreenActive(true);
  };

  const customStyle: React.CSSProperties = { ...style };

  let classes = classNames(
    'ouiImage',
    {
      'ouiImage--hasShadow': hasShadow,
      'ouiImage--allowFullScreen': allowFullScreen,
    },
    margin ? marginToClassNameMap[margin] : null,
    float ? floatToClassNameMap[float] : null,
    className
  );

  if (typeof size === 'string' && SIZES.includes(size)) {
    classes = `${classes} ${sizeToClassNameMap[size as ImageSize]}`;
  } else {
    classes = `${classes}`;
    customStyle.maxWidth = size;
    customStyle.maxHeight = size;
    // Set width back to auto to ensure aspect ratio is kept
    customStyle.width = 'auto';
  }

  let allowFullScreenButtonClasses = 'ouiImage__button';

  // when the button is not custom we need it to go full width
  // to match the parent '.ouiImage' width except when the size is original
  if (typeof size === 'string' && size !== 'original' && SIZES.includes(size)) {
    allowFullScreenButtonClasses = `${allowFullScreenButtonClasses} ouiImage__button--fullWidth`;
  } else {
    allowFullScreenButtonClasses = `${allowFullScreenButtonClasses}`;
  }

  const [optionalCaptionRef, optionalCaptionText] = useInnerText();
  let optionalCaption;
  if (caption) {
    optionalCaption = (
      <figcaption ref={optionalCaptionRef} className="ouiImage__caption">
        {caption}
      </figcaption>
    );
  }

  const allowFullScreenIcon = (
    <OuiIcon
      type="fullScreen"
      color={fullScreenIconColorMap[fullScreenIconColor]}
      className="ouiImage__icon"
    />
  );

  const fullScreenDisplay = (
    <OuiOverlayMask
      data-test-subj="fullScreenOverlayMask"
      onClick={closeFullScreen}>
      <OuiFocusTrap clickOutsideDisables={true}>
        <>
          <figure
            className="ouiImage ouiImage-isFullScreen"
            aria-label={optionalCaptionText}>
            <button
              type="button"
              aria-label={useOuiI18n(
                'ouiImage.closeImage',
                'Close full screen {alt} image',
                { alt }
              )}
              className="ouiImage__button"
              data-test-subj="deactivateFullScreenButton"
              onClick={closeFullScreen}
              onKeyDown={onKeyDown}>
              <img
                src={src || url}
                alt={alt}
                className="ouiImage-isFullScreen__img"
                {...rest}
              />
            </button>
            {optionalCaption}
          </figure>
          <OuiIcon
            type="cross"
            color="default"
            className="ouiImage-isFullScreenCloseIcon"
          />
        </>
      </OuiFocusTrap>
    </OuiOverlayMask>
  );

  const fullscreenLabel = useOuiI18n(
    'ouiImage.openImage',
    'Open full screen {alt} image',
    { alt }
  );

  if (allowFullScreen) {
    return (
      <figure className={classes} aria-label={optionalCaptionText}>
        <button
          type="button"
          aria-label={fullscreenLabel}
          className={allowFullScreenButtonClasses}
          data-test-subj="activateFullScreenButton"
          onClick={openFullScreen}>
          <img
            style={customStyle}
            src={src || url}
            alt={alt}
            className="ouiImage__img"
            {...rest}
          />
          {allowFullScreenIcon}
        </button>
        {isFullScreenActive && fullScreenDisplay}
        {optionalCaption}
      </figure>
    );
  } else {
    return (
      <figure className={classes} aria-label={optionalCaptionText}>
        <img
          style={customStyle}
          src={src || url}
          className="ouiImage__img"
          alt={alt}
          {...rest}
        />
        {optionalCaption}
      </figure>
    );
  }
};
