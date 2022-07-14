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

import { OuiSpacer, OuiSteps, OuiButton } from '../../../../src/components';

export default () => {
  const [status, setStatus] = useState('incomplete');

  let completeButton;
  if (status !== 'complete') {
    completeButton = (
      <OuiButton onClick={() => setStatus('complete')}>
        You complete me
      </OuiButton>
    );
  } else {
    completeButton = (
      <OuiButton onClick={() => setStatus('incomplete')}>Reset</OuiButton>
    );
  }

  let warningButton;
  if (status !== 'warning') {
    warningButton = (
      <OuiButton color="warning" onClick={() => setStatus('warning')}>
        Uh oh!
      </OuiButton>
    );
  } else {
    warningButton = (
      <OuiButton color="warning" onClick={() => setStatus('incomplete')}>
        Reset
      </OuiButton>
    );
  }

  let dangerButton;
  if (status !== 'danger') {
    dangerButton = (
      <OuiButton color="danger" onClick={() => setStatus('danger')}>
        Something terrible
      </OuiButton>
    );
  } else {
    dangerButton = (
      <OuiButton color="danger" onClick={() => setStatus('incomplete')}>
        Reset
      </OuiButton>
    );
  }

  const firstSetOfSteps = [
    {
      title: 'Normal step',
      children: <p>Do this first</p>,
    },
    {
      title: 'Push the button to complete this final step',
      children: (
        <Fragment>
          <p>We are fancy buttons just waiting to be pushed!</p>
          <OuiSpacer />
          {completeButton} {warningButton} {dangerButton}
        </Fragment>
      ),
      status: status,
    },
  ];

  return (
    <div>
      <OuiSteps steps={firstSetOfSteps} />
    </div>
  );
};
