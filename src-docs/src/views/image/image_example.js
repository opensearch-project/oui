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

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { OuiCode, OuiImage } from '../../../../src/components';
OuiImage.__docgenInfo.props.src.required = true;

import imageConfig from './playground';

import Image from './image';
const imageSource = require('./image?raw');
const imageHtml = renderToHtml(Image);
const imageSnippet = `<OuiImage
  alt={description}
  src={someSrc}
/>
`;

import ImageSizes from './image_size';
const imageSizesSource = require('./image_size?raw');
const imageSizesHtml = renderToHtml(ImageSizes);
const imageSizesSnippet = `<OuiImage
  size="l"
  alt={description}
  src={someSrc}
/>
`;

import ImageZoom from './image_zoom';
const imageZoomSource = require('./image_zoom?raw');
const imageZoomHtml = renderToHtml(ImageZoom);
const imageZoomSnippet = `<OuiImage
  allowFullScreen
  alt={description}
  src={someSrc}
/>
`;

import ImageFloat from './float';
import { OuiCallOut } from '../../../../src/components/call_out';
import { Fragment } from 'react-is';
const imageFloatSource = require('./float?raw');
const imageFloatHtml = renderToHtml(ImageFloat);
const imageFloatSnippet = `<OuiImage
  alt={description}
  src={someSrc}
  float="left"
  margin="l"
/>
`;

export const ImageExample = {
  title: 'Image',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: imageSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: imageHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use <strong>OuiImage</strong> when you need to place a static image
            into a page with an optional caption.
          </p>
        </div>
      ),
      props: { OuiImage },
      demo: <Image />,
      snippet: imageSnippet,
    },
    {
      title: 'Click an image for a full screen version',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: imageZoomSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: imageZoomHtml,
        },
      ],
      text: (
        <p>
          Apply the <OuiCode>allowFullScreen</OuiCode> prop to make the image
          clickable and show a full screen version. Note that the second image
          also passes{' '}
          <OuiCode language="js">fullScreenIconColor=&quot;dark&quot;</OuiCode>{' '}
          to change icon color to better contrast against the light background
          of that image.
        </p>
      ),
      demo: <ImageZoom />,
      snippet: imageZoomSnippet,
    },
    {
      title: 'Images can be sized',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: imageSizesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: imageSizesHtml,
        },
      ],
      text: (
        <p>
          Images can be sized by passing the <OuiCode>size</OuiCode> prop a
          value of{' '}
          <OuiCode>
            s / m / l / xl / original / fullWidth / number / string
          </OuiCode>
          . This size sets the <strong>maximum</strong> length of the longest
          edge of the image, whether that is height or width, and scales it.
          Only the provided sizing values will also increase the size of a
          smaller image.
        </p>
      ),
      demo: <ImageSizes />,
      snippet: imageSizesSnippet,
    },
    {
      title: 'Float images within text',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: imageFloatSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: imageFloatHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            When using <OuiCode>OuiImage</OuiCode> within{' '}
            <OuiCode>OuiText</OuiCode> it is often useful to apply floats.
            Almost always you&apos;ll want to pair the <OuiCode>float</OuiCode>{' '}
            prop usage, with a <OuiCode>margin</OuiCode> prop usage to give
            space around your image. Margins, when used in combo with floats,
            will adjust depending upon the position of the float.
          </p>
          <OuiCallOut title="Be careful with floats" color="warning">
            Floats should only be used on images within <strong>large</strong>{' '}
            bodies of text. Specifically, we only suggest using them with{' '}
            <OuiCode>OuiText</OuiCode> which comes automatically clears floats.
          </OuiCallOut>
        </Fragment>
      ),
      demo: <ImageFloat />,
      snippet: imageFloatSnippet,
    },
  ],
  playground: imageConfig,
};
