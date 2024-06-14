/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

if (typeof window !== 'undefined') {
  HTMLElement.prototype.insertAdjacentElement = function (position, element) {
    switch (position) {
      case 'beforebegin':
        this.parentNode.insertBefore(element, this);
        break;
      case 'afterend':
        if (this.nextSibling) {
          this.parentNode.insertBefore(element, this.nextSibling);
        } else {
          this.parentNode.appendChild(element);
        }
        break;
      // add other cases if needed
      default:
        throw new Error(`Unsupported position: ${position}`);
    }
  };
}
