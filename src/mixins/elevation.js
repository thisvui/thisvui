import CssArchitect from "../utils/css-architect";

export default {
  props: {
    elevation: {
      type: Number,
      default: 1
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getElevationModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(`elevation-${this.elevation}`);
      return cssArchitect.getClasses();
    }
  }
};
