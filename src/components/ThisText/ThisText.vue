<template>
  <div :id="id" :class="getContainerClass">
    <div v-if="label" class="is-o">
      <span
        v-if="labelIcon !== undefined && !getBoolean(labelIconRight)"
        :class="getLabelIconClass"
      >
        <this-icon :icon="labelIcon"></this-icon>
      </span>
      <label :class="getLabelClass">{{ label }}</label>
      <span
        v-if="labelIcon !== undefined && getBoolean(labelIconRight)"
        :class="getLabelIconClass"
      >
        <this-icon :icon="labelIcon"></this-icon>
      </span>
    </div>
    <div v-if="value">
      <span
        v-if="icon !== undefined && !getBoolean(labelIconRight)"
        :class="getLabelIconClass"
      >
        <this-icon :icon="icon"></this-icon>
      </span>
      <label :class="getValueClass">{{ value }}</label>
      <span
        v-if="icon !== undefined && getBoolean(labelIconRight)"
        :class="getLabelIconClass"
      >
        <this-icon :icon="icon"></this-icon>
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
import ThisIcon from "../ThisIcon/ThisIcon";

export default {
  name: "ThisText",
  components: { ThisIcon },
  mixins: [common, helpers, icons],
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: "Confirm"
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
      type: [Boolean, String],
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
      type: [Boolean, String],
      default: true
    },
    center: {
      type: [Boolean, String],
      default: false
    },
    bold: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const cssArchitect = new CssArchitect("this-text");
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass("is-center", this.getBoolean(this.center));
      cssArchitect.addClass("is-bold", this.getBoolean(this.bold));
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the label element
     * @returns { A String with the chained css classes }
     */
    getLabelClass: function() {
      const cssArchitect = new CssArchitect("label");
      cssArchitect.addClass(this.labelClass, this.labelClass !== undefined);
      cssArchitect.addClass("is-inline-flex", this.labelIcon !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the value element
     * @returns { A String with the chained css classes }
     */
    getValueClass: function() {
      const cssArchitect = new CssArchitect("this-text-value");
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
