import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import {ComponentNames} from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: ComponentNames.TNavBarDropdown,
  mixins: [common, helper],
  props: {
    isBoxed: Boolean
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect(`${ComponentNames.TNavBar}__dropdown`);
      cssArchitect.addClass("is-boxed", this.isBoxed);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "a", this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    return root.create();
  }
};
