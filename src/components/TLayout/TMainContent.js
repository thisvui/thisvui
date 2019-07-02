import colors from "../../mixins/colors";
import common from "../../mixins/common";
import flex from "../../mixins/flex";
import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-main-content",
  mixins: [common, colors, flex],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-main-content");
      cssArchitect.isFlexible("column", "stretch");
      this.colorize(cssArchitect, "bg", true);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getFlexModifiers);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
