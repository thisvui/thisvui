<template>
  <div :class="getClasses">
    <div :class="getBtnClasses" @click="onClick">
      <span :class="getLabelClasses" v-if="label && !showIcon">{{
        label
      }}</span>
      <t-icon
        :preserve-defaults="!overrideDefaults"
        :icon="icon"
        :target-class="getIconClasses"
        v-if="showIcon"
      ></t-icon>
    </div>
    <ul :class="getOptionsClasses" v-if="isMenu">
      <li v-for="(item, index) in items">
        <span :class="getOptionLabelClasses">{{ item.label }}</span>
        <div :class="getOptionBtnClasses">
          <t-icon :icon="item.icon"></t-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import sizes from "../../mixins/sizes";
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import CssArchitect from "../../utils/css-architect";
import TIcon from "../TIcon/TIcon";

export default {
  name: "t-floating-button",
  components: { TIcon },
  mixins: [common, sizes, colors, icons],
  props: {
    items: {
      type: Array
    },
    icon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.floatingButton;
      }
    },
    label: {
      type: String
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    isMenu: {
      type: Boolean,
      default: false
    },
    isTop: {
      type: Boolean,
      default: false
    },
    isBottom: {
      type: Boolean,
      default: true
    },
    isLeft: {
      type: Boolean,
      default: false
    },
    isRight: {
      type: Boolean,
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
      const cssArchitect = new CssArchitect("t-floating-btn");
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass("is-top", this.isTop);
      cssArchitect.addClass("is-bottom", this.isBottom);
      cssArchitect.addClass("is-right", this.isRight);
      cssArchitect.addClass("is-left", this.isLeft);
      this.setupColorModifier(cssArchitect);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the main button element
     * @returns { A String with the chained css classes }
     */
    getBtnClasses: function() {
      const cssArchitect = new CssArchitect("t-floating-btn-icon");
      this.colorize("bg-color", true);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      cssArchitect.addClass(this.btnClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the main label element
     * @returns { A String with the chained css classes }
     */
    getLabelClasses: function() {
      const cssArchitect = new CssArchitect("t-floating-btn-label");
      cssArchitect
        .isFlexible()
        .isCentered()
        .isFullwidth()
        .isFullheight();
      cssArchitect.addClass(this.labelClass);
      return cssArchitect.getClasses();
    },
    getIconClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect
        .isFlexible()
        .isCentered()
        .isFullwidth()
        .isFullheight();
      this.colorize("color-invert", true);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the options container
     * @returns { A String with the chained css classes }
     */
    getOptionsClasses: function() {
      const cssArchitect = new CssArchitect("t-floating-btn-options");
      cssArchitect.addClass(this.optionsClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the option button element
     * @returns { A String with the chained css classes }
     */
    getOptionBtnClasses: function() {
      const cssArchitect = new CssArchitect("t-floating-btn-option");
      cssArchitect.addClass(this.optionBtnClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the option label element
     * @returns { A String with the chained css classes }
     */
    getOptionLabelClasses: function() {
      const cssArchitect = new CssArchitect("t-floating-btn-option-label");
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
      this.$emit(this.$thisvui.events.common.click);
    }
  }
};
</script>
