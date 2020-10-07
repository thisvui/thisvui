import {ComponentNames} from "../../utils/constants";
import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: ComponentNames.TDigit,
  props: {
    number: {
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
    isDisabled() {
      return !this.number.active || !this.isOpen;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns {  A CssArchitect object }
     */
    css: function() {
      const css = new CssArchitect(`${ComponentNames.TNumpad}__digit`);
      return css;
    }
  },
  methods: {
    /**
     * Creates the number button element
     */
    createButton(architect) {
      let button = architect.createA({ "is-disabled": !this.number.active });

      button.setRef("digit");
      button.setAttrs(this.$attrs);
      button.addAttr("disabled", this.isDisabled);

      button.addEvent("mousedown", () => {
        this.digitPressed(this.number.value);
      });
      button.addEvent("mouseup", event => {
        this.digitSelected(this.number.value, event) &&
          this.blurEl(this.$refs.digit);
      });
      button.addEvent("touchstart", () => {
        this.digitPressed(this.number.value);
      });
      button.addEvent("touchend", event => {
        this.digitSelected(this.number.value, event);
      });

      button.innerHTML(this.number.value);

      let ripple = architect.createDiv(`${ComponentNames.TNumpad}__ripple`);
      ripple.addClass("is-pressed", this.number.pressed);

      architect.addChild(button);
      architect.addChild(ripple);
    }
  },
  render: function(h) {
    let root = createDiv(h, this.css.getClasses());
    this.createButton(root);
    return root.create();
  }
};
