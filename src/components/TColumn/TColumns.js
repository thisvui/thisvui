import common from "../../mixins/common";
import devices from "../../mixins/devices";
import background from "../../mixins/background";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-columns",
  mixins: [common, devices, background],
  props: {
    isGapless: {
      type: Boolean
    },
    isMultiline: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("columns");
      cssArchitect.addClass("is-gapless", this.isGapless);
      cssArchitect.addClass("is-multiline", this.isMultiline);
      cssArchitect.addClass(this.getDevicesModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
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
