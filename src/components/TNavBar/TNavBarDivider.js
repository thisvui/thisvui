import { ComponentNames } from "../../utils/constants";
import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: ComponentNames.TNavBarDivider,
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect(
        `${ComponentNames.TNavBar}__divider`
      );
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "hr", this.getClasses);
    return root.create();
  }
};
