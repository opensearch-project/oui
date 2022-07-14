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

import React, { Fragment } from 'react';

import {
  OuiIcon,
  OuiTabbedContent,
  OuiTitle,
  OuiText,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const tabs = [
    {
      id: 'cobalt--id',
      name: 'Cobalt',
      content: (
        <Fragment>
          <OuiSpacer />
          <OuiTitle>
            <h3>Cobalt</h3>
          </OuiTitle>
          <OuiText>
            Cobalt is a chemical element with symbol Co and atomic number 27.
            Like nickel, cobalt is found in the Earth&rsquo;s crust only in
            chemically combined form, save for small deposits found in alloys of
            natural meteoric iron. The free element, produced by reductive
            smelting, is a hard, lustrous, silver-gray metal.
          </OuiText>
        </Fragment>
      ),
    },
    {
      id: 'dextrose--id',
      name: 'Dextrose',
      content: (
        <Fragment>
          <OuiSpacer />
          <OuiTitle>
            <h3>Dextrose</h3>
          </OuiTitle>
          <OuiText>
            Intravenous sugar solution, also known as dextrose solution, is a
            mixture of dextrose (glucose) and water. It is used to treat low
            blood sugar or water loss without electrolyte loss.
          </OuiText>
        </Fragment>
      ),
    },
    {
      id: 'hydrogen--id',
      name: (
        <span>
          <OuiIcon type="heatmap" />
          &nbsp;Hydrogen
        </span>
      ),
      content: (
        <Fragment>
          <OuiSpacer />
          <OuiTitle>
            <h3>Hydrogen</h3>
          </OuiTitle>
          <OuiText>
            Hydrogen is a chemical element with symbol H and atomic number 1.
            With a standard atomic weight of 1.008, hydrogen is the lightest
            element on the periodic table
          </OuiText>
        </Fragment>
      ),
    },
    {
      id: 'monosodium_glutammate--id',
      name: 'Monosodium Glutamate',
      content: (
        <Fragment>
          <OuiSpacer />
          <OuiTitle>
            <h3>Monosodium Glutamate</h3>
          </OuiTitle>
          <OuiText>
            Monosodium glutamate (MSG, also known as sodium glutamate) is the
            sodium salt of glutamic acid, one of the most abundant naturally
            occurring non-essential amino acids. Monosodium glutamate is found
            naturally in tomatoes, cheese and other foods.
          </OuiText>
        </Fragment>
      ),
    },
  ];

  return (
    <OuiTabbedContent
      tabs={tabs}
      initialSelectedTab={tabs[1]}
      autoFocus="selected"
      onTabClick={(tab) => {
        console.log('clicked tab', tab);
      }}
    />
  );
};
