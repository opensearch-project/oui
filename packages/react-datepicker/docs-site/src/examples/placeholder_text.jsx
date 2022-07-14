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

import React from "react";
import DatePicker from "react-datepicker";

export default function PlaceholderText() {
  return (
    <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {'<DatePicker placeholderText="Click to select a date" />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker placeholderText="Click to select a date" />
      </div>
    </div>
  );
}
