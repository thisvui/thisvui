import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import dimension from "../../mixins/dimension";
import aspect from "../../mixins/aspect";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";


export default {
  name: "t-image",
  mixins: [common, dimension, aspect, helper],
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: "Image"
    },
    text: {
      type: String
    },
    textClass: {
      type: String
    },
    fillClass: {
      type: String
    },
    circular: {
      type: Boolean
    },
    targetClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the wrapper element
     * @returns { A String with the chained css classes }
     */
    getWrapperCss: function() {
      const css = new CssArchitect("image");
      css.addClass("circular", this.circular);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.getAspectRatioModifiers);
      css.addClass(this.getDimensionModifiers);
      css.addStyles([this.getDimensionStyles]);
      return css;
    },
    /**
     * Dynamically build the css classes for the img element
     * @returns { A String with the chained css classes }
     */
    getImgCss: function() {
      const css = new CssArchitect();
      css.addClass(this.targetClass);
      return css;
    },
    /**
     * Dynamically build the css classes for the fill element
     * @returns { A String with the chained css classes }
     */
    getFillCss: function() {
      const css = new CssArchitect("image__fill");
      css.addClass(this.fillClass);
      return css;
    },
    /**
     * Dynamically build the css classes for the text element
     * @returns { A String with the chained css classes }
     */
    getTextCss: function() {
      const css = new CssArchitect("image__text");
      css.addClass(this.textClass);
      return css;
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getWrapperCss.getClasses());
    root.setId(this.id);
    root.setStyles(this.getWrapperCss.getStyles());

    // Creating the img element
    let img = root.createImg(this.getImgCss.getClasses());
    img.addAttr("src", this.src);
    img.addAttr("alt", this.alt);
    root.addChild(img);

    // Creating the fill element if present
    if(this.isNotNull(this.fillClass)){
      let fill = root.createDiv(this.getFillCss.getClasses());
      root.addChild(fill);
    }

    // Creating the text element if present
    if(this.isNotNull(this.text)){
      let text = root.createDiv(this.getTextCss.getClasses());
      text.innerHTML(this.text);
      root.addChild(text);
    }
    return root.create();
  }
};
