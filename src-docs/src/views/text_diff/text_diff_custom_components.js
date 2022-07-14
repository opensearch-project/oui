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

import React from 'react';

import { useOuiTextDiff, OuiCodeBlock } from '../../../../src/components';

export default () => {
  const beforeText =
    'Orbiting this at a distance of roughly ninety-two million miles is an utterly insignificant little blue green planet whose ape- descended life forms are so amazingly primitive that they still think digital watches are a pretty neat idea.';
  const afterText =
    'Orbiting those at a distance of roughly ninety-nine billion yards is not insignificant dwaf red green planet whose ape- ascended life forms are so amazingly primitive that they still think digital clocks are a pretty neat idea.';
  const [rendered] = useOuiTextDiff({
    beforeText,
    afterText,
    insertComponent: 'strong',
    deleteComponent: 's',
  });

  return (
    <OuiCodeBlock fontSize="m" paddingSize="m">
      {rendered}
    </OuiCodeBlock>
  );
};
