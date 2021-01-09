import { ComponentNames } from "../utils/constants";
import validation from "./validation";
import states from "./states";
import sizes from "./sizes";
import helpers from "./helpers";
import common from "./common";
import icons from "./icons";
import utils from "../utils/utils";
import themes from "./themes";
import display from "./display";
import dimension from "./dimension";

import CssArchitect from "../utils/css-architect";

export default {
  mixins: [
    common,
    validation,
    display,
    dimension,
    themes,
    states,
    sizes,
    helpers,
    icons
  ],
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
    targetClass: {
      type: String
    },
    labelClass: {
      type: String,
      default: "text-left"
    },
    containerClass: {
      type: String
    },
    disabledClass: {
      type: String,
      default: function() {
        return this.$thisvui.disabledClass;
      }
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
    coloredText: Boolean,
    alignCenter: Boolean,
    alignLeft: Boolean,
    alignRight: Boolean
  },
  data() {
    return {
      formId: "",
      hasValue: false,
      focused: false,
      currentPopupMessage: "",
      complexValidation: false
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the field div
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const css = new CssArchitect("group");
      css.addClass(this.containerClass, this.containerClass !== undefined);
      css.addClass("is-horizontal", this.isHorizontal);
      css.addClass(this.getDimensionModifiers);
      css.addStyles([this.getDimensionStyles]);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the control div
     * @returns { A String with the chained css classes }
     */
    getWrapperCss: function() {
      const css = new CssArchitect("group__wrapper");
      this.isBordered(css, { active: !this.disabled });
      css.addClass("focused", this.focused);
      css.addClass("transparent", this.transparent);
      css.addClass("is-borderless", this.borderless);
      css.addClass(this.disabledClass, this.disabled);
      css.addClass(
        this.targetClass,
        this.isNotNull(this.targetClass) && this.errors.length === 0
      );
      css.addClass("colored", this.coloredText);

      css.addClass(this.getTransformClass);
      css.addClass(this.getDisplayModifiers);
      css.addClass(this.getSizesModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addClass(
        this.getThemeModifiers,
        !this.isNotNull(this.validationResult) ||
          (this.isNotNull(this.validationResult) && this.validationResult.valid)
      );
      css.addClass(this.stateClass, this.isNotNull(this.stateClass));
      css.addClass(this.getBackgroundModifiers);
      css.addStyles([this.getAlphaModifiers]);
      this.setupThemeModifier(css, true);
      return css;
    },
    /**
     * Dynamically build the css classes for the control div
     * @returns { A String with the chained css classes }
     */
    getControlClass: function() {
      const css = new CssArchitect("control");
      css.addClass("compact", this.compact);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the label element
     * @returns { A String with the chained css classes }
     */
    getLabelClass: function() {
      const css = new CssArchitect("label");
      css.addClass("has-value", this.hasValue);
      css.addClass(this.labelClass, this.isNotNull(this.labelClass));
      css.addClass("is-inline-flex", this.isNotNull(this.labelIcon));
      css.addClass(
        "input-icon-left",
        this.isNotNull(this.icon) && this.iconPosition.left
      );
      this.isColored(css, { shade: 25 });
      css.addClass(
        this.themeModifier,
        (this.focused || this.hasValue) && this.hasThemeModifier
      );
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the input element
     * @returns { A String with the chained css classes }
     */
    getInputClass: function() {
      const css = new CssArchitect(ComponentNames.TInput);
      css.isFullwidth();
      css.addClass("compact", this.compact);
      css.addClass("text-left", this.alignLeft);
      css.addClass("text-center", this.alignCenter);
      css.addClass("text-right", this.alignRight);
      return css.getClasses();
    },

    /**
     * Dynamically build the css classes for the select element
     * @returns { A String with the chained css classes }
     */
    getSelectClass: function() {
      const css = new CssArchitect("select is-fullwidth");
      css.addClass(this.getSizesModifiers);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the textarea element
     * @returns { A String with the chained css classes }
     */
    getTextareaClass: function() {
      const css = new CssArchitect(ComponentNames.TTextarea);
      css.isFullwidth();
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconClass: function() {
      const css = new CssArchitect("is-left");
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass(this.iconClass, this.iconClass !== undefined);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon when value is valid
     * @returns { A String with the chained css classes }
     */
    getStateIconClass: function() {
      const css = new CssArchitect("is-small is-right");
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the label icon element
     * @returns { A String with the chained css classes }
     */
    getLabelIconClass: function() {
      const css = new CssArchitect("is-left is-inline-flex");
      css.addClass(this.labelIconClass, this.labelIconClass !== undefined);
      return css.getClasses();
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
    iconPosition() {
      let left = this.iconLeft;
      let right = this.iconRight;
      if ((!left && !right) || (left && right)) {
        left = false;
        right = true;
      }
      return { left, right };
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
      this.$emit(this.$thisvui.events.common.focus);
    },
    onBlur() {
      let result = this.validateOnEvent(this.$thisvui.events.common.blur);
      if (result && result.valid) {
        this.$emit(this.$thisvui.events.common.blur);
      }
      this.focused = false;
    },
    onChange() {
      let result = this.validateOnEvent(this.$thisvui.events.common.change);
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
      let result = this.validateOnEvent(this.$thisvui.events.common.input);
      // Transforms the value if transform is active
      if (this.transformValue && this.isNotEmpty(this.transform)) {
        value = utils.text.transform(value, this.transform);
      }
      this.hasValue = this.getHasValue();
      if (result && result.valid) {
        this.$emit(this.$thisvui.events.common.input, value);
      }
    },
    allowOnlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    /**
     * Creates the field label section
     */
    createLabel(architect, { cssClasses = false, boxOpened = false } = {}) {
      let label = architect.createLabel(this.getLabelClass);
      label.addClass(cssClasses);
      label.addClass("box-opened", boxOpened);
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
        inputIcon.addClass(cssClasses);
        inputIcon.addProp("icon", this.icon);
        architect.addChild(inputIcon, this.icon !== undefined);
      }
    },
    /**
     * Creates the icon for the validation state
     */
    createStateIcon(architect) {
      let stateIconContainer = architect.createA();
      let stateIcon = stateIconContainer.createIcon(this.getStateIconClass);
      stateIcon.addProp("preserveDefaults", !this.overrideDefaults);
      if (
        utils.check.notEmpty(this.validationResult) &&
        this.validationResult.valid &&
        this.showSuccessIcon
      ) {
        stateIcon.addProp("icon", this.successIcon);
        stateIconContainer.addChild(stateIcon);
        architect.addChild(stateIconContainer);
      }
      if (
        utils.check.notEmpty(this.validationResult) &&
        !this.validationResult.valid &&
        this.showErrorIcon
      ) {
        stateIcon.addProp("icon", this.errorIcon);
        stateIconContainer.addChild(stateIcon);
        architect.addChild(stateIconContainer);
      }
    },
    /**
     * Creates the error message helpers
     */
    createErrorHelpers(architect) {
      let hasErrors = this.errors != null && this.errors.length > 0;
      if (!this.popupMessage) {
        for (let error of this.errors) {
          let help = architect.createP("t-hint is-danger");
          help.setKey(error);
          help.addAttr("msg", error);
          help.addAttr("msg-position", this.msgPosition);
          architect.addChild(help);
        }
      } else {
        if (this.hasErrors) {
          this.currentPopupMessage = this.errors[this.errors.length - 1];
        }
        architect.addDirective({
          name: "tooltip",
          value: {
            text: this.currentPopupMessage,
            event: this.popupEvent,
            top: true,
            right: true,
            cssClass: "is-danger",
            showOn: this.hasErrors
          }
        });
      }
    },
    commonMount() {
      this.$nextTick(function() {
        if (!this.complexValidation) {
          let el = document.getElementById(this.id);
          if (el && el.form) {
            this.formId = el.form.id;
          }
          if (!el.form) {
            let form = el.closest("form");
            if (form) {
              this.formId = form.id;
            }
          }
          this.addValidator(); // Registers the validator
          if (this.$refs.inputField) {
            this.hasValue = this.getHasValue();
          }
        }
      });
      this.includeBgModifiers = false;
    }
  },
  mounted() {
    this.commonMount();
  },
  /**
   * Removes input validator before component destroys
   */
  beforeDestroy() {
    this.removeValidator(this.formId);
  }
};
