import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isMobile: {
      type: Boolean
    },
    isDesktop: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getDevicesModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-mobile", this.isMobile);
      cssArchitect.addClass("is-desktop", this.isDesktop);
      return cssArchitect.getClasses();
    }
  }
};
