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
  OuiLink,
  OuiDatePicker,
  OuiDatePickerRange,
} from '../../../../src/components';

import DatePicker from './date_picker';
const datePickerSource = require('./date_picker?raw');
const datePickerHtml = renderToHtml(DatePicker);

import States from './states';
const statesSource = require('./states?raw');
const statesHtml = renderToHtml(States);

import Locale from './locale';
const localeSource = require('./locale?raw');
const localeHtml = renderToHtml(Locale);

import Time from './time_select';
const timeSource = require('./time_select?raw');
const timeHtml = renderToHtml(Time);

import Inline from './inline';
const inlineSource = require('./inline?raw');
const inlineHtml = renderToHtml(Inline);

import Range from './range';
const rangeSource = require('./range?raw');
const rangeHtml = renderToHtml(Range);

import MinMax from './min_max';
const minMaxSource = require('./min_max?raw');
const minMaxHtml = renderToHtml(MinMax);

import Classes from './classes';
const classesSource = require('./classes?raw');
const classesHtml = renderToHtml(Classes);

import OpenToDate from './open_to_date';
const openToDateSource = require('./open_to_date?raw');
const openToDateHtml = renderToHtml(OpenToDate);

import CustomInput from './custom_input';
const customInputSource = require('./custom_input?raw');
const customInputHtml = renderToHtml(CustomInput);

import Utc from './utc';
const utcSource = require('./utc?raw');
const utcHtml = renderToHtml(Utc);

const datePickerSnippet =
  '<OuiDatePicker selected={startDate} onChange={handleChange} />';

const statesSnippet = [
  `<OuiDatePicker
  selected={startDate}
  onChange={handleChange}
  onClear={onClear}
  placeholder="Clearable"
/>
`,
  `<OuiDatePicker
  isInvalid
  selected={startDate}
  onChange={handleChange}
  placeholder="Example of an error"
/>
`,
];

const timeSnippet = [
  `<OuiDatePicker
  showTimeSelect
  selected={startDate}
  onChange={handleChange}
/>
`,
  `<OuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={startDate}
  onChange={handleChange}
/>
`,
  `<OuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={startDate}
  onChange={handleChange}
  injectTimes={[times]}
/>
`,
];

const localeSnippet = `<OuiDatePicker
  showTimeSelect
  selected={startDate}
  onChange={handleChange}
  dateFormat="DD-MM-YYYY HH:mm"
  timeFormat="HH:mm"
  locale="de-de"
/>`;

const rangeSnippet = `<OuiDatePickerRange
  startDateControl={
    <OuiDatePicker
      selected={startDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      isInvalid={isInvalid}
      showTimeSelect
    />
  }
  endDateControl={
    <OuiDatePicker
      selected={endDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      isInvalid={isInvalid}
      showTimeSelect
    />
  }
/>`;

const minMaxSnippet = [
  `<OuiDatePicker
  showTimeSelect
  selected={startDate}
  onChange={handleChange}
  minDate={minDate}
  maxDate={maxDate}
  minTime={minTime}
  maxTime={maxTime}
/>
`,
  `<OuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={startDate}
  onChange={handleChange}
  excludeDates={[excludeDates]}
  excludeTimes={[excludeTimes]}
/>
`,
  `<OuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={startDate}
  onChange={handleChange}
  filterDate={filterDate}
/>
`,
];

const openToDateSnippet = `<OuiDatePicker
  selected={startDate}
  onChange={handleChange}
  openToDate={openToDate}
/>`;

const customInputSnippet = `<OuiDatePicker
  selected={startDate}
  onChange={handleChange}
  customInput={customInput}
/>`;

const utcSnippet = `<OuiDatePicker
  selected={startDate}
  onChange={handleChange}
  customInput={customInput}
/>`;

const inlineSnippet = `<OuiDatePicker
  selected={startDate}
  onChange={handleChange}
  showTimeSelect
  inline
  shadow={false}
/>`;

const classesSnippet = `<OuiDatePicker
  selected={startDate}
  onChange={handleChange}
  className="customClassName"
/>`;

export const DatePickerExample = {
  title: 'Date picker',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: datePickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: datePickerHtml,
        },
      ],
      text: (
        <p>
          At its most bare the <strong>OuiDatePicker</strong> only requires
          props for <OuiCode>selected</OuiCode> and <OuiCode>onChange</OuiCode>.
          It depends on{' '}
          <OuiLink href="https://momentjs.com/docs/">moment</OuiLink> for all of
          its formatting.
        </p>
      ),
      components: { OuiDatePicker },
      snippet: datePickerSnippet,
      demo: <DatePicker />,
      props: { OuiDatePicker },
    },
    {
      title: 'Date picker states',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statesHtml,
        },
      ],
      text: (
        <p>
          Examples of how the input can appear within a form. This should match
          our other form styles.
        </p>
      ),
      snippet: statesSnippet,
      demo: <States />,
    },
    {
      title: 'Time selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: timeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: timeHtml,
        },
      ],
      text: (
        <p>
          Two props control time selection. <OuiCode>showTimeSelect</OuiCode>{' '}
          will make time selection appear next to the calendar and{' '}
          <OuiCode>showTimeSelectOnly</OuiCode> will exclude the calendar and
          make the time selection the only thing you see. Make sure to adjust
          your <OuiCode>dateFormat</OuiCode> and <OuiCode>timeFormat</OuiCode>{' '}
          values to match.
        </p>
      ),
      snippet: timeSnippet,
      demo: <Time />,
    },
    {
      title: 'Locale',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: localeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: localeHtml,
        },
      ],
      text: (
        <p>
          Locale formatting is achieved by using the <OuiCode>locale</OuiCode>,
          <OuiCode>timeFormat</OuiCode>, and <OuiCode>dateFormat</OuiCode>{' '}
          props. The latter will take any <OuiCode>moment()</OuiCode> notation.
          Check{' '}
          <a href="https://en.wikipedia.org/wiki/Date_format_by_country">
            Date format by country
          </a>{' '}
          for formatting examples.
        </p>
      ),
      snippet: localeSnippet,
      demo: <Locale />,
    },
    {
      title: 'Date picker range',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: rangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: rangeHtml,
        },
      ],
      text: (
        <p>
          By passing <OuiCode>startDate</OuiCode> and <OuiCode>endDate</OuiCode>{' '}
          props you can provide styling the range in between two dates. To
          further style the group as a single control, use{' '}
          <strong>OuiDatePickerRange</strong> and pass the date picker controls
          into the <OuiCode>startDateControl</OuiCode> and{' '}
          <OuiCode>endDateControl</OuiCode> props.
        </p>
      ),
      demo: <Range />,
      snippet: rangeSnippet,
      props: { OuiDatePickerRange },
    },
    {
      title: 'Only allow specific dates and times',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: minMaxSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: minMaxHtml,
        },
      ],
      text: (
        <p>
          Use the <OuiCode>minDate</OuiCode>,<OuiCode>maxDate</OuiCode>,
          <OuiCode>minTime</OuiCode>, and <OuiCode>maxTime</OuiCode>
          props to specify specific ranges the <OuiCode>selected</OuiCode> code
          must must fall into. You can also use the{' '}
          <OuiCode>excludeDates</OuiCode> and
          <OuiCode>excludeTimes</OuiCode> property to disallow a specific array
          of items from selection.
        </p>
      ),
      snippet: minMaxSnippet,
      demo: <MinMax />,
    },
    {
      title: 'Open to a specific date',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: openToDateSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: openToDateHtml,
        },
      ],
      text: (
        <p>
          Use <OuiCode>openToDate</OuiCode> to default selection to a specific
          date.
        </p>
      ),
      snippet: openToDateSnippet,
      demo: <OpenToDate />,
    },
    {
      title: 'Custom input',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customInputSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customInputHtml,
        },
      ],
      text: (
        <p>
          Use <OuiCode>customInput</OuiCode> to pass a custom input to trigger
          your calendar.
        </p>
      ),
      snippet: customInputSnippet,
      demo: <CustomInput />,
    },
    {
      title: 'UTC offsets',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: utcSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: utcHtml,
        },
      ],
      text: (
        <p>
          Use <OuiCode>utcOffset</OuiCode> to apply an offset to the datetime.
        </p>
      ),
      snippet: utcSnippet,
      demo: <Utc />,
    },
    {
      title: 'Date picker inline',
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
      text: (
        <p>
          Use the <OuiCode>inline</OuiCode> prop to display the date picker
          directly in the page. If you do not need the shadows / popover effect
          to the date picker then also apply the{' '}
          <OuiCode language="js">shadow=false</OuiCode> prop as shown in the
          second example.
        </p>
      ),
      snippet: inlineSnippet,
      demo: <Inline />,
    },
    {
      title: 'Custom classes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: classesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: classesHtml,
        },
      ],
      text: (
        <div>
          <p>
            Custom classes can be passed to various bits of the calendar and
            input.
          </p>
          <ul>
            <li>
              <OuiCode>className</OuiCode> will pass onto the input.
            </li>
            <li>
              <OuiCode>calendarClassName</OuiCode> will pass onto the calendar
              itself.
            </li>
            <li>
              <OuiCode>dayClassName</OuiCode> will pass onto specificed days.
            </li>
            <li>
              <OuiCode>popperClassName</OuiCode> will pass onto the popover.
            </li>
          </ul>
        </div>
      ),
      snippet: classesSnippet,
      demo: <Classes />,
    },
  ],
};
