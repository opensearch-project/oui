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
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCallOut,
  OuiCode,
  OuiCodeBlock,
  OuiLink,
  OuiResizableContainer,
  OuiText,
} from '../../../../src/components';
// eslint-disable-next-line
import { OuiResizablePanel } from '../../../../src/components/resizable_container/resizable_panel';
import { OuiResizableButton } from '../../../../src/components/resizable_container/resizable_button';

import {
  ModeOptions,
  ToggleOptions,
  // eslint-disable-next-line
} from '!!prop-loader!../../../../src/components/resizable_container/resizable_panel';
import { PanelModeType } from '!!prop-loader!../../../../src/components/resizable_container/types';

import ResizableContainerBasic from './resizable_container_basic';
import ResizableContainerVertical from './resizable_container_vertical';
import ResizableContainerResetValues from './resizable_container_reset_values';
import ResizablePanels from './resizable_panels';
import ResizablePanelCollapsible from './resizable_panel_collapsible';
import ResizablePanelCollapsibleResponsive from './resizable_panel_collapsible_responsive';
import ResizablePanelCollapsibleOpts from './resizable_panel_collapsible_options';
import ResizablePanelCollapsibleExt from './resizable_panel_collapsible_external';

const ResizableContainerSource = require('./resizable_container_basic?raw');
const ResizableContainerVerticalSource = require('./resizable_container_vertical?raw');
const ResizableContainerResetValuesSource = require('./resizable_container_reset_values?raw');
const ResizablePanelsSource = require('./resizable_panels?raw');
const ResizablePanelCollapsibleSource = require('./resizable_panel_collapsible?raw');
const ResizablePanelCollapsibleResponsiveSource = require('./resizable_panel_collapsible_responsive?raw');
const ResizablePanelCollapsibleOptsSource = require('./resizable_panel_collapsible_options?raw');
const ResizablePanelCollapsibleExtSource = require('./resizable_panel_collapsible_external?raw');

const ResizableContainerHtml = renderToHtml(ResizableContainerBasic);
const basicSnippet = `<OuiResizableContainer>
  {(OuiResizablePanel, OuiResizableButton) => (
    <>
      <OuiResizablePanel initialSize={50} minSize="200px">
        <!-- Left panel content -->
      </OuiResizablePanel>

      <OuiResizableButton />

      <OuiResizablePanel initialSize={50} minSize="200px">
        <!-- Right panel content -->
      </OuiResizablePanel>
    </>
  )}
</OuiResizableContainer>`;

const ResizablePanelsHtml = renderToHtml(ResizablePanels);
const panelsSnippet = `<OuiResizablePanel color="subdued" paddingSize="none" wrapperPadding="m">
  <OuiText>
    <p>{text}</p>
  </OuiText>
</OuiResizablePanel>`;

const ResizableContainerVerticalHtml = renderToHtml(ResizableContainerVertical);
const verticalSnippet = `<OuiResizableContainer direction="vertical">
  {(OuiResizablePanel, OuiResizableButton) => (
    <>
      <OuiResizablePanel initialSize={50} minSize="20%">
        <OuiText>
          <p>{text}</p>
        </OuiText>
      </OuiResizablePanel>

      <OuiResizableButton />

      <OuiResizablePanel initialSize={50} minSize="20%">
        <OuiText>
          <p>{text}</p>
        </OuiText>
      </OuiResizablePanel>
    </>
  )}
</OuiResizableContainer>`;
const ResizableContainerResetValuesHtml = renderToHtml(
  ResizableContainerResetValues
);
const ResizablePanelCollapsibleHtml = renderToHtml(ResizablePanelCollapsible);
const collapsibleSnippet = `<OuiResizableContainer>
  {(OuiResizablePanel, OuiResizableButton) => (
    <>
      <OuiResizablePanel mode="collapsible" initialSize={20} minSize="5px">
        <OuiText>
          <p>{text}</p>
        </OuiText>
      </OuiResizablePanel>

      <OuiResizableButton />

      <OuiResizablePanel mode="main" initialSize={80} minSize="200px">
        <OuiText>
          <p>{text}</p>
        </OuiText>
      </OuiResizablePanel>
    </>
  )}
</OuiResizableContainer>`;
const ResizablePanelCollapsibleResponsiveHtml = renderToHtml(
  ResizablePanelCollapsibleResponsive
);
const responsiveSnippet = `<OuiResizableContainer direction={isMobile ? 'vertical' : 'horizontal'}>
  {(OuiResizablePanel, OuiResizableButton) => (
    <>
      <OuiResizablePanel mode="collapsible" initialSize={20} minSize="5px">
        <OuiText>
          <p>{text}</p>
        </OuiText>
      </OuiResizablePanel>

      <OuiResizableButton />

      <OuiResizablePanel mode="main" initialSize={80} minSize="200px">
        <OuiText>
          <p>{text}</p>
        </OuiText>
      </OuiResizablePanel>
    </>
  )}
</OuiResizableContainer>`;
const ResizablePanelCollapsibleOptsHtml = renderToHtml(
  ResizablePanelCollapsibleOpts
);
const collapsibleOptsSnippet = `<OuiResizableContainer style={{ height: '400px' }}>
  {(OuiResizablePanel, OuiResizableButton) => (
    <>
      <OuiResizablePanel mode={['collapsible', {
          className: 'panel-toggle',
          'data-test-subj: 'test',
          position: 'top'
        }]}
        initialSize={20}
        minSize="5px"
      >
        <OuiText>
          <p>{text}</p>
        </OuiText>
      </OuiResizablePanel>

      <OuiResizableButton />

      <OuiResizablePanel mode="main" initialSize={80} minSize="200px">
        <OuiText>
          <p>{text}</p>
        </OuiText>
      </OuiResizablePanel>
    </>
  )}
</OuiResizableContainer>`;
const ResizablePanelCollapsibleExtHtml = renderToHtml(
  ResizablePanelCollapsibleExt
);
const collapsibleExtSnippet = `<OuiResizableContainer style={{ height: '400px' }}>
  {(OuiResizablePanel, OuiResizableButton, {togglePanel}) => (
    <>
      <OuiResizablePanel initialSize={20} minSize="5px">
        <OuiText>
          <p>{text}</p>
        </OuiText>
      </OuiResizablePanel>

      <OuiResizableButton />

      <OuiResizablePanel initialSize={80} minSize="200px">
        <OuiText>
          <p>{text}</p>
        </OuiText>
      </OuiResizablePanel>
    </>
  )}
</OuiResizableContainer>`;

export const ResizableContainerExample = {
  title: 'Resizable container',
  intro: (
    <OuiText>
      <p>
        This component is handy for various resizable containers.{' '}
        <strong>OuiResizableContainer</strong> uses the{' '}
        <OuiLink
          href="https://reactjs.org/docs/render-props.html#using-props-other-than-render"
          external>
          React Render Props
        </OuiLink>{' '}
        technique to provide <strong>OuiResizablePanel</strong> and{' '}
        <strong>OuiResizableButton</strong> components for layout, and{' '}
        <OuiCode>actions</OuiCode> for custom handling collapse and resize
        functionality in your app. Wrap parts of your content with the{' '}
        <strong>OuiResizablePanel</strong> component and put the{' '}
        <strong>OuiResizableButton</strong> component between.
      </p>
    </OuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerHtml,
        },
      ],
      title: 'Horizontal resizing',
      text: (
        <div>
          <p>
            Simple resizable container with two panels and a resizer between.
            This is the most common case you&#39;ll need in your app. Just drag{' '}
            <strong>the resizer</strong> button between two panels to
            increase/decrease panel size. You could also use arrow keys{' '}
            <strong>&#x2190;</strong>|<strong>&#x2192;</strong> on{' '}
            <strong>the focused resizer</strong> button to change panel size.
          </p>
          <ul>
            <li>
              add <OuiCode>initialSize</OuiCode> in percents to each panel to
              specify the initial size of it. Other calculations will be
              encapsulated, you don&#39;t worry about it.
            </li>
            <li>
              add <OuiCode>scrollable=false</OuiCode> prop to a panel to
              eliminate overflow scrolling
            </li>
          </ul>
        </div>
      ),
      props: {
        OuiResizableContainer,
        OuiResizablePanel,
        OuiResizableButton,
      },
      snippet: basicSnippet,
      demo: <ResizableContainerBasic />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizablePanelsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizablePanelsHtml,
        },
      ],
      title: 'Resizable panel options',
      text: (
        <div>
          <p>
            Each <strong>OuiResizablePanel</strong> is simply an{' '}
            <strong>OuiPanel</strong> wrapped with a{' '}
            <OuiCode>{'<div>'}</OuiCode> for controlling the width. It stretches
            to fill its container and accepts all of the same{' '}
            <Link to="/layout/panel">
              <strong>OuiPanel</strong>
            </Link>{' '}
            props to style your panel.
          </p>
          <p>
            The default props clear most of the <strong>OuiPanel</strong>{' '}
            styles, but you can add them back in with <OuiCode>color</OuiCode>,{' '}
            <OuiCode>hasShadow</OuiCode>, and <OuiCode>paddingSize</OuiCode>.
          </p>
        </div>
      ),
      props: { OuiResizablePanel },
      snippet: panelsSnippet,
      demo: <ResizablePanels />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerResetValuesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerResetValuesHtml,
        },
      ],
      title: 'Horizontal resizing with controlled widths',
      text: (
        <div>
          <p>
            Sometimes it&#39;s necessary to control panel sizes from the
            outside. For example to store sizes in{' '}
            <OuiCode>localStorage</OuiCode> or change the layout with predefined
            sizes. Here is the <OuiCode>onPanelWidthChange</OuiCode> and{' '}
            <OuiCode>size</OuiCode> props for help. If you use such an approach,
            you have to specify an <OuiCode>id</OuiCode> prop for each panel to
            track their sizes.
          </p>

          <OuiCallOut title="Required properties" color="warning">
            <OuiText size="s">
              <p>
                Either <OuiCode>initialSize</OuiCode> or <OuiCode>size</OuiCode>{' '}
                must be specified. The <OuiCode>size</OuiCode> prop is for cases
                where a parent component will control sizing updates.
              </p>
            </OuiText>
          </OuiCallOut>
        </div>
      ),
      props: { OuiResizableContainer, OuiResizablePanel, OuiResizableButton },
      demo: <ResizableContainerResetValues />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerVerticalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerVerticalHtml,
        },
      ],
      title: 'Vertical resizing',
      text: (
        <p>
          Set <OuiCode>direction=vertical</OuiCode> on{' '}
          <strong>OuiResizableContainer</strong> to set a vertical orientation
          of the resizable panels.
        </p>
      ),
      props: { OuiResizableContainer, OuiResizablePanel, OuiResizableButton },
      demo: <ResizableContainerVertical />,
      snippet: verticalSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizablePanelCollapsibleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizablePanelCollapsibleHtml,
        },
      ],
      title: 'Collapsible resizable panels',
      text: (
        <div>
          <p>
            Panels can be designated as collapsible, which allows them to hide
            content and automatically resize to a minimal width. The intent of
            collapsible panels is to enable large, layout-level content areas to
            cede space to a main content area. For instance, collapsing an
            action panel to allow more focus on the primary display panel.
          </p>
          <p>
            Use the <OuiCode>mode</OuiCode> prop on an{' '}
            <strong>OuiResizablePanel</strong> to mark it as{' '}
            <OuiCode>collapsible</OuiCode> or <OuiCode>main</OuiCode>. From the
            provided <OuiCode>mode</OuiCode> configuration, the{' '}
            <strong>OuiResizableContainer</strong> will determine placement of
            the toggle button and functionality of panel collapsing. To prevent
            empty states, not all panels can be{' '}
            <OuiCode>mode=collapsible</OuiCode> (there must be at least one{' '}
            <OuiCode>mode=main</OuiCode> panel).
          </p>
        </div>
      ),
      props: {
        OuiResizableContainer,
        OuiResizablePanel,
        OuiResizableButton,
        ModeOptions,
        PanelModeType,
        ToggleOptions,
      },
      demo: <ResizablePanelCollapsible />,
      snippet: collapsibleSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizablePanelCollapsibleResponsiveSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizablePanelCollapsibleResponsiveHtml,
        },
      ],
      title: 'Responsive layout',
      text: (
        <div>
          <p>
            It is possible to dynamically change the{' '}
            <OuiCode>direction</OuiCode> prop to allow for adapting layouts to
            screen size. Resize the window to see the panel orientation change.
          </p>
        </div>
      ),
      snippet: responsiveSnippet,
      demo: <ResizablePanelCollapsibleResponsive />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizablePanelCollapsibleOptsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizablePanelCollapsibleOptsHtml,
        },
      ],
      title: 'Collapsible panel options',
      text: (
        <div>
          <p>
            An <strong>OuiResizablePanel</strong> marked as{' '}
            <OuiCode language="ts">{"mode={['collapsible']}"}</OuiCode> also
            accepts configuration options for the collapsible button by passing
            a second parameter, in the form of:
          </p>
          <OuiCodeBlock language="js" isCopyable>
            {`mode={['collapsible', {
  'data-test-subj': 'panel-1-toggle',
  className: 'panel-toggle',
  position: 'top',
}]}`}
          </OuiCodeBlock>
        </div>
      ),
      demo: <ResizablePanelCollapsibleOpts />,
      snippet: collapsibleOptsSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizablePanelCollapsibleExtSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizablePanelCollapsibleExtHtml,
        },
      ],
      title: 'Collapsible panels with external control',
      text: (
        <div>
          <p>
            <strong>OuiResizableContainer</strong> also provides action hooks
            for parent components to access internal methods, such as{' '}
            <strong>OuiResizablePanel</strong> collapse toggling. The actions
            are accessible via the third parameter of the render prop function.
          </p>
          <p>
            Note that when bypassing internal{' '}
            <strong>OuiResizableContainer</strong> logic, it is possible to
            create situations that would otherwise be prevented. For instance,
            allowing all panels to be collapsed creates a scenerio where your
            app will need to account for empty state and accesibility in regards
            to keyboard navigation.
          </p>
          <h3>Custom collapse button</h3>
          <p>
            You can also provide an external collapse button for custom
            placement and look within your panel with{' '}
            <OuiCode language="ts">{"mode={['custom']}"}</OuiCode>. When
            collapsed, however, the default collapsed button will be used for
            users to uncollapse the panel.
          </p>
          <p>
            For consistency, we recommend the usage of the{' '}
            <OuiCode>menuLeft</OuiCode>, <OuiCode>menuRight</OuiCode>, etc, icon
            types.
          </p>
        </div>
      ),
      demo: <ResizablePanelCollapsibleExt />,
      snippet: collapsibleExtSnippet,
    },
  ],
};
