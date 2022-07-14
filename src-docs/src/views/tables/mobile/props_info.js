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

export const propsInfo = {
  mobileOptions: {
    __docgenInfo: {
      _ouiObjectType: 'type',
      props: {
        show: {
          description: 'If false, will not render the cell at all for mobile',
          required: false,
          type: { name: 'bool' },
          defaultValue: { value: 'true' },
        },
        only: {
          description:
            'Only show for mobile? If true, will not render the column at all for desktop',
          required: false,
          type: { name: 'bool' },
        },
        render: {
          description: 'Custom render/children if different from desktop',
          required: false,
          type: { name: 'node' },
        },
        header: {
          description:
            "The column's header for use in mobile view (automatically passed down when using `OuiBasicTable`). " +
            'Or pass `false` to not show a header at all.',
          required: false,
          type: { name: 'node | bool' },
        },
        enlarge: {
          description: 'Increase text size compared to rest of cells',
          required: false,
          type: { name: 'bool' },
        },
        fullWidth: {
          description:
            'Allocates 100% of the width of the container in mobile view (typically cells are contained to 50%)',
          required: false,
          type: { name: 'bool' },
        },
        width: {
          description:
            'Applies the value to the width of the cell in mobile view (typically 50%)',
          required: false,
          type: { name: 'string' },
        },
      },
    },
  },
};
