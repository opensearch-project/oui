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

import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import { keys } from '../../services';
import { tabbable } from 'tabbable';
import { OuiDataGridControlColumn } from './data_grid_types';
import { DataGridFocusContext } from './data_grid_context';

export interface OuiDataGridControlHeaderRowProps {
  index: number;
  controlColumn: OuiDataGridControlColumn;
  headerIsInteractive: boolean;
  className?: string;
}

export const OuiDataGridControlHeaderCell: FunctionComponent<OuiDataGridControlHeaderRowProps> = (
  props
) => {
  const { controlColumn, index, headerIsInteractive, className } = props;

  const { setFocusedCell, onFocusUpdate } = useContext(DataGridFocusContext);

  const { headerCellRender: HeaderCellRender, width, id } = controlColumn;

  const classes = classnames('ouiDataGridHeaderCell', className);

  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    onFocusUpdate([index, -1], (isFocused: boolean) => {
      setIsFocused(isFocused);
    });
  }, [index, onFocusUpdate]);

  const headerRef = useRef<HTMLDivElement>(null);
  const [isCellEntered, setIsCellEntered] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      function enableInteractives() {
        const interactiveElements = headerRef.current!.querySelectorAll(
          '[data-ouigrid-tab-managed]'
        );
        for (let i = 0; i < interactiveElements.length; i++) {
          interactiveElements[i].setAttribute('tabIndex', '0');
        }
      }

      function disableInteractives() {
        const tababbles = tabbable(headerRef.current!);
        if (tababbles.length > 1) {
          console.warn(
            `OuiDataGridHeaderCell expects at most 1 tabbable element, ${tababbles.length} found instead`
          );
        }
        for (let i = 0; i < tababbles.length; i++) {
          const element = tababbles[i];
          element.setAttribute('data-ouigrid-tab-managed', 'true');
          element.setAttribute('tabIndex', '-1');
        }
      }

      if (isCellEntered) {
        enableInteractives();
        const tabbables = tabbable(headerRef.current!);
        if (tabbables.length > 0) {
          tabbables[0].focus();
        }
      } else {
        disableInteractives();
      }
    }
  }, [isCellEntered]);

  useEffect(() => {
    if (headerRef.current) {
      if (isFocused) {
        const interactives = headerRef.current.querySelectorAll(
          '[data-ouigrid-tab-managed]'
        );
        if (interactives.length === 1) {
          setIsCellEntered(true);
        } else {
          headerRef.current.focus();
        }
      } else {
        setIsCellEntered(false);
      }

      // focusin bubbles while focus does not, and this needs to react to children gaining focus
      function onFocusIn(e: FocusEvent) {
        if (headerIsInteractive === false) {
          // header is not interactive, avoid focusing
          requestAnimationFrame(() => headerRef.current!.blur());
          e.preventDefault();
          return false;
        } else {
          // take the focus
          setFocusedCell([index, -1]);
        }
      }

      // focusout bubbles while blur does not, and this needs to react to the children losing focus
      function onFocusOut() {
        // wait for the next element to receive focus, then update interactives' state
        requestAnimationFrame(() => {
          if (headerRef.current) {
            if (headerRef.current.contains(document.activeElement) === false) {
              setIsCellEntered(false);
            }
          }
        });
      }

      function onKeyUp(event: KeyboardEvent) {
        switch (event.key) {
          case keys.ENTER: {
            event.preventDefault();
            setIsCellEntered(true);
            break;
          }
          case keys.ESCAPE: {
            event.preventDefault();
            // move focus to cell
            setIsCellEntered(false);
            headerRef.current!.focus();
            break;
          }
          case keys.F2: {
            event.preventDefault();
            if (document.activeElement === headerRef.current) {
              // move focus into cell's interactives
              setIsCellEntered(true);
            } else {
              // move focus to cell
              setIsCellEntered(false);
              headerRef.current!.focus();
            }
            break;
          }
        }
      }

      const headerNode = headerRef.current;
      // @ts-ignore-next line TS doesn't have focusin
      headerNode.addEventListener('focusin', onFocusIn);
      headerNode.addEventListener('focusout', onFocusOut);
      headerNode.addEventListener('keyup', onKeyUp);
      return () => {
        // @ts-ignore-next line TS doesn't have focusin
        headerNode.removeEventListener('focusin', onFocusIn);
        headerNode.removeEventListener('focusout', onFocusOut);
        headerNode.removeEventListener('keyup', onKeyUp);
      };
    }
  }, [setFocusedCell, headerIsInteractive, isFocused, setIsCellEntered, index]);

  return (
    <div
      role="columnheader"
      ref={headerRef}
      tabIndex={isFocused ? 0 : -1}
      className={classes}
      data-test-subj={`dataGridHeaderCell-${id}`}
      style={width != null ? { width: `${width}px` } : {}}>
      <div className="ouiDataGridHeaderCell__content">
        <HeaderCellRender />
      </div>
    </div>
  );
};
