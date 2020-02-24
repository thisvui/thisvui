import syntax from "../../mixins/syntax";
import common from "../../mixins/common";
import icons from "../../mixins/icons";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";
import TListItemAvatar from "./TListItemAvatar";

export default {
  name: "t-list-item",
  mixins: [common, icons, syntax],
  props: {
    title: String,
    titleClass: String,
    subtitle: String,
    subtitleClass: String,
    description: String,
    descriptionClass: String,
    headingClass: String,
    bodyClass: String,
    avatar: String,
    avatarClass: String,
    icon: String,
    iconClass: String
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      const css = new CssArchitect("t-list__item");
      css.addClass(this.getSyntaxModifiers);
      return css;
    },
    contentCss: function() {
      const css = new CssArchitect("t-list__item--vertical");
      return css;
    },
    headingCss: function() {
      const css = new CssArchitect("t-list__item-heading");
      css.addClass(this.headingClass, this.headingClass !== undefined);
      return css;
    },
    bodyCss: function() {
      const css = new CssArchitect("t-list__item-body");
      css.addClass(this.bodyClass, this.bodyClass !== undefined);
      return css;
    },
    actionsCss: function() {
      const css = new CssArchitect("t-list__actions");
      return css;
    }
  },
  methods: {
    createAvatar(architect) {
      if (this.avatar || this.icon || this.$slots["avatar"]) {
        let avatar = architect.createElement(TListItemAvatar);
        avatar.setProps({
          avatar: this.avatar,
          avatarClass: this.avatarClass,
          icon: this.icon,
          iconClass: this.iconClass,
        })
        if (this.$slots["avatar"]) {
          avatar.setChildren(this.$slots["avatar"])
        }
        architect.addChild(avatar);
      }
    },
    createContent(architect) {
      let content = architect.createDiv(this.contentCss.getClasses());
      this.createHeading(content);
      this.createBody(content);
      architect.addChild(content);
    },
    createHeading(architect) {
      if (this.title || this.$slots["heading"]) {
        let heading = architect.createDiv(this.headingCss.getClasses());
        if (this.title) {
          let text = architect.createDiv("t-list__item-title");
          text.addClass(this.titleClass);
          text.innerHTML(this.title);
          heading.addChild(text);
        }
        if (this.$slots["heading"]) {
          let slotHeading = architect
            .createDiv("t-list__item-heading--slot")
            .setChildren(this.$slots["heading"]);
          heading.addChild(slotHeading);
        }
        architect.addChild(heading);
      }
      if (this.subtitle) {
        let text = architect.createDiv("t-list__item-subtitle");
        text.addClass(this.subtitleClass);
        text.innerHTML(this.subtitle);
        architect.addChild(text);
      }
    },
    createBody(architect) {
      let body = architect.createDiv(this.bodyCss.getClasses());
      if (this.description) {
        let text = architect.createDiv();
        text.addClass(this.descriptionClass);
        text.innerHTML(this.description);
        body.addChild(text);
      }
      if (this.$slots["body"]) {
        let slotHeading = architect
          .createDiv()
          .setChildren(this.$slots["body"]);
        body.addChild(slotHeading);
      }
      architect.addChild(body);
    },
    createActions(architect) {
      if (this.$slots["actions"]) {
        let actions = architect.createDiv(this.actionsCss.getClasses());
        actions.setChildren(this.$slots["actions"]);
        architect.addChild(actions);
      }
    }
  },
  render: function(h) {
    let root = createDiv(h, this.css.getClasses());
    root.setId(this.id);
    this.createAvatar(root);
    this.createContent(root);
    this.createActions(root);
    return root.create();
  }
};
