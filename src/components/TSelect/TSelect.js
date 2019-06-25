import input from "../../mixins/input";
import helpers from "../../mixins/helpers";

import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-select",
  mixins: [input, helpers],
  props: {
    value: {
      type: [String, Number]
    },
    options: {
      type: Array
    },
    display: {
      type: String
    },
    val: {
      type: String
    },
    addEmptyValue: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    selected: {
      get: function() {
        return this.value;
      },
      set: function(val) {}
    },
    isComplex() {
      return this.val !== undefined && this.display !== undefined;
    },
    addEmptyField: function() {
      return this.addEmptyValue;
    }
  },
  methods: {
    onChange(event) {
      this.$emit(this.$thisvui.events.common.input, event.target.value);
      this.$emit(this.$thisvui.events.common.change);
    },
    /**
     * Creates the options
     */
    createOptions(architect) {
      let emptyOption = architect.createElement("option");
      emptyOption.addAttr("value", "");
      architect.addChild(emptyOption, this.addEmptyField);
      for (let option of this.options) {
        let key = this.isComplex ? option[this.val] : option;
        let value = this.isComplex ? option[this.val] : option;
        let display = this.isComplex ? option[this.display] : option;
        let optionEl = architect.createElement("option");
        optionEl.setKey(option[this.val]);
        optionEl.addAttr("value", value);
        optionEl.addDomProp("innerHTML", display);
        architect.addChild(optionEl);
      }
    },
    /**
     * Creates the select element
     */
    createInput(architect) {
      let root = architect.createDiv("field-body");
      let field = architect.createDiv("field");
      let control = architect.createDiv(this.getControlClass); // The control element
      let selectContainer = architect.createDiv(this.getSelectClass); // The control element

      // Creating the html input element
      let input = architect.createSelect(this.getInputClass);
      input.setId(this.id);
      let inputAttrs = {
        placeholder: this.placeholder,
        value: this.selected,
        disabled: this.disabled,
        validationScope: this.validationScope,
        readonly: this.readonly,
        min: this.min,
        max: this.max
      };
      input.setAttrs(inputAttrs);
      input.setRef("inputField");
      input.addEvent("change", this.onChange);
      input.addEvent("blur", this.onBlur);
      input.addEvent("keyup", this.onKeyup);

      // Creating the options
      this.createOptions(input);

      selectContainer.addChild(input);

      this.createErrorHelpers(selectContainer);

      control.addChild(selectContainer);
      field.addChild(control);
      root.addChild(field);

      architect.addChild(root);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClass);

    this.createLabel(root);
    this.createInput(root);

    return root.create();
  }
};
