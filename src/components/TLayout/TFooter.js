import colors from "../../mixins/colors";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-footer",
  mixins: [common, colors],
  props: {
    isFixed: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: 52
    },
    unity: {
      type: String,
      default: "px"
    },
    zIndex: {
      type: [String, Number]
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-footer");
      cssArchitect.isFullwidth();
      this.colorize(cssArchitect, "bg", true);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass("is-fixed", this.isFixed);
      return cssArchitect.getClasses();
    },
    getHeight: function() {
      let height = `${this.height}${this.unity}`;
      return height;
    }
  },
  methods: {
    getStyle() {
      let styleObject = {
        height: this.getHeight
      };
      if (this.zIndex) {
        styleObject.zIndex = parseInt(this.zIndex);
      }
      return styleObject;
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);
    root.setStyles(this.getStyle());
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
