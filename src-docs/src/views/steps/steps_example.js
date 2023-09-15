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

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiSteps,
  OuiStep,
  OuiSubSteps,
  OuiStepsHorizontal,
} from '../../../../src/components';

import { OuiStepHorizontal } from '../../../../src/components/steps/step_horizontal';

import { stepConfig, stepHorizontalConfig } from './playground';

import Steps from './steps';
const stepsSource = require('./steps?raw');
const stepsHtml = renderToHtml(Steps);
const stepsSnippet = [
  `<OuiSteps
  steps={[
    {
      title: 'Step 1',
      children: <OuiText><p>Do this first</p></OuiText>,
    },
  ]}
/>`,
  `<OuiSteps
  firstStepNumber={3}
  steps={[
    {
      title: 'Step 3',
      children: <OuiText><p>Do this third first</p></OuiText>,
    },
  ]}
/>`,
];

import StepsComplex from './steps_complex';
const stepsComplexSource = require('./steps_complex?raw');
const stepsComplexHtml = renderToHtml(StepsComplex);
const stepsComplexSnippet = [
  `<OuiSteps
  steps={[
    {
      title: 'Step 1 has intro plus code snippet',
      children: (
        <>
          <OuiText>
            <p>Run this code snippet to install things.</p>
          </OuiText>
          <OuiSpacer />
          <OuiCodeBlock language="bash">npm install</OuiCodeBlock>
        </>
      ),
    },
  ]}
/>`,
  `<OuiSteps
  steps={[
    {
      title: 'Step 2 has sub steps',
      children: (
        <OuiText>
          <p>
            In order to complete this step, do the following things <strong>in order</strong>.
          </p>
          <OuiSubSteps>
            <ol>
              <li>Do thing 1</li>
              <li>Do thing 2</li>
              <li>Do thing 3</li>
            </ol>
          </OuiSubSteps>
          <p>Here are some bullet point reminders.</p>
          <ul>
            <li>Reminder 1</li>
            <li>Reminder 2</li>
            <li>Reminder 3</li>
          </ul>
        </OuiText>
      ),
    },
  ]}
/>`,
];

import HeadingElementSteps from './heading_element_steps';
const headingElementStepsSource = require('./heading_element_steps?raw');
const headingElementStepsHtml = renderToHtml(HeadingElementSteps);
const headingElementStepsSnippet = `<OuiSteps steps={steps} headingElement="h2" />
`;

import StepsHorizontal from './steps_horizontal';
const stepsHorizontalSource = require('./steps_horizontal?raw');
const stepsHorizontalHtml = renderToHtml(StepsHorizontal);
const stepsHorizontalSnippet = `<OuiStepsHorizontal steps={[{
  title: 'Completed step',
  isComplete: true,
  onClick: function,
}]} />
`;

import Status from './status';
const statusSource = require('./status?raw');
const statusHtml = renderToHtml(Steps);
const statusSnippet = `<OuiSteps
  steps={[
    {
      title: 'Warning',
      children: 'Example of a warning',
      status: 'warning',
    },
  ]}
/>`;

import StepsTitleSizes from './steps_title_sizes';
const stepsTitleSizesSource = require('./steps_title_sizes?raw');
const stepsTitleSizesHtml = renderToHtml(StepsTitleSizes);
const stepsTitleSizesSnippet = `<OuiSteps titleSize="xs" steps={steps} />
`;

export const StepsExample = {
  title: 'Steps',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stepsHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiSteps</strong> presents procedural content in a numbered
          outline format. It is best used when presenting instructional content
          that must be conducted in a particular order. It requires a{' '}
          <OuiCode>title</OuiCode> and <OuiCode>children</OuiCode> to be present
          and will automatically increment the step number based on the initial{' '}
          <OuiCode>firstStepNumber</OuiCode>.
        </p>
      ),
      props: { OuiSteps, OuiStep },
      snippet: stepsSnippet,
      demo: <Steps />,
    },
    {
      title: 'Complex steps',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsComplexSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stepsComplexHtml,
        },
      ],
      text: (
        <p>
          If you need to call out a set of substeps that are not lines of code,
          most likely a <OuiCode>{'<ol/>'}</OuiCode>, wrap the block in a{' '}
          <OuiCode>{'<OuiSubSteps/>'}</OuiCode>.
        </p>
      ),
      demo: <StepsComplex />,
      props: { OuiSubSteps },
      snippet: stepsComplexSnippet,
    },
    {
      title: 'Heading elements',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headingElementStepsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headingElementStepsHtml,
        },
      ],
      text: (
        <div>
          <p>
            To aid with accessibility and hierarchical headings, you can and
            should pass in a heading element to use for each step title. The
            example below shows that the logical heading element should be an{' '}
            <OuiCode>h2</OuiCode>
            and therefore adds{' '}
            <OuiCode language="j">{'headingElement="h2"'}</OuiCode> to the
            OuiSteps component.
          </p>
          <p>
            The style of the title will <strong>not</strong> be affected.
          </p>
        </div>
      ),
      snippet: headingElementStepsSnippet,
      demo: <HeadingElementSteps />,
    },
    {
      title: 'Steps status',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statusSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statusHtml,
        },
      ],
      text: (
        <p>
          Steps can optionally include <OuiCode>status</OuiCode> prop that will
          alter the look of the number prefix. The options are{' '}
          <OuiCode>incomplete</OuiCode>, <OuiCode>complete</OuiCode>,{' '}
          <OuiCode>warning</OuiCode>, <OuiCode>danger</OuiCode>,{' '}
          <OuiCode>disabled</OuiCode> and <OuiCode>loading</OuiCode>. This is
          used mostly as a final step when you need to make some sort of final
          check.
        </p>
      ),
      snippet: statusSnippet,
      demo: <Status />,
    },
    {
      title: 'Custom title sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsTitleSizesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stepsTitleSizesHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can set a different title size using{' '}
            <OuiCode>titleSize</OuiCode>. If <OuiCode>titleSize</OuiCode> is set
            in both <strong>OuiSteps</strong> and <strong>OuiStep</strong>, the
            latter value will override the former. Additionally, the title size{' '}
            <OuiCode>xs</OuiCode> will automatically generate smaller steps
            circles.
          </p>
        </Fragment>
      ),
      demo: <StepsTitleSizes />,
      snippet: stepsTitleSizesSnippet,
    },
    {
      title: 'Horizontal steps',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsHorizontalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stepsHorizontalHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            For use when forms/setup instructions can and should be split into
            multiple pages.
          </p>
          <p>
            For each step object, be sure to signify previous/completed steps
            with <OuiCode language="ts">isComplete: true</OuiCode> and the
            current/selected step with{' '}
            <OuiCode language="ts">isSelected: true</OuiCode>.
          </p>
        </Fragment>
      ),
      demo: <StepsHorizontal />,
      snippet: stepsHorizontalSnippet,
      props: { OuiStepsHorizontal, OuiStepHorizontal },
    },
  ],
  playground: [stepConfig, stepHorizontalConfig],
};
