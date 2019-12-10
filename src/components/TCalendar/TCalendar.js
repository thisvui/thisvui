import inputs from "../../mixins/inputs";

import { TInput } from "../TInput";

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
  mixins: [inputs],
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
    },
    validateOn: {
      type: String,
      default: "blur, input"
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
      const css = new CssArchitect(`group ${this.className("container")}`);
      css.addClass(this.containerClass, this.containerClass !== undefined);
      css.addClass("is-horizontal", this.isHorizontal);
      return css.getClasses();
    },
    getWidgetClass: function() {
      const css = new CssArchitect("t-calendar__widget");
      css.flexible({ direction: "column" });
      css.addClass("is-absolute", !this.inline);
      css.addClass("inline-calendar", this.inline);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.widgetClass);
      return css.getClasses();
    },
    getCalendarBodyClass: function() {
      const css = new CssArchitect("t-calendar__body");
      return css.getClasses();
    },
    getHeaderClass: function() {
      const css = new CssArchitect("t-calendar__header");
      css.flexible().isCentered();
      return css.getClasses();
    },
    getTimePickerClass: function() {
      const css = new CssArchitect("t-calendar__time");
      css.flexible();
      return css.getClasses();
    },
    getDayClass() {
      const css = new CssArchitect(this.className("day"));
      return css.getClasses();
    },
    getClearIconClass: function() {
      const css = new CssArchitect();
      css.addClass("colored");
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass("cursor-pointer");
      return css.getClasses();
    },
    showClearIcon: function() {
      return this.isNotEmpty(this.selectedDate) && !this.disabled;
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
      return `${this.baseClass}__${className}`;
    },
    getDayNumberClass(day) {
      const cssArchitect = new CssArchitect("day-number");
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
      this.$refs.inputField.value = "";
      this.$emit(this.$thisvui.events.common.input, this.selectedDate);
      this.validateOnEvent("input");
      this.hasValue = false;
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
      this.$refs.inputField.value = this.inputDate;
      this.$emit(this.$thisvui.events.common.input, this.selectedDate);
      this.validateOnEvent("input");
      this.hasValue = true;
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
      this.hasValue = true;
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
    onTimeInput(type, value) {
      switch (type) {
        case "h":
          this.hours = value;
          break;
        case "m":
          this.minutes = value;
          break;
        case "s":
          this.seconds = value;
          break;
      }
    },
    hideCalendar() {
      if (!this.inline) {
        this.showCalendar = false;
      }
    },
    /**
     * Creates the clear icon
     */
    createClearIcon(architect) {
      if (this.showClearIcon) {
        let clearIconWrapper = architect.createA();
        let clearIcon = architect.createIcon(this.getClearIconClass);
        clearIcon.setRef("clear");
        clearIcon.addProp("icon", this.$thisvui.icons.remove);
        clearIcon.addProp("preserveDefaults", !this.overrideDefaults);
        clearIconWrapper.addClick(this.clearSelectedDay);
        clearIconWrapper.addChild(clearIcon);
        architect.addChild(clearIconWrapper);
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
        text: true,
        marginless: true,
        paddingless: true
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
        let calendarBody = architect.createDiv(this.getCalendarBodyClass);
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
        monthName.innerHTML(`${this.currentMonthLabel} ${this.currentYear}`);

        header.addChild(arrowLeft);
        header.addChild(monthName);
        header.addChild(arrowRight);
        calendarBody.addChild(header);

        // Creating days labels
        for (let dayLabel of this.dayLabels) {
          let dayLabelEl = architect.createDiv(this.className("headings"));
          dayLabelEl.innerHTML(dayLabel);
          calendarBody.addChild(dayLabelEl);
        }

        // Creating days grid
        for (let day of this.daysArray) {
          let dayEl = architect.createDiv(this.getDayClass);
          let dayNumber = architect.createDiv(this.getDayNumberClass(day));
          dayNumber.addClick(() => {
            this.setSelectedDate(day);
          });
          dayNumber.innerHTML(this.formatDateToDay(day.date));
          dayEl.addChild(dayNumber);
          calendarBody.addChild(dayEl);
        }
        widget.addChild(calendarBody);
      }

      // Creating time picker
      if (this.enableTime) {
        let timePicker = architect.createDiv(this.getTimePickerClass);
        let hoursInput = architect.createElement(TInput);
        hoursInput.setRef("hoursInput");
        hoursInput.setProps({
          type: "number",
          value: this.hours,
          disabled: this.disabled,
          max: 12,
          min: 0,
          compact: true,
          hideStateIcon: true
        });
        hoursInput.addEvent("input", value => {
          this.onTimeInput("h", value);
        });
        let minutesInput = architect.createElement(TInput);
        minutesInput.setRef("minutesInput");
        minutesInput.setProps({
          type: "number",
          value: this.minutes,
          disabled: this.disabled,
          max: 60,
          min: 0,
          compact: true,
          hideStateIcon: true
        });
        minutesInput.addEvent("input", value => {
          this.onTimeInput("m", value);
        });
        let secondsInput = architect.createElement(TInput);
        secondsInput.setRef("secondsInput");
        secondsInput.setProps({
          type: "number",
          value: this.seconds,
          disabled: this.disabled,
          max: 60,
          min: 0,
          compact: true,
          hideStateIcon: true
        });
        secondsInput.addEvent("input", value => {
          this.onTimeInput("s", value);
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
      let root = architect.createDiv(this.getWrapperClass);
      let control = architect.createDiv(this.getControlClass); // The control element

      // Creating the html input element
      let input = architect.createInput(this.getInputClass);
      input.setId(this.id);
      let inputAttrs = {
        placeholder: this.placeholder,
        value: this.inputDate,
        disabled: this.disabled,
        validationScope: this.validationScope,
        type: this.type,
        readonly: true,
        min: this.min,
        max: this.max
      };
      input.value(this.inputDate);
      input.setAttrs(inputAttrs);
      input.setRef("inputField");
      input.addEvent("change", this.onChange);
      input.addEvent("change", this.onChange);
      input.addEvent("input", this.onInput);
      input.addEvent("blur", this.onBlur);
      input.addEvent("focus", this.onFocus);
      input.addKeyup({
        key: architect.keycode.delete,
        handler: this.clearSelectedDay
      });
      control.addChild(input);

      let labelParent = this.classic ? architect : control;
      this.createLabel(labelParent);
      root.addChild(control);

      this.createClearIcon(root);
      this.createIcon(root);
      this.createErrorHelpers(root);
      architect.addChild(root);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClass);
    root.addDirective({
      name: "click-outside",
      value: {
        handler: "hideCalendar"
      }
    });

    this.createInput(root);
    this.createWidget(root);

    return root.create();
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
    this.$nextTick(function() {
      this.hasValue = this.getHasValue();
    });
  }
};
