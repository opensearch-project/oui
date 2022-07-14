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

import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
  iconValidator,
} from '../../services/playground';
import {
  OuiFieldText,
  OuiFieldSearch,
  OuiFieldNumber,
  OuiFieldPassword,
  OuiTextArea,
  OuiCheckbox,
  OuiRadio,
  OuiSwitch,
} from '../../../../src/components/';
import { PropTypes } from 'react-view';

export const FieldTextConfig = () => {
  const docgenInfo = Array.isArray(OuiFieldText.__docgenInfo)
    ? OuiFieldText.__docgenInfo[0]
    : OuiFieldText.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };

  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.disabled = {
    type: PropTypes.Boolean,
  };

  propsToUse.readOnly = {
    type: PropTypes.Boolean,
  };

  propsToUse.placeholder = {
    type: PropTypes.String,
  };

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };

  propsToUse.icon = iconValidator(propsToUse.icon);

  return {
    config: {
      componentName: 'OuiFieldText',
      props: propsToUse,
      scope: {
        OuiFieldText,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiFieldText'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const FieldSearchConfig = () => {
  const docgenInfo = Array.isArray(OuiFieldSearch.__docgenInfo)
    ? OuiFieldSearch.__docgenInfo[0]
    : OuiFieldSearch.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };

  propsToUse.disabled = {
    type: PropTypes.Boolean,
  };

  propsToUse.readOnly = {
    type: PropTypes.Boolean,
  };

  propsToUse.placeholder = {
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'OuiFieldSearch',
      props: propsToUse,
      scope: {
        OuiFieldSearch,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiFieldSearch'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const FieldNumberConfig = () => {
  const docgenInfo = Array.isArray(OuiFieldNumber.__docgenInfo)
    ? OuiFieldNumber.__docgenInfo[0]
    : OuiFieldNumber.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.icon = iconValidator(propsToUse.icon);

  propsToUse.disabled = {
    type: PropTypes.Boolean,
  };

  propsToUse.readOnly = {
    type: PropTypes.Boolean,
  };

  propsToUse.placeholder = {
    type: PropTypes.String,
  };

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.Number,
  };
  propsToUse.step = {
    ...propsToUse.step,
    type: PropTypes.Number,
  };

  return {
    config: {
      componentName: 'OuiFieldNumber',
      props: propsToUse,
      scope: {
        OuiFieldNumber,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiFieldNumber'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const FieldPasswordConfig = () => {
  const docgenInfo = Array.isArray(OuiFieldPassword.__docgenInfo)
    ? OuiFieldPassword.__docgenInfo[0]
    : OuiFieldPassword.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };

  propsToUse.type = {
    ...propsToUse.type,
    value: 'password',
    defaultValue: 'password',
  };

  propsToUse.disabled = {
    type: PropTypes.Boolean,
  };

  propsToUse.readOnly = {
    type: PropTypes.Boolean,
  };

  propsToUse.placeholder = {
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'OuiFieldPassword',
      props: propsToUse,
      scope: {
        OuiFieldPassword,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiFieldPassword'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const TextAreaConfig = () => {
  const docgenInfo = Array.isArray(OuiTextArea.__docgenInfo)
    ? OuiTextArea.__docgenInfo[0]
    : OuiTextArea.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };
  propsToUse.placeholder = {
    ...propsToUse.placeholder,
    type: PropTypes.String,
  };

  propsToUse.resize = {
    ...propsToUse.resize,
    defaultValue: 'vertical',
  };

  propsToUse.disabled = {
    type: PropTypes.Boolean,
  };

  propsToUse.readOnly = {
    type: PropTypes.Boolean,
  };

  propsToUse.placeholder = {
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'OuiTextArea',
      props: propsToUse,
      scope: {
        OuiTextArea,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiTextArea'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const CheckboxConfig = () => {
  const docgenInfo = Array.isArray(OuiCheckbox.__docgenInfo)
    ? OuiCheckbox.__docgenInfo[0]
    : OuiCheckbox.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.id = {
    ...propsToUse.id,
    value: 'Playground__checkbox',
  };

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'OuiCheckbox',
      props: propsToUse,
      scope: {
        OuiCheckbox,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiCheckbox'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const RadioConfig = () => {
  const docgenInfo = Array.isArray(OuiRadio.__docgenInfo)
    ? OuiRadio.__docgenInfo[0]
    : OuiRadio.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.id = {
    ...propsToUse.id,
    type: PropTypes.String,
    value: 'Playground__radio',
  };

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'OuiRadio',
      props: propsToUse,
      scope: {
        OuiRadio,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiRadio'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const SwitchConfig = () => {
  const docgenInfo = Array.isArray(OuiSwitch.__docgenInfo)
    ? OuiSwitch.__docgenInfo[0]
    : OuiSwitch.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.checked = {
    ...propsToUse.checked,
    value: true,
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'OuiSwitch',
      props: propsToUse,
      scope: {
        OuiSwitch,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiSwitch'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};
