import colors from "../../mixins/colors";
import gradient from "../../mixins/gradient";
import common from "../../mixins/common";
import overflow from "../../mixins/overflow";

import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-content",
  mixins: [common, colors, gradient, overflow],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("t-content");
      this.filled(css, { removeInit: true });
      css.addClass(this.getColorsModifiers);
      css.addClass(this.getGradientModifiers);
      css.addClass(this.getFlexModifiers);
      return css.getClasses();
    },
    getStyles: function() {
      return this.getOverflowModifiers;
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);
    root.setChildren(this.$slots.default);
    root.setStyles(this.getStyles);
    return root.create();
  }
};
