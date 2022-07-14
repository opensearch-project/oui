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

import React, { useEffect, useState } from 'react';

import {
  OuiBadge,
  OuiCode,
  OuiHighlight,
  OuiHorizontalRule,
  OuiPanel,
  OuiText,
  OuiSpacer,
  OuiInnerText,
} from '../../../../src/components';

export default () => {
  const first = 'First';
  const second = 'Second';
  const [thing, setThing] = useState(first);
  const [[thing2, type], setThingAndType] = useState([first, 'span']);
  useEffect(() => {
    setTimeout(() => {
      const newThing = thing === second ? first : second;
      const newType = type === 'div' ? 'span' : 'div';
      setThing(newThing);
      setThingAndType([newThing, newType]);
    }, 5000);
  }, [thing, type]);

  return (
    <OuiText size="s">
      <p>
        <strong>Example:</strong>
      </p>
      <OuiInnerText>
        {(ref, innerText) => (
          <React.Fragment>
            <OuiPanel paddingSize="s" className="oui-displayInlineBlock">
              <span ref={ref} title={innerText}>
                Simple string content
              </span>
            </OuiPanel>
            <OuiSpacer />
            <p className="oui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <OuiCode>{innerText}</OuiCode>
          </React.Fragment>
        )}
      </OuiInnerText>

      <OuiHorizontalRule margin="xl" />

      <p>
        <strong>Example with complex children:</strong>
      </p>
      <OuiInnerText>
        {(ref, innerText) => (
          <React.Fragment>
            <OuiPanel paddingSize="s" className="oui-displayInlineBlock">
              <span ref={ref} title={innerText}>
                <OuiHighlight search="content">
                  OuiHighlight content
                </OuiHighlight>{' '}
                <OuiBadge>with OuiBadge</OuiBadge>
              </span>
            </OuiPanel>
            <OuiSpacer />
            <p className="oui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <OuiCode>{innerText}</OuiCode>
          </React.Fragment>
        )}
      </OuiInnerText>

      <OuiHorizontalRule margin="xl" />

      <p>
        <strong>Example with updating content:</strong>
      </p>
      <OuiInnerText>
        {(ref, innerText) => (
          <React.Fragment>
            <OuiPanel paddingSize="s" className="oui-displayInlineBlock">
              <span ref={ref} title={innerText}>
                {thing}
              </span>
            </OuiPanel>
            <OuiSpacer />
            <p className="oui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <OuiCode>{innerText}</OuiCode>
          </React.Fragment>
        )}
      </OuiInnerText>

      <OuiHorizontalRule margin="xl" />

      <p>
        <strong>Example with updating element:</strong>
      </p>
      <OuiInnerText>
        {(ref, innerText) => (
          <React.Fragment>
            <OuiPanel paddingSize="s" className="oui-displayInlineBlock">
              {React.createElement(
                type,
                {
                  ref,
                  title: innerText,
                },
                thing2
              )}
            </OuiPanel>
            <OuiSpacer />
            <p className="oui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <OuiCode>{innerText}</OuiCode>
          </React.Fragment>
        )}
      </OuiInnerText>
    </OuiText>
  );
};
