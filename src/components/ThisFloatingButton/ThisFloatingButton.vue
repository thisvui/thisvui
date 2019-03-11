<template>
  <div :class="getClasses">
    <div :class="getBtnClasses" @click="onClick">
      <span :class="getLabelClasses" v-if="label && !showIcon">{{
        label
      }}</span>
      <this-icon :icon="icon" v-if="getBoolean(showIcon)"></this-icon>
    </div>
    <ul :class="getOptionsClasses" v-if="getBoolean(isMenu)">
      <li v-for="(item, index) in items">
        <span :class="getOptionLabelClasses">{{ item.label }}</span>
        <div :class="getOptionBtnClasses">
          <this-icon :icon="item.icon"></this-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import sizes from "../../mixins/sizes";
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "ThisFloatingButton",
  mixins: [common, sizes, colors],
  props: {
    items: {
      type: Array
    },
    icon: {
      type: String,
      default: "fas fa-layer-group"
    },
    label: {
      type: String
    },
    showIcon: {
      type: [Boolean, String],
      default: true
    },
    isMenu: {
      type: [Boolean, String],
      default: false
    },
    isTop: {
      type: [Boolean, String],
      default: false
    },
    isBottom: {
      type: [Boolean, String],
      default: true
    },
    isLeft: {
      type: [Boolean, String],
      default: false
    },
    isRight: {
      type: [Boolean, String],
      default: true
    },
    btnClass: {
      type: String
    },
    labelClass: {
      type: String
    },
    optionsClass: {
      type: String
    },
    optionBtnClass: {
      type: String
    },
    optionLabelClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("this-floating-btn");
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass("is-top", this.isTop);
      cssArchitect.addClass("is-bottom", this.isBottom);
      cssArchitect.addClass("is-right", this.isRight);
      cssArchitect.addClass("is-left", this.isLeft);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the main button element
     * @returns { A String with the chained css classes }
     */
    getBtnClasses: function() {
      const cssArchitect = new CssArchitect("this-floating-btn-icon");
      cssArchitect.addClass(this.btnClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the main label element
     * @returns { A String with the chained css classes }
     */
    getLabelClasses: function() {
      const cssArchitect = new CssArchitect("this-floating-btn-label");
      cssArchitect.addClass(this.labelClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the options container
     * @returns { A String with the chained css classes }
     */
    getOptionsClasses: function() {
      const cssArchitect = new CssArchitect("this-floating-btn-options");
      cssArchitect.addClass(this.optionsClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the option button element
     * @returns { A String with the chained css classes }
     */
    getOptionBtnClasses: function() {
      const cssArchitect = new CssArchitect("this-floating-btn-option");
      cssArchitect.addClass(this.optionBtnClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the option label element
     * @returns { A String with the chained css classes }
     */
    getOptionLabelClasses: function() {
      const cssArchitect = new CssArchitect("this-floating-btn-option-label");
      cssArchitect.addClass(this.optionLabelClass);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      showConfirmModal: false,
      triggerValidations: false
    };
  },
  methods: {
    onClick() {
      if (this.$attrs.disabled || this.$attrs.readOnly) {
        return;
      }
      this.$emit("click");
    }
  }
};
</script>
