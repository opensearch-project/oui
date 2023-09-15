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
  OuiForm,
  OuiFormRow,
  OuiFieldText,
  OuiSelect,
  OuiTextArea,
} from '../../../../src/components';

import Validation from './validation';
const validationSource = require('./validation?raw');
const validationHtml = renderToHtml(Validation);

export const FormValidationExample = {
  title: 'Form validation',
  sections: [
    {
      text: (
        <p>
          Validation is achieved by applying <OuiCode>isInvalid</OuiCode> and
          optionally error props onto the <strong>OuiForm</strong> or{' '}
          <strong>OuiFormRow</strong> components. Errors are optional and are
          passed as an array in case you need to list more than one.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: validationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: validationHtml,
        },
      ],
      props: {
        OuiForm,
        OuiSelect,
        OuiFormRow,
        OuiTextArea,
        OuiFieldText,
      },
      demo: <Validation />,
    },
  ],
};
