<template>
  <div :class="getContainerClass" v-this-click-outside="hideCalendar">
    <label v-if="!getRemoveLabel" class="label has-text-left">{{
      label
    }}</label>
    <div :class="getCalendarControlClass">
      <input
        ref="inputField"
        :id="id"
        :class="getInputClass"
        :value="inputDate"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="true"
        :validation-scope="validationScope"
        type="text"
        @keyup.delete="clearSelectedDay"
        @input="onInput"
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus"
      />
      <span v-if="valid" class="icon is-right has-text-success">
        <this-icon
          :preserve-defaults="!overrideDefaults"
          :icon="$thisvui.icons.check"
        ></this-icon>
      </span>
      <template v-for="error in errors">
        <p
          :key="error"
          class="help is-danger"
          :msg="error"
          :msg-position="msgPosition"
        ></p>
      </template>
    </div>
    <transition name="fade">
      <div :class="getWidgetClass" v-show="showCalendar">
        <div :class="getCalendarClass" v-if="!noCalendar">
          <header :class="className(`header`)">
            <this-action
              :icon="$thisvui.icons.arrowLeft"
              icon-class="change-month-arrow"
              type="link"
              @click="previousMonth"
            ></this-action>
            <span class="month-name"
              >{{ currentMonthLabel }} {{ currentYear }}</span
            >
            <this-action
              :icon="$thisvui.icons.arrowRight"
              icon-class="change-month-arrow"
              type="link"
              @click="nextMonth"
            ></this-action>
          </header>
          <div :class="className(`headings`)" v-for="dayLabel in dayLabels">
            {{ dayLabel }}
          </div>
          <div v-for="day in daysArray" :class="getDayClass">
            <div
              type="link"
              @click="setSelectedDate(day)"
              :class="getDayNumberClass(day)"
            >
              {{ day.date | formatDateToDay }}
            </div>
          </div>
        </div>
        <div :class="getTimePickerClass" v-if="getBoolean(enableTime)">
          <this-input
            ref="hoursInput"
            type="number"
            v-model="hours"
            :disabled="disabled"
            :max="12"
          ></this-input>
          <this-input
            type="number"
            v-model="minutes"
            :disabled="disabled"
            :max="60"
          ></this-input>
          <this-input
            type="number"
            v-model="seconds"
            :disabled="disabled"
            :max="60"
          ></this-input>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import input from "../../mixins/input";
import CssArchitect from "../../utils/css-architect";
import ThisIcon from "../ThisIcon/ThisIcon";

import format from "date-fns/format";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";
import addMonths from "date-fns/addMonths";
import getDay from "date-fns/getDay";
import addDays from "date-fns/addDays";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import setDate from "date-fns/setDate";
import setHours from "date-fns/setHours";
import getHours from "date-fns/getHours";
import setMinutes from "date-fns/setMinutes";
import getMinutes from "date-fns/getMinutes";
import setSeconds from "date-fns/setSeconds";
import getSeconds from "date-fns/getSeconds";
import getTime from "date-fns/getTime";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default {
  name: "ThisCalendar",
  components: { ThisIcon },
  mixins: [input],
  props: {
    value: {
      type: [String, Date]
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
      type: [Boolean, String],
      default: function() {
        return this.$thisvui.enableTimePicker;
      }
    },
    inline: {
      type: [Boolean, String],
      default: false
    },
    noCalendar: {
      type: [Boolean, String],
      default: false
    },
    minDate: {
      type: [String, Date]
    },
    maxDate: {
      type: [String, Date]
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

      const days = eachDayOfInterval({
        start: startOfMonthDate,
        end: endOfMonthDate
      }).map(day => ({
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
      const cssArchitect = new CssArchitect("this-calendar-widget");
      cssArchitect.addClass("inline-calendar", this.inline);
      cssArchitect.addClass(this.getSyntaxModifiers);
      return cssArchitect.getClasses();
    },
    getCalendarClass: function() {
      const cssArchitect = new CssArchitect("this-calendar");
      return cssArchitect.getClasses();
    },
    getTimePickerClass: function() {
      const cssArchitect = new CssArchitect("this-timepicker");
      return cssArchitect.getClasses();
    },
    getDayClass() {
      const cssArchitect = new CssArchitect(this.className("day"));
      return cssArchitect.getClasses();
    }
  },
  watch: {
    hours: function(newVal, oldVal) {
      this.setSelectedTime("h", newVal)
    },
    minutes: function(newVal, oldVal) {
      this.setSelectedTime("m", newVal)
    },
    seconds: function(newVal, oldVal) {
      this.setSelectedTime("s", newVal)
    },
    selectedTime: function(newVal, oldVal) {
      this.initSelectedDate();
      this.setSelectedDate();
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
      baseClass: "this-calendar"
    };
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
    if(this.enableTime && this.selectedTime){
      this.hours = getHours(this.selectedTime)
      this.minutes = getMinutes(this.selectedTime)
      this.seconds = getSeconds(this.selectedTime)

    }
  },
  filters: {
    formatDateToDay(val) {
      return format(val, "d");
    }
  },
  methods: {
    initSelectedTime(){
      if(!this.selectedTime){
        this.selectedTime = new Date()
      }
    },
    initSelectedDate(){
      if(!this.selectedDate){
        this.selectedDate = new Date()
      }
    },
    className(className) {
      return `${this.baseClass}-${className}`;
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
      this.$emit("input", this.selectedDate);
    },
    setSelectedDate(day) {
      this.initSelectedTime();
      if(day){
        this.selectedDate = day.date
      }
      let selectedDate = new Date(getTime(this.selectedDate))
      let hours = getHours(this.selectedTime)
      let minutes = getMinutes(this.selectedTime)
      let seconds = getSeconds(this.selectedTime)
      selectedDate = setHours(selectedDate, hours)
      selectedDate = setMinutes(selectedDate, minutes)
      selectedDate = setSeconds(selectedDate, seconds)
      this.selectedDate = selectedDate
      let formattedDate = format(this.selectedDate, this.dateFormat);
      this.inputDate = formattedDate;
      this.$emit("input", this.selectedDate);
    },
    setSelectedTime(units, value) {
      this.initSelectedTime();
      let selectedTime = new Date(getTime(this.selectedTime))
      switch (units) {
        case 'h':
          selectedTime = setHours(selectedTime, value);
          break;
        case 'm':
          selectedTime = setMinutes(selectedTime, value);
          break;
        case 's':
          selectedTime = setSeconds(selectedTime, value);
          break;
      }
      this.selectedTime = selectedTime
    },
    onInput() {
      this.validateOnEvent("input");
      this.$emit("input", this.selectedDate);
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
    }
  }
};
</script>
