import CssArchitect from "../utils/css-architect";

export default {
  props: {
    marginless: {
      type: Boolean
    },
    paddingless: {
      type: Boolean
    },
    isBold: {
      type: Boolean
    },
    radiusless: {
      type: Boolean
    },
    borderless: {
      type: Boolean
    },
    shadowless: {
      type: Boolean
    },
    isUnselectable: {
      type: Boolean
    },
    isInvisible: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getHelpersModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-marginless", this.marginless);
      cssArchitect.addClass("is-paddingless", this.paddingless);
      cssArchitect.addClass("is-bold", this.isBold);
      cssArchitect.addClass("is-radiusless", this.radiusless);
      cssArchitect.addClass("is-borderless", this.borderless);
      cssArchitect.addClass("is-shadowless", this.shadowless);
      cssArchitect.addClass("is-unselectable", this.isUnselectable);
      cssArchitect.addClass("is-invisible", this.isInvisible);
      return cssArchitect.getClasses();
    }
  }
};
