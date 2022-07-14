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
import { DisplayToggles } from './display_toggles';

import {
  OuiFilePicker,
  OuiFlexGroup,
  OuiFlexItem,
  OuiText,
  OuiSpacer,
  OuiSwitch,
} from '../../../../src/components';

export default () => {
  const [files, setFiles] = useState({});
  const [large, setLarge] = useState(true);

  const onChange = (files) => {
    setFiles(files);
  };

  const renderFiles = () => {
    if (files.length > 0) {
      return (
        <ul>
          {Object.keys(files).map((item, i) => (
            <li key={i}>
              <strong>{files[item].name}</strong> ({files[item].size} bytes)
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <p>Add some files to see a demo of retrieving from the FileList</p>
      );
    }
  };

  return (
    <Fragment>
      <OuiFlexGroup>
        <OuiFlexItem grow={2}>
          {/* DisplayToggles wrapper for Docs only */}
          <DisplayToggles
            canReadOnly={false}
            extras={[
              <OuiSwitch
                compressed
                label={'large'}
                checked={large}
                onChange={(e) => {
                  setLarge(e.target.checked);
                }}
              />,
            ]}>
            <OuiFilePicker
              id="asdf2"
              multiple
              initialPromptText="Select or drag and drop multiple files"
              onChange={(files) => {
                onChange(files);
              }}
              display={large ? 'large' : 'default'}
              aria-label="Use aria labels when no actual label is in use"
            />
          </DisplayToggles>
          <OuiSpacer />
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiText>
            <h3>Files attached</h3>
            {renderFiles()}
          </OuiText>
        </OuiFlexItem>
      </OuiFlexGroup>
    </Fragment>
  );
};
