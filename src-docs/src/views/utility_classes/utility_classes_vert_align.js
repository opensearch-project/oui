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

import { OuiCode, OuiSpacer, OuiIcon } from '../../../../src/components';
import { UtilityClassesSection } from './utility_classes_section';

export default () => (
  <>
    <UtilityClassesSection
      code="oui-alignTop"
      description={
        <p>
          Changes the element’s vertical alignment property to{' '}
          <OuiCode language="sass">vertical-align: top;</OuiCode>
        </p>
      }
      example={
        <p>
          <OuiIcon
            type="logoElasticStack"
            size="xxl"
            className="oui-alignTop"
          />
          &emsp; Icon is aligned to the top of the text
        </p>
      }
      snippet={'<OuiIcon className="oui-alignTop" type="logoElasticStack" />'}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-alignMiddle"
      description={
        <p>
          Changes the element’s vertical alignment property to{' '}
          <OuiCode language="sass">vertical-align: middle;</OuiCode>
        </p>
      }
      example={
        <p>
          <OuiIcon
            type="logoElasticStack"
            size="xxl"
            className="oui-alignMiddle"
          />
          &emsp; Icon is aligned to the middle of the text
        </p>
      }
      snippet={
        '<OuiIcon className="oui-alignMiddle" type="logoElasticStack" />'
      }
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-alignBottom"
      description={
        <p>
          Changes the element’s vertical alignment property to{' '}
          <OuiCode language="sass">vertical-align: bottom;</OuiCode>
        </p>
      }
      example={
        <p>
          <OuiIcon
            type="logoElasticStack"
            size="xxl"
            className="oui-alignBottom"
          />
          &emsp; Icon is aligned to the bottom of the text
        </p>
      }
      snippet={
        '<OuiIcon className="oui-alignBottom" type="logoElasticStack" />'
      }
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-alignBaseline"
      description={
        <p>
          Changes the element’s vertical alignment property to{' '}
          <OuiCode language="sass">vertical-align: baseline;</OuiCode>
        </p>
      }
      example={
        <p>
          <OuiIcon
            type="logoElasticStack"
            size="xxl"
            className="oui-alignBaseline"
          />
          &emsp; Icon is aligned to the baseline of the text
        </p>
      }
      snippet={
        '<OuiIcon className="oui-alignBaseline" type="logoElasticStack" />'
      }
    />
  </>
);
