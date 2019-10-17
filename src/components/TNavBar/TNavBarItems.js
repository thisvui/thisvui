import helper from "../../mixins/helpers";
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import padding from "../../mixins/padding";
import justify from "../../mixins/justify";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: "t-navbar-items",
  mixins: [common, colors, padding, justify, helper],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getCss: function() {
      const css = new CssArchitect("navbar__items");
      css.addClass(this.$parent.colorModifier, this.$parent.hasColorModifier);
      this.setupColorModifier(css);
      css.addClass(this.getJustifyModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addStyles([this.getPaddingStyles]);
      return css;
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getCss.getClasses());
    root.setId(this.id).setChildren(this.$slots.default);
    root.setStyles(this.getCss.getStyles());
    return root.create();
  }
};
