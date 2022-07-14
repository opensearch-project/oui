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

import { GuideRule, GuideRuleExample } from '../../components';

import {
  OuiText,
  OuiTitle,
  OuiSpacer,
  OuiFlexGroup,
  OuiFlexItem,
  OuiPanel,
  OuiCard,
} from '../../../../src/components';

export default () => (
  <>
    <OuiText grow={false}>
      <h2>So you want to nest panels...</h2>
      <p>
        Panels are one of the basic building blocks of OUI and have a wide
        variety of styles. They are a great tool to help segment and group
        content. But as layouts grow in complexity, <strong>nesting</strong>{' '}
        panels becomes necessary and it can sometimes be difficult to decide
        what style combinations make sense within a panel stack.
      </p>
      <p>
        The following are some guidelines that are meant to help reduce the
        design choices necessary when nesting panels within panels.
      </p>
    </OuiText>

    <OuiSpacer size="xxl" />

    <OuiPanel
      color="subdued"
      paddingSize="l"
      hasShadow={false}
      style={{ justifyContent: 'center', display: 'flex' }}>
      <OuiPanel hasShadow={true} hasBorder={false} style={{ maxWidth: 650 }}>
        <OuiTitle size="m">
          <span>Panel 1</span>
        </OuiTitle>
        <OuiSpacer />
        <OuiPanel color="subdued">
          <OuiTitle size="s">
            <span>Panel 2</span>
          </OuiTitle>
          <OuiSpacer />
          <OuiFlexGroup wrap={true}>
            <OuiFlexItem>
              <OuiCard
                titleSize="xs"
                layout="horizontal"
                title="Card 1"
                description="Cards are panels too."
              />
            </OuiFlexItem>
            <OuiFlexItem>
              <OuiCard
                titleSize="xs"
                layout="horizontal"
                title="Card 2"
                description="Cards are panels too."
              />
            </OuiFlexItem>
            <OuiFlexItem>
              <OuiCard
                titleSize="xs"
                layout="horizontal"
                title="Card 3"
                description="Cards are panels too."
              />
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiPanel>
      </OuiPanel>
    </OuiPanel>

    <OuiSpacer size="xxl" />

    <GuideRule
      heading="When nesting 3 or more panels, use different panel styles"
      description="If the same style panel is used between multiple nested panels, the hierarchy can be visually confusing and the benefit of panels breaks down. While there is no hard and fast rule in which sequence of panels styles should be used,
                   varying the styles will help guide the user through the content relationship.">
      <GuideRuleExample
        type="do"
        text="Break up stacked panel styles with different style combinations.">
        <OuiPanel
          hasShadow={true}
          hasBorder={false}
          style={{ transform: 'scale(.9)' }}>
          <OuiTitle size="s">
            <span>Panel 1</span>
          </OuiTitle>
          <OuiSpacer />
          <OuiPanel color="subdued">
            <OuiTitle size="xs">
              <span>Panel 2</span>
            </OuiTitle>
            <OuiSpacer />
            <OuiPanel
              hasShadow={false}
              hasBorder={true}
              style={{ minHeight: 100 }}>
              <OuiTitle size="xxs">
                <span>Panel 3</span>
              </OuiTitle>
            </OuiPanel>
          </OuiPanel>
        </OuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Too many of same panel style in a stack of panels (3+ deep) isn't helpful.">
        <OuiPanel
          hasShadow={false}
          hasBorder={true}
          style={{ transform: 'scale(.9)' }}>
          <OuiTitle size="s">
            <span>Panel 1</span>
          </OuiTitle>
          <OuiSpacer />
          <OuiPanel hasShadow={false} hasBorder={true}>
            <OuiTitle size="xs">
              <span>Panel 2</span>
            </OuiTitle>
            <OuiSpacer />
            <OuiPanel
              hasShadow={false}
              hasBorder={true}
              style={{ minHeight: 100 }}>
              <OuiTitle size="xxs">
                <span>Panel 3</span>
              </OuiTitle>
            </OuiPanel>
          </OuiPanel>
        </OuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <OuiSpacer size="xl" />

    <GuideRule
      heading="Limit the use of shadows within a stack of panels"
      description="Shadows are great for drawing focus to a single single layer of a page.
                   But if everything has a shadow it becomes too noisy.
                   Use shadows sparingly and try to use them at either the top or bottom of the stack.">
      <GuideRuleExample
        type="do"
        text="Minimize shadows within a panel stack by removing the shadows from all but a single layer.">
        <OuiPanel
          hasShadow={false}
          hasBorder={true}
          style={{ transform: 'scale(.9)' }}>
          <OuiTitle size="s">
            <span>Panel 1</span>
          </OuiTitle>
          <OuiSpacer />
          <OuiPanel color="subdued">
            <OuiTitle size="xs">
              <span>Panel 2</span>
            </OuiTitle>
            <OuiSpacer />
            <OuiPanel style={{ minHeight: 100 }}>
              <OuiTitle size="xxs">
                <span>Panel 3</span>
              </OuiTitle>
            </OuiPanel>
          </OuiPanel>
        </OuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Stacking multiple shadowed panels is too noisy.">
        <OuiPanel
          hasShadow={true}
          hasBorder={false}
          style={{ transform: 'scale(.9)' }}>
          <OuiTitle size="s">
            <span>Panel 1</span>
          </OuiTitle>
          <OuiSpacer />
          <OuiPanel hasShadow={true} hasBorder={false}>
            <OuiTitle size="xs">
              <span>Panel 2</span>
            </OuiTitle>
            <OuiSpacer />
            <OuiPanel
              hasShadow={true}
              hasBorder={false}
              style={{ minHeight: 100 }}>
              <OuiTitle size="xxs">
                <span>Panel 3</span>
              </OuiTitle>
            </OuiPanel>
          </OuiPanel>
        </OuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Don’t overuse panels"
      description={
        'It’s easy to fall into the thinking that everything needs a panel. Carefully consider why you need a panel and if too many elements are fighting for attention.'
      }>
      <GuideRuleExample
        type="do"
        text="Reserve panels for drawing attention to certain elements.">
        <OuiPanel
          color="subdued"
          hasShadow={false}
          style={{ transform: 'scale(.9)' }}>
          <OuiTitle size="s">
            <span>Panel 1</span>
          </OuiTitle>
          <OuiSpacer size="s" />
          <OuiTitle size="xs">
            <span>Sub-heading</span>
          </OuiTitle>
          <OuiSpacer />
          <OuiPanel style={{ minHeight: 100 }}>
            <OuiTitle size="xxs">
              <span>Panel 2</span>
            </OuiTitle>
          </OuiPanel>
        </OuiPanel>
      </GuideRuleExample>

      <GuideRuleExample
        type="do"
        text="Remove panel styles but keep the component purely for containment.">
        <OuiPanel
          color="subdued"
          hasShadow={false}
          style={{ transform: 'scale(.9)' }}>
          <OuiTitle size="s">
            <span>Panel 1</span>
          </OuiTitle>
          <OuiSpacer size="s" />
          <OuiPanel color="transparent" paddingSize="none">
            <OuiTitle size="xs">
              <span>Panel 2</span>
            </OuiTitle>
            <OuiSpacer />
            <OuiPanel
              hasShadow={true}
              hasBorder={false}
              style={{ minHeight: 100 }}>
              <OuiTitle size="xxs">
                <span>Panel 3</span>
              </OuiTitle>
            </OuiPanel>
          </OuiPanel>
        </OuiPanel>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Consider the relationship between sibling panels"
      description="When sibling panels have the same meaning and interaction, like cards, it is best to keep them all visually similar.
                    On the other hand you can use panels to separate main from aside content.
                    In this case, you will want to ensure visual prominence of the main content.">
      <GuideRuleExample
        type="do"
        text="Use the same styles for cards in a row.">
        <OuiPanel
          hasShadow={false}
          hasBorder={true}
          style={{ transform: 'scale(.9)' }}>
          <OuiTitle size="s">
            <span>Panel 1</span>
          </OuiTitle>
          <OuiSpacer />
          <OuiPanel color="subdued">
            <OuiTitle size="xs">
              <span>Panel 2</span>
            </OuiTitle>
            <OuiSpacer />
            <OuiFlexGroup wrap={true}>
              <OuiFlexItem>
                <OuiCard
                  titleSize="xs"
                  layout="horizontal"
                  title="Card 1"
                  description="Cards are panels too."
                />
              </OuiFlexItem>
              <OuiFlexItem>
                <OuiCard
                  titleSize="xs"
                  layout="horizontal"
                  title="Card 2"
                  description="Cards are panels too."
                />
              </OuiFlexItem>
            </OuiFlexGroup>
          </OuiPanel>
        </OuiPanel>
      </GuideRuleExample>

      <GuideRuleExample type="do" text="Only emphasize the main content panel.">
        <OuiPanel
          color="subdued"
          hasShadow={false}
          style={{ transform: 'scale(.9)' }}>
          <OuiTitle size="s">
            <span>Panel 1</span>
          </OuiTitle>
          <OuiSpacer />
          <OuiFlexGroup responsive={false} wrap={true}>
            <OuiFlexItem grow={2}>
              <OuiPanel
                hasShadow={true}
                hasBorder={false}
                style={{ minHeight: 170 }}>
                <OuiTitle size="xs">
                  <span>Main panel</span>
                </OuiTitle>
              </OuiPanel>
            </OuiFlexItem>
            <OuiFlexItem>
              <OuiPanel
                hasShadow={false}
                hasBorder={true}
                color="transparent"
                style={{ minHeight: 170 }}>
                <OuiTitle size="xs">
                  <span>Aside panel</span>
                </OuiTitle>
              </OuiPanel>
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiPanel>
      </GuideRuleExample>
    </GuideRule>
  </>
);
