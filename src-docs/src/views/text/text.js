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

import { OuiText, OuiHorizontalRule } from '../../../../src/components';

export default () => (
  <div>
    <OuiText grow={false}>
      <h1>This is Heading One</h1>
      <p>
        Veniam et quis in dolor aliqua dolor laboris nostrud nostrud Lorem.
        <a href="#">unfashionable</a> Irure et et adipisicing eu mollit. Ullamco
        laborum cillum ea id occaecat cupidatat ex dolor consequat ex mollit do.
        Irure commodo incididunt reprehenderit deserunt cillum quis ad nostrud!{' '}
        <code>const whoa = &quot;!&quot;</code>
      </p>

      <pre>
        <code>const a = &quot;Lorem Ipsum!&quot;;</code>
      </pre>

      <p>
        Aute duis aute deserunt labore aliquip deserunt velit officia consequat
        consectetur eiusmod in.
      </p>

      <blockquote>
        <p>
          Velit officia sunt consequat dolore cillum ad eiusmod culpa et fugiat
          non. Voluptate ullamco excepteur cupidatat quis quis consequat aute
          deserunt aliqua enim occaecat. Sunt officia excepteur est esse labore
          ullamco esse proident labore ea non mollit occaecat. Enim
          reprehenderit quis fugiat excepteur qui ex ipsum velit exercitation
          cupidatat occaecat ea. Consequat mollit officia exercitation consequat
          reprehenderit dolore eiusmod nulla pariatur.
        </p>
      </blockquote>

      <p>
        Elit qui quis officia officia exercitation reprehenderit occaecat
        eiusmod occaecat cillum in esse adipisicing. Labore anim id ut ullamco
        id quis irure quis duis quis eu. Labore Lorem officia elit veniam ut
        cupidatat eiusmod esse reprehenderit. Cupidatat id consequat officia
        proident reprehenderit in nisi. Ullamco quis sit fugiat et consequat
        fugiat adipisicing dolore aute cillum aute adipisicing laborum.
      </p>

      <ul>
        <li>List item one</li>
        <li>List item two</li>
        <li>List item three</li>
      </ul>

      <p>
        Proident ex dolore consectetur cupidatat commodo consectetur quis.
        Officia enim et eu sit elit labore dolore ut ea deserunt et. Anim ad
        minim officia labore dolor pariatur labore officia sit nostrud irure
        eiusmod sint. Ea deserunt adipisicing proident et excepteur adipisicing
        et officia do reprehenderit adipisicing id ex. Commodo culpa consectetur
        nulla adipisicing non occaecat pariatur laboris consectetur. Tempor
        Lorem in labore ullamco cupidatat irure. Exercitation deserunt id
        exercitation quis ullamco quis irure.
      </p>

      <h2>This is Heading Two</h2>

      <ol>
        <li>Number one</li>
        <li>Number two</li>
        <li>Number three</li>
      </ol>

      <p>
        Esse laboris nisi dolore velit culpa. Laboris irure anim Lorem laboris
        sint deserunt laboris. Excepteur nisi sint do non.
      </p>

      <p>
        Consequat consequat duis commodo magna fugiat commodo. Pariatur elit in
        sunt eu officia minim ipsum laborum non occaecat magna. Tempor fugiat ex
        occaecat ullamco do nostrud amet id sit duis aute pariatur ipsum sit.
        Esse aute in eiusmod culpa enim dolor eu proident exercitation. Nulla ad
        magna ea mollit in nulla in ea deserunt nulla pariatur laboris ipsum.
        Aute eu ut ea labore aute sit elit veniam fugiat dolor esse voluptate.
        Proident exercitation labore esse irure labore ut aute laboris dolor
        voluptate reprehenderit cillum.
        <em>through</em>.
      </p>

      <h3>This is Heading Three</h3>

      <p>
        Eu nostrud sunt ex in aliqua fugiat ea ipsum cupidatat occaecat irure
        enim nisi ex. Mollit excepteur quis ex esse sit Lorem amet commodo
        proident proident sunt. Ullamco sunt esse sint esse anim aute in labore.
        Quis occaecat fugiat magna tempor voluptate mollit.
      </p>

      <h4>This is Heading Four</h4>

      <p>
        Nostrud ea officia qui sint reprehenderit ea proident ea. Incididunt do
        nostrud nulla Lorem cillum eiusmod nulla. Id officia reprehenderit
        incididunt dolore. Commodo tempor adipisicing Lorem veniam officia
        ullamco in aute. Sunt fugiat id pariatur culpa ut proident consectetur
        deserunt sint proident. Voluptate mollit minim labore eiusmod tempor.
      </p>

      <h5>This is Heading Five</h5>

      <p>
        <small>
          Amet pariatur sit eiusmod officia sit aliqua ipsum ex reprehenderit.
          Aliqua labore exercitation ullamco pariatur. Nostrud tempor occaecat
          aliquip minim aliqua ullamco reprehenderit velit non et pariatur. Nisi
          aute anim commodo duis. Nisi dolore esse mollit officia fugiat
          adipisicing consequat amet incididunt ullamco quis. Reprehenderit nisi
          ut fugiat sit irure reprehenderit duis fugiat nulla. Ut do elit est
          consequat et cillum cupidatat.
        </small>
      </p>

      <h6>This is Heading Six</h6>

      <OuiHorizontalRule />

      <dl>
        <dt>Et consequat amet sunt irure labore in.</dt>
        <dd>Occaecat sit ad irure laborum labore occaecat.</dd>
        <dt>
          Cupidatat ullamco veniam ipsum occaecat cillum cupidatat laborum est
          ullamco.
        </dt>
        <dd>Non voluptate laborum labore elit consectetur cupidatat.</dd>
        <dt>Laborum dolore ullamco cillum irure proident nostrud ipsum.</dt>
        <dd>
          Sint quis anim quis tempor in duis occaecat laboris sunt cupidatat et
          aliquip.
        </dd>
      </dl>

      <OuiHorizontalRule />

      <dl className="oui-definitionListReverse">
        <dt>Name</dt>
        <dd>Consequat eu eiusmod.</dd>
        <dt>Game style</dt>
        <dd>Open-world, fantasy, action role-playing</dd>
        <dt>Release date</dt>
        <dd>2002</dd>
      </dl>
    </OuiText>
  </div>
);
