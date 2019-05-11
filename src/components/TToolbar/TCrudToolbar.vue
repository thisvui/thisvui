<template>
  <div :id="id" class="t-crud-toolbar">
    <t-button
      v-if="edit && !editable"
      :confirm="confirmEdit"
      :class="getEditClasses"
      message="Are you sure?"
      @click="onEdit"
      @confirmed="onEdit"
    >
      <t-icon
        :key="id + 'edit'"
        :data-tooltip="editTooltip"
        :preserve-defaults="!overrideDefaults"
        :icon="$thisvui.icons.edit"
        tooltip-class="s-tooltip-top"
      />
    </t-button>
    <t-button
      v-if="editable"
      :confirm="confirmSave"
      :scope="validateOnSave"
      :class="getSaveClasses"
      message="Are you sure?"
      @click="onSave"
      @confirmed="onSave"
    >
      <t-icon
        :key="id + 'save'"
        :data-tooltip="saveTooltip"
        :preserve-defaults="!overrideDefaults"
        :icon="$thisvui.icons.save"
        tooltip-class="is-tooltip-top"
      />
    </t-button>
    <t-button
      v-if="editable"
      :confirm="confirmCancel"
      :class="getCancelClasses"
      message="Are you sure?"
      @click="onCancel"
      @confirmed="onCancel"
    >
      <t-icon
        :key="id + 'cancel'"
        :data-tooltip="cancelTooltip"
        :preserve-defaults="!overrideDefaults"
        :icon="$thisvui.icons.cancel"
        tooltip-class="is-tooltip-top"
      />
    </t-button>
    <t-button
      v-if="!editable && remove"
      :confirm="confirmRemove"
      :class="getRemoveClasses"
      message="Are you sure?"
      @click="onRemove"
      @confirmed="onRemove"
    >
      <t-icon
        :key="id + 'remove'"
        :data-tooltip="removeTooltip"
        :preserve-defaults="!overrideDefaults"
        :icon="$thisvui.icons.remove"
        tooltip-class="is-tooltip-top"
      />
    </t-button>
    <t-button
      v-if="!editable && activate"
      :confirm="confirmActivate"
      :class="getActivateClasses"
      message="Are you sure?"
      @click="onActivate"
      @confirmed="onActivate"
    >
      <t-icon
        :key="id + 'remove'"
        :data-tooltip="activateTooltip"
        :preserve-defaults="!overrideDefaults"
        :icon="$thisvui.icons.check"
        class="has-text-success toolbar-button"
        tooltip-class="is-tooltip-top"
      />
    </t-button>
    <t-button
      v-if="!editable && add"
      :confirm="confirmAdd"
      :class="getAddClasses"
      message="Are you sure?"
      @click="onAdd"
      @confirmed="onAdd"
    >
      <t-icon
        :key="id + 'add'"
        :data-tooltip="addTooltip"
        :preserve-defaults="!overrideDefaults"
        :icon="$thisvui.icons.add"
        class="has-text-success toolbar-button"
        tooltip-class="is-tooltip-top"
      />
    </t-button>
  </div>
</template>

<script>
import common from "../../mixins/common";
import { TButton } from "../TButton";
import TIcon from "../TIcon";
import CssArchitect from "../../utils/css-architect";

let toolbarButtonClass = "is-inline-block toolbar-button";

export default {
  name: "t-crud-toolbar",
  components: { TIcon, TButton },
  mixins: [common],
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    add: {
      type: Boolean,
      default: true
    },
    edit: {
      type: Boolean,
      default: false
    },
    remove: {
      type: Boolean,
      default: true
    },
    activate: {
      type: Boolean,
      default: false
    },
    addTooltip: {
      type: String,
      default: "Add"
    },
    editTooltip: {
      type: String,
      default: "Edit"
    },
    removeTooltip: {
      type: String,
      default: "Remove"
    },
    activateTooltip: {
      type: String,
      default: "Activate"
    },
    saveTooltip: {
      type: String,
      default: "Save"
    },
    cancelTooltip: {
      type: String,
      default: "Cancel"
    },
    confirmAdd: {
      type: Boolean,
      default: false
    },
    confirmEdit: {
      type: Boolean,
      default: false
    },
    confirmRemove: {
      type: Boolean,
      default: false
    },
    confirmActivate: {
      type: Boolean,
      default: false
    },
    confirmSave: {
      type: Boolean,
      default: false
    },
    confirmCancel: {
      type: Boolean,
      default: false
    },
    validateOnSave: {
      type: String
    },
    editClass: {
      type: String,
      default: "is-link"
    },
    saveClass: {
      type: String,
      default: "is-success"
    },
    cancelClass: {
      type: String,
      default: "is-danger"
    },
    addClass: {
      type: String,
      default: "is-link"
    },
    activateClass: {
      type: String,
      default: "is-success"
    },
    removeClass: {
      type: String,
      default: "is-danger"
    }
  },
  computed: {
    getDisabled: function() {
      return !this.editable;
    },
    /**
     * Dynamically build the css classes for the edit button
     * @returns { A String with the chained css classes }
     */
    getEditClasses: function() {
      const cssArchitect = new CssArchitect(toolbarButtonClass);
      cssArchitect.addClass(this.editClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the save button
     * @returns { A String with the chained css classes }
     */
    getSaveClasses: function() {
      const cssArchitect = new CssArchitect(toolbarButtonClass);
      cssArchitect.addClass(this.saveClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the cancel button
     * @returns { A String with the chained css classes }
     */
    getCancelClasses: function() {
      const cssArchitect = new CssArchitect(toolbarButtonClass);
      cssArchitect.addClass(this.cancelClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the add button
     * @returns { A String with the chained css classes }
     */
    getAddClasses: function() {
      const cssArchitect = new CssArchitect(toolbarButtonClass);
      cssArchitect.addClass(this.addClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the activate button
     * @returns { A String with the chained css classes }
     */
    getActivateClasses: function() {
      const cssArchitect = new CssArchitect(toolbarButtonClass);
      cssArchitect.addClass(this.activateClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the remove button
     * @returns { A String with the chained css classes }
     */
    getRemoveClasses: function() {
      const cssArchitect = new CssArchitect(toolbarButtonClass);
      cssArchitect.addClass(this.removeClass);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    onAdd() {
      this.$emit(this.$thisvui.events.crud.onAdd);
    },
    onEdit() {
      this.$emit(this.$thisvui.events.crud.onEdit);
    },
    onRemove() {
      this.$emit(this.$thisvui.events.crud.onRemove);
    },
    onActivate() {
      this.$emit(this.$thisvui.events.crud.onActivate);
    },
    onSave() {
      this.$emit(this.$thisvui.events.crud.onSave);
    },
    onCancel() {
      this.$emit(this.$thisvui.events.crud.onCancel);
    }
  }
};
</script>
<style></style>
