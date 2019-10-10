import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import screens from "../../mixins/screens";
import background from "../../mixins/background";
import dimension from "../../mixins/dimension";
import padding from "../../mixins/padding";
import margin from "../../mixins/margin";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-container",
  mixins: [common, screens, background, dimension, padding, margin, helper],
  props: {
    fluid: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      const css = new CssArchitect("container");
      css.addClass("fluid", this.fluid);
      css.addClass(this.getScreensModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.getBackgroundModifiers);
      css.addStyles([this.getPaddingStyles]);
      css.addStyles([this.getMarginStyles]);
      css.addStyles([this.getDimensionStyles]);
      return css;
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.css.getClasses());
    root.setId(this.id);
    root.setStyles(this.css.getStyles());
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
