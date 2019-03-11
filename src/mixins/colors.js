import utils from "../utils/utils";
import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isPrimary: {
      type: [String, Boolean]
    },
    isSecondary: {
      type: [String, Boolean]
    },
    isLink: {
      type: [String, Boolean]
    },
    isInfo: {
      type: [String, Boolean]
    },
    isSuccess: {
      type: [String, Boolean]
    },
    isWarning: {
      type: [String, Boolean]
    },
    isModerate: {
      type: [String, Boolean]
    },
    isDanger: {
      type: [String, Boolean]
    },
    isDark: {
      type: [String, Boolean]
    },
    isLight: {
      type: [String, Boolean]
    },
    isOpaque: {
      type: [String, Boolean]
    },
    isBlack: {
      type: [String, Boolean]
    },
    isWhite: {
      type: [String, Boolean]
    },
    isHappy: {
      type: [String, Boolean]
    },
    color: {
      type: String
    },
    background: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getColorsModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        "is-primary",
        utils.convert.stringToBoolean(this.isPrimary)
      );
      cssArchitect.addClass(
        "is-secondary",
        utils.convert.stringToBoolean(this.isSecondary)
      );
      cssArchitect.addClass(
        "is-link",
        utils.convert.stringToBoolean(this.isLink)
      );
      cssArchitect.addClass(
        "is-info",
        utils.convert.stringToBoolean(this.isInfo)
      );
      cssArchitect.addClass(
        "is-success",
        utils.convert.stringToBoolean(this.isSuccess)
      );
      cssArchitect.addClass(
        "is-warning",
        utils.convert.stringToBoolean(this.isWarning)
      );
      cssArchitect.addClass(
        "is-moderate",
        utils.convert.stringToBoolean(this.isModerate)
      );
      cssArchitect.addClass(
        "is-danger",
        utils.convert.stringToBoolean(this.isDanger)
      );
      cssArchitect.addClass(
        "is-dark",
        utils.convert.stringToBoolean(this.isDark)
      );
      cssArchitect.addClass(
        "is-light",
        utils.convert.stringToBoolean(this.isLight)
      );
      cssArchitect.addClass(
        "is-opaque",
        utils.convert.stringToBoolean(this.isOpaque)
      );
      cssArchitect.addClass(
        "is-black",
        utils.convert.stringToBoolean(this.isBlack)
      );
      cssArchitect.addClass(
        "is-white",
        utils.convert.stringToBoolean(this.isWhite)
      );
      cssArchitect.addClass(
        "is-happy",
        utils.convert.stringToBoolean(this.isHappy)
      );
      cssArchitect.addClass(`has-text-${this.color}`, this.color !== undefined);
      cssArchitect.addClass(
        `has-background-${this.background}`,
        this.background !== undefined
      );
      return cssArchitect.getClasses();
    }
  }
};
