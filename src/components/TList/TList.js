import common from "../../mixins/common";
import dimension from "../../mixins/dimension";
import list from "../../mixins/list";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

import TListItem from "./TListItem";

export default {
  name: "t-list",
  components: { TListItem },
  mixins: [common, list, dimension],
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  props: {
    title: {
      type: String
    },
    headingClass: {
      type: String
    },
    showHeading: {
      type: Boolean,
      default: false
    },
    footerClass: {
      type: String
    },
    showFooter: {
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
    css: function() {
      const css = new CssArchitect("t-list");
      css.isRelative();
      css.addClass("has-header", this.headerActive);
      css.addClass("has-footer", this.footerActive);
      css.addClass(this.getDimensionModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.targetClass);
      css.addClass("is-compact", this.compact);
      css.addStyles([this.getDimensionStyles]);
      return css;
    },
    headingCss: function() {
      const css = new CssArchitect("t-list__heading");
      css.addClass(this.headingClass, this.headingClass !== undefined);
      return css;
    },
    headingContentCss: function() {
      const css = new CssArchitect("t-list__heading--horizontal");
      css.addClass("not-header", !this.hasHeading);
      return css;
    },
    checkAllCss: function() {
      const css = new CssArchitect();
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css;
    },
    footerCss: function() {
      const css = new CssArchitect("t-list__footer");
      css.addClass(this.footerClass, this.footerClass !== undefined);
      return css;
    },
    progressCss: function() {
      const css = new CssArchitect();
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css;
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
      return this.showHeading && (this.title || this.$slots["heading"]);
    },
    hasFooter: function() {
      return this.showFooter && this.$slots["footer"];
    }
  },
  methods: {
    createHeading(architect) {
      if (this.headerActive) {
        let heading = architect.createDiv(this.headingCss.getClasses());
        let headingContent = architect.createDiv(
          this.headingContentCss.getClasses()
        );
        if (this.checkable) {
          this.createCheckAll(headingContent, this.checkAllCss.getClasses());
        }

        if (this.title && this.showHeading) {
          let text = architect.createH(2);
          text.innerHTML(this.title);
          headingContent.addChild(text);
        }
        if (this.$slots["heading"] && this.showHeading) {
          let slotHeading = architect
            .createDiv()
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
        if (this.$slots["footer"] && this.showFooter) {
          let slotFooter = architect
            .createDiv()
            .setChildren(this.$slots["footer"]);
          footer.addChild(slotFooter);
        }
        this.createPaginator(footer, this.paginated && !this.paginatorAtTop);
        architect.addChild(footer);
      }
    },
    createList(architect) {
      let transition = architect.createTransition("fade");
      let items = architect.createDiv(this.css.getClasses());
      items.setStyles(this.css.getStyles());

      this.createLoading(items, this.progressCss.getClasses());
      for (let index in this.getItems) {
        let item = this.getItems[index];
        let itemContainer = architect
          .createDiv("t-list__item-container")
          .setKey(`${this.id}-item-${index}`);
        if (this.isCheckable(item)) {
          this.createRowChecker(itemContainer, item, {
            targetClass: this.getRowCheckerClasses
          });
        }

        itemContainer.addVNodeChildren(
          this.$scopedSlots["items"]({
            item: item,
            index: index
          })
        );
        items.addChild(itemContainer);
      }
      transition.addChild(items);
      architect.addChild(transition);
    }
  },
  render: function(h) {
    let root = createDiv(h, "t-list__container");
    this.createHeading(root);
    this.createList(root);
    this.createFooter(root);

    return root.create();
  }
};
