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

import { OuiCode, OuiSpacer, OuiText } from '../../../../src/components';
import { UtilityClassesSection } from './utility_classes_section';
import { renderBreakpoint } from '../guidelines/sass';
import breakpoints from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_responsive.scss';

const ouiBreakPoints = Object.getOwnPropertyNames(breakpoints.ouiBreakpoints);

const wrappingExampleStyle = {
  background: 'rgba(254, 228, 181, 0.5)',
};

const wrappingDivExampleStyle = {
  maxWidth: 300,
  padding: 16,
  ...wrappingExampleStyle,
};

export default () => (
  <>
    <OuiText size="m">
      <p>
        Breakpoint sizes are based on the overall browser window width. They
        start at the mininumum values listed below until 1px before the next
        breakpoint.
      </p>

      {ouiBreakPoints.map(function (size) {
        return renderBreakpoint(size, breakpoints);
      })}
    </OuiText>
    <OuiSpacer size="xxl" />
    <UtilityClassesSection
      code="oui-hideFor--[size]"
      description={
        <>
          <p>
            Hides the element for the specified breakpoint size with
            <OuiCode language="sass">display: none;</OuiCode>. The element will
            still render and exist in the DOM.
          </p>
        </>
      }
      example={
        <>
          <OuiCode className="oui-hideFor--xs">.oui-hideFor--xs</OuiCode>
          <OuiSpacer />
          <OuiCode className="oui-hideFor--s">.oui-hideFor--s</OuiCode>
          <OuiSpacer />
          <OuiCode className="oui-hideFor--m">.oui-hideFor--m</OuiCode>
          <OuiSpacer />
          <OuiCode className="oui-hideFor--l">.oui-hideFor--l</OuiCode>
          <OuiSpacer />
          <OuiCode className="oui-hideFor--xl">.oui-hideFor--xl</OuiCode>
        </>
      }
      snippet={`<span className="oui-hideFor--xs">
  <!-- Your content -->
</span>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-showFor--[size]"
      description={
        <>
          <p>
            Shows the element only for the specified breakpoint by applying
            <OuiCode language="sass">display: none;</OuiCode> for all, then
            applying <OuiCode language="sass">display: inline;</OuiCode> when
            within the breakpoint size. The element will still render and exist
            in the DOM.
          </p>
        </>
      }
      example={
        <>
          <OuiCode className="oui-showFor--xs">.oui-showFor--xs</OuiCode>
          <OuiCode className="oui-showFor--s">.oui-showFor--s</OuiCode>
          <OuiCode className="oui-showFor--m">.oui-showFor--m</OuiCode>
          <OuiCode className="oui-showFor--l">.oui-showFor--l</OuiCode>
          <OuiCode className="oui-showFor--xl">.oui-showFor--xl</OuiCode>
        </>
      }
      snippet={`<span className="oui-showFor--xs">
  <!-- Your content -->
</span>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-showFor--[size]--[display]"
      description={
        <>
          <p>
            The <OuiCode language="html">oui-showFor--[size]</OuiCode> classes
            will force display of <OuiCode>inline</OuiCode> when showing the
            element. You can modify this display property by appending one of
            the following display properties <OuiCode>block</OuiCode>,{' '}
            <OuiCode>inlineBlock</OuiCode>, or <OuiCode>flex</OuiCode>.
          </p>
        </>
      }
      example={
        <div
          style={{ background: wrappingDivExampleStyle.background }}
          className="oui-showFor--xs oui-showFor--s oui-showFor--m--block oui-showFor--l--inlineBlock oui-showFor--xl--flex">
          <span style={wrappingDivExampleStyle}>span</span>
          <span style={wrappingDivExampleStyle}>span</span>
          <span style={wrappingDivExampleStyle}>span</span>
        </div>
      }
      snippet={`<span className="oui-showFor--xs--flex">
  <!-- Your content -->
</span>`}
    />
  </>
);
