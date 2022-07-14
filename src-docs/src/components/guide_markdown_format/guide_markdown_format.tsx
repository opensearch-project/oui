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

import React, { FunctionComponent } from 'react';
import {
  OuiMarkdownFormat,
  getDefaultOuiMarkdownProcessingPlugins,
} from '../../../../src/components/markdown_editor';
import { OuiText } from '../../../../src/components/text';
import { OuiTitle } from '../../../../src/components/title';
import { slugify } from '../../../../src/services';

export type GuideMarkdownFormatProps = {
  children: any;
};

export const GuideMarkdownFormat: FunctionComponent<GuideMarkdownFormatProps> = ({
  children,
}) => {
  const processingPlugins = getDefaultOuiMarkdownProcessingPlugins();
  const rehype2reactConfig = processingPlugins[1][1];

  rehype2reactConfig.components.h2 = ({ children }) => {
    const id = slugify(children[0]);

    return (
      <OuiTitle>
        <h2 id={id}>{children}</h2>
      </OuiTitle>
    );
  };

  rehype2reactConfig.components.p = ({ children }) => (
    <OuiText grow={false}>
      <p>{children}</p>
    </OuiText>
  );

  rehype2reactConfig.components.ul = ({ children }) => (
    <OuiText grow={false}>
      <ul>{children}</ul>
    </OuiText>
  );

  rehype2reactConfig.components.ol = ({ children }) => (
    <OuiText grow={false}>
      <ol>{children}</ol>
    </OuiText>
  );

  return (
    <OuiMarkdownFormat processingPluginList={processingPlugins}>
      {children}
    </OuiMarkdownFormat>
  );
};
