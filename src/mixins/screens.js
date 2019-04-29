import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isWidescreen: {
      type: Boolean
    },
    isFullhd: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getScreensModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-widescreen", this.isWidescreen);
      cssArchitect.addClass("is-fullhd", this.isFullhd);
      return cssArchitect.getClasses();
    }
  }
};
