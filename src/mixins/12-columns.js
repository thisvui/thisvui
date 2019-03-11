import utils from "../utils/utils";
import CssArchitect from "../utils/css-architect";

export default {
  props: {
    is0: {
      type: [String, Boolean]
    },
    is1: {
      type: [String, Boolean]
    },
    is2: {
      type: [String, Boolean]
    },
    is3: {
      type: [String, Boolean]
    },
    is4: {
      type: [String, Boolean]
    },
    is5: {
      type: [String, Boolean]
    },
    is6: {
      type: [String, Boolean]
    },
    is7: {
      type: [String, Boolean]
    },
    is8: {
      type: [String, Boolean]
    },
    is9: {
      type: [String, Boolean]
    },
    is10: {
      type: [String, Boolean]
    },
    is11: {
      type: [String, Boolean]
    },
    is12: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getGridModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-0", utils.convert.stringToBoolean(this.is0));
      cssArchitect.addClass("is-1", utils.convert.stringToBoolean(this.is1));
      cssArchitect.addClass("is-2", utils.convert.stringToBoolean(this.is2));
      cssArchitect.addClass("is-3", utils.convert.stringToBoolean(this.is3));
      cssArchitect.addClass("is-4", utils.convert.stringToBoolean(this.is4));
      cssArchitect.addClass("is-5", utils.convert.stringToBoolean(this.is5));
      cssArchitect.addClass("is-6", utils.convert.stringToBoolean(this.is6));
      cssArchitect.addClass("is-7", utils.convert.stringToBoolean(this.is7));
      cssArchitect.addClass("is-8", utils.convert.stringToBoolean(this.is8));
      cssArchitect.addClass("is-9", utils.convert.stringToBoolean(this.is9));
      cssArchitect.addClass("is-10", utils.convert.stringToBoolean(this.is10));
      cssArchitect.addClass("is-11", utils.convert.stringToBoolean(this.is11));
      cssArchitect.addClass("is-12", utils.convert.stringToBoolean(this.is12));
      return cssArchitect.getClasses();
    }
  }
};
