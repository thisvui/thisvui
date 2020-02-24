import TFlex from "../TFlex";
import themes from "../../mixins/themes";
import common from "../../mixins/common";
import dimension from "../../mixins/dimension";
import margin from "../../mixins/margin";
import helpers from "../../mixins/helpers";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: "t-progress",
  mixins: [common, themes, dimension, margin, helpers],
  components: { TFlex },
  props: {
    value: {
      type: Number,
      default: 0
    },
    circular: {
      type: Boolean
    },
    indeterminate: {
      type: Boolean
    },
    compact: {
      type: Boolean
    },
    stripped: {
      type: Boolean
    },
    solid: {
      type: Boolean
    },
    pie: {
      type: Boolean
    },
    animated: {
      type: Boolean
    },
    reverse: {
      type: Boolean
    },
    labelTop: {
      type: Boolean
    },
    labelBottom: {
      type: Boolean
    },
    labelLeft: {
      type: Boolean
    },
    labelCenter: {
      type: Boolean
    },
    labelRight: {
      type: Boolean
    },
    labelLight: {
      type: Boolean
    },
    labelDark: {
      type: Boolean
    },
    targetClass: {
      type: String
    },
    containerClass: {
      type: String
    },
    labelClass: {
      type: String
    },
    isFullwidth: {
      type: Boolean
    }
  },
  computed: {
    baseClass() {
      return this.circular ? "progress__circular" : "progress__linear";
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(`${this.baseClass}__bar`);
      if (!this.circular) {
        this.isFilled(css);
      }

      css.addClass("compact", this.compact && !this.circular);
      css.addClass("stripped", this.stripped);
      css.addClass("animated", this.animated && !this.reverse);
      css.addClass("animated--reverse", this.animated && this.reverse);
      if (this.indeterminate) {
        css.addClass("indeterminate");
        this.isBordered(css);
      }
      css.addClass(this.getThemeModifiers);
      css.addClass(this.targetClass);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    },
    getContainerClasses: function() {
      const css = new CssArchitect(this.baseClass);
      css.addClass("compact", this.compact && this.circular);
      css.addClass(this.containerClass);
      css.addClass(this.getHelpersModifiers);
      return css.getClasses();
    },
    getWrapperCss: function() {
      const css = new CssArchitect(`${this.baseClass}__wrapper`);
      css.addClass("compact", this.compact && !this.circular);
      css.addClass("indeterminate", this.indeterminate);
      if (!this.circular) {
        css.addStyles([this.getDimensionStyles]);
      }
      css.addStyles([this.getMarginStyles]);
      return css;
    },
    getLeftCircleCss: function() {
      const css = new CssArchitect(`${this.baseClass}__circle is-left`);
      this.isBordered(css);
      if (this.pie) {
        this.isFilled(css, { tint: 25 });
      }
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css;
    },
    getRightCircleCss: function() {
      const css = new CssArchitect(`${this.baseClass}__circle is-right`);
      this.isBordered(css);
      if (this.pie) {
        this.isFilled(css, { tint: 25 });
      }
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css;
    },
    getLabelClasses: function() {
      const css = new CssArchitect(`${this.baseClass}__label`);
      css.addClass("is-top", this.labelTop && !this.circular);
      css.addClass("is-bottom", this.labelBottom && !this.circular);
      css.addClass("is-left", this.labelLeft && !this.circular);
      css.addClass("is-center", this.labelCenter && !this.circular);
      css.addClass("is-right", this.labelRight && !this.circular);
      if (this.circular && this.solid) {
        this.isFilled(css, { tint: 75 });
        css.addClass(this.themeModifier, this.hasThemeModifier);
      }
      css.addClass(this.labelClass);
      return css.getClasses();
    },
    getLabelValueClasses: function() {
      const css = new CssArchitect(`${this.baseClass}__label--value`);
      let inverted =
        this.pie ||
        (!this.circular &&
          !this.labelTop &&
          !this.labelBottom &&
          !this.labelDark &&
          !this.labelLight);
      let solid = this.solid && !this.labelDark && !this.labelLight;
      this.isColored(css, { inverted: inverted });
      css.addClass(
        this.themeModifier,
        this.hasThemeModifier && (solid || inverted)
      );
      css.addClass("is-dark", this.labelDark);
      css.addClass("is-light", this.labelLight);
      return css.getClasses();
    },
    getFillCss: function() {
      const css = new CssArchitect(`${this.baseClass}__fill`);
      if (this.pie) {
        this.alpha(css, { border: 0.5 });
        this.isFilled(css, { tint: 75 });
        this.isBordered(css);
        css.addClass(this.themeModifier, this.hasThemeModifier);
      }
      return css;
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      this.progressValue = newVal;
    }
  },
  data() {
    return {
      ctx: null,
      progressValue: this.value,
      circleWidth: null,
      circleHeight: null,
      diff: null,
      requestAnimationFrame: null,
      interval: 0,
      angleA: 0,
      angleB: 0,
      restart: false,
      fillColor: "black"
    };
  },
  methods: {
    getLinearStyles: function() {
      const css = new CssArchitect();
      css.addStyle("width", css.addPercent(this.progressValue), !this.indeterminate);
      return css.getStyles();
    },
    getCircularStyles: function() {
      const css = new CssArchitect();
      css.addStyle("--circular-progress", this.progressValue);
      if (this.progressValue > 50) {
        css.addStyle("clip", "rect(auto, auto, auto, auto)");
      }
      return css.getStyles();
    },
    getCircularRightStyles: function() {
      const css = new CssArchitect();
      if (this.progressValue <= 50) {
        css.addStyle("display", "none");
      } else {
        css.addStyle("transform", "rotate(180deg)");
      }

      return css.getStyles();
    },
    createLabel(architect, condition = true) {
      if (!this.indeterminate && !this.compact && condition) {
        let label = architect.createDiv(this.getLabelClasses);
        let labelValue = architect.createSpan(this.getLabelValueClasses);
        labelValue.innerHTML(`${this.progressValue} %`);
        label.addChild(labelValue);
        architect.addChild(label);
      }
    },
    createLinearProgress(architect) {
      if (!this.circular) {
        let progress = architect.createDiv(this.getClasses);
        progress.setId(this.id);
        progress.setRef("linear");
        progress.setStyles(this.getLinearStyles());
        this.createLabel(progress, !this.labelTop && !this.labelBottom);
        progress.addChild(this.$slots.default);
        architect.addChild(progress);
      }
    },
    createCircularProgress(architect) {
      if (this.circular) {
        this.createLabel(architect, !this.pie);
        let progress = architect.createDiv(this.getClasses);
        progress.setRef("circular");
        progress.setId(this.id);
        progress.setStyles(this.getCircularStyles());

        let left = architect.createDiv(this.getLeftCircleCss.getClasses());
        left.setStyles(this.getLeftCircleCss.getStyles());
        let right = architect.createDiv(this.getRightCircleCss.getClasses());
        right.setStyles(this.getCircularRightStyles());
        progress.addChild(left, !this.indeterminate);
        progress.addChild(right, !this.indeterminate);
        architect.addChild(progress);

        let fill = architect.createDiv(this.getFillCss.getClasses());
        fill.setStyles(this.getFillCss.getStyles());
        architect.addChild(fill, !this.solid);

        this.createLabel(architect, this.pie);
      }
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getContainerClasses);
    let wrapper = root.createDiv(this.getWrapperCss.getClasses());
    wrapper.setStyles(this.getWrapperCss.getStyles());
    this.createLabel(
      root,
      this.labelTop && !this.labelBottom && !this.circular
    );
    this.createLinearProgress(wrapper);
    this.createCircularProgress(wrapper);
    root.addChild(wrapper);
    this.createLabel(
      root,
      !this.labelTop && this.labelBottom && !this.circular
    );
    return root.create();
  }
};
