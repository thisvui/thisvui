import sizes from "../../mixins/sizes";
import themes from "../../mixins/themes";
import common from "../../mixins/common";

import CssArchitect from "../../utils/css-architect";
import { createTransition } from "../../utils/element-architect";

export default {
  name: "t-modal",
  mixins: [common, sizes, themes],
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
    half: {
      type: Boolean
    },
    size: {
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
      const css = new CssArchitect("modal");
      css.addClass(this.targetClass);
      css.addClass(this.size);
      css.addClass("half", this.half);
      css.addClass(this.getSizesModifiers);
      css.addClass(this.getThemeModifiers);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal mask
     * @returns { A String with the chained css classes }
     */
    getMaskClasses: function() {
      const css = new CssArchitect("modal__mask");
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal header
     * @returns { A String with the chained css classes }
     */
    getHeaderClasses: function() {
      const css = new CssArchitect("modal__heading");
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass(this.headerClass, this.headerClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal header title
     * @returns { A String with the chained css classes }
     */
    getTitleClasses: function() {
      const css = new CssArchitect("modal__title");
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass(this.titleClass, this.titleClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal body
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const css = new CssArchitect("modal__body");
      css.addClass(this.bodyClass, this.bodyClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal foot
     * @returns { A String with the chained css classes }
     */
    getFootClasses: function() {
      const css = new CssArchitect("modal__footer");
      css.addClass(this.footClass, this.footClass);
      return css.getClasses();
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
    createHeading(architect) {
      if (this.showHeader) {
        let header = architect.createDiv(this.getHeaderClasses);
        if (this.title) {
          let title = architect.createDiv(this.getTitleClasses);
          title.innerHTML(this.title);
          header.addChild(title);
        }
        this.createDeleteButton(header);
        architect.addChild(header);
      }
    },
    createMask(architect) {
      let mask = architect.createDiv(this.getMaskClasses);
      architect.addChild(mask);
    },
    createBody(architect) {
      let body = architect.createDiv(this.getBodyClasses);
      body.setChildren(this.$slots.default);
      architect.addChild(body);
    },
    createFooter(architect) {
      if (this.showFooter && this.$slots["footer"]) {
        let footer = architect.createDiv(this.getFootClasses);
        footer.setChildren(this.$slots["footer"]);
        architect.addChild(footer);
      }
    },
    createModal(architect) {
      let transition = architect.createTransition(this.animationType);
      if (this.showModal) {
        let modal = architect.createDiv(this.getClasses);
        this.createHeading(modal);
        this.createBody(modal);
        this.createFooter(modal);
        transition.addChild(modal);
      }
      architect.addChild(transition);
    }
  },
  render: function(h) {
    if (!this.removed) {
      let root = createTransition(h, "fade", this.getClasses);
      let wrapper = root.createDiv("modal__wrapper");
      this.createMask(wrapper);
      this.createModal(wrapper);
      root.addChild(wrapper, this.showModal);
      return root.create();
    }
  }
};
