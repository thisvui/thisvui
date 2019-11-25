import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import TPanelHeading from "./TPanelHeading";
import TExpand from "../TAnimation/TExpand";
import themes from "../../mixins/themes";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-panel",
  mixins: [common, themes, icons, helpers],
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
    },

  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("panel");
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getHelpersModifiers);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the panel body
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const css = new CssArchitect("panel__body");
      css.addClass("is-closed is-shadowless", !this.isExpanded);
      this.isBordered(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the panel heading icon
     * @returns { A String with the chained css classes }
     */
    getIconClasses: function() {
      const css = new CssArchitect();
      css.addClass(
        this.themeModifier, this.hasThemeModifier
      );
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
    let root = new ElementArchitect(h, "div", this.getClasses);
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
      root.addClick(() => this.toggleExpanded(), this.expandable);
      root.addChild(heading);
    }

    let expand = root.createElement(TExpand);
    let body = root.createDiv(this.getBodyClasses);
    let content = root.createDiv("panel__content");

    content.setChildren(this.$slots.default);
    body.addChild(content);
    expand.addChild(body, this.isExpanded);
    root.addChild(expand);
    return root.create();
  },
  mounted() {
    this.includeBgModifiers = false;
  }
};
