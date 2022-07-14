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

const rule = require('./i18n');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint')
});

const valid = [
  /** OuiI18n **/
  // nothing to validate against
  '<I18n token="ouiFooBar.tokenName" default="Some default value"/>',

  // values agree with default string
  `<OuiI18n token="ouiFooBar.tokenName" default="{value}, {value2}" values={{ value: 'Hello', value2: 'World' }}/>`,

  // valid tokens
  `<OuiI18n tokens={['ouiFooBar.token1', 'ouiFooBar.token2']} defaults={['value1', 'value 2']}/>`,

  // token name is used by render prop
  `<OuiI18n token="ouiFooBar.tokenName" default="Some default value">
      {tokenName => 'asdf'}
    </OuiI18n>`,
  `<OuiI18n token="ouiFooBar.tokenName" default="Some default value">
      {(tokenName) => 'asdf'}
    </OuiI18n>`,

  // token names are used by render prop
  `<OuiI18n tokens={['ouiFooBar.token1', 'ouiFooBar.token2']} defaults={['value 1', 'value 2']}>
      {([token1, token2]) => 'asdf'}
    </OuiI18n>`,

  // default callback params match values
  `<OuiI18n token="ouiFooBar.token" values={{ name: 'John' }} default={({ name }) => name}/>`,

  /** useOuiI18n **/
  // nothing to validate against
  `useI18n('ouiFooBar.tokenName', 'Some default value')`,

  // values agree with default string
  `useOuiI18n('ouiFooBar.tokenName', '{value}, {value2}', { value: 'Hello', value2: 'World' })`,

  // valid tokens
  `useOuiI18n(['ouiFooBar.token1', 'ouiFooBar.token2'], ['value1', 'value 2'])`,

  // default callback params match values
  `useOuiI18n('ouiFooBar.token', ({ name }) => name, { name: 'John' })`,
];
const invalid = [
  /** OuiI18n **/
  // token doesn't match file name
  {
    code: '<OuiI18n token="ouiFooeyBar.tokenName" default="Some default value"/>',
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'ouiFooeyBar.tokenName', tokenNamespace: 'ouiFooBar' } }]
  },

  // token doesn't have at least two parts
  {
    code: '<OuiI18n token="ouiFooBar" default="Some default value"/>',
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'ouiFooBar', tokenNamespace: 'ouiFooBar' } }]
  },
  {
    code: '<OuiI18n token="tokenName" default="Some default value"/>',
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'tokenName', tokenNamespace: 'ouiFooBar' } }]
  },

  // invalid tokens
  {
    code: `<OuiI18n tokens={['ouiFooBar.token1', 'token2']} defaults={['value1', 'value 2']}/>`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'token2', tokenNamespace: 'ouiFooBar' } }]
  },
  {
    code: `<OuiI18n tokens={['ouiFooeyBar.token1', 'ouiFooBar.token2']} defaults={['value1', 'value 2']}/>`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'ouiFooeyBar.token1', tokenNamespace: 'ouiFooBar' } }]
  },
  {
    code: `<OuiI18n tokens={['ouiFooBar.token1']} defaults={['value1', 'value 2']}/>`,
    errors: [{ messageId: 'mismatchedTokensAndDefaults', data: { tokenLength: 1, defaultsLength: 2 } }]
  },

  // values not in agreement with default string
  {
    code: `<OuiI18n token="ouiFooBar.tokenName" default="{value}, {value2}" values={{ valuee: 'Hello', value2: 'World' }}/>`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'value, value2',
        provided: 'value2, valuee'
      }
    }]
  },
  {
    code: `<OuiI18n token="ouiFooBar.tokenName" default="{valuee}, {value2}" values={{ value: 'Hello', value2: 'World' }}/>`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'value2, valuee',
        provided: 'value, value2'
      }
    }]
  },

  // token name isn't used by render prop
  {
    code: `<OuiI18n token="ouiFooBar.tokenName" default="Some default value">
      {tokenGame => 'asdf'}
    </OuiI18n>`,
    errors: [{
      messageId: 'tokenNamesNotUsedInRenderProp',
      data: {
        tokenNames: 'tokenName',
        paramNames: 'tokenGame',
      }
    }],
  },

  // token names aren't used by render prop
  {
    code: `<OuiI18n tokens={['ouiFooBar.token1', 'ouiFooBar.token2']} defaults={['value 1', 'value 2']}>
      {([tokener1, token2]) => 'asdf'}
    </OuiI18n>`,
    errors: [{
      messageId: 'tokenNamesNotUsedInRenderProp',
      data: {
        tokenNames: 'token1, token2',
        paramNames: 'token2, tokener1'
      }
    }],
  },

  // default callback params don't match values
  {
    code: `<OuiI18n token="ouiFooBar.token" values={{ nare: 'John' }} default={({ name }) => name}/>`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'name',
        provided: 'nare'
      }
    }]
  },

  // invalid attribute types
  {
    code: '<OuiI18n token={5} default="value"/>',
    errors: [{ messageId: 'invalidTokenType', data: { type: 'JSXExpressionContainer' } }]
  },
  {
    code: `<OuiI18n tokens="ouiFooBar.token" defaults={['value']}/>`,
    errors: [{ messageId: 'invalidTokensType', data: { type: 'Literal' } }]
  },
  {
    code: `<OuiI18n tokens={5} defaults={['value']}/>`,
    errors: [{ messageId: 'invalidTokensType', data: { type: 'Literal' } }]
  },
  {
    code: `<OuiI18n tokens={[5]} defaults={['value']}/>`,
    errors: [{ messageId: 'invalidTokensType', data: { type: 'Literal' } }]
  },
  {
    code: '<OuiI18n token="ouiFooBar.token" default={5}/>',
    errors: [{ messageId: 'invalidDefaultType', data: { type: 'Literal' } }]
  },
  {
    code: `<OuiI18n tokens={['ouiFooBar.token']} defaults="value"/>`,
    errors: [{ messageId: 'invalidDefaultsType', data: { type: 'Literal' } }]
  },
  {
    code: `<OuiI18n tokens={['ouiFooBar.token']} defaults={5}/>`,
    errors: [{ messageId: 'invalidDefaultsType', data: { type: 'Literal' } }]
  },
  {
    code: `<OuiI18n tokens={['ouiFooBar.token']} defaults={[5]}/>`,
    errors: [{ messageId: 'invalidDefaultsType', data: { type: 'Literal' } }]
  },

  // /** useOuiI18n **/
  // token doesn't match file name
  {
    code: `useOuiI18n('ouiFooeyBar.tokenName', 'Some default value')`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'ouiFooeyBar.tokenName', tokenNamespace: 'ouiFooBar' } }]
  },

  // token doesn't have at least two parts
  {
    code: `useOuiI18n('ouiFooBar', 'Some default value')`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'ouiFooBar', tokenNamespace: 'ouiFooBar' } }]
  },
  {
    code: `useOuiI18n('tokenName', 'Some default value')`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'tokenName', tokenNamespace: 'ouiFooBar' } }]
  },

  // invalid tokens
  {
    code: `useOuiI18n(['ouiFooBar.token1', 'token2'], ['value1', 'value 2'])`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'token2', tokenNamespace: 'ouiFooBar' } }]
  },
  {
    code: `useOuiI18n(['ouiFooeyBar.token1', 'ouiFooBar.token2'], ['value1', 'value 2'])`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'ouiFooeyBar.token1', tokenNamespace: 'ouiFooBar' } }]
  },
  {
    code: `useOuiI18n(['ouiFooBar.token1'], ['value1', 'value 2'])`,
    errors: [{ messageId: 'mismatchedTokensAndDefaults', data: { tokenLength: 1, defaultsLength: 2 } }]
  },

  // values not in agreement with default string
  {
    code: `useOuiI18n('ouiFooBar.tokenName', '{value}, {value2}', { valuee: 'Hello', value2: 'World' })`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'value, value2',
        provided: 'value2, valuee'
      }
    }]
  },
  {
    code: `useOuiI18n('ouiFooBar.tokenName', '{valuee}, {value2}', { value: 'Hello', value2: 'World' })`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'value2, valuee',
        provided: 'value, value2'
      }
    }]
  },

  // default callback params don't match values
  {
    code: `useOuiI18n('ouiFooBar.token', ({ name }) => name, { nare: 'John' })`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'name',
        provided: 'nare'
      }
    }]
  },

  // invalid attribute types
  {
    code: `useOuiI18n('ouiFooBar.token', ['value'])`,
    errors: [{ messageId: 'invalidDefaultType', data: { type: 'ArrayExpression' } }]
  },
  {
    code: `useOuiI18n(5, ['value'])`,
    errors: [{ messageId: 'invalidDefaultType', data: { type: 'ArrayExpression' } }]
  },
  {
    code: `useOuiI18n([5], ['value'])`,
    errors: [{ messageId: 'invalidTokensType', data: { type: 'Literal' } }]
  },
  {
    code: `useOuiI18n(['ouiFooBar.token'], 'value')`,
    errors: [{ messageId: 'invalidDefaultsType', data: { type: 'Literal' } }]
  },
  {
    code: `useOuiI18n(['ouiFooBar.token'], 5)`,
    errors: [{ messageId: 'invalidDefaultsType', data: { type: 'Literal' } }]
  },
  {
    code: `useOuiI18n(['ouiFooBar.token'], [5])`,
    errors: [{ messageId: 'invalidDefaultsType', data: { type: 'Literal' } }]
  },
];

function withFilename(ruleset) {
  return ruleset.map(code => {
    const definition = typeof code === 'string' ? { code } : code;
    definition.filename = 'foo_bar.js';
    return definition;
  });
}

ruleTester.run('i18n', rule, {
  valid: withFilename(valid),
  invalid: withFilename(invalid),
});
