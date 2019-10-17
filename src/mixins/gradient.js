import CssArchitect from "../utils/css-architect";

export default {
  props: {
    linear: Boolean,
    radial: Boolean
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getGradientModifiers: function() {
      const css = new CssArchitect();
      css.addClass("linear", this.linear);
      css.addClass("radial", this.radial);
      return css.getClasses();
    }
  }
};
