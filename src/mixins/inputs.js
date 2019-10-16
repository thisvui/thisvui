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
    },
    iconLeft: {
      type: Boolean
    },
    iconRight: {
      type: Boolean
    },
    showStateIcon: Boolean,
    compact: Boolean,
    classic: Boolean,
    transparent: Boolean,
    coloredText: Boolean
  },
  data() {
    return {
      formId: "",
      hasValue: false,
      focused: false
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the field div
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const cssArchitect = new CssArchitect("group");
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass("is-horizontal", this.isHorizontal);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the control div
     * @returns { A String with the chained css classes }
     */
    getWrapperClass: function() {
      const cssArchitect = new CssArchitect(
        "group__wrapper"
      );
      this.borderedElement(cssArchitect);
      cssArchitect.addClass("focused", this.focused);
      cssArchitect.addClass("transparent", this.transparent);
      cssArchitect.addClass(this.getTargetClass);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
      this.setupColorModifier(cssArchitect);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the control div
     * @returns { A String with the chained css classes }
     */
    getControlClass: function() {
      const cssArchitect = new CssArchitect(
        "control"
      );
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the label element
     * @returns { A String with the chained css classes }
     */
    getLabelClass: function() {
      const cssArchitect = new CssArchitect("label");
      cssArchitect.addClass("has-value", this.hasValue);
      cssArchitect.addClass(this.labelClass, this.isNotNull(this.labelClass));
      cssArchitect.addClass("is-inline-flex", this.isNotNull(this.labelIcon));
      cssArchitect.addClass("input-icon-left", this.isNotNull(this.icon) && this.iconPosition.left);
      cssArchitect.addClass("colored");
      cssArchitect.addClass(this.colorModifier, (this.focused || this.hasValue) && this.hasColorModifier);
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
        this.isNotNull(this.inputClass) && this.errors.length === 0
      );
      cssArchitect.addClass(this.stateClass, this.stateClass !== undefined);
      cssArchitect.addClass("colored", this.coloredText);
      cssArchitect.addClass(this.getColorsModifiers, this.coloredText);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the input element
     * @returns { A String with the chained css classes }
     */
    getInputClass: function() {
      const cssArchitect = new CssArchitect("input");
      cssArchitect.isFullwidth();
      cssArchitect.addClass("compact", this.compact);
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
     * Dynamically build the css classes for the textarea element
     * @returns { A String with the chained css classes }
     */
    getTextareaClass: function() {
      const cssArchitect = new CssArchitect("textarea");
      cssArchitect.isFullwidth();
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
        this.isNotNull(this.inputClass) && this.errors.length === 0
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
        this.isNotNull(this.inputClass) && this.errors.length === 0
      );
      cssArchitect.addClass(this.stateClass, this.stateClass !== undefined);
      cssArchitect.addClass(this.getColorsModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconClass: function() {
      const cssArchitect = new CssArchitect("is-left");
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
    },
    iconPosition(){
      let left = this.iconLeft
      let right = this.iconRight
      if((!left && !right) || (left && right)){
        left = false
        right = true
      }
      return { left, right}
    }
  },
  methods: {
    getInputValue() {
      let value = this.$refs.inputField.value;
      return value;
    },
    getHasValue() {
      return this.isNotEmpty(this.getInputValue());
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      let result = this.validateOnEvent("blur");
      if (result && result.valid) {
        this.$emit(this.$thisvui.events.common.blur);
      }
      this.focused = false;
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
      let result = this.validateOnEvent("enter");
      if (result && result.valid) {
        this.$emit(this.$thisvui.events.common.onEnter);
      }
    },
    onInput() {
      let value = this.getInputValue();
      let result = this.validateOnEvent("input");
      // Transforms the value if transform is active
      if (this.transformValue && this.isNotEmpty(this.transform)) {
        value = utils.text.transform(value, this.transform);
      }
      this.hasValue = this.getHasValue()
      if (result && result.valid) {
        this.$emit(this.$thisvui.events.common.input, value);
      }
    },
    /**
     * Creates the field label section
     */
    createLabel(architect, cssClasses) {
      let label = architect.createLabel(this.getLabelClass);
      label.addClass(cssClasses)
      label.addAttr("for", this.id);
      label.addDomProp("innerHTML", this.label);
      architect.addChild(label, this.isNotEmpty(this.label));
    },
    /**
     * Creates the input icons
     */
    createIcon(architect, condition, cssClasses) {
      if (this.icon && condition) {
        let inputIcon = architect.createIcon(this.getIconClass);
        inputIcon.addClass(cssClasses)
        inputIcon.addProp("icon", this.icon);
        architect.addChild(inputIcon, this.icon !== undefined);
      }
    },
    /**
     * Creates the icon for the validation state
     */
    createStateIcon(architect) {
      if (
        this.showValidStateIcon &&
        !this.hideStateIcon &&
        this.showStateIcon
      ) {
        let stateIcon = architect.createIcon(this.getValidStateIconClass);
        stateIcon.addProp("icon", this.$thisvui.icons.check);
        stateIcon.addProp("preserveDefaults", !this.overrideDefaults);
        architect.addChild(stateIcon);
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
      if(this.$refs.inputField){
        this.hasValue = this.getHasValue()
      }
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
