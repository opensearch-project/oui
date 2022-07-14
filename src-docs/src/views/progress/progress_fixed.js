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

import React, { useState, useEffect } from 'react';

import {
  OuiProgress,
  OuiSpacer,
  OuiButton,
  OuiText,
  OuiPanel,
  OuiCallOut,
  OuiFlexGroup,
  OuiFlexItem,
  OuiHeader,
  OuiHeaderLogo,
  OuiHeaderSection,
  OuiHeaderSectionItem,
  OuiPortal,
} from '../../../../src/components';

export default () => {
  const [value, setValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  let timer;
  const progress = (value) => {
    if (value > 100) {
      setValue(100);
    } else {
      setValue(value);
      const diff = Math.round(Math.random() * 10);
      timer = setTimeout(() => progress(value + diff), 250);
    }
  };

  const toggleProgress = () => {
    const currentState = showProgress;

    if (!currentState) {
      timer = setTimeout(() => progress(0), 250);
    } else {
      clearTimeout(timer);
      setValue(0);
    }
    setShowProgress(!showProgress);
    setShowHeader(false);
  };

  const toggleHeader = () => {
    setShowProgress(false);
    setShowHeader(!showHeader);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  let progress2 = null;

  if (showProgress) {
    progress2 = (
      <div>
        <OuiCallOut title="Look up!" color="warning" iconType="sortUp">
          <p>The progress bar is fixed to the top of your browser.</p>
        </OuiCallOut>
        <OuiProgress value={value} max={100} size="s" position="fixed" />
      </div>
    );
  }

  if (showHeader) {
    progress2 = (
      <div>
        <OuiCallOut title="Look up!" color="warning" iconType="sortUp">
          <p>
            The progress bar is fixed to the top of your browser and positioned
            above an <strong>OuiHeader</strong>.
          </p>
        </OuiCallOut>
        <OuiHeader
          style={{ position: 'fixed', top: 0, left: 0, width: '100%' }}>
          <OuiHeaderSection grow={false}>
            <OuiHeaderSectionItem border="right">
              <OuiHeaderLogo
                iconType="logoKibana"
                href="#"
                aria-label="Go to home page"
              />
            </OuiHeaderSectionItem>
          </OuiHeaderSection>
        </OuiHeader>
        <div style={{ position: 'absolute', zIndex: '5' }}>
          <OuiPortal>
            <OuiProgress size="xs" color="accent" position="fixed" />
          </OuiPortal>
        </div>
      </div>
    );
  }

  return (
    <div>
      <OuiPanel style={{ width: 300, position: 'relative' }}>
        <OuiProgress size="xs" color="accent" position="absolute" />
        <OuiText>
          <h2>Absolutely!</h2>
          <p>
            The progress bar is absolutely positioned in this panel. You could
            see how this might be useful in our Toast component.
          </p>
        </OuiText>
      </OuiPanel>

      <OuiSpacer size="l" />

      <OuiFlexGroup gutterSize="s" alignItems="center">
        <OuiFlexItem grow={false}>
          <OuiButton size="s" onClick={toggleProgress}>
            Toggle a fixed bar
          </OuiButton>
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiButton size="s" onClick={toggleHeader}>
            Toggle a fixed bar with header
          </OuiButton>
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer size="l" />

      {progress2}
    </div>
  );
};
