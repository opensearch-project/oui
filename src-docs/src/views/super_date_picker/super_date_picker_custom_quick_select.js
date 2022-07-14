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
  OuiLink,
} from '../../../../src/components';

function MyCustomQuickSelectPanel({ applyTime }) {
  function applyMyCustomTime() {
    applyTime({ start: 'now-30d', end: 'now+7d' });
  }

  return (
    <OuiLink onClick={applyMyCustomTime}>entire dataset timerange</OuiLink>
  );
}

export default () => {
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');
  const [showCustomQuickSelectPanel, setShowCustomQuickSelectPanel] = useState(
    true
  );
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

  const toggleShowCustomQuickSelectPanel = () => {
    setShowCustomQuickSelectPanel(!showCustomQuickSelectPanel);
  };

  let customQuickSelectPanels;
  if (showCustomQuickSelectPanel) {
    customQuickSelectPanels = [
      {
        title: 'My custom panel',
        content: <MyCustomQuickSelectPanel />,
      },
    ];
  }
  return (
    <Fragment>
      <OuiSwitch
        label="Show custom quick menu panel"
        onChange={toggleShowCustomQuickSelectPanel}
        checked={showCustomQuickSelectPanel}
      />
      &emsp;
      <OuiSpacer />
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
        customQuickSelectPanels={customQuickSelectPanels}
      />
      <OuiSpacer />
    </Fragment>
  );
};
