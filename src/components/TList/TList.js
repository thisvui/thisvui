import common from "../../mixins/common";
import dimension from "../../mixins/dimension";
import helpers from "../../mixins/helpers";
import list from "../../mixins/list";
import margin from "../../mixins/margin";
import padding from "../../mixins/padding";
import themes from "../../mixins/themes";
import { ComponentNames } from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

import TListItem from "./TListItem";

export default {
  name: ComponentNames.TList,
  components: { TListItem },
  mixins: [common, themes, list, dimension, margin, padding, helpers],
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
      const css = new CssArchitect(ComponentNames.TList);
      css.isRelative();
      css.addClass("has-header", this.headerActive);
      css.addClass("has-footer", this.footerActive);
      css.addClass(this.getDimensionModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.targetClass);
      css.addClass("is-compact", this.compact);
      css.addStyles([this.getDimensionStyles, this.getPaddingStyles]);
      return css;
    },
    containerCss: function() {
      const css = new CssArchitect(`${ComponentNames.TList}__container`);
      this.isFilled(css, { removeInit: true });
      css.addClass(this.getBackgroundModifiers);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getGradientModifiers);
      css.addStyles([this.getAlphaModifiers]);
      css.addStyles([this.getMarginStyles]);
      this.setupThemeModifier(css, "is-white");
      return css;
    },
    headingCss: function() {
      const css = new CssArchitect(`${ComponentNames.TList}__heading`);
      css.addClass(this.headingClass, this.headingClass !== undefined);
      return css;
    },
    headingContentCss: function() {
      const css = new CssArchitect(
        `${ComponentNames.TList}__heading--horizontal`
      );
      css.addClass("not-header", !this.hasHeading);
      return css;
    },
    headingSlotCss: function() {
      const css = new CssArchitect(`${ComponentNames.TList}__heading--slot`);
      return css;
    },
    checkAllCss: function() {
      const css = new CssArchitect();
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css;
    },
    footerCss: function() {
      const css = new CssArchitect(`${ComponentNames.TList}__footer`);
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
            .createDiv(this.headingSlotCss.getClasses())
            .setChildren(this.$slots["heading"]);
          headingContent.addChild(slotHeading);
        }
        this.createSearch(headingContent, this.filtered && !this.isEmpty);
        let pagParent = this.filtered
          ? architect.createDiv(this.headingContentCss.getClasses())
          : headingContent;
        this.createPaginator(
          pagParent,
          this.paginated && this.paginatorAtTop && !this.isEmpty
        );
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
        this.createPaginator(
          footer,
          this.paginated && !this.paginatorAtTop && !this.isEmpty
        );
        architect.addChild(footer);
      }
    },
    createList(architect) {
      let transition = architect.createTransition("fade");
      let items = architect.createDiv(this.css.getClasses());
      items.setStyles(this.css.getStyles());

      this.createLoading(items, this.progressCss.getClasses());
      if (this.isEmpty) {
        let itemContainer = architect.createDiv(
          `${ComponentNames.TList}__item-container`
        );
        itemContainer.innerHTML(this.emptyText);
        items.addChild(itemContainer);
      } else {
        for (let index in this.getItems) {
          let item = this.getItems[index];
          let itemContainer = architect
            .createDiv(`${ComponentNames.TList}__item-container`)
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
      }
      transition.addChild(items);
      architect.addChild(transition);
    }
  },
  render: function(h) {
    let root = createDiv(h, this.containerCss.getClasses());
    root.setStyles(this.containerCss.getStyles());
    this.createHeading(root);
    this.createList(root);
    this.createFooter(root);
    return root.create();
  }
};
