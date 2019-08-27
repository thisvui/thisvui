import common from "../../mixins/common";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-thumbnails",
  mixins: [common],
  render: function(h) {
    let root = new ElementArchitect(h, "div", "t-thumbnails");
    root.setId(this.id).setChildren(this.$slots.default);
    return root.create();
  }
};
