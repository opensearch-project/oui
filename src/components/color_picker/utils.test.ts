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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { chromaValid, getChromaColor, parseColor } from './utils';

describe('parseColor', () => {
  test('hex-like', () => {
    expect(parseColor('#')).toBe('#');
    expect(parseColor('#0')).toBe('#0');
    expect(parseColor('#00')).toBe('#00');
    expect(parseColor('#000')).toBe('#000');
    expect(parseColor('#0000')).toBe('#0000');
    expect(parseColor('#00000')).toBe('#00000');
    expect(parseColor('#000000')).toBe('#000000');
    expect(parseColor('#0000000')).toBe('#0000000');
    expect(parseColor('#00000000')).toBe('#00000000');
    expect(parseColor('#000000000')).toBe('#000000000');

    expect(parseColor('000')).toBe('000');
    expect(parseColor('000000')).toBe('000000');

    expect(parseColor('#JKJ')).toBe('#JKJ');
    expect(parseColor('#JKJKJK')).toBe('#JKJKJK');
    expect(parseColor('#JKJKJK00')).toBe('#JKJKJK00');
  });
  test('comma separated', () => {
    expect(parseColor('0,')).toBe('');
    expect(parseColor('0,0')).toBe('');
    expect(parseColor('0,0,')).toBe('');
    expect(parseColor('0,0,0')).toEqual([0, 0, 0]);
    expect(parseColor('0,0,0,')).toEqual([0, 0, 0]);
    expect(parseColor('0,0,0,0')).toEqual([0, 0, 0, 0]);
    expect(parseColor('0,0,0,0,')).toEqual([0, 0, 0, 0]);
    expect(parseColor('0,0,0,0,0')).toBe('');

    expect(parseColor('0, 0, 0, 0')).toEqual([0, 0, 0, 0]);
  });
  test('color names', () => {
    expect(parseColor('red')).toBe('red');
  });
  test('nonsensical', () => {
    expect(parseColor('test')).toBe('test');
  });
  test('null or empty', () => {
    expect(parseColor(null)).toBe(null);
    expect(parseColor('')).toBe(null);
  });
});

describe('chromaValid', () => {
  test('hex-like', () => {
    expect(chromaValid('#')).toBe(false);
    expect(chromaValid('#0')).toBe(false);
    expect(chromaValid('#00')).toBe(false);
    expect(chromaValid('#000')).toBe(true);
    expect(chromaValid('#0000')).toBe(true);
    expect(chromaValid('#00000')).toBe(false);
    expect(chromaValid('#000000')).toBe(true);
    expect(chromaValid('#0000000')).toBe(false);
    expect(chromaValid('#00000000')).toBe(true);
    expect(chromaValid('#000000000')).toBe(false);

    expect(chromaValid('000')).toBe(true);
    expect(chromaValid('000000')).toBe(true);
    expect(chromaValid('00000000')).toBe(true);

    expect(chromaValid('#JKJ')).toBe(false);
    expect(chromaValid('#JKJKJK')).toBe(false);
    expect(chromaValid('#JKJKJK00')).toBe(false);
  });
  test('comma separated', () => {
    expect(chromaValid('0,')).toBe(false);
    expect(chromaValid('0,0')).toBe(false);
    expect(chromaValid('0,0,')).toBe(false);
    expect(chromaValid('0,0,0')).toBe(true);
    expect(chromaValid('0,0,0,')).toBe(true);
    expect(chromaValid('0,0,0,0')).toBe(true);
    expect(chromaValid('0,0,0,0,')).toBe(true);
    expect(chromaValid('0,0,0,0,0')).toBe(false);

    expect(chromaValid('0, 0, 0, 0')).toBe(true);

    expect(chromaValid([0, 0, 0])).toBe(true);
    expect(chromaValid([0, 0, 0, 0])).toBe(true);
  });
  test('color names', () => {
    expect(chromaValid('red')).toBe(false);
  });
  test('nonsensical', () => {
    expect(chromaValid('test')).toBe(false);
  });
  test('empty', () => {
    expect(chromaValid('')).toBe(false);
  });
});

// chroma-js does not expose its `Color` class, so using `.toBeInstanceOf` is not possible.
// It also adds custom methods to returned arrays and objects making equality checks difficult.
// Thus, using resulting class methods (rgba()) to check return value
describe('getChromaColor', () => {
  test('hex-like', () => {
    expect(getChromaColor('#')).toBe(null);
    expect(getChromaColor('#0')).toBe(null);
    expect(getChromaColor('#00')).toBe(null);
    expect(getChromaColor('#000')!.rgba()).toEqual([0, 0, 0, 1]);
    expect(getChromaColor('#0000')).toBe(null);
    expect(getChromaColor('#00000')).toBe(null);
    expect(getChromaColor('#000000')!.rgba()).toEqual([0, 0, 0, 1]);
    expect(getChromaColor('#0000000')).toBe(null);
    expect(getChromaColor('#00000000')).toBe(null);
    expect(getChromaColor('#00000000', true)!.rgba()).toEqual([0, 0, 0, 0]);
    expect(getChromaColor('#000000000')).toBe(null);

    expect(getChromaColor('000')!.rgba()).toEqual([0, 0, 0, 1]);
    expect(getChromaColor('000000')!.rgba()).toEqual([0, 0, 0, 1]);

    expect(getChromaColor('00000000')).toBe(null);
    expect(getChromaColor('00000000', true)!.rgba()).toEqual([0, 0, 0, 0]);

    expect(getChromaColor('#JKJ')).toBe(null);
    expect(getChromaColor('#JKJKJK')).toBe(null);
    expect(getChromaColor('#JKJKJK00')).toBe(null);
  });
  test('comma separated', () => {
    expect(getChromaColor('0,')).toBe(null);
    expect(getChromaColor('0,0')).toBe(null);
    expect(getChromaColor('0,0,')).toBe(null);
    expect(getChromaColor('0,0,0')!.rgba()).toEqual([0, 0, 0, 1]);
    expect(getChromaColor('0,0,0,')!.rgba()).toEqual([0, 0, 0, 1]);
    expect(getChromaColor('0,0,0,0')).toBe(null);
    expect(getChromaColor('0,0,0,0', true)!.rgba()).toEqual([0, 0, 0, 0]);
    expect(getChromaColor('0,0,0,0,')).toBe(null);
    expect(getChromaColor('0,0,0,0,0')).toBe(null);

    expect(getChromaColor('0, 0, 0, 0')).toBe(null);
    expect(getChromaColor('0, 0, 0, 0', true)!.rgba()).toEqual([0, 0, 0, 0]);
  });
  test('color names', () => {
    expect(getChromaColor('red')).toBe(null);
  });
  test('nonsensical', () => {
    expect(getChromaColor('test')).toBe(null);
  });
  test('empty', () => {
    expect(getChromaColor('')).toBe(null);
  });
});
