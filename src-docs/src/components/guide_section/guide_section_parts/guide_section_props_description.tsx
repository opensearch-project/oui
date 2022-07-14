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

import React, { FunctionComponent, Fragment } from 'react';
import { OuiLink } from '../../../../../src/components/link';
import { OuiSpacer } from '../../../../../src/components/spacer';
import { OuiText } from '../../../../../src/components/text';
import { OuiHorizontalRule } from '../../../../../src/components/horizontal_rule';
import { OuiFlexGroup, OuiFlexItem } from '../../../../../src/components/flex';
import { OuiTitle } from '../../../../../src/components/title';

// @ts-ignore not TS
import { extendedTypesInfo } from '../guide_section_extends';
// @ts-ignore not TS
import { markup } from '../../../services/playground/knobs';

export type GuideSectionPropsDescription = {
  componentName: any;
  component: any;
};

export const GuideSectionPropsDescription: FunctionComponent<GuideSectionPropsDescription> = ({
  componentName,
  component,
}) => {
  const docgenInfo = Array.isArray(component.__docgenInfo)
    ? component.__docgenInfo[0]
    : component.__docgenInfo;

  const { description, extendedInterfaces } = docgenInfo;

  const extendedTypes: string[] = extendedInterfaces
    ? extendedInterfaces.filter((type: any) => !!extendedTypesInfo[type])
    : [];

  // if all extendedTypes are HTMLAttributes, show them all
  // if there is an HTMLAttributes type present among others, remove HTMLAttributes
  if (!extendedTypes.every((type) => type.indexOf('HTMLAttributes') > -1)) {
    if (extendedTypes.includes('HTMLAttributes') && extendedTypes.length > 1) {
      const htmlAttributesIndex = extendedTypes.indexOf('HTMLAttributes');
      extendedTypes.splice(htmlAttributesIndex, 1);
    }
  }

  const extendedTypesElements = extendedTypes.map((type: any, index: any) => (
    <Fragment key={`extendedTypeValue-${extendedTypesInfo[type].name}`}>
      <OuiLink href={extendedTypesInfo[type].url}>
        {extendedTypesInfo[type].name}
      </OuiLink>
      {index + 1 < extendedTypes.length && ', '}
    </Fragment>
  ));

  let descriptionElement;

  if (description) {
    descriptionElement = (
      <>
        <OuiText size="s">
          <p>{markup(description)}</p>
        </OuiText>
        <OuiSpacer size="s" />
      </>
    );
  }

  return (
    <>
      <OuiHorizontalRule margin="none" />
      <OuiSpacer size="m" />
      <div className="guideSection__propsTableIntro">
        <OuiFlexGroup alignItems="baseline" wrap>
          <OuiFlexItem grow={false}>
            <OuiTitle size="s">
              <h3 id={componentName}>{componentName}</h3>
            </OuiTitle>
          </OuiFlexItem>
          {extendedTypesElements.length > 0 && (
            <OuiFlexItem>
              <OuiText size="s">
                <p>[ extends {extendedTypesElements} ]</p>
              </OuiText>
            </OuiFlexItem>
          )}
        </OuiFlexGroup>
        <OuiSpacer size="s" />
        {descriptionElement}
      </div>
    </>
  );
};
