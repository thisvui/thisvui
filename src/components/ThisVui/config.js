const ICONS_FA5 = {
  floatingButton: "fas fa-layer-group",
  check: "fas fa-check",
  edit: "fas fa-edit",
  save: "fas fa-save",
  remove: "fas fa-trash",
  cancel: "fas fa-minus-circle",
  add: "fas fa-plus-circle",
  search: "fas fa-search",
  upload: "fas fa-upload",
  sort: "fas fa-sort",
  sortDown: "fas fa-sort-down",
  sortUp: "fas fa-sort-up",
  arrowDown: "fas fa-angle-down",
  arrowUp: "fas fa-angle-up",
  arrowLeft: "fas fa-angle-left",
  arrowRight: "fas fa-angle-right",
  expand: "fas fa-plus-circle",
  collapse: "fas fa-minus-circle"
};

const ICONS_FA4 = {
  floatingButton: "fa fa-bars",
  check: "fa fa-check",
  edit: "fa fa-edit",
  save: "fa fa-save",
  remove: "fa fa-trash",
  cancel: "fa fa-minus-circle",
  add: "fa fa-plus-circle",
  search: "fa fa-search",
  upload: "fa fa-upload",
  sort: "fa fa-sort",
  sortDown: "fa fa-sort-down",
  sortUp: "fa fa-sort-up",
  arrowDown: "fa fa-angle-down",
  arrowUp: "fa fa-angle-up",
  arrowLeft: "fa fa-angle-left",
  arrowRight: "fa fa-angle-right",
  expand: "fa fa-plus-circle",
  collapse: "fa fa-minus-circle"
};

const ICONS_MATERIAL_DESIGN = {
  floatingButton: "layers",
  check: "check",
  edit: "edit",
  save: "save",
  remove: "remove_circle",
  cancel: "cancel",
  add: "add_circle",
  search: "search",
  upload: "cloud_upload",
  sort: "swap_vert",
  sortDown: "expand_more",
  sortUp: "expand_less",
  arrowDown: "keyboard_arrow_down",
  arrowUp: "keyboard_arrow_up",
  arrowLeft: "keyboard_arrow_left",
  arrowRight: "keyboard_arrow_right",
  expand: "add_circle",
  collapse: "remove_circle"
};

const EVENTS = {
  common: {
    click: "click",
    input: "input",
    change: "change",
    blur: "blur",
    onEnter: "on-enter"
  },
  accordion: {
    collapseOthers: "collapse-others"
  },
  modal: {
    close: "close-modal"
  },
  notification: {
    close: "close-notification"
  },
  paginator: {
    updatePage: "update-page"
  },
  crud: {
    onAdd: "on-add",
    onEdit: "on-edit",
    onRemove: "on-remove",
    onActivate: "on-activate",
    onSave: "on-save",
    onCancel: "on-cancel"
  },
  action: {
    confirmed: "confirmed",
    notConfirmed: "not-confirmed"
  },
  panel: {
    updateExpanded: "update:expanded"
  },
  file: {
    uploaded: "uploaded",
    failed: "failed"
  },
  slide: {
    clickedOutside: "clicked-outside",
    changeWidth: "change-width"
  },
  list: {
    checkRow: "check-row",
    updateCheckedRows: "update:checked-rows",
    sort: "on-sort"
  }
};

let iconsMap = new Map();
iconsMap.set("fa5", ICONS_FA5);
iconsMap.set("fa4", ICONS_FA4);
iconsMap.set("md", ICONS_MATERIAL_DESIGN);

class ThisVuiConfig {
  constructor(options) {
    this.options = options;
    this.iconLib = options.iconLib || "fa5";
    this.icons = iconsMap.get(this.iconLib);
  }

  getOptions() {
    let options = {
      iconLib: this.iconLib,
      icons: this.icons,
      dateFormat: "MM/dd/yyyy",
      enableTimePicker: false,
      events: EVENTS
    };
    let mergedIcons = { ...options.icons, ...this.options.icons };
    let merged = { ...options, ...this.options };
    merged.icons = mergedIcons;
    return merged;
  }
}

export default ThisVuiConfig;
