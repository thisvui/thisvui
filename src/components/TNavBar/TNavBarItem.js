import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-navbar-item",
  mixins: [common, helper],
  props: {
    view: String,
    hasDropdown: Boolean,
    isHoverable: Boolean,
    isActive: Boolean
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("navbar-item");
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass("has-dropdown", this.hasDropdown);
      cssArchitect.addClass("is-hoverable", this.isHoverable);
      cssArchitect.addClass("is-active", this.isActive);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let hasView = this.view !== undefined;
    let elementType = hasView ? "router-link" : "a";
    let root = new ElementArchitect(h, elementType, this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    if (hasView) {
      root.setProps({ to: { name: this.view } });
    }
    return root.create();
  }
};
