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

export { renderToHtml } from './string/render_to_html';

export { translateUsingPseudoLocale } from './string/pseudo_locale_translator';

export {
  cleanOuiImports,
  hasDisplayToggles,
  listExtraDeps,
} from './string/clean_imports';

export { registerTheme, applyTheme } from './theme/theme';

export { ExampleContext, useExitPath } from './routing/routing';
