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
  OuiCode,
  OuiCodeBlock,
  OuiIcon,
  OuiLink,
  OuiSuperDatePicker,
} from '../../../../src/components';

import SuperDatePicker from './super_date_picker';
const superDatePickerSource = require('./super_date_picker?raw');
const superDatePickerHtml = renderToHtml(SuperDatePicker);

import SuperDatePickerConfig from './super_date_picker_config';
const superDatePickerConfigSource = require('./super_date_picker_config?raw');
const superDatePickerConfigHtml = renderToHtml(SuperDatePicker);

import SuperDatePickerCustomQuickSelect from './super_date_picker_custom_quick_select';
const superDatePickerCustomQuickSelectSource = require('./super_date_picker_custom_quick_select?raw');
const superDatePickerCustomQuickSelectHtml = renderToHtml(SuperDatePicker);

const superDatePickerSnippet = `<OuiSuperDatePicker
  onTimeChange={this.onTimeChange}
/>
`;

const superDatePickerCustomQuickSelectSnippet = `customQuickSelectPanels = [
  {
    title: 'My custom panel',
    content: <MyCustomQuickSelectPanel />,
  },
];

<OuiSuperDatePicker
  onTimeChange={this.onTimeChange}
  customQuickSelectPanels={customQuickSelectPanels}
/>
`;

export const SuperDatePickerExample = {
  title: 'Super date picker',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superDatePickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superDatePickerHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>OuiSuperDatePicker</strong> is a date picker that supports
            relative and absolute dates. It offers a convenient{' '}
            <strong>Quick select menu</strong>{' '}
            <OuiIcon type="calendar" color="primary" /> which includes{' '}
            <strong>Commonly used dates</strong>,{' '}
            <strong>Recently used date ranges</strong> and{' '}
            <strong>Set refresh</strong> features.
          </p>
          <p>
            Pass <OuiCode>start</OuiCode> and <OuiCode>end</OuiCode> date times
            as strings in either datemath format (e.g.: <OuiCode>now</OuiCode>,{' '}
            <OuiCode>now-15m</OuiCode>, <OuiCode>now-15m/m</OuiCode>) or as
            absolute date in the format{' '}
            <OuiCode>YYYY-MM-DDTHH:mm:ss.SSSZ</OuiCode>. Use{' '}
            <OuiLink href="https://github.com/elastic/datemath-js">
              datemath
            </OuiLink>{' '}
            to convert start and end strings into moment objects.
          </p>
          <OuiCodeBlock language="js" paddingSize="none" isCopyable>
            {`import dateMath from '@opensearch/datemath';

const startMoment = dateMath.parse(start);
// dateMath.parse is inconsistent with unparsable strings.
// Sometimes undefined is returned, other times an invalid moment is returned
if (!startMoment || !startMoment.isValid()) {
  throw new Error('Unable to parse start string');
}

// Pass roundUp when parsing end string
const endMoment = dateMath.parse(end, { roundUp: true });
if (!endMoment || !endMoment.isValid()) {
  throw new Error('Unable to parse end string');
}`}
          </OuiCodeBlock>
        </div>
      ),
      props: { OuiSuperDatePicker },
      snippet: superDatePickerSnippet,
      demo: <SuperDatePicker />,
    },
    {
      title: 'Configurations',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superDatePickerConfigSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superDatePickerConfigHtml,
        },
      ],
      text: (
        <div>
          <p>
            When <OuiCode>start</OuiCode> and <OuiCode>end</OuiCode> change from
            interactions with <strong> Quick select</strong>,{' '}
            <strong>Commonly used</strong>, or{' '}
            <strong>Recently used date ranges</strong>,
            <OuiCode>onTimeChange</OuiCode> will be immediately invoked. This is
            because these interactions set both <OuiCode>start</OuiCode> and{' '}
            <OuiCode>end</OuiCode> in a single event.
          </p>
          <p>
            When <OuiCode>start</OuiCode> and <OuiCode>end</OuiCode> change from
            interactions with <strong>Absolute</strong>,{' '}
            <strong>Relative</strong>, and <strong>Now</strong> tabs,
            <OuiCode>onTimeChange</OuiCode> will <strong>not</strong> be
            invoked. In these cases,<OuiCode>onTimeChange</OuiCode> will be
            invoked when the user clicks the <strong>Update</strong> button.
            This gives users the ability to set both <OuiCode>start</OuiCode>{' '}
            and <OuiCode>end</OuiCode> before triggering{' '}
            <OuiCode>onTimeChange</OuiCode>. Set{' '}
            <OuiCode>showUpdateButton</OuiCode> to <OuiCode>false</OuiCode> to
            immediately invoke <OuiCode>onTimeChange</OuiCode> for all{' '}
            <OuiCode>start</OuiCode> and <OuiCode>end</OuiCode> changes.
          </p>
          <p>
            Set <OuiCode>isAutoRefreshOnly</OuiCode> to <OuiCode>true </OuiCode>{' '}
            to limit the component to only display auto refresh content. This is
            useful in cases where there is no time data but auto-refresh
            configuration is still desired.
          </p>
        </div>
      ),
      demo: <SuperDatePickerConfig />,
    },
    {
      title: 'Custom quick select panel',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superDatePickerCustomQuickSelectSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superDatePickerCustomQuickSelectHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>OuiSuperDatePicker</strong>&apos;s quick select menu also
            supports <strong>custom panels</strong>. These panels can have their
            own title and perform custom actions on the date picker.
          </p>
        </div>
      ),
      snippet: superDatePickerCustomQuickSelectSnippet,
      demo: <SuperDatePickerCustomQuickSelect />,
    },
  ],
};
