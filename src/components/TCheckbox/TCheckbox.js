import input from "../../mixins/input";
import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-checkbox",
  mixins: [input],
  props: {
    value: {
      type: Boolean
    },
    isRtl: {
      type: Boolean,
      default: false
    },
    isCircle: {
      type: Boolean,
      default: false
    },
    isBlock: {
      type: Boolean,
      default: false
    },
    hasNoBorder: {
      type: Boolean,
      default: false
    },
    hasBackgroundColor: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      this.$refs.inputField.checked = newVal;
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.getCheckradioClass);
      cssArchitect.addClass("is-rtl", this.isRtl);
      cssArchitect.addClass("is-circle", this.isCircle);
      cssArchitect.addClass("is-block", this.isBlock);
      cssArchitect.addClass("has-no-border", this.hasNoBorder);
      cssArchitect.addClass("has-background-color", this.hasBackgroundColor);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    onInput() {
      let value = this.$refs.inputField.checked;
      this.validateOnEvent("input");
      this.onChange();
      this.$emit(this.$thisvui.events.common.input, value);
    },
    /**
     * Creates the checkbox input section
     */
    createCheckbox(architect) {
      // Creating the html input element
      let input = architect.createInput(this.getClasses);
      input.setId(this.id);
      let inputAttrs = {
        placeholder: this.placeholder,
        value: this.value,
        disabled: this.disabled,
        validationScope: this.validationScope,
        readonly: this.readonly,
        rows: this.rows,
        cols: this.cols,
        min: this.min,
        max: this.max,
        type: "checkbox"
      };
      input.value(this.value);
      input.setAttrs(inputAttrs);
      input.setRef("inputField");
      input.addEvent("change", this.onInput);
      input.addEvent("input", this.onInput);
      input.addEvent("blur", this.onBlur);
      architect.addChild(input);
    },
    /**
     * Creates the field label section
     */
    createLabel(architect) {
      let label = architect.createLabel(this.getLabelClass);
      label.addAttr("for", this.id);
      label.addDomProp("innerHTML", this.label);

      architect.addChild(label);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClass);

    this.createCheckbox(root);
    this.createLabel(root);

    return root.create();
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.inputField.checked = this.value;
    });
  }
};
