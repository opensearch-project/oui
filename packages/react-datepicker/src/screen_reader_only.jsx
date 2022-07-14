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

import { cloneElement } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const ScreenReaderOnly = ({ children }) => {
  const classes = classNames("react-datepicker__screenReaderOnly", children.props.className);

  const props = {
    ...children.props,
    ...{
      className: classes
    }
  };

  return cloneElement(children, props);
};

ScreenReaderOnly.propTypes = {
  children: PropTypes.node
};
