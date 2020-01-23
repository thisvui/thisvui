import inputs from "../../mixins/inputs";
import selects from "../../mixins/selects";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-autocomplete",
  mixins: [inputs, selects],
  props: {
    serverSide: {
      type: Boolean,
      required: false,
      default: false
    },
    multilevel: {
      type: Boolean,
      required: false,
      default: false
    },
    filterMethod: {
      type: Function,
      required: false
    },
    disableOnSelect: Boolean,
    validateOn: {
      type: String,
      default: "blur, input"
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the autocomplete container element
     * @returns { A String with the chained css classes }
     */
    getAutocompleteContainerClass: function() {
      const cssArchitect = new CssArchitect("t-autocomplete group");
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getThemeModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    /**
     * Executed on input
     */
    onInput(event) {
      this.search = event.target.value;
      this.validateOnEvent("input");
      this.filterResults();
      this.isOpen = true;
      if (!this.getHasValue()) {
        this.empty();
      }
    },
    /**
     * Filter results matching the search keyword
     */
    async filterResults() {
      let match = [];

      if (this.serverSide && !this.filterMethod)
        throw new Error(
          "You should provide a filter function when server side is active"
        );
      // If server side is active, executes the filter method
      if (this.serverSide) {
        match = await this.filterMethod(this.search);
      } else {
        match = this.filter(this.items);
      }
      this.results = match;
    },
    filter(items) {
      let match = [];
      let matchChildren = [];
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemToCheck =
          this.display !== undefined ? item[this.display] : item;
        let isString = typeof itemToCheck === "string";
        if (typeof itemToCheck === "number") {
          itemToCheck = itemToCheck.toString();
        }
        if (this.multilevel && item.children) {
          matchChildren = this.filter(item.children);
        }
        let itemMatch =
          isString &&
          itemToCheck.toLowerCase().includes(this.search.toLowerCase());
        let childrenMatch =
          typeof matchChildren !== "undefined" && matchChildren.length > 0;
        if (itemMatch || childrenMatch) {
          let matchItem = { ...item };
          matchItem.children = matchChildren;
          match.push(matchItem);
        }
      }
      return match;
    },
    onFocus(evt) {
      if (this.search !== undefined && this.search !== "") {
        this.isOpen = true;
      }
    },
    /**
     * Close the results container when clicked outside
     */
    handleClickOutside(evt) {
      this.isOpen = false;
      this.arrowCounter = -1;
      if (!this.selectedValue || !this.results || this.results.length === 0) {
        this.empty();
      }
    },
    /**
     * Creates the input element
     */
    createInput(architect) {
      let root = architect.createDiv(this.getWrapperCss.getClasses());
      root.setStyles(this.getWrapperCss.getStyles());
      root.addDirective({
        name: "click-outside",
        value: {
          exclude: ["clear"],
          handler: "handleClickOutside"
        }
      });
      let control = architect.createDiv(this.getControlClass); // The control element

      this.createIcon(root, this.iconPosition.left);

      // Creating the html input element
      let input = architect.createInput(this.getInputClass);
      input.setId(this.id);
      let inputAttrs = {
        placeholder: this.placeholder,
        value: this.search,
        disabled: this.disabled,
        validationScope: this.validationScope,
        type: this.type,
        readonly: this.readonly,
        min: this.min,
        max: this.max
      };
      if (!this.readOnly && this.disableOnSelect) {
        input.addAttr("readonly", true, this.hasValue);
      }
      input.value(this.search);
      input.setAttrs(inputAttrs);
      input.setRef("inputField");

      // Handling events
      input.addListeners(this.$listeners);
      input.addChange(this.onChange);
      input.addInput(this.onInput);
      input.addBlur(this.onBlur);
      input.addFocus(this.onFocus);

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

      this.createClearIcon(root, false);
      this.createIcon(root, this.iconPosition.right);
      this.createErrorHelpers(root);
      architect.addChild(root);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(
      h,
      "div",
      this.getAutocompleteContainerClass
    );

    this.createInput(root);
    this.createResults(root);

    return root.create();
  },
  mounted() {
    this.$nextTick(function() {
      if (this.isNotEmpty(this.value)) {
        this.search = this.display ? this.value[this.display] : this.value;
        this.selectedValue = this.value;
        this.hasValue = true;
        this.$emit(this.$thisvui.events.common.input, this.selectedValue);
      }
    });
  }
};
