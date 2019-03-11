import utils from "../utils/utils";
import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isCentered: {
      type: [String, Boolean]
    },
    isRight: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getAlignmentModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        "is-centered",
        utils.convert.stringToBoolean(this.isCentered)
      );
      cssArchitect.addClass(
        "is-right",
        utils.convert.stringToBoolean(this.isRight)
      );
      return cssArchitect.getClasses();
    }
  }
};
