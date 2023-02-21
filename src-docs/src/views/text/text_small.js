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
  OuiFlexItem,
  OuiHorizontalRule,
} from '../../../../src/components';

const exampleText = (
  <div>
    <h1>This is Heading One</h1>
    <p>
      Exercitation laboris aute cillum eiusmod occaecat tempor. Esse occaecat
      voluptate consequat consequat dolor consequat. Duis nostrud officia
      nostrud deserunt sunt consequat officia consequat sit reprehenderit velit
      fugiat ad proident. Fugiat nulla ex deserunt sint ea. Excepteur ut laboris
      proident ullamco duis proident eiusmod enim ad sint. Consectetur aliqua
      mollit enim veniam. <code>const whoa = &quot;!&quot;</code>
    </p>

    <pre>
      <code>const a = &quot;Lorem ipsum!&quot;;</code>
    </pre>

    <p>
      Proident velit aliqua veniam reprehenderit. Dolore amet occaecat do
      deserunt excepteur nulla Lorem velit qui id ea duis. Dolore nostrud
      reprehenderit ex est ad excepteur ipsum aute ex. Aute ut mollit duis non
      aliqua mollit id dolore id nisi sint amet minim magna. Mollit veniam
      commodo laboris qui incididunt adipisicing laborum. Quis officia enim
      deserunt laboris anim qui culpa tempor aliquip enim elit.
    </p>

    <ul>
      <li>List item one</li>
      <li>List item two</li>
      <li>Dolphins</li>
    </ul>

    <p>
      Veniam consectetur adipisicing commodo ipsum adipisicing eu commodo culpa
      ipsum minim proident. Est aute commodo ex in ullamco nostrud officia
      pariatur esse duis consequat deserunt. Occaecat aliquip id commodo aute
      mollit mollit labore occaecat. Aliqua aute ea reprehenderit cillum anim.
    </p>

    <h2>This is Heading Two</h2>

    <ol>
      <li>Number one</li>
      <li>Number two</li>
      <li>Dolphins again</li>
    </ol>

    <p>
      Sint ullamco fugiat adipisicing dolore est cupidatat esse ea nostrud.
      Labore aliqua pariatur nulla aliqua reprehenderit. Ullamco minim pariatur
      aliqua culpa exercitation sit occaecat excepteur aliquip labore esse
      culpa. Reprehenderit esse sunt esse ad ad laborum elit incididunt Lorem
      exercitation laborum cillum.
    </p>

    <p>
      Amet qui est et elit magna veniam id enim consequat in. Sunt anim mollit
      mollit amet. Dolor amet amet aliquip aute qui aliqua do aliqua id sunt ea.
      Velit sit officia veniam dolore ea anim adipisicing nostrud occaecat
      veniam in. Velit est non exercitation aliqua occaecat aute qui ullamco
      officia pariatur. <em>through</em>.
    </p>

    <h3>This is Heading Three</h3>

    <p>
      Minim amet duis elit aute ipsum non anim consectetur aliquip quis amet.
      Reprehenderit ullamco do irure mollit amet non duis velit dolore ea.
      Commodo mollit aute dolore ea non minim nulla commodo ipsum pariatur sit.
      Sint commodo labore ullamco anim excepteur aute ut non elit ipsum. Velit
      amet magna culpa voluptate labore cupidatat pariatur irure velit non irure
      id dolore officia. Ex aliquip labore ipsum aliquip magna sunt irure
      deserunt aliqua deserunt proident labore occaecat. Duis proident irure
      ipsum proident est officia cillum proident labore sit labore.
    </p>

    <h4>This is Heading Four</h4>

    <p>
      Veniam nulla dolor amet Lorem irure exercitation incididunt consequat.
      Veniam reprehenderit ipsum nulla enim laboris sit non cupidatat. Veniam
      fugiat qui minim culpa sint officia incididunt elit labore veniam cillum
      est. Consequat id enim sint velit consectetur dolor sint deserunt.
    </p>

    <h5>This is Heading Five</h5>

    <p>
      <small>
        Incididunt magna anim do elit commodo labore occaecat. Tempor laboris
        nostrud et ad proident quis et sit eiusmod officia incididunt enim
        deserunt officia. Dolore in velit officia irure labore proident cillum.
      </small>
    </p>

    <h6>This is Heading Six</h6>

    <OuiHorizontalRule />

    <dl>
      <dt>Aliquip laborum anim ipsumd et Lorem qui voluptate laborum.</dt>
      <dd>Consequat voluptate occaecat nisiincididunt sunt.</dd>
      <dt>Velit in ad do esse.</dt>
      <dd>Sint officia incididunt veniam commodo cillum in sunt.</dd>
      <dt>Laboris sit nisi culpa nulla id aute.</dt>
      <dd>Nisi cupidatat sit commodo aliqua.</dd>
    </dl>
  </div>
);

export default () => (
  <OuiFlexGroup>
    <OuiFlexItem>
      <OuiText size="s">{exampleText}</OuiText>
    </OuiFlexItem>
    <OuiFlexItem>
      <OuiText size="xs">{exampleText}</OuiText>
    </OuiFlexItem>
  </OuiFlexGroup>
);
