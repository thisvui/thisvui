import slide from "../../mixins/slide";
import { ComponentNames } from "../../utils/constants";

export default {
  name: ComponentNames.TSlide,
  mixins: [slide],
  render: function(h) {
    let root = this.createSlideContainer(h);
    root.setChildren(this.$slots.default);
    return root.create();
  },
  mounted() {
    this.$nextTick(function() {
      this.toggleSlide();
    });
  },
  created: function() {
    this.addResizeListener();
  },
  beforeDestroy: function() {
    this.removeResizeListener();
  }
};
