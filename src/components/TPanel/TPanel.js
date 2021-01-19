import dimension from "../../mixins/dimension";
import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import { ComponentNames } from "../../utils/constants";
import TPanelHeading from "./TPanelHeading";
import TExpand from "../TAnimation/TExpand";
import themes from "../../mixins/themes";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: ComponentNames.TPanel,
  mixins: [common, themes, icons, dimension, helpers],
  components: { TExpand, TPanelHeading },
  props: {
    title: {
      type: String
    },
    expandable: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: true
    },
    headingClass: {
      type: String
    },
    bodyClass: {
      type: String
    },
    showIcon: Boolean,
    iconLeft: Boolean,
    expandedIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.expand;
      }
    },
    expandedIconClass: {
      type: String
    },
    collapsedIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.collapse;
      }
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getCss: function() {
      const css = new CssArchitect(ComponentNames.TPanel);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.getDimensionModifiers);
      css.addStyles([this.getAlphaModifiers, this.getDimensionStyles]);
      this.setupThemeModifier(css, true);
      return css;
    },
    /**
     * Dynamically build the css classes for the panel body
     * @returns { A String with the chained css classes }
     */
    bodyCss: function() {
      const css = new CssArchitect(`${ComponentNames.TPanel}__body`);
      css.addClass("is-closed is-shadowless", !this.isExpanded);
      this.isBordered(css);
      css.addClass(this.bodyClass);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass(this.getBackgroundModifiers);
      return css;
    },
    /**
     * Dynamically build the css classes for the panel heading icon
     * @returns { A String with the chained css classes }
     */
    getIconClasses: function() {
      const css = new CssArchitect();
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass("inverted");
      return css.getClasses();
    }
  },
  watch: {
    expanded: function(value, oldValue) {
      this.toggleExpanded(value);
    }
  },
  data() {
    return {
      isExpanded: this.expanded,
      icon: this.expandedIcon
    };
  },
  methods: {
    /**
     * Expands or collapse the panel dynamically
     */
    toggleExpanded(expanded) {
      this.isExpanded = expanded ? expanded : !this.isExpanded;
      this.icon =
        this.expandedIcon !== undefined && this.isExpanded
          ? this.expandedIcon
          : this.collapsedIcon !== undefined && !this.isExpanded
          ? this.collapsedIcon
          : undefined;
      this.$emit(this.$thisvui.events.panel.updateExpanded, this.isExpanded);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getCss.getClasses());
    root.setId(this.id);
    if (this.title) {
      let heading = root.createElement(TPanelHeading, this.headingClass);
      heading.setProps({
        iconLib: this.iconLib,
        overrideDefaults: this.overrideDefaults,
        text: this.title,
        showIcon: this.showIcon,
        icon: this.icon,
        iconLeft: this.iconLeft,
        iconClass: this.getIconClasses
      });
      heading.setStyles(this.getAlphaModifiers);
      heading.addClick(() => this.toggleExpanded(), this.expandable);
      root.addChild(heading);
    }

    let expand = root.createElement(TExpand);
    expand.setProps({
      expanded: this.isExpanded,
      containerClass: `${ComponentNames.TPanel}__body-container`
    });
    let body = root.createDiv(this.bodyCss.getClasses());
    let content = root.createDiv(`${ComponentNames.TPanel}__content`);

    content.setChildren(this.$slots.default);
    body.addChild(content);
    expand.addChild(body);
    root.addChild(expand);
    return root.create();
  },
  mounted() {
    this.includeBgModifiers = false;
  }
};
