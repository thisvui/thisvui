import syntax from "../../mixins/syntax";
import sizes from "../../mixins/sizes";
import helper from "../../mixins/helpers";
import common from "../../mixins/common";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-message",
  mixins: [common, syntax, sizes, helper],
  props: {
    title: {
      type: String
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showDeleteButton: {
      type: Boolean,
      default: false
    },
    targetClass: {
      type: String
    },
    headerClass: {
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
      const cssArchitect = new CssArchitect("message");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.targetClass);
      cssArchitect.addClass("is-bold", this.isBold);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the message header container
     * @returns { A String with the chained css classes }
     */
    getHeaderClasses: function() {
      const cssArchitect = new CssArchitect("message-header");
      cssArchitect.addClass(this.headerClass, this.headerClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the message body container
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const cssArchitect = new CssArchitect("message-body");
      cssArchitect.addClass(this.bodyClass, this.bodyClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the delete button
     * @returns { A String with the chained css classes }
     */
    getDeleteClasses: function() {
      const cssArchitect = new CssArchitect("delete");
      cssArchitect.addClass(this.deleteClass, this.deleteClass);
      return cssArchitect.getClasses();
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
    createDeleteButton(architect) {
      if (this.showDeleteButton) {
        let deleteBtn = architect.createButton();
        deleteBtn.setProps({
          isText: true,
          targetClass: this.getDeleteClasses
        });
        deleteBtn.addClick(this.removeElement);
        architect.addChild(deleteBtn);
      }
    },
    createHeader(architect) {
      if (this.showHeader) {
        let header = architect.createDiv(this.getHeaderClasses);
        let title = architect.createP();
        title.innerHTML(this.title);
        header.addChild(title);
        this.createDeleteButton(header);
        architect.addChild(header);
      }
    },
    createBody(architect) {
      let body = architect.createDiv(this.getBodyClasses);
      if (!this.showHeader) {
        let deleteContainer = architect.createDiv("has-text-right");
        this.createDeleteButton(deleteContainer);
        body.addChild(deleteContainer);
      }
      body.addVNodeChildren(this.$slots.default);
      architect.addChild(body);
    }
  },
  render: function(h) {
    if (!this.removed) {
      let root = new ElementArchitect(h, "div", this.getClasses);
      root.setId(this.id);

      this.createHeader(root);
      this.createBody(root);

      return root.create();
    }
  }
};
