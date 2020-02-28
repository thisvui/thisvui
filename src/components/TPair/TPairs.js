import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import screens from "../../mixins/screens";
import background from "../../mixins/background";
import dimension from "../../mixins/dimension";
import padding from "../../mixins/padding";
import margin from "../../mixins/margin";
import themes from "../../mixins/themes";
import gradient from "../../mixins/gradient";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-pairs",
  mixins: [
    common,
    screens,
    background,
    dimension,
    padding,
    margin,
    themes,
    gradient,
    helper
  ],
  props: {
    vertical: Boolean,
    rowHeight: Number
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      let baseClass = this.vertical ? "pairs--vertical" : "pairs";
      const css = new CssArchitect(baseClass);
      this.isFilled(css, { removeInit: true });
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.getBackgroundModifiers);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getGradientModifiers);
      css.addClass(this.getDimensionModifiers);
      css.addStyles([this.getAlphaModifiers]);
      css.addStyles([this.getPaddingStyles]);
      css.addStyles([this.getMarginStyles]);
      css.addStyles([this.getDimensionStyles]);
      css.addStyle(
        "--pairs-row-height",
        this.rowHeight,
        this.isNotNull(this.rowHeight) && this.vertical
      );
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
