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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  cloneElement,
  Component,
  Children,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { ExclusiveUnion, CommonProps, keysOf } from '../../common';

import { get } from '../../../services/objects';

import { OuiFormHelpText } from '../form_help_text';
import { OuiFormErrorText } from '../form_error_text';
import { OuiFormLabel } from '../form_label';

import { htmlIdGenerator } from '../../../services/accessibility';

const displayToClassNameMap = {
  row: null,
  rowCompressed: 'ouiFormRow--compressed',
  columnCompressed: 'ouiFormRow--compressed ouiFormRow--horizontal',
  center: null,
  centerCompressed: 'ouiFormRow--compressed',
  columnCompressedSwitch:
    'ouiFormRow--compressed ouiFormRow--horizontal ouiFormRow--hasSwitch',
};

export const DISPLAYS = keysOf(displayToClassNameMap);

export type OuiFormRowDisplayKeys = keyof typeof displayToClassNameMap;

interface OuiFormRowState {
  isFocused: boolean;
  id: string;
}

type OuiFormRowCommonProps = CommonProps & {
  /**
   * When `rowCompressed`, just tightens up the spacing;
   * Set to `columnCompressed` if compressed
   * and horizontal layout is needed.
   * Set to `center` or `centerCompressed` to align non-input
   * content better with inline rows.
   * Set to `columnCompressedSwitch` if the form control being passed
   * as the child is a switch.
   */
  display?: OuiFormRowDisplayKeys;
  hasEmptyLabelSpace?: boolean;
  fullWidth?: boolean;
  /**
   * IDs of additional elements that should be part of children's `aria-describedby`
   */
  describedByIds?: string[];
  /**
   * Escape hatch to not render duplicate labels if the child also renders a label
   */
  hasChildLabel?: boolean;
  /**
   * ReactElement to render as this component's content
   */
  children: ReactElement;
  label?: ReactNode;
  /**
   * Adds an extra node to the right of the form label without
   * being contained inside the form label. Good for things
   * like documentation links.
   */
  labelAppend?: any;
  id?: string;
  isInvalid?: boolean;
  error?: ReactNode | ReactNode[];
  /**
   *  Adds a single node/string or an array of nodes/strings below the input
   */
  helpText?: ReactNode | ReactNode[];
};

type LabelProps = {
  labelType?: 'label';
} & OuiFormRowCommonProps &
  HTMLAttributes<HTMLDivElement>;

type LegendProps = {
  /**
   * Defaults to rendering a `<label>` but if passed `'legend'` for labelType,
   * will render both a `<legend>` and the surrounding container as a `<fieldset>`
   */
  labelType?: 'legend';
} & OuiFormRowCommonProps &
  HTMLAttributes<HTMLFieldSetElement>;

export type OuiFormRowProps = ExclusiveUnion<LabelProps, LegendProps>;

export class OuiFormRow extends Component<OuiFormRowProps, OuiFormRowState> {
  static defaultProps = {
    display: 'row',
    hasEmptyLabelSpace: false,
    fullWidth: false,
    describedByIds: [],
    labelType: 'label',
    hasChildLabel: true,
  };

  state: OuiFormRowState = {
    isFocused: false,
    id: this.props.id || htmlIdGenerator()(),
  };

  onFocus = (...args: any[]) => {
    // Doing this to allow onFocus to be called correctly from the child input element as this component overrides it
    const onChildFocus = get(this.props, 'children.props.onFocus');
    if (onChildFocus) {
      onChildFocus(...args);
    }

    this.setState(({ isFocused }) => {
      if (!isFocused) {
        return {
          isFocused: true,
        };
      } else {
        return null;
      }
    });
  };

  onBlur = (...args: any[]) => {
    // Doing this to allow onBlur to be called correctly from the child input element as this component overrides it
    const onChildBlur = get(this.props, 'children.props.onBlur');
    if (onChildBlur) {
      onChildBlur(...args);
    }

    this.setState({
      isFocused: false,
    });
  };

  render() {
    const {
      children,
      helpText,
      isInvalid,
      error,
      label,
      labelType,
      labelAppend,
      hasEmptyLabelSpace,
      fullWidth,
      className,
      describedByIds,
      display,
      hasChildLabel,
      id: propsId,
      ...rest
    } = this.props;

    const { id } = this.state;

    const classes = classNames(
      'ouiFormRow',
      {
        'ouiFormRow--hasEmptyLabelSpace': hasEmptyLabelSpace,
        'ouiFormRow--fullWidth': fullWidth,
      },
      displayToClassNameMap[display!], // Safe use of ! as default prop is 'row'
      className
    );

    let optionalHelpTexts;

    if (helpText) {
      const helpTexts = Array.isArray(helpText) ? helpText : [helpText];
      optionalHelpTexts = helpTexts.map((helpText, i) => {
        const key = typeof helpText === 'string' ? helpText : i;
        return (
          <OuiFormHelpText
            key={key}
            id={`${id}-help-${i}`}
            className="ouiFormRow__text">
            {helpText}
          </OuiFormHelpText>
        );
      });
    }

    let optionalErrors;

    if (error && isInvalid) {
      const errorTexts = Array.isArray(error) ? error : [error];
      optionalErrors = errorTexts.map((error, i) => {
        const key = typeof error === 'string' ? error : i;
        return (
          <OuiFormErrorText
            key={key}
            id={`${id}-error-${i}`}
            className="ouiFormRow__text">
            {error}
          </OuiFormErrorText>
        );
      });
    }

    let optionalLabel;
    const isLegend = label && labelType === 'legend' ? true : false;

    if (label || labelAppend) {
      let labelProps = {};
      if (isLegend) {
        labelProps = {
          type: labelType,
        };
      } else {
        labelProps = {
          htmlFor: hasChildLabel ? id : undefined,
          isFocused: this.state.isFocused,
          type: labelType,
        };
      }
      optionalLabel = (
        <div className="ouiFormRow__labelWrapper">
          <OuiFormLabel
            className="ouiFormRow__label"
            isInvalid={isInvalid}
            aria-invalid={isInvalid}
            {...labelProps}>
            {label}
          </OuiFormLabel>
          {labelAppend && ' '}
          {labelAppend}
        </div>
      );
    }

    const optionalProps: React.AriaAttributes = {};
    /**
     * Safe use of ! as default prop is []
     */
    const describingIds = [...describedByIds!];

    if (optionalHelpTexts) {
      optionalHelpTexts.forEach((optionalHelpText) =>
        describingIds.push(optionalHelpText.props.id)
      );
    }

    if (optionalErrors) {
      optionalErrors.forEach((error) => describingIds.push(error.props.id));
    }

    if (describingIds.length > 0) {
      optionalProps['aria-describedby'] = describingIds.join(' ');
    }

    const field = cloneElement(Children.only(children), {
      id,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      ...optionalProps,
    });

    const fieldWrapperClasses = classNames('ouiFormRow__fieldWrapper', {
      ouiFormRow__fieldWrapperDisplayOnly:
        /**
         * Safe use of ! as default prop is 'row'
         */
        display!.startsWith('center'),
    });

    const sharedProps = {
      className: classes,
      id: `${id}-row`,
    };

    const contents = (
      <React.Fragment>
        {optionalLabel}
        <div className={fieldWrapperClasses}>
          {field}
          {optionalErrors}
          {optionalHelpTexts}
        </div>
      </React.Fragment>
    );

    return labelType === 'legend' ? (
      <fieldset
        {...sharedProps}
        {...(rest as HTMLAttributes<HTMLFieldSetElement>)}>
        {contents}
      </fieldset>
    ) : (
      <div {...sharedProps} {...(rest as HTMLAttributes<HTMLDivElement>)}>
        {contents}
      </div>
    );
  }
}
