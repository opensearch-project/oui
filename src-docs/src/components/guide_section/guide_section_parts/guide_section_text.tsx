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

import React, { FunctionComponent, ReactNode } from 'react';
import { OuiSpacer } from '../../../../../src/components/spacer';
import { OuiTitle } from '../../../../../src/components/title';
import { OuiText } from '../../../../../src/components/text';

export const LANGUAGES = ['javascript', 'html'] as const;

type GuideSectionExampleText = {
  title?: ReactNode;
  children?: ReactNode;
  wrapText?: boolean;
};

export const GuideSectionExampleText: FunctionComponent<GuideSectionExampleText> = ({
  title,
  children,
  wrapText = true,
}) => {
  let titleNode;

  if (title) {
    titleNode = (
      <>
        <OuiSpacer />
        <OuiTitle>
          <h2>{title}</h2>
        </OuiTitle>
        <OuiSpacer size="m" />
      </>
    );
  }

  let textNode = children;

  if (children && wrapText) {
    textNode = <OuiText>{children}</OuiText>;
  }

  return (
    <>
      {titleNode}
      {textNode}
      {(titleNode || textNode) && <OuiSpacer />}
    </>
  );
};
