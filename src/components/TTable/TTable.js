import helpers from "../../mixins/helpers";
import list from "../../mixins/list";
import common from "../../mixins/common";
import TInput from "../TInput/TInput";
import TCheckbox from "../TCheckbox/TCheckbox";
import TPaginator from "../TPaginator/TPaginator";
import TExpand from "../TAnimation/TExpand";
import colors from "../../mixins/colors";
import TProgress from "../TProgress/TProgress";
import TIcon from "../TIcon/TIcon";

import { TFlex } from "../TFlex";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-table",
  components: { TIcon, TProgress, TExpand, TPaginator, TCheckbox, TInput },
  mixins: [common, list, colors, helpers],
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  props: {
    columns: Array,
    actionColumn: {
      type: Boolean,
      default: false
    },
    actionText: {
      type: String,
      default: "Actions"
    },
    simple: {
      type: Boolean,
      default: false
    },
    expandable: {
      type: Boolean,
      default: false
    },
    openedIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.arrowDown;
      }
    },
    closedIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.arrowRight;
      }
    },
    isResponsive: {
      type: Boolean,
      default: true
    },
    isBordered: {
      type: Boolean
    },
    isStriped: {
      type: Boolean
    },
    isNarrow: {
      type: Boolean
    },
    isHoverable: {
      type: Boolean,
      default: true
    },
    isFullwidth: {
      type: Boolean,
      default: true
    },
    targetClass: {
      type: String
    }
  },
  computed: {
    hasActionColumn() {
      return this.actionColumn;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("table");
      cssArchitect.isRelative();
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass("is-responsive", this.isResponsive);
      cssArchitect.addClass("is-bordered", this.isBordered);
      cssArchitect.addClass("is-striped", this.isStriped);
      cssArchitect.addClass("is-narrow", this.isNarrow);
      cssArchitect.addClass("is-hoverable", this.isHoverable);
      cssArchitect.addClass("is-fullwidth", this.isFullwidth);
      cssArchitect.addClass("is-clipped");
      cssArchitect.addClass(this.targetClass);
      this.colorize(cssArchitect, false, true);
      cssArchitect.addClass(this.getColorsModifiers);
      this.setupColorModifier(cssArchitect);
      return cssArchitect.getClasses();
    },
    getContainerClasses: function() {
      const cssArchitect = new CssArchitect("t-table-container");
      cssArchitect.isRelative();
      cssArchitect.addClass("is-fullwidth", this.isFullwidth);
      return cssArchitect.getClasses();
    },
    getTableFunctionsClasses: function() {
      const cssArchitect = new CssArchitect("t-table-functions-col");
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getThClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getTrClasses: function() {
      const cssArchitect = new CssArchitect();
      this.colorize(cssArchitect, "bg-hover", true);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getRowCheckerClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getCheckAllClasses: function() {
      const cssArchitect = new CssArchitect();
      let isLight =
        this.colorModifier == "is-light" || this.colorModifier == "is-white";
      cssArchitect.addClass("is-light", this.hasColorModifier && !isLight);
      cssArchitect.addClass("is-dark", isLight);
      cssArchitect.addClass("has-background-color", this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getProgressClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getColumns() {
      let columns = [];
      if (this.columns) {
        columns = this.columns.map(column => {
          let isString = typeof column === "string";
          let key = isString ? column : column.name;
          this.sortOrders[key] = 0;
          if (isString) {
            return { name: column, sortable: this.sortable };
          }
          if (column.sortable === undefined) {
            column.sortable = this.sortable || false;
          }
          return column;
        });
      }
      return columns;
    },
    getColspan() {
      let columnsNumber = this.columns.length;
      let additionalColumns = this.actionColumn ? 2 : 1;
      return columnsNumber + additionalColumns;
    }
  },
  data: function() {
    return {
      mappedColumns: [],
      expandedRows: []
    };
  },
  methods: {
    isExpandable(item) {
      return (
        (item && item.expandable) ||
        (item.expandable === undefined && this.expandable)
      );
    },
    isExpanded(item) {
      return this.expandedRows.includes(item);
    },
    toggleExpand(item) {
      const index = this.expandedRows.indexOf(item);
      if (index > -1) {
        this.expandedRows.splice(index, 1);
      } else {
        this.expandedRows.push(item);
      }
    },
    getFunctionColWidth(item) {
      let width = 30;
      if (this.isCheckable(item)) {
        width = width + 40;
      }
      return width;
    },
    createTableColumns(architect) {
      for (let column of this.mappedColumns) {
        let th = architect.createElement("th", this.getThClasses);
        th.setKey(column.name);
        th.addClick(() => {
          this.sortBy(column);
        });

        let content = architect.createSpan();
        let text = architect.createSpan();
        text.innerHtml(
          this.$options.filters.capitalize(column.display || column.name)
        );
        let icon = architect.createIcon("sort-icon").setProps({
          icon: this.getSortIcon(column.name)
        });
        icon.addClick(() => {
          this.sortBy(column);
        });
        content.addChild(text);
        content.addChild(icon, column.sortable);
        th.addChild(content);
        architect.addChild(th);
      }
    },
    createTableHead(architect) {
      let thead = architect.createElement("thead");
      let tr = architect.createElement("tr");
      if (this.checkable || this.expandable) {
        let th = architect.createElement("th", this.getTableFunctionsClasses);
        let flex = architect.createElement(TFlex);

        if (this.expandable) {
          let expandContainer = architect.createDiv("col-expandable");
          flex.addChild(expandContainer);
        }

        if (this.checkable) {
          this.createCheckAll(flex, this.getCheckAllClasses);
        }

        th.addChild(flex);
        tr.addChild(th);
      }

      this.createTableColumns(tr);
      if (this.$slots["header"]) {
        tr.addChildren(this.$slots["header"]);
      }
      if (this.hasActionColumn) {
        let actionColumn = architect.createElement("th", this.getThClasses);
        actionColumn.innerHtml(this.actionText);
        tr.addChild(actionColumn);
      }
      thead.addChild(thead);

      thead.addChild(tr);
      architect.addChild(thead);
    },
    createTableFoot(architect) {
      let tfoot = architect.createElement("tfoot");
      if (this.$slots["footer"]) {
        tfoot.addChildren(this.$slots["footer"]);
      }
      architect.addChild(tfoot);
    },
    createTableBody(architect) {
      let tbody = architect.createElement("tbody", "is-relative");
      this.createLoading(tbody, this.getProgressClasses);
      if (this.simple) {
        tbody.setChildren(this.$slots["items"]);
      } else {
        for (let index in this.getItems) {
          let item = this.getItems[index];
          let tr = architect.createElement("tr", this.getTrClasses);
          tr.addClick(() => this.toggleExpand(item), this.isExpandable(item));

          if (this.isCheckable(item) || this.isExpandable(item)) {
            let td = architect.createElement("td");
            const cssArchitect = new CssArchitect();
            cssArchitect.addStyle(
              "width",
              `${this.getFunctionColWidth(item)}px`
            );
            td.setStyles(cssArchitect.getStyles());

            let flex = architect.createElement(TFlex);
            if (this.isExpandable(item)) {
              let expandable = architect.createSpan("col-expandable");
              let expandIcon = architect.createIcon();
              expandIcon.setProps({
                icon: this.isExpanded(item) ? this.openedIcon : this.closedIcon,
                preserveDefaults: !this.overrideDefaults
              });
              expandable.addChild(expandIcon);
              flex.addChild(expandable);
            }

            if (this.isCheckable(item)) {
              this.createRowChecker(flex, item, {
                inputClass: this.getRowCheckerClasses,
                hasBackgroundColor: true
              });
            }
            td.addChild(flex);
            tr.addChild(td);
          }
          tr.addChildren(
            this.$scopedSlots["items"]({
              item: item,
              index: index
            })
          );
          if (this.hasActionColumn) {
            let actionColumn = architect.createElement("td");
            actionColumn.addChildren(
              this.$scopedSlots["actions"]({
                item: item,
                index: index
              })
            );
            tr.addChild(actionColumn);
          }
          tbody.addChild(tr);
          if (this.isExpandable(item)) {
            let expandableRow = architect.createElement(
              "tr",
              "t-table-expandable-row"
            );
            let expandColumn = architect.createElement(
              "td",
              "t-table-expandable-col"
            );
            expandColumn.addAttr("colspan", this.getColspan);
            let expand = architect.createElement(TExpand);
            if (this.isExpanded(item)) {
              let expandedContainer = architect.createDiv(
                "t-table-expandable-container"
              );
              let expandedContent = architect.createDiv(
                "t-table-expandable-content"
              );
              expandedContent.addChildren(
                this.$scopedSlots["detail"]({
                  item: item,
                  index: index
                })
              );
              expandedContainer.addChild(expandedContent);
              expand.addChild(expandedContainer);
            }
            expandColumn.addChild(expand);
            expandableRow.addChild(expandColumn);
            tbody.addChild(expandableRow);
          }
        }
      }

      architect.addChild(tbody);
    },
    createTable(architect) {
      let table = architect.createElement("table", this.getClasses);
      table.setId(this.id);

      this.createTableHead(table);
      this.createTableBody(table);
      this.createTableFoot(table);

      architect.addChild(table);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClasses);

    this.createSearch(root);
    this.createPaginator(root, this.isPaginated && this.isPaginatorAtTop);
    this.createTable(root);
    this.createPaginator(root, this.isPaginated && !this.isPaginatorAtTop);

    return root.create();
  },
  mounted() {
    this.mappedColumns = this.getColumns;
    this.includeBgModifiers = false;
  }
};
