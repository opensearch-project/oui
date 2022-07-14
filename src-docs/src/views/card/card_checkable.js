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

import React, { useState, Fragment } from 'react';

import {
  OuiCheckableCard,
  OuiSpacer,
  OuiRadioGroup,
  OuiTitle,
  OuiFormFieldset,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const radioName = htmlIdGenerator()();
  const [radio, setRadio] = useState('radio2');
  const [nestedRadio, setNestedRadio] = useState('nestedRadio1');

  const nestedRadios = [
    {
      id: 'nestedRadio1',
      label: 'Nested option one',
    },
    {
      id: 'nestedRadio2',
      label: 'Nested option two',
    },
    {
      id: 'nestedRadio3',
      label: 'Nested option three',
    },
  ];

  return (
    <Fragment>
      <OuiFormFieldset
        legend={{
          children: (
            <OuiTitle size="xs">
              <span>Checkable card radio group with legend</span>
            </OuiTitle>
          ),
        }}>
        <OuiCheckableCard
          id={htmlIdGenerator()()}
          label="Option one"
          name={radioName}
          value="radio1"
          checked={radio === 'radio1'}
          onChange={() => setRadio('radio1')}
        />

        <OuiSpacer size="m" />

        <OuiCheckableCard
          id={htmlIdGenerator()()}
          label="Option two"
          name={radioName}
          value="radio2"
          checked={radio === 'radio2'}
          onChange={() => setRadio('radio2')}>
          <OuiRadioGroup
            options={nestedRadios}
            idSelected={nestedRadio}
            onChange={(nestedRadio) => setNestedRadio(nestedRadio)}
            disabled={radio !== 'radio2'}
          />
        </OuiCheckableCard>

        <OuiSpacer size="m" />

        <OuiCheckableCard
          id={htmlIdGenerator()()}
          label="Option three (disabled)"
          name={radioName}
          value="radio3"
          checked={radio === 'radio3'}
          onChange={() => setRadio('radio3')}
          disabled
        />
      </OuiFormFieldset>
    </Fragment>
  );
};
