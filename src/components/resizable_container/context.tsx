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

import React, { createContext, useContext } from 'react';
import { OuiResizableContainerRegistry } from './types';
interface ContainerContextProps {
  registry?: OuiResizableContainerRegistry;
}

const OuiResizableContainerContext = createContext<ContainerContextProps>({});

interface ContextProviderProps extends Required<ContainerContextProps> {
  /**
   * ReactNode to render as this component's content
   */
  children: any;
}

export function OuiResizableContainerContextProvider({
  children,
  registry,
}: ContextProviderProps) {
  return (
    <OuiResizableContainerContext.Provider value={{ registry }}>
      {children}
    </OuiResizableContainerContext.Provider>
  );
}

export const useOuiResizableContainerContext = () => {
  const context = useContext(OuiResizableContainerContext);
  if (!context.registry) {
    throw new Error(
      'useOuiResizableContainerContext must be used within a <OuiResizableContainerContextProvider />'
    );
  }
  return context;
};
