import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isThreeQuarters: {
      type: Boolean
    },
    isTwoThirds: {
      type: Boolean
    },
    isHalf: {
      type: Boolean
    },
    isOneThird: {
      type: Boolean
    },
    isOneQuarter: {
      type: Boolean
    },
    isFourFifths: {
      type: Boolean
    },
    isThreeFifths: {
      type: Boolean
    },
    isTwoFifths: {
      type: Boolean
    },
    isOneFifth: {
      type: Boolean
    },
    isOffset: {
      type: String
    },
    isNarrow: {
      type: Boolean
    },
    isNarrowMobile: {
      type: Boolean
    },
    isNarrowTablet: {
      type: Boolean
    },
    isNarrowTouch: {
      type: Boolean
    },
    isNarrowDesktop: {
      type: Boolean
    },
    isNarrowWidescreen: {
      type: Boolean
    },
    isNarrowFullhd: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getColumnModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-three-quarters", this.isThreeQuarters);
      cssArchitect.addClass("is-two-thirds", this.isTwoThirds);
      cssArchitect.addClass("is-half", this.isHalf);
      cssArchitect.addClass("is-one-third", this.isOneThird);
      cssArchitect.addClass("is-one-quarter", this.isOneQuarter);
      cssArchitect.addClass("is-four-fifths", this.isFourFifths);
      cssArchitect.addClass("is-three-fifths", this.isThreeFifths);
      cssArchitect.addClass("is-two-fifths", this.isTwoFifths);
      cssArchitect.addClass("is-one-fifth", this.isOneFifth);
      cssArchitect.addClass("is-narrow", this.isNarrow);
      cssArchitect.addClass("is-narrow-mobile", this.isNarrowMobile);
      cssArchitect.addClass("is-narrow-tablet", this.isNarrowTablet);
      cssArchitect.addClass("is-narrow-touch", this.isNarrowTouch);
      cssArchitect.addClass("is-narrow-desktop", this.isNarrowDesktop);
      cssArchitect.addClass("is-narrow-widescreen", this.isNarrowWidescreen);
      cssArchitect.addClass("is-narrow-fullhd", this.isNarrowFullhd);
      cssArchitect.addClass(
        `is-offset-${this.isOffset}`,
        this.isOffset !== undefined
      );
      return cssArchitect.getClasses();
    }
  }
};
