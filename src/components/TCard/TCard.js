import themes from "../../mixins/themes";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import dimension from "../../mixins/dimension";
import helpers from "../../mixins/helpers";
import { ComponentNames } from "../../utils/constants";

import TFlex from "../TFlex/TFlex";
import TImage from "../TImage/TImage";
import TIcon from "../TIcon/TIcon";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: ComponentNames.TCard,
  components: { TFlex, TIcon, TImage },
  mixins: [common, icons, themes, dimension, helpers],
  props: {
    targetClass: {
      type: String
    },
    category: {
      type: String
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    description: {
      type: String
    },
    categoryClass: {
      type: String
    },
    titleClass: {
      type: String
    },
    subtitleClass: {
      type: String
    },
    descriptionClass: {
      type: String
    },
    figure: {
      type: Boolean,
      default: true
    },
    showDate: {
      type: Boolean
    },
    day: {
      type: [Number, String]
    },
    month: {
      type: String
    },
    dateClass: {
      type: String
    },
    showImg: {
      type: Boolean
    },
    icon: {
      type: String
    },
    iconClass: {
      type: String
    },
    img: {
      type: String
    },
    imgClass: {
      type: String
    },
    imgSize: {
      type: String
    },
    avatar: {
      type: String
    },
    avatarClass: {
      type: String
    },
    showMeta: {
      type: Boolean
    },
    metadata: {
      type: Array
    },
    horizontal: {
      type: Boolean
    },
    contentCentered: {
      type: Boolean
    },
    contentRight: {
      type: Boolean
    },
    contentJustified: {
      type: Boolean
    },
    transparent: {
      type: Boolean
    },
    contentTransparent: {
      type: Boolean
    },
    hoverEffect: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}`);
      css.addClass("horizontal", this.horizontal);
      css.addClass("transparent", this.transparent);
      css.addClass("hover-effect", this.hoverEffect);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.targetClass, this.isNotNull(this.targetClass));
      this.setupThemeModifier(css);
      css.addClass(this.getHelpersModifiers);
      return css.getClasses();
    },
    getStyles: function() {
      const css = new CssArchitect();
      css.addStyles([this.getDimensionStyles]);
      return css.getStyles();
    },
    getContentClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}__content`);
      css.addClass("is-fullwidth");
      css.addClass("horizontal", this.horizontal);
      css.addClass("transparent", this.transparent || this.contentTransparent);
      css.addClass("centered", this.contentCentered);
      css.addClass("right", this.contentRight);
      css.addClass("justified", this.contentJustified);
      css.addClass("is-relative", this.horizontal || !this.isNotNull(this.img));
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the figure element
     * @returns { A String with the chained css classes }
     */
    getFigureClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}__figure`);
      css.addClass("horizontal", this.horizontal);
      css.addClass(
        "overflow-hidden",
        !this.horizontal && this.isNotNull(this.img)
      );
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the date element
     * @returns { A String with the chained css classes }
     */
    getDateClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}__date`);
      this.isFilled(css, { removeInit: true });
      css.addClass(this.getThemeModifier(true));
      css.addClass("horizontal", this.horizontal);
      css.addClass(this.dateClass, this.dateClass !== undefined);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the image element
     * @returns { A String with the chained css classes }
     */
    getImageClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}__image`);
      css.addClass(this.imgClass, this.isNotNull(this.imgClass));
      if (this.horizontal) {
        css.addClass("horizontal");
        this.isBordered(css);
        css.addClass(this.getThemeModifier(true));
      }
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconContainerClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}__icon`);
      css.addClass("horizontal", this.horizontal);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconClasses: function() {
      const css = new CssArchitect();
      css.addClass(this.getThemeModifier(true));
      css.addClass(this.iconClass, this.isNotNull(this.iconClass));
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the avatar element
     * @returns { A String with the chained css classes }
     */
    getAvatarContainerClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}__avatar`);
      css.addClass("horizontal", this.horizontal);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the avatar element
     * @returns { A String with the chained css classes }
     */
    getAvatarClasses: function() {
      const css = new CssArchitect();
      css.addClass(this.avatarClass, this.isNotNull(this.avatarClass));
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the category element
     * @returns { A String with the chained css classes }
     */
    getCategoryClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}__category`);
      this.isFilled(css, { removeInit: true });
      css.addClass("horizontal", this.horizontal);
      css.addClass("has-img", this.horizontal && this.isNotNull(this.img));
      css.addClass(this.getThemeModifier(true));
      css.addClass(this.categoryClass, this.categoryClass !== undefined);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the title element
     * @returns { A String with the chained css classes }
     */
    getTitleClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}__title`);
      css.addClass(this.titleClass, this.titleClass !== undefined);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the subtitle element
     * @returns { A String with the chained css classes }
     */
    getSubtitleClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}__subtitle`);
      this.isColored(css);
      css.addClass(this.getThemeModifier(true));
      css.addClass(this.subtitleClass, this.subtitleClass !== undefined);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the title element
     * @returns { A String with the chained css classes }
     */
    getDescriptionClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}__description`);
      css.addClass(this.descriptionClass, this.descriptionClass !== undefined);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the metadata element
     * @returns { A String with the chained css classes }
     */
    getMetadataClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}__metadata`);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the metadata item element
     * @returns { A String with the chained css classes }
     */
    getMetadataItemClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCard}__metadata--item`);
      return css.getClasses();
    },
    renderMedia: function() {
      return this.figure || this.title;
    }
  },
  methods: {
    createIcon(architect) {
      if (this.icon) {
        let iconContainer = architect.createDiv(this.getIconContainerClasses);
        let icon = architect.createIcon(this.getIconClasses);
        icon.setProps({
          icon: this.icon,
          large: true,
          resizeFont: true,
          iconLib: this.iconLib,
          preserveDefaults: !this.overrideDefaults
        });
        iconContainer.addChild(icon);
        architect.addChild(iconContainer);
      }
    },
    createAvatar(architect) {
      if (this.avatar) {
        let avatarContainer = architect.createDiv(
          this.getAvatarContainerClasses
        );
        let imgEl = architect.createImg(this.getAvatarClasses);
        imgEl.addAttr("src", this.avatar);
        avatarContainer.addChild(imgEl);
        architect.addChild(avatarContainer);
      }
    },
    createImg(architect) {
      if (this.img) {
        let imgEl = architect.createImg(this.getImageClasses);
        imgEl.addAttr("src", this.img);
        architect.addChild(imgEl);
      }
    },
    createFigure(architect) {
      if (this.figure) {
        let root = architect.createDiv(this.getFigureClasses);
        if (this.showDate) {
          let dateEl = architect.createDiv(this.getDateClasses);
          if (this.day) {
            let dayEl = architect.createDiv("day");
            dayEl.innerHTML(this.day);
            dateEl.addChild(dayEl);
          }
          if (this.month) {
            let monthEl = architect.createDiv("month");
            monthEl.innerHTML(this.month);
            dateEl.addChild(monthEl);
          }
          root.addChild(dateEl);
        }
        this.createCategory(root, this.horizontal);

        this.createImg(root);
        this.createIcon(root);
        this.createAvatar(root);
        architect.addChild(root);
      }
    },
    createCategory(architect, condition) {
      if (this.category && condition) {
        let category = architect.createDiv(this.getCategoryClasses);
        category.innerHTML(this.category);
        architect.addChild(category);
      }
    },
    createContent(architect) {
      let root = architect.createDiv(this.getContentClasses);
      this.createCategory(root, !this.horizontal);
      if (this.title) {
        let title = root.createDiv(this.getTitleClasses);
        title.innerHTML(this.title);
        root.addChild(title);
      }
      if (this.subtitle) {
        let subtitle = root.createDiv(this.getSubtitleClasses);
        subtitle.innerHTML(this.subtitle);
        root.addChild(subtitle);
      }
      if (this.description) {
        let description = root.createDiv(this.getDescriptionClasses);
        description.innerHTML(this.description);
        root.addChild(description);
      }
      this.createMetadata(root);
      architect.addChild(root);
    },
    createMetadata(architect) {
      if (this.showMeta) {
        let root = architect.createDiv(this.getMetadataClasses);
        if (this.metadata !== undefined && this.metadata.length > 0) {
          for (let $metaItem of this.metadata) {
            let metaItemEl = architect.createDiv(this.getMetadataItemClasses);
            if ($metaItem.icon) {
              let iconEl = architect.createIcon();
              iconEl.setProps({
                icon: $metaItem.icon
              });
              iconEl.addClass($metaItem.iconClass);
              metaItemEl.addChild(iconEl);
            }
            if ($metaItem.content) {
              let contentEl = architect.createDiv();
              contentEl.innerHTML($metaItem.content);
              metaItemEl.addChild(contentEl);
            }
            root.addChild(metaItemEl);
          }
        }
        architect.addChild(root);
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);
    root.setStyles(this.getStyles);
    this.createFigure(root);
    this.createContent(root);
    return root.create();
  }
};
