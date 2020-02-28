import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isLoading: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getStateModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-loading", this.isLoading);
      return cssArchitect.getClasses();
    }
  }
};
