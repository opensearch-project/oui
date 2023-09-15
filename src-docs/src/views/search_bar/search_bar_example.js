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

import { renderToHtml } from '../../services';
import { propsInfo } from './props_info';

import { GuideRuleTitle, GuideSectionTypes } from '../../components';

import { OuiCode, OuiLink } from '../../../../src/components';

import { SearchBar } from './search_bar';
import { ControlledSearchBar } from './controlled_search_bar';
import { SearchBarFilters } from './search_bar_filters';

const searchBarSource = require('./search_bar?raw');
const searchBarHtml = renderToHtml(SearchBar);

const controlledSearchBarSource = require('./controlled_search_bar?raw');
const controlledSearchBarHtml = renderToHtml(ControlledSearchBar);

const searchBarFiltersSource = require('./search_bar_filters?raw');
const searchBarFiltersHtml = renderToHtml(SearchBarFilters);

export const SearchBarExample = {
  title: 'Search bar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: searchBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: searchBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            An <strong>OuiSearchBar</strong> is a toolbar that enables the user
            to create/define a search query. This can be done either by entering
            the query syntax in a search box or by clicking any of the
            configured filters. The query language is not meant to be full blown
            search language for arbitrary data (e.g. as required in the Discover
            App in OpenSearch Dashboards), yet it does provide some useful
            features:
          </p>
          <ul>
            <li>
              Search <OuiCode>terms</OuiCode> - one can simply type search terms
              (free text words) - Example,
              <OuiCode>website -production</OuiCode>. In this example the
              intention is to find all items that have the &quot;website&quot;
              terms in them but do not have the word &quot;production&quot;
            </li>
            <li>
              Field/value search - one can search for terms within specific
              fields - Example,
              <OuiCode>tag:bug -severity:high</OuiCode>. In this example the
              intention is to find all items that have &quot;bug&quot; in their{' '}
              <OuiCode>tag</OuiCode> field but do not have &quot;high&quot; in
              their
              <OuiCode>severity</OuiCode> field. It is also possible to define
              range queries on numeric and date fields. For example,{' '}
              <OuiCode>followers&gt;=10</OuiCode> will only match items that
              have 10 followers or above. And
              <OuiCode>created&gt;&#39;12 Jan 2018&#39;</OuiCode> will only
              match items that were created after 12th January 2018.
            </li>
            <li>
              <OuiCode>is</OuiCode> clauses - a simple boolean filter over a
              flag - Example,
              <OuiCode>is:open -is:assigned</OuiCode>. In this example the
              intention is to find all items that are flagged as{' '}
              <OuiCode>open</OuiCode> but are not flagged as{' '}
              <OuiCode>assigned</OuiCode>
            </li>
            <li>
              <OuiCode>or group</OuiCode> clauses - allowing multiple clauses to
              be OR&apos;d together - Example,
              <OuiCode>(is:active OR owner:dewey) followers&gt;5</OuiCode>. In
              this example the intention is to find all items that are
              <OuiCode>active</OuiCode> OR owned by <OuiCode>dewey</OuiCode>,
              and have more than 5 <OuiCode>followers</OuiCode>
            </li>
            <li>
              Operators for partial text match <OuiCode>:</OuiCode>, exact text
              match <OuiCode>=</OuiCode>, greater than <OuiCode>&gt;</OuiCode>,
              greater than or equal <OuiCode>&gt;=</OuiCode>, less than{' '}
              <OuiCode>&lt;</OuiCode>, and less than or equal{' '}
              <OuiCode>&lt;=</OuiCode>.
            </li>
          </ul>
          <p>
            While the user can use the syntax described above to enter queries
            in the search box, it is possible to provide the user help with the
            syntax using filters. The filters are UI controls that can
            manipulate the query. The available filters are:
          </p>
          <ul>
            <li>
              <OuiCode>field_value_selection</OuiCode> - A filter to manipulate
              field/value clauses. The filter is associated with a field name,
              and provides the user a list of value options to choose from. This
              filter can be configured to be single or multi select. In a single
              select mode, only one field filter will be added and replaced when
              the user changes the selection. In multi-select mode, a new filter
              will be added for each value selection. It is the intention for
              all these field clauses to be ANDed.
            </li>
            <li>
              <OuiCode>field_value_toggle</OuiCode> - A filter to manipulate a
              single field/value clause. The filter is associated with a field
              name and a value. When the user clicks the control (button) the
              field/value filter is added/removed to/from the query.
            </li>
            <li>
              <OuiCode>field_value_toggle_group</OuiCode> - Similar to the{' '}
              <OuiCode>field_value_toggle</OuiCode> above, except here you can
              define multiple values that will be displayed as a group of toggle
              buttons.
            </li>
            <li>
              <OuiCode>is</OuiCode> - A toggle button that is associated with a
              flag name and when clicked it toggles this flag back and forth
              (adds/removed an <OuiCode>is:</OuiCode> clause to/from the query).
            </li>
          </ul>

          <GuideRuleTitle>Date parsing</GuideRuleTitle>
          <p>
            Date values can be used for equality or range tests when the{' '}
            <OuiCode>schema</OuiCode> prop specifies the field as a{' '}
            <OuiCode>date</OuiCode> type (the <OuiCode>created</OuiCode> field
            in the demo below is a date), and must be enclosed in single quotes.
            E.g.&nbsp;
            <OuiCode>created:&apos;2019-01-01&apos;</OuiCode>,&nbsp;
            <OuiCode>created&gt;=&apos;3rd January 2017&apos;</OuiCode>
          </p>
          <div>
            Formats understood by the parser
            <ul>
              <li>
                relative
                <ul>
                  <li>
                    <OuiCode>yesterday</OuiCode>
                  </li>
                  <li>
                    <OuiCode>today</OuiCode>
                  </li>
                  <li>
                    <OuiCode>tomorrow</OuiCode>
                  </li>
                </ul>
              </li>
              <li>
                absolute (parsed by Moment.js&apos;s&nbsp;
                <OuiLink
                  href="https://momentjs.com/docs/#/parsing/utc/"
                  target="_blank">
                  `utc` method
                </OuiLink>
                )
                <ul>
                  <li>
                    <OuiCode>ddd</OuiCode>
                  </li>
                  <li>
                    <OuiCode>dddd</OuiCode>
                  </li>
                  <li>
                    <OuiCode>D MMM YY</OuiCode>
                  </li>
                  <li>
                    <OuiCode>Do MMM YY</OuiCode>
                  </li>
                  <li>
                    <OuiCode>D MMM YYYY</OuiCode>
                  </li>
                  <li>
                    <OuiCode>Do MMM YYYY</OuiCode>
                  </li>
                  <li>
                    <OuiCode>DD MMM YY</OuiCode>
                  </li>
                  <li>
                    <OuiCode>DD MMM YYYY</OuiCode>
                  </li>
                  <li>
                    <OuiCode>D MMMM YY</OuiCode>
                  </li>
                  <li>
                    <OuiCode>Do MMMM YY</OuiCode>
                  </li>
                  <li>
                    <OuiCode>D MMMM YYYY</OuiCode>
                  </li>
                  <li>
                    <OuiCode>Do MMMM YYYY</OuiCode>
                  </li>
                  <li>
                    <OuiCode>DD MMMM YY</OuiCode>
                  </li>
                  <li>
                    <OuiCode>DD MMMM YYYY</OuiCode>
                  </li>
                  <li>
                    <OuiCode>YYYY-MM-DD</OuiCode>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      ),
      props: propsInfo,
      demo: <SearchBar />,
    },
    {
      title: 'Controlled search bar',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlledSearchBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: controlledSearchBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            An <strong>OuiSearchBar</strong> can have its query controlled by a
            parent component by passing the <OuiCode>query</OuiCode> prop.
            Changes to the query will be passed back up through the{' '}
            <OuiCode>onChange</OuiCode> callback where the new query must be
            stored in state and passed back into the search bar.
          </p>
        </div>
      ),
      demo: <ControlledSearchBar />,
    },
    {
      title: 'Search bar filters',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: searchBarFiltersSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: searchBarFiltersHtml,
        },
      ],
      text: (
        <div>
          <p>
            An <strong>OuiSearchBar</strong> can have custom filter dropdowns
            that control how a user can search.
          </p>
        </div>
      ),
      demo: <SearchBarFilters />,
    },
  ],
};
