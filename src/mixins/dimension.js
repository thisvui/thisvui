import utils from "../utils/utils";
import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isFullheight: {
      type: [String, Boolean]
    },
    isFullwidth: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getDimensionModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        "is-fullheight",
        utils.convert.stringToBoolean(this.isFullheight)
      );
      cssArchitect.addClass(
        "is-fullwidth",
        utils.convert.stringToBoolean(this.isFullwidth)
      );
      return cssArchitect.getClasses();
    }
  }
};
