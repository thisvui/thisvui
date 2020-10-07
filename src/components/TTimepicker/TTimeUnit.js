import {ComponentNames} from "../../utils/constants";
import { createDiv } from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  props: {
    value: {
      type: [String, Number]
    },
    index: {
      type: Number
    },
    width: {
      type: Number,
      required: true
    },
    targetClass: {
      type: String
    },
    fontSize: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      numbers: [],
      transitionName: "time-unit__value"
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the value element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      const css = new CssArchitect(`${ComponentNames.TTimepicker}__value`);
      css.isColored({ inverted: true });
      css.addClass(this.targetClass);
      css.addStyle("width", css.addPx(this.width));
      css.addStyle("font-size", css.addPx(this.fontSize));
      return css;
    }
  },
  created() {
    this.numbers.push(this.value);
  },
  methods: {
    setActiveIndex(index) {
      this.$emit("update:active-index", parseInt(index));
    }
  },
  watch: {
    value: function(val, oldVal) {
      if (val === oldVal) {
        return;
      }
      this.transitionName =
        val > oldVal ? `${ComponentNames.TTimepicker}__value` : `${ComponentNames.TTimepicker}__value--reverse`;

      this.numbers.splice(0, 1);
      this.numbers.push(val);
    }
  },
  render: function(h) {
    let root = createDiv(h, `${ComponentNames.TTimepicker}__unit`);
    root.addClass();
    let transition = root.createElement("transition-group");
    transition.addAttr("name", this.transitionName);
    transition.addAttr("tag", "div");
    for (let $index in this.numbers) {
      let $number = this.numbers[$index];
      let timeValue = root.createDiv(this.css.getClasses());
      timeValue.setStyles(this.css.getStyles());
      timeValue.setKey(`${$index}-${$number}`);
      timeValue.innerHTML($number);
      timeValue.addClick(() => {
        this.setActiveIndex(this.index);
      });
      transition.addChild(timeValue);
    }

    root.addChild(transition);
    return root.create();
  }
};
