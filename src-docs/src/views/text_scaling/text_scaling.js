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

import {
  OuiText,
  OuiFlexGroup,
  OuiPageContent,
  OuiPageContentBody,
  OuiFlexItem,
} from '../../../../src/components';

const text = [
  <h1 key={0}>This is Heading One</h1>,

  <p key={1}>
    Ea exercitation enim sit aute amet proident nulla id pariatur sint culpa.
    Non occaecat consequat Lorem esse labore fugiat ut laborum ipsum non. Ex
    velit in reprehenderit irure consequat ad proident sint et. Cupidatat quis
    et aliquip ut nostrud. Ad anim eu ex tempor reprehenderit amet laborum sit.
  </p>,

  <h2 key={0.5}>This is Heading Two</h2>,

  <p key={2}>
    Minim duis aliquip ullamco nulla ullamco. Dolor ipsum enim irure et culpa
    nostrud exercitation officia tempor. Aliquip irure est minim mollit nostrud
    velit nulla minim laborum nostrud exercitation.
  </p>,

  <ul key={3}>
    <li>List item one</li>
    <li>List item two</li>
    <li>Dolphins</li>
  </ul>,

  <p key={4}>
    In ea dolor dolore eu. Culpa id mollit et reprehenderit sint cillum elit
    nostrud consequat eu officia deserunt proident. Cupidatat labore duis
    deserunt fugiat aliqua dolor dolore incididunt duis qui minim. In voluptate
    nisi officia culpa fugiat esse aliquip eiusmod fugiat nisi voluptate. Aute
    voluptate elit commodo commodo nisi ullamco esse. Ipsum proident do
    excepteur pariatur veniam cupidatat in est commodo ex cupidatat est.
  </p>,

  <h3 key={5}>This is Heading Three</h3>,

  <ol key={6}>
    <li>Number one</li>
    <li>Number two</li>
    <li>Dolphins</li>
  </ol>,

  <p key={7}>
    Nulla adipisicing labore fugiat deserunt ut. Fugiat nisi aliqua est sit
    aliquip dolore culpa officia. Incididunt aliqua do excepteur est Lorem
    consectetur cillum Lorem voluptate. Aliqua culpa elit proident consectetur
    aliquip cupidatat occaecat. Pariatur reprehenderit amet reprehenderit
    officia culpa nulla ad dolor sit aute cillum. Ea irure irure deserunt esse
    consectetur.
  </p>,

  <p key={8}>
    Dolore id cupidatat ut eiusmod in occaecat. Nisi amet quis eu do et dolore
    do incididunt culpa nisi ut Lorem. Consectetur do ex nostrud incididunt
    consequat aute veniam nostrud deserunt laboris. Labore id voluptate veniam
    sint nisi et Lorem dolore nostrud. <em>through</em>.
  </p>,

  <h4 key={9}>This is Heading Four</h4>,

  <p key={10}>
    Irure ipsum magna culpa aute ullamco. Dolore velit officia quis ad do velit
    laborum culpa irure esse aliqua mollit in eiusmod. Esse pariatur anim
    commodo cillum mollit dolor exercitation eiusmod aliquip elit anim amet non.
    Irure incididunt in laborum duis veniam officia pariatur. Ex quis do sit
    nulla ad culpa dolor laboris magna veniam aliquip cillum esse.
  </p>,

  <h5 key={11}>This is Heading Five</h5>,

  <p key={12}>
    <small>
      Aliqua sunt minim officia duis cupidatat culpa esse fugiat sint et culpa
      consequat enim sint. Nostrud reprehenderit dolore consectetur deserunt
      tempor ex sunt cillum enim quis labore ad. Elit laborum ea culpa esse ad.
      Est aliqua dolore qui elit velit.
    </small>
  </p>,

  <h6 key={13}>This is Heading Six</h6>,
];

export default () => (
  <OuiFlexGroup>
    <OuiFlexItem>
      <OuiPageContent
        role={null}
        className="guideDemo__textLines"
        style={{ padding: 32 }}>
        <OuiPageContentBody>
          <OuiText grow={false}>{text}</OuiText>
        </OuiPageContentBody>
      </OuiPageContent>
    </OuiFlexItem>
    <OuiFlexItem>
      <OuiPageContent
        role={null}
        className="guideDemo__textLines--s"
        style={{ padding: 32 }}>
        <OuiPageContentBody>
          <OuiText grow={false} size="s">
            {text}
          </OuiText>
        </OuiPageContentBody>
      </OuiPageContent>
    </OuiFlexItem>
  </OuiFlexGroup>
);
