<template>
  <span :class="containerClass">
    <span v-if="!getActive">
      <slot />
    </span>
    <a
      :id="id"
      v-if="getActive"
      ref="actionLink"
      v-bind="$attrs"
      :class="getClasses"
      :data-tooltip="dataTooltip"
      @click="onClick"
    >
      <span>
        <slot />
      </span>
      <t-icon v-if="icon" :icon="icon" :class="iconClass"></t-icon>
    </a>
    <t-modal
      v-if="showConfirmation"
      :class="getConfirmClass"
      target-class="is-small"
      :header-class="confirmHeaderClass"
      :title-class="confirmTitleClass"
      body-class="is-size-6"
      :title="dialogTitle"
      :show-modal="showConfirmModal"
      :show-footer="true"
      :show-close="false"
    >
      <p v-if="message" :class="getMessageClass">{{ message }}</p>
      <slot name="message" />
      <template slot="footer">
        <button
          :class="getConfirmBtnClass"
          @click="confirmed"
          v-text="confirmText"
        ></button>
        <button
          :class="getCancelBtnClass"
          @click="close"
          v-text="cancelText"
        ></button>
      </template>
    </t-modal>
  </span>
</template>

<script>
import { ValidationBus } from "../TValidation/validation-bus.js";
import sizes from "../../mixins/sizes";
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import TModal from "../TModal/TModal";
import TIcon from "../TIcon/TIcon";

export default {
  name: "t-action",
  components: { TIcon, TModal },
  inheritAttrs: false,
  mixins: [common, sizes, colors],
  props: {
    type: {
      type: String,
      default: "button"
    },
    validate: {
      type: [Boolean, String],
      default: false
    },
    formId: {
      type: String
    },
    scope: {
      type: String
    },
    confirm: {
      type: [Boolean, String],
      default: false
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
      type: String,
      default: "is-primary"
    },
    confirmTitleClass: {
      type: String,
      default: "has-text-white"
    },
    confirmBtnClass: {
      type: String,
      default: "is-primary"
    },
    cancelBtnClass: {
      type: String,
      default: "is-danger"
    },
    active: {
      type: [Boolean, String],
      default: true
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
    isLoading: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      showConfirmModal: false,
      triggerValidations: false
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-action");
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.targetClass, this.targetClass !== undefined);
      cssArchitect.addClass(this.tooltipClass, this.tooltipClass !== undefined);
      cssArchitect.addClass("tooltip", this.dataTooltip !== undefined);
      cssArchitect.addClass("is-loading", this.getBoolean(this.isLoading));
      switch (this.type) {
        case "button":
          cssArchitect.addClass("button");
          break;
        case "link":
          cssArchitect.addClass("link");
          break;
        default:
          throw new DOMException("action type unknown");
      }
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the confirmation modal component
     * @returns { A String with the chained css classes }
     */
    getConfirmClass: function() {
      const cssArchitect = new CssArchitect();
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
      return this.getBoolean(this.active);
    },
    /**
     * Converts the confirm prop to Boolean
     */
    showConfirmation: function() {
      return this.getBoolean(this.confirm);
    },
    /**
     * Determines if validations must be triggered
     */
    getTriggerValidations: function() {
      const validate = this.getBoolean(this.validate);
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
        this.$emit("click");
      }
    },
    /**
     * Finds the closest parent form and return the DOM element if exist
     */
    getParentForm() {
      const actionLink = this.$refs.actionLink;
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
      this.$emit("not-confirmed");
      this.showConfirmModal = false;
    },
    /**
     * Triggers and event indicating action is confirmed and close the confirmation modal
     */
    confirmed() {
      this.$emit("confirmed");
      this.showConfirmModal = false;
    }
  }
};
</script>
