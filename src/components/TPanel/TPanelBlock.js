import {ComponentNames} from "../../utils/constants";
import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: ComponentNames.TPanelBlock,
  props: {
    display: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect(`${ComponentNames.TPanel}__block`);
      cssArchitect.addClass(this.display);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
