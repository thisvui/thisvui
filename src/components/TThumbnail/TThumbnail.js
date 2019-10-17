import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-thumbnail",
  render: function(h) {
    let root = new ElementArchitect(h, "div", "t-thumbnail");
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
