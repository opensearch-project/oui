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

import React, { Fragment } from 'react';

import {
  OuiFormControlLayoutDelimited,
  OuiSpacer,
  OuiFormLabel,
  OuiIcon,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <OuiFormControlLayoutDelimited
      startControl={
        <input
          type="number"
          placeholder="0"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <OuiSpacer size="m" />
    <OuiFormControlLayoutDelimited
      append={<OuiFormLabel>px</OuiFormLabel>}
      startControl={
        <input
          type="number"
          placeholder="0"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <OuiSpacer size="m" />
    <OuiFormControlLayoutDelimited
      icon="vector"
      startControl={
        <input
          type="number"
          placeholder="0"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <OuiSpacer size="m" />
    <OuiFormControlLayoutDelimited
      clear={{ onClick: () => {} }}
      isLoading
      startControl={
        <input
          type="number"
          placeholder="0"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <OuiSpacer size="m" />
    <OuiFormControlLayoutDelimited
      fullWidth
      startControl={
        <input
          type="number"
          placeholder="0"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <OuiSpacer size="m" />
    <OuiFormControlLayoutDelimited
      isLoading
      startControl={
        <input
          type="number"
          placeholder="0"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <OuiSpacer size="m" />
    <OuiFormControlLayoutDelimited
      compressed
      startControl={
        <input
          type="number"
          placeholder="0"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <OuiSpacer size="m" />

    <OuiFormControlLayoutDelimited
      prepend={<OuiFormLabel>Add</OuiFormLabel>}
      startControl={
        <input
          type="number"
          placeholder="0"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      delimiter="+"
      endControl={
        <input
          type="number"
          placeholder="100"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <OuiSpacer size="m" />

    <OuiFormControlLayoutDelimited
      prepend={<OuiFormLabel>Merge</OuiFormLabel>}
      startControl={
        <input
          type="number"
          placeholder="0"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      delimiter={<OuiIcon type="merge" />}
      endControl={
        <input
          type="number"
          placeholder="100"
          className="ouiFieldNumber"
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />

    <OuiSpacer size="m" />

    <OuiFormControlLayoutDelimited
      readOnly
      prepend={<OuiFormLabel>Read only</OuiFormLabel>}
      startControl={
        <input
          type="number"
          placeholder="0"
          className="ouiFieldNumber"
          readOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      endControl={
        <input
          type="number"
          placeholder="100"
          className="ouiFieldNumber"
          readOnly
          aria-label="Use aria labels when no actual label is in use"
        />
      }
    />
  </Fragment>
);
