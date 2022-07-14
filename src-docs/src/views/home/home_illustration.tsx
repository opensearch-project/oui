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

import React, { useContext } from 'react';
import { ThemeContext } from '../../components/with_theme';
import illustrationDarkMode from '../../images/illustration-oui-hero-500-darkmode-shadow.svg';
import illustrationLightMode from '../../images/illustration-oui-hero-500-shadow.svg';
import { OuiImage } from '../../../../src/components/image';

function Icon() {
  const themeContext: any = useContext(ThemeContext);

  const illustration = themeContext.theme.includes('dark') ? (
    <OuiImage alt="OpenSearch UI" url={illustrationDarkMode} />
  ) : (
    <OuiImage alt="OpenSearch UI" url={illustrationLightMode} />
  );

  return (
    <div className="guideHomePage__illustration">
      <div className="guideHomePage__illustrationEffect">
        <div className="guideHomePage__illustrationTopLeftCorner" />
        <div className="guideHomePage__illustrationTopRightCorner" />
        <div className="guideHomePage__illustrationBottomLeftCorner" />
        <div className="guideHomePage__illustrationBottomRightCorner" />

        <div className="guideHomePage__illustrationEffectSVG">
          {illustration}
        </div>
      </div>
    </div>
  );
}

export default Icon;
