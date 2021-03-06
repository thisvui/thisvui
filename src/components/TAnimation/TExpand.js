import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-expand",
  methods: {
    enter(element) {
      const width = getComputedStyle(element).width;

      element.style.width = width;
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.height = "auto";

      const height = getComputedStyle(element).height;

      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = "0";

      getComputedStyle(element).height;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    },
    leave(element) {
      const height = getComputedStyle(element).height;

      element.style.height = height;

      getComputedStyle(element).height;

      setTimeout(() => {
        element.style.height = "0";
      });
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "transition", this.getClasses);
    root.setProps({ name: "expand" });

    root.addEvent("enter", this.enter);
    root.addEvent("after-enter", this.afterEnter);
    root.addEvent("leave", this.leave);
    root.setChildren(this.$slots.default);

    let css = new CssArchitect();
    css.addStyle("will-change", "height");
    css.addStyle("transform", "translateZ(0)");
    css.addStyle("backface-visibility", "hidden");
    css.addStyle("perspective", "1000px");

    root.setStyles(css.getStyles());
    return root.create();
  }
};
