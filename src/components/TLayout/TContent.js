import themes from "../../mixins/themes";
import gradient from "../../mixins/gradient";
import common from "../../mixins/common";
import overflow from "../../mixins/overflow";
import padding from "../../mixins/padding";
import dimension from "../../mixins/dimension";

import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-content",
  mixins: [common, themes, gradient, padding, dimension, overflow],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      const css = new CssArchitect("t-content");
      this.isFilled(css, { removeInit: true });
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getGradientModifiers);
      css.addClass(this.getFlexModifiers);
      css.addStyles([
        this.getPaddingStyles,
        this.getAlphaModifiers,
        this.getOverflowModifiers,
        this.getDimensionStyles
      ]);
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
