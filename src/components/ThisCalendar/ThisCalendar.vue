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
      <div :class="getCalendarClass" v-show="showCalendar">
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
    </transition>
  </div>
</template>

<script>
import input from "../../mixins/input";
import CssArchitect from "../../utils/css-architect";
import ThisIcon from "../ThisIcon/ThisIcon";

import {
  format,
  startOfMonth,
  endOfMonth,
  lastDayOfMonth,
  isSameMonth,
  isSameDay,
  addMonths,
  getDay,
  addDays,
  eachDayOfInterval,
  setDate
} from "date-fns";

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
      default: "MM/dd/yyyy"
    },
    enableTime: {
      type: [Boolean, String],
      default: false
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
    getCalendarClass: function() {
      const cssArchitect = new CssArchitect("this-calendar");
      cssArchitect.addClass("inline-calendar", this.inline);
      cssArchitect.addClass(this.getSyntaxModifiers);
      return cssArchitect.getClasses();
    },
    getDayClass() {
      const cssArchitect = new CssArchitect(this.className("day"));
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      inputDate: null,
      today: null,
      selectedDate: null,
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
    }
    if (this.inline) {
      this.showCalendar = true;
    }
  },
  filters: {
    formatDateToDay(val) {
      return format(val, "d");
    }
  },
  methods: {
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
      this.selectedDate = day.date;
      let formattedDate = format(this.selectedDate, this.dateFormat);
      this.inputDate = formattedDate;
      this.$emit("input", this.selectedDate);
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
