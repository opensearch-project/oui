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
  OuiBadge,
  OuiCallOut,
  OuiCheckbox,
  OuiCheckboxGroup,
  OuiCode,
  OuiFieldNumber,
  OuiFieldPassword,
  OuiFieldSearch,
  OuiFieldText,
  OuiFilePicker,
  OuiFormFieldset,
  OuiFormLegend,
  OuiFormControlLayout,
  OuiFormControlLayoutDelimited,
  OuiLink,
  OuiRadio,
  OuiRadioGroup,
  OuiSelect,
  OuiSwitch,
  OuiTextArea,
  OuiSpacer,
} from '../../../../src/components';

import {
  FieldTextConfig,
  FieldSearchConfig,
  FieldNumberConfig,
  FieldPasswordConfig,
  TextAreaConfig,
  CheckboxConfig,
  RadioConfig,
  SwitchConfig,
} from './playground';

import FieldSearch from './field_search';
const fieldSearchSource = require('./field_search?raw');
const fieldSearchHtml = renderToHtml(FieldSearch);
const fieldSearchSnippet = [
  `<OuiFieldSearch
  placeholder="Search this"
  value={value}
  isClearable={isClearable}
  onChange={onChange}
/>`,
];

import FieldText from './field_text';
const fieldTextSource = require('./field_text?raw');
const fieldTextHtml = renderToHtml(FieldText);
const fieldTextSnippet = [
  `<OuiFieldText
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
/>`,
];

import FieldNumber from './field_number';
const fieldNumberSource = require('./field_number?raw');
const fieldNumberHtml = renderToHtml(FieldNumber);
const fieldNumberSnippet = [
  `<OuiFieldNumber
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
/>`,
];

import FieldPassword from './field_password';
const fieldPasswordSource = require('./field_password?raw');
const fieldPasswordHtml = renderToHtml(FieldPassword);
const fieldPasswordSnippet = [
  `<OuiFieldPassword
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
  type="dual"
/>`,
];

import TextArea from './text_area';
const textAreaSource = require('./text_area?raw');
const textAreaHtml = renderToHtml(TextArea);
const textAreaSnippet = [
  `<OuiTextArea
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
/>`,
];

import FilePicker from './file_picker';
const filePickerSource = require('./file_picker?raw');
const filePickerHtml = renderToHtml(FilePicker);
const filePickerSnippet = [
  `<OuiFilePicker
  id={filePickerId}
  multiple
  initialPromptText="content that appears in the dropzone if no file is attached"
  onChange={onChange}
/>`,
];

import Select from './select';
const selectSource = require('./select?raw');
const selectHtml = renderToHtml(Select);
const selectSnippet = [
  `<OuiSelect
  options={[
    {
      value: 'option_one',
      text: 'Option one',
    }
  ]}
  value={value}
  onChange={onChange}
/>`,
];

import Checkbox from './checkbox';
const checkboxSource = require('./checkbox?raw');
const checkboxHtml = renderToHtml(Checkbox);
const checkboxSnippet = [
  `<OuiCheckbox
  id={checkboxId}
  label="I am a checkbox"
  checked={checked}
  onChange={onChange}
/>`,
  `<OuiCheckbox
  id={checkboxId}
  label="I am an indeterminate checkbox"
  indeterminate={indeterminate}
  onChange={onChangeIndeterminate}
/>`,
];

import CheckboxGroup from './checkbox_group';
const checkboxGroupSource = require('./checkbox_group?raw');
const checkboxGroupHtml = renderToHtml(CheckboxGroup);

import Radio from './radio';
const radioSource = require('./radio?raw');
const radioHtml = renderToHtml(Radio);
const radioSnippet = [
  `<OuiRadio
  label="I am a radio"
  checked={checked}
  onChange={onChange}
/>`,
];

import RadioGroup from './radio_group';
const radioGroupSource = require('./radio_group?raw');
const radioGroupHtml = renderToHtml(RadioGroup);

import Switch from './switch';
const switchSource = require('./switch?raw');
const switchHtml = renderToHtml(Switch);
const switchSnippet = [
  `<OuiSwitch
  label="I am a switch"
  checked={checked}
  onChange={onChange}
/>`,
];

import PrependAppend from './prepend_append';
const PrependAppendSource = require('./prepend_append?raw');
const PrependAppendHtml = renderToHtml(PrependAppend);

import Fieldset from './fieldset';
const fieldsetSource = require('./fieldset?raw');
const fieldsetHtml = renderToHtml(Fieldset);

import FormControlLayout from './form_control_layout';
const formControlLayoutSource = require('./form_control_layout?raw');
const formControlLayoutHtml = renderToHtml(FormControlLayout);

import FormControlLayoutRange from './form_control_layout_range';
const formControlLayoutRangeSource = require('./form_control_layout_range?raw');
const formControlLayoutRangeHtml = renderToHtml(FormControlLayoutRange);

export const FormControlsExample = {
  title: 'Form controls',
  sections: [
    {
      title: 'Text field',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldTextSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldTextHtml,
        },
      ],
      snippet: fieldTextSnippet,
      props: {
        OuiFieldText,
      },
      demo: <FieldText />,
      playground: FieldTextConfig,
    },
    {
      title: 'Search field',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldSearchSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldSearchHtml,
        },
      ],
      snippet: fieldSearchSnippet,
      props: {
        OuiFieldSearch,
      },
      demo: <FieldSearch />,
      playground: FieldSearchConfig,
    },
    {
      title: 'Number field',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldNumberSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldNumberHtml,
        },
      ],
      snippet: fieldNumberSnippet,
      props: {
        OuiFieldNumber,
      },
      demo: <FieldNumber />,
      playground: FieldNumberConfig,
    },
    {
      title: 'Password field',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldPasswordSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldPasswordHtml,
        },
      ],
      snippet: fieldPasswordSnippet,
      props: {
        OuiFieldPassword,
      },
      demo: <FieldPassword />,
      playground: FieldPasswordConfig,
    },
    {
      title: 'Select',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectHtml,
        },
      ],
      text: (
        <p>
          This component renders a basic HTML{' '}
          <OuiCode language="html">&lt;select&gt;</OuiCode> element. If you need
          more customization for how the options and/or selected values render,
          use the{' '}
          <Link to="/forms/super-select">
            <strong>OuiSuperSelect</strong>
          </Link>
          . Another option is to use the{' '}
          <Link to="/forms/combo-box">
            <strong>OuiComboBox</strong>
          </Link>
          , which has search and multi-select capabilities, but also has
          restrictions on how items are rendered.
        </p>
      ),
      snippet: selectSnippet,
      props: {
        OuiSelect,
      },
      demo: <Select />,
    },
    {
      title: 'Textarea',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textAreaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textAreaHtml,
        },
      ],
      snippet: textAreaSnippet,
      props: {
        OuiTextArea,
      },
      demo: <TextArea />,
      playground: TextAreaConfig,
    },
    {
      title: 'File Picker',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: filePickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: filePickerHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiFilePicker</strong> is a stylized, but generic HTML{' '}
          <OuiCode language="html">&lt;input type=&quot;file&quot;&gt;</OuiCode>{' '}
          tag. It supports drag and drop as well as on click style selection of
          files. The example below shows how to grab the files using the{' '}
          <OuiLink
            href="https://developer.mozilla.org/en-US/docs/Web/API/FileList"
            target="_blank">
            FileList API
          </OuiLink>
          . Like other form elements, you can wrap it in a{' '}
          <strong>OuiFormRow</strong> to apply a label.
        </p>
      ),
      components: { OuiFilePicker },
      snippet: filePickerSnippet,
      demo: <FilePicker />,
      props: { OuiFilePicker },
    },
    {
      title: 'Checkbox',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: checkboxSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: checkboxHtml,
        },
      ],
      snippet: checkboxSnippet,
      props: {
        OuiCheckbox,
      },
      demo: <Checkbox />,
      playground: CheckboxConfig,
    },
    {
      title: 'Checkbox group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: checkboxGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: checkboxGroupHtml,
        },
      ],
      props: {
        OuiCheckboxGroup,
      },
      demo: <CheckboxGroup />,
      snippet: `<OuiCheckboxGroup
  options={[
    {
      id: id1,
      label: 'Option one',
    },
  ]}
  idToSelectedMap={{ id1: true }}
  onChange={onChange}
/>`,
    },
    {
      title: 'Radio',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: radioSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: radioHtml,
        },
      ],
      snippet: radioSnippet,
      props: {
        OuiRadio,
      },
      demo: <Radio />,
      playground: RadioConfig,
    },
    {
      title: 'Radio group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: radioGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: radioGroupHtml,
        },
      ],
      props: {
        OuiRadioGroup,
      },
      demo: <RadioGroup />,
      snippet: `<OuiRadioGroup
  options={[
    {
      id: id1,
      label: 'Option one',
    },
  ]}
  idSelected={id1}
  onChange={onChange}
  name="radio group"
  legend={{
    children: 'A legend',
  }}
/>`,
    },
    {
      title: 'Switch',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: switchSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: switchHtml,
        },
      ],
      snippet: switchSnippet,
      props: {
        OuiSwitch,
      },
      demo: <Switch />,
      playground: SwitchConfig,
    },
    {
      title: 'Fieldset and legend',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldsetSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldsetHtml,
        },
      ],
      text: (
        <Fragment>
          <OuiCallOut
            color="warning"
            iconType="accessibility"
            size="s"
            title={
              <span>
                &quot;[Use a fieldset and legend] for groups of related controls
                where the individual labels for each control do not provide a
                sufficient description, and an additional group level
                description is needed.&quot;{' '}
                <OuiLink
                  external
                  href="https://www.w3.org/WAI/WCAG21/Techniques/html/H71">
                  WCAG Spec
                </OuiLink>
              </span>
            }
          />
          <OuiSpacer />
          <p>
            <strong>OuiFormFieldset</strong> simply wraps its children in a{' '}
            <OuiCode language="html">&lt;fieldset&gt;</OuiCode> with the option
            to add a <OuiCode language="html">&lt;legend&gt;</OuiCode> via the{' '}
            <OuiCode>legend</OuiCode> object prop.
          </p>
        </Fragment>
      ),
      props: {
        OuiFormFieldset,
        OuiFormLegend,
      },
      demo: <Fieldset />,
      snippet: [
        `<OuiFormFieldset legend={{ children: 'Legend' }}>
  <!-- Controls -->
</OuiFormFieldset>`,
        `<OuiFormFieldset legend={{ children: 'Hidden legend', display: 'hidden' }}>
  <!-- Controls -->
</OuiFormFieldset>`,
      ],
    },
    {
      title: 'Prepend and Append',
      text: (
        <Fragment>
          <p>
            Most form controls accept a <OuiCode>prepend</OuiCode> and{' '}
            <OuiCode>append</OuiCode> prop that allows passing a single
            node/string or an array of nodes/strings. Strings will be converted
            into form labels and connected to the input via{' '}
            <OuiCode>htmlFor</OuiCode> for accessibility.
          </p>
          <p>
            These are great for demarcating the input&apos;s metric like
            &quot;px&quot; or &quot;ms&quot;. You can also pass buttons for
            input settings or additional filters. Just be sure to use
            <OuiCode language="js">
              &lt;OuiButtonEmpty size=&quot;xs&quot; /&gt;
            </OuiCode>
            .
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PrependAppendSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: PrependAppendHtml,
        },
      ],
      demo: <PrependAppend />,
      snippet: [
        `<OuiFieldText
  prepend="Label"
  append="px"
/>`,
        `<OuiFieldText
  prepend={prepend}
  append={append}
/>`,
      ],
    },
    {
      title: 'Form control layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formControlLayoutSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formControlLayoutHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            <OuiBadge color={'warning'}>Building block only</OuiBadge>
          </p>

          <p>
            <strong>OuiFormControlLayout</strong> is generally used internally
            to consistently style form controls, but it&rsquo;s published in
            case you want to create your own form control which matches those of
            OUI. The examples below demonstrate its various states.
          </p>

          <OuiCallOut title="Additional padding required" color="warning">
            <p>
              The padding on the <OuiCode>input</OuiCode> itself doesn&rsquo;t
              take into account the presence of the various icons supported by{' '}
              <strong>OuiFormControlLayout</strong>. Any input component
              provided to <strong>OuiFormControlLayout</strong> is responsible
              for its own padding.
            </p>
          </OuiCallOut>
        </Fragment>
      ),
      props: {
        OuiFormControlLayout,
      },
      demo: <FormControlLayout />,
    },
    {
      title: 'Form control layout delimited',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formControlLayoutRangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formControlLayoutRangeHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            <OuiBadge color={'warning'}>Building block only</OuiBadge>
          </p>

          <p>
            Like <strong>OuiFormControlLayout</strong>,{' '}
            <strong>OuiFormControlLayoutDelimited</strong> is generally used
            internally to consistently style form controls. This component
            specifically lays out two form controls with center text or icon.
          </p>
          <p>
            It takes all of the same props as{' '}
            <strong>OuiFormControlLayout</strong> except for{' '}
            <OuiCode>children</OuiCode>. Instead it requires both a{' '}
            <strong>single</strong> <OuiCode>startControl</OuiCode> and a{' '}
            <strong>single</strong> <OuiCode>endControl</OuiCode>. You can
            optionally change the center content to a different string or node
            (like an OuiIcon).
          </p>
        </Fragment>
      ),
      props: {
        OuiFormControlLayoutDelimited,
      },
      demo: <FormControlLayoutRange />,
    },
  ],
};
