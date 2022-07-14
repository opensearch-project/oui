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

import { OuiListGroup, OuiListGroupItem } from '../../../../src/components';

export default () => {
  const [favorite1, setFavorite1] = useState(undefined);
  const [favorite2, setFavorite2] = useState('link2');
  const [favorite3, setFavorite3] = useState(undefined);
  const [favorite4, setFavorite4] = useState(undefined);

  const link1Clicked = () => {
    setFavorite1(favorite1 === 'link1' ? undefined : 'link1');
    if (favorite1 === undefined) {
      document.activeElement.blur();
    }
  };

  const link2Clicked = () => {
    setFavorite2(favorite2 === 'link2' ? undefined : 'link2');
    if (favorite2 === undefined) {
      document.activeElement.blur();
    }
  };

  const link3Clicked = () => {
    setFavorite3(favorite3 === 'link3' ? undefined : 'link3');
    if (favorite3 === undefined) {
      document.activeElement.blur();
    }
  };

  const link4Clicked = () => {
    setFavorite4(favorite4 === 'link4' ? undefined : 'link4');
    if (favorite3 === undefined) {
      document.activeElement.blur();
    }
  };

  return (
    <OuiListGroup maxWidth={288}>
      <OuiListGroupItem
        id="link1"
        iconType="bullseye"
        label="OUI button link"
        onClick={() => {}}
        isActive
        extraAction={{
          color: 'subdued',
          onClick: link1Clicked,
          iconType: favorite1 === 'link1' ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link1',
          alwaysShow: favorite1 === 'link1',
        }}
      />

      <OuiListGroupItem
        id="link2"
        iconType="visualizeApp"
        onClick={() => {}}
        label="OUI button link"
        extraAction={{
          color: 'subdued',
          onClick: link2Clicked,
          iconType: favorite2 === 'link2' ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link2',
          alwaysShow: favorite2 === 'link2',
        }}
      />

      <OuiListGroupItem
        id="link3"
        iconType="lensApp"
        iconProps={{ color: 'default' }}
        onClick={() => {}}
        label="OUI button link"
        extraAction={{
          color: 'subdued',
          onClick: link3Clicked,
          iconType: favorite3 === 'link3' ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link3',
          alwaysShow: favorite3 === 'link3',
        }}
      />

      <OuiListGroupItem
        id="link4"
        onClick={() => {}}
        iconType="broom"
        label="OUI button link"
        extraAction={{
          color: 'subdued',
          onClick: link4Clicked,
          iconType: favorite4 === 'link4' ? 'starFilled' : 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link4',
          alwaysShow: favorite3 === 'link4',
          isDisabled: true,
        }}
      />

      <OuiListGroupItem
        id="link5"
        iconType="brush"
        isDisabled
        label="OUI button link"
        extraAction={{
          color: 'subdued',
          onClick: () => {},
          iconType: 'starEmpty',
          iconSize: 's',
          'aria-label': 'Favorite link4',
        }}
      />
    </OuiListGroup>
  );
};
