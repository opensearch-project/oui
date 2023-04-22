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
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiFormRow,
  OuiToolTip,
  OuiCallOut,
  OuiText,
  OuiSpacer,
} from '../../../../src/components';

import FormCompressed from './form_compressed';
const formCompressedSource = require('./form_compressed?raw');
const formCompressedHtml = renderToHtml(FormCompressed);

import FormHorizontal from './form_horizontal';
const formHorizontalSource = require('./form_horizontal?raw');
const formHorizontalHtml = renderToHtml(FormHorizontal);

import FormHelp from './form_horizontal_help';
const formHelpSource = require('./form_horizontal_help?raw');
const formHelpHtml = renderToHtml(FormHelp);

import FormPopover from './form_compressed_popover';
const formPopoverSource = require('./form_compressed_popover?raw');
const formPopoverHtml = renderToHtml(FormPopover);

import ComplexExample from './complex_example';
const ComplexExampleSource = require('./complex_example?raw');
const ComplexExampleHtml = renderToHtml(ComplexExample);

export const FormCompressedExample = {
  title: 'Compressed forms',
  intro: (
    <Fragment>
      <OuiText>
        <p>
          Also known as <strong>Editor-Style Controls</strong>, compressed forms
          and controls were specifically created for use when space is at a
          premium. They are not intended for use when the form is the main
          objective of the page. They work best in editor-style applications
          where form controls are being used to create or edit content on the
          page.
        </p>
      </OuiText>
      <OuiSpacer />
      <OuiCallOut
        color="danger"
        title="Do not use compressed and non-compressed form controls in the same form."
      />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formCompressedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formCompressedHtml,
        },
      ],
      text: (
        <p>
          To use compressed forms, pass{' '}
          <OuiCode language="js">display=&quot;rowCompressed&quot;</OuiCode> to
          the OuiFormRows and <OuiCode language="js">compressed=true</OuiCode>{' '}
          to the form controls themselves.
        </p>
      ),
      props: {
        OuiFormRow,
      },
      demo: <FormCompressed />,
      snippet: [
        `<OuiFormRow
  label="Text field"
  display="rowCompressed"
>
  <OuiFieldText compressed />
</OuiFormRow>`,
      ],
    },
    {
      title: 'Column layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formHorizontalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formHorizontalHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Editor-style controls can be displayed in a two column layout for
            even better use of limited space, just pass{' '}
            <OuiCode language="js">
              display=&quot;columnCompressed&quot;
            </OuiCode>{' '}
            to align the labels and inputs side by side.
          </p>
          <p>
            <strong>OuiSwitches</strong> are a special case in which so you must
            pass <OuiCode language="js">{'"columnCompressedSwitch"'}</OuiCode>{' '}
            to the OuiFormRow as the display property.
          </p>
        </Fragment>
      ),
      props: {
        OuiFormRow,
      },
      demo: <FormHorizontal />,
      snippet: [
        `<OuiFormRow
  label="Text field"
  display="columnCompressed"
>
  <OuiFieldText compressed />
</OuiFormRow>`,
        `<OuiFormRow
  label="Switch"
  display="columnCompressedSwitch"
>
  <OuiSwitch compressed />
</OuiFormRow>`,
      ],
    },
    {
      title: 'Contextual help',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formHelpSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formHelpHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            When using compressed, horizontal form styles, it is best not to
            overload the UI with expansive help text. If it&apos;s short and
            part of the validation, use <OuiCode>helpText</OuiCode>. However, if
            it&apos;s an explanation of the control, consider wraping the label
            with an{' '}
            <Link to="/display/tooltip">
              <strong>OuiToolTip</strong>
            </Link>{' '}
            and appending the <OuiCode>questionInCircle</OuiCode> icon to it.
          </p>
        </Fragment>
      ),
      props: {
        OuiFormRow,
        OuiToolTip,
      },
      demo: <FormHelp />,
      snippet: [
        `<OuiFormRow
  display="columnCompressed"
  label=""
  helpText="">
  <OuiFieldText compressed />
</OuiFormRow>`,
        `<OuiFormRow
  display="columnCompressed"
  label={
    <OuiToolTip content="">
      <span>
        Label <OuiIcon type="questionInCircle" color="subdued" />
      </span>
    </OuiToolTip>
  }>
  <OuiFieldText compressed />
</OuiFormRow>`,
      ],
    },
    {
      title: 'In a popover',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formPopoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formPopoverHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Always use the compressed version of forms and elements when they
            exist inside of a<Link to="/layout/popover">popover</Link>.
          </p>
        </Fragment>
      ),
      demo: <FormPopover />,
    },
    {
      title: 'Complex example',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ComplexExampleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ComplexExampleHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            This is an example of how to combine compressed form controls with
            from rows, labels, prepend and appends in a column layout.
          </p>
          <OuiCallOut
            color="warning"
            iconType="accessibility"
            title={
              <span>
                Pay close attention to the patterns of using{' '}
                <OuiCode>htmlFor</OuiCode> and <OuiCode>aria-label</OuiCode>.
                For best results, each form control that is not wrapped in an
                OuiFormRow should be supplied an <OuiCode>id</OuiCode>.
              </span>
            }
          />
        </Fragment>
      ),
      demo: <ComplexExample />,
    },
  ],
};
