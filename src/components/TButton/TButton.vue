<template>
  <span :class="getContainerClass">
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
      :disabled="disabled"
      @click="onClick"
    >
      <t-icon
        v-if="icon && !iconRight"
        :icon="icon"
        :class="iconClass"
      ></t-icon>
      <span v-if="hasSlot">
        <slot />
      </span>
      <t-icon v-if="icon && iconRight" :icon="icon" :class="iconClass"></t-icon>
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
import common from "../../mixins/common";
import sizes from "../../mixins/sizes";
import states from "../../mixins/states";
import colors from "../../mixins/colors";
import CssArchitect from "../../utils/css-architect";
import TModal from "../TModal/TModal";
import TIcon from "../TIcon/TIcon";

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
    }
  }
};
</script>
