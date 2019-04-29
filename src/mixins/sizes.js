import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isSmall: {
      type: Boolean
    },
    isMedium: {
      type: Boolean
    },
    isLarge: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getSizesModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-small", this.isSmall);
      cssArchitect.addClass("is-medium", this.isMedium);
      cssArchitect.addClass("is-large", this.isLarge);
      return cssArchitect.getClasses();
    }
  }
};
