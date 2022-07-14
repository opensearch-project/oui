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

import { OuiSelectableListItem } from '../../../../src/components/selectable';
import { OuiAvatar } from '../../../../src/components/avatar';
import { OuiPanel } from '../../../../src/components/panel';

export default () => {
  const props = {
    style: {
      height: 68,
      width: '100%',
    },
    title: 'Example of the OuiSelectableSitewideOption',
    showIcons: false,
    prepend: <OuiAvatar name="B" color="#eee" type="space" size="s" />,
    append: <OuiAvatar name="C" color="#eee" type="space" size="s" />,
    className: 'ouiSelectableTemplateSitewide__listItem',
    role: 'presentation',
    'aria-selected': undefined,
  };

  return (
    <OuiPanel paddingSize="none">
      <OuiSelectableListItem {...props}>
        <span className="ouiSelectableTemplateSitewide__listItemTitle">
          A. Label
        </span>
        <span className="ouiSelectableTemplateSitewide__optionMetasList">
          <span className="ouiSelectableTemplateSitewide__optionMeta ouiSelectableTemplateSitewide__optionMeta--application">
            D. Meta
          </span>
          <span className="ouiSelectableTemplateSitewide__optionMeta ouiSelectableTemplateSitewide__optionMeta--deployment">
            Deployment
          </span>
          <span className="ouiSelectableTemplateSitewide__optionMeta">
            Default display
          </span>
        </span>
      </OuiSelectableListItem>
    </OuiPanel>
  );
};
