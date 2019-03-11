import utils from "../utils/utils";
import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isHovered: {
      type: [String, Boolean]
    },
    isFocused: {
      type: [String, Boolean]
    },
    isLoading: {
      type: [String, Boolean]
    },
    disabled: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getStateModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        "is-hovered",
        utils.convert.stringToBoolean(this.isHovered)
      );
      cssArchitect.addClass(
        "is-focused",
        utils.convert.stringToBoolean(this.isFocused)
      );
      cssArchitect.addClass(
        "is-loading",
        utils.convert.stringToBoolean(this.isLoading)
      );
      return cssArchitect.getClasses();
    }
  }
};
