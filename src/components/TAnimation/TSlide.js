import slide from "../../mixins/slide";

export default {
  name: "t-slide",
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
