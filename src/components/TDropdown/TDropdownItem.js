import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-dropdown-item",
  render: function(h) {
    let root = new ElementArchitect(h, "div", "dropdown-item");
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
