import CssArchitect from "../utils/css-architect";
import { createDiv } from "../utils/element-architect";

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    animated: {
      type: Boolean,
      default: true
    },
    absolute: Boolean,
    sticky: Boolean,
    fixed: Boolean,
    right: Boolean,
    tablet: Boolean,
    desktop: Boolean,
    hasShadow: Boolean,
    width: {
      type: [Number, String],
      default: 300
    },
    unit: {
      type: String,
      default: "px"
    },
    zIndex: {
      type: [Number, String]
    },
    animationDuration: {
      type: Number,
      default: 300
    },
    animationFill: {
      type: String,
      default: "forwards"
    }
  },
  watch: {
    isOpen: function(newVal, oldVal) {
      if (this.animated) {
        this.toggleSlide();
      }
    }
  },
  data() {
    return {
      initialWidth: 0,
      calculatedWidth: parseInt(this.width),
      slideTargets: [],
      timer: null
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    slideCss: function() {
      const css = new CssArchitect("t-slide");
      css.addClass("is-fixed", this.fixed);
      css.addClass("is-sticky", this.sticky);
      css.addClass("is-absolute", this.absolute);
      css.addClass("is-right", this.right);
      css.addClass("tablet", this.tablet);
      css.addClass("desktop", this.desktop);
      css.addClass("has-shadow-1", this.hasShadow);
      return css;
    },
    targetsEmpty() {
      return !this.slideTargets || this.slideTargets.length == 0;
    }
  },
  methods: {
    getContainerStyle() {
      const css = new CssArchitect();
      css.addStyle("width", css.addPx(this.initialWidth), this.animated);
      css.addStyle("width", css.addPx(this.width), !this.animated);
      css.addStyle("zIndex", parseInt(this.zIndex), this.zIndex !== undefined);
      return css.getStyles();
    },
    addSlideTarget(target) {
      if (!target) {
        throw new DOMException("Cannot animate undefined element");
      }
      this.slideTargets.push(target);
    },
    getDefaultTarget() {
      let element = this.$refs.slideContainer;
      if (!element) {
        throw new DOMException("Cannot animate undefined element");
      }
      return element;
    },
    getWidth: function() {
      let width = parseInt(this.width);
      if (this.$_utils.check.existWindow()) {
        let baseWitdh = window.innerWidth < width ? window.innerWidth : width;
        this.updateCalculatedWidth(
          window.innerWidth < 352 ? baseWitdh - 52 : baseWitdh
        );
      }
      let resultWidth = `${this.calculatedWidth}${this.unit}`;
      return this.isOpen ? resultWidth : this.initialWidth;
    },
    clearSlideTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    toggleSlide() {
      this.changeWidth(this.getWidth());
    },
    changeWidth(width) {
      this.clearSlideTimer();
      if (this.targetsEmpty) {
        this.getDefaultTarget().style.width = width;
      } else {
        let zero = width == 0;
        if (zero) {
          for (let $target of this.slideTargets) {
            $target.style.width = width;
          }
          this.timer = setTimeout(() => {
            this.getDefaultTarget().style.width = width;
          }, 10);
        } else {
          this.getDefaultTarget().style.width = width;
          this.timer = setTimeout(() => {
            for (let $target of this.slideTargets) {
              $target.style.width = width;
            }
          }, 10);
        }
      }
    },
    handleResize(event) {
      this.changeWidth(this.getWidth());
    },
    handleOutsideClick(e) {
      this.$emit(this.$thisvui.events.slide.clickedOutside, e);
    },
    updateCalculatedWidth(width) {
      this.calculatedWidth = width;
      this.$emit(this.$thisvui.events.slide.changeWidth, this.calculatedWidth);
    },
    createSlideContainer: function(h) {
      let root = createDiv(h, this.slideCss.getClasses());
      root.setRef("slideContainer");
      root.setStyles(this.getContainerStyle());
      root.addDirective({
        name: "click-outside",
        value: {
          handler: "handleOutsideClick"
        }
      });
      return root;
    },
    addResizeListener() {
      if (this.$_utils.check.existWindow()) {
        window.addEventListener("resize", this.handleResize);
      }
    },
    removeResizeListener() {
      if (this.$_utils.check.existWindow()) {
        window.removeEventListener("resize", this.handleResize);
      }
    }
  }
};
