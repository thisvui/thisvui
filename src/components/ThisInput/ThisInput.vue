<template>
  <div :class="getContainerClass">
    <div class="field-label is-normal" v-if="label">
      <span
        v-if="labelIcon !== undefined && !getBoolean(labelIconRight)"
        :class="getLabelIconClass"
      >
        <i :class="labelIcon"></i>
      </span>
      <label v-if="!getRemoveLabel" :class="getLabelClass">{{ label }}</label>
      <span
        v-if="labelIcon !== undefined && getBoolean(labelIconRight)"
        :class="getLabelIconClass"
      >
        <i :class="labelIcon"></i>
      </span>
    </div>
    <div class="field-body">
      <div class="field">
        <div :class="getControlClass">
          <input
            ref="inputField"
            :id="id"
            :class="getInputClass"
            :placeholder="placeholder"
            :value="value"
            :disabled="disabled"
            :validation-scope="validationScope"
            :type="type"
            :readonly="readonly"
            @input="onInput"
            @blur="onBlur"
            @change="onChange"
            @keyup.enter="onEnter"
          />
          <span v-if="icon" :class="getIconClass">
            <i :class="icon"></i>
          </span>
          <span v-if="valid" class="icon is-right has-text-success">
            <i class="fas fa-check" />
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
      </div>
    </div>
  </div>
</template>

<script>
import input from "../../mixins/input";
import utils from "../../utils/utils";

export default {
  name: "ThisInput",
  mixins: [input],
  props: {
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    onInput() {
      let value = this.$refs.inputField.value;
      this.validateOnEvent("input");
      // Transforms the value if transform is active
      if (this.transformValue && utils.check.notEmpty(this.transform)) {
        value = utils.text.transform(value, this.transform);
      }
      this.$emit("input", value);
    }
  }
};
</script>
