import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-navbar-menu",
  mixins: [common, helper],
  props: {
    isActive: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("navbar-menu");
      cssArchitect.addClass("is-active", this.isActive);
      cssArchitect.addClass(this.getHelpersModifiers);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);
    let start = root.createDiv("navbar-start");
    start.setChildren(this.$slots["navbar-start"]);

    let end = root.createDiv("navbar-end");
    end.setChildren(this.$slots["navbar-end"]);
    root.addChild(start);
    root.addChild(end);
    return root.create();
  }
};
