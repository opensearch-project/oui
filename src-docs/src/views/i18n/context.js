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
  OuiContext,
  OuiButton,
  OuiFieldText,
  OuiFlexGroup,
  OuiFlexItem,
  OuiFormRow,
  OuiSpacer,
  OuiI18n,
  OuiI18nNumber,
  useOuiI18n,
} from '../../../../src/components';

const mappings = {
  fr: {
    'ouiContext.english': 'Anglais',
    'ouiContext.french': 'Française',
    'ouiContext.greeting': 'Salutations!',
    'ouiContext.guestNo': 'Vous êtes invité #',
    'ouiContext.question': 'Quel est votre nom?',
    'ouiContext.placeholder': 'Jean Dupont',
    'ouiContext.action': 'Soumettre',
  },
};

const ContextConsumer = () => {
  return (
    <div>
      <strong>
        <OuiI18n token="ouiContext.greeting" default="Welcome!" />
      </strong>

      <OuiSpacer size="s" />

      <p>
        <OuiI18n token="ouiContext.guestNo" default="You are guest #" />
        <OuiI18nNumber value={1582394} />
      </p>

      <OuiSpacer size="m" />

      <Fragment>
        <OuiFormRow
          label={useOuiI18n('ouiContext.question', 'What is your name?')}>
          <OuiFieldText
            placeholder={useOuiI18n('ouiContext.placeholder', 'John Doe')}
          />
        </OuiFormRow>

        <OuiSpacer />

        <OuiButton>{useOuiI18n('ouiContext.action', 'Submit')}</OuiButton>
      </Fragment>
    </div>
  );
};

export default () => {
  const [language, setLanguage] = useState('en');

  const i18n = {
    mapping: mappings[language],
    formatNumber: (value) => new Intl.NumberFormat(language).format(value),
  };

  return (
    <>
      <OuiFlexGroup gutterSize="s" alignItems="center">
        <OuiFlexItem grow={false}>
          <OuiButton fill={language === 'en'} onClick={() => setLanguage('en')}>
            <OuiI18n token="ouiContext.english" default="English" />
          </OuiButton>
        </OuiFlexItem>

        <OuiFlexItem grow={false}>
          <OuiButton fill={language === 'fr'} onClick={() => setLanguage('fr')}>
            <OuiI18n token="ouiContext.french" default="French" />
          </OuiButton>
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer size="m" />

      <OuiContext i18n={i18n}>
        <ContextConsumer />
      </OuiContext>
    </>
  );
};
