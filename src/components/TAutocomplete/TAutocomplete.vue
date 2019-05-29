<template>
  <div :class="getAutocompleteContainerClass">
    <span
      v-if="labelIcon !== undefined && !labelIconRight"
      :class="getLabelIconClass"
    >
      <t-icon :icon="labelIcon"></t-icon>
    </span>
    <label v-if="!getRemoveLabel" :class="getLabelClass">{{ label }}</label>
    <span
      v-if="labelIcon !== undefined && labelIconRight"
      :class="getLabelIconClass"
    >
      <t-icon :icon="labelIcon"></t-icon>
    </span>
    <div :class="getControlClass">
      <input
        ref="autocompleteField"
        :id="id"
        :class="getInputClass"
        :placeholder="placeholder"
        :disabled="disabled"
        :validation-scope="validationScope"
        type="text"
        v-model="search"
        autocomplete="off"
        @focus="onFocus"
        @input="onInput"
        @blur="onBlur"
        @change="onChange"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
      />
      <span v-if="icon" :class="getIconClass">
        <t-icon :icon="icon"></t-icon>
      </span>
      <span v-if="valid" class="icon is-right has-text-success">
        <t-icon
          :preserve-defaults="!overrideDefaults"
          :icon="$thisvui.icons.check"
        ></t-icon>
      </span>
      <template v-for="error in errors">
        <p
          :key="error"
          class="help is-danger"
          :msg="error"
          :msg-position="msgPosition"
        ></p>
      </template>
    </div>
    <ul
      v-show="isOpen"
      :class="getAutocompleteResultsClass"
      :style="`max-height: ${this.height}px`"
    >
      <li class="loading" v-if="isAutocompleteLoading">
        Loading results...
      </li>
      <li class="loading" v-if="!results || results.length === 0">
        no results found...
      </li>
      <li
        v-else
        v-for="(item, i) in results"
        :key="i"
        @click="setAutocompleteResult(item)"
        :class="
          i === arrowCounter
            ? `${getAutocompleteResultClass} is-active`
            : getAutocompleteResultClass
        "
      >
        <span v-if="!customTemplate">{{ getAutocompleteResult(item) }}</span>
        <slot
          name="items"
          v-if="customTemplate"
          v-bind:item="item"
          v-bind:index="i"
        >
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
import utils from "../../utils/utils";
import input from "../../mixins/input";
import alignment from "../../mixins/alignment";
import CssArchitect from "../../utils/css-architect";
import TIcon from "../TIcon/TIcon";

export default {
  name: "t-autocomplete",
  components: { TIcon },
  mixins: [input, alignment],
  props: {
    items: {
      type: Array,
      default: () => []
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    },
    serverSide: {
      type: Boolean,
      required: false,
      default: false
    },
    customTemplate: {
      type: Boolean,
      required: false,
      default: false
    },
    filterMethod: {
      type: Function,
      required: false
    },
    display: {
      type: String
    },
    initialValue: {
      type: String
    },
    val: {
      type: String
    },
    height: {
      type: String,
      default: "140"
    },
    resultsClass: {
      type: String
    },
    resultClass: {
      type: String
    }
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: "",
      selectedValue: null,
      isAutocompleteLoading: false,
      arrowCounter: -1
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the autocomplete container element
     * @returns { A String with the chained css classes }
     */
    getAutocompleteContainerClass: function() {
      const cssArchitect = new CssArchitect("field t-autocomplete");
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the autocomplete results container
     * @returns { A String with the chained css classes }
     */
    getAutocompleteResultsClass: function() {
      const cssArchitect = new CssArchitect("t-autocomplete-results message");
      cssArchitect.isAbsolute().isFullwidth();
      cssArchitect.addClass(this.resultsClass, this.resultsClass !== undefined);
      this.colorize(cssArchitect, "border-5", true);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for each individual result item
     * @returns { A String with the chained css classes }
     */
    getAutocompleteResultClass: function() {
      const cssArchitect = new CssArchitect("t-autocomplete-result");
      cssArchitect.addClass(this.resultClass, this.resultClass !== undefined);
      this.colorize(cssArchitect, "bg-hover", true);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    isPrimitive() {
      let isString = this.items.every(function(i) {
        return typeof i === "string";
      });
      let isNumeric = this.items.every(function(i) {
        return typeof i === "number";
      });
      let isBoolean = this.items.every(function(i) {
        return typeof i === "boolean";
      });
      return isString || isNumeric || isBoolean;
    }
  },
  watch: {
    /**
     * Once the items content changes, it means the parent component
     * provided the needed data
     */
    items: function(value, oldValue) {
      // we want to make sure we only do this when it's an async request
      if (this.isAsync) {
        this.results = value;
        this.isOpen = true;
        this.isAutocompleteLoading = false;
      }
    },
    /**
     * Opens the result container when search keyword changes
     */
    search: function(value, oldValue) {
      // we want to make sure we only do this when it's an async request
      if (this.isAsync) {
        this.results = value;
        this.isOpen = true;
        this.isAutocompleteLoading = false;
      }
    }
  },
  methods: {
    /**
     * Executed on input
     */
    onInput() {
      // Let's warn the parent that a change was made
      this.validateOnEvent("input");
      this.$emit(this.$thisvui.events.common.input, this.search);
      // Is the data given by an outside ajax request?
      if (this.isAsync) {
        this.isAutocompleteLoading = true;
      } else {
        // Data is sync, we can search our flat array
        this.filterResults();
        this.isOpen = true;
      }
    },
    /**
     * Returns the autocomplete result
     */
    getAutocompleteResult: function(result) {
      return this.display === undefined ? result : result[this.display];
    },
    /**
     * Sets the autocomplete result. If display and value are set means the item is an complex object
     */
    setAutocompleteResult(result) {
      this.search = this.display === undefined ? result : result[this.display];
      this.selectedValue =
        this.display === undefined ? result : result[this.val];
      this.$emit(this.$thisvui.events.common.input, this.selectedValue);
      this.isOpen = false;
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
        for (let i = 0; i < this.items.length; i++) {
          let item =
            this.display !== undefined
              ? this.items[i][this.display]
              : this.items[i];
          if (typeof item === "number") {
            item = item.toString();
          }
          if (item.toLowerCase().includes(this.search.toLowerCase())) {
            match.push(this.items[i]);
          }
        }
      }
      this.results = match;
    },
    filter(a, display) {
      let match = [];
      for (let i = 0; i < this.items.length; i++) {
        let item = display !== undefined ? a[i][display] : a[i];
        if (item.toLowerCase() === this.search.toLowerCase()) {
          match.push(a[i]);
        }
      }
      return match;
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.setAutocompleteResult(this.results[this.arrowCounter]);
      this.isOpen = false;
      this.arrowCounter = -1;
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
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    }
  },
  mounted() {
    if (utils.check.notEmpty(this.initialValue)) {
      this.search = this.initialValue;
    }
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>
