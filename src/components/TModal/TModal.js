import sizes from "../../mixins/sizes";
import colors from "../../mixins/colors";
import common from "../../mixins/common";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-modal",
  mixins: [common, sizes, colors],
  props: {
    title: {
      type: String
    },
    showModal: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    targetClass: {
      type: String
    },
    headerClass: {
      type: String
    },
    titleClass: {
      type: String
    },
    bodyClass: {
      type: String
    },
    footClass: {
      type: String
    },
    width: {
      type: String
    },
    animationType: {
      type: String,
      default: "fade"
    },
    closeEvent: {
      type: String,
      default: function() {
        return this.$thisvui.events.modal.close;
      }
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("modal-card");
      cssArchitect.addClass(this.targetClass, this.targetClass);
      cssArchitect.addClass(this.width);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getColorsModifiers);
      this.setupColorModifier(cssArchitect);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal header
     * @returns { A String with the chained css classes }
     */
    getHeaderClasses: function() {
      const cssArchitect = new CssArchitect("modal-card-head");
      this.colorize(cssArchitect, "bg-color", true);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      cssArchitect.addClass(this.headerClass, this.headerClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal header title
     * @returns { A String with the chained css classes }
     */
    getTitleClasses: function() {
      const cssArchitect = new CssArchitect("modal-card-title");
      this.colorize(cssArchitect, "color-invert", true);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      cssArchitect.addClass(this.titleClass, this.titleClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal body
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const cssArchitect = new CssArchitect("modal-card-body");
      cssArchitect.addClass(this.bodyClass, this.bodyClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal foot
     * @returns { A String with the chained css classes }
     */
    getFootClasses: function() {
      const cssArchitect = new CssArchitect("modal-card-foot");
      cssArchitect.addClass(this.footClass, this.footClass);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    createDeleteButton(architect) {
      if (this.showClose) {
        let deleteBtn = architect.createElement("button", "delete");
        deleteBtn.addClick(() => {
          this.$emit(this.closeEvent);
        });
        architect.addChild(deleteBtn);
      }
    },
    createHeader(architect) {
      if (this.showHeader) {
        let header = architect.createElement("header", this.getHeaderClasses);
        if (this.title) {
          let title = architect.createP(this.getTitleClasses);
          title.innerHTML(this.title);
          header.addChild(title);
        }
        this.createDeleteButton(header);
        architect.addChild(header);
      }
    },
    createBody(architect) {
      let body = architect.createElement("section", this.getBodyClasses);
      body.setChildren(this.$slots.default);
      architect.addChild(body);
    },
    createFooter(architect) {
      if (this.showFooter && this.$slots["footer"]) {
        let footer = architect.createElement("footer", this.getFootClasses);
        footer.setChildren(this.$slots["footer"]);
        architect.addChild(footer);
      }
    },
    createModal(architect) {
      let transition = architect.createTransition(this.animationType);
      if (this.showModal) {
        let modal = architect.createDiv(this.getClasses);
        this.createHeader(modal);
        this.createBody(modal);
        this.createFooter(modal);
        transition.addChild(modal);
      }
      architect.addChild(transition);
    }
  },
  render: function(h) {
    if (!this.removed) {
      let root = new ElementArchitect(h, "transition", this.getClasses);
      root.setProps({ name: "fade" });

      let modal = root.createDiv("modal is-active");
      let bg = root.createDiv("modal-background");
      modal.addChild(bg);
      this.createModal(modal);
      root.addChild(modal, this.showModal);
      return root.create();
    }
  }
};
