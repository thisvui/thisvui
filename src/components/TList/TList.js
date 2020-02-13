import list from "../../mixins/list";
import responsive from "../../mixins/responsive";
import dimension from "../../mixins/dimension";
import common from "../../mixins/common";

import TListItem from "./TListItem";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-list",
  components: { TListItem },
  mixins: [common, list, responsive, dimension],
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  props: {
    header: {
      type: String
    },
    headerClass: {
      type: String
    },
    showHeader: {
      type: Boolean,
      default: false
    },
    isResponsive: {
      type: Boolean,
      default: true
    },
    isFullwidth: {
      type: Boolean,
      default: true
    },
    compact: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("t-list");
      css.isRelative();
      css.addClass(this.getResponsiveModifiers);
      css.addClass(this.getDimensionModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.targetClass);
      css.addClass("is-compact", this.compact);
      return css.getClasses();
    },
    getHeaderClasses: function() {
      const cssArchitect = new CssArchitect("t-list-header");
      cssArchitect.addClass(this.headerClass, this.headerClass !== undefined);
      return cssArchitect.getClasses();
    },
    getProgressClasses: function() {
      const css = new CssArchitect();
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    hasHeader: function() {
      return this.showHeader || this.header;
    }
  },
  methods: {
    createHeader(architect) {
      if (this.hasHeader) {
        let header = architect.createDiv(this.getHeaderClasses);
        if (this.checkable) {
          this.createCheckAll(header, this.getCheckAllClasses);
        }

        if (this.header) {
          let text = architect.createH(2);
          text.innerHTML(this.header);
          header.addChild(text);
        }
        if (this.$slots["header"]) {
          let slotHeader = architect
            .createSpan()
            .setChildren(this.$slots["header"]);
          header.addChild(slotHeader);
        }
        architect.addChild(header);
      }
    },
    createList(architect) {
      let ul = architect.createUl(this.getClasses);
      let transition = architect.createTransition("fade");
      this.createLoading(ul, this.getProgressClasses);
      ul.addChild(transition);

      for (let index in this.getItems) {
        let item = this.getItems[index];
        let li = architect.createLi().setKey(`${this.id}-li-${index}`);
        if (this.isCheckable(item)) {
          let listItem = architect.createElement(TListItem);
          this.createRowChecker(li, item, {
            targetClass: this.getRowCheckerClasses,
            container: listItem
          });
        }
        li.addVNodeChildren(
          this.$scopedSlots["items"]({
            item: item,
            index: index
          })
        );
        ul.addChild(li);
      }

      architect.addChild(ul);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", "t-list-container");

    this.createPaginator(
      root,
      this.isPaginated && this.isPaginatorAtTop,
      this.filtered
    );
    this.createSearch(root, this.isPaginated && !this.isPaginatorAtTop);
    this.createHeader(root);
    this.createList(root);
    this.createPaginator(root, this.isPaginated && !this.isPaginatorAtTop);

    return root.create();
  }
};
