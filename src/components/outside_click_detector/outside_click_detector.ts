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

import {
  Children,
  cloneElement,
  Component,
  EventHandler,
  MouseEvent as ReactMouseEvent,
  ReactElement,
} from 'react';
import { htmlIdGenerator } from '../../services/accessibility';

export interface OuiEvent extends Event {
  ouiGeneratedBy: string[];
}

export interface OuiOutsideClickDetectorProps {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactElement<any>;
  onOutsideClick: (event: Event) => void;
  isDisabled?: boolean;
  onMouseDown?: (event: ReactMouseEvent) => void;
  onMouseUp?: (event: ReactMouseEvent) => void;
  onTouchStart?: (event: ReactMouseEvent) => void;
  onTouchEnd?: (event: ReactMouseEvent) => void;
}

export class OuiOutsideClickDetector extends Component<
  OuiOutsideClickDetectorProps
> {
  // We are working with the assumption that a click event is
  // equivalent to a sequential, compound press and release of
  // the pointing device (mouse, finger, stylus, etc.).
  // A click event's target can be imprecise, as the value will be
  // the closest common ancestor of the press (mousedown, touchstart)
  // and release (mouseup, touchend) events (often <body />) if
  // the the target of each event differs.
  // We need the actual event targets to make the correct decisions
  // about user intention. So, consider the down/start and up/end
  // items below as the deconstruction of a click event.

  private id: string;

  private capturedDownIds: string[];

  constructor(props: OuiOutsideClickDetectorProps) {
    super(props);

    // the id is used to identify which OuiOutsideClickDetector
    // is the source of a click event; as the click event bubbles
    // up and reaches the click detector's child component the
    // id value is stamped on the event. This id is inspected
    // in the document's click handler, and if the id doesn't
    // exist or doesn't match this detector's id, then trigger
    // the outsideClick callback.
    //
    // Taking this approach instead of checking if the event's
    // target element exists in this component's DOM sub-tree is
    // necessary for handling clicks originating from children
    // rendered through React's portals (OuiPortal). The id tracking
    // works because React guarantees the event bubbles through the
    // virtual DOM and executes OuiClickDetector's onClick handler,
    // stamping the id even though the event originates outside
    // this component's reified DOM tree.
    this.id = htmlIdGenerator()();

    this.capturedDownIds = [];
  }

  onClickOutside: EventHandler<any> = (e: Event) => {
    const { isDisabled, onOutsideClick } = this.props;

    if (isDisabled) {
      this.capturedDownIds = [];
      return;
    }

    const event = (e as unknown) as OuiEvent;

    if (
      (event.ouiGeneratedBy && event.ouiGeneratedBy.includes(this.id)) ||
      this.capturedDownIds.includes(this.id)
    ) {
      this.capturedDownIds = [];
      return;
    }

    this.capturedDownIds = [];
    return onOutsideClick(event);
  };

  componentDidMount() {
    document.addEventListener('mouseup', this.onClickOutside);
    document.addEventListener('touchend', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClickOutside);
    document.removeEventListener('touchend', this.onClickOutside);
  }

  onChildClick = (
    event: ReactMouseEvent,
    cb: (event: ReactMouseEvent) => void
  ) => {
    // to support nested click detectors, build an array
    // of detector ids that have been encountered;
    if (event.nativeEvent.hasOwnProperty('ouiGeneratedBy')) {
      ((event.nativeEvent as unknown) as OuiEvent).ouiGeneratedBy.push(this.id);
    } else {
      ((event.nativeEvent as unknown) as OuiEvent).ouiGeneratedBy = [this.id];
    }
    if (cb) cb(event);
  };

  onChildMouseDown = (event: ReactMouseEvent) => {
    this.onChildClick(event, (e) => {
      const nativeEvent = (e.nativeEvent as unknown) as OuiEvent;
      this.capturedDownIds = nativeEvent.ouiGeneratedBy;
      if (this.props.onMouseDown) this.props.onMouseDown(e);
      if (this.props.onTouchStart) this.props.onTouchStart(e);
    });
  };

  onChildMouseUp = (event: ReactMouseEvent) => {
    this.onChildClick(event, (e) => {
      if (this.props.onMouseUp) this.props.onMouseUp(e);
      if (this.props.onTouchEnd) this.props.onTouchEnd(e);
    });
  };

  render() {
    const props = {
      ...this.props.children.props,
      ...{
        onMouseDown: this.onChildMouseDown,
        onTouchStart: this.onChildMouseDown,
        onMouseUp: this.onChildMouseUp,
        onTouchEnd: this.onChildMouseUp,
      },
    };

    const child = Children.only(this.props.children);
    return cloneElement(child, props);
  }
}
