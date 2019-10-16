import inputs from "../../mixins/inputs";
import selects from "../../mixins/selects";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-select",
  mixins: [inputs, selects],
  props: {
    allowEmptyValue: {
      type: Boolean,
      default: true
    },
    validateOn: {
      type: String,
      default: "blur, input"
    }
  },
  data() {
    return {
      arrowIcon: this.$thisvui.icons.arrowDown
    };
  },
  watch: {
    /**
     * Once the items content changes, it means the parent component
     * provided the needed data
     */
    items: function(value, oldValue) {
      this.results = value;
    },
    isOpen: function(value, oldValue) {
      this.arrowIcon = value
        ? this.$thisvui.icons.arrowUp
        : this.$thisvui.icons.arrowDown;
    },
    allowEmptyValue: function(value, oldValue) {
      if (!value) {
        let value = this.isNotEmpty(this.initialValue)
          ? this.initialValue
          : this.results[0];
        this.setResult(value);
      }
    }
  },
  computed: {
    getOpenIconClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("colored");
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      cssArchitect.addClass("cursor-pointer");
      return cssArchitect.getClasses();
    },
    iconPosition() {
      let left = this.iconLeft;
      let right = this.iconRight;
      if ((!left && !right) || (left && right)) {
        left = true;
        right = false;
      }
      return { left, right };
    }
  },
  methods: {
    /**
     * Executed on click
     */
    onClick(event) {
      event.preventDefault();
      this.isOpen = !this.isOpen;
    },
    /**
     * Executed on input
     */
    onInput(event) {
      this.search = event.target.value;
      this.validateOnEvent("input");
    },
    /**
     * Executed on focus
     */
    onFocus(event) {
      if (this.search !== undefined && this.search !== "") {
        this.isOpen = true;
      }
    },
    /**
     * Handles behavior for outside clicks
     */
    handleClickOutside(event) {
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    /**
     * Creates the open/close icon
     */
    createToggleIcon(architect) {
      let openIconWrapper = architect.createA();
      let openIcon = architect.createIcon(this.getOpenIconClass);
      openIcon.addProp("icon", this.arrowIcon);
      openIcon.setRef("arrow");
      openIcon.addProp("preserveDefaults", !this.overrideDefaults);
      openIconWrapper.addClick(this.onClick);
      openIconWrapper.addChild(openIcon);
      architect.addChild(openIconWrapper);
    },
    /**
     * Creates the input element
     */
    createInput(architect) {
      let root = architect.createDiv(this.getWrapperClass);
      let control = architect.createDiv(this.getControlClass); // The control element
      root.addDirective({
        name: "click-outside",
        value: {
          exclude: ["arrow", "clear"],
          handler: "handleClickOutside"
        }
      });

      this.createIcon(root, this.iconPosition.left);

      let input = architect.createInput(this.getInputClass);
      input.addClick(this.onClick);
      input.addClass("select");
      input.setId(this.id);
      let inputAttrs = {
        placeholder: this.placeholder,
        value: this.search,
        disabled: this.disabled,
        readOnly: true,
        validationScope: this.validationScope
      };
      input.value(this.search);
      input.setAttrs(inputAttrs);
      input.setRef("inputField");
      input.addChange(this.onChange);
      input.addInput(this.onInput);
      input.addBlur(this.onBlur);

      input.addKeydown({
        key: architect.keycode.downArrow,
        handler: this.onArrowDown
      });
      input.addKeydown({
        key: architect.keycode.upArrow,
        handler: this.onArrowUp
      });
      input.addKeydown({
        key: architect.keycode.enter,
        handler: this.onEnter
      });
      input.addKeydown({
        key: architect.keycode.delete,
        handler: this.empty
      });
      control.addChild(input);

      let labelParent = this.classic ? architect : control;
      this.createLabel(labelParent);
      root.addChild(control);
      if (this.allowEmptyValue) {
        this.createClearIcon(root);
      }
      this.createIcon(root, this.iconPosition.right);
      this.createToggleIcon(root);
      this.createErrorHelpers(root);
      architect.addChild(root);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getSelectContainerClass);

    this.createInput(root);
    this.createResults(root);

    return root.create();
  },
  mounted() {
    this.$nextTick(function() {
      if (this.allowEmptyValue && this.isNotEmpty(this.initialValue)) {
        this.search = this.initialValue;
      }
      if (!this.allowEmptyValue) {
        let value = this.isNotEmpty(this.initialValue)
          ? this.initialValue
          : this.results[0];
        this.setResult(value);
      }
    });
  }
};
