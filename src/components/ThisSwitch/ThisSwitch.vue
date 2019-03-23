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
      <this-icon :icon="$thisvui.icons.check"></this-icon>
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
  name: "ThisSwitch",
  mixins: [input],
  props: {
    isRtl: {
      type: [Boolean, String],
      default: false
    },
    isThin: {
      type: [Boolean, String],
      default: false
    },
    isRounded: {
      type: [Boolean, String],
      default: false
    },
    isOutlined: {
      type: [Boolean, String],
      default: false
    },
    hasNoBorder: {
      type: [Boolean, String],
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
      cssArchitect.addClass(this.getSwitchClass);
      cssArchitect.addClass("is-rtl", this.getBoolean(this.isRtl));
      cssArchitect.addClass("is-thin", this.getBoolean(this.isThin));
      cssArchitect.addClass("is-rounded", this.getBoolean(this.isRounded));
      cssArchitect.addClass("is-outlined", this.getBoolean(this.isOutlined));
      cssArchitect.addClass("has-no-border", this.getBoolean(this.hasNoBorder));
      return cssArchitect.getClasses();
    }
  },
  methods: {
    onInput() {
      let value = this.$refs.checkboxField.checked;
      this.validateOnEvent("input");
      this.onChange();
      this.$emit("input", value);
    }
  }
};
</script>
