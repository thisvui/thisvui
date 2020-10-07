import display from "../../mixins/display";
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import dimension from "../../mixins/dimension";
import aspect from "../../mixins/aspect";
import margin from "../../mixins/margin";
import padding from "../../mixins/padding";
import {ComponentNames} from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: ComponentNames.TImage,
  mixins: [common, dimension, aspect, display, margin, padding, helper],
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
    },
    is16: {
      type: Boolean
    },
    is32: {
      type: Boolean
    },
    is64: {
      type: Boolean
    },
    is128: {
      type: Boolean
    },
    is256: {
      type: Boolean
    },
    is512: {
      type: Boolean
    }
  },
  data: function() {
    return {
      hasError: false
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the wrapper element
     * @returns { A String with the chained css classes }
     */
    getWrapperCss: function() {
      const css = new CssArchitect(ComponentNames.TImage);
      css.addClass("circular", this.circular);
      css.addClass("is-16", this.is16);
      css.addClass("is-32", this.is32);
      css.addClass("is-64", this.is64);
      css.addClass("is-128", this.is128);
      css.addClass("is-256", this.is256);
      css.addClass("is-512", this.is512);
      css.addClass("broken is-128", this.hasError);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.getAspectRatioModifiers);
      css.addClass(this.getDimensionModifiers);
      css.addClass(this.getDisplayModifiers);
      css.addStyles([
        this.getDimensionStyles,
        this.getPaddingStyles,
        this.getMarginStyles
      ]);
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
      const css = new CssArchitect(`${ComponentNames.TImage}__fill`);
      css.addClass(this.fillClass);
      return css;
    },
    /**
     * Dynamically build the css classes for the text element
     * @returns { A String with the chained css classes }
     */
    getTextCss: function() {
      const css = new CssArchitect(`${ComponentNames.TImage}__text`);
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

    img.addEvent("error", e => {
      e.stopPropagation();
      this.hasError = true;
    });
    root.addChild(img);

    // Creating the fill element if present
    if (this.isNotNull(this.fillClass)) {
      let fill = root.createDiv(this.getFillCss.getClasses());
      root.addChild(fill);
    }

    // Creating the text element if present
    if (this.isNotNull(this.text)) {
      let text = root.createDiv(this.getTextCss.getClasses());
      text.innerHTML(this.text);
      root.addChild(text);
    }
    return root.create();
  }
};
