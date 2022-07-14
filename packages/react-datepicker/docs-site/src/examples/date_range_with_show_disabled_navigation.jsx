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
import moment from "moment";

export default class DateRangeWithShowDisabledNavigation extends React.Component {
  state = {
    startDate: null
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="jsx">{`
<DatePicker
  selected={this.state.startDate}
  onChange={this.handleChange}
  minDate={moment()}
  maxDate={moment().add(5, "months")}
  showDisabledMonthNavigation />
</div>

`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={moment()}
            maxDate={moment().add(5, "months")}
            showDisabledMonthNavigation />
        </div>
      </div>
    );
  }
}
