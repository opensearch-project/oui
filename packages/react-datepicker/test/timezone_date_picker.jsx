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
import DatePicker from "../src/index.jsx";
import * as utils from "../src/date_utils";

class TimezoneDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { startDate: null, utcOffset: -4 };
  }

  handleChange(date) {
    this.setState({ startDate: date });
  }

  render() {
    var selected =
      this.state.startDate &&
      utils.setUTCOffset(
        utils.cloneDate(this.state.startDate),
        this.state.utcOffset
      );

    return (
      <DatePicker
        utcOffset={this.state.utcOffset}
        dateFormat="YYYY-MM-DD HH:mm"
        selected={selected}
        onChange={this.handleChange}
      />
    );
  }
}

export default TimezoneDatePicker;
