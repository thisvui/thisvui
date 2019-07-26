import common from "../../mixins/common";
import sizes from "../../mixins/sizes";
import states from "../../mixins/states";
import colors from "../../mixins/colors";
import TModal from "../TModal/TModal";
import TIcon from "../TIcon/TIcon";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

import { ValidationBus } from "../TValidation/validation-bus.js";

export default {
  name: "t-button",
  components: { TIcon, TModal },
  inheritAttrs: false,
  mixins: [common, sizes, states, colors],
  props: {
    isText: {
      type: Boolean,
      default: false
    },
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
    isRounded: {
      type: Boolean,
      default: false
    },
    isOutlined: {
      type: Boolean,
      default: false
    },
    isInverted: {
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
    }
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
      const cssArchitect = new CssArchitect("t-button");
      cssArchitect.addClass("button", !this.isText);
      cssArchitect.addClass("is-text", this.isText);
      cssArchitect.addClass("tooltip", this.dataTooltip !== undefined);
      cssArchitect.addClass("is-rounded", this.isRounded);
      cssArchitect.addClass("is-outlined", this.isOutlined);
      cssArchitect.addClass("is-inverted", this.isInverted);
      cssArchitect.addClass("is-loading", this.isLoading);
      cssArchitect.addClass(this.targetClass, this.targetClass !== undefined);
      cssArchitect.addClass(this.tooltipClass, this.tooltipClass !== undefined);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getStateModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the confirmation modal component
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const cssArchitect = new CssArchitect("t-button-container");
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      return cssArchitect.getClasses();
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
      cssArchitect.addClass(this.confirmBtnClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the cancel button
     * @returns { A String with the chained css classes }
     */
    getCancelBtnClass: function() {
      const cssArchitect = new CssArchitect("button");
      cssArchitect.addClass(this.cancelBtnClass);
      return cssArchitect.getClasses();
    },
    getActive: function() {
      return this.active;
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
        let icon = architect.createIcon(this.iconClass);
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

        let confirmBtn = architect.createElement(
          "button",
          this.getConfirmBtnClass
        );
        confirmBtn.innerHTML(this.confirmText);
        confirmBtn.addClick(this.confirmed);
        let cancelBtn = architect.createElement(
          "button",
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
    let root = new ElementArchitect(h, "span", this.getContainerClasses);

    this.createButton(root);
    this.createModal(root);

    return root.create();
  }
};
