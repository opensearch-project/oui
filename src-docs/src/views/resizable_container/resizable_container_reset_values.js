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

import React, { useCallback, useState } from 'react';

import {
  OuiFlexGroup,
  OuiFlexItem,
  OuiText,
  OuiResizableContainer,
  OuiButton,
  OuiSpacer,
} from '../../../../src/components';
import { faker } from '@faker-js/faker';

const text = (
  <>
    <p>{faker.helpers.fake('{{lorem.paragraphs}}')}</p>
    <p>{faker.helpers.fake('{{lorem.paragraphs}}')}</p>
    <p>{faker.helpers.fake('{{lorem.paragraphs}}')}</p>
  </>
);

const firstPanelId = 'resizable-panel__1';
const secondPanelId = 'resizable-panel__2';
const stored = localStorage.getItem('resizableContainer');
const storedSizes = stored && JSON.parse(stored);
const defaultSizes = storedSizes || {
  [firstPanelId]: 50,
  [secondPanelId]: 50,
};

export default () => {
  const [savedSizes, setSavedSizes] = useState(storedSizes);
  const [sizes, setSizes] = useState(defaultSizes);
  const onPanelWidthChange = useCallback((newSizes) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      ...newSizes,
    }));
  }, []);
  const onClickDefault = useCallback(() => setSizes(defaultSizes), []);
  const onClick30x70 = useCallback(
    () =>
      setSizes({
        [firstPanelId]: 30,
        [secondPanelId]: 70,
      }),
    []
  );
  const onClick80x20 = useCallback(
    () =>
      setSizes({
        [firstPanelId]: 80,
        [secondPanelId]: 20,
      }),
    []
  );
  const onSaveToLocalStorage = useCallback(() => {
    setSavedSizes(sizes);
    localStorage.setItem('resizableContainer', JSON.stringify(sizes));
  }, [sizes]);

  return (
    <>
      <OuiFlexGroup>
        <OuiFlexItem>
          <OuiButton onClick={onClickDefault}>{'Reset to defaults'}</OuiButton>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiButton onClick={onClick30x70}>{'30x70'}</OuiButton>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiButton onClick={onClick80x20}>{'80x20'}</OuiButton>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiButton
            fill={savedSizes === sizes}
            iconType={savedSizes === sizes ? 'check' : undefined}
            onClick={onSaveToLocalStorage}>
            {'Store in localStorage'}
          </OuiButton>
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer />

      <OuiResizableContainer
        style={{ height: '200px' }}
        onPanelWidthChange={onPanelWidthChange}>
        {(OuiResizablePanel, OuiResizableButton) => (
          <>
            <OuiResizablePanel
              id={firstPanelId}
              size={sizes[firstPanelId]}
              minSize="30%">
              <OuiText>
                <div>{text}</div>
              </OuiText>
            </OuiResizablePanel>

            <OuiResizableButton />

            <OuiResizablePanel
              id={secondPanelId}
              size={sizes[secondPanelId]}
              minSize="200px">
              <OuiText>
                <div>{text}</div>
              </OuiText>
            </OuiResizablePanel>
          </>
        )}
      </OuiResizableContainer>
    </>
  );
};
