import inputs from "../../mixins/inputs";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-input",
  mixins: [inputs],
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
    /**
     * Creates the field input with controls
     */
    createInput(architect) {
      let root = architect.createDiv(this.getWrapperClass);
      let control = architect.createDiv(this.getControlClass); // The control element

      this.createIcon(root, this.iconPosition.left);
      // Creating the html input element
      let input = architect.createInput(this.getInputClass);
      input.setId(this.id);
      let inputAttrs = {
        placeholder: this.placeholder,
        value: this.value,
        disabled: this.disabled,
        validationScope: this.validationScope,
        type: this.type,
        readonly: this.readonly,
        min: this.min,
        max: this.max
      };
      input.value(this.value);
      input.setAttrs(inputAttrs);
      input.setRef("inputField");
      input.addChange(this.onChange);
      input.addInput(this.onInput);
      input.addFocus(this.onFocus);
      input.addBlur(this.onBlur);
      input.addKeyup({
        key: architect.keycode.enter,
        handler: this.onKeyup
      });
      control.addChild(input);

      let labelParent = this.classic ? architect : control;
      this.createLabel(labelParent);

      root.addChild(control);
      this.createStateIcon(root);
      this.createIcon(root, this.iconPosition.right);
      this.createErrorHelpers(root);
      architect.addChild(root);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClass);
    this.createInput(root);
    return root.create();
  }
};
