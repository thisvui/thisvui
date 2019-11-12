import dimension from "../../mixins/dimension";
import flex from "../../mixins/flex";
import alignment from "../../mixins/alignment";
import background from "../../mixins/background";
import overflow from "../../mixins/overflow";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: "t-flex",
  mixins: [flex, dimension, alignment, background, overflow],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getCss: function() {
      const css = new CssArchitect("t-flex");
      css.addClass(this.getFlexModifiers);
      css.addClass(this.getDimensionModifiers);
      css.addClass(this.getAlignmentModifiers);
      css.addClass(this.getBackgroundModifiers);
      css.addClass(this.getOverflowModifiers);
      css.addStyles([this.getFlexStyles, this.getDimensionStyles]);
      return css;
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getCss.getClasses());
    root.setStyles(this.getCss.getStyles());
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
