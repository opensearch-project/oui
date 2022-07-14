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

import React, {
  ComponentType,
  ReactElement,
  useState,
  FunctionComponent,
} from 'react';
import { useRouteMatch } from 'react-router';
import { OuiImage } from '../../../../src/components/image';
import { OuiButton } from '../../../../src/components/button';
import { OuiSpacer } from '../../../../src/components/spacer';
import { OuiSwitch } from '../../../../src/components/form';
import { OuiTextAlign } from '../../../../src/components/text';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';
import { useExitPath } from '../../services/routing/routing';

import contentSvg from '../../images/content.svg';
import contentCenterSvg from '../../images/content_center.svg';
import sideNavSvg from '../../images/side_nav.svg';
import singleSvg from '../../images/single.svg';

const ExitFullscreenDemoButton = () => {
  const exitPath = useExitPath();
  return (
    <OuiButton fill href={exitPath} iconType="exit">
      Exit full screen
    </OuiButton>
  );
};

/**
 * Because the discrete[by slug] usages of <PageDemo> are not rendered at the same time,
 * it is safe to cache their showTemplate status in a set rather than an approach triggering
 * React re-rendering. If that changes, moving this to a redux store, recoiljs atom(s), or similar
 * would resolve any introduced issue.
 */
const demosAsIndividualComponents = new Set<string>();

export const PageDemo: FunctionComponent<{
  slug: string;
  fullscreen?: boolean;
  pattern: ComponentType<{
    button: ReactElement;
    content: ReactElement;
    sideNav: ReactElement;
    bottomBar: ReactElement;
  }>;
  template: ComponentType<{
    button: ReactElement;
    content: ReactElement;
    sideNav: ReactElement;
    bottomBar: ReactElement;
  }>;
  centered?: boolean;
}> = ({ slug, fullscreen, pattern, template, centered }) => {
  const { path } = useRouteMatch();
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);
  const [showTemplate, _setShowTemplate] = useState(
    !demosAsIndividualComponents.has(slug)
  );
  const setShowTemplate = (cb: (showTemplate: boolean) => boolean) => {
    _setShowTemplate((showing) => {
      const nextValue = cb(showing);
      demosAsIndividualComponents[nextValue ? 'delete' : 'add'](slug);
      return nextValue;
    });
  };

  const button = fullscreen ? (
    <ExitFullscreenDemoButton />
  ) : (
    <OuiButton fill href={`#${path}/${slug}`}>
      Go full screen
    </OuiButton>
  );

  const sideNav = (
    <OuiImage
      size={isMobileSize ? 'original' : 'fullWidth'}
      alt="Fake side nav list"
      url={isMobileSize ? singleSvg : sideNavSvg}
    />
  );

  const content = (
    <>
      <OuiImage
        size="fullWidth"
        alt="Fake paragraph"
        url={centered ? contentCenterSvg : contentSvg}
      />
      {!centered && (
        <>
          <OuiSpacer />
          <OuiImage
            size="fullWidth"
            alt="Fake paragraph"
            url={centered ? contentCenterSvg : contentSvg}
          />
        </>
      )}
    </>
  );

  const bottomBar = (
    <OuiButton size="s" color="ghost">
      Save
    </OuiButton>
  );

  const Child = showTemplate ? template : pattern;
  return fullscreen ? (
    <Child
      button={button}
      content={content}
      sideNav={sideNav}
      bottomBar={bottomBar}
    />
  ) : (
    <>
      <div className={'guideDemo__highlightLayout'}>
        <Child
          button={button}
          content={content}
          sideNav={sideNav}
          bottomBar={bottomBar}
        />
      </div>
      <OuiTextAlign textAlign="right">
        <OuiSpacer />
        <OuiSwitch
          label="Show with individual components"
          checked={!showTemplate}
          onChange={() => setShowTemplate((showing) => !showing)}
        />
      </OuiTextAlign>
    </>
  );
};
