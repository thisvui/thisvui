import utils from "../utils/utils";
import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isSmall: {
      type: [String, Boolean]
    },
    isMedium: {
      type: [String, Boolean]
    },
    isLarge: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getSizesModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        "is-small",
        utils.convert.stringToBoolean(this.isSmall)
      );
      cssArchitect.addClass(
        "is-medium",
        utils.convert.stringToBoolean(this.isMedium)
      );
      cssArchitect.addClass(
        "is-large",
        utils.convert.stringToBoolean(this.isLarge)
      );
      return cssArchitect.getClasses();
    }
  }
};
