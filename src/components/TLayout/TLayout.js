import colors from "../../mixins/colors";
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
  mixins: [common, colors, overflow],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("t-layout");
      css.isRelative();
      css.addClass("row", this.row);
      this.filled(css, { removeInit: true });
      css.addClass(this.getColorsModifiers);
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
