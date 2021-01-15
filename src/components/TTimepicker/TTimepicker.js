import compareAsc from "date-fns/compareAsc";
import format from "date-fns/format";

import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import getSeconds from "date-fns/getSeconds";
import isValid from "date-fns/isValid";
import parseISO from "date-fns/parseISO";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import inputs from "../../mixins/inputs";
import time from "../../mixins/time";
import timeEvents from "../../mixins/timeEvents";
import { ComponentNames } from "../../utils/constants";
import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";
import { filteredDigits } from "../../utils/pad";

import TNumpad from "./TNumpad";
import TTimeUnit from "./TTimeUnit";

export default {
  name: ComponentNames.TTimepicker,
  mixins: [inputs, timeEvents, time],
  props: {
    value: {
      type: [String, Date, Number]
    },
    timeFormat: {
      type: String,
      default: function() {
        return this.showSeconds
          ? this.$thisvui.timeFormatSeconds
          : this.$thisvui.timeFormat;
      }
    },
    isoFormat: {
      type: Boolean
    },
    unixTime: {
      type: Boolean
    },
    width: {
      type: [Number, String],
      default: 250
    },
    minTime: {
      type: [String, Date, Array]
    },
    minTimeMessage: {
      type: String
    },
    maxTime: {
      type: [String, Date, Array]
    },
    maxTimeMessage: {
      type: String
    },
    validateOn: {
      type: String,
      default: "blur, input"
    }
  },
  watch: {
    selectedTime: function(newVal, oldVal) {
      this.emit();
    },
    registrationFirstAttempt: function(newVal, oldVal) {
      if (this.registrationFirstAttempt && !this.disabled) {
        this.loadValidators();
      }
    }
  },
  computed: {
    filteredDigits() {
      return filteredDigits(this.activeIndex, this.digits, this.time);
    },
    unitWidth() {
      return this.showSeconds ? 27.2 : 34;
    },
    showClearIcon: function() {
      return this.isNotEmpty(this.selectedTime) && !this.disabled;
    },
    /**
     * Dynamically build the css classes for the header element
     * @returns { A css architect object }
     */
    headerCss: function() {
      const css = new CssArchitect(`${ComponentNames.TTimepicker}__header`);
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css;
    },
    /**
     * Dynamically build the css classes for the time unit container
     * @returns { A css architect object }
     */
    timeCss: function() {
      const css = new CssArchitect(`${ComponentNames.TTimepicker}__time`);
      this.isFilled(css, { tint: 50 });
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css;
    },
    /**
     * Dynamically build the css classes for the bg element
     * @returns { A css architect object }
     */
    bgCss: function() {
      const css = new CssArchitect(`${ComponentNames.TTimepicker}__unit-bg`);
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      let singleDigitWidth = this.unitWidth;
      let offset = this.activeIndex * singleDigitWidth;
      if (this.activeIndex >= 2) {
        offset = this.activeIndex * singleDigitWidth + singleDigitWidth;
      }
      if (this.activeIndex >= 4) {
        offset = this.activeIndex * singleDigitWidth + 2 * singleDigitWidth;
      }
      css.addStyle("width", css.addPx(singleDigitWidth));
      css.addStyle("transform", `translate3d(${offset}px, 0, 0)`);
      return css;
    },
    /**
     * Dynamically build the css classes for the separator element
     * @returns { A css architect object }
     */
    separatorCss: function() {
      const css = new CssArchitect(`${ComponentNames.TTimepicker}__separator`);
      css.addStyle("width", css.addPx(this.unitWidth));
      return css;
    }
  },
  methods: {
    loadValidators() {
      if (this.minTime) {
        let minTimeMessage =
          this.minTimeMessage || `Value can't be before ${this.minTime}`;
        this.addCustomRule("MIN_TIME", minTimeMessage, this.validateMin);
      }
      if (this.maxTime) {
        let maxTimeMessage =
          this.maxTimeMessage || `Value can't be after ${this.maxTime}`;
        this.addCustomRule("MAX_TIME", maxTimeMessage, this.validateMax);
      }
    },
    parseValue(value) {
      if (this.$_utils.check.notNull(value) && !isValid(value)) {
        if (this.$_utils.check.isString(value)) {
          value = parseISO(value);
        }
      }
      if (this.$_utils.check.notNull(value) && isValid(value)) {
        // check if epoch
        if (this.$_utils.check.isNumber(value)) {
          let epoch = value;
          // sets the date to the epoch
          value = new Date();
          value.setTime(epoch);
        }
      }
      return value;
    },
    formatValue() {
      let value = this.selectedTime;
      if (this.selectedTime != null) {
        if (this.isoFormat) {
          value = this.formatISO(this.selectedTime);
        }
        if (this.unixTime) {
          value = this.selectedDate.getTime();
        }
      }
      return value;
    },
    formatISO() {
      let tzOffset = this.selectedTime.getTimezoneOffset() * 60000; //offset in milliseconds
      let selectedTime = new Date(this.selectedTime - tzOffset)
        .toISOString()
        .slice(0, -1);
      return selectedTime;
    },
    emit() {
      let value = this.formatValue();
      this.hasValue = this.isNotNull(value);
      this.$emit(this.$thisvui.events.common.input, value);
    },
    validateMin() {
      let minTime = this.minTime;
      if (!this.isNotEmpty(minTime)) {
        return false;
      }
      const isArray = Array.isArray(minTime);
      if (!isArray) {
        minTime = this.parseValue(minTime);
        let isBefore = compareAsc(this.selectedTime, minTime) === -1;
        return isBefore;
      }
      if (isArray) {
        for (let date of minTime) {
          let minTimeValue = this.parseValue(date);
          let isBefore = compareAsc(this.selectedTime, minTimeValue) === -1;
          if (isBefore) {
            return isBefore;
          }
        }
      }
      return false;
    },
    validateMax() {
      let maxTime = this.maxTime;
      if (!this.isNotEmpty(maxTime)) {
        return false;
      }
      const isArray = Array.isArray(maxTime);
      if (!isArray) {
        maxTime = this.parseValue(maxTime);
        let isBefore = compareAsc(this.selectedTime, maxTime) === 1;
        return isBefore;
      }
      if (isArray) {
        for (let date of maxTime) {
          let maxTimeValue = this.parseValue(date);
          let isBefore = compareAsc(this.selectedTime, maxTimeValue) === 1;
          if (isBefore) {
            return isBefore;
          }
        }
      }
      return false;
    },
    getDigits(number) {
      number =
        number == 0 || number.toString().length == 1
          ? "0" + number
          : number.toString();
      let digits = number.split("");
      return digits;
    },
    loadTime(init = true) {
      let value = this.value;
      if (this.$_utils.check.null(value) && init) {
        value = new Date();
      }
      value = this.parseValue(value);
      let hours = getHours(value);
      let minutes = getMinutes(value);
      let seconds = getSeconds(value);
      let timeArray = this.getDigits(hours).concat(this.getDigits(minutes));
      if (this.showSeconds) {
        timeArray = timeArray.concat(this.getDigits(seconds));
      }
      this.time = timeArray;
      this.setSelectedTime(value);
    },
    setSelectedTime(value) {
      let selectedTime = value;
      let hours = `${this.time[0]}${this.time[1]}`;
      let minutes = `${this.time[2]}${this.time[3]}`;
      selectedTime = setHours(selectedTime, parseInt(hours));
      selectedTime = setMinutes(selectedTime, parseInt(minutes));

      if (this.showSeconds) {
        let seconds = `${this.time[4]}${this.time[5]}`;
        selectedTime = setSeconds(selectedTime, parseInt(seconds));
      }

      this.selectedTime = selectedTime;
      let formattedTime = format(this.selectedTime, this.timeFormat);
      this.inputTime = formattedTime;
      this.validateOnEvent("input");
    },
    open() {
      this.loadTime(true);
      this.$refs.inputField.blur();
      this.$refs.timepicker.focus();
      this.isOpen = true;
      this.activeIndex = 0;
    },
    close(cancel) {
      let isCancelled = cancel || false;

      if (!isCancelled) {
        this.setTime();
      }
      if (this.$refs.timepicker !== undefined) {
        this.$refs.timepicker.blur();
      }
      this.isOpen = false;
    },
    setTime() {
      this.setSelectedTime(this.selectedTime);
    },
    clearSelectedTime() {
      this.selectedTime = null;
      this.inputTime = null;
      this.$refs.inputField.value = null;
      this.validateOnEvent("input");
      this.hasValue = false;
    },
    onInput() {
      this.validateOnEvent("input");
      this.emit();
    },
    onFocus() {
      this.focused = true;
      this.open();
      this.$emit(this.$thisvui.events.common.focus);
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
        clearIconWrapper.addClick(this.clearSelectedTime);
        clearIconWrapper.addChild(clearIcon);
        architect.addChild(clearIconWrapper);
      }
    },
    /**
     * Creates the input element
     */
    createInput(architect) {
      let root = architect.createDiv(this.getWrapperCss.getClasses());
      root.setStyles(this.getWrapperCss.getStyles());
      let control = architect.createDiv(this.getControlClass); // The control element

      // Creating the html input element
      let input = architect.createInput(this.getInputClass);
      input.setId(this.id);
      let inputAttrs = {
        placeholder: this.placeholder,
        value: this.inputTime,
        disabled: this.disabled,
        validationScope: this.validationScope,
        type: this.type,
        readonly: true
      };
      input.value(this.inputTime);
      input.setAttrs(inputAttrs);
      input.setRef("inputField");

      // Handling events
      input.addListeners(this.$listeners);
      input.addEvent("change", this.onChange);
      input.addInput(this.onInput);
      input.addBlur(this.onBlur);
      input.addFocus(this.onFocus);
      input.addKeyup({
        key: architect.keycode.delete,
        handler: this.clearSelectedTime
      });
      control.addChild(input);

      let labelParent = this.modern ? control : architect;
      this.createLabel(labelParent, { boxOpened: this.focused || this.isOpen });
      root.addChild(control);

      this.createClearIcon(root);
      this.createIcon(root);
      this.createStateIcon(root);
      this.createErrorHelpers(root);
      architect.addChild(root);
    },
    createTimeUnit(architect, index) {
      let timeUnit = architect.createElement(TTimeUnit);
      timeUnit.setProps({
        value: this.isNotEmpty(this.time) ? this.time[index] : null,
        index: index,
        width: this.unitWidth,
        fontSize: this.showSeconds ? 40 : 50,
        targetClass: this.themeModifier
      });
      timeUnit.addEvent("update:active-index", activeIndex => {
        this.activeIndex = activeIndex;
      });
      architect.addChild(timeUnit);
    },
    createTimeUnits(architect, firstIndex, secondIndex, addSeparator = true) {
      this.createTimeUnit(architect, firstIndex);
      this.createTimeUnit(architect, secondIndex);

      if (addSeparator) {
        let separator = architect.createDiv(this.separatorCss.getClasses());
        separator.setStyles(this.separatorCss.getStyles());
        separator.innerHTML(":");
        architect.addChild(separator);
      }
    },
    createTimepicker(architect) {
      let timepicker = architect.createDiv(ComponentNames.TTimepicker);
      timepicker.addClass("is-open", this.isOpen);
      timepicker.setRef("timepicker");

      let timepickerHeader = architect.createDiv(this.headerCss.getClasses());
      let timepickerTime = architect.createDiv(this.timeCss.getClasses());
      let flex = architect.createDiv("t-flex flex-wrap is-relative");

      this.createTimeUnits(flex, 0, 1);
      this.createTimeUnits(flex, 2, 3, this.showSeconds);
      if (this.showSeconds) {
        this.createTimeUnits(flex, 4, 5, false);
      }

      let bg = architect.createDiv(this.bgCss.getClasses());
      bg.setStyles(this.bgCss.getStyles());

      let numpad = architect.createElement(TNumpad);
      numpad.setProps({
        isOpen: this.isOpen,
        digits: this.digits,
        time: this.time,
        digitPressed: this.digitPressed,
        digitSelected: this.digitSelected,
        activeIndex: this.activeIndex,
        arrowKeys: this.arrowKeys,
        arrowClass: this.themeModifier
      });
      let hiddenInput = architect.createInput();
      hiddenInput.addAttr("type", "hidden");
      timepicker.addDirective({
        name: "click-outside",
        value: {
          exclude: ["inputField", "clear"],
          handler: () => {
            this.close(!this.isNotEmpty(this.inputTime));
          }
        }
      });
      flex.addChild(bg);
      timepickerTime.addChild(flex);
      timepicker.addChild(timepickerHeader);
      timepicker.addChild(timepickerTime);
      timepicker.addChild(numpad);
      timepicker.addChild(hiddenInput);
      timepicker.addDirective({
        name: "overlay-box",
        value: {
          showOn: this.isOpen,
          target: `${this.id}-wrapper`,
          fixTranslate: true,
          width: this.width
        }
      });
      architect.addChild(timepicker);
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getContainerClass);
    root.setId(`${this.id}-wrapper`);
    this.createInput(root);
    this.createTimepicker(root);
    return root.create();
  },
  mounted() {
    this.loadTime();
    this.$on("close", this.close);
  }
};
