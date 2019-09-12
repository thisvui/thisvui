import slide from "../../mixins/slide";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-slide",
  mixins: [slide],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-animation-container slide");
      cssArchitect.addClass("is-absolute", this.isAbsolute);
      cssArchitect.addClass("has-shadow-1");
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      initialWidth: 0
    };
  },
  watch: {
    isOpen: function(newVal, oldVal) {
      this.toggleSlide();
    }
  },
  methods: {
    getStyle() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addStyle("width", `${this.initialWidth}px`);
      cssArchitect.addStyle(
        "zIndex",
        parseInt(this.zIndex),
        this.zIndex !== undefined
      );
      return cssArchitect.getStyles();
    },
    getTarget() {
      let element = this.$refs.slideContainer;
      if (!element) {
        throw new DOMException("Cannot animate undefined element");
      }
      return element;
    },
    getWidth: function() {
      let width = parseInt(this.width);
      let baseWitdh = window.innerWidth < width ? window.innerWidth : width;
      this.updateCalculatedWith(
        window.innerWidth < 352 ? baseWitdh - 52 : baseWitdh
      );
      let resultWidth = `${this.calculatedWidth}${this.unity}`;
      return this.isOpen ? resultWidth : this.initialWidth;
    },
    toggleSlide() {
      this.changeWidth(this.getWidth());
    },
    changeWidth(width) {
      this.getTarget().style.width = width;
    },
    handleResize(event) {
      this.changeWidth(this.getWidth());
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setRef("slideContainer");
    root.setStyles(this.getStyle());
    root.addDirective({
      name: "click-outside",
      value: {
        handler: "handleOutsideClick"
      }
    });
    root.setChildren(this.$slots.default);
    return root.create();
  },
  mounted() {
    this.$nextTick(function() {
      this.toggleSlide();
    });
  },
  created: function() {
    window.addEventListener("resize", this.handleResize);
    this.$on("close-siblings", id => {
      this.$emit("close-children", id);
    });
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  }
};
