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

import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {
  OuiButton,
  OuiFlexGroup,
  OuiFlexItem,
  OuiHeader,
  OuiHeaderLogo,
  OuiHeaderSectionItemButton,
  OuiIcon,
  OuiSpacer,
} from '../../../../src/components';

const HeaderUpdates = forwardRef(
  ({ showNotification, notificationsNumber }, ref) => {
    const bellRef = useRef();
    const cheerRef = useRef();

    // wrapping the `ouiAnimate` methods to make them available through this component's `ref`
    const ouiAnimate = useCallback(() => {
      bellRef.current?.ouiAnimate();
      cheerRef.current?.ouiAnimate();
    }, []);

    // we're using the `useImperativeHandle` which allows the child to expose a function to the parent
    // this way we can trigger the animations on both child components: `bellRef` and `cheerRef`
    useImperativeHandle(
      ref,
      () => ({
        ouiAnimate,
      }),
      [ouiAnimate]
    );

    const bellButton = (
      <OuiHeaderSectionItemButton
        ref={bellRef}
        aria-label={`News feed: ${
          showNotification ? 'Updates available' : 'No updates'
        }`}
        notification={showNotification}>
        <OuiIcon type="bell" />
      </OuiHeaderSectionItemButton>
    );

    const cheerButton = (
      <OuiHeaderSectionItemButton
        ref={cheerRef}
        aria-label={`News feed: ${
          showNotification ? 'Updates available' : 'No updates'
        }`}
        notification={showNotification && notificationsNumber}>
        <OuiIcon type="cheer" />
      </OuiHeaderSectionItemButton>
    );

    return (
      <>
        {bellButton}
        {cheerButton}
      </>
    );
  }
);
HeaderUpdates.displayName = 'HeaderUpdates';

export default () => {
  const [showNotification, setShowNotification] = useState(false);
  const headerUpdatesRef = useRef();
  const [notificationsNumber, setNotificationsNumber] = useState(0);

  const notify = () => {
    if (!showNotification) {
      setNotificationsNumber(1);
      setShowNotification(true);
    } else {
      setNotificationsNumber(notificationsNumber + 1);
    }

    headerUpdatesRef.current?.ouiAnimate();
  };

  return (
    <>
      <OuiFlexGroup responsive={false} alignItems="center" gutterSize="m">
        <OuiFlexItem grow={false}>
          <OuiButton size="s" onClick={notify}>
            Notify & animate
          </OuiButton>
        </OuiFlexItem>

        <OuiFlexItem grow={false}>
          <OuiButton
            size="s"
            color="warning"
            onClick={() => {
              setShowNotification(false);
              setNotificationsNumber(0);
            }}>
            Reset
          </OuiButton>
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer />

      <OuiHeader
        sections={[
          {
            items: [<OuiHeaderLogo>Elastic</OuiHeaderLogo>],
            borders: 'none',
          },
          {
            items: [
              <HeaderUpdates
                ref={headerUpdatesRef}
                showNotification={showNotification}
                setShowNotification={setShowNotification}
                notificationsNumber={notificationsNumber}
              />,
            ],
            borders: 'none',
          },
        ]}
      />
    </>
  );
};
