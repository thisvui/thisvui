import syntax from "../../mixins/syntax";
import sizes from "../../mixins/sizes";
import helper from "../../mixins/helpers";
import common from "../../mixins/common";

import { createDiv } from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-message",
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
      const css = new CssArchitect("message");
      css.addClass(this.getSyntaxModifiers);
      css.addClass(this.getSizesModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.targetClass);
      css.addClass("is-bold", this.isBold);
      this.setupColorModifier(css);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the message heading container
     * @returns { A String with the chained css classes }
     */
    getHeadingClasses: function() {
      const css = new CssArchitect("message__heading");
      this.filled(css);
      css.addClass(this.colorModifier, this.hasColorModifier);
      css.addClass(this.headingClass, this.headingClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the message body container
     * @returns { A String with the chained css classes }
     */
    getBodyCss: function() {
      const css = new CssArchitect("message__body");
      this.filled(css, { lighten: true });
      css.addClass(this.colorModifier, this.hasColorModifier);
      css.addClass(this.bodyClass, this.bodyClass);
      css.addClass("color-dark");
      return css;
    },
    /**
     * Dynamically build the css classes for the delete button
     * @returns { A String with the chained css classes }
     */
    getCloseButtonClasses: function() {
      const css = new CssArchitect("message__close delete");
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
        let deleteBtn = architect.createElement(
          "button",
          this.getCloseButtonClasses
        );
        deleteBtn.addClick(this.removeElement);
        architect.addChild(deleteBtn);
      }
    },
    createHeading(architect) {
      if (this.showHeading) {
        let heading = architect.createDiv(this.getHeadingClasses);
        let title = architect.createP();
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
        let deleteContainer = architect.createDiv("text-right");
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
