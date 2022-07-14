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

import React, { useState, Fragment } from 'react';

import {
  OuiSuperDatePicker,
  OuiSpacer,
  OuiFormControlLayoutDelimited,
  OuiFormLabel,
  OuiPanel,
  OuiText,
} from '../../../../src/components';

export default () => {
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');
  const [isPaused, setIsPaused] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState();

  const onTimeChange = ({ start, end }) => {
    const recentlyUsedRange = recentlyUsedRanges.filter((recentlyUsedRange) => {
      const isDuplicate =
        recentlyUsedRange.start === start && recentlyUsedRange.end === end;
      return !isDuplicate;
    });
    recentlyUsedRange.unshift({ start, end });
    setStart(start);
    setEnd(end);
    setRecentlyUsedRanges(
      recentlyUsedRange.length > 10
        ? recentlyUsedRange.slice(0, 9)
        : recentlyUsedRange
    );
    setIsLoading(true);
    startLoading();
  };

  const onRefresh = ({ start, end, refreshInterval }) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    }).then(() => {
      console.log(start, end, refreshInterval);
    });
  };

  const onStartInputChange = (e) => {
    setStart(e.target.value);
  };

  const onEndInputChange = (e) => {
    setEnd(e.target.value);
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const onRefreshChange = ({ isPaused, refreshInterval }) => {
    setIsPaused(isPaused);
    setRefreshInterval(refreshInterval);
  };

  const renderTimeRange = () => {
    return (
      <Fragment>
        <OuiPanel paddingSize="m">
          <OuiText size="s">
            OuiSuperDatePicker should be resilient to invalid date values. You
            can try to break it with unexpected values here.
          </OuiText>
          <OuiSpacer />
          <OuiFormControlLayoutDelimited
            prepend={<OuiFormLabel>Dates</OuiFormLabel>}
            startControl={
              <input
                onChange={onStartInputChange}
                type="text"
                value={start}
                placeholder="start"
                className="ouiFieldText"
              />
            }
            endControl={
              <input
                onChange={onEndInputChange}
                type="text"
                placeholder="end"
                value={end}
                className="ouiFieldText"
              />
            }
          />
        </OuiPanel>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <OuiSuperDatePicker
        isLoading={isLoading}
        start={start}
        end={end}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
        onRefreshChange={onRefreshChange}
        recentlyUsedRanges={recentlyUsedRanges}
      />
      <OuiSpacer />
      {renderTimeRange()}
    </Fragment>
  );
};
