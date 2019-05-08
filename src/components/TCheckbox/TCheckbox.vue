<template>
  <div :class="getContainerClass">
    <input
      :class="getClasses"
      ref="checkboxField"
      :id="id"
      type="checkbox"
      :name="name"
      :checked="value"
      :value="value"
      :disabled="disabled"
      :validation-scope="validationScope"
      @input="onInput"
      @blur="onBlur"
      @change="onInput"
    />
    <label :for="id" v-if="!getRemoveLabel" :class="getLabelClass">
      {{ label }}
    </label>
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
</template>

<script>
import input from "../../mixins/input";
import CssArchitect from "../../utils/css-architect";

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
      let value = this.$refs.checkboxField.checked;
      this.validateOnEvent("input");
      this.onChange();
      this.$emit(this.$thisvui.events.common.input, value);
    }
  }
};
</script>
