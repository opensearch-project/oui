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

import {
  // eslint-disable-next-line import/named
  MutationObserver,
  // eslint-disable-next-line import/named
  MutationNotifier,
} from '../polyfills/mutation_observer';

// used by data_grid.tsx to return a column size for the jest environment
// long term, we need to find an in-browser test environment for these
// e.g. cypress
global._isJest = true;

// polyfill window.MutationObserver and intersect jsdom's relevant methods
// from https://github.com/aurelia/pal-nodejs
// https://github.com/aurelia/pal-nodejs/blob/56396ff7c7693669dbafc8e9e49ee6bc29472f12/src/nodejs-pal-builder.ts#L63

const undos = [];
afterAll(() => {
  while (undos.length) {
    undos.pop()();
  }
});

beforeAll(() => {
  Object.defineProperty(window, 'MutationObserver', {
    value: MutationObserver,
  });
  patchNotifyChange(window);

  function patchNotifyChange(window) {
    const notifyInstance = MutationNotifier.getInstance();
    const notify = function (node) {
      notifyInstance.notifyChanged(node);
    };

    const nodeProto = window.Node.prototype;

    intersectMethod(nodeProto, 'appendChild', notify);
    intersectMethod(nodeProto, 'insertBefore', notify);
    intersectMethod(nodeProto, 'removeChild', notify);
    intersectMethod(nodeProto, 'replaceChild', notify);
    intersectSetter(nodeProto, 'nodeValue', notify);
    intersectSetter(nodeProto, 'textContent', notify);

    const charProto = window.CharacterData.prototype;

    intersectSetter(charProto, 'data', notify);

    const elementProto = window.Element.prototype;

    intersectMethod(elementProto, 'setAttribute', notify);
    intersectMethod(elementProto, 'removeAttribute', notify);
    intersectMethod(elementProto, 'removeAttributeNode', notify);
    intersectMethod(elementProto, 'removeAttributeNS', notify);
  }

  function intersectMethod(proto, methodName, intersect) {
    const orig = proto[methodName];
    proto[methodName] = function (...args) {
      const ret = orig.apply(this, args);
      intersect(this);
      return ret;
    };

    undos.push(() => {
      proto[methodName] = orig;
    });
  }

  function intersectSetter(proto, propertyName, intersect) {
    const old = Object.getOwnPropertyDescriptor(proto, propertyName);
    const oldSet = old.set;
    const newSet = function set(V) {
      oldSet.call(this, V);
      intersect(this);
    };
    Object.defineProperty(proto, propertyName, {
      set: newSet,
      get: old.get,
      configurable: old.configurable,
      enumerable: old.enumerable,
    });

    undos.push(() => {
      Object.defineProperty(proto, propertyName, {
        set: oldSet,
        get: old.get,
        configurable: old.configurable,
        enumerable: old.enumerable,
      });
    });
  }
});
