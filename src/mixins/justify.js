import CssArchitect from "../utils/css-architect";

export default {
  props: {
    start: Boolean,
    end: Boolean,
    center: Boolean
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getJustifyModifiers: function() {
      const css = new CssArchitect();
      css.addClass("start", this.start);
      css.addClass("end", this.end);
      css.addClass("center", this.center);
      return css.getClasses();
    }
  }
};
