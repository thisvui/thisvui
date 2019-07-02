import common from "../../mixins/common";
import colors from "../../mixins/colors";
import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-media",
  mixins: [common, colors],
  props: {
    image: {
      type: String,
      required: true
    },
    imageClass: {
      type: String,
      default: "is-64x64"
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("media");
      cssArchitect.addClass(this.getColorsModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the img element
     * @returns { A String with the chained css classes }
     */
    getImgClasses: function() {
      const cssArchitect = new CssArchitect("image");
      cssArchitect.addClass(this.imageClass, this.imageClass);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);

    let left = root.createDiv("media-left");
    let leftChildren = root.createP(this.getImgClasses);
    let img = root.createImg();
    img.addAttr("src", this.image)
    leftChildren.addChild(img)
    left.addChild(leftChildren)

    let content = root.createDiv("media-content");
    content.setChildren(this.$slots.default);

    let right = root.createDiv("media-right");
    right.setSlot("right").setChildren(this.$slots["right"]);

    root.addChild(left);
    root.addChild(content);
    root.addChild(right);
    return root.create();
  }
};
