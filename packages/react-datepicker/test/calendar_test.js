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

import React from "react";
import Calendar from "../src/calendar";
import Month from "../src/month";
import Day from "../src/day";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import YearDropdown from "../src/year_dropdown";
import MonthDropdown from "../src/month_dropdown";
import MonthYearDropdown from "../src/month_year_dropdown";
import DatePicker from "../src/index.jsx";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import * as utils from "../src/date_utils";

// TODO Possibly rename
const DATE_FORMAT = "MM/DD/YYYY";

describe("Calendar", function() {
  const dateFormat = "MMMM YYYY";

  function getCalendar(extraProps) {
    return shallow(
      <Calendar
        dateFormat={dateFormat}
        onSelect={() => {}}
        onClickOutside={() => {}}
        hideCalendar={() => {}}
        dropdownMode="scroll"
        {...extraProps}
      />
    );
  }

  it("should start with the current date in view if no date range", function() {
    const now = utils.newDate();
    const calendar = getCalendar();
    assert(utils.isSameDay(calendar.state().date, now));
  });

  it("should start with the today date with specified time zone", function() {
    let utcOffset = 12;
    let calendar = getCalendar({ utcOffset });
    assert(
      utils.isSameDay(calendar.state().date, utils.newDateWithOffset(utcOffset))
    );

    // using string offsets
    utcOffset = "+12:00";
    calendar = getCalendar({ utcOffset });
    assert(
      utils.isSameDay(calendar.state().date, utils.newDateWithOffset(utcOffset))
    );
  });

  it("should start with the selected date in view if provided", function() {
    const selected = utils.addYears(utils.newDate(), 1);
    const calendar = getCalendar({ selected });
    assert(utils.isSameDay(calendar.state().date, selected));
  });

  it("should start with the pre-selected date in view if provided", function() {
    const preSelected = utils.addYears(utils.newDate(), 2);
    const selected = utils.addYears(utils.newDate(), 1);
    const calendar = getCalendar({ preSelected, selected });
    assert(utils.isSameDay(calendar.state().date, selected));
  });

  it("should start with the current date in view if in date range", function() {
    const now = utils.newDate();
    const minDate = utils.subtractYears(utils.cloneDate(now), 1);
    const maxDate = utils.addYears(utils.cloneDate(now), 1);
    const calendar = getCalendar({ minDate, maxDate });
    assert(utils.isSameDay(calendar.state().date, now));
  });

  it("should start with the min date in view if after the current date", function() {
    const minDate = utils.addYears(utils.newDate(), 1);
    const calendar = getCalendar({ minDate });
    assert(utils.isSameDay(calendar.state().date, minDate));
  });

  it("should start with the min include date in view if after the current date", function() {
    const minDate = utils.addYears(utils.newDate(), 1);
    const calendar = getCalendar({ includeDates: [minDate] });
    assert(utils.isSameDay(calendar.state().date, minDate));
  });

  it("should start with the max date in view if before the current date", function() {
    const maxDate = utils.subtractYears(utils.newDate(), 1);
    const calendar = getCalendar({ maxDate });
    assert(utils.isSameDay(calendar.state().date, maxDate));
  });

  it("should start with the max include date in view if before the current date", function() {
    const maxDate = utils.subtractYears(utils.newDate(), 1);
    const calendar = getCalendar({ includeDates: [maxDate] });
    assert(utils.isSameDay(calendar.state().date, maxDate));
  });

  it("should start with the open to date in view if given and no selected/min/max dates given", function() {
    const openToDate = utils.parseDate("09/28/1993", {
      dateFormat: DATE_FORMAT
    });
    const calendar = getCalendar({ openToDate });
    assert(utils.isSameDay(calendar.state().date, openToDate));
  });

  it("should start with the open to date in view if given and after a min date", function() {
    const openToDate = utils.parseDate("09/28/1993", {
      dateFormat: DATE_FORMAT
    });
    const minDate = utils.parseDate("01/01/1993", { dateFormat: DATE_FORMAT });
    const calendar = getCalendar({ openToDate, minDate });
    assert(utils.isSameDay(calendar.state().date, openToDate));
  });

  it("should start with the open to date in view if given and before a max date", function() {
    const openToDate = utils.parseDate("09/28/1993", {
      dateFormat: DATE_FORMAT
    });
    const maxDate = utils.parseDate("12/31/1993", { dateFormat: DATE_FORMAT });
    const calendar = getCalendar({ openToDate, maxDate });
    assert(utils.isSameDay(calendar.state().date, openToDate));
  });

  it("should start with the open to date in view if given and in range of the min/max dates", function() {
    const openToDate = utils.parseDate("09/28/1993", {
      dateFormat: DATE_FORMAT
    });
    const minDate = utils.parseDate("01/01/1993", { dateFormat: DATE_FORMAT });
    const maxDate = utils.parseDate("12/31/1993", { dateFormat: DATE_FORMAT });
    const calendar = getCalendar({ openToDate, minDate, maxDate });
    assert(utils.isSameDay(calendar.state().date, openToDate));
  });

  it("should open on openToDate date rather than selected date when both are specified", function() {
    var openToDate = utils.parseDate("09/28/1993", { dateFormat: DATE_FORMAT });
    var selected = utils.parseDate("09/28/1995", { dateFormat: DATE_FORMAT });
    var calendar = getCalendar({ openToDate, selected });
    assert(utils.isSameDay(calendar.state().date, openToDate));
  });

  it("should trigger date change when openToDate prop is set after calcInitialState()", () => {
    const openToDate = utils.parseDate("09/28/1993", {
      dateFormat: DATE_FORMAT
    });
    const oneMonthFromOpenToDate = utils.parseDate("10/28/1993", {
      dateFormat: DATE_FORMAT
    });
    const calendar = getCalendar({ openToDate });

    assert(utils.isSameDay(calendar.state().date, openToDate));
    calendar.setProps({ openToDate: oneMonthFromOpenToDate });
    assert(utils.isSameDay(calendar.state().date, oneMonthFromOpenToDate));
  });

  it("should not show the year dropdown menu by default", function() {
    const calendar = getCalendar();
    const yearReadView = calendar.find(YearDropdown);
    expect(yearReadView).to.have.length(0);
  });

  it("should show the year dropdown menu if toggled on", function() {
    const calendar = getCalendar({ showYearDropdown: true });
    const yearReadView = calendar.find(YearDropdown);
    expect(yearReadView).to.have.length(1);
  });

  it("should show only one year dropdown menu if toggled on and multiple month mode on", function() {
    const calendar = getCalendar({ showYearDropdown: true, monthsShown: 2 });
    const monthReadView = calendar.find(YearDropdown);
    expect(monthReadView).to.have.length(1);
  });

  it("should show month navigation if toggled on", function() {
    const calendar = getCalendar({
      includeDates: [utils.newDate()],
      forceShowMonthNavigation: true
    });
    const nextNavigationButton = calendar.find(
      ".react-datepicker__navigation--next"
    );
    expect(nextNavigationButton).to.have.length(1);
  });

  it("should correctly format weekday using formatWeekDay prop", function() {
    const calendar = getCalendar({ formatWeekDay: day => day[0] });
    calendar
      .find(".react-datepicker__day-name")
      .forEach(dayName => expect(dayName.text()).to.have.length(1));
  });

  describe("custom header", function() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    const renderCustomHeader = params => {
      const {
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
      } = params;

      return (
        <div className="custom-header">
          <button
            className="prevMonth"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            {"<"}
          </button>

          <select
            value={date.year()}
            className="year-select"
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {[2017, 2018, 2019].map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            className="month-select"
            value={months[date.month()]}
            onChange={({ target: { value } }) => changeMonth(value)}
          >
            {months.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="nextMonth"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            {"<"}
          </button>
        </div>
      );
    };

    it("should call render custom header function and returns parameters", function() {
      const renderCustomHeader = sinon.spy();

      getCalendar({ renderCustomHeader });

      const match = {
        changeMonth: sinon.match.func,
        changeYear: sinon.match.func,
        date: sinon.match.object,
        decreaseMonth: sinon.match.func,
        increaseMonth: sinon.match.func,
        nextMonthButtonDisabled: sinon.match.bool,
        prevMonthButtonDisabled: sinon.match.bool
      };

      expect(renderCustomHeader.calledWithMatch(match)).to.be.true;
    });

    it("should render only custom header", function() {
      const calendar = getCalendar({ renderCustomHeader });

      const nextMontButton = calendar.find(
        ".react-datepicker__navigation--next"
      );
      const prevMontButton = calendar.find(
        ".react-datepicker__navigation--previous"
      );

      expect(nextMontButton).to.have.length(0);
      expect(prevMontButton).to.have.length(0);
    });

    it("should render custom header with selects and buttons", function() {
      const calendar = getCalendar({
        renderCustomHeader
      });

      expect(calendar.find(".react-datepicker__header--custom")).to.have.length(
        1
      );
      expect(calendar.find(".custom-header")).to.have.length(1);

      const yearSelect = calendar.find(".year-select");
      const monthSelect = calendar.find(".month-select");
      const prevMonth = calendar.find(".prevMonth");
      const nextMonth = calendar.find(".nextMonth");

      expect(yearSelect).to.have.length(1);
      expect(monthSelect).to.have.length(1);
      expect(prevMonth).to.have.length(1);
      expect(nextMonth).to.have.length(1);
    });

    it("should go to previous month", function() {
      const calendar = getCalendar({
        renderCustomHeader
      });

      const selected = calendar.state().date.clone();
      const prevMonth = calendar.find(".prevMonth");

      prevMonth.simulate("click");

      expect(selected.month()).to.be.equal(calendar.state().date.month() + 1);
    });

    it("should go to next month", function() {
      const calendar = getCalendar({
        renderCustomHeader
      });

      const selected = calendar.state().date.clone();
      const nextMonth = calendar.find(".nextMonth");

      nextMonth.simulate("click");

      expect(selected.month()).to.be.equal(calendar.state().date.month() - 1);
    });

    it("nextMonthButtonDisabled flag should be true", function() {
      const renderCustomHeader = sinon.spy();

      getCalendar({
        renderCustomHeader,
        minDate: utils.subtractMonths(utils.newDate(), 1),
        maxDate: utils.newDate()
      });

      const {
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
      } = renderCustomHeader.getCall(0).args[0];

      assert(
        prevMonthButtonDisabled === false,
        "prevMonthButtonDisabled should be set to false"
      );
      assert(
        nextMonthButtonDisabled === true,
        "nextMonthButtonDisabled  should be set to true"
      );
    });

    it("prevMonthButtonDisabled flag should be true", function() {
      const renderCustomHeader = sinon.spy();

      getCalendar({
        renderCustomHeader,
        minDate: utils.newDate(),
        maxDate: utils.addMonths(utils.newDate(), 1)
      });

      const {
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
      } = renderCustomHeader.getCall(0).args[0];

      assert(
        prevMonthButtonDisabled === true,
        "prevMonthButtonDisabled should be set to true"
      );
      assert(
        nextMonthButtonDisabled === false,
        "nextMonthButtonDisabled  should be set to false"
      );
    });

    it("should select april from month select", function() {
      const calendar = getCalendar({
        renderCustomHeader
      });

      const monthSelect = calendar.find(".month-select");

      monthSelect.simulate("change", { target: { value: 4 } });

      const selected = calendar.state().date.clone();

      expect(selected.month()).to.be.equal(4);
    });

    it("should select 2017 from month select", function() {
      const calendar = getCalendar({
        renderCustomHeader
      });

      const yearSelect = calendar.find(".year-select");

      yearSelect.simulate("change", { target: { value: 2017 } });

      const selected = calendar.state().date.clone();

      expect(selected.year()).to.be.equal(2017);
    });
  });

  describe("when showDisabledMonthNavigation is enabled", () => {
    let onMonthChangeSpy = sinon.spy();

    beforeEach(() => {
      onMonthChangeSpy = sinon.spy();
    });

    it("should show disabled previous month navigation", function() {
      const calendar = getCalendar({
        minDate: utils.newDate(),
        maxDate: utils.addMonths(utils.newDate(), 3),
        showDisabledMonthNavigation: true
      });
      const prevDisabledNavigationButton = calendar.find(
        ".react-datepicker__navigation--previous--disabled"
      );

      const nextDisabledNavigationButton = calendar.find(
        ".react-datepicker__navigation--next--disabled"
      );
      expect(prevDisabledNavigationButton).to.have.length(1);
      expect(nextDisabledNavigationButton).to.have.length(0);
    });

    it("should show disabled next month navigation", function() {
      const calendar = getCalendar({
        minDate: utils.subtractMonths(utils.newDate(), 3),
        maxDate: utils.newDate(),
        showDisabledMonthNavigation: true
      });
      const prevDisabledNavigationButton = calendar.find(
        ".react-datepicker__navigation--previous--disabled"
      );

      const nextDisabledNavigationButton = calendar.find(
        ".react-datepicker__navigation--next--disabled"
      );
      expect(prevDisabledNavigationButton).to.have.length(0);
      expect(nextDisabledNavigationButton).to.have.length(1);
    });

    it("should not show disabled previous/next month navigation when next/previous month available", function() {
      const calendar = getCalendar({
        minDate: utils.subtractMonths(utils.newDate(), 3),
        maxDate: utils.addMonths(utils.newDate(), 3),
        showDisabledMonthNavigation: true
      });
      const prevDisabledNavigationButton = calendar.find(
        ".react-datepicker__navigation--previous--disabled"
      );

      const nextDisabledNavigationButton = calendar.find(
        ".react-datepicker__navigation--next--disabled"
      );
      expect(prevDisabledNavigationButton).to.have.length(0);
      expect(nextDisabledNavigationButton).to.have.length(0);
    });

    it("when clicking disabled month navigation, should not change month", function() {
      const calendar = getCalendar({
        minDate: utils.newDate(),
        maxDate: utils.newDate(),
        showDisabledMonthNavigation: true,
        onMonthChange: onMonthChangeSpy
      });
      const prevNavigationButton = calendar.find(
        ".react-datepicker__navigation--previous"
      );

      const nextNavigationButton = calendar.find(
        ".react-datepicker__navigation--next"
      );

      prevNavigationButton.simulate("click");

      assert(
        onMonthChangeSpy.called === false,
        "onMonthChange should not be called"
      );

      nextNavigationButton.simulate("click");

      assert(
        onMonthChangeSpy.called === false,
        "onMonthChange should not be called"
      );
    });

    it("when clicking non-disabled month navigation, should change month", function() {
      const calendar = getCalendar({
        selected: utils.newDate(),
        minDate: utils.subtractMonths(utils.newDate(), 3),
        maxDate: utils.addMonths(utils.newDate(), 3),
        showDisabledMonthNavigation: true,
        onMonthChange: onMonthChangeSpy
      });
      const prevNavigationButton = calendar.find(
        ".react-datepicker__navigation--previous"
      );

      const nextNavigationButton = calendar.find(
        ".react-datepicker__navigation--next"
      );

      prevNavigationButton.simulate("click");
      nextNavigationButton.simulate("click");

      assert(
        onMonthChangeSpy.callCount === 2,
        "onMonthChange should be called 2 times"
      );
    });
  });

  it("should not show the month dropdown menu by default", function() {
    const calendar = getCalendar();
    const monthReadView = calendar.find(MonthDropdown);
    expect(monthReadView).to.have.length(0);
  });

  it("should show the month dropdown menu if toggled on", function() {
    const calendar = getCalendar({ showMonthDropdown: true });
    const monthReadView = calendar.find(MonthDropdown);
    expect(monthReadView).to.have.length(1);
  });

  it("should show only one month dropdown menu if toggled on and multiple month mode on", function() {
    const calendar = getCalendar({ showMonthDropdown: true, monthsShown: 2 });
    const monthReadView = calendar.find(MonthDropdown);
    expect(monthReadView).to.have.length(1);
  });

  it("should not show the month-year dropdown menu by default", function() {
    const calendar = getCalendar();
    const monthYearReadView = calendar.find(MonthYearDropdown);
    expect(monthYearReadView).to.have.length(0);
  });

  it("should show the month-year dropdown menu if toggled on", function() {
    const calendar = getCalendar({
      showMonthYearDropdown: true,
      minDate: utils.subtractYears(utils.newDate(), 1),
      maxDate: utils.addYears(utils.newDate(), 1)
    });
    const monthYearReadView = calendar.find(MonthYearDropdown);
    expect(monthYearReadView).to.have.length(1);
  });

  it("should show only one month-year dropdown menu if toggled on and multiple month mode on", function() {
    const calendar = getCalendar({
      showMonthYearDropdown: true,
      minDate: utils.subtractYears(utils.newDate(), 1),
      maxDate: utils.addYears(utils.newDate(), 1),
      monthsShown: 2
    });
    const monthReadView = calendar.find(MonthYearDropdown);
    expect(monthReadView).to.have.length(1);
  });

  it("should not show the today button by default", function() {
    const calendar = getCalendar();
    const todayButton = calendar.find(".react-datepicker__today-button");
    expect(todayButton).to.have.length(0);
  });

  it("should show the today button if toggled on", function() {
    const calendar = getCalendar({ todayButton: "Vandaag" });
    const todayButton = calendar.find(".react-datepicker__today-button");
    expect(todayButton).to.have.length(1);
    expect(todayButton.text()).to.equal("Vandaag");
  });

  it("should set the date when pressing todayButton", () => {
    const calendar = getCalendar({ todayButton: "Vandaag" });
    const todayButton = calendar.find(".react-datepicker__today-button");
    todayButton.simulate("click");
    expect(calendar.state().date.isSame(utils.newDate(), "day"));
  });

  it("should set custom today date when pressing todayButton", () => {
    const todayInAuckland = utils.newDateWithOffset(12);
    const calendar = getCalendar({ todayButton: "Vandaag", utcOffset: 12 });
    const todayButton = calendar.find(".react-datepicker__today-button");
    todayButton.simulate("click");
    expect(utils.isSameDay(calendar.state().date, todayInAuckland));
  });

  it("should use a hash for week label if weekLabel is NOT provided", () => {
    const calendar = getCalendar({ showWeekNumbers: true });
    const weekLabel = calendar.find(".react-datepicker__day-name");
    expect(weekLabel.at(0).text()).to.equal("#");
  });

  it("should set custom week label if weekLabel is provided", () => {
    const calendar = getCalendar({ showWeekNumbers: true, weekLabel: "Foo" });
    const weekLabel = calendar.find(".react-datepicker__day-name");
    expect(weekLabel.at(0).text()).to.equal("Foo");
  });

  it("should track the currently hovered day", () => {
    const calendar = mount(
      <Calendar
        dateFormat={dateFormat}
        dropdownMode="scroll"
        onClickOutside={() => {}}
        onSelect={() => {}}
      />
    );
    const day = calendar.find(Day).first();
    day.simulate("mouseenter");
    const month = calendar.find(Month).first();
    expect(month.prop("selectingDate")).to.exist;
    expect(utils.isSameDay(month.prop("selectingDate"), day.prop("day"))).to.be
      .true;
  });

  it("should clear the hovered day when the mouse leaves", () => {
    const calendar = mount(
      <Calendar
        dateFormat={dateFormat}
        dropdownMode="scroll"
        onClickOutside={() => {}}
        onSelect={() => {}}
      />
    );
    calendar.setState({ selectingDate: utils.newDate() });
    const month = calendar.find(Month).first();
    expect(month.prop("selectingDate")).to.exist;
    month.simulate("mouseleave");
    calendar.update();
    expect(
      calendar
        .find(Month)
        .first()
        .prop("selectingDate")
    ).not.to.exist;
  });

  it("uses weekdaysShort instead of weekdaysMin provided useWeekdaysShort prop is present", () => {
    utils.registerLocale("weekDaysLocale", {
      parentLocale: "en",
      weekdaysMin: "AA_BB_CC_DD_EE_FF_GG".split("_"),
      weekdaysShort: "AAA_BBB_CCC_DDD_EEE_FFF_GGG".split("_")
    });

    const calendarShort = mount(
      <Calendar locale="weekDaysLocale" useWeekdaysShort />
    );
    const calendarMin = mount(<Calendar locale="weekDaysLocale" />);

    const daysNamesShort = calendarShort.find(".react-datepicker__day-name");
    expect(daysNamesShort.at(0).text()).to.equal("AAA");
    expect(daysNamesShort.at(6).text()).to.equal("GGG");

    const daysNamesMin = calendarMin.find(".react-datepicker__day-name");
    expect(daysNamesMin.at(0).text()).to.equal("AA");
    expect(daysNamesMin.at(6).text()).to.equal("GG");
  });

  it("should set the date to the selected day of the previous month when previous button clicked", () => {
    let date;
    const expectedDate = "28.06.2017";
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2017-07-28")}
        adjustDateOnChange
        onChange={d => {
          date = d;
        }}
      />
    );
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(datePicker.input));
    const calendar = TestUtils.scryRenderedComponentsWithType(
      datePicker.calendar,
      Calendar
    )[0];
    const previousButton = TestUtils.findRenderedDOMComponentWithClass(
      calendar,
      "react-datepicker__navigation--previous"
    );
    TestUtils.Simulate.click(previousButton);
    expect(utils.formatDate(date, "DD.MM.YYYY")).to.equal(expectedDate);
  });

  it("should set the date to the selected day of the next when next button clicked", () => {
    let date;
    const expectedDate = "28.08.2017";
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2017-07-28")}
        adjustDateOnChange
        onChange={d => {
          date = d;
        }}
      />
    );
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(datePicker.input));
    const calendar = TestUtils.scryRenderedComponentsWithType(
      datePicker.calendar,
      Calendar
    )[0];
    const nextButton = TestUtils.findRenderedDOMComponentWithClass(
      calendar,
      "react-datepicker__navigation--next"
    );
    TestUtils.Simulate.click(nextButton);
    expect(utils.formatDate(date, "DD.MM.YYYY")).to.equal(expectedDate);
  });

  it("should set the date to the last possible day of the previous month when previous button clicked", () => {
    let date;
    const expectedDate = "30.11.2017";
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2017-12-31")}
        adjustDateOnChange
        onChange={d => {
          date = d;
        }}
      />
    );
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(datePicker.input));
    const calendar = TestUtils.scryRenderedComponentsWithType(
      datePicker.calendar,
      Calendar
    )[0];
    const previousButton = TestUtils.findRenderedDOMComponentWithClass(
      calendar,
      "react-datepicker__navigation--previous"
    );
    TestUtils.Simulate.click(previousButton);
    expect(utils.formatDate(date, "DD.MM.YYYY")).to.equal(expectedDate);
  });

  describe("onMonthChange", () => {
    let onMonthChangeSpy = sinon.spy();
    let calendar;

    beforeEach(() => {
      onMonthChangeSpy = sinon.spy();
      calendar = mount(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="select"
          showYearDropdown
          showMonthDropdown
          forceShowMonthNavigation
          onMonthChange={onMonthChangeSpy}
        />
      );
    });

    it("calls onMonthChange prop when previous month button clicked", () => {
      const select = calendar.find(".react-datepicker__navigation--previous");
      select.simulate("click");

      assert(
        onMonthChangeSpy.called === true,
        "onMonthChange should be called"
      );
    });

    it("calls onMonthChange prop when next month button clicked", () => {
      const select = calendar.find(".react-datepicker__navigation--next");
      select.simulate("click");

      assert(
        onMonthChangeSpy.called === true,
        "onMonthChange should be called"
      );
    });

    it("calls onMonthChange prop when month changed from month dropdown", () => {
      const select = calendar.find(MonthDropdown).find("select");
      select.simulate("change");

      assert(
        onMonthChangeSpy.called === true,
        "onMonthChange should be called"
      );
    });
  });

  describe("onYearChange", () => {
    let onYearChangeSpy = sinon.spy();
    let calendar;

    beforeEach(() => {
      onYearChangeSpy = sinon.spy();
      calendar = mount(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="select"
          showYearDropdown
          onYearChange={onYearChangeSpy}
        />
      );
    });

    it("calls onYearChange prop when year changed from year dropdown", () => {
      const select = calendar.find(YearDropdown).find("select");
      select.simulate("change");

      assert(onYearChangeSpy.called === true, "onYearChange should be called");
    });
  });

  describe("monthYearDropdown change", () => {
    let onYearChangeSpy = sinon.spy();
    let onMonthChangeSpy = sinon.spy();
    let calendar;

    beforeEach(() => {
      onYearChangeSpy = sinon.spy();
      onMonthChangeSpy = sinon.spy();
      calendar = mount(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="select"
          showMonthYearDropdown
          minDate={utils.subtractYears(utils.newDate(), 1)}
          maxDate={utils.addYears(utils.newDate(), 1)}
          onYearChange={onYearChangeSpy}
          onMonthChange={onMonthChangeSpy}
        />
      );
    });

    it("calls onYearChange prop when selection is changed from month-year dropdown", () => {
      const option = calendar
        .find(MonthYearDropdown)
        .find("select")
        .find("option")
        .at(3);
      option.simulate("change");

      assert(onYearChangeSpy.called === true, "onYearChange should be called");
    });

    it("calls onMonthChange prop when selection is changed from month-year dropdown", () => {
      const option = calendar
        .find(MonthYearDropdown)
        .find("select")
        .find("option")
        .at(3);
      option.simulate("change");

      assert(
        onMonthChangeSpy.called === true,
        "onMonthChange should be called"
      );
    });
  });

  describe("onDropdownFocus", () => {
    let onDropdownFocusSpy = sinon.spy();
    let calendar;

    beforeEach(() => {
      onDropdownFocusSpy = sinon.spy();
      calendar = mount(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="select"
          showYearDropdown
          showMonthDropdown
          showMonthYearDropdown
          minDate={utils.subtractYears(utils.newDate(), 1)}
          maxDate={utils.addYears(utils.newDate(), 1)}
          onDropdownFocus={onDropdownFocusSpy}
        />
      );
    });

    it("calls onDropdownFocus prop when year select is focused", () => {
      const select = calendar.find(".react-datepicker__year-select");
      select.simulate("focus");

      assert(
        onDropdownFocusSpy.called === true,
        "onDropdownFocus should be called"
      );
    });

    it("calls onDropdownFocus prop when month select is focused", () => {
      const select = calendar.find(".react-datepicker__month-select");
      select.simulate("focus");

      assert(
        onDropdownFocusSpy.called === true,
        "onDropdownFocus should to be called"
      );
    });

    it("calls onDropdownFocus prop when year-month select is focused", () => {
      const select = calendar.find(".react-datepicker__month-year-select");
      select.simulate("focus");

      assert(
        onDropdownFocusSpy.called === true,
        "onDropdownFocus should to be called"
      );
    });

    it("does not call onDropdownFocus prop when the dropdown container div is focused", () => {
      const select = calendar.find(".react-datepicker__header__dropdown");
      select.simulate("focus");

      assert(
        onDropdownFocusSpy.called === false,
        "onDropdownFocus should not to be called"
      );
    });
  });

  describe("localization", function() {
    function testLocale(calendar, selected, locale) {
      const localized = utils.localizeDate(selected, locale);

      const calendarText = calendar.find(".react-datepicker__current-month");
      expect(calendarText.text()).to.equal(
        utils.formatDate(localized, dateFormat)
      );

      const firstDateOfWeek = utils.getStartOfWeek(utils.cloneDate(localized));
      const firstWeekDayMin = utils.getWeekdayMinInLocale(
        utils.getLocaleData(firstDateOfWeek),
        firstDateOfWeek
      );
      const firstHeader = calendar.find(".react-datepicker__day-name").at(0);
      expect(firstHeader.text()).to.equal(firstWeekDayMin);
    }

    it("should use the globally-defined locale by default", function() {
      const selected = utils.newDate();
      const calendar = getCalendar({ selected });
      testLocale(calendar, selected, utils.getDefaultLocale());
    });

    it("should use the locale specified as a prop", function() {
      const locale = "fr";
      const selected = utils.localizeDate(utils.newDate(), locale);
      const calendar = getCalendar({ selected, locale });
      testLocale(calendar, selected, locale);
    });

    it("should override the locale of the date with the globally-defined locale", function() {
      const selected = utils.localizeDate(utils.newDate(), "fr");
      const calendar = getCalendar({ selected });
      testLocale(calendar, selected, utils.getDefaultLocale());
    });

    it("should override the locale of the date with the locale prop", function() {
      const locale = "fr";
      const selected = utils.newDate();
      const calendar = getCalendar({ selected, locale });
      testLocale(calendar, selected, locale);
    });

    it("should render empty custom header", function() {
      const calendar = getCalendar({ renderCustomHeader: () => {} });

      const header = calendar.find(".react-datepicker__header--custom");
      expect(header).to.have.length(1);
    });
  });
});
