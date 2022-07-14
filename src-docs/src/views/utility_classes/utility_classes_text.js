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
  OuiSpacer,
  OuiTextColor,
  OuiMark,
} from '../../../../src/components';
import { UtilityClassesSection } from './utility_classes_section';

const longLink =
  'http://www.hithereimalongurl.com/dave_will_just_ramble_on_in_a_long_sentence_like_this/?ok=cool';

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
    <UtilityClassesSection
      code="oui-textInheritColor"
      description={
        <>
          <p>Forces the component to inherit its text color from its parent.</p>
          <p>
            For changing the color of your text to on of the named colors, use{' '}
            <strong>OuiText</strong> or <strong>OuiTextColor</strong>.
          </p>
        </>
      }
      example={
        <OuiTextColor color="danger">
          <OuiCode className="oui-textInheritColor">I am code</OuiCode> that
          matches the OuiTextColor
        </OuiTextColor>
      }
      snippet={`<OuiTextColor color="danger">
  <OuiCode className="oui-textInheritColor">I am danger code</OuiCode>
</OuiTextColor>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-textLeft"
      description={
        <p>
          Changes the element’s text alignment property to{' '}
          <OuiCode language="sass">text-align: left;</OuiCode>
        </p>
      }
      example={
        <div className="oui-textLeft">
          <OuiMark style={wrappingExampleStyle}>Left align text</OuiMark>
        </div>
      }
      snippet={`<div className="oui-textLeft">
  /* Your content */
</div>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-textCenter"
      description={
        <p>
          Changes the element’s text alignment property to{' '}
          <OuiCode language="sass">text-align: center;</OuiCode>
        </p>
      }
      example={
        <div className="oui-textCenter">
          <OuiMark style={wrappingExampleStyle}>Center align text</OuiMark>
        </div>
      }
      snippet={`<div className="oui-textCenter">
  /* Your content */
</div>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-textRight"
      description={
        <p>
          Changes the element’s text alignment property to{' '}
          <OuiCode language="sass">text-align: right;</OuiCode>
        </p>
      }
      example={
        <div className="oui-textRight">
          <OuiMark style={wrappingExampleStyle}>Right align text</OuiMark>
        </div>
      }
      snippet={`<div className="oui-textRight">
  /* Your content */
</div>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-textNoWrap"
      description={<p>Forces text not to wrap even in small containers.</p>}
      example={
        <div style={wrappingDivExampleStyle} className="oui-textNoWrap">
          This text will not to wrap but extend beyond the boundaries of the
          yellow box.
        </div>
      }
      snippet={`<div className="oui-textNoWrap">
  /* Your content */
</div>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-textTruncate"
      description={
        <>
          <p>
            Truncates text at 100% width of its parent and will display an
            ellipsis.
          </p>
          <p>
            <strong>Tip:</strong> When truncating text, it is recommended to
            include the full text within an HTML <OuiCode>title</OuiCode>{' '}
            attribute or by wrapping the element within an{' '}
            <strong>OuiToolTip</strong>.
          </p>
        </>
      }
      example={
        <div style={wrappingDivExampleStyle} className="oui-textTruncate">
          This text will not to wrap but truncate beyond the boundaries of the
          yellow box.
        </div>
      }
      snippet={`<div
  className="oui-textTruncate"
  title={Your content}>
  /* Your content */
</div>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-textBreakWord"
      description={
        <p>
          Wraps the text across lines like normal, but forces long words like
          {" URL's"} to break.
        </p>
      }
      example={
        <div style={wrappingDivExampleStyle} className="oui-textBreakWord">
          This text will wrap like normal but this long link {longLink} will
          break mid-word.
        </div>
      }
      snippet={`<div className="oui-textBreakWord">
  /* Your content */
</div>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-textBreakAll"
      description={
        <p>
          Wraps the text across lines always forcing the last word on the line
          to break.
        </p>
      }
      example={
        <div style={wrappingDivExampleStyle} className="oui-textBreakAll">
          This text block will wrap, breaking up anything including long{' '}
          {"URL's"} {longLink} and run on strings like this
          --------------------------------------------------------------------------.
        </div>
      }
      snippet={`<div className="oui-textBreakAll">
  /* Your content */
</div>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-textBreakNormal"
      description={
        <p>
          Reverts the text back to the normal wrapping scheme of not forcing
          word breaks.
        </p>
      }
      example={
        <div style={wrappingDivExampleStyle} className="oui-textBreakNormal">
          This text block will wrap normally, but will not break long {"URL's"}{' '}
          {longLink} but may break run on strings like this
          ---------------------------------------------------------------.
        </div>
      }
      snippet={`<div className="oui-textBreakNormal">
  /* Your content */
</div>`}
    />
  </>
);
