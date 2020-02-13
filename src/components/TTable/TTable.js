import helpers from "../../mixins/helpers";
import list from "../../mixins/list";
import common from "../../mixins/common";
import themes from "../../mixins/themes";
import dimension from "../../mixins/dimension";

import TExpand from "../TAnimation/TExpand";
import { TFlex } from "../TFlex";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-table",
  components: { TExpand, TFlex },
  mixins: [common, list, themes, dimension, helpers],
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
    bordered: {
      type: Boolean
    },
    striped: {
      type: Boolean
    },
    isHoverable: {
      type: Boolean,
      default: true
    },
    containerClass: {
      type: String
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
    getCss: function() {
      const css = new CssArchitect("table");
      css.isRelative();
      css.addClass("is-responsive", this.isResponsive);
      css.addClass("is-bordered", this.bordered);
      css.addClass("striped", this.striped);
      css.addClass("is-hoverable", this.isHoverable);
      css.addClass("stripped");
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getDimensionModifiers);
      css.addClass(this.targetClass);
      css.addStyles([this.getDimensionStyles]);
      this.setupThemeModifier(css, true);
      return css;
    },
    getContainerClasses: function() {
      const css = new CssArchitect("t-table__container");
      css.isRelative();
      css.addClass("is-fullwidth", this.isFullwidth);
      css.addClass(this.containerClass);
      return css.getClasses();
    },
    getTableFunctionsClasses: function() {
      const css = new CssArchitect("table__functions");
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    getThCss: function() {
      const css = new CssArchitect();
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addStyles([this.getAlphaModifiers]);
      return css;
    },
    getTrCss: function() {
      const css = new CssArchitect();
      this.isHovered(css, { hasColor: true });
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addStyles([this.getAlphaModifiers]);
      return css;
    },
    getSortIconClasses: function() {
      const css = new CssArchitect("sort-icon");
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass("inverted", this.hasThemeModifier);
      return css.getClasses();
    },
    getRowCheckerClasses: function() {
      const css = new CssArchitect();
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    getCheckAllClasses: function() {
      const css = new CssArchitect();
      let isLight =
        this.themeModifier == "is-light" ||
        this.themeModifier == "is-white" ||
        this.themeModifier == "is-opaque";
      css.addClass("is-dark", isLight);
      css.addClass(this.themeModifier, this.hasThemeModifier && !isLight);
      return css.getClasses();
    },
    getProgressClasses: function() {
      const css = new CssArchitect();
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
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
        let th = architect.createCell(this.getThCss.getClasses(), true);
        th.setStyles(this.getThCss.getStyles());
        th.setKey(column.name);
        th.addClick(() => {
          this.sortBy(column);
        });

        let content = architect.createSpan();
        let text = architect.createSpan();
        text.innerHTML(
          this.$options.filters.capitalize(column.display || column.name)
        );
        let icon = architect.createIcon(this.getSortIconClasses).setProps({
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
      let tr = architect.createTr();
      if (this.checkable || this.expandable) {
        let th = architect.createCell(this.getTableFunctionsClasses, true);
        let flex = architect.createElement(TFlex);

        if (this.expandable) {
          let expandContainer = architect.createDiv(
            "table__column--expandable"
          );
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
        tr.addVNodeChildren(this.$slots["header"]);
      }
      if (this.hasActionColumn) {
        let actionColumn = architect.createCell(
          this.getThCss.getClasses(),
          true
        );
        actionColumn.setStyles(this.getThCss.getStyles());
        actionColumn.innerHTML(this.actionText);
        tr.addChild(actionColumn);
      }
      thead.addChild(thead);

      thead.addChild(tr);
      architect.addChild(thead);
    },
    createTableFoot(architect) {
      let tfoot = architect.createElement("tfoot");
      if (this.$slots["footer"]) {
        tfoot.addVNodeChildren(this.$slots["footer"]);
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
          let tr = architect.createTr(this.getTrCss.getClasses());
          tr.setStyles(this.getTrCss.getStyles());
          tr.addClick(() => this.toggleExpand(item), this.isExpandable(item));

          if (this.isCheckable(item) || this.isExpandable(item)) {
            let td = architect.createCell();
            const css = new CssArchitect();
            css.addStyle("width", `${this.getFunctionColWidth(item)}px`);
            td.setStyles(css.getStyles());

            let flex = architect.createElement(TFlex);
            if (this.isExpandable(item)) {
              let expandable = architect.createSpan(
                "table__column--expandable"
              );
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
                targetClass: this.getRowCheckerClasses,
                hasBackgroundColor: true
              });
            }
            td.addChild(flex);
            tr.addChild(td);
          }
          tr.addVNodeChildren(
            this.$scopedSlots["items"]({
              item: item,
              index: index
            })
          );
          if (this.hasActionColumn) {
            let actionColumn = architect.createCell();
            actionColumn.addVNodeChildren(
              this.$scopedSlots["actions"]({
                item: item,
                index: index
              })
            );
            tr.addChild(actionColumn);
          }
          tbody.addChild(tr);
          if (this.isExpandable(item)) {
            let expandableRow = architect.createTr("expandable__row");
            let expandColumn = architect.createCell("expandable__col");
            expandColumn.addAttr("colspan", this.getColspan);
            let expand = architect.createElement(TExpand);
            if (this.isExpanded(item)) {
              let expandedContainer = architect.createDiv(
                "expandable__container"
              );
              let expandedContent = architect.createDiv("expandable__content");
              expandedContent.addVNodeChildren(
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
      let tableWrapper = architect.createDiv("table__wrapper");
      let table = architect.createElement("table", this.getCss.getClasses());
      table.setStyles(this.getCss.getStyles());
      table.setId(this.id);

      this.createTableHead(table);
      this.createTableBody(table);
      this.createTableFoot(table);

      tableWrapper.addChild(table);
      architect.addChild(tableWrapper);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClasses);

    this.createPaginator(
      root,
      this.isPaginated && this.isPaginatorAtTop,
      this.filtered
    );
    this.createSearch(root, this.isPaginated && !this.isPaginatorAtTop);
    this.createTable(root);
    this.createPaginator(root, this.isPaginated && !this.isPaginatorAtTop);

    return root.create();
  },
  mounted() {
    this.mappedColumns = this.getColumns;
    this.includeBgModifiers = false;
  }
};
