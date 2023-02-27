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

import {
  OuiCode,
  OuiSteps,
  OuiText,
  OuiCodeBlock,
  OuiSubSteps,
} from '../../../../src/components';
import { OuiSpacer } from '../../../../src/components/spacer';

const steps = [
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
  {
    title: 'Step 2 has sub steps',
    children: (
      <OuiText>
        <p>
          In order to complete this step, do the following things{' '}
          <strong>in order</strong>.
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
  {
    title: 'Step 3 has an intro and one line instruction',
    children: (
      <OuiText>
        <p>
          Now that you&apos;ve completed step 2, go find the{' '}
          <OuiCode>thing</OuiCode>.
        </p>
        <p>
          Go to <strong>Overview &gt;&gt; Endpoints</strong> note{' '}
          <strong>OpenSearch</strong> as <OuiCode>&lt;thing&gt;</OuiCode>.
        </p>
      </OuiText>
    ),
  },
  {
    title: 'The last step has two options',
    children: (
      <OuiText size="s">
        <h3>
          <strong>Option 1:</strong> If you have this type of instance
        </h3>
        <OuiSubSteps>
          <ol>
            <li>Do thing 1</li>
            <li>Do thing 2</li>
            <li>Do thing 3</li>
          </ol>
        </OuiSubSteps>
        <h3>
          <strong>Option 2:</strong> If you have the other type of instance
        </h3>
        <OuiSubSteps>
          <ol>
            <li>Do thing 1</li>
            <li>Do thing 2</li>
            <li>Do thing 3</li>
          </ol>
        </OuiSubSteps>
      </OuiText>
    ),
  },
];

export default () => (
  <div>
    <OuiSteps headingElement="h2" steps={steps} />
  </div>
);
