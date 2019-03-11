import utils from "../utils/utils";
import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isClearfix: {
      type: [String, Boolean]
    },
    isPulledLeft: {
      type: [String, Boolean]
    },
    isPulledRight: {
      type: [String, Boolean]
    },
    isMarginless: {
      type: [String, Boolean]
    },
    isPaddingless: {
      type: [String, Boolean]
    },
    isOverlay: {
      type: [String, Boolean]
    },
    isClipped: {
      type: [String, Boolean]
    },
    isRadiusless: {
      type: [String, Boolean]
    },
    isShadowless: {
      type: [String, Boolean]
    },
    isUnselectable: {
      type: [String, Boolean]
    },
    isInvisible: {
      type: [String, Boolean]
    },
    isSrOnly: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getHelpersModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        "is-clearfix",
        utils.convert.stringToBoolean(this.isClearfix)
      );
      cssArchitect.addClass(
        "is-pulled-left",
        utils.convert.stringToBoolean(this.isPulledLeft)
      );
      cssArchitect.addClass(
        "is-pulled-right",
        utils.convert.stringToBoolean(this.isPulledRight)
      );
      cssArchitect.addClass(
        "is-marginless",
        utils.convert.stringToBoolean(this.isMarginless)
      );
      cssArchitect.addClass(
        "is-paddingless",
        utils.convert.stringToBoolean(this.isPaddingless)
      );
      cssArchitect.addClass(
        "is-overlay",
        utils.convert.stringToBoolean(this.isOverlay)
      );
      cssArchitect.addClass(
        "is-clipped",
        utils.convert.stringToBoolean(this.isClipped)
      );
      cssArchitect.addClass(
        "is-radiusless",
        utils.convert.stringToBoolean(this.isRadiusless)
      );
      cssArchitect.addClass(
        "is-shadowless",
        utils.convert.stringToBoolean(this.isShadowless)
      );
      cssArchitect.addClass(
        "is-unselectable",
        utils.convert.stringToBoolean(this.isUnselectable)
      );
      cssArchitect.addClass(
        "is-invisible",
        utils.convert.stringToBoolean(this.isInvisible)
      );
      cssArchitect.addClass(
        "is-sr-only",
        utils.convert.stringToBoolean(this.isSrOnly)
      );
      return cssArchitect.getClasses();
    }
  }
};
