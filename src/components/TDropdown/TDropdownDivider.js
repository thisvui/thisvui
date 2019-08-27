import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-dropdown-divider",
  render: function(h) {
    let root = new ElementArchitect(h, "div", "dropdown-divider");
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
