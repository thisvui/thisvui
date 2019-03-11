import utils from "../utils/utils";
import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isResponsive: {
      type: [String, Boolean]
    },
    isMobile: {
      type: [String, Boolean]
    },
    isDesktop: {
      type: [String, Boolean]
    },
    isWidescreen: {
      type: [String, Boolean]
    },
    isFullhd: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getResponsiveModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        "is-responsive",
        utils.convert.stringToBoolean(this.isResponsive)
      );
      cssArchitect.addClass(
        "is-mobile",
        utils.convert.stringToBoolean(this.isMobile)
      );
      cssArchitect.addClass(
        "is-desktop",
        utils.convert.stringToBoolean(this.isDesktop)
      );
      cssArchitect.addClass(
        "is-widescreen",
        utils.convert.stringToBoolean(this.isWidescreen)
      );
      cssArchitect.addClass(
        "is-fullhd",
        utils.convert.stringToBoolean(this.isFullhd)
      );
      return cssArchitect.getClasses();
    }
  }
};
