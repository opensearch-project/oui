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

import { GuideRule, GuideRuleTitle, GuideRuleExample } from '../../components/';

import {
  OuiText,
  OuiButton,
  OuiButtonIcon,
  OuiSpacer,
  OuiFlexGroup,
  OuiFlexItem,
  OuiButtonEmpty,
  OuiIcon,
  OuiImage,
  OuiTable,
  OuiTableHeader,
  OuiTableHeaderCell,
  OuiTableBody,
  OuiTableRow,
  OuiTableRowCell,
  OuiTitle,
} from '../../../../src/components';

import ContextMenu from '../context_menu/small';

import imageButtonPlacement from '../../images/button_placement.svg';
import imageButtonPopover from '../../images/button_popover.svg';
import imageButtonEmpty from '../../images/button_empty.svg';
import imageButtonLeft from '../../images/button_left.svg';
import imageButtonRight from '../../images/button_right.svg';
import imageButtonTable from '../../images/button_table.svg';
import imageButtonTypesBad from '../../images/button_types_bad.svg';
import imageButtonTypes from '../../images/button_types.svg';

export default () => (
  <>
    <OuiText grow={false}>
      <p>
        This page documents patterns for button design, including types,
        placement, color, and size.
      </p>
    </OuiText>
    <OuiSpacer size="xl" />

    <OuiTitle>
      <h2>Button types</h2>
    </OuiTitle>

    <OuiSpacer size="xl" />

    <dl>
      <OuiFlexGroup alignItems="center">
        <OuiFlexItem grow={false} style={{ minWidth: 120 }}>
          <OuiButton fill>Filled</OuiButton>
        </OuiFlexItem>

        <OuiFlexItem>
          <OuiText>
            <dt>Filled buttons are for the primary action</dt>
            <dd>
              This button has the heaviest visual weight to draw users&apos;
              attention.
            </dd>
          </OuiText>
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer />

      <OuiFlexGroup alignItems="center">
        <OuiFlexItem grow={false} style={{ minWidth: 120 }}>
          <OuiButton>Standard</OuiButton>
        </OuiFlexItem>

        <OuiFlexItem>
          <OuiText>
            <dt>Standard buttons are for secondary actions</dt>
            <dd>
              Such actions include Add and Apply. This button type works well
              for multiple actions of equal weight.
            </dd>
          </OuiText>
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer />

      <OuiFlexGroup alignItems="center">
        <OuiFlexItem grow={false} style={{ minWidth: 120 }}>
          <OuiButtonEmpty>Empty</OuiButtonEmpty>
        </OuiFlexItem>

        <OuiFlexItem>
          <OuiText>
            <dt>Empty buttons are for complementary, UI-specific actions</dt>
            <dd>
              Close, cancel, filter, refresh, and other actions that reconfigure
              the UI are appropriate for empty buttons.
            </dd>
          </OuiText>
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer />

      <OuiFlexGroup alignItems="center">
        <OuiFlexItem grow={false} style={{ minWidth: 120 }}>
          <div style={{ textAlign: 'center' }}>
            <OuiButtonIcon
              size="s"
              color="danger"
              onClick={() => {}}
              iconType="trash"
              aria-label="Next"
            />
          </div>
        </OuiFlexItem>

        <OuiFlexItem>
          <OuiText>
            <dt>Icon buttons are for saving space</dt>
            <dd>
              The icon must be immediately understood, for example, a trash can
              for delete. Use these buttons sparingly, and never for the primary
              action.
            </dd>
          </OuiText>
        </OuiFlexItem>
      </OuiFlexGroup>
    </dl>

    <GuideRuleTitle>Placement and order</GuideRuleTitle>
    <OuiText>
      <p>Button placement and order should follow the user path.</p>
    </OuiText>

    <GuideRule
      heading="Put buttons on the right in containers with a restricted width"
      description="In contained spaces like modals, popovers, bottom bars, and flyouts, the user path
        is top to bottom, left to right, in a Z-shaped pattern.
        Placing buttons on the bottom right puts them right where users finish scanning.">
      <GuideRuleExample
        type="do"
        text="Place the primary action on the bottom right with the
          secondary action on its left in modals.">
        <div style={{ textAlign: 'center' }}>
          <OuiImage
            alt="button placement in an input modal"
            url={imageButtonPlacement}
            height="252"
          />
        </div>
      </GuideRuleExample>

      <GuideRuleExample
        type="do"
        text="Always use buttons positioned to the right in popovers.">
        <div style={{ textAlign: 'center' }}>
          <OuiImage
            alt="button placement in popovers"
            url={imageButtonPopover}
            height="252"
          />
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Put buttons on the left in unrestricted containers"
      description="
      With large page forms, content is typically concentrated on the top and
        left with a lot of open space to the right. The user path is top to bottom, in an F-shaped pattern.">
      <GuideRuleExample
        type="do"
        text="Put the primary action in the leftmost position so the user's eye never has to leave the one side.">
        <OuiImage
          alt="button placement in form"
          url={imageButtonLeft}
          height="252"
        />
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Put the actions far away from the content.">
        <OuiImage
          alt="form buttons go on the left, not right"
          url={imageButtonRight}
          height="252"
        />
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Other patterns"
      description="Button should always fit the surrounding context
      and stay consistent with the app.">
      <GuideRuleExample
        type="do"
        text="If the action is against the page title, place the primary button in the upper right.
          A common pattern is a create button that adds an item to a list. Creation starts
          at the top and ends at the bottom. Think of it as adding to a pile.">
        <OuiImage
          alt="button placement in upper right"
          url={imageButtonTable}
          height="252"
        />
      </GuideRuleExample>

      <GuideRuleExample
        type="do"
        text="Empty states are unique because they focus first on information and then try to sell
          the user on creation. In these special cases, where the container is constrained
          and the content is fairly short, the title and the button should be center aligned.">
        <OuiImage
          alt="center-aligned button"
          url={imageButtonEmpty}
          height="252"
        />
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>One primary button per layout</GuideRuleTitle>

    <GuideRule
      description="The primary action should not have to compete for attention.
        Use only one filled button per page, modal, form, or other layout.">
      <GuideRuleExample
        type="do"
        text="Use only one filled button per layout. The primary action is
          the one you want the user to eventually complete.">
        <OuiImage
          alt="one primary button per page"
          url={imageButtonTypes}
          height="252"
        />
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Too many primary buttons will confuse the user.">
        <OuiImage
          alt="page without primary button"
          url={imageButtonTypesBad}
          height="252"
        />
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Minimize the mixing of color, size, and type"
      description="When in doubt, use a blue button in the default size and never put more than two
      visual styles next to each other.">
      <GuideRuleExample
        panelColor="subdued"
        type="do"
        text="Stick to the default pattern: a filled, primary button paired with
          an empty, but same-colored button.">
        <div>
          <OuiFlexGroup>
            <OuiFlexItem grow={false}>
              <OuiButton fill>Save</OuiButton>
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiButtonEmpty>Cancel</OuiButtonEmpty>
            </OuiFlexItem>
          </OuiFlexGroup>
        </div>
      </GuideRuleExample>
      <GuideRuleExample
        panelColor="subdued"
        type="dont"
        text="Readability suffers when multiple colors and sizes are used.">
        <div>
          <OuiFlexGroup>
            <OuiFlexItem grow={false}>
              <OuiButton fill>Save</OuiButton>
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiButton>Cancel</OuiButton>
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiButton color="danger" fill size="s">
                Delete
              </OuiButton>
            </OuiFlexItem>
          </OuiFlexGroup>
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>
      Icons in buttons either stand on their own or add context
    </GuideRuleTitle>

    <GuideRule
      description="Icon buttons can save space.
        Limit icon buttons to groups of two, otherwise they lose meaning.">
      <GuideRuleExample
        panelColor="subdued"
        type="do"
        text="Use icon buttons for universal actions that are easy to understand.">
        <div>
          <OuiButtonIcon size="s" iconType="pencil" aria-label="Edit" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <OuiButtonIcon size="s" iconType="expand" aria-label="Expand" />
        </div>
      </GuideRuleExample>
      <GuideRuleExample
        panelColor="subdued"
        type="dont"
        text="Icons alone in a standard button defeats the purpose of saving space.">
        <div>
          <OuiButton>
            <OuiIcon type="pencil" aria-label="Edit" />
          </OuiButton>
          &nbsp;&nbsp;
          <OuiButton>
            <OuiIcon type="expand" aria-label="Expand" />
          </OuiButton>
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      description="Icons can serve as a scanning aid in a text label, but keep to a minimum.
        Icons work best on labels for binary actions, for example, Create and Delete, and final actions, such as Save.">
      <GuideRuleExample
        panelColor="subdued"
        type="do"
        text='Use icons to emphasize actions. The arrow on the Continue
          button lets users know they still have more items to fill out.
          Using the word "complete" with a rare check icon helps users
          understand that this is the final action.'>
        <div>
          <OuiButton iconType="arrowRight" iconSide="right" fill>
            Continue
          </OuiButton>
          &nbsp;&nbsp;
          <OuiButton iconType="check" color="secondary" fill>
            Save and complete
          </OuiButton>
        </div>
      </GuideRuleExample>
      <GuideRuleExample
        panelColor="subdued"
        type="dont"
        text="Unnecessary icons often distract from the text.
          This is especially true when the icon is positioned on the right,
          with a hard to interpret icon.">
        <OuiButton iconType="indexOpen" iconSide="right" fill>
          Create index pattern
        </OuiButton>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Stack action sets into one button</GuideRuleTitle>

    <GuideRule
      description="Two buttons are optimal for a side-by-side layout, three is rare.
      For more buttons, use a dropdown or context menu.">
      <GuideRuleExample
        panelColor="subdued"
        type="do"
        text="Put multiple actions inside a menu triggered by a single rather than showing them separately.">
        <ContextMenu />
      </GuideRuleExample>

      <GuideRuleExample
        panelColor="subdued"
        type="dont"
        text="When there are many buttons, none matter.">
        <div>
          <OuiFlexGroup>
            <OuiFlexItem grow={false}>
              <OuiButton iconType="copy">Copy</OuiButton>
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiButton iconType="pencil">Edit</OuiButton>
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiButton iconType="share">Share</OuiButton>
            </OuiFlexItem>
          </OuiFlexGroup>
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Labels that say what the button does</GuideRuleTitle>

    <OuiText grow={false}>
      <p>
        Labels should provide a clear indication of that action that occurs when
        the user clicks the button. Prefer action words, and include an object
        when it is not clear from the context, for example, Add dashboard.
        Labels should be three words or fewer. If your label requires more
        words, consider using a text link instead.
      </p>

      <h3>Preferred words in buttons</h3>
    </OuiText>

    <OuiSpacer />

    <OuiTable>
      <OuiTableHeader>
        <OuiTableHeaderCell>Text</OuiTableHeaderCell>

        <OuiTableHeaderCell>Description</OuiTableHeaderCell>
      </OuiTableHeader>

      <OuiTableBody>
        <OuiTableRow>
          <OuiTableRowCell isMobileFullWidth>
            <OuiButton>Add thing</OuiButton>
          </OuiTableRowCell>

          <OuiTableRowCell>
            Establishes a new relationship. Often used in a create-then-add
            scenario. You create a dashboard, then add a visualization. Always
            followed by an object. Do not use &quot;Add new.&quot; Remove is the
            correct opposite.
          </OuiTableRowCell>
        </OuiTableRow>

        <OuiTableRow>
          <OuiTableRowCell isMobileFullWidth>
            <OuiButtonEmpty size="s">Cancel</OuiButtonEmpty>
          </OuiTableRowCell>
          <OuiTableRowCell>
            Stops an action without saving pending changes. Never make Cancel
            red&mdash;it&apos;s not a destructive action. Cancel is always an
            empty button.
          </OuiTableRowCell>
        </OuiTableRow>

        <OuiTableRow>
          <OuiTableRowCell isMobileFullWidth>
            <OuiButton fill>Create thing</OuiButton>
          </OuiTableRowCell>

          <OuiTableRowCell>
            Creates a new object from scratch. Always followed by an object, for
            example, “Create pipeline.” Do not use &quot;Create new.&quot;
            Exception: “Add user” is more intuitive than “Create user.” Delete
            is the correct opposite.
          </OuiTableRowCell>
        </OuiTableRow>

        <OuiTableRow>
          <OuiTableRowCell isMobileFullWidth>
            <OuiButton color="danger" fill>
              Delete
            </OuiButton>
            &nbsp;&nbsp;
            <OuiButton color="danger" fill>
              Delete 6 things
            </OuiButton>
            &nbsp;&nbsp;
            <OuiButtonIcon
              size="s"
              color="danger"
              iconType="trash"
              aria-label="delete"
            />
          </OuiTableRowCell>

          <OuiTableRowCell>
            Deletes data so users can longer retrieve it. Create is the correct
            opposite. Do not confuse with Remove.
          </OuiTableRowCell>
        </OuiTableRow>

        <OuiTableRow>
          <OuiTableRowCell isMobileFullWidth>
            <OuiButton color="danger">Remove</OuiButton>&nbsp;&nbsp;
            <OuiButtonIcon
              size="s"
              color="danger"
              iconType="cross"
              aria-label="Remove"
            />
          </OuiTableRowCell>
          <OuiTableRowCell>
            Removes a relationship, but doesn&apos;t permanently delete data.
            For example, you remove a visualization from a dashboard. Add is the
            correct opposite.
          </OuiTableRowCell>
        </OuiTableRow>

        <OuiTableRow>
          <OuiTableRowCell isMobileFullWidth>
            <OuiButton fill>Save</OuiButton>&nbsp;&nbsp;
            <OuiButton fill color="secondary" iconType="check">
              Save and complete
            </OuiButton>
          </OuiTableRowCell>
          <OuiTableRowCell>
            Carries out pending changes, for example, Save edits. Do not confuse
            with Add. Can use green if this button is the final save action.
          </OuiTableRowCell>
        </OuiTableRow>
      </OuiTableBody>
    </OuiTable>

    <OuiSpacer size="xl" />

    <OuiText>
      <h3>Avoid these words in buttons</h3>
    </OuiText>

    <OuiSpacer />

    <OuiTable responsive={false}>
      <OuiTableHeader>
        <OuiTableHeaderCell>Text</OuiTableHeaderCell>

        <OuiTableHeaderCell>Use this instead</OuiTableHeaderCell>
      </OuiTableHeader>
      <OuiTableBody>
        <OuiTableRow>
          <OuiTableRowCell>
            <OuiButton color="danger">Discard</OuiButton>
          </OuiTableRowCell>

          <OuiTableRowCell>Remove or Delete</OuiTableRowCell>
        </OuiTableRow>

        <OuiTableRow>
          <OuiTableRowCell>
            <OuiButton>New</OuiButton>
          </OuiTableRowCell>

          <OuiTableRowCell>Add or Create</OuiTableRowCell>
        </OuiTableRow>

        <OuiTableRow>
          <OuiTableRowCell>
            <OuiButton>OK</OuiButton>
          </OuiTableRowCell>

          <OuiTableRowCell>Words that explain the action</OuiTableRowCell>
        </OuiTableRow>

        <OuiTableRow>
          <OuiTableRowCell>
            <OuiButton>Yes?</OuiButton>&nbsp;&nbsp;
            <OuiButton color="danger">No?</OuiButton>
          </OuiTableRowCell>

          <OuiTableRowCell>Words that explain the action</OuiTableRowCell>
        </OuiTableRow>
      </OuiTableBody>
    </OuiTable>
  </>
);
