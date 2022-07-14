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

import { TokenProps } from './token';

export type OuiTokenMapType =
  | 'tokenAnnotation'
  | 'tokenArray'
  | 'tokenBoolean'
  | 'tokenClass'
  | 'tokenConstant'
  | 'tokenElement'
  | 'tokenEnum'
  | 'tokenEnumMember'
  | 'tokenEvent'
  | 'tokenException'
  | 'tokenField'
  | 'tokenFile'
  | 'tokenFunction'
  | 'tokenInterface'
  | 'tokenKey'
  | 'tokenMethod'
  | 'tokenModule'
  | 'tokenNamespace'
  | 'tokenNull'
  | 'tokenNumber'
  | 'tokenObject'
  | 'tokenOperator'
  | 'tokenPackage'
  | 'tokenParameter'
  | 'tokenProperty'
  | 'tokenRepo'
  | 'tokenString'
  | 'tokenStruct'
  | 'tokenDate'
  | 'tokenIP'
  | 'tokenNested'
  | 'tokenAlias'
  | 'tokenShape'
  | 'tokenGeo'
  | 'tokenRange'
  | 'tokenSymbol'
  | 'tokenVariable'
  | 'tokenBinary'
  | 'tokenJoin'
  | 'tokenPercolator'
  | 'tokenFlattened'
  | 'tokenRankFeature'
  | 'tokenRankFeatures'
  | 'tokenKeyword'
  | 'tokenCompletionSuggester'
  | 'tokenDenseVector'
  | 'tokenText'
  | 'tokenTokenCount'
  | 'tokenSearchType'
  | 'tokenHistogram';

/**
 * Most of the style combinations for tokens are semi-arbitrary. However, there was an effort
 * to use the square shape for more common token types like string and number. Reserving the
 * circle shape for more uncommon token types so they grab attention.
 */

export const TOKEN_MAP: {
  [mapType in OuiTokenMapType]: Omit<TokenProps, 'iconType'>;
} = {
  tokenClass: {
    shape: 'circle',
    color: 'ouiColorVis1',
  },
  tokenProperty: {
    shape: 'circle',
    color: 'ouiColorVis2',
  },
  tokenEnum: {
    shape: 'circle',
    color: 'ouiColorVis3',
  },
  tokenVariable: {
    shape: 'circle',
    color: 'ouiColorVis7',
  },
  tokenMethod: {
    shape: 'square',
    color: 'ouiColorVis2',
  },
  tokenAnnotation: {
    shape: 'square',
    color: 'ouiColorVis5',
  },
  tokenException: {
    shape: 'circle',
    color: 'ouiColorVis0',
  },
  tokenInterface: {
    shape: 'circle',
    color: 'ouiColorVis9',
  },
  tokenParameter: {
    shape: 'square',
    color: 'ouiColorVis4',
  },
  tokenField: {
    shape: 'circle',
    color: 'ouiColorVis0',
  },
  tokenElement: {
    shape: 'square',
    color: 'ouiColorVis3',
  },
  tokenFunction: {
    shape: 'circle',
    color: 'ouiColorVis2',
  },
  tokenBoolean: {
    shape: 'square',
    color: 'ouiColorVis7',
  },
  tokenString: {
    shape: 'square',
    color: 'ouiColorVis1',
  },
  tokenArray: {
    shape: 'square',
    color: 'ouiColorVis7',
  },
  tokenNumber: {
    shape: 'square',
    color: 'ouiColorVis0',
  },
  tokenConstant: {
    shape: 'circle',
    color: 'ouiColorVis0',
  },
  tokenObject: {
    shape: 'circle',
    color: 'ouiColorVis3',
  },
  tokenEvent: {
    shape: 'circle',
    color: 'ouiColorVis4',
  },
  tokenKey: {
    shape: 'circle',
    color: 'ouiColorVis5',
  },
  tokenNull: {
    shape: 'square',
    color: 'ouiColorVis2',
  },
  tokenStruct: {
    shape: 'square',
    color: 'ouiColorVis0',
  },
  tokenPackage: {
    shape: 'square',
    color: 'ouiColorVis0',
  },
  tokenOperator: {
    shape: 'circle',
    color: 'ouiColorVis4',
  },
  tokenEnumMember: {
    shape: 'square',
    color: 'ouiColorVis7',
  },
  tokenRepo: {
    shape: 'rectangle',
    color: 'ouiColorVis1',
    fill: 'dark',
  },
  tokenSymbol: {
    shape: 'rectangle',
    color: 'ouiColorVis0',
    fill: 'dark',
  },
  tokenFile: {
    shape: 'rectangle',
    color: 'gray',
    fill: 'dark',
  },
  tokenNamespace: {
    shape: 'square',
    color: 'ouiColorVis1',
  },
  tokenModule: {
    shape: 'square',
    color: 'ouiColorVis4',
  },
  tokenDate: {
    shape: 'square',
    color: 'ouiColorVis6',
  },
  tokenGeo: {
    shape: 'square',
    color: 'ouiColorVis5',
  },
  tokenIP: {
    shape: 'square',
    color: 'ouiColorVis9',
  },
  tokenShape: {
    shape: 'circle',
    color: 'ouiColorVis8',
  },
  tokenRange: {
    shape: 'circle',
    color: 'ouiColorVis4',
  },
  tokenNested: {
    shape: 'circle',
    color: 'ouiColorVis2',
  },
  tokenAlias: {
    shape: 'circle',
    color: 'ouiColorVis3',
  },
  tokenBinary: {
    shape: 'square',
    color: 'ouiColorVis4',
  },
  tokenJoin: {
    shape: 'square',
    color: 'ouiColorVis5',
  },
  tokenPercolator: {
    shape: 'square',
    color: 'ouiColorVis6',
  },
  tokenFlattened: {
    shape: 'square',
    color: 'ouiColorVis7',
  },
  tokenRankFeature: {
    shape: 'square',
    color: 'ouiColorVis8',
  },
  tokenRankFeatures: {
    shape: 'square',
    color: 'ouiColorVis3',
  },
  tokenKeyword: {
    shape: 'square',
    color: 'ouiColorVis9',
  },
  tokenCompletionSuggester: {
    shape: 'square',
    color: 'ouiColorVis1',
  },
  tokenDenseVector: {
    shape: 'square',
    color: 'ouiColorVis2',
  },
  tokenText: {
    shape: 'square',
    color: 'ouiColorVis3',
  },
  tokenTokenCount: {
    shape: 'square',
    color: 'ouiColorVis4',
  },
  tokenSearchType: {
    shape: 'square',
    color: 'ouiColorVis5',
  },
  tokenHistogram: {
    shape: 'square',
    color: 'ouiColorVis6',
  },
};
