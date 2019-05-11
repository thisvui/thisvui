import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isHovered: {
      type: Boolean
    },
    isFocused: {
      type: Boolean
    },
    isLoading: {
      type: Boolean
    },
    isActive: {
      type: Boolean
    },
    isStatic: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getStateModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-hovered", this.isHovered);
      cssArchitect.addClass("is-focused", this.isFocused);
      cssArchitect.addClass("is-loading", this.isLoading);
      cssArchitect.addClass("is-active", this.isActive);
      cssArchitect.addClass("is-static", this.isStatic);
      return cssArchitect.getClasses();
    }
  }
};
