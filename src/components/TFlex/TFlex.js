import dimension from "../../mixins/dimension";
import flex from "../../mixins/flex";
import alignment from "../../mixins/alignment";
import background from "../../mixins/background";
import overflow from "../../mixins/overflow";
import margin from "../../mixins/margin";
import padding from "../../mixins/padding";
import { ComponentNames } from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: ComponentNames.TFlex,
  mixins: [flex, dimension, alignment, background, overflow, margin, padding],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      const css = new CssArchitect(ComponentNames.TFlex);
      css.addClass(this.getFlexModifiers);
      css.addClass(this.getDimensionModifiers);
      css.addClass(this.getAlignmentModifiers);
      css.addClass(this.getBackgroundModifiers);
      css.addClass(this.getOverflowModifiers);
      css.addStyles([
        this.getFlexStyles,
        this.getDimensionStyles,
        this.getPaddingStyles,
        this.getMarginStyles
      ]);
      return css;
    }
  },
  render: function(h) {
    let root = createDiv(h, this.css.getClasses());
    root.setStyles(this.css.getStyles());
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
