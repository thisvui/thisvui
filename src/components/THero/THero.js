import common from "../../mixins/common";
import dimension from "../../mixins/dimension";
import sizes from "../../mixins/sizes";
import colors from "../../mixins/colors";
import gradient from "../../mixins/gradient";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-hero",
  mixins: [common, sizes, dimension, colors, gradient],
  props: {
    title: String,
    titleClass: String,
    description: String,
    descriptionClass: String,
    actionsClass: String,
    img: String,
    imgClass: String,
    reverse: Boolean
  },
  computed: {
    hasActionSlot() {
      return !!this.$slots.action;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("hero");
      this.filled(css, { removeInit: true });
      css.addClass(this.getColorsModifiers);
      css.addClass(this.getGradientModifiers);
      css.addClass(this.getSizesModifiers);
      css.addClass(this.getDimensionModifiers);
      css.addClass("reverse", this.reverse);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero content element
     * @returns { A String with the chained css classes }
     */
    getContentClasses: function() {
      const css = new CssArchitect("hero__content");
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero img content element
     * @returns { A String with the chained css classes }
     */
    getImgContentClasses: function() {
      const css = new CssArchitect("hero__content");
      css.addClass("has-img", this.isNotNull(this.img));
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero body element
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const css = new CssArchitect("hero__body");
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero title element
     * @returns { A String with the chained css classes }
     */
    getTitleClasses: function() {
      const css = new CssArchitect("hero__title");
      css.addClass("has-img", this.isNotNull(this.img));
      css.addClass(this.titleClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero desc element
     * @returns { A String with the chained css classes }
     */
    getDescriptionClasses: function() {
      const css = new CssArchitect("hero__desc");
      css.addClass("has-img", this.isNotNull(this.img));
      css.addClass(this.descriptionClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero action element
     * @returns { A String with the chained css classes }
     */
    getActionClasses: function() {
      const css = new CssArchitect("hero__action");
      css.addClass("has-img", this.isNotNull(this.img));
      css.addClass(this.footClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero image element
     * @returns { A String with the chained css classes }
     */
    getImgClasses: function() {
      const css = new CssArchitect("hero__img");
      css.addClass(this.imgClass);
      return css.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);

    let content = root.createDiv(this.getContentClasses);
    let body = root.createDiv(this.getBodyClasses);

    // Creating the title element
    let title = root.createDiv(this.getTitleClasses);
    title.innerHTML(this.title);

    // Creating the desc element
    let desc = root.createDiv(this.getDescriptionClasses);
    desc.innerHTML(this.description);

    // Creating the action slot
    let action = root.createDiv(this.getActionClasses);
    action.setSlot("action").setChildren(this.$slots.action);

    body.addChild(title, this.isNotNull(this.title));
    body.addChild(desc, this.isNotNull(this.description));
    body.addChild(action, this.hasActionSlot); // only if action slot is present
    content.addChild(body);
    root.addChild(content);

    if (this.isNotNull(this.img)) {
      let imgContent = root.createDiv(this.getImgContentClasses);
      let img = root.createImg(this.getImgClasses);
      img.addAttr("src", this.img);
      imgContent.addChild(img);
      root.addChild(imgContent);
    }

    return root.create();
  }
};
