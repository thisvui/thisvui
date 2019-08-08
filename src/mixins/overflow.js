import CssArchitect from "../utils/css-architect";

export default {
  props: {
    overflowX: {
      type: String
    },
    overflowY: {
      type: String
    },
    removeOverflow: {
      type: Boolean
    },
    isColumnReverse: {
      type: Boolean
    },
    isRowReverse: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getOverflowModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addStyle("--overflow-x", this.overflowX, !this.removeOverflow);
      cssArchitect.addStyle("--overflow-y", this.overflowY, !this.removeOverflow);
      cssArchitect.addStyle("--overflow-x", "unset", this.removeOverflow);
      cssArchitect.addStyle("--overflow-y", "unset", this.removeOverflow);
      return cssArchitect.getStyles();
    }
  }
};
