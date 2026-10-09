/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { OuiDataGrid } from './';

const renderGrid = () =>
  render(
    <OuiDataGrid
      aria-label="test grid"
      columns={[{ id: 'A' }]}
      columnVisibility={{ visibleColumns: ['A'], setVisibleColumns: () => {} }}
      rowCount={1}
      renderCellValue={({ rowIndex }) => `value ${rowIndex}`}
    />
  );

const getCell = (container: HTMLElement) =>
  container.querySelector('[data-test-subj="dataGridRowCell"]') as HTMLElement;

const isPopoverOpen = () =>
  document.querySelector('.ouiDataGridRowCell__popover') !== null;

const openPopover = (container: HTMLElement) => {
  fireEvent.keyDown(getCell(container), { key: 'Enter' });
  expect(isPopoverOpen()).toBe(true);
};

describe('OuiDataGridCell IME composition', () => {
  it('does not open the expansion popover on Enter while composing', async () => {
    const { container } = renderGrid();
    const cell = getCell(container);

    fireEvent.keyDown(cell, { key: 'Enter', isComposing: true });
    await act(async () => {});
    expect(isPopoverOpen()).toBe(false);

    fireEvent.keyDown(cell, { key: 'Enter' });
    await act(async () => {});
    expect(isPopoverOpen()).toBe(true);
  });

  it('keeps the expansion popover open on Escape while composing', async () => {
    const { container } = renderGrid();
    openPopover(container);
    const panel = document.querySelector(
      '.ouiDataGridRowCell__popover'
    ) as HTMLElement;

    fireEvent.keyDown(panel, { key: 'Escape', isComposing: true });
    await act(async () => {});
    expect(isPopoverOpen()).toBe(true);

    fireEvent.keyDown(panel, { key: 'Escape' });
    await act(async () => {});
    expect(isPopoverOpen()).toBe(false);
  });
});
