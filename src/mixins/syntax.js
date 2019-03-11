import CssArchitect from "../utils/css-architect";

import colors from "./colors";
import display from "./display";

export default {
  mixins: [colors, display],
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getSyntaxModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getDisplayModifiers);
      return cssArchitect.getClasses();
    }
  }
};
