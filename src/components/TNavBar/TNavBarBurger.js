import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import themes from "../../mixins/themes";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-navbar-burger",
  mixins: [common, helper, themes],
  props: {
    active: {
      type: Boolean
    },
    mobileOnly: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("navbar__burger");
      css.addClass("is-active", this.active);
      css.addClass("is-mobile-only", this.mobileOnly);
      css.isColored();
      css.addClass(this.getThemeModifiers);
      this.setupThemeModifier(css);
      css.addClass(this.targetClass);
      css.addClass(
        this.$parent.themeModifier,
        this.$parent.hasThemeModifier && !this.hasThemeModifier
      );
      css.addClass(
        "inverted",
        this.$parent.hasThemeModifier && !this.hasThemeModifier
      );
      this.setupThemeModifier(css);
      return css.getClasses();
    }
  },
  methods: {
    onClick() {
      this.$emit(this.$thisvui.events.common.click);
    },
    createLine(architect) {
      let line = architect.createSpan();
      line.addAttr("aria-hidden", "true");
      architect.addChild(line);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "a", this.getClasses);
    root.setId(this.id);
    root.addClick(this.onClick);

    this.createLine(root);
    this.createLine(root);
    this.createLine(root);
    return root.create();
  }
};
