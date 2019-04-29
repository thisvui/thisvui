import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isCentered: {
      type: Boolean
    },
    isRight: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getAlignmentModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-centered", this.isCentered);
      cssArchitect.addClass("is-right", this.isRight);
      return cssArchitect.getClasses();
    }
  }
};
