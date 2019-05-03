import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isFullheight: {
      type: Boolean
    },
    isFullwidth: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getDimensionModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-fullheight", this.isFullheight);
      cssArchitect.addClass("is-fullwidth", this.isFullwidth);
      return cssArchitect.getClasses();
    }
  }
};
