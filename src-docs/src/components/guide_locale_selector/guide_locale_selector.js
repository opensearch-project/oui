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
import PropTypes from 'prop-types';

import moment from 'moment';
import { translateUsingPseudoLocale } from '../../../src/services/string/pseudo_locale_translator';

// For testing/demoing OuiDatePicker, process moment's `en` locale config into a babelfished version
const enConfig = moment.localeData('en')._config;
moment.defineLocale('en-xa', {
  ...enConfig,
  months: enConfig.months.map(translateUsingPseudoLocale),
  monthsShort: enConfig.monthsShort.map(translateUsingPseudoLocale),
  weekdays: enConfig.weekdays.map(translateUsingPseudoLocale),
  weekdaysMin: enConfig.weekdaysMin.map(translateUsingPseudoLocale),
  weekdaysShort: enConfig.weekdaysShort.map(translateUsingPseudoLocale),
});
// Reset default moment locale after using `defineLocale`
moment.locale('en');

import { OuiSwitch, OuiToolTip } from '../../../../src/components';

export const GuideLocaleSelector = ({ selectedLocale, onToggleLocale }) => {
  return (
    <OuiToolTip delay="long" position="left" content="Simulates localization">
      <OuiSwitch
        compressed
        label={'Babelfish'}
        checked={selectedLocale === 'en-xa'}
        onChange={() =>
          onToggleLocale(selectedLocale === 'en' ? 'en-xa' : 'en')
        }
      />
    </OuiToolTip>
  );
};

GuideLocaleSelector.propTypes = {
  onToggleLocale: PropTypes.func.isRequired,
  selectedLocale: PropTypes.string.isRequired,
};
