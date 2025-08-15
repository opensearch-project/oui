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

import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure RTL to use data-test-subj as the testIdAttribute
configure({
  testIdAttribute: 'data-test-subj',
});
