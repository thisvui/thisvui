<template>
  <div :id="id" :class="getContainerClass">
    <div v-if="label" class="has-text-weight-normal">
      <span
        v-if="labelIcon !== undefined && !labelIconRight"
        :class="getLabelIconClass"
      >
        <t-icon :icon="labelIcon"></t-icon>
      </span>
      <span :class="getLabelClass">{{ label }}</span>
      <span
        v-if="labelIcon !== undefined && labelIconRight"
        :class="getLabelIconClass"
      >
        <t-icon :icon="labelIcon"></t-icon>
      </span>
    </div>
    <div v-if="value">
      <span
        v-if="icon !== undefined && !labelIconRight"
        :class="getLabelIconClass"
      >
        <t-icon :icon="icon"></t-icon>
      </span>
      <span :class="getValueClass">{{ value }}</span>
      <span
        v-if="icon !== undefined && labelIconRight"
        :class="getLabelIconClass"
      >
        <t-icon :icon="icon"></t-icon>
      </span>
    </div>
  </div>
</template>

<script>
import utils from "../../utils/utils";
import CssArchitect from "../../utils/css-architect";
import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import TIcon from "../TIcon/TIcon";
import dimension from "../../mixins/dimension";

export default {
  name: "t-text",
  components: { TIcon },
  mixins: [common, helpers, icons, dimension],
  props: {
    name: {
      type: String
    },
    label: {
      type: String
    },
    labelClass: {
      type: String,
      default: "has-text-left"
    },
    value: {
      type: [String, Number]
    },
    valueClass: {
      type: String,
      default: "has-text-left"
    },
    icon: {
      type: String
    },
    labelIcon: {
      type: String
    },
    labelIconRight: {
      type: Boolean,
      default: false
    },
    iconClass: {
      type: String
    },
    labelIconClass: {
      type: String
    },
    containerClass: {
      type: String
    },
    transform: {
      type: String
    },
    transformValue: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const cssArchitect = new CssArchitect("t-text");
      cssArchitect.isFlexible("row", "start", "normal", false, "normal");
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass("is-centered", this.center);
      cssArchitect.addClass("has-text-weight-bold", this.bold);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.getDimensionModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the label element
     * @returns { A String with the chained css classes }
     */
    getLabelClass: function() {
      const cssArchitect = new CssArchitect("t-text-label");
      cssArchitect.addClass(this.labelClass, this.labelClass !== undefined);
      cssArchitect.addClass("is-inline-flex", this.labelIcon !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the value element
     * @returns { A String with the chained css classes }
     */
    getValueClass: function() {
      const cssArchitect = new CssArchitect("t-text-value");
      cssArchitect.addClass(this.valueClass, this.valueClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconClass: function() {
      const cssArchitect = new CssArchitect("icon is-small is-left");
      cssArchitect.addClass(this.iconClass, this.iconClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the label icon element
     * @returns { A String with the chained css classes }
     */
    getLabelIconClass: function() {
      const cssArchitect = new CssArchitect("is-small is-left is-inline-flex");
      cssArchitect.addClass(
        this.labelIconClass,
        this.labelIconClass !== undefined
      );
      return cssArchitect.getClasses();
    },
    /**
     * Maps and returns the corresponding css transform class
     * @returns { A String }
     */
    getTransformClass: function() {
      let transformClass = "";
      if (utils.check.notEmpty(this.transform)) {
        switch (this.transform) {
          case "uppercase":
            transformClass = " is-uppercase";
            break;
          case "lowercase":
            transformClass = " is-lowercase";
            break;
          case "capitalize":
            transformClass = " is-capitalized";
            break;
          default:
            transformClass = "undefined";
            break;
        }
      }
      return transformClass;
    }
  }
};
</script>
