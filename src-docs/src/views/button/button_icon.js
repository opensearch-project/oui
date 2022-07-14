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
  OuiButtonIcon,
  OuiFlexGroup,
  OuiFlexItem,
  OuiSpacer,
  OuiTitle,
} from '../../../../src/components';

const colors = ['primary', 'text', 'accent', 'success', 'warning', 'danger'];

export default () => (
  <>
    <OuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
      {colors.map((color) => (
        <OuiFlexItem key={color} grow={false}>
          <OuiButtonIcon
            color={color}
            onClick={() => {}}
            iconType="arrowRight"
            aria-label="Next"
          />
        </OuiFlexItem>
      ))}
    </OuiFlexGroup>
    <OuiSpacer size="m" />
    <OuiTitle size="xxs">
      <h3>Display</h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButtonIcon iconType="arrowRight" aria-label="Next" />
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiButtonIcon display="base" iconType="arrowRight" aria-label="Next" />
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiButtonIcon display="fill" iconType="arrowRight" aria-label="Next" />
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer size="s" />
    <OuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButtonIcon iconType="arrowRight" isDisabled aria-label="Next" />
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiButtonIcon
          display="base"
          iconType="arrowRight"
          isDisabled
          aria-label="Next"
        />
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiButtonIcon
          iconType="arrowRight"
          display="fill"
          isDisabled
          aria-label="Next"
        />
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer size="m" />
    <OuiTitle size="xxs">
      <h3>Size</h3>
    </OuiTitle>
    <OuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButtonIcon display="base" iconType="arrowRight" aria-label="Next" />
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiButtonIcon
          display="base"
          iconType="arrowRight"
          size="s"
          aria-label="Next"
        />
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiButtonIcon
          display="base"
          iconType="arrowRight"
          iconSize="l"
          size="m"
          aria-label="Next"
        />
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer size="m" />
    <OuiTitle size="xxs">
      <h3>Icons inherit by default the button color</h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButtonIcon iconType="heart" aria-label="Heart" color="accent" />
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiButtonIcon
          iconType="dashboardApp"
          aria-label="Dashboard"
          color="success"
        />
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiButtonIcon
          display="base"
          iconType="trash"
          aria-label="Delete"
          color="danger"
        />
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiButtonIcon display="base" iconType="lensApp" aria-label="Lens" />
      </OuiFlexItem>
    </OuiFlexGroup>
  </>
);
