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
  OuiForm,
  OuiFormRow,
  OuiText,
  OuiDescribedFormGroup,
} from '../../../../src/components';
import Guidelines from './guidelines';
import FormRows from './form_rows';
const formRowsSource = require('./form_rows?raw');
const formRowsHtml = renderToHtml(FormRows);

import DescribedFormGroup from './described_form_group';
const describedFormGroupSource = require('./described_form_group?raw');
const describedFormGroupHtml = renderToHtml(DescribedFormGroup);

import FullWidth from './full_width';
const fullWidthSource = require('./full_width?raw');
const fullWidthHtml = renderToHtml(FullWidth);

import Inline from './inline';
const inlineSource = require('./inline?raw');
const inlineHtml = renderToHtml(Inline);

import InlineSizing from './inline_sizing';
const inlineSizingSource = require('./inline_sizing?raw');
const inlineSizingHtml = renderToHtml(InlineSizing);

import InlinePopover from './inline_popover';
const inlinePopoverSource = require('./inline_popover?raw');
const inlinePopoverHtml = renderToHtml(InlinePopover);

export const FormLayoutsExample = {
  title: 'Form layouts',
  intro: (
    <OuiText>
      <p>
        Be sure to read the full{' '}
        <Link to="/guidelines/form-layouts">forms usage guidelines</Link>.
      </p>
    </OuiText>
  ),
  sections: [
    {
      title: 'Form and form rows',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formRowsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formRowsHtml,
        },
      ],
      text: (
        <p>
          Use the <strong>OuiFormRow</strong> component to easily associate form
          components with labels, help text, and error text. Use the{' '}
          <strong>OuiForm</strong> component to group{' '}
          <strong>OuiFormRows</strong>. By default OuiForm will render as a
          simple div unless you pass{' '}
          <OuiCode language="js">component=&quot;form&quot;</OuiCode>.
        </p>
      ),
      props: {
        OuiForm,
        OuiFormRow,
      },
      demo: <FormRows />,
      snippet: `<OuiFormRow
  label="Text field"
  helpText="I am some friendly help text."
>
  <OuiFieldText />
</OuiFormRow>`,
    },
    {
      title: 'Full-width',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fullWidthSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fullWidthHtml,
        },
      ],
      text: (
        <p>
          Form elements will automatically flex to a max-width of{' '}
          <OuiCode>400px</OuiCode>. You can optionally pass the{' '}
          <OuiCode>fullWidth</OuiCode> prop to the row and form control to
          expand to their container. This should be done rarely and usually you
          will only need it for isolated controls like search bars and sliders.
        </p>
      ),
      props: {
        OuiFormRow,
      },
      demo: <FullWidth />,
      snippet: `<OuiFormRow
  fullWidth
  label="Works on form rows too"
  helpText="Note that the fullWidth prop is not passed to the form row's child"
>
  <OuiRange fullWidth />
</OuiFormRow>`,
    },
    {
      title: 'Described form groups',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: describedFormGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: describedFormGroupHtml,
        },
      ],
      text: (
        <p>
          Use <strong>OuiDescribedFormGroup</strong> component to associate
          multiple <strong>OuiFormRows</strong>. It can also simply be used with
          one <strong>OuiFormRow</strong> as a way to display additional text
          next to the field (on mobile, it will revert to being stacked).
        </p>
      ),
      props: {
        OuiDescribedFormGroup,
      },
      demo: <DescribedFormGroup />,
      snippet: `<OuiDescribedFormGroup
  title={<h3>Set heading level based on context</h3>}
  description={
    <Fragment>
      Will be wrapped in a small, subdued OuiText block.
    </Fragment>
  }
>
  <OuiFormRow
    label="Text field"
  >
    <OuiFieldText />
  </OuiFormRow>
</OuiDescribedFormGroup>`,
    },
    {
      title: 'Inline',
      text: (
        <p>
          Inline forms can be made with{' '}
          <Link to="/layout/flex">
            <strong>OuiFlexGroup</strong>
          </Link>
          . Apply <OuiCode language="js">grow=false</OuiCode> on any of the
          items you want to collapse (like this button). Note that the button
          FormRow component also requires an additional prop because it&rsquo;s
          missing a label.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inlineHtml,
        },
      ],
      demo: <Inline />,
    },
    {
      title: 'Sizing inline form rows',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineSizingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inlineSizingHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Apply a width to the wrapping FlexItem to size individual controls.
            When you need to make a field smaller, always apply the width to the
            FlexItem, not the input. The input inside will resize as needed.
          </p>
          <p>
            When supplying children to an OuiFormRow that is{' '}
            <strong>not</strong> a form control, and you need to the content to
            vertically center with the other form controls, change the{' '}
            <OuiCode>display</OuiCode> prop to <OuiCode>center</OuiCode> or{' '}
            <OuiCode>centerCompressed</OuiCode>.
          </p>
        </Fragment>
      ),
      demo: <InlineSizing />,
      snippet: `<OuiFormRow label="Avatar" display="centerCompressed">
  <OuiAvatar name="John Doe" size="s" />
</OuiFormRow>`,
    },
    {
      title: 'In a popover',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlinePopoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inlinePopoverHtml,
        },
      ],
      text: (
        <p>
          Because forms auto-size to their wrapping elements, it means you can
          do fun things with them like stuff them in popovers and they&rsquo;ll
          still work perfectly.
        </p>
      ),
      demo: <InlinePopover />,
    },
  ],
  guidelines: <Guidelines />,
};
