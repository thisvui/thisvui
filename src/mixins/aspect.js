import CssArchitect from "../utils/css-architect";

export default {
  props: {
    aspectRatio: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getAspectRatioModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        `ratio aspect--${this.aspectRatio}`,
        this.aspectRatio !== undefined
      );
      return cssArchitect.getClasses();
    }
  }
};
