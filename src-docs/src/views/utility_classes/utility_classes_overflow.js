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
  OuiCode,
  OuiSpacer,
  OuiPanel,
  OuiFlexItem,
  OuiFlexGroup,
} from '../../../../src/components';
import { UtilityClassesSection } from './utility_classes_section';

export default () => (
  <>
    <UtilityClassesSection
      code="oui-yScroll"
      description={
        <>
          <p>
            Quick utility for adding vertical scrolling to a container. Requires
            the wrapping element to control the height and to have
            <OuiCode language="sass">overflow-y: hidden;</OuiCode> applied.
          </p>
          <p>
            If you would like the content to fade at the top and bottom, use the
            variant <OuiCode>oui-yScrollWithShadows</OuiCode>.
          </p>
          <dl>
            <dt>Sass mixins</dt>
            <dd>
              <OuiCode language="scss">@include ouiYScroll;</OuiCode>
            </dd>
            <dd>
              <OuiCode language="scss">@include ouiYScrollWithShadows;</OuiCode>
            </dd>
          </dl>
        </>
      }
      example={
        <OuiPanel
          color="warning"
          paddingSize="none"
          style={{
            height: 180,
            overflowY: 'hidden',
          }}>
          <OuiText
            tabIndex={0}
            className="oui-yScrollWithShadows"
            size="s"
            style={{ padding: 16 }}>
            <p>
              Orbiting this at a distance of roughly ninety-two million miles is
              an utterly insignificant little blue green planet whose
              ape-descended life forms are so amazingly primitive that they
              still think digital watches are a pretty neat idea.
            </p>
            <p>
              Orbiting this at a distance of roughly ninety-two million miles is
              an utterly insignificant little blue green planet whose
              ape-descended life forms are so amazingly primitive that they
              still think digital watches are a pretty neat idea.
            </p>
            <p>
              Orbiting this at a distance of roughly ninety-two million miles is
              an utterly insignificant little blue green planet whose
              ape-descended life forms are so amazingly primitive that they
              still think digital watches are a pretty neat idea.
            </p>
          </OuiText>
        </OuiPanel>
      }
      snippet={`<BodyContent
  style={{ height: 200, overflowY: 'hidden' }}>
  <BodyScroll
    className="oui-yScrollWithShadows"
    tabIndex={0}
  />
</BodyContent>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-xScroll"
      description={
        <>
          <p>Quick utility for adding horizontal scrolling to a container.</p>
          <p>
            If you would like the content to fade at the left and right, use the
            variant <OuiCode>oui-xScrollWithShadows</OuiCode>. It is recommended
            to add padding to the sides of the inner content so the mask
            doesn&apos;t overlay it.
          </p>
          <dl>
            <dt>Sass mixins</dt>
            <dd>
              <OuiCode language="scss">@include ouiXScroll;</OuiCode>
            </dd>
            <dd>
              <OuiCode language="scss">@include ouiXScrollWithShadows;</OuiCode>
            </dd>
          </dl>
        </>
      }
      example={
        <OuiPanel color="warning" paddingSize="none">
          <div tabIndex={0} className="oui-xScrollWithShadows">
            <OuiText size="s" style={{ width: '150%', padding: 16 }}>
              <p>
                Orbiting this at a distance of roughly ninety-two million miles
                is an utterly insignificant little blue green planet whose
                ape-descended life forms are so amazingly primitive that they
                still think digital watches are a pretty neat idea.
              </p>
            </OuiText>
          </div>
        </OuiPanel>
      }
      snippet={`<BodyScroll
  className="oui-xScrollWithShadows"
  tabIndex={0}>
  <BodyContent style={{ width: '150%', padding: 16 }} />
</BodyScroll>`}
    />
    <OuiSpacer />
    <UtilityClassesSection
      code="oui-fullHeight"
      description={
        <>
          <p>
            Quick utility for expanding the height of the element to its parents
            dimensions. Use it to stretch each nested element until the one that
            applies scroll.
          </p>
          <p>
            It applies{' '}
            <OuiCode language="sass">height: 100%; overflow: hidden;</OuiCode>{' '}
            but also adds <OuiCode language="sass">flex: 1 1 auto;</OuiCode> for
            uses within <OuiCode language="sass">flex</OuiCode> containers.
          </p>
          <dl>
            <dt>Sass mixins</dt>
            <dd>
              <OuiCode language="scss">@include ouiFullHeight;</OuiCode>
            </dd>
          </dl>
        </>
      }
      example={
        <div style={{ height: 180 }}>
          <OuiFlexGroup
            className="oui-fullHeight"
            gutterSize="s"
            responsive={false}>
            <OuiFlexItem>
              <OuiPanel className="oui-yScroll" color="warning" tabIndex="0">
                <OuiText size="s">
                  <p>
                    Orbiting this at a distance of roughly ninety-two million
                    miles is an utterly insignificant little blue green planet
                    whose ape-descended life forms are so amazingly primitive
                    that they still think digital watches are a pretty neat
                    idea.
                  </p>
                </OuiText>
              </OuiPanel>
            </OuiFlexItem>
            <OuiFlexItem>
              <OuiPanel className="oui-yScroll" color="warning" tabIndex="0">
                <OuiText size="s">
                  <p>
                    Orbiting this at a distance of roughly ninety-two million
                    miles is an utterly insignificant little blue green planet
                    whose ape-descended life forms are so amazingly primitive
                    that they still think digital watches are a pretty neat
                    idea.
                  </p>
                </OuiText>
              </OuiPanel>
            </OuiFlexItem>
          </OuiFlexGroup>
        </div>
      }
      snippet={`<BodyContent style={{ height: 180 }}>
  <OuiFlexGroup
    className="oui-fullHeight" responsive={false}>
    <OuiFlexItem>
      <BodyScroll
        className="oui-yScroll" tabIndex="0"/>
    </OuiFlexItem>
    <OuiFlexItem>
      <BodyScroll
        className="oui-yScroll" tabIndex="0"/>
    </OuiFlexItem>
  </OuiFlexGroup>
</BodyContent>`}
    />
  </>
);
