import helpers from "../../mixins/helpers";
import list from "../../mixins/list";
import common from "../../mixins/common";
import themes from "../../mixins/themes";
import dimension from "../../mixins/dimension";
import {ComponentNames} from "../../utils/constants";

import TExpand from "../TAnimation/TExpand";
import { TFlex } from "../TFlex";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: ComponentNames.TTable,
  components: { TExpand, TFlex },
  mixins: [common, list, themes, dimension, helpers],
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  props: {
    columns: Array,
    actionColumn: Boolean,
    actionText: {
      type: String,
      default: "Actions"
    },
    simple: Boolean,
    expandable: Boolean,
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
    fitContent: Boolean,
    bordered: Boolean,
    striped: Boolean,
    hoverable: {
      type: Boolean,
      default: true
    },
    title: String,
    containerClass: String,
    targetClass: String
  },
  data: function() {
    return {
      mappedColumns: [],
      expandedRows: []
    };
  },
  computed: {
    hasActionColumn() {
      return this.actionColumn;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      const css = new CssArchitect(ComponentNames.TTable);
      css.isRelative();
      css.addClass("is-bordered", this.bordered);
      css.addClass("striped", this.striped);
      css.addClass("is-hoverable", this.hoverable);
      css.addClass("fit-content", this.fitContent);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.targetClass);
      css.addStyles([this.getDimensionStyles]);
      this.setupThemeModifier(css, true);
      return css;
    },
    containerCss: function() {
      const css = new CssArchitect(`${ComponentNames.TTable}__container`);
      css.isRelative();
      css.addClass("is-fullwidth", this.isFullwidth);
      css.addClass(this.containerClass);
      css.addClass(this.getBackgroundModifiers);
      css.addClass(this.getDimensionModifiers);
      return css;
    },
    wrapperCss: function() {
      const css = new CssArchitect(`${ComponentNames.TTable}__wrapper`);
      css.addClass("has-header", this.headerActive);
      css.addClass("has-footer", this.footerActive);
      return css;
    },
    headingCss: function() {
      const css = new CssArchitect(`${ComponentNames.TTable}__heading`);
      css.addClass(this.headingClass, this.headingClass !== undefined);
      return css;
    },
    headingContentCss: function() {
      const css = new CssArchitect(`${ComponentNames.TTable}__heading--horizontal`);
      css.addClass("not-header", !this.hasHeading);
      return css;
    },
    footerCss: function() {
      const css = new CssArchitect(`${ComponentNames.TTable}__footer`);
      css.addClass(this.footerClass, this.footerClass !== undefined);
      return css;
    },
    functionsCss: function() {
      const css = new CssArchitect(`${ComponentNames.TTable}__functions`);
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css;
    },
    thCss: function() {
      const css = new CssArchitect();
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addStyles([this.getAlphaModifiers]);
      return css;
    },
    trCss: function() {
      const css = new CssArchitect();
      this.isHovered(css, { hasColor: true, active: !this.isEmpty });
      this.isColored(css, { active: this.isEmpty, inverted: true });
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addStyles([this.getAlphaModifiers]);
      return css;
    },
    sortIconCss: function() {
      const css = new CssArchitect("sort-icon");
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass("inverted", this.hasThemeModifier);
      return css;
    },
    rowCheckerCss: function() {
      const css = new CssArchitect();
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css;
    },
    checkAllCss: function() {
      const css = new CssArchitect();
      let isLight =
        this.themeModifier == "is-light" ||
        this.themeModifier == "is-white" ||
        this.themeModifier == "is-opaque";
      css.addClass("is-dark", isLight);
      css.addClass(this.themeModifier, this.hasThemeModifier && !isLight);
      return css;
    },
    progressCss: function() {
      const css = new CssArchitect();
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css;
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
    },
    headerActive() {
      return (
        this.hasHeading ||
        (this.paginated && this.paginatorAtTop) ||
        this.filtered
      );
    },
    footerActive() {
      return this.hasFooter || (this.paginated && !this.paginatorAtTop);
    },
    hasHeading: function() {
      return this.title || this.$slots["heading"];
    },
    hasFooter: function() {
      return this.$slots["footer"];
    }
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
    createHeading(architect) {
      if (this.headerActive) {
        let heading = architect.createDiv(this.headingCss.getClasses());
        let headingContent = architect.createDiv(
          this.headingContentCss.getClasses()
        );

        if (this.title) {
          let text = architect.createH(2);
          text.innerHTML(this.title);
          headingContent.addChild(text);
        }
        if (this.$slots["heading"]) {
          let slotHeading = architect
            .createSpan()
            .setChildren(this.$slots["heading"]);
          headingContent.addChild(slotHeading);
        }
        this.createSearch(headingContent, this.filtered);
        let pagParent = this.filtered
          ? architect.createDiv(this.headingContentCss.getClasses())
          : headingContent;
        this.createPaginator(pagParent, this.paginated && this.paginatorAtTop);
        heading.addChild(headingContent);
        heading.addChild(pagParent, this.filtered);
        architect.addChild(heading);
      }
    },
    createFooter(architect) {
      if (this.footerActive) {
        let footer = architect.createDiv(this.footerCss.getClasses());
        if (this.$slots["footer"]) {
          let slotFooter = architect
            .createSpan()
            .setChildren(this.$slots["footer"]);
          footer.addChild(slotFooter);
        }
        this.createPaginator(footer, this.paginated && !this.paginatorAtTop);
        architect.addChild(footer);
      }
    },
    createTableColumns(architect) {
      for (let column of this.mappedColumns) {
        let th = architect.createCell(this.thCss.getClasses(), true);
        th.setStyles(this.thCss.getStyles());
        th.setKey(column.name);
        th.addClick(() => {
          this.sortBy(column);
        });

        let content = architect.createSpan();
        let text = architect.createSpan();
        text.innerHTML(
          this.$options.filters.capitalize(column.display || column.name)
        );
        let icon = architect
          .createIcon(this.sortIconCss.getClasses())
          .setProps({
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
      if (this.checkable || this.expandable || this.isEmpty) {
        let th = architect.createCell(this.functionsCss.getClasses(), true);
        let flex = architect.createElement(TFlex);

        if (this.expandable) {
          let expandContainer = architect.createDiv(
            `${ComponentNames.TTable}__column--expandable`
          );
          flex.addChild(expandContainer);
        }

        if (this.checkable) {
          this.createCheckAll(flex, this.checkAllCss.getClasses());
        }

        th.addChild(flex);
        tr.addChild(th);
      }

      this.createTableColumns(tr);
      if (this.$slots["table-head"]) {
        tr.addVNodeChildren(this.$slots["table-head"]);
      }
      if (this.hasActionColumn && !this.isEmpty) {
        let actionColumn = architect.createCell(this.thCss.getClasses(), true);
        actionColumn.setStyles(this.thCss.getStyles());
        actionColumn.innerHTML(this.actionText);
        tr.addChild(actionColumn);
      }
      thead.addChild(thead);

      thead.addChild(tr);
      architect.addChild(thead);
    },
    createTableFoot(architect) {
      let tfoot = architect.createElement("tfoot");
      if (this.$slots["table-foot"]) {
        tfoot.addVNodeChildren(this.$slots["table-foot"]);
      }
      architect.addChild(tfoot);
    },
    createTableItems(architect) {
      if (this.isEmpty) {
        let tr = architect.createTr(this.trCss.getClasses());
        tr.setStyles(this.trCss.getStyles());
        let textContainer = architect.createElement(TFlex);
        textContainer.setProps({
          justifyCenter: true,
          isFullwidth: true,
          padding: "1rem"
        });
        textContainer.innerHTML(this.emptyText);
        tr.addChild(textContainer);
        architect.addChild(tr);
      } else {
        for (let index in this.getItems) {
          let item = this.getItems[index];
          let tr = architect.createTr(this.trCss.getClasses());
          tr.setStyles(this.trCss.getStyles());
          tr.addClick(() => this.toggleExpand(item), this.isExpandable(item));

          if (this.isCheckable(item) || this.isExpandable(item)) {
            let td = architect.createCell();
            const css = new CssArchitect();
            css.addStyle("width", `${this.getFunctionColWidth(item)}px`);
            td.setStyles(css.getStyles());

            let flex = architect.createElement(TFlex);
            if (this.isExpandable(item)) {
              let expandable = architect.createSpan(
                `${ComponentNames.TTable}__column--expandable`
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
                targetClass: this.rowCheckerCss.getClasses(),
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
          architect.addChild(tr);
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
            architect.addChild(expandableRow);
          }
        }
      }
    },
    createTableBody(architect) {
      let tbody = architect.createElement("tbody", "is-relative");
      this.createLoading(tbody, this.progressCss.getClasses());
      if (this.simple) {
        tbody.setChildren(this.$slots["items"]);
      } else {
        this.createTableItems(tbody);
      }
      architect.addChild(tbody);
    },
    createTable(architect) {
      let tableWrapper = architect.createDiv(this.wrapperCss.getClasses());
      let table = architect.createElement("table", this.css.getClasses());
      table.setStyles(this.css.getStyles());
      table.setId(this.id);

      this.createTableHead(table);
      this.createTableBody(table);
      this.createTableFoot(table);

      tableWrapper.addChild(table);
      architect.addChild(tableWrapper);
    }
  },
  render: function(h) {
    let root = new createDiv(h, this.containerCss.getClasses());

    this.createHeading(root);
    this.createTable(root);
    this.createFooter(root);

    return root.create();
  },
  mounted() {
    this.mappedColumns = this.getColumns;
    this.includeBgModifiers = false;
  }
};
