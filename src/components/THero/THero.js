import common from "../../mixins/common";
import dimension from "../../mixins/dimension";
import sizes from "../../mixins/sizes";
import themes from "../../mixins/themes";
import gradient from "../../mixins/gradient";
import {ComponentNames} from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: ComponentNames.THero,
  mixins: [common, sizes, dimension, themes, gradient],
  props: {
    title: String,
    titleClass: String,
    subtitle: String,
    subtitleClass: String,
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
    hasImg(){
      return this.isNotNull(this.img) || this.$slots["img"]
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(ComponentNames.THero);
      this.isFilled(css, { removeInit: true });
      css.addClass(this.getThemeModifiers);
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
      const css = new CssArchitect(`${ComponentNames.THero}__content`);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero img content element
     * @returns { A String with the chained css classes }
     */
    getImgContentClasses: function() {
      const css = new CssArchitect(`${ComponentNames.THero}__content`);
      css.addClass("has-img", this.hasImg);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero body element
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const css = new CssArchitect(`${ComponentNames.THero}__body`);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero title element
     * @returns { A String with the chained css classes }
     */
    getTitleClasses: function() {
      const css = new CssArchitect(`${ComponentNames.THero}__title`);
      css.addClass("has-img", this.hasImg);
      css.addClass(this.titleClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero subtitle element
     * @returns { A String with the chained css classes }
     */
    getSubtitleClasses: function() {
      const css = new CssArchitect(`${ComponentNames.THero}__subtitle`);
      css.addClass("has-img", this.hasImg);
      css.addClass(this.subtitleClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero desc element
     * @returns { A String with the chained css classes }
     */
    getDescriptionClasses: function() {
      const css = new CssArchitect(`${ComponentNames.THero}__desc`);
      css.addClass("has-img", this.hasImg);
      css.addClass(this.descriptionClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero action element
     * @returns { A String with the chained css classes }
     */
    getActionClasses: function() {
      const css = new CssArchitect(`${ComponentNames.THero}__action`);
      css.addClass("has-img", this.hasImg);
      css.addClass(this.footClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero image element
     * @returns { A String with the chained css classes }
     */
    getImgClasses: function() {
      const css = new CssArchitect(`${ComponentNames.THero}__img`);
      css.addClass(this.imgClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero image slot
     * @returns { A String with the chained css classes }
     */
    getImgSlotClasses: function() {
      const css = new CssArchitect(`${ComponentNames.THero}__img--slot`);
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

    // Creating the title element
    let subtitle = root.createDiv(this.getSubtitleClasses);
    subtitle.innerHTML(this.subtitle);

    // Creating the desc element
    let desc = root.createDiv(this.getDescriptionClasses);
    desc.innerHTML(this.description);

    // Creating the action slot
    let action = root.createDiv(this.getActionClasses);
    action.setChildren(this.$slots["action"]);

    body.addChild(title, this.isNotNull(this.title));
    body.addChild(subtitle, this.isNotNull(this.subtitle));
    body.addChild(desc, this.isNotNull(this.description));
    body.addChild(action, this.hasActionSlot); // only if action slot is present
    content.addChild(body);
    root.addChild(content);

    if (this.isNotNull(this.img) || this.$slots["img"]) {
      let imgContent = root.createDiv(this.getImgContentClasses);
      let img = root.createImg(this.getImgClasses);
      img.addAttr("src", this.img, this.isNotNull(this.img));
      imgContent.addChild(img, this.isNotNull(this.img));
      if(this.$slots["img"]){
        let imgSlot = root.createDiv(this.getImgSlotClasses);
        imgSlot.setChildren(this.$slots["img"]);
        imgContent.addChild(imgSlot)
      }
      root.addChild(imgContent);
    }

    return root.create();
  }
};
