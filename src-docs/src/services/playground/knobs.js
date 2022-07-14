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

import React, { useState, useEffect } from 'react';
import { assertUnreachable, PropTypes } from 'react-view';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';
import {
  OuiTitle,
  OuiCodeBlock,
  OuiSpacer,
  OuiSwitch,
  OuiRadioGroup,
  OuiFieldText,
  OuiCode,
  OuiSelect,
  OuiFieldNumber,
  OuiToolTip,
  OuiTable,
  OuiTableBody,
  OuiTableHeader,
  OuiTableHeaderCell,
  OuiTableRow,
  OuiTableRowCell,
  OuiTextColor,
  OuiTextArea,
  OuiFormRow,
  OuiLink,
  OuiText,
  OuiPanel,
} from '../../../../src/components/';

export const markup = (text) => {
  const regex = /(\B#[a-zA-Z]+)|(`[^`]+`)/g;
  return text.split('\n').map((token) => {
    const values = token.split(regex).map((token, index) => {
      if (!token) {
        return '';
      }
      if (token.startsWith('#')) {
        const id = token.substring(1);
        const onClick = () => {
          document.getElementById(id).scrollIntoView();
        };
        return (
          <OuiLink key={`markup-${index}`} onClick={onClick}>
            {id}
          </OuiLink>
        );
      }
      if (token.startsWith('`')) {
        const code = token.substring(1, token.length - 1);
        return <OuiCode key={`markup-${index}`}>{code}</OuiCode>;
      }
      if (token.includes('\n')) {
        return token
          .split('\n')
          .map((item) => [item, <br key={`markup-${index}`} />]);
      }
      return token;
    });
    return [...values, <br key="lineBreak" />];
  });
};

export const humanizeType = (type) => {
  if (!type) {
    return '';
  }

  let humanizedType;

  switch (type.name) {
    case 'enum':
      if (Array.isArray(type.value)) {
        humanizedType = type.value.map(({ value }) => value).join(', ');
        break;
      }
      humanizedType = type.value;
      break;

    case 'union':
      if (Array.isArray(type.value)) {
        const unionValues = type.value.map(({ name }) => name);
        unionValues[unionValues.length - 1] = `or ${
          unionValues[unionValues.length - 1]
        }`;

        if (unionValues.length > 2) {
          humanizedType = unionValues.join(', ');
        } else {
          humanizedType = unionValues.join(' ');
        }
        break;
      }
      humanizedType = type.value;
      break;

    default:
      humanizedType = type.name;
  }

  return humanizedType;
};

const getTooltip = (description, type, name) => (
  <span>
    <p>
      <b>{name}</b>: <i>{type}</i>
    </p>
    <p>{description}</p>
  </span>
);

const Label = ({ children, tooltip }) => {
  return (
    <OuiToolTip position="top" content={tooltip}>
      <>
        <span>{children}</span>
        <OuiSpacer size="s" />
      </>
    </OuiToolTip>
  );
};

const Knob = ({
  name,
  error: errorMsg,
  type,
  defaultValue,
  val,
  set,
  options = {},
  description,
  placeholder,
  custom,
  state,
  hidden,
  helpText,
}) => {
  const [error, setError] = useState(errorMsg);

  useEffect(() => {
    if (custom && custom.checkDep) {
      setError(custom.checkDep(val, state));
    }
  }, [state, val, custom]);

  let knobProps = {};
  switch (type) {
    case PropTypes.Ref:
      return (
        <>
          <Label tooltip={getTooltip(description, type, name)}>{name}</Label>
          <a
            href="https://reactjs.org/docs/refs-and-the-dom.html"
            target="_blank"
            style={{
              fontSize: '14px',
              display: 'block',
            }}>
            React Ref documentation
          </a>
          {error && <div>error {error}</div>}
        </>
      );

    case PropTypes.Number:
      return (
        <OuiFormRow
          isInvalid={error && error.length > 0}
          error={error}
          helpText={helpText}
          fullWidth>
          <OuiFieldNumber
            placeholder={placeholder}
            value={val ? val : undefined}
            onChange={(e) => set(e.target.value)}
            aria-label={description}
            compressed
            fullWidth
            isInvalid={error && error.length > 0}
          />
        </OuiFormRow>
      );

    case PropTypes.String:
    case PropTypes.Date:
      if (custom && custom.validator) {
        knobProps = {};
        knobProps.onChange = (e) => {
          const value = e.target.value;
          if (custom.validator(value)) set(value);
          else set(undefined);
        };
      } else if (custom && custom.sanitize) {
        knobProps = {};
        knobProps.value = val;
        knobProps.onChange = (e) => {
          const value = e.target.value;
          set(custom.sanitize(value));
        };
      } else {
        knobProps = {};
        knobProps.value = val;
        knobProps.onChange = (e) => {
          const value = e.target.value;
          set(value);
        };
      }

      return (
        <OuiFormRow
          isInvalid={error && error.length > 0}
          error={error}
          fullWidth
          helpText={
            <>
              {helpText}
              {custom && custom.helpText && (
                <>
                  <br />
                  {custom.helpText}
                </>
              )}
            </>
          }>
          <OuiFieldText
            aria-label={name}
            placeholder={placeholder}
            isInvalid={error && error.length > 0}
            compressed
            fullWidth
            {...knobProps}
          />
        </OuiFormRow>
      );

    case PropTypes.Boolean:
      return (
        <OuiFormRow
          fullWidth
          helpText={helpText}
          isInvalid={error && error.length > 0}
          error={error}>
          <OuiSwitch
            aria-label={name}
            id={name}
            label=""
            checked={val}
            onChange={(e) => {
              set(e.target.checked);
            }}
            compressed
          />
        </OuiFormRow>
      );

    case PropTypes.Enum:
      const optionsKeys = Object.keys(options);
      const numberOfOptions = optionsKeys.length;

      let valueKey = val || defaultValue;

      // When would numberOfOptions ever be less than 1?
      if (numberOfOptions < 1) {
        if (valueKey && !valueKey.includes('__')) {
          valueKey = `${valueKey}__${name}`;
        }
        const flattenedOptions = optionsKeys.map((key) => ({
          id: `${key}__${name}`,
          label: options[key],
        }));

        return (
          <>
            <OuiRadioGroup
              options={flattenedOptions}
              idSelected={valueKey}
              onChange={(id) => {
                let val = id;
                if (val.includes('__')) val = val.split('__')[0];
                set(val);
              }}
              name={`Select ${name}`}
            />
            {error && <div>error {error}</div>}
          </>
        );
      } else {
        const flattenedOptions = optionsKeys.map((key) => ({
          value: key,
          text: options[key],
        }));

        return (
          <OuiFormRow
            isInvalid={error && error.length > 0}
            helpText={helpText}
            error={error}
            fullWidth>
            <OuiSelect
              id={name}
              options={flattenedOptions}
              value={valueKey || defaultValue}
              onChange={(e) => {
                set(e.target.value);
              }}
              aria-label={`Select ${name}`}
              isInvalid={error && error.length > 0}
              compressed
              fullWidth
              hasNoInitialSelection={!valueKey && !defaultValue}
            />
          </OuiFormRow>
        );
      }

    case PropTypes.ReactNode:
      if (!hidden) {
        return (
          <OuiTextArea
            compressed
            placeholder={placeholder}
            value={val}
            onChange={(e) => {
              set(e.target.value);
            }}
          />
        );
      } else return helpText || null;

    case PropTypes.Custom:
      if (custom && custom.use) {
        switch (custom.use) {
          case 'switch':
            return (
              <>
                <OuiSwitch
                  aria-label={name}
                  id={name}
                  label={custom.label || ''}
                  checked={typeof val !== 'undefined' && Boolean(val)}
                  onChange={(e) => {
                    const value = e.target.checked;

                    set(value ? custom.value ?? e.target.checked : undefined);
                  }}
                  compressed
                />
              </>
            );
        }
      }

    case PropTypes.Function:
    case PropTypes.Array:
    case PropTypes.Object:
      return helpText || null;
    default:
      return helpText || assertUnreachable();
  }
};

const KnobColumn = ({ state, knobNames, error, set, isPlayground }) => {
  return knobNames.map((name, idx) => {
    const codeBlockProps = {
      className: 'guideSection__tableCodeBlock',
      paddingSize: 'none',
      language: 'ts',
    };

    /**
     * TS Type
     */
    let humanizedType;

    if (
      state[name].custom &&
      state[name].custom.origin &&
      state[name].custom.origin.type
    )
      humanizedType = humanizeType(state[name].custom.origin.type);

    let typeMarkup;

    if (humanizedType) {
      typeMarkup = humanizedType && (
        <OuiCodeBlock {...codeBlockProps}>{humanizedType}</OuiCodeBlock>
      );

      const functionMatches = [
        ...humanizedType.matchAll(/\([^=]*\) =>\s\w*\)*/g),
      ];

      const types = humanizedType.split(/\([^=]*\) =>\s\w*\)*/);

      if (functionMatches.length > 0) {
        let elements = '';
        let j = 0;
        for (let i = 0; i < types.length; i++) {
          if (functionMatches[j]) {
            elements =
              `${elements}` +
              `${types[i]}` +
              '\n' +
              `${functionMatches[j][0]}` +
              '\n';
            j++;
          } else {
            elements = `${elements}` + `${types[i]}` + '\n';
          }
        }
        typeMarkup = (
          <OuiCodeBlock {...codeBlockProps}>{elements}</OuiCodeBlock>
        );
      }
    }

    /**
     * Prop name
     */
    let humanizedName = <strong className="oui-textBreakNormal">{name}</strong>;

    if (
      state[name].custom &&
      state[name].custom.origin &&
      state[name].custom.origin.required
    ) {
      humanizedName = (
        <>
          {humanizedName} <OuiTextColor color="danger">(required)</OuiTextColor>
        </>
      );
    }

    /**
     * Default value
     */
    let defaultValueMarkup;
    if (
      // !isPlayground &&
      state[name].custom &&
      state[name].custom.origin &&
      state[name].custom.origin.defaultValue
    ) {
      const defaultValue = state[name].custom.origin.defaultValue;
      defaultValueMarkup = (
        <OuiText size="xs">
          {isPlayground && 'Default: '}
          <OuiCode>{defaultValue.value}</OuiCode>
          {defaultValue.comment && (
            <>
              <br />({defaultValue.comment})
            </>
          )}
        </OuiText>
      );
    }

    return (
      <OuiTableRow key={name}>
        <OuiTableRowCell
          key={`prop__${name}-${idx}`}
          header="Prop"
          textOnly={false}
          mobileOptions={{
            header: false,
            fullWidth: true,
          }}>
          <div>
            <OuiTitle size="xxs">
              <span>{humanizedName}</span>
            </OuiTitle>
            {state[name].description && (
              <>
                <OuiSpacer size="xs" />
                <OuiText color="subdued" size="xs">
                  <p>{markup(state[name].description)}</p>
                </OuiText>
              </>
            )}
          </div>
        </OuiTableRowCell>
        <OuiTableRowCell
          key={`type__${name}-${idx}`}
          header="Type"
          textOnly={false}>
          <div>{typeMarkup}</div>
        </OuiTableRowCell>
        <OuiTableRowCell
          key={`modify__${name}-${idx}`}
          header={isPlayground ? 'Modify' : 'Default value'}
          textOnly={false}
          className={isPlayground ? 'playgroundKnobs__rowCell' : undefined}>
          {isPlayground ? (
            <Knob
              key={name}
              name={name}
              error={error.where === name ? error.msg : null}
              description={state[name].description}
              type={state[name].type}
              val={state[name].value}
              hidden={state[name].hidden}
              options={state[name].options}
              placeholder={state[name].placeholder}
              set={(value) => set(value, name)}
              enumName={state[name].enumName}
              defaultValue={state[name].defaultValue}
              custom={state[name] && state[name].custom}
              state={state}
              orgSet={set}
              helpText={defaultValueMarkup}
            />
          ) : (
            defaultValueMarkup
          )}
        </OuiTableRowCell>
      </OuiTableRow>
    );
  });
};

const Knobs = ({ state, set, error, isPlayground = true }) => {
  const isMobile = useIsWithinBreakpoints(['xs', 's']);
  const knobNames = Object.keys(state);

  const columns = [
    {
      field: 'prop',
      name: 'Prop',
    },
    {
      field: 'type',
      name: 'Type',
    },
  ];

  columns.push({
    field: isPlayground ? 'modify' : 'default',
    name: isPlayground ? 'Modify' : 'Default value',
    width: 200,
  });

  return (
    <OuiPanel
      color="transparent"
      paddingSize={isMobile ? 's' : 'none'}
      hasBorder={false}
      hasShadow={false}>
      <OuiTable style={{ background: 'transparent' }}>
        <OuiTableHeader>
          {columns.map(({ name, width }, id) => {
            return (
              <OuiTableHeaderCell width={width} key={id}>
                {name}
              </OuiTableHeaderCell>
            );
          })}
        </OuiTableHeader>

        <OuiTableBody>
          <KnobColumn
            isPlayground={isPlayground}
            state={state}
            knobNames={knobNames}
            set={set}
            error={error}
          />
        </OuiTableBody>
      </OuiTable>
    </OuiPanel>
  );
};

export default Knobs;
