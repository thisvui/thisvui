<template>
  <div :id="id" class="this-crud-toolbar">
    <this-action
      v-if="edit && !editable"
      :confirm="confirmEdit"
      :class="getEditClasses"
      message="Are you sure?"
      @click="onEdit"
      @confirmed="onEdit"
    >
      <this-icon
        :key="id + 'edit'"
        :data-tooltip="editTooltip"
        icon="fas fa-edit"
        tooltip-class="s-tooltip-top"
      />
    </this-action>
    <this-action
      v-if="editable"
      :confirm="confirmSave"
      :scope="validateOnSave"
      :class="getSaveClasses"
      message="Are you sure?"
      @click="onSave"
      @confirmed="onSave"
    >
      <this-icon
        :key="id + 'save'"
        :data-tooltip="saveTooltip"
        icon="fas fa-save"
        tooltip-class="is-tooltip-top"
      />
    </this-action>
    <this-action
      v-if="editable"
      :confirm="confirmCancel"
      :class="getCancelClasses"
      message="Are you sure?"
      @click="onCancel"
      @confirmed="onCancel"
    >
      <this-icon
        :key="id + 'cancel'"
        :data-tooltip="cancelTooltip"
        icon="fas fa-minus-circle"
        tooltip-class="is-tooltip-top"
      />
    </this-action>
    <this-action
      v-if="!editable && remove"
      :confirm="confirmRemove"
      :class="getRemoveClasses"
      message="Are you sure?"
      @click="onRemove"
      @confirmed="onRemove"
    >
      <this-icon
        :key="id + 'remove'"
        :data-tooltip="removeTooltip"
        icon="fas fa-trash"
        tooltip-class="is-tooltip-top"
      />
    </this-action>
    <this-action
      v-if="!editable && activate"
      :confirm="confirmActivate"
      :class="getActivateClasses"
      message="Are you sure?"
      @click="onActivate"
      @confirmed="onActivate"
    >
      <this-icon
        :key="id + 'remove'"
        :data-tooltip="activateTooltip"
        icon="fas fa-check"
        class="has-text-success toolbar-button"
        tooltip-class="is-tooltip-top"
      />
    </this-action>
    <this-action
      v-if="!editable && add"
      :confirm="confirmAdd"
      :class="getAddClasses"
      message="Are you sure?"
      @click="onAdd"
      @confirmed="onAdd"
    >
      <this-icon
        :key="id + 'add'"
        :data-tooltip="addTooltip"
        icon="fas fa-plus-circle"
        class="has-text-success toolbar-button"
        tooltip-class="is-tooltip-top"
      />
    </this-action>
  </div>
</template>

<script>
import common from "../../mixins/common";
import { ThisAction } from "../ThisAction";
import ThisIcon from "../ThisIcon";
import CssArchitect from "../../utils/css-architect";

let toolbarButtonClass = "is-inline-block toolbar-button";

export default {
  name: "ThisCrudToolbar",
  components: { ThisIcon, ThisAction },
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
      this.$emit("onAdd");
    },
    onEdit() {
      this.$emit("onEdit");
    },
    onRemove() {
      this.$emit("onRemove");
    },
    onActivate() {
      this.$emit("onActivate");
    },
    onSave() {
      this.$emit("onSave");
    },
    onCancel() {
      this.$emit("onCancel");
    }
  }
};
</script>
<style></style>
