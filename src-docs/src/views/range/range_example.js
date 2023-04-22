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

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCallOut,
  OuiDualRange,
  OuiRange,
  OuiCode,
} from '../../../../src/components';

import { rangeConfig, dualRangeConfig } from './playground';

import {
  OuiRangeLevels,
  LEVEL_COLORS,
} from '../../../../src/components/form/range/range_levels';

import { OuiRangeTicks } from '../../../../src/components/form/range/range_ticks';

import { OuiRangeInput } from '../../../../src/components/form/range/range_input';

import DualRangeExample from './dual_range';
const dualRangeSource = require('./dual_range?raw');
const dualRangeHtml = renderToHtml(DualRangeExample);

import RangeExample from './range';
const rangeSource = require('./range?raw');
const rangeHtml = renderToHtml(RangeExample);

import InputExample from './input';
const inputSource = require('./input?raw');
const inputHtml = renderToHtml(InputExample);

import TicksExample from './ticks';
const ticksSource = require('./ticks?raw');
const ticksHtml = renderToHtml(TicksExample);

import LevelsExample from './levels';
const levelsSource = require('./levels?raw');
const levelsHtml = renderToHtml(LevelsExample);

import StatesExample from './states';
const statesSource = require('./states?raw');
const statesHtml = renderToHtml(StatesExample);

import InputOnlyExample from './input_only';
const inputOnlySource = require('./input_only?raw');
const inputOnlyHtml = renderToHtml(InputOnlyExample);

export const RangeControlExample = {
  title: 'Range sliders',
  intro: (
    <Fragment>
      <OuiCallOut color="warning" title="Understanding precision">
        <p>
          Range sliders should only be used when{' '}
          <strong>the precise value is not considered important</strong>. If the
          precise value does matter, add the <OuiCode>showInput</OuiCode> prop
          or use a <strong>OuiFieldNumber</strong> instead.
        </p>
      </OuiCallOut>
    </Fragment>
  ),
  sections: [
    {
      title: 'Single range',
      text: (
        <Fragment>
          <h3>Required</h3>
          <ul>
            <li>
              <OuiCode>min, max</OuiCode>: Sets the range values.
            </li>
            <li>
              <OuiCode>step</OuiCode>: Technically not required because the
              default is <OuiCode>1</OuiCode>.
            </li>
            <li>
              <OuiCode>value, onChange</OuiCode>
            </li>
          </ul>
          <h3>Optional</h3>
          <ul>
            <li>
              <OuiCode>showLabels</OuiCode>: While currently considered
              optional, the property should be added to explicitly state the
              range to the user.
            </li>
            <li>
              <OuiCode>showValue</OuiCode>: Displays a tooltip style indicator
              of the selected value. You can add <OuiCode>valuePrepend</OuiCode>{' '}
              and/or <OuiCode>valueAppend</OuiCode> to bookend the value with
              custom content.
            </li>
            <li>
              <OuiCode>showRange</OuiCode>: Displays a thickened line from the
              minimum value to the selected value.
            </li>
          </ul>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: rangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: rangeHtml,
        },
      ],
      props: {
        OuiRange,
      },
      demo: <RangeExample />,
      snippet: [
        `<OuiRange
  min={100}
  max={200}
  step={0.05}
  value={value}
  onChange={handleChange}
  showLabels
/>`,
        `// Show tooltip
<OuiRange
  min={100}
  max={200}
  value={value}
  onChange={handleChange}
  showLabels
  showValue
/>`,
        `// Show thickened range and prepend a string to the tooltip
<OuiRange
  min={100}
  max={200}
  value={value}
  onChange={handleChange}
  showLabels
  showRange
  showValue
  valuePrepend="100 - "
/>`,
      ],
    },
    {
      title: 'Dual range',
      text: (
        <Fragment>
          <p>
            The <strong>OuiDualRange</strong> accepts almost all the same props
            as the regular <strong>OuiRange</strong>, with the exception of{' '}
            <OuiCode>showRange</OuiCode> which is on by default, and{' '}
            <OuiCode>showValue</OuiCode> since tooltips don&apos;t fit properly
            when there are two.
          </p>
          <OuiCallOut color="warning" title="Retrieving field values">
            <p>
              Two-value <OuiCode>input[type=range]</OuiCode> elements are not
              part of the HTML5 specification. Because of this support gap,{' '}
              <strong>OuiDualRange</strong> cannot expose a native{' '}
              <OuiCode>value</OuiCode> property for native form to consumption.{' '}
              <strong>
                The React <OuiCode>onChange</OuiCode> prop is the recommended
                method for retrieving the upper and lower values.
              </strong>
            </p>
            <p>
              <strong>OuiDualRange</strong> does use native inputs to help
              validate step values and range limits. These may be used as form
              values when <OuiCode>showInput</OuiCode> is in use. The
              alternative is to store values in{' '}
              <OuiCode>input[type=hidden]</OuiCode>.
            </p>
          </OuiCallOut>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dualRangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dualRangeHtml,
        },
      ],
      props: {
        OuiDualRange,
      },
      demo: <DualRangeExample />,
      snippet: [
        `<OuiDualRange
  min={100}
  max={200}
  step={10}
  value={value}
  onChange={handleChange}
  showLabels
/>`,
        `<OuiDualRange
  min={0}
  max={100}
  step={1}
  value={value}
  onChange={handleChange}
  isDraggable
/>`,
      ],
    },
    {
      title: 'Inputs',
      text: (
        <Fragment>
          <p>
            The <OuiCode>showInput</OuiCode> prop, will append or bookend the
            range slider with number type inputs. This is important for allowing
            precise values to be entered by the user.
          </p>
          <p>
            Passing empty strings as the <OuiCode>value</OuiCode> to the ranges,
            will allow the inputs to be blank, though the range handles will
            show at the min (or max and min) positions.
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inputSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inputHtml,
        },
      ],
      demo: <InputExample />,
      props: { OuiRangeInput },
      snippet: ['<OuiRange showInput />', '<OuiDualRange showInput />'],
    },
    {
      title: 'Tick marks',
      text: (
        <Fragment>
          <p>
            To show clickable tick marks and labels at a given interval, add the
            prop <OuiCode>showTicks</OuiCode>. By default, tick mark interval is
            bound to the <OuiCode>step</OuiCode> prop, however, you can set a
            custom interval without changing the actual steps allowed by passing
            a number to the <OuiCode>tickInterval</OuiCode> prop.
          </p>
          <p>
            To pass completely custom tick marks, you can pass an array of
            objects that require a <OuiCode>value</OuiCode> and{' '}
            <OuiCode>label</OuiCode>. The value must be included in the range of
            values (min-max), though the label may be anythin you choose.
          </p>
          <OuiCallOut color="warning" title="Maximum of 20 ticks allowed">
            <p>
              Spacing can get quite cramped with lots of ticks so we max out the
              number to 20.
            </p>
          </OuiCallOut>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ticksSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ticksHtml,
        },
      ],
      demo: <TicksExample />,
      props: { OuiRangeTicks },
      snippet: [
        '<OuiRange step={10} showTicks />',
        '<OuiRange showTicks tickInterval={20} />',
        `<OuiDualRange
  showTicks
  ticks={[
    { label: '20kb', value: 20 },
    { label: '100kb', value: 100 }
  ]}
/>`,
      ],
    },
    {
      title: 'Levels',
      text: (
        <Fragment>
          <p>
            To create colored indicators for certain intervals, pass an array of
            objects that include a <OuiCode>min</OuiCode>,{' '}
            <OuiCode>max</OuiCode> and <OuiCode>color</OuiCode>. Color options
            are{' '}
            <OuiCode language="js">
              {JSON.stringify(LEVEL_COLORS, null, 2)}
            </OuiCode>
            .
          </p>
          <p>
            Be sure to then add an <OuiCode>aria-describedby</OuiCode> and match
            it to the id of a <strong>OuiFormHelpText</strong>.
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: levelsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: levelsHtml,
        },
      ],
      demo: <LevelsExample />,
      props: { OuiRangeLevels },
      snippet: [
        `<OuiRange
  levels={[
    {min: 0, max: 20, color: 'danger'},
    {min: 20, max: 100, color: 'success'}
  ]}
  aria-describedBy={replaceWithID}
/>`,
        `<OuiDualRange
  levels={[
    {min: 0, max: 20, color: 'danger'},
    {min: 20, max: 100, color: 'success'}
  ]}
  aria-describedBy={replaceWithID}
/>`,
      ],
    },
    {
      title: 'Inputs with range in a dropdown',
      text: (
        <Fragment>
          <p>
            Passing{' '}
            <OuiCode language="js">
              showInput=&quot;inputWithPopover&quot;
            </OuiCode>{' '}
            instead of a boolean will only display the inputs until the input is
            interacted with in which case a dropdown will appear displaying the
            actual slider.
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inputOnlySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inputOnlyHtml,
        },
      ],
      demo: <InputOnlyExample />,
      snippet: [
        `<OuiRange
  id={rangeId}
  value={value}
  onChange={handleChange}
  showInput="inputWithPopover"
/>`,
        `<OuiDualRange
  id={rangeId}
  value={value}
  onChange={handleChange}
  showInput="inputWithPopover"
/>`,
      ],
    },
    {
      title: 'Kitchen sink',
      text: (
        <Fragment>
          <p>
            Other alterations you can add to the range are{' '}
            <OuiCode>fullWidth</OuiCode>, and <OuiCode>disabled</OuiCode>.
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statesHtml,
        },
      ],
      demo: <StatesExample />,
      snippet: [
        `<OuiRange
  id={rangeId}
  value={value}
  onChange={handleChange}
  fullWidth
  disabled
  showTicks
  showInput
  showLabels
  showValue
  showRange
  tickInterval={20}
  levels={levels}
  aria-describedBy={replaceWithID}
/>`,
        `<OuiDualRange
  id={rangeId}
  value={value}
  onChange={handleChange}
  fullWidth
  disabled
  showLabels
  showInput
  showTicks
  ticks={[{ label: '20kb', value: 20 }]}
  levels={levels}
  aria-describedBy={replaceWithID}
/>`,
      ],
    },
  ],
  playground: [rangeConfig, dualRangeConfig],
};
