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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useOuiI18n } from '../i18n';

type Props = { number?: number; title?: string };

export const useI18nStep = ({ number, title }: Props): string => {
  const string = useOuiI18n('ouiStepStrings.step', 'Step {number}: {title}', {
    number,
    title,
  });

  const simpleString = useOuiI18n(
    'ouiStepStrings.simpleStep',
    'Step {number}',
    { number }
  );

  return title ? string : simpleString;
};

export const useI18nCompleteStep = ({ number, title }: Props): string => {
  const string = useOuiI18n(
    'ouiStepStrings.complete',
    'Step {number}: {title} is complete',
    {
      number,
      title,
    }
  );

  const simpleString = useOuiI18n(
    'ouiStepStrings.simpleComplete',
    'Step {number} is complete',
    { number }
  );

  return title ? string : simpleString;
};

export const useI18nWarningStep = ({ number, title }: Props): string => {
  const string = useOuiI18n(
    'ouiStepStrings.warning',
    'Step {number}: {title} has warnings',
    {
      number,
      title,
    }
  );

  const simpleString = useOuiI18n(
    'ouiStepStrings.simpleWarning',
    'Step {number} has warnings',
    { number }
  );

  return title ? string : simpleString;
};

export const useI18nErrorsStep = ({ number, title }: Props): string => {
  const string = useOuiI18n(
    'ouiStepStrings.errors',
    'Step {number}: {title} has errors',
    {
      number,
      title,
    }
  );

  const simpleString = useOuiI18n(
    'ouiStepStrings.simpleErrors',
    'Step {number} has errors',
    { number }
  );

  return title ? string : simpleString;
};

export const useI18nIncompleteStep = ({ number, title }: Props): string => {
  const string = useOuiI18n(
    'ouiStepStrings.incomplete',
    'Step {number}: {title} is incomplete',
    {
      number,
      title,
    }
  );

  const simpleString = useOuiI18n(
    'ouiStepStrings.simpleIncomplete',
    'Step {number} is incomplete',
    { number }
  );

  return title ? string : simpleString;
};

export const useI18nDisabledStep = ({ number, title }: Props): string => {
  const string = useOuiI18n(
    'ouiStepStrings.disabled',
    'Step {number}: {title} is disabled',
    {
      number,
      title,
    }
  );

  const simpleString = useOuiI18n(
    'ouiStepStrings.simpleDisabled',
    'Step {number} is disabled',
    { number }
  );

  return title ? string : simpleString;
};

export const useI18nLoadingStep = ({ number, title }: Props): string => {
  const string = useOuiI18n(
    'ouiStepStrings.loading',
    'Step {number}: {title} is loading',
    {
      number,
      title,
    }
  );

  const simpleString = useOuiI18n(
    'ouiStepStrings.simpleLoading',
    'Step {number} is loading',
    { number }
  );

  return title ? string : simpleString;
};
