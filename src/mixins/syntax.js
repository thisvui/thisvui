import CssArchitect from "../utils/css-architect";

import themes from "./themes";
import display from "./display";

export default {
  mixins: [themes, display],
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getSyntaxModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.getThemeModifiers);
      cssArchitect.addClass(this.getDisplayModifiers);
      return cssArchitect.getClasses();
    }
  }
};
