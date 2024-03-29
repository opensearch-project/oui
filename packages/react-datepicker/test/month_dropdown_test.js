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

import React from 'react';
import MonthDropdown from '../src/month_dropdown.jsx';
import MonthDropdownOptions from '../src/month_dropdown_options.jsx';
import { mount } from 'enzyme';
import {
  newDate,
  getMonthInLocale,
  getDefaultLocaleData,
} from '../src/date_utils';

const range = (start, end, step = 1) =>
  Array.from(
    { length: (end - start + step - 1) / step },
    (_, i) => i * step + start
  );

describe('MonthDropdown', () => {
  let monthDropdown;
  let handleChangeResult;
  const mockHandleChange = function(changeInput) {
    handleChangeResult = changeInput;
  };
  let sandbox;

  function getMonthDropdown(overrideProps) {
    const dateFormatCalendar = 'MMMM YYYY';
    return mount(
      <MonthDropdown
        dropdownMode="scroll"
        month={11}
        dateFormat={dateFormatCalendar}
        onChange={mockHandleChange}
        {...overrideProps}
      />
    );
  }

  beforeEach(() => {
    handleChangeResult = null;
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('scroll mode', () => {
    beforeEach(function() {
      monthDropdown = getMonthDropdown();
    });

    it('shows the selected yonth in the initial view', () => {
      expect(monthDropdown.text()).to.contain('December');
    });

    it('opens a list when read view is clicked', () => {
      monthDropdown
        .find('.react-datepicker__month-read-view')
        .simulate('click');
      var optionsView = monthDropdown.find(MonthDropdownOptions);
      expect(optionsView).to.exist;
    });

    it('closes the dropdown when a month is clicked', () => {
      monthDropdown
        .find('.react-datepicker__month-read-view')
        .simulate('click');
      monthDropdown
        .find('.react-datepicker__month-option')
        .at(1)
        .simulate('click');
      expect(monthDropdown.find(MonthDropdownOptions)).to.have.length(0);
    });

    it('closes the dropdown if outside is clicked', () => {
      const monthNames = range(0, 12).map(M =>
        getMonthInLocale(getDefaultLocaleData(), newDate({ M }))
      );
      const onCancelSpy = sandbox.spy();
      const monthDropdownOptionsInstance = mount(
        <MonthDropdownOptions
          onCancel={onCancelSpy}
          onChange={sandbox.spy()}
          month={11}
          monthNames={monthNames}
        />
      ).instance();
      monthDropdownOptionsInstance.handleClickOutside();
      expect(onCancelSpy.calledOnce).to.be.true;
    });

    it('does not call the supplied onChange function when the same month is clicked', () => {
      monthDropdown
        .find('.react-datepicker__month-read-view')
        .simulate('click');
      monthDropdown
        .find('.react-datepicker__month-option')
        .at(11)
        .simulate('click');
      expect(handleChangeResult).to.be.null;
    });

    it('calls the supplied onChange function when a different month is clicked', () => {
      monthDropdown
        .find('.react-datepicker__month-read-view')
        .simulate('click');
      monthDropdown
        .find('.react-datepicker__month-option')
        .at(2)
        .simulate('click');
      expect(handleChangeResult).to.eq(2);
    });

    it('should use dateFormat property to determine nominative or genitive display of month names', () => {
      let dropdownDateFormat = getMonthDropdown({ dateFormat: 'DD/MM/YYYY' });
      expect(dropdownDateFormat.text()).to.contain('December');

      dropdownDateFormat = getMonthDropdown({ locale: 'el' });
      expect(dropdownDateFormat.text()).to.contain('Δεκέμβριος');
      dropdownDateFormat = getMonthDropdown({
        locale: 'el',
        showMonthDropwdown: true,
      });
      expect(dropdownDateFormat.text()).to.contain('Δεκέμβριος');

      dropdownDateFormat = getMonthDropdown({
        dateFormat: 'DMMMMYYYY',
        locale: 'el',
      });
      expect(dropdownDateFormat.text()).to.contain('Δεκεμβρίου');
      dropdownDateFormat = getMonthDropdown({
        dateFormat: 'DMMMMYYYY',
        locale: 'el',
        showMonthDropwdown: true,
      });
      expect(dropdownDateFormat.text()).to.contain('Δεκεμβρίου');
    });
  });

  describe('select mode', () => {
    it('renders a select', () => {
      monthDropdown = getMonthDropdown({ dropdownMode: 'select' });
      var select = monthDropdown.find('.react-datepicker__month-select');
      expect(select).to.have.length(1);
      expect(select.prop('value')).to.eq(11);
      var options = select.find('option');
      expect(options.map(o => o.prop('value'))).to.eql(range(0, 12));
    });

    it('renders month options with default locale', () => {
      monthDropdown = getMonthDropdown({ dropdownMode: 'select' });
      var options = monthDropdown.find('option');
      expect(options.map(o => o.text())).to.eql([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]);
    });
    // Short Month Names
    it('renders month options with short name and default locale', () => {
      monthDropdown = getMonthDropdown({
        dropdownMode: 'select',
        useShortMonthInDropdown: true,
      });
      var options = monthDropdown.find('option');
      expect(options.map(o => o.text())).to.eql([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]);
    });

    // Failing on Travis CI.
    it('renders month options with specified locale', () => {
      monthDropdown = getMonthDropdown({
        dropdownMode: 'select',
        locale: 'zh-cn',
      });
      var options = monthDropdown.find('option');
      expect(options.map(o => o.text())).to.eql([
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ]);
    });

    it('does not call the supplied onChange function when the same month is clicked', () => {
      monthDropdown = getMonthDropdown({ dropdownMode: 'select', month: 11 });
      var select = monthDropdown.find('.react-datepicker__month-select');
      select.simulate('change', { target: { value: 11 } });
      expect(handleChangeResult).to.not.exist;
    });

    it('calls the supplied onChange function when a different month is clicked', () => {
      monthDropdown = getMonthDropdown({ dropdownMode: 'select', month: 11 });
      var select = monthDropdown.find('.react-datepicker__month-select');
      select.simulate('change', { target: { value: 9 } });
      expect(handleChangeResult).to.equal(9);
    });
  });
});
