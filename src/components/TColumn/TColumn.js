import columns from "../../mixins/columns";
import twelveColumns from "../../mixins/12-columns";
import common from "../../mixins/common";
import background from "../../mixins/background";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-column",
  mixins: [common, columns, twelveColumns, background],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("column");
      cssArchitect.addClass(this.getColumnModifiers);
      cssArchitect.addClass(this.get12ColumnsModifiers);
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
