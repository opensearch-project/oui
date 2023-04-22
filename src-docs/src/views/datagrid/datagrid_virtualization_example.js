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

import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';
import { OuiCallOut, OuiCode } from '../../../../src/components';
import { GuideSectionTypes } from '../../components';

import DataGridVirtualization from './virtualization';
const dataGridVirtualizationSource = require('./virtualization?raw');
const dataGridVirtualizationHtml = renderToHtml(DataGridVirtualization);

import DataGridVirtualizationConstrained from './virtualization_constrained';
const dataGridVirtualizationConstrainedSource = require('./virtualization_constrained?raw');
const dataGridVirtualizationConstrainedHtml = renderToHtml(
  DataGridVirtualizationConstrained
);

export const DataGridVirtualizationExample = {
  title: 'Data grid virtualization',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridVirtualizationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridVirtualizationHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Creating a lot of DOM nodes is computationally expensive, and{' '}
            <strong>OuiDataGrid</strong> uses a couple wrapping divs to build
            each cell. To help offset the cost of larger tables, cell
            virtualization can be opted into by constraining the grid&apos;s
            height and/or width. There are two ways to enable this
            functionality. First, <OuiCode>height</OuiCode> and/or{' '}
            <OuiCode>width</OuiCode> can be passed as props, which are applied
            to the grid&apos;s container style. Alternatively, if{' '}
            <strong>OuiDataGrid</strong> is unable to render at the full
            dimensions it needs due to screen real estate or other DOM
            constraints, it will overflow within a scrollable container and only
            render the visible cells.
          </p>

          <OuiCallOut
            title={
              <>
                Never toggle the height between a value and{' '}
                <OuiCode>undefined</OuiCode>.
              </>
            }
            color="warning">
            <p>
              Similar to React&apos;s rule of not switching between a controlled
              and uncontrolled input, <OuiCode>OuiDataGrid</OuiCode> does not
              accommodate for its height switching to or from{' '}
              <OuiCode>undefined</OuiCode>. For demonstration purposes, the
              example below uses a <OuiCode>key</OuiCode> to force{' '}
              <strong>OuiDataGrid</strong> to completely remount when its height
              changes between constrained & constrained heights.
            </p>
          </OuiCallOut>
        </Fragment>
      ),
      components: { DataGridVirtualization },
      demo: <DataGridVirtualization />,
    },
    {
      title: 'Constrained by DOM',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridVirtualizationConstrainedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridVirtualizationConstrainedHtml,
        },
      ],
      demo: <DataGridVirtualizationConstrained />,
    },
  ],
};
