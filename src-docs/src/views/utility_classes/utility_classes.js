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

import { OuiCode, OuiSpacer } from '../../../../src/components';
import { OuiMark } from '../../../../src/components/mark';
import { UtilityClassesSection } from './utility_classes_section';

const wrappingExampleStyle = {
  background: 'rgba(254, 228, 181, 0.5)',
};

export default () => (
  <>
    <UtilityClassesSection
      code="oui-displayBlock"
      description={
        <p>
          Changes the element’s display property to{' '}
          <OuiCode language="sass">display: block;</OuiCode>
        </p>
      }
      example={
        <OuiMark style={wrappingExampleStyle} className="oui-displayBlock">
          Displaying block
        </OuiMark>
      }
      snippet={`<span className="oui-displayBlock">
  /* Your content */
</span>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-displayInline"
      description={
        <p>
          Changes the element’s display property to{' '}
          <OuiCode language="sass">display: inline;</OuiCode>
        </p>
      }
      example={
        <OuiMark style={wrappingExampleStyle} className="oui-displayInline">
          Displaying inline
        </OuiMark>
      }
      snippet={`<div className="oui-displayInline">
  /* Your content */
</div>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-displayInlineBlock"
      description={
        <p>
          Changes the element’s display property to{' '}
          <OuiCode language="sass">display: inline-block;</OuiCode>
        </p>
      }
      example={
        <OuiMark
          style={wrappingExampleStyle}
          className="oui-displayInlineBlock">
          Displaying inline block
        </OuiMark>
      }
      snippet={`<span className="oui-displayInlineBlock">
  /* Your content */
</span>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-fullWidth"
      description={
        <p>
          Changes the element’s display property to{' '}
          <OuiCode language="sass">display: inline-block;</OuiCode> and adds{' '}
          <OuiCode language="sass">width: 100%;</OuiCode>
        </p>
      }
      example={
        <OuiMark style={wrappingExampleStyle} className="oui-fullWidth">
          Displaying full width
        </OuiMark>
      }
      snippet={`<span className="oui-fullWidth">
  /* Your content */
</span>`}
    />
  </>
);
