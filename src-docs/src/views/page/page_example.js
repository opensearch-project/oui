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

import { GuideSectionTypes } from '../../components';
import { pageTemplateConfig } from './playground';
import { PageDemo } from './_page_demo';

import {
  OuiCode,
  OuiPage,
  OuiPageBody,
  OuiPageContent,
  OuiPageContentBody,
  OuiPageHeader,
  OuiPageSideBar,
  OuiText,
  OuiEmptyPrompt,
  OuiPageTemplate,
  OuiCallOut,
  OuiSpacer,
  OuiBottomBar,
} from '../../../../src/components';

import PageNew from './page_new';
const pageNewSource = require('./page_new?raw');
import PageTemplate from './page_template';
const PageTemplateSource = require('./page_template?raw');

import PageBottomBar from './page_bottom_bar';
const pageBottomBarSource = require('./page_bottom_bar?raw');
import PageBottomBarTemplate from './page_bottom_bar_template';
const PageBottomBarTemplateSource = require('./page_bottom_bar_template?raw');

import PageRestrictingWidth from './page_restricting_width';
const PageRestrictingWidthSource = require('./page_restricting_width?raw');
import PageRestrictingWidthTemplate from './page_restricting_width_template';
const PageRestrictingWidthTemplateSource = require('./page_restricting_width_template?raw');

import PageCenteredBody from './page_centered_body';
const PageCenteredBodySource = require('./page_centered_body?raw');
import PageCenteredBodyTemplate from './page_centered_body_template';
const PageCenteredBodyTemplateSource = require('./page_centered_body_template?raw');

import PageCenteredContent from './page_centered_content';
const PageCenteredContentSource = require('./page_centered_content?raw');
import PageCenteredContentTemplate from './page_centered_content_template';
const PageCenteredContentTemplateSource = require('./page_centered_content_template?raw');

import PageSimple from './page_simple';
const PageSimpleSource = require('./page_simple?raw');
import PageSimpleTemplate from './page_simple_template';
const PageSimpleTemplateSource = require('./page_simple_template?raw');

import PageFullHeight from './page_full_height';
const PageFullHeightSource = require('./page_full_height?raw');
import PageFullHeightTemplate from './page_full_height_template';
const PageFullHeightTemplateSource = require('./page_full_height_template?raw');

import PageSimpleCenteredBody from './page_simple_content_body';
const PageSimpleCenteredBodySource = require('./page_simple_content_body?raw');
import PageSimpleCenteredBodyTemplate from './page_simple_content_body_template';
const PageSimpleCenteredBodyTemplateSource = require('./page_simple_content_body_template?raw');

import PageSimpleEmptyContent from './page_simple_empty_content';
const PageSimpleEmptyContentSource = require('./page_simple_empty_content?raw');
import PageSimpleEmptyContentTemplate from './page_simple_empty_content_template';
const PageSimpleEmptyContentTemplateSource = require('./page_simple_empty_content_template?raw');

import PageCustomContent from './page_custom_content';
const PageCustomContentSource = require('./page_custom_content?raw');
import PageCustomContentTemplate from './page_custom_content_template';
const PageCustomContentTemplateSource = require('./page_custom_content_template?raw');

import PageLegacy from './page';
const PageLegacySource = require('./page?raw');

export const PageExample = {
  title: 'Page',
  intro: (
    <>
      <OuiText>
        <p>
          Page layouts are modular and fit together in a precise manner, though
          certain parts can also be added or removed as needed. OUI provides
          both the indivdual page components and an over-arching template for
          easily creating some pre-defined layouts.
        </p>
      </OuiText>
      <OuiSpacer />
      <OuiCallOut
        iconType="document"
        title="The following examples showcase the both the template and custom built usages of the page components.">
        <p>
          You&apos;ll find the code for each in their own tab and if you go to
          full screen, you can see how they would behave in a typical
          application layout.
        </p>
      </OuiCallOut>
    </>
  ),
  sections: [
    {
      title: 'A full page with everything',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: pageNewSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <div>
          <p>
            OUI provides a family of components using the{' '}
            <OuiCode>OuiPage</OuiCode> prefix that work together to build
            consistent page layouts that work responsively.
          </p>
          <ul>
            <li>
              <strong>OuiPage</strong> and <strong>OuiPageBody</strong> provide
              the overall wrapper with a column flex display.
            </li>
            <li>
              <strong>OuiPageSideBar</strong> provides a way to add side
              navigation that can be made <OuiCode>sticky</OuiCode> to scroll
              independent of the page content. See{' '}
              <Link to="/navigation/side-nav">
                <strong>OuiSideNav</strong>
              </Link>{' '}
              for contents.
            </li>
            <li>
              <Link to="/layout/page-header">
                <strong>OuiPageHeader</strong>
              </Link>{' '}
              provides a title, description, section for actions and possible
              tabs.
            </li>
            <li>
              <strong>OuiPageContent</strong> provides the main content
              container and extends{' '}
              <Link to="/layout/panel">
                <strong>OuiPanel</strong>
              </Link>
              .
            </li>
            <li>
              <strong>OuiPageContentBody</strong> wraps the content that comes
              after the page header.
            </li>
          </ul>
          <p>
            Or you can use the provided <strong>OuiPageTemplate</strong>, which
            is simply a shortcut for creating the different types of page layout
            patterns described in these docs. It is somewhat opinionated, but
            still has the ability to customize most of the inner components with
            props like <OuiCode>pageSideBarProps</OuiCode> and{' '}
            <OuiCode>pageContentProps</OuiCode>.
          </p>
        </div>
      ),
      props: {
        OuiPageTemplate,
        OuiPage,
        OuiPageBody,
        OuiPageSideBar,
        OuiPageHeader,
        OuiPageContent,
        OuiPageContentBody,
        OuiBottomBar,
      },
      playground: pageTemplateConfig,
      demo: (
        <PageDemo slug="full-page" pattern={PageNew} template={PageTemplate} />
      ),
      fullScreen: {
        slug: 'full-page',
        demo: (
          <PageDemo
            slug="full-page"
            pattern={PageNew}
            template={PageTemplate}
            fullscreen
          />
        ),
      },
    },
    {
      title: 'Restricting page width',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageRestrictingWidthTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageRestrictingWidthSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <>
          <p>
            Most content does not scale well to the full width of the window.
            You can restrict this to a typical width and center the page by
            setting the <OuiCode>restrictWidth</OuiCode> prop to{' '}
            <OuiCode>true</OuiCode> on <strong>OuiPageHeader</strong> and{' '}
            <strong>OuiPageContent</strong>. You can also pass an integer to
            this property to max out the width at a custom pixel value or a
            string with a custom measurement.
          </p>
          <OuiCallOut
            size="s"
            title={
              <>
                The <strong>OuiPageTemplate</strong> allows setting this
                property at the top level and defaults to{' '}
                <OuiCode>true</OuiCode>.
              </>
            }
          />
        </>
      ),
      demo: (
        <PageDemo
          slug="restricting-page-width"
          pattern={PageRestrictingWidth}
          template={PageRestrictingWidthTemplate}
        />
      ),
      fullScreen: {
        slug: 'restricting-page-width',
        demo: (
          <PageDemo
            slug="restricting-page-width"
            pattern={PageRestrictingWidth}
            template={PageRestrictingWidthTemplate}
            fullscreen
          />
        ),
      },
    },
    {
      title: 'Showing a bottom bar',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageBottomBarTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: pageBottomBarSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <>
          <p>
            Adding an{' '}
            <Link to="/layout/bottom-bar">
              <strong>OuiBottomBar</strong>
            </Link>{' '}
            can be tricky to use and account for any side bars.{' '}
            <strong>OuiPageTemplate</strong> handles this nicely by supplying a{' '}
            <OuiCode>bottomBar</OuiCode> prop for passing the contents of your
            bottom bar, and <OuiCode>bottomBarProps</OuiCode> that extends{' '}
            <strong>OuiBottomBar</strong>.
          </p>
          <p>
            It uses the <OuiCode>sticky</OuiCode> position so that it sticks to
            the bottom of and remains within the bounds of{' '}
            <strong>OuiPageBody</strong>. This way it will never overlap the{' '}
            <strong>OuiPageSideBar</strong>, no matter the screen size. It also
            means not needing to accommodate for the height of the bar in the
            body element.
          </p>
          <OuiCallOut
            size="s"
            color="warning"
            title={
              <>
                <strong>OuiPageTemplate</strong> only supports bottom bars in
                the <OuiCode>default</OuiCode> template.
              </>
            }
          />
        </>
      ),
      demo: (
        <PageDemo
          slug="bottom-bar"
          pattern={PageBottomBar}
          template={PageBottomBarTemplate}
        />
      ),
      fullScreen: {
        slug: 'bottom-bar',
        demo: (
          <PageDemo
            slug="bottom-bar"
            pattern={PageBottomBar}
            template={PageBottomBarTemplate}
            fullscreen
          />
        ),
      },
    },
    {
      title: 'Centered body',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageCenteredBodyTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageCenteredBodySource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <>
          <p>
            When the content for the page is minimal or in an empty/pre-setup
            state, the page content can be centered vertically and horizontally.
            We recommend then using the{' '}
            <Link to="/display/empty-prompt">
              <strong>OuiEmptyPrompt</strong>
            </Link>{' '}
            for the content.
          </p>
          <OuiCallOut
            size="s"
            title={
              <>
                This layout can be achieved in <strong>OuiPageTemplate</strong>{' '}
                by setting <OuiCode>{'template="centeredBody"'}</OuiCode>.
              </>
            }
          />
        </>
      ),
      demo: (
        <PageDemo
          slug="centered-body"
          centered
          pattern={PageCenteredBody}
          template={PageCenteredBodyTemplate}
        />
      ),
      fullScreen: {
        slug: 'centered-body',
        demo: (
          <PageDemo
            slug="centered-body"
            centered
            pattern={PageCenteredBody}
            template={PageCenteredBodyTemplate}
            fullscreen
          />
        ),
      },
      props: { OuiPageTemplate, OuiEmptyPrompt },
    },
    {
      title: 'Centered content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageCenteredContentTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageCenteredContentSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <>
          <p>
            Similar to the previous example, you can create a centered panel to
            emphasize incompleteness even with a page header. For this setup, we
            recommend using setting <strong>OuiPageContent</strong> to use the{' '}
            <OuiCode>subdued</OuiCode> color as to not have nested shadows.
          </p>
          <OuiCallOut
            size="s"
            title={
              <>
                This layout can be achieved in <strong>OuiPageTemplate</strong>{' '}
                by setting <OuiCode>{'template="centeredContent"'}</OuiCode>.
              </>
            }
          />
        </>
      ),
      demo: (
        <PageDemo
          slug="centered-content"
          centered
          pattern={PageCenteredContent}
          template={PageCenteredContentTemplate}
        />
      ),
      fullScreen: {
        slug: 'centered-content',
        demo: (
          <PageDemo
            slug="centered-content"
            centered
            pattern={PageCenteredContent}
            template={PageCenteredContentTemplate}
            fullscreen
          />
        ),
      },
    },
    {
      title: 'A simple page with tabs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <>
          <p>
            When leaving off the <strong>OuiPageSideBar</strong>, we recommend a
            slightly different configuration by pulling the page header out of
            the <strong>OuiPageContent</strong> and removing the shadow from{' '}
            <strong>OuiPageContent</strong>.
          </p>
          <OuiCallOut
            size="s"
            title={
              <>
                This layout will automatically be achieved through{' '}
                <strong>OuiPageTemplate</strong> by leaving{' '}
                <OuiCode>pageSideBar</OuiCode> as <OuiCode>undefined</OuiCode>.
              </>
            }
          />
        </>
      ),
      demo: (
        <PageDemo
          slug="tabs"
          pattern={PageSimple}
          template={PageSimpleTemplate}
        />
      ),
      fullScreen: {
        slug: 'tabs',
        demo: (
          <PageDemo
            slug="tabs"
            pattern={PageSimple}
            template={PageSimpleTemplate}
            fullscreen
          />
        ),
      },
    },
    {
      title: 'Full height layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageFullHeightTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageFullHeightSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <>
          <p>
            Though it is not recomended for most layouts, some require the
            control of scrolling to be handled through child components. You can
            achieve this through nested flex groups and overflow properties;
            adding certain combinations of{' '}
            <Link to="/utilities/css-utility-classes#overflows">
              CSS overflow utility classes
            </Link>{' '}
            to these children. There are a few <strong>caveats</strong> to
            understand when trying to acheive full height layouts with{' '}
            <strong>OuiPageTemplate</strong>.
          </p>
          <ol>
            <li>
              Using the <OuiCode>{'fullHeight'}</OuiCode> prop adds an extra
              layer of{' '}
              <Link to="/layout/flex">
                <strong>OuiFlexGroup</strong> and <strong>OuiFlexItem</strong>
              </Link>{' '}
              around the template children to negate the negative margins.
            </li>
            <li>
              Using <OuiCode>{'fullHeight=true'}</OuiCode> will automatically
              add scrolling behavior to the <strong>OuiFlexItem</strong> that
              wraps the children.
            </li>
            <li>
              Using <OuiCode>{'fullHeight="noscroll"'}</OuiCode> removes all
              scrolling behavior and your layouts will break if you do not
              manually add them.
            </li>
            <li>
              When using either values for <OuiCode>{'fullHeight'}</OuiCode>,
              there will always be a minimum height of <OuiCode>460px</OuiCode>{' '}
              to the page contents.
            </li>
            <li>
              Full height layouts are restricted to{' '}
              <strong>medium breakpoints</strong> and above. We recommend
              retaining any responsive behavior and allowing normal page scroll
              on smaller screens.
            </li>
          </ol>
          <OuiCallOut
            color="warning"
            iconType="accessibility"
            size="s"
            title={
              <>
                When applying the <OuiCode>.oui-yScroll</OuiCode> class, it is
                recommended to also apply <OuiCode>tabindex=0</OuiCode> to
                ensure keyboard users can scroll these containers.
              </>
            }
          />
        </>
      ),
      demo: (
        <PageDemo
          slug="full-height"
          pattern={PageFullHeight}
          template={PageFullHeightTemplate}
        />
      ),
      fullScreen: {
        slug: 'full-height',
        demo: (
          <PageDemo
            slug="full-height"
            pattern={PageFullHeight}
            template={PageFullHeightTemplate}
            fullscreen
          />
        ),
      },
    },
    {
      title: 'Simple layout with centered body',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleCenteredBodyTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleCenteredBodySource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <p>
          Similar to the version with a side bar, when the content for the page
          is minimal or in an empty/pre-setup state, the page content can be
          centered vertically and horizontally. We recommend then using the{' '}
          <Link to="/display/empty-prompt">
            <strong>OuiEmptyPrompt</strong>
          </Link>{' '}
          for the content.
        </p>
      ),
      demo: (
        <PageDemo
          slug="simple-centered-body"
          centered
          pattern={PageSimpleCenteredBody}
          template={PageSimpleCenteredBodyTemplate}
        />
      ),
      fullScreen: {
        slug: 'simple-centered-body',
        demo: (
          <PageDemo
            slug="simple-centered-body"
            centered
            pattern={PageSimpleCenteredBody}
            template={PageSimpleCenteredBodyTemplate}
            fullscreen
          />
        ),
      },
    },
    {
      title: 'Simple layout with centered content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleEmptyContentTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleEmptyContentSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <p>
          Also similar to the previous examples, you can create a centered panel
          to emphasis incompleteness even with a page header. For this setup,
          You will need to use nested <strong>OuiPageContent</strong> components
          in order for the centering to work.
        </p>
      ),
      demo: (
        <PageDemo
          slug="simple-centered-content"
          centered
          pattern={PageSimpleEmptyContent}
          template={PageSimpleEmptyContentTemplate}
        />
      ),
      fullScreen: {
        slug: 'simple-centered-content',
        demo: (
          <PageDemo
            slug="simple-centered-content"
            centered
            pattern={PageSimpleEmptyContent}
            template={PageSimpleEmptyContentTemplate}
            fullscreen
          />
        ),
      },
    },
    {
      title: 'A simple page layout with custom content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageCustomContentTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageCustomContentSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <>
          <p>
            You can replace the inner parts of <strong>OuiPageBody</strong> with
            your own content, with or without a page header. This allows you to
            create dashboard style layouts with lots of panels. It is not
            recommended, however, to use this setup when you also have side bar.
          </p>
          <OuiCallOut
            size="s"
            title={
              <>
                This layout can be achieved in <strong>OuiPageTemplate</strong>{' '}
                by setting <OuiCode>{'template="empty"'}</OuiCode>.
              </>
            }
          />
        </>
      ),
      demo: (
        <PageDemo
          slug="simple-custom-content"
          pattern={PageCustomContent}
          template={PageCustomContentTemplate}
        />
      ),
      fullScreen: {
        slug: 'simple-custom-content',
        demo: (
          <PageDemo
            slug="simple-custom-content"
            pattern={PageCustomContent}
            template={PageCustomContentTemplate}
            fullscreen
          />
        ),
      },
    },
    {
      title: 'Legacy layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageLegacySource,
        },
      ],
      text: (
        <p>
          In previous versions of OUI, we emulated page layouts where the{' '}
          <strong>OuiPageContent</strong> had margins all around created by
          padding on <strong>OuiPage</strong>. This layout is still achievable
          but not through <strong>OuiPageTemplate</strong>. You must use the{' '}
          <strong>OuiPage</strong> components manually as seen in this example.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightLayout--legacy">
          <PageLegacy />
        </div>
      ),
      props: {
        OuiPage,
        OuiPageBody,
        OuiPageSideBar,
        OuiPageHeader,
        OuiPageContent,
        OuiPageContentBody,
      },
    },
  ],
};
