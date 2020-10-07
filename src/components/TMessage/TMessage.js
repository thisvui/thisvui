import syntax from "../../mixins/syntax";
import sizes from "../../mixins/sizes";
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import {ComponentNames} from "../../utils/constants";

import { createDiv } from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: ComponentNames.TMessage,
  mixins: [common, syntax, sizes, helper],
  props: {
    title: {
      type: String
    },
    showHeading: {
      type: Boolean,
      default: true
    },
    closeButton: {
      type: Boolean,
      default: false
    },
    targetClass: {
      type: String
    },
    headingClass: {
      type: String
    },
    bodyClass: {
      type: String
    },
    deleteClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(ComponentNames.TMessage);
      css.addClass(this.getSyntaxModifiers);
      css.addClass(this.getSizesModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.targetClass);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the message heading container
     * @returns { A String with the chained css classes }
     */
    getHeadingClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TMessage}__heading`);
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass(this.headingClass, this.headingClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the message body container
     * @returns { A String with the chained css classes }
     */
    getBodyCss: function() {
      const css = new CssArchitect(`${ComponentNames.TMessage}__body`);
      this.isFilled(css, { tint: 75 });
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass(this.bodyClass, this.bodyClass);
      css.addClass("color-dark");
      return css;
    },
    /**
     * Dynamically build the css classes for the delete button
     * @returns { A String with the chained css classes }
     */
    getCloseButtonClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TMessage}__close t-delete`);
      css.addClass(this.deleteClass, this.deleteClass);
      return css.getClasses();
    }
  },
  data() {
    return {
      removed: false
    };
  },
  methods: {
    removeElement() {
      this.removed = true;
    },
    createCloseButton(architect) {
      if (this.closeButton) {
        let deleteBtn = architect.createA(this.getCloseButtonClasses);
        deleteBtn.addClick(this.removeElement);
        architect.addChild(deleteBtn);
      }
    },
    createHeading(architect) {
      if (this.showHeading) {
        let heading = architect.createDiv(this.getHeadingClasses);
        let title = architect.createSpan();
        title.innerHTML(this.title);
        heading.addChild(title);
        this.createCloseButton(heading);
        architect.addChild(heading);
      }
    },
    createBody(architect) {
      let body = architect.createDiv(this.getBodyCss.getClasses());
      body.setStyles(this.getBodyCss.getStyles());
      body.addVNodeChildren(this.$slots.default);
      if (!this.showHeading) {
        let deleteContainer = architect.createDiv(`${ComponentNames.TMessage}__close__container`);
        this.createCloseButton(deleteContainer);
        body.addChild(deleteContainer);
      }
      architect.addChild(body);
    }
  },
  render: function(h) {
    if (!this.removed) {
      let root = createDiv(h, this.getClasses);
      root.setId(this.id);

      this.createHeading(root);
      this.createBody(root);

      return root.create();
    }
  }
};
