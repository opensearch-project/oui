/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  ButtonGroup as BaseButtonGroup,
  ButtonGroupText,
  ButtonGroupSeparator as BaseButtonGroupSeparator,
} from '../ui/button-group';

function ButtonGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <BaseButtonGroup
      orientation="horizontal"
      className={cn(className)}
      {...props}
    />
  );
}

function ButtonGroupSeparator({
  className,
  ...props
}: Omit<React.ComponentProps<typeof BaseButtonGroupSeparator>, 'orientation'>) {
  return (
    <BaseButtonGroupSeparator
      orientation="vertical"
      className={cn(className)}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText };
