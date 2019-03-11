import utils from "../utils/utils";
import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isColumn: {
      type: [String, Boolean]
    },
    isRow: {
      type: [String, Boolean]
    },
    isColumnReverse: {
      type: [String, Boolean]
    },
    isRowReverse: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getFlexModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        "is-column",
        utils.convert.stringToBoolean(this.isColumn)
      );
      cssArchitect.addClass(
        "is-row",
        utils.convert.stringToBoolean(this.isRow)
      );
      cssArchitect.addClass(
        "is-column-reverse",
        utils.convert.stringToBoolean(this.isColumnReverse)
      );
      cssArchitect.addClass(
        "is-row-reverse",
        utils.convert.stringToBoolean(this.isRowReverse)
      );
      return cssArchitect.getClasses();
    }
  }
};
