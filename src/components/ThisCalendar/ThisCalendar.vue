<template>
  <div :class="getContainerClass">
    <label v-if="!getRemoveLabel" class="label has-text-left">{{
      label
    }}</label>
    <div :class="getCalendarControlClass">
      <input
        ref="inputField"
        :id="id"
        :class="getInputClass"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :validation-scope="validationScope"
        type="text"
        @input="onInput"
        @blur="onBlur"
        @change="onChange"
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
  </div>
</template>

<script>
import format from "date-fns/format";
import Flatpickr from "flatpickr";
import input from "../../mixins/input";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "ThisCalendar",
  mixins: [input],
  props: {
    value: {
      type: [String, Date]
    },
    dateFormat: {
      type: String,
      default: "d/m/Y"
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
    /**
     * Dynamically build the css classes for the calendar control element
     * @returns { A String with the chained css classes }
     */
    getCalendarControlClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.getControlClass);
      cssArchitect.addClass("is-column", this.inline);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      fp: null
    };
  },
  watch: {
    /**
     * Sets the format depending the value is an object or not
     */
    value: function() {
      if (this.value instanceof Date) {
        let formattedDate = format(this.value, "DD/MM/YYYY");
        this.fp.setDate(formattedDate, this.dateFormat);
      } else {
        this.fp.setDate(this.value, this.dateFormat);
      }
    }
  },
  mounted() {
    if (this.fp) return;
    const element = this.$refs.inputField;
    this.fp = new Flatpickr(element, {
      enableTime: this.enableTime,
      dateFormat: this.dateFormat,
      inline: this.getBoolean(this.inline),
      noCalendar: this.noCalendar,
      minDate: this.minDate ? this.minDate : false
    });
  },
  methods: {
    onInput() {
      this.validateOnEvent("input");
      this.$emit("input", this.$refs.inputField.value);
    }
  }
};
</script>
