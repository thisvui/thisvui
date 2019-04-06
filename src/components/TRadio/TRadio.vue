<template>
  <div :id="id" :class="getContainerClass">
    <template v-for="(val, index) in items">
      <input
        :class="getClasses"
        :id="`${id}${index}`"
        :key="`${id}${index}`"
        type="radio"
        :name="`${id}`"
        :checked="val.checked"
        :value="val.value"
        :disabled="disabled"
        :validation-scope="validationScope"
        @input="onInput(val.value)"
        @blur="onBlur"
        @change="onChange"
      />
      <label
        :for="`${id}${index}`"
        :key="`${id}${index}Label`"
        v-if="!getRemoveLabel"
        :class="getLabelClass"
        >{{ val.label }}</label
      >
    </template>
    <span v-if="valid" class="icon is-right has-text-success">
      <t-icon
        :preserve-defaults="!overrideDefaults"
        :icon="$thisvui.icons.check"
      ></t-icon>
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
</template>

<script>
import input from "../../mixins/input";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-radio",
  mixins: [input],
  props: {
    items: {
      type: Array
    },
    isRtl: {
      type: [Boolean, String],
      default: false
    },
    hasNoBorder: {
      type: [Boolean, String],
      default: false
    },
    hasBackgroundColor: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.getCheckradioClass);
      cssArchitect.addClass("is-rtl", this.getBoolean(this.isRtl));
      cssArchitect.addClass("has-no-border", this.getBoolean(this.hasNoBorder));
      cssArchitect.addClass(
        "has-background-color",
        this.getBoolean(this.hasBackgroundColor)
      );
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the label element
     * @returns { A String with the chained css classes }
     */
    getLabelClass: function() {
      const cssArchitect = new CssArchitect("label has-text-left");
      cssArchitect.addClass(this.labelClass, this.labelClass !== undefined);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    onInput(value) {
      this.validateOnEvent("input");
      this.$emit("input", value);
    }
  }
};
</script>
