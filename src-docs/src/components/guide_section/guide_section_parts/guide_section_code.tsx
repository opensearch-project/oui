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

import React, { FunctionComponent, useState, useEffect } from 'react';
import { OuiCodeBlock } from '../../../../../src/components/code';
// @ts-ignore Not TS
import { renderJsSourceCode } from '../_utils';

export type GuideSectionExampleCode = {
  code: any;
};

export const GuideSectionExampleCode: FunctionComponent<GuideSectionExampleCode> = ({
  code,
}) => {
  const [codeToRender, setCodeToRender] = useState();

  useEffect(() => {
    setCodeToRender(renderJsSourceCode(code));
    return () => {
      setCodeToRender(undefined);
    };
  }, [code]);

  return (
    <>
      <OuiCodeBlock language="jsx" overflowHeight={400} isCopyable>
        {codeToRender}
      </OuiCodeBlock>
    </>
  );
};
