import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";
import { filteredDigits } from "../../utils/pad";

import TDigit from "./TDigit";

export default {
  name: "TNumpad",
  props: {
    targetClass: {
      type: String
    },
    arrowClass: {
      type: String
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    },
    digits: {
      type: Array,
      required: true
    },
    time: {
      type: Array
    },
    arrowKeys: {
      type: Object,
      required: true
    },
    digitPressed: {
      type: Function,
      required: true
    },
    digitSelected: {
      type: Function,
      required: true
    }
  },
  computed: {
    numbers() {
      return this.time
        ? filteredDigits(this.activeIndex, this.digits, this.time)
        : [];
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A CssArchitect object }
     */
    css: function() {
      const css = new CssArchitect("numpad");
      css.addClass(this.targetClass);
      return css;
    },
    /**
     * Dynamically build the css classes for the arrow element
     * @returns {  A CssArchitect object }
     */
    arrowCss: function() {
      const css = new CssArchitect("numpad__triangle");
      css.isColored();
      css.addClass(this.arrowClass);
      return css;
    }
  },
  methods: {
    /**
     * Creates the digits
     */
    createDigits(architect) {
      let digits = architect.createDiv("numpad__digits");
      for (let digit of this.numbers) {
        let number = architect.createElement(TDigit);
        number.setProps({
          number: digit,
          digitPressed: this.digitPressed,
          digitSelected: this.digitSelected
        });
        digits.addChild(number);
      }
      architect.addChild(digits);
    },
    /**
     * Creates the arrows
     */
    createArrows(architect) {
      let arrows = architect.createDiv("numpad__arrows");
      let leftButton = architect.createDiv("numpad__digits");
      this.createButton(leftButton, {
        ref: "previousButton",
        pressed: this.arrowKeys.left.pressed,
        disabled: this.activeIndex <= 0,
        mouseup: () => {
          this.blurEl(this.$refs.previousButton);
        },
        touchstart: () => {
          this.arrowPressed("left");
        },
        handler: this.goToPrevious,
        touchend: this.goToPrevious,
        d: "M22.4 8v16l-14.4-8 14.4-8z"
      });

      let rightButton = architect.createDiv("numpad__digits");
      this.createButton(rightButton, {
        ref: "nextButton",
        pressed: this.arrowKeys.right.pressed,
        disabled: this.activeIndex <= 0,
        mouseup: () => {
          this.blurEl(this.$refs.nextButton);
        },
        touchstart: () => {
          this.arrowPressed("right");
        },
        handler: this.goToNext,
        touchend: this.goToNext,
        d: "M24 16l-14.4 8v-16l14.4 8z"
      });

      arrows.addChild(leftButton);
      arrows.addChild(rightButton);
      architect.addChild(arrows);
    },
    /**
     * Creates the button element
     */
    createButton(
      architect,
      { ref, disabled, handler, mouseup, touchstart, touchend, pressed, d }
    ) {
      let button = architect.createA();
      button.addClass("is-disabled", disabled);

      button.setRef(ref);
      button.addAttr("disabled", this.activeIndex <= 0 || !this.isOpen);
      button.addClick(handler);

      button.addEvent("mouseup", mouseup);
      button.addEvent("touchstart", touchstart);
      button.addEvent("touchend", touchend);

      let svg = architect.createElement("svg", this.arrowCss.getClasses());
      svg.addAttr("viewBox", "0 0 32 32");

      let path = architect.createElement("path", "path1");
      path.addAttr("d", d);

      svg.addChild(path);
      button.addChild(svg);

      let ripple = architect.createDiv("numpad__ripple");
      ripple.addClass("is-pressed", pressed);

      architect.addChild(button);
      architect.addChild(ripple);
    }
  },
  render: function(h) {
    let root = createDiv(h, this.css.getClasses());
    this.createDigits(root);
    this.createArrows(root);
    return root.create();
  }
};
