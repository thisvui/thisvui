import common from "../../mixins/common";
import sizes from "../../mixins/sizes";
import states from "../../mixins/states";
import colors from "../../mixins/colors";
import helpers from "../../mixins/helpers";
import display from "../../mixins/display";

import TModal from "../TModal/TModal";
import TIcon from "../TIcon/TIcon";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

import { ValidationBus } from "../TValidation/validation-bus.js";

export default {
  name: "t-button",
  components: { TIcon, TModal },
  inheritAttrs: false,
  mixins: [common, sizes, states, colors, display, helpers],
  props: {
    validate: {
      type: Boolean,
      default: false
    },
    formId: {
      type: String
    },
    scope: {
      type: String
    },
    confirm: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    dialogTitle: {
      type: String,
      default: "Confirm"
    },
    message: {
      type: String,
      default: "Are you sure?"
    },
    confirmText: {
      type: String,
      default: "OK"
    },
    cancelText: {
      type: String,
      default: "Cancel"
    },
    targetClass: {
      type: String
    },
    targetStyle: {
      type: String
    },
    containerClass: {
      type: String
    },
    messageClass: {
      type: String,
      default: "has-text-dark"
    },
    confirmDialogClass: {
      type: String,
      default: "has-text-left"
    },
    confirmHeaderClass: {
      type: String
    },
    confirmTitleClass: {
      type: String
    },
    confirmBtnClass: {
      type: String,
      default: "is-primary"
    },
    cancelBtnClass: {
      type: String,
      default: "is-danger"
    },
    dataTooltip: {
      type: String
    },
    tooltipClass: {
      type: String
    },
    icon: {
      type: String
    },
    iconClass: {
      type: String
    },
    iconRight: {
      type: Boolean
    },
    view: {
      type: String
    },
    rounded: Boolean,
    outlined: Boolean,
    text: Boolean,
    inverted: Boolean,
    raised: Boolean,
    flat: Boolean,
    compact: Boolean,
    ripple: Boolean
  },
  data() {
    return {
      showConfirmModal: false,
      triggerValidations: false
    };
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("t-button button");
      css.addClass("tooltip", this.dataTooltip !== undefined);
      css.addClass("rounded", this.rounded);
      css.addClass("flat", this.flat);
      css.addClass("raised", this.raised);
      css.addClass("ripple", this.ripple);
      css.addClass("compact", this.compact);
      css.addClass("is-text colored", this.text);
      css.addClass("outlined bordered colored", this.outlined);
      css.addClass("inverted", this.inverted);
      css.addClass("filled hoverable activable", !this.outlined && !this.text);
      css.addClass("is-loading", this.isLoading);
      css.addClass("disabled", this.disabled);
      css.addClass(this.targetClass, this.targetClass !== undefined);
      css.addClass(this.tooltipClass, this.tooltipClass !== undefined);
      css.addClass(this.getColorsModifiers);
      css.addClass(this.getSizesModifiers);
      css.addClass(this.getStateModifiers);
      css.addClass(this.getHelpersModifiers);
      this.setupColorModifier(css);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the confirmation modal component
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const css = new CssArchitect("t-button-container");
      css.flexible();
      css.addClass("is-centered")
      css.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      css.addClass(this.getDisplayModifiers);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the confirmation modal component
     * @returns { A String with the chained css classes }
     */
    getConfirmClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-small");
      cssArchitect.addClass(this.confirmDialogClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the confirmation message element
     * @returns { A String with the chained css classes }
     */
    getMessageClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.messageClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the confirm button
     * @returns { A String with the chained css classes }
     */
    getConfirmBtnClass: function() {
      const cssArchitect = new CssArchitect("button");
      cssArchitect.addClass("filled cursor-pointer");
      cssArchitect.addClass(this.confirmBtnClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the cancel button
     * @returns { A String with the chained css classes }
     */
    getCancelBtnClass: function() {
      const cssArchitect = new CssArchitect("button");
      cssArchitect.addClass("filled cursor-pointer");
      cssArchitect.addClass(this.cancelBtnClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconClasses: function() {
      const css = new CssArchitect();
      css.addClass(this.colorModifier, this.hasColorModifier);
      css.addClass("inverted", !this.outlined && !this.text && !this.inverted);
      css.addClass(this.iconClass, this.isNotNull(this.iconClass));
      return css.getClasses();
    },
    getActive: function() {
      return this.active && !this.disabled;
    },
    /**
     * Converts the confirm prop to Boolean
     */
    showConfirmation: function() {
      return this.confirm;
    },
    /**
     * Determines if validations must be triggered
     */
    getTriggerValidations: function() {
      const validate = this.validate;
      let triggerValidations = this.triggerValidations;
      if (validate || this.formId || this.scope) {
        triggerValidations = true;
      }
      return triggerValidations;
    }
  },
  methods: {
    /**
     * Executed when target element is clicked
     */
    onClick() {
      if (this.$attrs.disabled || this.$attrs.readOnly) {
        return;
      }
      if (this.getTriggerValidations) {
        let formId = this.formId ? this.formId : this.getParentForm();
        if (!formId) {
          throw new DOMException(
            "Cannot validate because not parent form found"
          );
        }
        ValidationBus.validateAll(formId, this.scope);
        if (!ValidationBus.isFormValid) {
          throw new DOMException("Invalid form");
        }
      }
      // In case confirmation modal is inactive we emit the click event
      if (this.showConfirmation) {
        this.showConfirm();
      } else {
        this.$emit(this.$thisvui.events.common.click);
        if (this.view) {
          this.$router.push({ name: this.view });
        }
      }
    },
    /**
     * Finds the closest parent form and return the DOM element if exist
     */
    getParentForm() {
      const actionLink = this.$refs.button;
      let form = actionLink.closest("form");
      return form ? form.id : undefined;
    },
    /**
     * Open the confirmation modal
     */
    showConfirm() {
      this.showConfirmModal = true;
    },
    /**
     * Close the confirmation modal
     */
    close() {
      this.$emit(this.$thisvui.events.action.notConfirmed);
      this.showConfirmModal = false;
    },
    /**
     * Triggers and event indicating action is confirmed and close the confirmation modal
     */
    confirmed() {
      this.$emit(this.$thisvui.events.action.confirmed);
      this.showConfirmModal = false;
      if (this.view) {
        this.$router.push({ name: this.view });
      }
    },
    /**
     * Creates the button icon
     */
    createButtonIcon(architect, condition = false) {
      if (this.icon && condition) {
        let icon = architect.createIcon(this.getIconClasses);
        icon.setKey(`${this.id}-btn-icon`)
        icon.setProps({ icon: this.icon });
        architect.addChild(icon);
      }
    },
    /**
     * Creates the button element
     */
    createButton(architect) {
      let button = architect.createElement(
        this.getActive ? "a" : "span",
        this.getClasses
      );
      button.setId(this.id);

      if (this.getActive) {
        button.setRef("button");
        button.setAttrs(this.$attrs);
        button.setStyles(this.targetStyle);
        button.addAttr("data-tooltip", this.dataTooltip);
        button.addAttr("disabled", this.disabled);
        button.addClick(this.onClick);

        this.createButtonIcon(button, !this.iconRight);
        if (this.hasSlot) {
          let slot = architect.createSpan().setChildren(this.$slots.default);
          button.addChild(slot);
        }
        this.createButtonIcon(button, this.iconRight);
      } else {
        if (this.hasSlot) {
          button.setChildren(this.$slots.default);
        }
      }
      architect.addChild(button);
    },
    /**
     * Creates the confirmation modal
     */
    createModal(architect) {
      if (this.showConfirmation) {
        let modal = architect.createElement(TModal);
        modal.setProps({
          targetClass: this.getConfirmClass,
          headerClass: this.confirmHeaderClass,
          titleClass: this.confirmTitleClass,
          bodyClass: "is-size-6",
          title: this.dialogTitle,
          showModal: this.showConfirmModal,
          showFooter: true,
          showClose: false
        });

        if (this.message) {
          let message = architect.createP(this.getMessageClass);
          message.innerHTML(this.message);
          modal.addChild(message);
        }
        if (this.$slots["message"]) {
          let messageSlot = architect.createSpan();
          messageSlot.setChildren(this.$slots["message"]);
          modal.addChild(messageSlot);
        }

        let modalFoot = architect.createSpan();
        modalFoot.setSlot("footer");

        let confirmBtn = architect.createSpan(
          this.getConfirmBtnClass
        );
        confirmBtn.innerHTML(this.confirmText);
        confirmBtn.addClick(this.confirmed);
        let cancelBtn = architect.createSpan(
          this.getCancelBtnClass
        );
        cancelBtn.innerHTML(this.cancelText);
        cancelBtn.addClick(this.close);

        modalFoot.addChild(confirmBtn);
        modalFoot.addChild(cancelBtn);
        modal.addChild(modalFoot);

        architect.addChild(modal);
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "span", this.getContainerClass);

    this.createButton(root);
    this.createModal(root);

    return root.create();
  }
};
