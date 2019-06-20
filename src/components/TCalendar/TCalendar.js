import input from "../../mixins/input";

import TIcon from "../TIcon/TIcon";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

import format from "date-fns/format";
import startOfMonth from "date-fns/start_of_month";
import endOfMonth from "date-fns/end_of_month";
import lastDayOfMonth from "date-fns/last_day_of_month";
import isSameMonth from "date-fns/is_same_month";
import isSameDay from "date-fns/is_same_day";
import addMonths from "date-fns/add_months";
import getDay from "date-fns/get_day";
import addDays from "date-fns/add_days";
import eachDay from "date-fns/each_day";
import setDate from "date-fns/set_date";
import setHours from "date-fns/set_hours";
import getHours from "date-fns/get_hours";
import setMinutes from "date-fns/set_minutes";
import getMinutes from "date-fns/get_minutes";
import setSeconds from "date-fns/set_seconds";
import getSeconds from "date-fns/get_seconds";
import getTime from "date-fns/get_time";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default {
  name: "t-calendar",
  components: { TIcon },
  mixins: [input],
  props: {
    value: {
      type: [String, Date]
    },
    widgetClass: {
      type: String
    },
    startDate: {
      required: false,
      type: Date
    },
    dateFormat: {
      type: String,
      default: function() {
        return this.$thisvui.dateFormat;
      }
    },
    enableTime: {
      type: Boolean,
      default: function() {
        return this.$thisvui.enableTimePicker;
      }
    },
    inline: {
      type: Boolean,
      default: false
    },
    noCalendar: {
      type: Boolean,
      default: false
    },
    minDate: {
      type: [String, Date]
    },
    maxDate: {
      type: [String, Date]
    }
  },
  data() {
    return {
      inputDate: null,
      today: null,
      selectedDate: null,
      selectedTime: null,
      hours: null,
      minutes: null,
      seconds: null,
      maxHours: 12,
      maxMinutes: 59,
      maxSeconds: 59,
      currentDate: null,
      dayLabels: null,
      showCalendar: false,
      baseClass: "t-calendar"
    };
  },
  watch: {
    hours: function(newVal, oldVal) {
      this.setSelectedTime("h", newVal);
    },
    minutes: function(newVal, oldVal) {
      this.setSelectedTime("m", newVal);
    },
    seconds: function(newVal, oldVal) {
      this.setSelectedTime("s", newVal);
    },
    selectedTime: function(newVal, oldVal) {
      this.initSelectedDate();
      this.setSelectedDate();
    }
  },
  computed: {
    currentMonth() {
      return this.currentDate.getMonth();
    },
    currentYear() {
      return this.currentDate.getFullYear();
    },
    currentMonthLabel() {
      return format(this.currentDate, "MMMM");
    },
    daysArray() {
      const date = this.currentDate;
      const startOfMonthDate = startOfMonth(date);
      const endOfMonthDate = endOfMonth(date);

      const days = eachDay(startOfMonthDate, endOfMonthDate).map(day => ({
        date: day,
        isCurrentMonth: isSameMonth(
          new Date(this.currentYear, this.currentMonth),
          day
        ),
        isToday: isSameDay(this.today, day),
        isSelected: isSameDay(this.selectedDate, day)
      }));

      /* Filling days from past month */
      let previousMonth = lastDayOfMonth(addMonths(date, -1));
      const begIndex = getDay(days[0].date);
      for (let i = begIndex; i > 0; i--) {
        days.unshift({
          date: previousMonth,
          isCurrentMonth: false,
          isToday: isSameDay(this.today, previousMonth),
          isSelected: isSameDay(this.selectedDate, previousMonth)
        });
        previousMonth = addDays(previousMonth, -1);
      }

      /* Filling days for the next month */
      const fillingDaysAtEnd = days.length % 7 > 0 ? 7 - (days.length % 7) : 0;
      let nextMonth = addMonths(date, 1);
      nextMonth = setDate(nextMonth, 1);
      for (let x = 1; x <= fillingDaysAtEnd; x++) {
        days.push({
          date: nextMonth,
          isCurrentMonth: false,
          isToday: isSameDay(this.today, nextMonth),
          isSelected: isSameDay(this.selectedDate, nextMonth)
        });
        nextMonth = addDays(nextMonth, 1);
      }
      return days;
    },
    getContainerClass: function() {
      const cssArchitect = new CssArchitect(
        `field ${this.className("container")}`
      );
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass("is-horizontal", this.isHorizontal);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the calendar control element
     * @returns { A String with the chained css classes }
     */
    getCalendarControlClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.getControlClass);
      cssArchitect.addClass("is-column", this.inline);
      return cssArchitect.getClasses();
    },
    getWidgetClass: function() {
      const cssArchitect = new CssArchitect("t-calendar-widget");
      cssArchitect.isFlexible("column").isAbsolute();
      cssArchitect.addClass("inline-calendar", this.inline);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.widgetClass);
      return cssArchitect.getClasses();
    },
    getCalendarClass: function() {
      const cssArchitect = new CssArchitect("t-calendar");
      return cssArchitect.getClasses();
    },
    getHeaderClass: function() {
      const cssArchitect = new CssArchitect("t-calendar-header");
      cssArchitect.isFlexible().isCentered();
      return cssArchitect.getClasses();
    },
    getTimePickerClass: function() {
      const cssArchitect = new CssArchitect("t-timepicker");
      cssArchitect.isFlexible();
      return cssArchitect.getClasses();
    },
    getDayClass() {
      const cssArchitect = new CssArchitect(this.className("day"));
      return cssArchitect.getClasses();
    }
  },
  created() {
    this.dayLabels = DAY_LABELS.slice();
    this.today = new Date();
    this.currentDate = this.today;
  },
  mounted() {
    if (this.startDate) {
      this.currentDate = this.startDate;
      this.selectedDate = this.startDate;
      this.selectedTime = this.startDate;
    }
    if (this.inline) {
      this.showCalendar = true;
    }
    if (this.enableTime && this.selectedTime) {
      this.hours = getHours(this.selectedTime);
      this.minutes = getMinutes(this.selectedTime);
      this.seconds = getSeconds(this.selectedTime);
    }
  },
  methods: {
    formatDateToDay(val) {
      return format(val, "D");
    },
    initSelectedTime() {
      if (!this.selectedTime) {
        this.selectedTime = new Date();
      }
    },
    initSelectedDate() {
      if (!this.selectedDate) {
        this.selectedDate = new Date();
      }
    },
    className(className) {
      return `${this.baseClass}-${className}`;
    },
    getDayNumberClass(day) {
      const cssArchitect = new CssArchitect("day-number");
      cssArchitect.isFullheight();
      cssArchitect.addClass("is-today", day.isToday);
      cssArchitect.addClass("is-current", day.isCurrentMonth);
      cssArchitect.addClass("is-selected", day.isSelected);
      return cssArchitect.getClasses();
    },
    nextMonth() {
      this.currentDate = addMonths(this.currentDate, 1);
    },
    previousMonth() {
      this.currentDate = addMonths(this.currentDate, -1);
    },
    clearSelectedDay() {
      this.selectedDate = null;
      this.inputDate = null;
      this.$emit(this.$thisvui.events.common.input, this.selectedDate);
    },
    setSelectedDate(day) {
      this.initSelectedTime();
      if (day) {
        this.selectedDate = day.date;
      }
      let selectedDate = new Date(getTime(this.selectedDate));
      let hours = getHours(this.selectedTime);
      let minutes = getMinutes(this.selectedTime);
      let seconds = getSeconds(this.selectedTime);
      selectedDate = setHours(selectedDate, hours);
      selectedDate = setMinutes(selectedDate, minutes);
      selectedDate = setSeconds(selectedDate, seconds);
      this.selectedDate = selectedDate;
      let formattedDate = format(this.selectedDate, this.dateFormat);
      this.inputDate = formattedDate;
      this.$emit(this.$thisvui.events.common.input, this.selectedDate);
    },
    setSelectedTime(units, value) {
      this.initSelectedTime();
      let selectedTime = new Date(getTime(this.selectedTime));
      switch (units) {
        case "h":
          selectedTime = setHours(selectedTime, value);
          break;
        case "m":
          selectedTime = setMinutes(selectedTime, value);
          break;
        case "s":
          selectedTime = setSeconds(selectedTime, value);
          break;
      }
      this.selectedTime = selectedTime;
    },
    onInput() {
      this.validateOnEvent("input");
      this.$emit(this.$thisvui.events.common.input, this.selectedDate);
    },
    onFocus() {
      if (!this.inline) {
        this.showCalendar = true;
      }
    },
    hideCalendar() {
      if (!this.inline) {
        this.showCalendar = false;
      }
    },
    /**
     * Creates a header arrow
     */
    createArrow(architect, icon, method) {
      let arrow = architect.createButton(); // The control element
      arrow.setProps({
        icon: icon,
        iconClass: "change-month-arrow",
        isText: true
      });
      arrow.addEvent("click", method);
      return arrow;
    },
    /**
     * Creates the calendar widget
     */
    createWidget(architect) {
      let root = architect.createTransition("fade");
      let widget = architect.createDiv(this.getWidgetClass);

      // Creating the calendar
      if (!this.noCalendar) {
        let calendar = architect.createDiv(this.getCalendarClass);
        let header = architect.createElement("header", this.getHeaderClass); // The header element

        // Creating the month selection header
        let arrowLeft = this.createArrow(
          architect,
          this.$thisvui.icons.arrowLeft,
          this.previousMonth
        ); // The left arrow
        let arrowRight = this.createArrow(
          architect,
          this.$thisvui.icons.arrowRight,
          this.nextMonth
        ); // The right arrow
        let monthName = architect.createSpan("month-name");
        monthName.innerHtml(`${this.currentMonthLabel} ${this.currentYear}`);

        header.addChild(arrowLeft);
        header.addChild(monthName);
        header.addChild(arrowRight);
        calendar.addChild(header);

        // Creating days labels
        for (let dayLabel of this.dayLabels) {
          let dayLabelEl = architect.createDiv(this.className("headings"));
          dayLabelEl.innerHtml(dayLabel);
          calendar.addChild(dayLabelEl);
        }

        // Creating days grid
        for (let day of this.daysArray) {
          let dayEl = architect.createDiv(this.getDayClass);
          let dayNumber = architect.createDiv(this.getDayNumberClass(day));
          dayNumber.addClick(() => {
            this.setSelectedDate(day);
          });
          dayNumber.innerHtml(this.formatDateToDay(day.date));
          dayEl.addChild(dayNumber);
          calendar.addChild(dayEl);
        }
        widget.addChild(calendar);
      }

      // Creating time picker
      if (this.enableTime) {
        let timePicker = architect.createDiv(this.getTimePickerClass);
        let hoursInput = architect.createInput();
        hoursInput.setRef("hoursInput");
        hoursInput.addAttr("type", "number");
        hoursInput.setProps({
          value: this.hours,
          disabled: this.disabled,
          max: 12
        });
        let minutesInput = architect.createInput();
        minutesInput.setRef("minutesInput");
        minutesInput.addAttr("type", "number");
        minutesInput.setProps({
          value: this.minutes,
          disabled: this.disabled,
          max: 60
        });
        let secondsInput = architect.createInput();
        secondsInput.setRef("secondsInput");
        secondsInput.addAttr("type", "number");
        secondsInput.setProps({
          value: this.seconds,
          disabled: this.disabled,
          max: 60
        });

        timePicker.addChild(hoursInput);
        timePicker.addChild(minutesInput);
        timePicker.addChild(secondsInput);
        widget.addChild(timePicker);
      }
      root.addChild(widget, this.showCalendar);
      architect.addChild(root);
    },
    /**
     * Creates the input element
     */
    createInput(architect) {
      let root = architect.createDiv("field-body");
      let field = architect.createDiv("field");
      let control = architect.createDiv(this.getCalendarControlClass); // The control element

      // Creating the html input element
      let input = architect.createInput(this.getInputClass);
      input.setId(this.id);
      let inputProps = {
        placeholder: this.placeholder,
        value: this.inputDate,
        disabled: this.disabled,
        validationScope: this.validationScope,
        type: this.type,
        readonly: true,
        min: this.min,
        max: this.max
      };
      input.setAttrs(inputProps);
      input.setRef("inputField");
      input.addEvent("change", this.onChange);
      input.addEvent("input", this.onInput);
      input.addEvent("blur", this.onBlur);
      input.addEvent("focus", this.onFocus);
      input.addEvent("keyup", this.onKeyup);
      control.addChild(input);

      this.createIcons(control);
      this.createErrorHelpers(control);

      field.addChild(control);
      root.addChild(field);

      architect.addChild(root);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClass);
    root.addDirective({ name: "t-click-outside", value: this.hideCalendar });

    this.createLabel(root);
    this.createInput(root);
    this.createWidget(root);

    return root.create();
  }
};
