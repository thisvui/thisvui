import themes from "../../mixins/themes";
import gradient from "../../mixins/gradient";
import common from "../../mixins/common";
import overflow from "../../mixins/overflow";
import dimension from "../../mixins/dimension";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-layout",
  props: {
    row: Boolean,
    heightUnit: {
      type: String,
      default: "vh"
    },
    widthUnit: {
      type: String,
      default: "vw"
    }
  },
  mixins: [common, themes, gradient, dimension, overflow],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      const css = new CssArchitect("t-layout");
      css.isRelative();
      css.addClass("row", this.row);
      this.isFilled(css, { removeInit: true });
      css.addClass("has-min-height", this.isNotNull(this.minHeight));
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getGradientModifiers);
      css.addClass(this.getFlexModifiers);
      css.addStyles([this.getDimensionStyles, this.getOverflowModifiers]);
      return css;
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.css.getClasses());
    root.setId(this.id);
    root.setChildren(this.$slots.default);
    root.setStyles(this.css.getStyles());
    return root.create();
  }
};
