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
  OuiPopoverTitle,
  OuiPopover,
  OuiSelect,
  OuiComboBox,
  OuiExpression,
  OuiTitle,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const [example1, setExample1] = useState({
    isOpen: false,
    value: (
      <Fragment>
        <p>.opensearch_dashboards_task_manager,</p>
        <p>opensearch_dashboards_sample_data_ecommerce</p>
      </Fragment>
    ),
  });

  const [example2, setExample2] = useState({
    isOpen: false,
    value: 'count()',
  });

  const options = [
    {
      label: '.opensearch_dashboards_task_manager',
    },
    {
      label: 'opensearch_dashboards_sample_data_ecommerce',
    },
    {
      label: '.opensearch_dashboards-event-log-8.0.0-000001',
    },
    {
      label: 'opensearch_dashboards_sample_data_flights',
    },
    {
      label: '.opensearch_dashboards-event-log-8.0.0',
    },
  ];

  const [selectedOptions, setSelected] = useState([options[0], options[1]]);

  const openExample1 = () => {
    setExample1({
      ...example1,
      isOpen: !example1.isOpen,
    });
  };

  const closeExample1 = () => {
    setExample1({
      ...example1,
      isOpen: false,
    });
  };

  const openExample2 = () => {
    setExample2({
      ...example2,
      isOpen: !example2.isOpen,
    });
  };

  const closeExample2 = () => {
    setExample2({
      ...example2,
      isOpen: false,
    });
  };

  const changeExample2 = (e) => {
    setExample2({
      value: e.target.value,
      isOpen: false,
    });
  };

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
    const indices = selectedOptions.map((s, index) => {
      return (
        <p key={index}>
          {s.label}
          {index < selectedOptions.length - 1 ? ',' : null}
        </p>
      );
    });
    setExample1({
      ...example1,
      value: indices,
    });
  };

  const renderPopover1 = () => (
    <div style={{ width: 300 }}>
      <OuiPopoverTitle>INDICES</OuiPopoverTitle>
      <OuiComboBox
        placeholder="Select one or more indices"
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        isClearable={true}
        data-test-subj="demoComboBox"
      />
    </div>
  );

  const renderPopover2 = () => (
    <div style={{ width: 150 }}>
      <OuiPopoverTitle>WHEN</OuiPopoverTitle>
      <OuiSelect
        compressed
        value={example2.value}
        onChange={changeExample2}
        options={[
          {
            value: 'count()',
            text: 'count()',
          },
          {
            value: 'sum()',
            text: 'sum()',
          },
          {
            value: 'min()',
            text: 'min()',
          },
          { value: 'max()', text: 'max()' },
        ]}
      />
    </div>
  );

  return (
    <div style={{ maxWidth: 500 }}>
      <OuiPopover
        id="columnsPopover1"
        button={
          <OuiExpression
            description="indices"
            display="columns"
            value={example1.value}
            isInvalid={
              selectedOptions && selectedOptions.length > 0 ? false : true
            }
            isActive={example1.isOpen}
            onClick={openExample1}
          />
        }
        isOpen={example1.isOpen}
        closePopover={closeExample1}
        display="block"
        panelPaddingSize="s"
        anchorPosition="downLeft">
        {renderPopover1()}
      </OuiPopover>

      <OuiPopover
        id="columnsPopover2"
        panelPaddingSize="s"
        button={
          <OuiExpression
            description="when"
            display="columns"
            value={example2.value}
            isActive={example2.isOpen}
            onClick={openExample2}
          />
        }
        isOpen={example2.isOpen}
        closePopover={closeExample2}
        display="block"
        anchorPosition="downLeft">
        {renderPopover2()}
      </OuiPopover>
      <OuiExpression
        display="columns"
        description="Except"
        value="opensearch_dashboards_sample_data_ky_counties"
      />
      <OuiSpacer />
      <OuiTitle size="xxs">
        <h3>Description width at 50px</h3>
      </OuiTitle>
      <OuiExpression
        description="join"
        display="columns"
        descriptionWidth={50}
        value="opensearch_dashboards_sample_data_ky_avl"
        onClick={() => {}}
      />
    </div>
  );
};
