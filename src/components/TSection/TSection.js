import common from "../../mixins/common";
import sizes from "../../mixins/sizes";
import background from "../../mixins/background";
import padding from "../../mixins/padding";
import margin from "../../mixins/margin";
import helpers from "../../mixins/helpers";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: "t-section",
  mixins: [common, sizes, padding, margin, background, helpers],
  computed: {
    /**
     * Dynamically build the css classes and styles for the target element
     * @returns { A CssArchitect object }
     */
    css: function() {
      const css = new CssArchitect("section");
      css.addClass(this.getSizesModifiers);
      css.addClass(this.getBackgroundModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addStyles([this.getPaddingStyles, this.getMarginStyles]);
      return css;
    }
  },
  render: function(h) {
    let root = createDiv(h, this.css.getClasses());
    root.setId(this.id);
    root.setStyles(this.css.getStyles());
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
