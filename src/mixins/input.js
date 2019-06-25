import validation from "./validation";
import states from "./states";
import sizes from "./sizes";
import helpers from "./helpers";
import common from "./common";
import icons from "./icons";
import utils from "../utils/utils";
import colors from "./colors";
import display from "./display";

import CssArchitect from "../utils/css-architect";

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
    },
    hideStateIcon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
     * Dynamically build the css classes for the icon when value is valid
     * @returns { A String with the chained css classes }
     */
    getValidStateIconClass: function() {
      const cssArchitect = new CssArchitect("is-small is-right");
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
      const cssArchitect = new CssArchitect("is-left is-inline-flex");
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
    },
    showValidStateIcon: function() {
      if (!this.hasRules) {
        return false;
      }
      return this.getValidationPassed;
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
    },
    onKeyup(event) {
      if (event.keyCode === 13) {
        let result = this.validateOnEvent("enter");
        if (result && result.valid) {
          this.$emit(this.$thisvui.events.common.onEnter);
        }
      }
    },
    /**
     * Creates the field label section
     */
    createLabel(architect) {
      let classes = ["field-label", "is-normal", "t-flex"];
      if (this.labelIconRight) {
        classes.push("is-row-reverse");
        classes.push("is-right");
      }
      let root = architect.createDiv(classes.join(" "));
      if (this.labelIcon) {
        let icon = root.createIcon(this.getLabelIconClass);
        icon.addProp("icon", this.labelIcon);
        root.addChild(icon, this.labelIcon);
      }
      let label = root.createLabel(this.getLabelClass);
      label.addAttr("for", this.id);
      label.addDomProp("innerHTML", this.label);

      root.addChild(label);
      architect.addChild(root, this.label);
    },
    /**
     * Creates the input icons
     */
    createIcons(architect, createStateIcon = true) {
      // Creating the icon for the input
      if (this.icon) {
        let inputIcon = architect.createIcon(this.getIconClass);
        inputIcon.addProp("icon", this.icon);
        architect.addChild(inputIcon, this.icon);
      }

      // Creating the icon to display when validation passed
      if (this.showValidStateIcon && !this.hideStateIcon && createStateIcon) {
        let inputIconRight = architect.createIcon(this.getValidStateIconClass);
        inputIconRight.addProp("icon", this.$thisvui.icons.check);
        inputIconRight.addProp("preserveDefaults", !this.overrideDefaults);
        architect.addChild(inputIconRight);
      }
    },
    /**
     * Creates the error message helpers
     */
    createErrorHelpers(architect) {
      for (let error of this.errors) {
        let help = architect.createP("help is-danger");
        help.setKey(error);
        help.addAttr("msg", error);
        help.addAttr("msg-position", this.msgPosition);
        architect.addChild(help);
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      let el = document.getElementById(this.id);
      if (el && el.form) {
        this.formId = el.form.id;
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
