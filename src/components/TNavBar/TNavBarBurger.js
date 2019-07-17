import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import colors from "../../mixins/colors";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-navbar-burger",
  mixins: [common, helper, colors],
  props: {
    isActive: {
      type: Boolean
    },
    isMobileOnly: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("navbar-burger");
      cssArchitect.isFlexible();
      cssArchitect.addClass("is-fullheight");
      cssArchitect.addClass("is-active", this.isActive);
      cssArchitect.addClass("is-mobile-only", this.isMobileOnly);
      this.colorize(cssArchitect, "color", true);
      cssArchitect.addClass(this.getColorsModifiers);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    onClick() {
      this.$emit(this.$thisvui.events.common.click);
    },
    createLine(architect) {
      let line = architect.createSpan();
      line.addAttr("aria-hidden", "true");
      architect.addChild(line);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "a", this.getClasses);
    root.setId(this.id);
    root.addAttr("role", "button");
    root.addAttr("aria-label", "menu");
    root.addAttr("aria-expanded", "false");
    root.addClick(this.onClick);

    this.createLine(root);
    this.createLine(root);
    this.createLine(root);
    return root.create();
  }
};
