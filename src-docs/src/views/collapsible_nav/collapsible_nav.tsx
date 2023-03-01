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

import { OuiCollapsibleNav } from '../../../../src/components/collapsible_nav';
import { OuiButton } from '../../../../src/components/button';
import { OuiTitle } from '../../../../src/components/title';
import { OuiSpacer } from '../../../../src/components/spacer';
import { OuiText } from '../../../../src/components/text';
import { OuiCode } from '../../../../src/components/code';

export default () => {
  const [navIsOpen, setNavIsOpen] = useState<boolean>(
    JSON.parse(
      String(localStorage.getItem('ouiCollapsibleNavExample--isDocked'))
    ) || false
  );
  const [navIsDocked, setNavIsDocked] = useState<boolean>(
    JSON.parse(
      String(localStorage.getItem('ouiCollapsibleNavExample--isDocked'))
    ) || false
  );

  return (
    <>
      <OuiCollapsibleNav
        isOpen={navIsOpen}
        isDocked={navIsDocked}
        size={240}
        button={
          <OuiButton onClick={() => setNavIsOpen((isOpen) => !isOpen)}>
            Toggle nav
          </OuiButton>
        }
        onClose={() => setNavIsOpen(false)}>
        <div style={{ padding: 16 }}>
          <OuiTitle>
            <h2>Navigation</h2>
          </OuiTitle>
          <OuiSpacer />
          <OuiText size="s" color="subdued">
            <p>
              The docked status is being stored in{' '}
              <OuiCode>localStorage</OuiCode>.
            </p>
          </OuiText>
          <OuiSpacer />
          <OuiButton
            onClick={() => {
              setNavIsDocked(!navIsDocked);
              localStorage.setItem(
                'ouiCollapsibleNavExample--isDocked',
                JSON.stringify(!navIsDocked)
              );
            }}>
            Docked: {navIsDocked ? 'on' : 'off'}
          </OuiButton>
        </div>
      </OuiCollapsibleNav>

      {navIsDocked && (
        <OuiText size="s" color="subdued">
          <p>
            The <OuiCode>button</OuiCode> gets hidden by default when the nav is
            docked unless you set{' '}
            <OuiCode language="js">showButtonIfDocked = true</OuiCode>.
          </p>
        </OuiText>
      )}
    </>
  );
};
