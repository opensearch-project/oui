/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const rule = require('./ime_composition_guard');
const RuleTester = require('eslint').RuleTester;

// Flat-config RuleTester (ESLint 9+): the default parser handles these plain JS cases
const ruleTester = new RuleTester();

const valid = [
  // guarded before acting
  'const f = (e) => { if (e.key === keys.ENTER && !isComposingKeyboardEvent(e)) submit(); };',
  'function f(e) { if (isComposingKeyboardEvent(e)) return; switch (e.key) { case keys.ESCAPE: close(); } }',
  // a guard in the enclosing function covers nested callbacks
  'const f = (e) => { if (isComposingKeyboardEvent(e)) return; items.forEach((i) => { if (e.key === keys.ENTER) i(); }); };',
  // keys this rule does not cover
  'const f = (e) => { if (e.key === keys.ARROW_DOWN) move(); };',
  "const f = (e) => { if (e.key === 'Tab') move(); };",
];

const message =
  'Handlers that act on Enter or Escape must ignore IME composition: call isComposingKeyboardEvent(event) first, or disable this rule with the reason no composition can happen here.';

const invalid = [
  {
    code: 'const f = (e) => { if (e.key === keys.ENTER) submit(); };',
    errors: [{ message }],
  },
  {
    code: "const f = (e) => { if (e.key === 'Escape') close(); };",
    errors: [{ message }],
  },
  {
    code:
      'function f(e) { switch (e.key) { case keys.ESCAPE: close(); break; case keys.ENTER: open(); } }',
    errors: [{ message }, { message }],
  },
  {
    code:
      'const f = (e) => { if (cascadingMenuKeys.ESCAPE === e.key) close(); };',
    errors: [{ message }],
  },
  // a guard in a sibling function does not count
  'const g = (e) => isComposingKeyboardEvent(e); const f = (e) => { if (e.key === keys.ENTER) submit(); };',
].map((c) => (typeof c === 'string' ? { code: c, errors: [{ message }] } : c));

ruleTester.run('ime-composition-guard', rule, {
  valid,
  invalid,
});
