import common from "../../mixins/common";
import twelveColumns from "../../mixins/12-columns";
import background from "../../mixins/background";
import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-tile",
  mixins: [common, twelveColumns, background],
  props: {
    isAncestor: {
      type: Boolean
    },
    isParent: {
      type: Boolean
    },
    isChild: {
      type: Boolean
    },
    isVertical: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("tile");
      cssArchitect.addClass("is-ancestor", this.isAncestor);
      cssArchitect.addClass("is-parent", this.isParent);
      cssArchitect.addClass("is-child", this.isChild);
      cssArchitect.addClass("is-vertical", this.isVertical);
      cssArchitect.addClass(this.get12ColumnsModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "section", this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    return root.create();
  }
};
