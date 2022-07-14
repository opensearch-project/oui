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
import lightAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/oui-amsterdam/oui_amsterdam_colors_light.scss';
import darkAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/oui-amsterdam/oui_amsterdam_colors_dark.scss';

export const getSassVars = (theme) => {
  let palette;
  switch (theme) {
    case 'amsterdam-dark':
      palette = { ...darkColors, ...darkAmsterdamColors };
      break;
    case 'amsterdam-light':
      palette = { ...lightColors, ...lightAmsterdamColors };
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
