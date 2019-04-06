<template>
  <div :class="getContainerClass">
    <label v-if="!getRemoveLabel" class="label has-text-left">{{
      label
    }}</label>
    <div class="control">
      <div :class="getSelectClass">
        <select
          ref="inputField"
          :id="id"
          v-model="selected"
          :disabled="disabled"
          :class="getInputClass"
          :validation-scope="validationScope"
          @change="onChange($event.target.value)"
          @blur="onBlur"
        >
          <option v-if="addEmptyField" value="" />
          <option
            v-if="isComplex"
            v-for="option in options"
            :key="option[val]"
            :value="option[val]"
            >{{ option[display] }}</option
          >
          <option
            v-if="!isComplex"
            v-for="option in options"
            :key="option"
            :value="option"
            >{{ option }}</option
          >
        </select>
      </div>
      <template v-for="error in errors">
        <p
          :key="error"
          class="help is-danger"
          :msg="error"
          :msg-position="msgPosition"
        ></p>
      </template>
    </div>
  </div>
</template>

<script>
import input from "../../mixins/input";
import helpers from "../../mixins/helpers";

export default {
  name: "t-select",
  mixins: [input, helpers],
  props: {
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
      type: [Boolean, String],
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
      return this.getBoolean(this.addEmptyValue);
    }
  },
  methods: {
    onChange(value) {
      this.$emit("input", value);
      this.$emit("change");
    }
  }
};
</script>
