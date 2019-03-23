<template>
  <div :class="getContainerClass">
    <span
      v-if="labelIcon !== undefined && !getBoolean(labelIconRight)"
      :class="getLabelIconClass"
    >
      <this-icon :icon="labelIcon"></this-icon>
    </span>
    <label :for="id" v-if="!getRemoveLabel" :class="getLabelClass">{{
      label
    }}</label>
    <span
      v-if="labelIcon !== undefined && getBoolean(labelIconRight)"
      :class="getLabelIconClass"
    >
      <this-icon :icon="labelIcon"></this-icon>
    </span>
    <div :class="getControlClass">
      <textarea
        :class="getTextareaClass"
        ref="inputField"
        :id="id"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :validation-scope="validationScope"
        :rows="rows"
        :cols="cols"
        @input="onInput"
        @blur="onBlur"
        @change="onChange"
      >
      </textarea>
      <span v-if="icon" :class="getIconClass">
        <this-icon :icon="icon"></this-icon>
      </span>
      <span v-if="valid" class="icon is-right has-text-success">
        <this-icon :icon="$thisvui.icons.check" />
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
</template>

<script>
import input from "../../mixins/input";
import utils from "../../utils/utils";

export default {
  name: "ThisTextarea",
  mixins: [input],
  props: {
    rows: {
      type: Number
    },
    cols: {
      type: Number
    }
  },
  methods: {
    onInput() {
      let value = this.$refs.inputField.value;
      this.validateOnEvent("input");
      if (this.transformValue && utils.check.notEmpty(this.transform)) {
        value = utils.text.transform(value, this.transform);
      }
      this.$emit("input", value);
    }
  }
};
</script>
