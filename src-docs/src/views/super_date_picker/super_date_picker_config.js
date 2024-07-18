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
  OuiSwitch,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(true);
  const [isAutoRefreshOnly, setIsAutoRefreshOnly] = useState(false);
  const [compressed, setCompressed] = useState(false);
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

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const toggleShowApplyButton = () => {
    setShowUpdateButton(!showUpdateButton);
  };

  const toggleShowRefreshOnly = () => {
    setIsAutoRefreshOnly(!isAutoRefreshOnly);
  };

  const toggleCompressed = () => {
    setCompressed(!compressed);
  };

  return (
    <Fragment>
      <OuiSwitch
        label="Show update button"
        onChange={toggleShowApplyButton}
        checked={!isAutoRefreshOnly && showUpdateButton}
        disabled={isAutoRefreshOnly}
      />
      &emsp;
      <OuiSwitch
        label="Is auto-refresh only"
        onChange={toggleShowRefreshOnly}
        checked={isAutoRefreshOnly}
      />
      &emsp;
      <OuiSwitch
        label="Is disabled"
        onChange={toggleDisabled}
        checked={isDisabled}
      />
      &emsp;
      <OuiSwitch
        label="Compressed"
        onChange={toggleCompressed}
        checked={compressed}
      />
      <OuiSpacer />
      <OuiSuperDatePicker
        isDisabled={isDisabled}
        isLoading={isLoading}
        start={start}
        end={end}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
        onRefreshChange={onRefreshChange}
        recentlyUsedRanges={recentlyUsedRanges}
        showUpdateButton={showUpdateButton}
        isAutoRefreshOnly={isAutoRefreshOnly}
        compressed={compressed}
      />
      <OuiSpacer />
    </Fragment>
  );
};
