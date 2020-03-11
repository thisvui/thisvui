import common from "../../mixins/common";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-crud-toolbar",
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
    getToolbarBtnClass: function() {
      return "is-inline-block toolbar-button";
    },
    /**
     * Dynamically build the css classes for the edit button
     * @returns { A String with the chained css classes }
     */
    getEditClasses: function() {
      const cssArchitect = new CssArchitect(this.getToolbarBtnClass);
      cssArchitect.addClass(this.editClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the save button
     * @returns { A String with the chained css classes }
     */
    getSaveClasses: function() {
      const cssArchitect = new CssArchitect(this.getToolbarBtnClass);
      cssArchitect.addClass(this.saveClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the cancel button
     * @returns { A String with the chained css classes }
     */
    getCancelClasses: function() {
      const cssArchitect = new CssArchitect(this.getToolbarBtnClass);
      cssArchitect.addClass(this.cancelClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the add button
     * @returns { A String with the chained css classes }
     */
    getAddClasses: function() {
      const cssArchitect = new CssArchitect(this.getToolbarBtnClass);
      cssArchitect.addClass(this.addClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the activate button
     * @returns { A String with the chained css classes }
     */
    getActivateClasses: function() {
      const cssArchitect = new CssArchitect(this.getToolbarBtnClass);
      cssArchitect.addClass(this.activateClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the remove button
     * @returns { A String with the chained css classes }
     */
    getRemoveClasses: function() {
      const cssArchitect = new CssArchitect(this.getToolbarBtnClass);
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
    },
    /**
     * Creates a button
     * @param architect
     */
    createButton(
      architect,
      conditionStatement,
      { classes, icon, confirm, message, click, confirmed, tooltip, scope }
    ) {
      let btn = architect.createButton(classes);
      btn.setKey(`${this.id}-btn-${icon}`);
      btn.setProps({
        text: true,
        paddingless: true,
        confirm: confirm,
        message: message,
        dataTooltip: tooltip,
        preserveDefaults: !this.overrideDefaults,
        icon: icon
      });
      btn.addProp("scope", scope, scope !== undefined);
      btn.addClick(click, click !== undefined);
      btn.addEvent("confirmed", confirmed, confirmed !== undefined);
      architect.addChild(btn, conditionStatement);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", "t-crud-toolbar");
    root.setId(this.id);
    // Creating the edit button
    this.createButton(root, this.edit && !this.editable, {
      classes: this.getEditClasses,
      icon: this.$thisvui.icons.edit,
      confirm: this.confirmEdit,
      message: "Are you sure?",
      click: this.onEdit,
      confirmed: this.onEdit,
      tooltip: this.editTooltip
    });
    // Creating the save button
    this.createButton(root, this.editable, {
      classes: this.getSaveClasses,
      icon: this.$thisvui.icons.save,
      confirm: this.confirmSave,
      scope: this.validateOnSave,
      message: "Are you sure?",
      click: this.onSave,
      confirmed: this.onSave,
      tooltip: this.saveTooltip
    });
    // Creating the cancel button
    this.createButton(root, this.editable, {
      classes: this.getCancelClasses,
      icon: this.$thisvui.icons.cancel,
      confirm: this.confirmCancel,
      message: "Are you sure?",
      click: this.onCancel,
      confirmed: this.onCancel,
      tooltip: this.cancelTooltip
    });
    // Creating the remove button
    this.createButton(root, !this.editable && this.remove, {
      classes: this.getRemoveClasses,
      icon: this.$thisvui.icons.remove,
      confirm: this.confirmRemove,
      message: "Are you sure?",
      click: this.onRemove,
      confirmed: this.onRemove,
      tooltip: this.removeTooltip
    });
    // Creating the activate button
    this.createButton(root, !this.editable && this.activate, {
      classes: this.getActivateClasses,
      icon: this.$thisvui.icons.check,
      confirm: this.confirmActivate,
      message: "Are you sure?",
      click: this.onActivate,
      confirmed: this.onActivate,
      tooltip: this.activateTooltip
    });
    // Creating the add button
    this.createButton(root, !this.editable && this.add, {
      classes: this.getAddClasses,
      icon: this.$thisvui.icons.add,
      confirm: this.confirmAdd,
      message: "Are you sure?",
      click: this.onAdd,
      confirmed: this.onAdd,
      tooltip: this.addTooltip
    });
    return root.create();
  }
};
