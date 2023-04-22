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

import {
  OuiCallOut,
  OuiCode,
  OuiOutsideClickDetector,
} from '../../../../src/components';

import OutsideClickDetector from './outside_click_detector';
const outsideClickDetectorSource = require('./outside_click_detector?raw');
const outsideClickDetectorHtml = renderToHtml(OutsideClickDetector);

export const OutsideClickDetectorExample = {
  title: 'Outside click detector',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: outsideClickDetectorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: outsideClickDetectorHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            Use <strong>OuiOutsideClickDetector</strong> to trigger a handler
            when the user clicks outside of the child element.
          </p>
          <OuiCallOut
            title={
              <span>
                <strong>OuiSelect</strong> normalizes browser event
                inconsistencies with <OuiCode>{'<select />'}</OuiCode> elements
                and as a result may not trigger{' '}
                <strong>OuiOutsideClickDetector</strong> when targeted with
                mouse events.
              </span>
            }
            color="warning"
          />
        </React.Fragment>
      ),
      props: { OuiOutsideClickDetector },
      demo: <OutsideClickDetector />,
    },
  ],
};
