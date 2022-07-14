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

import PropTypes from "prop-types";
import React from "react";

export default function CalendarContainer({
  className,
  children,
  arrowProps = {}
}) {
  return (
    <div className={className}>
      <div className="react-datepicker__triangle" {...arrowProps} />
      {children}
    </div>
  );
}

CalendarContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  arrowProps: PropTypes.object // react-popper arrow props
};
