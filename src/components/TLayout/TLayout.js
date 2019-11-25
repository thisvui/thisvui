import themes from "../../mixins/themes";
import gradient from "../../mixins/gradient";
import common from "../../mixins/common";
import overflow from "../../mixins/overflow";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-layout",
  props: {
    row: Boolean,
    minHeight: Number,
    unit: {
      type: String,
      default: "vh"
    }
  },
  mixins: [common, themes, gradient, overflow],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("t-layout");
      css.isRelative();
      css.addClass("row", this.row);
      this.isFilled(css, { removeInit: true });
      css.addClass("has-min-height", this.isNotNull(this.minHeight));
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getGradientModifiers);
      css.addClass(this.getFlexModifiers);
      return css.getClasses();
    },
    getStyles: function() {
      const css = new CssArchitect();
      css.addStyle("min-height", css.addUnit(this.minHeight, this.unit), this.isNotNull(this.minHeight));
      css.addStyles([this.getOverflowModifiers]);
      return css.getStyles();
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
