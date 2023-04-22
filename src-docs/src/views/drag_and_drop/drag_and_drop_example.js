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
import { GuideSectionTypes } from '../../components';
import {
  OuiCallOut,
  OuiCode,
  OuiDragDropContext,
  OuiDraggable,
  OuiDroppable,
  OuiLink,
  OuiSpacer,
  OuiText,
} from '../../../../src/components';
import { renderToHtml } from '../../services';

import DragAndDropBare from './drag_and_drop_bare';
const dragAndDropBareSource = require('./drag_and_drop_bare?raw');
const dragAndDropBareHtml = renderToHtml(DragAndDropBare);

import DragAndDrop from './drag_and_drop';
const dragAndDropSource = require('./drag_and_drop?raw');
const dragAndDropHtml = renderToHtml(DragAndDrop);

import DragAndDropCustomHandle from './drag_and_drop_custom_handle';
const dragAndDropCustomHandleSource = require('./drag_and_drop_custom_handle?raw');
const dragAndDropCustomHandleHtml = renderToHtml(DragAndDropCustomHandle);

import DragAndDropDisableBlocking from './drag_and_drop_disable_blocking';
const dragAndDropDisableBlockingSource = require('./drag_and_drop_disable_blocking?raw');
const dragAndDropDisableBlockingHtml = renderToHtml(DragAndDropDisableBlocking);

import DragAndDropMoveLists from './drag_and_drop_move_lists';
const dragAndDropMoveListsSource = require('./drag_and_drop_move_lists?raw');
const dragAndDropMoveListsHtml = renderToHtml(DragAndDropMoveLists);

import DragAndDropTypes from './drag_and_drop_types';
const dragAndDropTypesSource = require('./drag_and_drop_types?raw');
const dragAndDropTypesHtml = renderToHtml(DragAndDropTypes);

import DragAndDropClone from './drag_and_drop_clone';
const dragAndDropCloneSource = require('./drag_and_drop_clone?raw');
const dragAndDropCloneHtml = renderToHtml(DragAndDropClone);

import DragAndDropComplex from './drag_and_drop_complex';
const dragAndDropComplexSource = require('./drag_and_drop_complex?raw');
const dragAndDropComplexHtml = renderToHtml(DragAndDropComplex);

export const DragAndDropExample = {
  title: 'Drag and drop',
  isExperimental: true,
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropBareSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropBareHtml,
        },
      ],
      text: (
        <React.Fragment>
          <OuiText>
            <p>
              An extension of{' '}
              <OuiLink href="https://github.com/atlassian/react-beautiful-dnd">
                react-beautiful-dnd
              </OuiLink>{' '}
              with a compatible API and built-in style opinions. Functionality
              results from 3 components working together:
            </p>
            <ul>
              <li>
                <OuiCode>{'<OuiDragDropContext />'}</OuiCode>: Section of your
                application containing the draggable elements and the drop
                targets.
              </li>
              <li>
                <OuiCode>{'<OuiDroppable />'}</OuiCode>: Area into which items
                can be dropped. Contains one or more{' '}
                <OuiCode>{'<OuiDraggable />'}</OuiCode>.
              </li>
              <li>
                <OuiCode>{'<OuiDraggable />'}</OuiCode>: Items that can be
                dragged. Must be part of an{' '}
                <OuiCode>{'<OuiDroppable />'}</OuiCode>
              </li>
            </ul>
          </OuiText>

          <OuiSpacer />

          <OuiCallOut title="Consider your users, use case" color="warning">
            <p>
              Drag and drop interfaces are not well-adapted to many cases, and
              may be less suitable than other form types for data operations.
              For instance, drag and drop interaction relies heavily on spatial
              orientation that may not be entirelty valid to all users (e.g.,
              screen readers as the sole source of information). Similarly,
              users navigating by keyboard may not be afforded nuanced,
              dual-axis drag item manipulation.
            </p>
            <p>
              {`OUI (largely due to the great work already in react-beautiful-dnd) has and will continue to ensure accessibility where possible.
          With that in mind, keep your users' working context in mind.`}
            </p>
          </OuiCallOut>
        </React.Fragment>
      ),
      props: { OuiDragDropContext, OuiDraggable, OuiDroppable },
      demo: <DragAndDropBare />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropBareSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropBareHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            <strong>OuiDraggable</strong> makes very few assumptions about what
            content it contains. To give affordance to draggable elements and to
            ensure a consistent experience, child elements must be able to
            accept a border and drop shadow (automatically applied via CSS). No
            other style opinions are applied, however.
          </p>
          <p>
            Similarly, <strong>OuiDroppable</strong> must accept a background
            color overlay (automatically applied via CSS), but has no other
            restrictions.
          </p>
          <p>
            All <strong>OuiDragDropContext</strong> elements are discrete and
            isolated; <strong>OuiDroppables</strong> and{' '}
            <strong>OuiDraggables</strong> cannot be shared/transferred between
            instances. Also, <strong>OuiDragDropContexts</strong> cannot be
            nested. It is recommended that a single, high-level{' '}
            <strong>OuiDragDropContext</strong> is used and{' '}
            <strong>OuiDroppables</strong> account for categorical and
            functional separation (see later examples).
          </p>
          <p>
            <strong>OuiDragDropContext</strong> handles all eventing but makes
            no assumptions about the result of a drop event. As such, the
            following event handlers are available:
          </p>
          <ul>
            <li>
              <OuiCode>onBeforeDragStart</OuiCode>
            </li>
            <li>
              <OuiCode>onDragStart</OuiCode>
            </li>
            <li>
              <OuiCode>onDragUpdate</OuiCode>
            </li>
            <li>
              <OuiCode>onDragEnd</OuiCode> (required)
            </li>
          </ul>
          <p>
            OUI also provides methods for helping to deal to common action
            types:
          </p>
          <ul>
            <li>
              <OuiCode>reorder</OuiCode>:{' '}
              {"change an item's location in a droppable area"}
            </li>
            <li>
              <OuiCode>copy</OuiCode>: create a duplicate of an item in a
              different droppable area
            </li>
            <li>
              <OuiCode>move</OuiCode>: move an item to a differnt droppable area
            </li>
          </ul>
        </React.Fragment>
      ),
      props: { OuiDragDropContext, OuiDraggable, OuiDroppable },
      demo: <DragAndDropBare />,
    },
    {
      title: 'Simple item reorder',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            The simplest case, demonstrating a single{' '}
            <strong>OuiDroppable</strong> with <OuiCode>reorder</OuiCode>{' '}
            behavior.
          </p>
          <p>
            Notice the ability to change rendered content based on dragging
            state. <strong>OuiDraggable</strong> <OuiCode>children</OuiCode> is
            a render prop that mush return a <OuiCode>ReactElement</OuiCode>.
            The <OuiCode>snapshot</OuiCode> parameter on that function has state
            data that can be used to alter appearance or behavior (e.g.,{' '}
            <OuiCode>isDragging</OuiCode>).
          </p>
        </React.Fragment>
      ),
      props: { OuiDragDropContext, OuiDraggable, OuiDroppable },
      demo: <DragAndDrop />,
    },
    {
      title: 'Custom drag handle',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropCustomHandleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropCustomHandleHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            By default the entire element surface can initiate a drag. To
            specify a certain element within as the handle, set
            <OuiCode>customDragHandle=true</OuiCode> on the{' '}
            <strong>OuiDraggable</strong>.
          </p>
          <p>
            The <OuiCode>provided</OuiCode> parameter on the{' '}
            <strong>OuiDraggable</strong> <OuiCode>children</OuiCode> render
            prop has all data required for functionality. Along with the{' '}
            <OuiCode>customDragHandle</OuiCode> flag,
            <OuiCode>provided.dragHandleProps</OuiCode> needs to be added to the
            intended handle element.
          </p>
        </React.Fragment>
      ),
      demo: <DragAndDropCustomHandle />,
    },
    {
      title: 'Interactive elements',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropDisableBlockingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropDisableBlockingHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            <strong>OuiDraggable</strong> elements can contain interactive
            elements such as buttons and form fields by adding the
            <OuiCode>disableInteractiveElementBlocking</OuiCode> prop. This will
            keep drag functionality while also enabling click, etc., events on
            the interactive child elements.
          </p>
        </React.Fragment>
      ),
      demo: <DragAndDropDisableBlocking />,
    },
    {
      title: 'Move between lists',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropMoveListsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropMoveListsHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            By default, all <strong>OuiDroppable</strong> elements are of the
            same type and will accept <strong>OuiDraggable</strong> elements
            from others in the same <strong>OuiDragDropContext</strong>.
          </p>
          <p>
            The OUI <OuiCode>move</OuiCode> method is demonstrated in this
            example.
          </p>
        </React.Fragment>
      ),
      demo: <DragAndDropMoveLists />,
    },
    {
      title: 'Distinguish droppable areas by type',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropTypesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropTypesHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            Setting the <OuiCode>type</OuiCode> prop on an{' '}
            <strong>OuiDroppable</strong> element will ensure that it will only
            accept <strong>OuiDraggable</strong> elements from the same type of{' '}
            <strong>OuiDroppable</strong>.
          </p>
          <p>
            Notice that the enabled, compatible <strong>OuiDroppable</strong>{' '}
            elements have a visual change that indicates they can accept the
            actively moving/focused <strong>OuiDraggable</strong> element.
          </p>
        </React.Fragment>
      ),
      demo: <DragAndDropTypes />,
    },
    {
      title: 'Copyable items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropCloneSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropCloneHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            For cases where collections of <strong>OuiDraggable</strong>{' '}
            elements are static or can be used in multiple places set{' '}
            <OuiCode language="js">cloneDraggables=true</OuiCode> on the parent{' '}
            <strong>OuiDroppable</strong>. The <strong>OuiDroppable</strong>{' '}
            becomes disabled (does not accept new <strong>OuiDraggable</strong>{' '}
            elements) in this scenario to avoid mixed content intentions.
          </p>
          <p>
            The OUI <OuiCode>copy</OuiCode> method is available and demonstrated
            in the example below. Note that the data point used as
            <OuiCode>draggableId</OuiCode> in <strong>OuiDraggable</strong> must
            change to allow for real duplication.
          </p>
          <p>
            <OuiCode>isRemovable</OuiCode> is used in the example for cloned
            items. This API is likely to change, but currently provides the
            visual changes with drop-to-remove interactions.
          </p>
        </React.Fragment>
      ),
      demo: <DragAndDropClone />,
    },
    {
      title: 'We have fun',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropComplexSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dragAndDropComplexHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            <strong>OuiDraggables</strong> in <strong>OuiDroppables</strong>,{' '}
            <strong>OuiDroppables</strong> in <strong>OuiDraggables</strong>,
            custom drag handles, horizontal movement, vertical movement,
            flexbox, panel inception, you name it.
          </p>
        </React.Fragment>
      ),
      demo: <DragAndDropComplex />,
    },
  ],
};
