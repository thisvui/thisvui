import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isResponsive: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getResponsiveModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-responsive", this.isResponsive);
      return cssArchitect.getClasses();
    }
  }
};
