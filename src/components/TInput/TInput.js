import input from "../../mixins/input";
import utils from "../../utils/utils";
import TIcon from "../TIcon/TIcon";

import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-input",
  components: { TIcon },
  mixins: [input],
  props: {
    value: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    onInput() {
      let value = this.$refs.inputField.value;
      let result = this.validateOnEvent("input");
      // Transforms the value if transform is active
      if (this.transformValue && utils.check.notEmpty(this.transform)) {
        value = utils.text.transform(value, this.transform);
      }
      if (result && result.valid) {
        this.$emit(this.$thisvui.events.common.input, value);
      }
    },
    /**
     * Creates the field input section
     */
    createInput(architect) {
      let root = architect.createDiv("field-body");
      let field = architect.createDiv("field");
      let control = architect.createDiv(this.getControlClass); // The control element

      // Creating the html input element
      let input = architect.createInput(this.getInputClass);
      input.setId(this.id);
      let inputProps = {
        placeholder: this.placeholder,
        value: this.value,
        disabled: this.disabled,
        validationScope: this.validationScope,
        type: this.type,
        readonly: this.readonly,
        min: this.min,
        max: this.max
      };
      input.setProps(inputProps);
      input.setRef("inputField");
      input.addEvent("change", this.onChange);
      input.addEvent("input", this.onInput);
      input.addEvent("blur", this.onBlur);
      input.addEvent("keyup", this.onKeyup);
      control.addChild(input);

      this.createIcons(control);
      this.createErrorHelpers(control);

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
