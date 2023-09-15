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
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiCard,
  OuiCallOut,
  OuiCheckableCard,
  OuiText,
} from '../../../../src/components';
import { cardConfig, checkableCardConfig } from './playground';

import { OuiCardSelect } from '../../../../src/components/card/card_select';

import Card from './card';
const cardSource = require('./card?raw');

import CardImage from './card_image';
const cardImageSource = require('./card_image?raw');

import CardFooter from './card_footer';
const cardFooterSource = require('./card_footer?raw');

import CardBeta from './card_beta';
const cardBetaSource = require('./card_beta?raw');

import CardLayout from './card_layout';
const cardLayoutSource = require('./card_layout?raw');

import CardSelectable from './card_selectable';
const cardSelectableSource = require('./card_selectable?raw');

import CardChildren from './card_children';
const cardChildrenSource = require('./card_children?raw');

import CardCheckable from './card_checkable';
const cardCheckableSource = require('./card_checkable?raw');
import CardCheckableCheckbox from './card_checkable_checkbox';
const cardCheckableCheckboxSource = require('./card_checkable_checkbox?raw');

import CardDisplay from './card_display';
const cardDisplaySource = require('./card_display?raw');

export const CardExample = {
  title: 'Card',
  intro: (
    <>
      <OuiText>
        <p>
          <strong>OuiCard</strong> is a content-oriented component built on top
          of{' '}
          <Link to="/layout/panel">
            <strong>OuiPanel</strong>
          </Link>
          . Be sure to check out the{' '}
          <Link to="/layout/panel/guidelines">
            guidelines for properly nesting panels
          </Link>
          .
        </p>
      </OuiText>
    </>
  ),
  sections: [
    {
      title: 'Basic card',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardSource,
        },
      ],
      text: (
        <div>
          <p>
            At its core an <strong>OuiCard</strong> should contain a{' '}
            <OuiCode>title</OuiCode>,<OuiCode>description</OuiCode>, and an{' '}
            <OuiCode>icon</OuiCode>. You can make the whole card clickable by
            giving it an <OuiCode>onClick</OuiCode> handler or{' '}
            <OuiCode>href</OuiCode>.
          </p>
          <p>
            For accessibility and heading hierarchy, a card&apos;s title element
            is a <OuiCode>span</OuiCode> by default. However, this can be
            changed via the <OuiCode>titleElement</OuiCode> prop without
            altering the visual size.
          </p>
        </div>
      ),
      props: { OuiCard },
      demo: <Card />,
      demoPanelProps: {
        color: 'subdued',
      },
      snippet: `<OuiCard
  icon={icon}
  title="title"
  description="description"
  onClick={handleClick}
/>`,
      playground: cardConfig,
    },
    {
      title: 'Layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardLayoutSource,
        },
      ],
      text: (
        <div>
          <p>
            Most of the time, cards should read from top to bottom (vertical).
            However, in some cases, you may want the icon to be to the left of
            the content. In this case, add the prop{' '}
            <OuiCode language="js">layout=&quot;horizontal&quot;</OuiCode>.
            Works best when the icon is size <OuiCode>xl</OuiCode>.
          </p>
          <OuiCallOut
            color="danger"
            title={
              <span>
                Horizontal layouts <strong>do not</strong> work with images,
                footers, or <OuiCode>textAlign</OuiCode>. Therefore, these
                properties will be ignored.
              </span>
            }
          />
        </div>
      ),
      props: { OuiCard },
      demo: <CardLayout />,
      demoPanelProps: {
        color: 'subdued',
      },
      snippet: `<OuiCard
layout="horizontal"
icon={icon}
title="title"
description="description"
onClick={handleClick}
/>`,
    },
    {
      title: 'Images',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardImageSource,
        },
      ],
      text: (
        <div>
          <p>
            Images can be added in place of, or in conjuction with, icons. Just
            pass a url into the <OuiCode>image</OuiCode> prop and it will expand
            to the edges of the card.
          </p>
          <OuiCallOut
            title={
              <span>
                Make sure that all images are the{' '}
                <strong>same proportions</strong> when used in a singular row.
              </span>
            }>
            <p>
              Also, when passing an <strong>element</strong> to the{' '}
              <OuiCode>image</OuiCode> prop that consists solely of inline
              elements or does not contain an
              <OuiCode>{'<img />'}</OuiCode> element, each element will require
              a style of <OuiCode>width: 100%</OuiCode>.
            </p>
          </OuiCallOut>
        </div>
      ),
      props: { OuiCard },
      demo: <CardImage />,
      demoPanelProps: {
        color: 'subdued',
      },
      snippet: `<OuiCard
textAlign="left"
image="https://source.unsplash.com/400x200/?Nature"
title="title"
description="description"
onClick={handleClick}
/>`,
    },
    {
      title: 'Footer',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardFooterSource,
        },
      ],
      text: (
        <>
          <p>
            Footers can contain any number of elements and will always align to
            the bottom of the card. However, if you supply a footer containing a{' '}
            <strong>OuiButton</strong> you <strong>must not</strong> also give
            it an <OuiCode>onClick</OuiCode>.
          </p>
          <OuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <span>
                When using footers to display generic &quot;Go&quot; buttons,
                you must provide an <OuiCode>aria-label</OuiCode> to the button
                itself that refers back to the title of the card.
              </span>
            }
          />
        </>
      ),
      components: { OuiCard },
      demo: <CardFooter />,
      demoPanelProps: {
        color: 'subdued',
      },
      snippet: `<OuiCard
  icon={icon}
  title="title"
  description="description"
  footer={footer}
/>`,
    },
    {
      title: 'Experimental badge',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardBetaSource,
        },
      ],
      text: (
        <p>
          If the card links to or references a module that is not GA (beta, lab,
          etc), you can add a <OuiCode>ExperimentalBadgeLabel</OuiCode> and{' '}
          <OuiCode>experimentalBadgeTooltipContent</OuiCode> to the card and it
          will properly create and position an{' '}
          <strong>OuiExperimentalBadge</strong>. If you want to change the title
          of the tooltip, supply a <OuiCode>experimentalBadgeTitle</OuiCode>{' '}
          prop.
        </p>
      ),
      props: { OuiCard },
      demo: <CardBeta />,
      demoPanelProps: {
        color: 'subdued',
      },
      snippet: `<OuiCard
  icon={icon}
  title="title"
  description="description"
  onClick={handleClick}
  betaBadgeLabel="betaBadgeLabel"
  betaBadgeTooltipContent={betaBadgeTooltipContent}
/>`,
    },
    {
      title: 'Selectable',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardSelectableSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            When you have a list of cards that can be selected but{' '}
            <strong>do not navigate anywhere</strong>, you can add the{' '}
            <OuiCode>selectable</OuiCode> prop. The prop is an object that
            extends <strong>OuiButtonEmpty</strong>. It will apply the button as
            seen below, and passing{' '}
            <OuiCode language="js">selectable.isSelected=true</OuiCode> will
            alter the styles of the card and button to look selected.
          </p>
          <OuiCallOut
            color="warning"
            title="When providing an extra link to more details or such, be sure to
            stop event propagation from also selecting the card."
          />
        </Fragment>
      ),
      props: { OuiCardSelect },
      demo: <CardSelectable />,
      demoPanelProps: {
        color: 'subdued',
      },
      snippet: `<OuiCard
  icon={icon}
  title="title"
  description="description"
  selectable={{
    onClick: cardClicked,
    isSelected: cardIsSelected,
    isDisabled: cardIsDisabled,
  }}
  footer={footer}
/>`,
    },
    {
      title: 'Checkable',
      text: (
        <p>
          <strong>OuiCheckableCard</strong> wraps an <strong>OuiRadio</strong>{' '}
          or <strong>OuiCheckbox</strong> with a more-prominent panel, allowing
          for children to be displayed.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardCheckableCheckboxSource,
        },
      ],
      props: {
        OuiCheckableCard,
      },
      demo: <CardCheckableCheckbox />,
      playground: checkableCardConfig,
    },
    {
      text: (
        <OuiCallOut
          iconType="accessibility"
          color="warning"
          title={
            <span>
              When used as a radio group, you must provide a{' '}
              <OuiCode>fieldset</OuiCode> with a <OuiCode>legend</OuiCode> for
              accessibility.
            </span>
          }
        />
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardCheckableSource,
        },
      ],
      props: {
        OuiCheckableCard,
      },
      demo: <CardCheckable />,
    },
    {
      title: 'Custom children',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardChildrenSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            In the event that you need <strong>more than</strong> just paragraph
            text for the <OuiCode>description</OuiCode>, you can suppliment with
            anything you need as the <OuiCode>children</OuiCode> of the
            component. You can also completely replace the description with
            custom children, but <strong>OuiCard</strong> at least one of these.
          </p>
        </Fragment>
      ),
      props: { OuiCard },
      demo: <CardChildren />,
      demoPanelProps: {
        color: 'subdued',
      },
      snippet: `<OuiCard
  textAlign="left"
  title="title"
  description="description">
  <OuiText size="s">
    <ul>
      <li>Bullet 1</li>
      <li>Bullet 2</li>
      <li>Bullet 3</li>
    </ul>
  </OuiText>
</OuiCard>`,
    },
    {
      title: 'Plain and other colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: cardDisplaySource,
        },
      ],
      text: (
        <Fragment>
          <p>
            If you need a card with no borders or shadows pass{' '}
            <OuiCode language="ts">{'display="plain"'}</OuiCode>. This is a good
            option to avoid nested panels. Adding an interaction to the card
            will provide the clickable styling on hover. The{' '}
            <OuiCode language="ts">display</OuiCode> prop also accepts all other{' '}
            <strong>OuiPanel</strong> colors like{' '}
            <OuiCode language="ts">{"'transparent'"}</OuiCode>.
          </p>
          <p>
            For non-interactive cards, reduce or eliminate the padding as needed
            to suit your layout with the prop <OuiCode>paddingSize</OuiCode>.
          </p>
        </Fragment>
      ),
      props: { OuiCard },
      demo: <CardDisplay />,
      snippet: `<OuiCard
  title="title"
  description="description"
  display="plain"
/>`,
    },
  ],
};
