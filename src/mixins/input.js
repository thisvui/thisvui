import validation from "./validation";
import states from "./states";
import sizes from "./sizes";
import helpers from "./helpers";
import common from "./common";
import icons from "./icons";
import utils from "../utils/utils";
import CssArchitect from "../utils/css-architect";
import colors from "./colors";
import display from "./display";

export default {
  mixins: [common, validation, display, colors, states, sizes, helpers, icons],
  props: {
    name: {
      type: String
    },
    label: {
      type: String
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
    inputClass: {
      type: String
    },
    labelClass: {
      type: String,
      default: "has-text-left"
    },
    containerClass: {
      type: String
    },
    iconClass: {
      type: String
    },
    labelIconClass: {
      type: String
    },
    transform: {
      type: String
    },
    transformValue: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    dataTooltip: {
      type: String,
      default: ""
    },
    removeLabel: {
      type: Boolean,
      default: false
    },
    isHorizontal: {
      type: Boolean,
      default: false
    },
    isStatic: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: false,
      formId: ""
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the field div
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const cssArchitect = new CssArchitect("field");
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass("is-horizontal", this.isHorizontal);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getTargetClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.getTransformClass);
      cssArchitect.addClass(this.getDisplayModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(
        this.inputClass,
        this.isNotNullOrUndefined(this.inputClass) && this.errors.length === 0
      );
      cssArchitect.addClass(this.stateClass, this.stateClass !== undefined);
      this.colorize(cssArchitect, "border-5", true);
      this.colorize(cssArchitect, "shadow");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
      this.setupColorModifier(cssArchitect);
      cssArchitect.addClass("is-primary", !this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the select element
     * @returns { A String with the chained css classes }
     */
    getSelectClass: function() {
      const cssArchitect = new CssArchitect("select is-fullwidth");
      cssArchitect.addClass(this.getSizesModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the input element
     * @returns { A String with the chained css classes }
     */
    getInputClass: function() {
      const cssArchitect = new CssArchitect("input is-fullwidth");
      cssArchitect.addClass("is-static", this.isStatic);
      cssArchitect.addClass(this.getTargetClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the textarea element
     * @returns { A String with the chained css classes }
     */
    getTextareaClass: function() {
      const cssArchitect = new CssArchitect("textarea");
      cssArchitect.addClass(this.getTargetClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the checkbox/radio element
     * @returns { A String with the chained css classes }
     */
    getCheckradioClass: function() {
      const cssArchitect = new CssArchitect("is-checkradio");
      cssArchitect.addClass(this.getDisplayModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(
        this.inputClass,
        this.isNotNullOrUndefined(this.inputClass) && this.errors.length === 0
      );
      cssArchitect.addClass(this.stateClass, this.stateClass !== undefined);
      cssArchitect.addClass(this.getColorsModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the checkbox switch element
     * @returns { A String with the chained css classes }
     */
    getSwitchClass: function() {
      const cssArchitect = new CssArchitect("switch");
      cssArchitect.addClass(this.getDisplayModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(
        this.inputClass,
        this.isNotNullOrUndefined(this.inputClass) && this.errors.length === 0
      );
      cssArchitect.addClass(this.stateClass, this.stateClass !== undefined);
      cssArchitect.addClass(this.getColorsModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the control div
     * @returns { A String with the chained css classes }
     */
    getControlClass: function() {
      const cssArchitect = new CssArchitect("control t-flex has-icons-right");
      cssArchitect.addClass("has-icons-left", this.icon !== undefined);
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
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconClass: function() {
      const cssArchitect = new CssArchitect("is-small is-left");
      this.colorize(cssArchitect, "color", true);
      cssArchitect.addClass(this.getColorsModifiers);
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
     * Dynamically adds a transform class
     * @returns { A String with the chained css classes }
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
    },
    getRemoveLabel: function() {
      return this.removeLabel;
    }
  },
  methods: {
    onBlur() {
      let result = this.validateOnEvent("blur");
      if (result && result.valid) {
        this.$emit(this.$thisvui.events.common.blur);
      }
    },
    onChange() {
      let result = this.validateOnEvent("change");
      if (result && result.valid) {
        this.$emit(this.$thisvui.events.common.change);
      }
    },
    onEnter() {
      let result = this.validateOnEvent("enter");
      if (result && result.valid) {
        this.$emit(this.$thisvui.events.common.onEnter);
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      if (document.getElementById(this.id).form) {
        this.formId = document.getElementById(this.id).form.id;
      }
      this.addValidator(); // Registers the validator
    });
    this.includeBgModifiers = false;
  },
  /**
   * Removes input validator before component destroys
   */
  beforeDestroy() {
    this.removeValidator(this.formId);
  }
};
