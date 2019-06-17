import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-image",
  mixins: [common, helper],
  props: {
    src: {
      type: String,
      required: true
    },
    size: {
      type: String
    },
    alt: {
      type: String,
      default: "Image"
    },
    isRounded: {
      type: Boolean,
      default: false
    },
    targetClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the figure element
     * @returns { A String with the chained css classes }
     */
    getFigureClass: function() {
      const cssArchitect = new CssArchitect("image");
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.size, this.size !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the img element
     * @returns { A String with the chained css classes }
     */
    getImgClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-rounded", this.isRounded);
      cssArchitect.addClass(this.targetClass);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "figure", this.getFigureClass);
    root.setId(this.id);

    // Creating the img element
    let img = root.createImg(this.getImgClass);
    img.addAttr("src", this.src);
    img.addAttr("alt", this.alt);

    root.addChild(img);
    return root.create();
  }
};
