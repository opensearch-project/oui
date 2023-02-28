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
  OuiButtonEmpty,
  OuiCard,
  OuiIcon,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

import figmaSvg from '../../images/figma.svg';

export default () => {
  const [card1Selected, setCard1] = useState(true);
  const [card2Selected, setCard2] = useState(false);

  const card1Clicked = () => {
    setCard1(!card1Selected);
  };

  const card2Clicked = () => {
    setCard2(!card2Selected);
  };

  const detailsClicked = (e) => {
    e.stopPropagation();
  };

  return (
    <OuiFlexGroup gutterSize="l">
      <OuiFlexItem>
        <OuiCard
          icon={<OuiIcon size="xxl" type="logoSketch" />}
          title="Sketch"
          description="Example of a short card description."
          footer={
            <OuiButtonEmpty
              iconType="iInCircle"
              size="xs"
              onClick={detailsClicked}
              aria-label="See more details about Sketch">
              More details
            </OuiButtonEmpty>
          }
          selectable={{
            onClick: card1Clicked,
            isSelected: card1Selected,
          }}
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiCard
          icon={<OuiIcon size="xxl" type="logoGCP" />}
          title="Google"
          description="Example of a longer card description. See how the footers stay lined up."
          footer={
            <OuiButtonEmpty
              iconType="iInCircle"
              size="xs"
              onClick={detailsClicked}
              aria-label="See more details about Google">
              More details
            </OuiButtonEmpty>
          }
          selectable={{
            onClick: card2Clicked,
            isSelected: card2Selected,
          }}
        />
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiCard
          icon={<OuiIcon size="xxl" type={figmaSvg} />}
          title="Figma"
          description="Example of a short card description."
          footer={
            <OuiButtonEmpty
              iconType="iInCircle"
              size="xs"
              onClick={detailsClicked}
              aria-label="See more details about Not Adobe">
              More details
            </OuiButtonEmpty>
          }
          selectable={{
            onClick: () => {},
            isDisabled: true,
          }}
        />
      </OuiFlexItem>
    </OuiFlexGroup>
  );
};
