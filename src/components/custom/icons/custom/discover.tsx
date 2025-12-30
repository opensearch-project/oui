/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { BaseIcon, type IconProps } from '../base-icon';

/**
 * DiscoverIcon - Custom SVG icon component
 * Generated from SVG file
 */
export const DiscoverIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBox="0 0 16 16" {...props}>
        <path d="M8 14.667A6.667 6.667 0 1 1 8 1.334a6.667 6.667 0 0 1 0 13.333zm0-1.333A5.333 5.333 0 1 0 8 2.667a5.333 5.333 0 0 0 0 10.667zM11 5 9.333 9.334 5 11l1.667-4.333L11 5zM8 8.667a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333z"/>
      </BaseIcon>
    );
  }
);

DiscoverIcon.displayName = 'DiscoverIcon';
