import common from "../../mixins/common";
import icons from "../../mixins/icons";
import themes from "../../mixins/themes";
import dimension from "../../mixins/dimension";

import TIcon from "../TIcon/TIcon";

import CssArchitect from "../../utils/css-architect";
import { createElement } from "../../utils/element-architect";

export default {
  name: "t-dropdown",
  components: { TIcon },
  mixins: [common, themes, dimension, icons],
  props: {
    text: {
      type: String
    },
    icon: {
      type: String,
    },
    up: {
      type: Boolean,
      default: false
    },
    rightAligned: Boolean,
    menuWidth: Number,
    hoverable: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDropdownActive: false
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getCss: function() {
      const css = new CssArchitect("dropdown");
      css.addClass(this.getAlignmentModifiers);
      css.addClass(this.getDimensionModifiers);
      css.addClass(this.getThemeModifiers);
      this.setupThemeModifier(css, true);
      css.addClass("is-hoverable", this.hoverable);
      css.addClass("is-active", this.active || this.isDropdownActive);
      css.addStyles([this.getDimensionStyles]);
      return css;
    },
    getMenuCss: function() {
      const css = new CssArchitect("dropdown__menu");
      css.addClass("is-up", this.up);
      css.addClass("is-right", this.rightAligned);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addStyle(
        "width",
        css.addPercent(this.menuWidth),
        this.isNotNull(this.menuWidth)
      );
      return css;
    },
    getIconClasses: function() {
      const css = new CssArchitect("dropdown__icon");
      this.isColored(css, { inverted: true });
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the trigger element
     * @returns { A String with the chained css classes }
     */
    getTriggerClasses: function() {
      const css = new CssArchitect("dropdown__trigger button");
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    }
  },
  methods: {
    toggleActive() {
      if (!this.hoverable && !this.active) {
        this.isDropdownActive = !this.isDropdownActive;
      }
    },
    createIcon(architect) {
      let icon = this.up
        ? this.$thisvui.icons.arrowUp
        : this.$thisvui.icons.arrowDown;
      if(this.icon){
        icon = this.icon;
      }
      let iconEl = architect.createIcon(this.getIconClasses).setProps({
        icon: icon,
        preserveDefaults: !this.overrideDefaults
      });
      architect.addChild(iconEl);
    }
  },
  render: function(h) {
    let root = createElement(h, "nav", this.getCss.getClasses());
    root.setId(this.id);
    root.setRef("dropdown");
    root.setStyles(this.getCss.getStyles());
    let trigger = root.createDiv(this.getTriggerClasses);
    trigger.addClick(this.toggleActive);

    let text = root.createSpan().innerHTML(this.text);
    trigger.addChild(text);
    this.createIcon(trigger);
    let menu = root.createDiv(this.getMenuCss.getClasses());
    menu.setStyles(this.getMenuCss.getStyles());
    menu.setChildren(this.$slots.default);

    root.addChild(trigger);
    root.addChild(menu);

    return root.create();
  }
};
