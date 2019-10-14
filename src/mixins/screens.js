import CssArchitect from "../utils/css-architect";

export default {
  props: {
    tablet: Boolean,
    desktop: Boolean,
    fullHd: Boolean,
    bigDesktop: Boolean
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getScreensModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("tablet", this.tablet);
      cssArchitect.addClass("desktop", this.desktop);
      cssArchitect.addClass("full-hd", this.fullHd);
      cssArchitect.addClass("big-desktop", this.bigDesktop);
      return cssArchitect.getClasses();
    }
  }
};
