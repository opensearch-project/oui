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

import lightColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss';
import darkColors from '!!sass-vars-to-js-loader!../../../../src/themes/oui/oui_colors_dark.scss';
import lightCascadiaColors from '!!sass-vars-to-js-loader!../../../../src/themes/oui-cascadia/oui_cascadia_colors_light.scss';
import darkCascadiaColors from '!!sass-vars-to-js-loader!../../../../src/themes/oui-cascadia/oui_cascadia_colors_dark.scss';

export const getSassVars = (theme) => {
  let palette;
  switch (theme) {
    case 'cascadia-dark':
      palette = { ...darkColors, ...darkCascadiaColors };
      break;
    case 'cascadia-light':
      palette = { ...lightColors, ...lightCascadiaColors };
      break;
    case 'dark':
      palette = darkColors;
      break;
    default:
      palette = lightColors;
      break;
  }

  return palette;
};
