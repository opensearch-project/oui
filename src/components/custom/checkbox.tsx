/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { Checkbox as BaseCheckbox } from '../ui/checkbox';
import { cn } from '@/lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckbox>) {
  return (
    <BaseCheckbox
      className={cn('oui:[&_svg]:!text-white', className)}
      {...props}
    />
  );
}

export { Checkbox };
