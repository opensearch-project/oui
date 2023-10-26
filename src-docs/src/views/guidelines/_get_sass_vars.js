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

import lightColors from '!!variables-from-scss!!../../../../src/global_styling/variables/_colors.scss';
import darkColors from '!!variables-from-scss!!../../../../src/themes/oui/oui_colors_dark.scss';
import lightNextColors from '!!variables-from-scss!!../../../../src/themes/oui-next/global_styling/variables/_colors.scss';
import darkNextColors from '!!variables-from-scss!!../../../../src/themes/oui-next/oui_next_colors_dark.scss';

export const getSassVars = (theme) => {
  let palette;
  switch (theme) {
    case 'next-dark':
      palette = { ...darkColors, ...darkNextColors };
      break;
    case 'next-light':
      palette = { ...lightColors, ...lightNextColors };
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
