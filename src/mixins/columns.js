import utils from "../utils/utils";
import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isThreeQuarters: {
      type: [String, Boolean]
    },
    isTwoThirds: {
      type: [String, Boolean]
    },
    isHalf: {
      type: [String, Boolean]
    },
    isOneThird: {
      type: [String, Boolean]
    },
    isOneQuarter: {
      type: [String, Boolean]
    },
    isFourFifths: {
      type: [String, Boolean]
    },
    isThreeFifths: {
      type: [String, Boolean]
    },
    isTwoFifths: {
      type: [String, Boolean]
    },
    isOneFifth: {
      type: [String, Boolean]
    },
    isOffset: {
      type: String
    },
    isNarrow: {
      type: [String, Boolean]
    },
    isNarrowMobile: {
      type: [String, Boolean]
    },
    isNarrowTablet: {
      type: [String, Boolean]
    },
    isNarrowTouch: {
      type: [String, Boolean]
    },
    isNarrowDesktop: {
      type: [String, Boolean]
    },
    isNarrowWidescreen: {
      type: [String, Boolean]
    },
    isNarrowFullhd: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getColumnModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        "is-three-quarters",
        utils.convert.stringToBoolean(this.isThreeQuarters)
      );
      cssArchitect.addClass(
        "is-two-thirds",
        utils.convert.stringToBoolean(this.isTwoThirds)
      );
      cssArchitect.addClass(
        "is-half",
        utils.convert.stringToBoolean(this.isHalf)
      );
      cssArchitect.addClass(
        "is-one-third",
        utils.convert.stringToBoolean(this.isOneThird)
      );
      cssArchitect.addClass(
        "is-one-quarter",
        utils.convert.stringToBoolean(this.isOneQuarter)
      );
      cssArchitect.addClass(
        "is-four-fifths",
        utils.convert.stringToBoolean(this.isFourFifths)
      );
      cssArchitect.addClass(
        "is-three-fifths",
        utils.convert.stringToBoolean(this.isThreeFifths)
      );
      cssArchitect.addClass(
        "is-two-fifths",
        utils.convert.stringToBoolean(this.isTwoFifths)
      );
      cssArchitect.addClass(
        "is-one-fifth",
        utils.convert.stringToBoolean(this.isOneFifth)
      );
      cssArchitect.addClass(
        "is-narrow",
        utils.convert.stringToBoolean(this.isNarrow)
      );
      cssArchitect.addClass(
        "is-narrow-mobile",
        utils.convert.stringToBoolean(this.isNarrowMobile)
      );
      cssArchitect.addClass(
        "is-narrow-tablet",
        utils.convert.stringToBoolean(this.isNarrowTablet)
      );
      cssArchitect.addClass(
        "is-narrow-touch",
        utils.convert.stringToBoolean(this.isNarrowTouch)
      );
      cssArchitect.addClass(
        "is-narrow-desktop",
        utils.convert.stringToBoolean(this.isNarrowDesktop)
      );
      cssArchitect.addClass(
        "is-narrow-widescreen",
        utils.convert.stringToBoolean(this.isNarrowWidescreen)
      );
      cssArchitect.addClass(
        "is-narrow-fullhd",
        utils.convert.stringToBoolean(this.isNarrowFullhd)
      );
      cssArchitect.addClass(
        `is-offset-${this.isOffset}`,
        this.isOffset !== undefined
      );
      return cssArchitect.getClasses();
    }
  }
};
