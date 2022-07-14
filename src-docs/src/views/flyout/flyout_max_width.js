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

import React, { useState } from 'react';

import {
  OuiFlyout,
  OuiFlyoutBody,
  OuiFlyoutHeader,
  OuiLink,
  OuiText,
  OuiTitle,
  OuiFieldText,
  OuiForm,
  OuiFormRow,
  OuiFilePicker,
  OuiRange,
  OuiSelect,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [flyoutSize, setFlyoutSize] = useState('m');
  const [flyoutMaxWidth, setFlyoutMaxWidth] = useState(false);

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = (size = 'm', maxWidth = false) => {
    setFlyoutSize(size);
    setFlyoutMaxWidth(maxWidth);
    setIsFlyoutVisible(true);
  };

  let flyout;

  if (isFlyoutVisible) {
    let maxWidthTitle;
    switch (flyoutMaxWidth) {
      case true:
        maxWidthTitle = 'Default';
        break;
      case false:
        maxWidthTitle = 'No';
        break;
      default:
        maxWidthTitle = `${flyoutMaxWidth}px`;
        break;
    }

    flyout = (
      <OuiFlyout
        ownFocus
        onClose={closeFlyout}
        aria-labelledby="flyoutMaxWidthTitle"
        size={flyoutSize}
        maxWidth={flyoutMaxWidth}>
        <OuiFlyoutHeader hasBorder>
          <OuiTitle size="m">
            <h2 id="flyoutMaxWidthTitle">{maxWidthTitle} maxWidth</h2>
          </OuiTitle>
        </OuiFlyoutHeader>
        <OuiFlyoutBody>
          <OuiText>
            <p>
              In many cases, you&rsquo;ll want to set a custom width
              that&rsquo;s tailored to your content. In this case, the flyout is
              an ideal width for form elements.
            </p>
          </OuiText>

          <OuiSpacer />

          <OuiForm component="form">
            <OuiFormRow
              label="Text field"
              helpText="I am some friendly help text.">
              <OuiFieldText name="first" />
            </OuiFormRow>

            <OuiFormRow label="Select (with no initial selection)">
              <OuiSelect
                hasNoInitialSelection
                options={[
                  { value: 'option_one', text: 'Option one' },
                  { value: 'option_two', text: 'Option two' },
                  { value: 'option_three', text: 'Option three' },
                ]}
              />
            </OuiFormRow>

            <OuiFormRow label="File picker">
              <OuiFilePicker />
            </OuiFormRow>

            <OuiFormRow label="Range">
              <OuiRange min={0} max={100} name="range" id="range" />
            </OuiFormRow>
          </OuiForm>
        </OuiFlyoutBody>
      </OuiFlyout>
    );
  }
  return (
    <div>
      <OuiLink color="success" onClick={() => showFlyout('s')}>
        Show <strong>small</strong> flyout with <strong>no max-width</strong>
      </OuiLink>
      <OuiSpacer size="s" />
      <OuiLink color="success" onClick={() => showFlyout('s', true)}>
        Show <strong>small</strong> flyout with{' '}
        <strong>default max-width</strong>
      </OuiLink>
      <OuiSpacer size="s" />
      <OuiLink color="danger" onClick={() => showFlyout('s', 200)}>
        Show <strong>small</strong> flyout with{' '}
        <strong>smaller custom max-width</strong> -- minWidth wins except for on
        small screens
      </OuiLink>
      <OuiSpacer size="s" />
      <OuiLink color="danger" onClick={() => showFlyout('s', 448)}>
        Show <strong>small</strong> flyout with{' '}
        <strong>larger custom max-width</strong> -- minWidth wins except for on
        small screens
      </OuiLink>

      <OuiSpacer />

      <OuiLink color="success" onClick={() => showFlyout('m')}>
        Show <strong>medium</strong> flyout with <strong>no max-width</strong>
      </OuiLink>
      <OuiSpacer size="s" />
      <OuiLink color="success" onClick={() => showFlyout('m', true)}>
        Show <strong>medium</strong> flyout with{' '}
        <strong>default max-width</strong>
      </OuiLink>
      <OuiSpacer size="s" />
      <OuiLink color="danger" onClick={() => showFlyout('m', 448)}>
        Show <strong>medium</strong> flyout with{' '}
        <strong>smaller custom max-width</strong> -- minWidth wins and full
        100vw wins on small screens
      </OuiLink>
      <OuiSpacer size="s" />
      <OuiLink color="success" onClick={() => showFlyout('m', 900)}>
        Show <strong>medium</strong> flyout with{' '}
        <strong>larger custom max-width</strong>
      </OuiLink>

      <OuiSpacer />

      <OuiLink color="success" onClick={() => showFlyout('l')}>
        Show <strong>large</strong> flyout with <strong>no max-width</strong>
      </OuiLink>
      <OuiSpacer size="s" />
      <OuiLink color="success" onClick={() => showFlyout('l', true)}>
        Show <strong>large</strong> flyout with{' '}
        <strong>default max-width</strong>
      </OuiLink>
      <OuiSpacer size="s" />
      <OuiLink color="danger" onClick={() => showFlyout('l', 448)}>
        Show <strong>large</strong> flyout with{' '}
        <strong>smaller custom max-width</strong> -- minWidth wins and full
        100vw wins on small screens
      </OuiLink>
      <OuiSpacer size="s" />
      <OuiLink color="success" onClick={() => showFlyout('l', 1600)}>
        Show <strong>large</strong> flyout with{' '}
        <strong>larger custom max-width</strong>
      </OuiLink>

      <OuiSpacer />

      <OuiLink color="success" onClick={() => showFlyout(240)}>
        Show <strong>240</strong> flyout with <strong>no max-width</strong>
      </OuiLink>
      <OuiSpacer size="s" />
      <OuiLink color="success" onClick={() => showFlyout(240, true)}>
        Show <strong>240</strong> flyout with <strong>default max-width</strong>
      </OuiLink>
      <OuiSpacer size="s" />
      <OuiLink color="danger" onClick={() => showFlyout(240, 110)}>
        Show <strong>240</strong> flyout with{' '}
        <strong>smaller custom max-width</strong> -- max-width wins but width
        wins on small screens
      </OuiLink>
      <OuiSpacer size="s" />
      <OuiLink color="success" onClick={() => showFlyout(240, 1600)}>
        Show <strong>240</strong> flyout with{' '}
        <strong>larger custom max-width</strong>
      </OuiLink>

      <OuiSpacer />

      <OuiLink color="primary" onClick={() => showFlyout('m', 0)}>
        Trick for forms: <strong>Medium</strong> flyout with{' '}
        <strong>0 as max-width</strong>
      </OuiLink>

      {flyout}
    </div>
  );
};
